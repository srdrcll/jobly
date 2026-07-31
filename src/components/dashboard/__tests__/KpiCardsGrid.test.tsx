import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { KpiCardsGrid } from '../KpiCardsGrid';
import React from 'react';
import * as useApplicationsQueryModule from '@/hooks/queries/useApplicationsQuery';
import { mockApplications } from '@/test/mocks';
import userEvent from '@testing-library/user-event';

describe('KpiCardsGrid Component', () => {
  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading skeletons when query is loading', () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationsListQuery').mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<KpiCardsGrid />);

    expect(screen.getByLabelText('Yükleniyor...')).toBeInTheDocument();
  });

  it('renders error alert and handles refetch click when query fails', async () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationsListQuery').mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: new Error('Sunucuya ulaşılamadı'),
      refetch: mockRefetch,
    } as any);

    render(<KpiCardsGrid />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('İstatistikler Yüklenemedi')).toBeInTheDocument();
    expect(screen.getByText('Sunucuya ulaşılamadı')).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /tekrar dene/i });
    await userEvent.click(retryButton);

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('renders empty banner when no applications exist and triggers modal callback', async () => {
    const handleOpenNewModal = vi.fn();

    vi.spyOn(useApplicationsQueryModule, 'useApplicationsListQuery').mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<KpiCardsGrid onOpenNewModal={handleOpenNewModal} />);

    expect(screen.getByText('Henüz Kayıtlı Başvurunuz Bulunmuyor')).toBeInTheDocument();

    const addButton = screen.getByRole('button', { name: /ilk başvuruyu ekle/i });
    await userEvent.click(addButton);

    expect(handleOpenNewModal).toHaveBeenCalledTimes(1);
  });

  it('renders all 6 KPI cards with calculated metrics when applications data is loaded', () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationsListQuery').mockReturnValue({
      data: mockApplications,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<KpiCardsGrid />);

    expect(screen.getByText('TOPLAM BAŞVURU')).toBeInTheDocument();
    expect(screen.getByText('AKTİF BAŞVURULAR')).toBeInTheDocument();
    expect(screen.getByText('MÜLAKAT SÜRECİNDE')).toBeInTheDocument();
    expect(screen.getByText('ALINAN TEKLİFLER')).toBeInTheDocument();
    expect(screen.getByText('REDDEDİLENLER')).toBeInTheDocument();
    expect(screen.getByText('BAŞARI ORANI')).toBeInTheDocument();

    // mockApplications total length is 2
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
