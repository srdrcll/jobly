import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { ProtectedRoute } from '../ProtectedRoute';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import * as useAuthModule from '@/hooks/useAuth';
import { mockSession } from '@/test/mocks';

describe('ProtectedRoute Guard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading spinner screen when auth state is restoring', () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      session: null,
      loading: true,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      resetPassword: vi.fn(),
      updatePassword: vi.fn(),
    });

    render(
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div>Gizli İçerik</div>} />
        </Route>
      </Routes>
    );

    expect(screen.getByText('Oturum Kontrol Ediliyor')).toBeInTheDocument();
    expect(screen.queryByText('Gizli İçerik')).not.toBeInTheDocument();
  });

  it('redirects unauthenticated user to /login', () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      session: null,
      loading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      resetPassword: vi.fn(),
      updatePassword: vi.fn(),
    });

    render(
      <Routes>
        <Route path="/login" element={<div>Login Sayfası</div>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div>Gizli İçerik</div>} />
        </Route>
      </Routes>
    );

    expect(screen.getByText('Login Sayfası')).toBeInTheDocument();
    expect(screen.queryByText('Gizli İçerik')).not.toBeInTheDocument();
  });

  it('renders child outlet when valid authenticated session exists', () => {
    vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: mockSession.user,
      session: mockSession,
      loading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      resetPassword: vi.fn(),
      updatePassword: vi.fn(),
    });

    render(
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div>Gizli Korumalı İçerik</div>} />
        </Route>
      </Routes>
    );

    expect(screen.getByText('Gizli Korumalı İçerik')).toBeInTheDocument();
  });
});
