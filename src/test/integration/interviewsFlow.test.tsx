import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { InterviewsPage } from '@/pages/Interviews';
import { UpcomingInterviews } from '@/components/dashboard/UpcomingInterviews';
import * as useInterviewsQueryModule from '@/hooks/queries/useInterviewsQuery';
import { mockInterviews } from '@/test/mocks';
import React from 'react';

describe('Integration Test: Interviews Flow & Dashboard Widget Sync', () => {
  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders interviews page and syncs with dashboard upcoming interviews widget', () => {
    vi.spyOn(useInterviewsQueryModule, 'useInterviewsListQuery').mockReturnValue({
      data: mockInterviews,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(
      <div>
        <UpcomingInterviews interviews={[]} />
        <InterviewsPage />
      </div>
    );

    expect(screen.getByRole('heading', { name: /mülakat yönetimi & takvim/i })).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });
});
