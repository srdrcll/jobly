import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { PublicRoute } from '../PublicRoute';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import * as useAuthModule from '@/hooks/useAuth';
import { mockSession } from '@/test/mocks';

describe('PublicRoute Guard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects logged in user to /dashboard', () => {
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
        <Route path="/dashboard" element={<div>Dashboard Paneli</div>} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<div>Giriş Yap</div>} />
        </Route>
      </Routes>
    );

    expect(screen.getByText('Dashboard Paneli')).toBeInTheDocument();
    expect(screen.queryByText('Giriş Yap')).not.toBeInTheDocument();
  });

  it('renders public outlet when user is not logged in', () => {
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
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<div>Genel Giriş Sayfası</div>} />
        </Route>
      </Routes>
    );

    expect(screen.getByText('Genel Giriş Sayfası')).toBeInTheDocument();
  });
});
