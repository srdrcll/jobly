import { DbInterview } from '@/types';

/**
 * Formats a Date object to RFC 5545 UTC iCal format: YYYYMMDDTHHmmssZ
 */
export function formatDateToIcsUTC(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Calculates start and end Date objects from interview date, time, and duration
 */
export function getInterviewStartAndEndDates(interview: DbInterview): { start: Date; end: Date } {
  const datePart = interview.date || new Date().toISOString().split('T')[0];
  const timePart = interview.time || '14:00';
  const durationMinutes = interview.duration_minutes || 45;

  const [hours, minutes] = timePart.split(':').map((num) => parseInt(num, 10) || 0);

  const startDate = new Date(datePart);
  startDate.setHours(hours, minutes, 0, 0);

  // If date parsing failed, fallback to current time
  if (isNaN(startDate.getTime())) {
    const fallbackStart = new Date();
    const fallbackEnd = new Date(fallbackStart.getTime() + durationMinutes * 60 * 1000);
    return { start: fallbackStart, end: fallbackEnd };
  }

  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);
  return { start: startDate, end: endDate };
}

/**
 * Builds standard description string for calendar events
 */
export function buildInterviewDescription(interview: DbInterview): string {
  const lines: string[] = [
    `🎯 Pozisyon: ${interview.position}`,
    `🏢 Şirket: ${interview.company_name}`,
    `📋 Aşama: ${interview.stage || 'Mülakat Görüşmesi'}`,
    `⏱️ Süre: ${interview.duration_minutes || 45} Dakika`,
    `💼 Tür: ${interview.type || 'Online'}`,
  ];

  if (interview.interviewer_name) {
    lines.push(`👤 Mülakatçı: ${interview.interviewer_name} (${interview.interviewer_role || 'İK/Yetkili'})`);
  }

  if (interview.meeting_link) {
    lines.push(`🔗 Toplantı Linki: ${interview.meeting_link}`);
  }

  if (interview.prep_notes) {
    lines.push(`\n📝 Hazırlık Notları:\n${interview.prep_notes}`);
  }

  lines.push('\n---\n🧭 Kariyer Pusulası tarafından oluşturuldu.');

  return lines.join('\n');
}

/**
 * Generates a 1-click Google Calendar Add URL
 */
export function generateGoogleCalendarUrl(interview: DbInterview): string {
  const { start, end } = getInterviewStartAndEndDates(interview);
  const title = `Mülakat: ${interview.company_name} — ${interview.position}`;
  const description = buildInterviewDescription(interview);
  const location = interview.meeting_link || interview.type || 'Online';

  const startFormatted = formatDateToIcsUTC(start);
  const endFormatted = formatDateToIcsUTC(end);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startFormatted}/${endFormatted}`,
    details: description,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates a 1-click Outlook Live / Office 365 Calendar URL
 */
export function generateOutlookCalendarUrl(interview: DbInterview): string {
  const { start, end } = getInterviewStartAndEndDates(interview);
  const title = `Mülakat: ${interview.company_name} — ${interview.position}`;
  const description = buildInterviewDescription(interview);
  const location = interview.meeting_link || interview.type || 'Online';

  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: title,
    startdt: start.toISOString(),
    enddt: end.toISOString(),
    body: description,
    location,
  });

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Generates RFC 5545 compliant iCalendar (.ics) format string
 */
export function generateIcsContent(interviewsInput: DbInterview | DbInterview[]): string {
  const interviews = Array.isArray(interviewsInput) ? interviewsInput : [interviewsInput];

  const nowFormatted = formatDateToIcsUTC(new Date());

  const eventBlocks = interviews.map((interview) => {
    const { start, end } = getInterviewStartAndEndDates(interview);
    const startFormatted = formatDateToIcsUTC(start);
    const endFormatted = formatDateToIcsUTC(end);

    const title = `Mülakat: ${interview.company_name} - ${interview.position}`;
    const description = buildInterviewDescription(interview)
      .replace(/\r?\n/g, '\\n')
      .replace(/,/g, '\\,')
      .replace(/;/g, '\\;');
    const location = (interview.meeting_link || interview.type || 'Online')
      .replace(/,/g, '\\,')
      .replace(/;/g, '\\;');

    const uid = `interview-${interview.id}-${Date.now()}@kariyerpusulasi.com`;

    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${nowFormatted}`,
      `DTSTART:${startFormatted}`,
      `DTEND:${endFormatted}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'TRANSP:OPAQUE',
      'END:VEVENT',
    ].join('\r\n');
  });

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kariyer Pusulasi//Mülakat Takvimi v1.0//TR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...eventBlocks,
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Initiates a browser file download for .ics content
 */
export function downloadIcsFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.ics') ? filename : `${filename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Helper to download all upcoming interviews as a single .ics calendar file
 */
export function exportAllInterviewsToIcs(interviews: DbInterview[], filename = 'Kariyer_Pusulasi_Mulakatlar.ics'): void {
  if (!interviews || interviews.length === 0) return;
  const icsContent = generateIcsContent(interviews);
  downloadIcsFile(filename, icsContent);
}
