import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  formatDateToIcsUTC,
  getInterviewStartAndEndDates,
  buildInterviewDescription,
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
  generateIcsContent,
  downloadIcsFile,
  exportAllInterviewsToIcs,
} from '../calendarIntegrationUtils';
import { DbInterview } from '@/types';

describe('calendarIntegrationUtils', () => {
  const sampleInterview: DbInterview = {
    id: 'int-123',
    user_id: 'user-1',
    company_name: 'Tech Corp',
    position: 'Senior Frontend Developer',
    stage: 'Teknik Mülakat',
    date: '2026-09-15',
    time: '15:30',
    duration_minutes: 60,
    type: 'Online',
    meeting_link: 'https://meet.google.com/abc-def-ghi',
    interviewer_name: 'Ahmet Yılmaz',
    interviewer_role: 'Lead Architect',
    prep_notes: 'React state management ve mimari soruları çalışılacak.',
    created_at: '2026-09-01T10:00:00Z',
    updated_at: '2026-09-01T10:00:00Z',
  };

  describe('formatDateToIcsUTC', () => {
    it('formats UTC date correctly into YYYYMMDDTHHmmssZ', () => {
      const d = new Date(Date.UTC(2026, 8, 15, 12, 30, 0)); // 2026-09-15 12:30:00 UTC
      expect(formatDateToIcsUTC(d)).toBe('20260915T123000Z');
    });
  });

  describe('getInterviewStartAndEndDates', () => {
    it('calculates start and end dates accurately with duration', () => {
      const { start, end } = getInterviewStartAndEndDates(sampleInterview);
      expect(start.getFullYear()).toBe(2026);
      expect(start.getMonth()).toBe(8); // September (0-indexed 8)
      expect(start.getDate()).toBe(15);
      expect(start.getHours()).toBe(15);
      expect(start.getMinutes()).toBe(30);

      // Duration is 60 minutes -> 16:30
      expect(end.getHours()).toBe(16);
      expect(end.getMinutes()).toBe(30);
    });

    it('falls back safely if date parsing produces NaN', () => {
      const invalidInterview = { ...sampleInterview, date: 'invalid-date' };
      const { start, end } = getInterviewStartAndEndDates(invalidInterview);
      expect(start).toBeInstanceOf(Date);
      expect(end).toBeInstanceOf(Date);
      expect(end.getTime()).toBeGreaterThan(start.getTime());
    });
  });

  describe('buildInterviewDescription', () => {
    it('includes all necessary interview metadata', () => {
      const desc = buildInterviewDescription(sampleInterview);
      expect(desc).toContain('Tech Corp');
      expect(desc).toContain('Senior Frontend Developer');
      expect(desc).toContain('Teknik Mülakat');
      expect(desc).toContain('Ahmet Yılmaz');
      expect(desc).toContain('https://meet.google.com/abc-def-ghi');
      expect(desc).toContain('React state management');
      expect(desc).toContain('Kariyer Pusulası');
    });
  });

  describe('generateGoogleCalendarUrl', () => {
    it('generates valid Google Calendar render template URL', () => {
      const url = generateGoogleCalendarUrl(sampleInterview);
      expect(url).toContain('https://calendar.google.com/calendar/render');
      expect(url).toContain('action=TEMPLATE');
      const decodedUrl = decodeURIComponent(url.replace(/\+/g, ' '));
      expect(decodedUrl).toContain('Mülakat: Tech Corp — Senior Frontend Developer');
      expect(decodedUrl).toContain('https://meet.google.com/abc-def-ghi');
    });
  });

  describe('generateOutlookCalendarUrl', () => {
    it('generates valid Outlook Live calendar deep link URL', () => {
      const url = generateOutlookCalendarUrl(sampleInterview);
      expect(url).toContain('https://outlook.live.com/calendar/0/deeplink/compose');
      expect(url).toContain('rru=addevent');
      const decodedUrl = decodeURIComponent(url.replace(/\+/g, ' '));
      expect(decodedUrl).toContain('Mülakat: Tech Corp — Senior Frontend Developer');
    });
  });

  describe('generateIcsContent', () => {
    it('generates RFC 5545 valid VCALENDAR and VEVENT string for single interview', () => {
      const ics = generateIcsContent(sampleInterview);
      expect(ics).toContain('BEGIN:VCALENDAR');
      expect(ics).toContain('VERSION:2.0');
      expect(ics).toContain('PRODID:-//Kariyer Pusulasi//Mülakat Takvimi v1.0//TR');
      expect(ics).toContain('BEGIN:VEVENT');
      expect(ics).toContain('SUMMARY:Mülakat: Tech Corp - Senior Frontend Developer');
      expect(ics).toContain('STATUS:CONFIRMED');
      expect(ics).toContain('END:VEVENT');
      expect(ics).toContain('END:VCALENDAR');
    });

    it('generates multiple VEVENT blocks for batch interviews', () => {
      const interview2 = { ...sampleInterview, id: 'int-456', company_name: 'Second Company' };
      const ics = generateIcsContent([sampleInterview, interview2]);
      const eventMatches = ics.match(/BEGIN:VEVENT/g);
      expect(eventMatches?.length).toBe(2);
      expect(ics).toContain('Second Company');
    });
  });

  describe('downloadIcsFile & exportAllInterviewsToIcs', () => {
    beforeEach(() => {
      // Mock DOM methods for download
      vi.spyOn(document.body, 'appendChild').mockImplementation(() => document.createElement('div'));
      vi.spyOn(document.body, 'removeChild').mockImplementation(() => document.createElement('div'));
      global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
      global.URL.revokeObjectURL = vi.fn();
    });

    it('triggers file download without crashing', () => {
      expect(() => {
        downloadIcsFile('test.ics', 'BEGIN:VCALENDAR\nEND:VCALENDAR');
      }).not.toThrow();

      expect(global.URL.createObjectURL).toHaveBeenCalled();
    });

    it('exports all interviews without error', () => {
      expect(() => {
        exportAllInterviewsToIcs([sampleInterview]);
      }).not.toThrow();
    });
  });
});
