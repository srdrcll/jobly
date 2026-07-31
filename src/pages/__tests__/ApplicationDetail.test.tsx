import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { ApplicationDetailPage } from '../ApplicationDetail';
import React from 'react';
import * as useApplicationsQueryModule from '@/hooks/queries/useApplicationsQuery';
import { mockApplications } from '@/test/mocks';
import userEvent from '@testing-library/user-event';

describe('ApplicationDetailPage Component', () => {
  const mockRefetch = vi.fn();
  const sampleApp = mockApplications[0];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading skeleton when detail query is loading', () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationDetailQuery').mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<ApplicationDetailPage />);

    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders error state and refetches on button click', async () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationDetailQuery').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Detay verisi alınamadı'),
      refetch: mockRefetch,
    } as any);

    render(<ApplicationDetailPage />);

    expect(screen.getByText('Başvuru Yüklenemedi')).toBeInTheDocument();
    expect(screen.getByText('Detay verisi alınamadı')).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /yeniden dene/i });
    await userEvent.click(retryButton);

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('renders not found state when application does not exist', () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationDetailQuery').mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<ApplicationDetailPage />);

    expect(screen.getByText('Başvuru Bulunamadı')).toBeInTheDocument();
  });

  it('renders application details correctly when data is loaded', () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationDetailQuery').mockReturnValue({
      data: sampleApp,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<ApplicationDetailPage />);

    expect(screen.getByRole('heading', { name: sampleApp.company_name })).toBeInTheDocument();
    expect(screen.getByText(sampleApp.position)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /düzenle/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sil/i })).toBeInTheDocument();
  });
});
