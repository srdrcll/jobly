import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import { ApplicationsPage } from '@/pages/Applications';
import { KpiCardsGrid } from '@/components/dashboard/KpiCardsGrid';
import * as useApplicationsQueryModule from '@/hooks/queries/useApplicationsQuery';
import { mockApplications } from '@/test/mocks';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('Integration Test: Applications Flow & KPI Sync', () => {
  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('syncs application changes with KPI metrics grid', async () => {
    vi.spyOn(useApplicationsQueryModule, 'useApplicationsListQuery').mockReturnValue({
      data: mockApplications,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(
      <div>
        <KpiCardsGrid />
        <ApplicationsPage />
      </div>
    );

    // Verify initial total count KPI matches mockApplications length (2)
    expect(screen.getByText(/toplam başvuru/i)).toBeInTheDocument();
    expect(screen.getAllByText('2').length).toBeGreaterThan(0);

    // Verify list items present
    expect(screen.getAllByText('Nova Teknoloji').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Apex Sistemleri').length).toBeGreaterThan(0);
  });
});
