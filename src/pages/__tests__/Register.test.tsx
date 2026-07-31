import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { RegisterPage } from '../Register';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useAuthModule from '@/hooks/useAuth';

describe('RegisterPage Component', () => {
  const mockRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      session: null,
      loading: false,
      login: vi.fn(),
      register: mockRegister,
      logout: vi.fn(),
      resetPassword: vi.fn(),
      updatePassword: vi.fn(),
    });
  });

  it('renders registration form fields correctly', () => {
    render(<RegisterPage />);

    expect(screen.getByRole('heading', { name: /hesap oluşturun/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/ad soyad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-posta adresi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/şifre/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /kayıt ol ve başla/i })).toBeInTheDocument();
    expect(screen.getByText(/zaten hesabınız var mı\?/i)).toBeInTheDocument();
  });

  it('validates password length < 6 characters before submit', async () => {
    render(<RegisterPage />);

    await userEvent.type(screen.getByLabelText(/ad soyad/i), 'Serdar Çil');
    await userEvent.type(screen.getByLabelText(/e-posta adresi/i), 'serdar@example.com');
    await userEvent.type(screen.getByLabelText(/şifre/i), '12345');
    await userEvent.click(screen.getByRole('button', { name: /kayıt ol ve başla/i }));

    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('calls register function on valid form submit', async () => {
    mockRegister.mockResolvedValueOnce({ success: true, requiresVerification: true });

    render(<RegisterPage />);

    await userEvent.type(screen.getByLabelText(/ad soyad/i), 'Serdar Çil');
    await userEvent.type(screen.getByLabelText(/e-posta adresi/i), 'serdar@example.com');
    await userEvent.type(screen.getByLabelText(/şifre/i), '123456');
    await userEvent.click(screen.getByRole('button', { name: /kayıt ol ve başla/i }));

    expect(mockRegister).toHaveBeenCalledWith('serdar@example.com', '123456', 'Serdar Çil');
  });

  it('handles registration failure error response', async () => {
    mockRegister.mockResolvedValueOnce({ success: false, error: 'Bu e-posta adresi ile zaten bir hesap oluşturulmuş.' });

    render(<RegisterPage />);

    await userEvent.type(screen.getByLabelText(/ad soyad/i), 'Serdar Çil');
    await userEvent.type(screen.getByLabelText(/e-posta adresi/i), 'exist@example.com');
    await userEvent.type(screen.getByLabelText(/şifre/i), '123456');
    await userEvent.click(screen.getByRole('button', { name: /kayıt ol ve başla/i }));

    expect(mockRegister).toHaveBeenCalledWith('exist@example.com', '123456', 'Serdar Çil');
  });
});
