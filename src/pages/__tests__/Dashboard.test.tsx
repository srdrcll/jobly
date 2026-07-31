import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { DashboardPage } from '../Dashboard';
import React from 'react';
import * as useApplicationsQueryModule from '@/hooks/queries/useApplicationsQuery';
import { mockApplications } from '@/test/mocks';

describe('DashboardPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all main dashboard sections and widgets correctly', () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationsListQuery').mockReturnValue({
      data: mockApplications,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    } as any);

    render(<DashboardPage />);

    expect(screen.getByText('HIZLI İŞ AKIŞLARI')).toBeInTheDocument();
    expect(screen.getByText('CANLI İSTATİSTİK İCMALİ')).toBeInTheDocument();
    expect(screen.getByText('Kariyer Analizleri & Akıllı Tavsiyeler')).toBeInTheDocument();
    expect(screen.getByText('Son Aktiviteler & Mülakatlar')).toBeInTheDocument();
  });
});
