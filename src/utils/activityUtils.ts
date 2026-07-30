import { DbApplication } from '@/types';

export type ActivityType = 'created' | 'updated' | 'status_changed' | 'interview_scheduled';

export interface ActivityEvent {
  id: string;
  applicationId: string;
  type: ActivityType;
  title: string;
  description: string;
  companyName: string;
  position: string;
  timestamp: string;
  formattedTime: string;
}

export function formatRelativeTime(dateString: string): string {
  if (!dateString) return 'Bilinmiyor';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Bilinmiyor';

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Az önce';
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} dakika önce`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} saat önce`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'Dün';
  }
  if (diffInDays < 7) {
    return `${diffInDays} gün önce`;
  }

  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const STATUS_LABELS: Record<string, string> = {
  saved: 'Kaydedildi',
  applied: 'Başvuruldu',
  contacted: 'İletişime Geçildi',
  interview: 'Mülakat',
  case_study: 'Vaka / Case Study',
  offer: 'Teklif Alındı',
  rejected: 'Reddedildi',
};

/**
 * Extracts and formats up to 10 latest user activities from applications.
 */
export function extractRecentActivities(applications: DbApplication[] = [], maxItems = 10): ActivityEvent[] {
  if (!applications || applications.length === 0) return [];

  const events: ActivityEvent[] = [];

  applications.forEach((app) => {
    // 1. Application Created Event
    if (app.created_at) {
      events.push({
        id: `created-${app.id}`,
        applicationId: app.id,
        type: 'created',
        title: 'Yeni Başvuru Eklendi',
        description: `${app.company_name} — ${app.position} başvurusu sisteme eklendi.`,
        companyName: app.company_name,
        position: app.position,
        timestamp: app.created_at,
        formattedTime: formatRelativeTime(app.created_at),
      });
    }

    // 2. Interview Scheduled Event
    if (app.status === 'interview' || app.status === 'case_study') {
      const timeStr = app.updated_at || app.applied_date || app.created_at;
      events.push({
        id: `interview-${app.id}`,
        applicationId: app.id,
        type: 'interview_scheduled',
        title: app.status === 'case_study' ? 'Vaka Süreci Başladı' : 'Mülakat Planlandı',
        description: `${app.company_name} ile ${app.status === 'case_study' ? 'teknik vaka' : 'mülakat süreci'} takvime eklendi.`,
        companyName: app.company_name,
        position: app.position,
        timestamp: timeStr,
        formattedTime: formatRelativeTime(timeStr),
      });
    }

    // 3. Status Changed Event (if updated_at differs from created_at)
    if (app.updated_at && app.updated_at !== app.created_at && app.status !== 'interview') {
      const statusLabel = STATUS_LABELS[app.status] || app.status;
      events.push({
        id: `updated-${app.id}`,
        applicationId: app.id,
        type: 'status_changed',
        title: 'Başvuru Durumu Güncellendi',
        description: `${app.company_name} başvurusu '${statusLabel}' olarak güncellendi.`,
        companyName: app.company_name,
        position: app.position,
        timestamp: app.updated_at,
        formattedTime: formatRelativeTime(app.updated_at),
      });
    }
  });

  // Sort by timestamp descending
  events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Return top N events
  return events.slice(0, maxItems);
}
