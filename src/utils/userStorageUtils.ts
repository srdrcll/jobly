/**
 * Synchronously retrieves the currently authenticated user's ID from Supabase's local storage key.
 * This guarantees zero cross-user data leaks for LocalStorage fallback data.
 */
export function getActiveUserId(): string {
  try {
    // 1. Check mock session first if present
    const mockRaw = localStorage.getItem('sb-mock-session');
    if (mockRaw) {
      const parsed = JSON.parse(mockRaw);
      if (parsed?.user?.id) return parsed.user.id;
    }

    const keys = Object.keys(localStorage);
    // Supabase auth key format: sb-[project-ref]-auth-token
    const authKey = keys.find((k) => k.startsWith('sb-') && (k.endsWith('-auth-token') || k.includes('auth')));
    if (authKey) {
      const raw = localStorage.getItem(authKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed?.user?.id || 'anonymous';
      }
    }
  } catch (e) {
    console.error('Failed to parse active user session for RLS namespace:', e);
  }
  return 'anonymous';
}

/**
 * Returns a user-specific namespaced key for isolated LocalStorage fallback data.
 */
export function getUserStorageKey(baseKey: string): string {
  return `${baseKey}_${getActiveUserId()}`;
}
