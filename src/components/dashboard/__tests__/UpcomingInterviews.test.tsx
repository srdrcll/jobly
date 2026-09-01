import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { UpcomingInterviews } from '../UpcomingInterviews';
import { InterviewItemData } from '@/utils/interviewUtils';
import React from 'react';

describe('UpcomingInterviews Component', () => {
  it('renders empty state when no upcoming interviews exist', () => {
    render(<UpcomingInterviews interviews={[]} />);

    expect(screen.getByText('Planlanmış Mülakat Bulunmuyor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /başvuruları/i })).toBeInTheDocument();
  });

  it('renders list of interviews when data is provided', () => {
    const mockInterviews: InterviewItemData[] = [
      {
        id: 'int-1',
        applicationId: 'app-1',
        companyName: 'Apex Sistemleri',
        position: 'Senior SWE',
        location: 'Remote',
        workType: 'Remote',
        interviewType: 'Teknik Mülakat',
        dateFormatted: 'Bugün, 14:30',
        timeFormatted: '14:30',
        isWithin24Hours: true,
        status: 'interview',
        rawDate: new Date().toISOString(),
      },
    ];

    render(<UpcomingInterviews interviews={mockInterviews} />);

    expect(screen.getByText('Apex Sistemleri')).toBeInTheDocument();
    expect(screen.getByText('Senior SWE')).toBeInTheDocument();
    expect(screen.getByText('Teknik Mülakat')).toBeInTheDocument();
  });
});
