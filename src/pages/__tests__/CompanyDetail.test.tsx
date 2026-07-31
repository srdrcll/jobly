import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { CompanyDetailPage } from '../CompanyDetail';
import React from 'react';
import * as useCompaniesQueryModule from '@/hooks/queries/useCompaniesQuery';
import * as useApplicationsQueryModule from '@/hooks/queries/useApplicationsQuery';
import { mockCompanies, mockApplications } from '@/test/mocks';
import userEvent from '@testing-library/user-event';

describe('CompanyDetailPage Component', () => {
  const mockRefetchCompany = vi.fn();
  const sampleCompany = mockCompanies[0];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useApplicationsQueryModule, 'useApplicationsListQuery').mockReturnValue({
      data: mockApplications,
      isLoading: false,
    } as any);
  });

  it('renders loading skeletons when company query is loading', () => {
    vi.spyOn(useCompaniesQueryModule, 'useCompanyDetailQuery').mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: mockRefetchCompany,
    } as any);

    render(<CompanyDetailPage />);

    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders error alert and handles refetch click when query fails', async () => {
    vi.spyOn(useCompaniesQueryModule, 'useCompanyDetailQuery').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Şirket profili bulunamadı'),
      refetch: mockRefetchCompany,
    } as any);

    render(<CompanyDetailPage />);

    expect(screen.getByText('Şirket Profili Yüklenemedi')).toBeInTheDocument();
    expect(screen.getByText('Şirket profili bulunamadı')).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /tekrar dene/i });
    await userEvent.click(retryButton);

    expect(mockRefetchCompany).toHaveBeenCalledTimes(1);
  });

  it('renders company overview when company data is loaded', () => {
    vi.spyOn(useCompaniesQueryModule, 'useCompanyDetailQuery').mockReturnValue({
      data: sampleCompany,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetchCompany,
    } as any);

    render(<CompanyDetailPage />);

    expect(screen.getByRole('heading', { name: sampleCompany.name })).toBeInTheDocument();
    expect(screen.getByText(sampleCompany.industry!)).toBeInTheDocument();
  });
});
