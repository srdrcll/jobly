import { createClient, AuthError } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_URL !== 'https://your-project-id.supabase.co'
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Translates Supabase authentication error messages to user-friendly Turkish notices.
 */
export function getTurkishAuthErrorMessage(error: AuthError | Error | null | string): string {
  if (!error) return 'Bilinmeyen bir hata oluştu.';
  
  const message = typeof error === 'string' ? error : error.message;

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
