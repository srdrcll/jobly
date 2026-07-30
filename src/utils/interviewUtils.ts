import { DbApplication } from '@/types';

export interface InterviewItemData {
  id: string;
  applicationId: string;
  companyName: string;
  position: string;
  location: string;
  workType: 'Remote' | 'Hybrid' | 'On-site' | 'Bilinmiyor';
  interviewType: string; // e.g. "Online (Google Meet / Zoom)", "Ofis Mülakatı"
  dateFormatted: string; // e.g. "Bugün, 14:30" or "28 Temmuz 2026"
  timeFormatted: string; // e.g. "14:30"
  isWithin24Hours: boolean;
  status: string;
  rawDate: string;
}

/**
 * Filters applications in interview / case_study / contacted status and builds interview items.
 */
export function extractUpcomingInterviews(applications: DbApplication[] = []): InterviewItemData[] {
  if (!applications || applications.length === 0) return [];

  const interviewApps = applications.filter(
    (app) => app.status === 'interview' || app.status === 'case_study' || app.status === 'contacted'
  );

  const now = new Date();
  const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const interviews: InterviewItemData[] = interviewApps.map((app) => {
    const rawDate = app.applied_date || app.updated_at || app.created_at;
    const dateObj = new Date(rawDate);
    const isValidDate = !isNaN(dateObj.getTime());

    // Check if within next 24 hours
    const isWithin24Hours = isValidDate && dateObj >= now && dateObj <= twentyFourHoursLater;

    let interviewType = 'Online Mülakat';
    if (app.work_type === 'On-site') {
      interviewType = 'Ofis Mülakatı (Yüz Yüze)';
    } else if (app.work_type === 'Hybrid') {
      interviewType = 'Hibrit Mülakat';
    } else if (app.work_type === 'Remote') {
      interviewType = 'Online (Google Meet / Zoom)';
    }

    let dateFormatted = 'Yakında';
    let timeFormatted = '14:00';

    if (isValidDate) {
      const isToday = dateObj.toDateString() === now.toDateString();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      const isTomorrow = dateObj.toDateString() === tomorrow.toDateString();

      timeFormatted = dateObj.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

      if (isToday) {
        dateFormatted = `Bugün, ${timeFormatted}`;
      } else if (isTomorrow) {
        dateFormatted = `Yarın, ${timeFormatted}`;
      } else {
        dateFormatted = dateObj.toLocaleDateString('tr-TR', {
          day: 'numeric',
          month: 'long',
          weekday: 'short',
        });
      }
    }

    return {
      id: `interview-${app.id}`,
      applicationId: app.id,
      companyName: app.company_name,
      position: app.position,
      location: app.location || 'Uzaktan',
      workType: app.work_type || 'Remote',
      interviewType,
      dateFormatted,
      timeFormatted,
      isWithin24Hours,
      status: app.status,
      rawDate,
    };
  });

  // Sort by rawDate (nearest date first)
  interviews.sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime());

  return interviews;
}
