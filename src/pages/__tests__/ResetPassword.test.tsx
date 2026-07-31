import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { ResetPasswordPage } from '../ResetPassword';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useAuthModule from '@/hooks/useAuth';

describe('ResetPasswordPage Component', () => {
  const mockUpdatePassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      session: null,
      loading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      resetPassword: vi.fn(),
      updatePassword: mockUpdatePassword,
    });
  });

  it('renders reset password form inputs correctly', () => {
    render(<ResetPasswordPage />);

    expect(screen.getByRole('heading', { name: /yeni şifre belirleyin/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^yeni şifre$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/yeni şifre \(tekrar\)/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /şifreyi güncelle/i })).toBeInTheDocument();
  });

  it('validates password mismatch before submit', async () => {
    render(<ResetPasswordPage />);

    await userEvent.type(screen.getByLabelText(/^yeni şifre$/i), 'pass123');
    await userEvent.type(screen.getByLabelText(/yeni şifre \(tekrar\)/i), 'different123');
    await userEvent.click(screen.getByRole('button', { name: /şifreyi güncelle/i }));

    expect(mockUpdatePassword).not.toHaveBeenCalled();
  });

  it('validates password length < 6 characters before submit', async () => {
    render(<ResetPasswordPage />);

    await userEvent.type(screen.getByLabelText(/^yeni şifre$/i), '12345');
    await userEvent.type(screen.getByLabelText(/yeni şifre \(tekrar\)/i), '12345');
    await userEvent.click(screen.getByRole('button', { name: /şifreyi güncelle/i }));

    expect(mockUpdatePassword).not.toHaveBeenCalled();
  });

  it('calls updatePassword on valid matching passwords submit', async () => {
    mockUpdatePassword.mockResolvedValueOnce({ success: true });

    render(<ResetPasswordPage />);

    await userEvent.type(screen.getByLabelText(/^yeni şifre$/i), 'newpass123');
    await userEvent.type(screen.getByLabelText(/yeni şifre \(tekrar\)/i), 'newpass123');
    await userEvent.click(screen.getByRole('button', { name: /şifreyi güncelle/i }));

    expect(mockUpdatePassword).toHaveBeenCalledWith('newpass123');
  });
});
