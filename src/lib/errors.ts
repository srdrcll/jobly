export class AppError extends Error {
  public code?: string;
  public status?: number;
  public isPermissionError: boolean;
  public isNetworkError: boolean;

  constructor(
    message: string,
    options?: {
      code?: string;
      status?: number;
      isPermissionError?: boolean;
      isNetworkError?: boolean;
    }
  ) {
    super(message);
    this.name = 'AppError';
    this.code = options?.code;
    this.status = options?.status;
    this.isPermissionError = options?.isPermissionError ?? false;
    this.isNetworkError = options?.isNetworkError ?? false;
  }
}

/**
 * Normalizes Supabase / PostgreSQL errors into clean AppError instances.
 */
export function handleDatabaseError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (typeof error === 'object' && error !== null) {
    const err = error as { code?: string; message?: string; details?: string; hint?: string; status?: number };
    const code = err.code || '';
    const message = err.message || '';

    // PostgreSQL RLS / Permission Denied
    if (code === '42501' || message.includes('permission denied')) {
      return new AppError('Bu veriye erişim veya değiştirme yetkiniz bulunmuyor.', {
        code: '42501',
        isPermissionError: true,
      });
    }

    // PostgreSQL Unique Constraint Violation
    if (code === '23505' || message.includes('unique constraint')) {
      return new AppError('Bu kayıt sistemde zaten mevcut.', {
        code: '23505',
      });
    }

    // PostgreSQL Foreign Key Violation
    if (code === '23503' || message.includes('foreign key constraint')) {
      return new AppError('Bağlı olduğu ilişkili veri bulunamadı.', {
        code: '23503',
      });
    }

    // Supabase PostgREST Row Not Found
    if (code === 'PGRST116') {
      return new AppError('Aradığınız veri bulunamadı.', {
        code: 'PGRST116',
      });
    }

    // Network / Offline Error / Timeout
    if (
      message.toLowerCase().includes('failed to fetch') || 
      message.toLowerCase().includes('networkerror') ||
      message.toLowerCase().includes('aborted') ||
      message.toLowerCase().includes('timeout')
    ) {
      return new AppError('Sunucu bağlantısı zaman aşımına uğradı veya ağ bağlantısı kurulamadı.', {
        isNetworkError: true,
      });
    }

    return new AppError(message || 'Veritabanı işlemi sırasında bir hata oluştu.', {
      code,
      status: err.status,
    });
  }

  return new AppError('Beklenmeyen bir veritabanı hatası meydana geldi.');
}
