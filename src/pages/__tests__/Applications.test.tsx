import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { ApplicationsPage } from '../Applications';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useApplicationsQueryModule from '@/hooks/queries/useApplicationsQuery';
import { mockApplications } from '@/test/mocks';

describe('ApplicationsPage Component', () => {
  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders page header and control toolbar correctly', () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationsListQuery').mockReturnValue({
      data: mockApplications,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<ApplicationsPage />);

    expect(screen.getByRole('heading', { name: /iş başvurularım/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /yeni başvuru/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/şirket, pozisyon veya not ara/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filtreleme menüsünü aç\/kapat/i })).toBeInTheDocument();
  });

  it('renders loading skeleton when applications query is loading', () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationsListQuery').mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<ApplicationsPage />);

    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders error state and refetches on button click', async () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationsListQuery').mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: new Error('Veritabanı bağlantı hatası'),
      refetch: mockRefetch,
    } as any);

    render(<ApplicationsPage />);

    expect(screen.getByText('Veriler Yüklenemedi')).toBeInTheDocument();
    expect(screen.getByText('Veritabanı bağlantı hatası')).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /yeniden dene/i });
    await userEvent.click(retryButton);

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('renders empty state when no applications exist', () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationsListQuery').mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<ApplicationsPage />);

    expect(screen.getByText('Henüz Başvuru Bulunmuyor')).toBeInTheDocument();
  });

  it('filters applications when user types in search input', async () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationsListQuery').mockReturnValue({
      data: mockApplications,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<ApplicationsPage />);

    expect(screen.getByText('Trendyol')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/şirket, pozisyon veya not ara/i);
    await userEvent.type(searchInput, 'Trendyol');

    // Wait for debounced search filter
    expect(searchInput).toHaveValue('Trendyol');
  });
});
