import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { LoginPage } from '../Login';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useAuthModule from '@/hooks/useAuth';

describe('LoginPage Component', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      session: null,
      loading: false,
      login: mockLogin,
      register: vi.fn(),
      logout: vi.fn(),
      resetPassword: vi.fn(),
      updatePassword: vi.fn(),
    });
  });

  it('renders login form elements correctly', () => {
    render(<LoginPage />);

    expect(screen.getByRole('heading', { name: /hoş geldiniz/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/e-posta adresi/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /giriş yap/i })).toBeInTheDocument();
    expect(screen.getByText(/şifremi unuttum\?/i)).toBeInTheDocument();
    expect(screen.getByText(/ücretsiz kayıt olun/i)).toBeInTheDocument();
  });

  it('allows user to type email and password', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/e-posta adresi/i);
    const passwordInput = screen.getByPlaceholderText('••••••••');

    await userEvent.type(emailInput, 'serdar@example.com');
    await userEvent.type(passwordInput, 'secret123');

    expect(emailInput).toHaveValue('serdar@example.com');
    expect(passwordInput).toHaveValue('secret123');
  });

  it('calls login function on form submit and handles success', async () => {
    mockLogin.mockResolvedValueOnce({ success: true });

    render(<LoginPage />);

    await userEvent.type(screen.getByLabelText(/e-posta adresi/i), 'serdar@example.com');
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'secret123');
    await userEvent.click(screen.getByRole('button', { name: /giriş yap/i }));

    expect(mockLogin).toHaveBeenCalledWith('serdar@example.com', 'secret123');
  });

  it('handles login error gracefully', async () => {
    mockLogin.mockResolvedValueOnce({ success: false, error: 'E-posta adresi veya şifre hatalı.' });

    render(<LoginPage />);

    await userEvent.type(screen.getByLabelText(/e-posta adresi/i), 'wrong@example.com');
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'wrongpass');
    await userEvent.click(screen.getByRole('button', { name: /giriş yap/i }));

    expect(mockLogin).toHaveBeenCalledWith('wrong@example.com', 'wrongpass');
  });
});
