import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { UpcomingInterviews } from '../UpcomingInterviews';
import { InterviewItemData } from '@/utils/interviewUtils';
import React from 'react';

describe('UpcomingInterviews Component', () => {
  it('renders empty state when no upcoming interviews exist', () => {
    render(<UpcomingInterviews interviews={[]} />);

    expect(screen.getByText('Planlanmış Mülakat Bulunmuyor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /başvuruları incele/i })).toBeInTheDocument();
  });

  it('renders list of interviews when data is provided', () => {
    const mockInterviews: InterviewItemData[] = [
      {
        id: 'int-1',
        companyName: 'Google',
        position: 'Software Engineer',
        stage: 'Teknik Görüşme',
        type: 'Online',
        date: '2026-08-05',
        time: '14:00',
        durationMinutes: 45,
        daysLeft: 5,
        isToday: false,
      },
    ];

    render(<UpcomingInterviews interviews={mockInterviews} />);

    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Teknik Görüşme')).toBeInTheDocument();
  });
});
