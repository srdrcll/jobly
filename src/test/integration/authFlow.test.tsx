import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/pages/Login';
import { RegisterPage } from '@/pages/Register';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PublicRoute } from '@/components/auth/PublicRoute';
import { supabase } from '@/lib/supabase';
import { mockSession } from '@/test/mocks';
import userEvent from '@testing-library/user-event';
import React from 'react';

const FullAppRoutes = () => (
  <Routes>
    {/* Public Auth Routes */}
    <Route element={<PublicRoute />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    {/* Protected SaaS App Routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<div data-testid="dashboard-view">Canlı Dashboard Paneli</div>} />
    </Route>
  </Routes>
);

describe('Integration Test: Authentication Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects unauthenticated user from protected route to /login', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValueOnce({
      data: { session: null },
      error: null,
    });

    render(<FullAppRoutes />);

    expect(await screen.findByRole('heading', { name: /hoş geldiniz/i })).toBeInTheDocument();
    expect(screen.queryByTestId('dashboard-view')).not.toBeInTheDocument();
  });

  it('completes login flow and redirects user to protected /dashboard', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValueOnce({
      data: { session: null },
      error: null,
    });
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
      data: { user: mockSession.user, session: mockSession },
      error: null,
    });

    render(<FullAppRoutes />);

    const emailInput = screen.getByLabelText(/e-posta adresi/i);
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const loginButton = screen.getByRole('button', { name: /giriş yap/i });

    await userEvent.type(emailInput, 'serdarcill@gmail.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'serdarcill@gmail.com',
        password: 'password123',
      });
    });
  });
});
