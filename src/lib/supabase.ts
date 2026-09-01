import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = (rawUrl && typeof rawUrl === 'string' && rawUrl.trim()) ? rawUrl.trim() : 'https://placeholder.supabase.co';
const supabaseAnonKey = (rawKey && typeof rawKey === 'string' && rawKey.trim()) ? rawKey.trim() : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

/**
 * Determines whether Supabase is configured with real production credentials.
 * Returns false if placeholder/mock credentials or unconfigured URLs are detected.
 */
export const isSupabaseConfigured = (): boolean => {
  const url = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  const key = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
  return Boolean(
    url &&
    key &&
    !url.includes('your-project-id') &&
    !url.includes('example.com') &&
    !url.includes('placeholder') &&
    !key.includes('your-actual-anon-key-here') &&
    !key.includes('placeholder') &&
    !key.includes('anon-key') &&
    url.startsWith('https://')
  );
};

/**
 * Wraps any Supabase request promise with a strict timeout (default: 2500ms)
 * to prevent the UI from freezing or hanging when remote network is degraded.
 */
export async function withSupabaseTimeout<T>(
  promise: Promise<T>,
  timeoutMs = 2500
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error('Supabase request timed out'));
    }, timeoutMs);
  });

  try {
    const res = await Promise.race([promise, timeoutPromise]);
    if (timer) clearTimeout(timer);
    return res;
  } catch (err) {
    if (timer) clearTimeout(timer);
    throw err;
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Safely translates Supabase authentication error messages to user-friendly Turkish notices.
 */
export function getTurkishAuthErrorMessage(error: unknown): string {
  if (!error) return 'Bilinmeyen bir hata oluştu.';
  
  let message = '';
  if (typeof error === 'string') {
    message = error;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    message = String((error as { message: unknown }).message);
  }

  if (message.includes('Invalid login credentials')) {
    return 'E-posta adresi veya şifre hatalı.';
  }
  if (message.includes('User already registered')) {
    return 'Bu e-posta adresi ile zaten bir hesap oluşturulmuş.';
  }
  if (message.includes('Password should be at least')) {
    return 'Şifreniz en az 6 karakter olmalıdır.';
  }
  if (message.includes('Email not confirmed')) {
    return 'E-posta adresiniz henüz doğrulanmamış. Lütfen gelen kutunuzu kontrol edin.';
  }
  if (message.includes('Too many requests') || message.includes('rate limit')) {
    return 'Çok fazla deneme yaptınız. Lütfen kısa bir süre sonra tekrar deneyin.';
  }
  if (message.includes('Unable to validate email link')) {
    return 'Şifre sıfırlama bağlantısının süresi dolmuş veya geçersiz.';
  }

  return message || 'Kimlik doğrulama işlemi sırasında bir hata oluştu.';
}
