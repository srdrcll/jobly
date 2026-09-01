import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddToCalendarButton } from '../AddToCalendarButton';
import { DbInterview } from '@/types';
import * as calendarUtils from '@/utils/calendarIntegrationUtils';

describe('AddToCalendarButton Component', () => {
  const mockInterview: DbInterview = {
    id: 'int-999',
    user_id: 'user-1',
    company_name: 'Stripe',
    position: 'Full Stack Engineer',
    stage: 'Teknik Değerlendirme',
    date: '2026-09-20',
    time: '16:00',
    duration_minutes: 45,
    type: 'Online',
    meeting_link: 'https://zoom.us/j/123456789',
    created_at: '2026-09-01T10:00:00Z',
    updated_at: '2026-09-01T10:00:00Z',
  };

  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => null);
    vi.spyOn(calendarUtils, 'downloadIcsFile').mockImplementation(() => {});
  });

  it('renders button and toggles dropdown on click', () => {
    render(<AddToCalendarButton interview={mockInterview} />);

    const button = screen.getByRole('button', { name: /takvime ekle/i });
    expect(button).toBeInTheDocument();

    // Menu closed initially
    expect(screen.queryByText('Google Calendar')).not.toBeInTheDocument();

    // Open menu
    fireEvent.click(button);
    expect(screen.getByText('Google Calendar')).toBeInTheDocument();
    expect(screen.getByText('Outlook Web')).toBeInTheDocument();
    expect(screen.getByText('Apple / iCal Dosyası')).toBeInTheDocument();

    // Close menu on click again
    fireEvent.click(button);
    expect(screen.queryByText('Google Calendar')).not.toBeInTheDocument();
  });

  it('handles Google Calendar click and opens link in new window', () => {
    render(<AddToCalendarButton interview={mockInterview} />);

    fireEvent.click(screen.getByRole('button', { name: /takvime ekle/i }));
    const googleBtn = screen.getByText('Google Calendar');
    fireEvent.click(googleBtn);

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('https://calendar.google.com/calendar/render'),
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('handles Outlook Web click and opens link in new window', () => {
    render(<AddToCalendarButton interview={mockInterview} />);

    fireEvent.click(screen.getByRole('button', { name: /takvime ekle/i }));
    const outlookBtn = screen.getByText('Outlook Web');
    fireEvent.click(outlookBtn);

    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('https://outlook.live.com/calendar/0/deeplink/compose'),
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('handles Apple/iCal .ics download click', () => {
    render(<AddToCalendarButton interview={mockInterview} />);

    fireEvent.click(screen.getByRole('button', { name: /takvime ekle/i }));
    const icsBtn = screen.getByText('Apple / iCal Dosyası');
    fireEvent.click(icsBtn);

    expect(calendarUtils.downloadIcsFile).toHaveBeenCalled();
  });

  it('renders icon-only variant properly', () => {
    render(<AddToCalendarButton interview={mockInterview} iconOnly />);

    const iconBtn = screen.getByLabelText('Takvime Ekle');
    expect(iconBtn).toBeInTheDocument();

    fireEvent.click(iconBtn);
    expect(screen.getByText('Google Calendar')).toBeInTheDocument();
  });
});
