import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { ForgotPasswordPage } from '../ForgotPassword';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useAuthModule from '@/hooks/useAuth';

describe('ForgotPasswordPage Component', () => {
  const mockResetPassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      session: null,
      loading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      resetPassword: mockResetPassword,
      updatePassword: vi.fn(),
    });
  });

  it('renders forgot password form correctly', () => {
    render(<ForgotPasswordPage />);

    expect(screen.getByRole('heading', { name: /şifrenizi mi unuttunuz\?/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/e-posta adresi/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sıfırlama bağlantısı gönder/i })).toBeInTheDocument();
  });

  it('calls resetPassword and displays confirmation message on success', async () => {
    mockResetPassword.mockResolvedValueOnce({ success: true });

    render(<ForgotPasswordPage />);

    await userEvent.type(screen.getByLabelText(/e-posta adresi/i), 'reset@example.com');
    await userEvent.click(screen.getByRole('button', { name: /sıfırlama bağlantısı gönder/i }));

    expect(mockResetPassword).toHaveBeenCalledWith('reset@example.com');
    expect(screen.getByText('Bağlantı Gönderildi!')).toBeInTheDocument();
    expect(screen.getByText(/reset@example.com/i)).toBeInTheDocument();
  });

  it('handles resetPassword failure error', async () => {
    mockResetPassword.mockResolvedValueOnce({ success: false, error: 'Kullanıcı bulunamadı.' });

    render(<ForgotPasswordPage />);

    await userEvent.type(screen.getByLabelText(/e-posta adresi/i), 'unknown@example.com');
    await userEvent.click(screen.getByRole('button', { name: /sıfırlama bağlantısı gönder/i }));

    expect(mockResetPassword).toHaveBeenCalledWith('unknown@example.com');
  });
});
