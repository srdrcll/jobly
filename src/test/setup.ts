import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Supabase Client
vi.mock('@/lib/supabase', () => {
  const mockSubscription = {
    unsubscribe: vi.fn(),
  };

  return {
    supabase: {
      auth: {
        getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
        onAuthStateChange: vi.fn(() => ({
          data: { subscription: mockSubscription },
        })),
        signInWithPassword: vi.fn(),
        signUp: vi.fn(),
        signOut: vi.fn(),
        resetPasswordForEmail: vi.fn(),
        updateUser: vi.fn(),
      },
      from: vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        in: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        single: vi.fn().mockReturnThis(),
      })),
    },
    getTurkishAuthErrorMessage: vi.fn((err: any) => err?.message || 'Bir hata oluştu.'),
  };
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
window.ResizeObserver = ResizeObserverMock;
