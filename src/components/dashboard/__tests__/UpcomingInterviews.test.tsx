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
        companyName: 'Apex Sistemleri',
        position: 'Senior SWE',
        stage: 'Teknik Mülakat',
        type: 'Online',
        date: 'Bugün, 14:30',
        time: '14:00',
        durationMinutes: 45,
        daysLeft: 5,
        isToday: false,
        isWithin24Hours: true,
      },
    ];

    render(<UpcomingInterviews interviews={mockInterviews} />);

    expect(screen.getByText('Apex Sistemleri')).toBeInTheDocument();
    expect(screen.getByText('Senior SWE')).toBeInTheDocument();
    expect(screen.getByText('Teknik Mülakat')).toBeInTheDocument();
  });
});
