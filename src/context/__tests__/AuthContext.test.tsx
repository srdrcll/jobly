import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@/test/utils';
import { AuthProvider, useAuthContext } from '../AuthContext';
import { supabase } from '@/lib/supabase';
import React from 'react';
import { mockSession } from '@/test/mocks';

const TestAuthConsumer = () => {
  const { user, session, loading, login, logout } = useAuthContext();

  return (
    <div>
      <div data-testid="loading-state">{loading ? 'yükleniyor' : 'hazır'}</div>
      <div data-testid="user-email">{user?.email || 'oturum-yok'}</div>
      <button onClick={() => login('test@example.com', '123456')}>Giriş Yap</button>
      <button onClick={() => logout()}>Çıkış Yap</button>
    </div>
  );
};

describe('AuthContext Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('restores initial session on mount', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValueOnce({
      data: { session: mockSession },
      error: null,
    });

    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    expect(await screen.findByTestId('user-email')).toHaveTextContent(mockSession.user.email);
    expect(screen.getByTestId('loading-state')).toHaveTextContent('hazır');
  });

  it('handles login error response', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
      data: { user: null, session: null },
      error: new Error('Invalid login credentials') as any,
    });

    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    const loginButton = screen.getByRole('button', { name: /giriş yap/i });
    await act(async () => {
      loginButton.click();
    });

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456',
    });
  });

  it('clears session state on logout', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValueOnce({
      data: { session: mockSession },
      error: null,
    });
    vi.mocked(supabase.auth.signOut).mockResolvedValueOnce({ error: null });

    render(
      <AuthProvider>
        <TestAuthConsumer />
      </AuthProvider>
    );

    expect(await screen.findByTestId('user-email')).toHaveTextContent(mockSession.user.email);

    const logoutButton = screen.getByRole('button', { name: /çıkış yap/i });
    await act(async () => {
      logoutButton.click();
    });

    expect(supabase.auth.signOut).toHaveBeenCalled();
    expect(screen.getByTestId('user-email')).toHaveTextContent('oturum-yok');
  });
});
