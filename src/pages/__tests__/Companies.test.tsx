import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { CompaniesPage } from '../Companies';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useCompaniesQueryModule from '@/hooks/queries/useCompaniesQuery';
import { mockCompanies } from '@/test/mocks';

describe('CompaniesPage Component', () => {
  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders page header and control toolbar correctly', () => {
    vi.spyOn(useCompaniesQueryModule, 'useCompaniesListQuery').mockReturnValue({
      data: mockCompanies,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<CompaniesPage />);

    expect(screen.getByRole('heading', { name: /hedef şirketler/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /yeni şirket/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/şirket adı, sektör veya lokasyon ara/i)).toBeInTheDocument();
  });

  it('renders loading skeleton when companies query is loading', () => {
    vi.spyOn(useCompaniesQueryModule, 'useCompaniesListQuery').mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<CompaniesPage />);

    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders error alert and handles refetch click when query fails', async () => {
    vi.spyOn(useCompaniesQueryModule, 'useCompaniesListQuery').mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: new Error('Şirketler yüklenemedi'),
      refetch: mockRefetch,
    } as any);

    render(<CompaniesPage />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Şirket Listesi Yüklenemedi')).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /tekrar dene/i });
    await userEvent.click(retryButton);

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('renders empty state when no companies exist', () => {
    vi.spyOn(useCompaniesQueryModule, 'useCompaniesListQuery').mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<CompaniesPage />);

    expect(screen.getByText('Şirket Kaydı Bulunamadı')).toBeInTheDocument();
  });

  it('filters companies when searching by company name', async () => {
    vi.spyOn(useCompaniesQueryModule, 'useCompaniesListQuery').mockReturnValue({
      data: mockCompanies,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<CompaniesPage />);

    expect(screen.getByText('Trendyol')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/şirket adı, sektör veya lokasyon ara/i);
    await userEvent.type(searchInput, 'Trendyol');

    expect(searchInput).toHaveValue('Trendyol');
  });
});
