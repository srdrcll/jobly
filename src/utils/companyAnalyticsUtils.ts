import { DbApplication, DbCompany } from '@/types';

export interface CompanyMetrics {
  total: number;
  active: number;
  interviews: number;
  offers: number;
  rejections: number;
  successRate: number;
}

export interface CompanyTimelineEvent {
  id: string;
  applicationId: string;
  position: string;
  title: string;
  description: string;
  type: 'created' | 'interview' | 'status_changed' | 'offer';
  timestamp: string;
  formattedDate: string;
}

export interface CompanyContact {
  id: string;
  name: string;
  position?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  notes?: string;
}

/**
 * Filters applications belonging to a specific company by company_id or company_name match.
 */
export function getApplicationsForCompany(
  company: DbCompany,
  allApplications: DbApplication[] = []
): DbApplication[] {
  if (!company || !allApplications) return [];

  const companyNameLower = company.name.toLowerCase().trim();

  return allApplications.filter(
    (app) =>
      (app.company_id && app.company_id === company.id) ||
      (app.company_name && app.company_name.toLowerCase().trim() === companyNameLower)
  );
}

/**
 * Calculates relationship statistics for a single company based on its linked applications.
 */
export function calculateCompanyMetrics(companyApplications: DbApplication[] = []): CompanyMetrics {
  if (!companyApplications || companyApplications.length === 0) {
    return {
      total: 0,
      active: 0,
      interviews: 0,
      offers: 0,
      rejections: 0,
      successRate: 0,
    };
  }

  const total = companyApplications.length;
  const active = companyApplications.filter((a) => a.status !== 'rejected' && a.status !== 'saved').length;
  const interviews = companyApplications.filter(
    (a) => a.status === 'interview' || a.status === 'case_study' || a.status === 'contacted'
  ).length;
  const offers = companyApplications.filter((a) => a.status === 'offer').length;
  const rejections = companyApplications.filter((a) => a.status === 'rejected').length;
  const positiveOutcomes = offers + interviews;
  const successRate = total > 0 ? Number(((positiveOutcomes / total) * 100).toFixed(1)) : 0;

  return {
    total,
    active,
    interviews,
    offers,
    rejections,
    successRate,
  };
}

/**
 * Extracts chronological application timeline events for a company.
 */
export function extractCompanyTimeline(companyApplications: DbApplication[] = []): CompanyTimelineEvent[] {
  if (!companyApplications || companyApplications.length === 0) return [];

  const events: CompanyTimelineEvent[] = [];

  companyApplications.forEach((app) => {
    // 1. Created Event
    if (app.created_at) {
      events.push({
        id: `created-${app.id}`,
        applicationId: app.id,
        position: app.position,
        title: 'Başvuru Gönderildi',
        description: `'${app.position}' pozisyonu için başvuru sisteme kaydedildi.`,
        type: 'created',
        timestamp: app.created_at,
        formattedDate: new Date(app.created_at).toLocaleDateString('tr-TR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      });
    }

    // 2. Interview Event
    if (app.status === 'interview' || app.status === 'case_study') {
      const timeStr = app.updated_at || app.applied_date || app.created_at;
      events.push({
        id: `interview-${app.id}`,
        applicationId: app.id,
        position: app.position,
        title: app.status === 'case_study' ? 'Vaka Çalışması Başladı' : 'Mülakat Daveti Alındı',
        description: `'${app.position}' süreci mülakat aşamasına geçti.`,
        type: 'interview',
        timestamp: timeStr,
        formattedDate: new Date(timeStr).toLocaleDateString('tr-TR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      });
    }

    // 3. Offer Event
    if (app.status === 'offer') {
      const timeStr = app.updated_at || app.created_at;
      events.push({
        id: `offer-${app.id}`,
        applicationId: app.id,
        position: app.position,
        title: 'İş Teklifi Alındı! 🏆',
        description: `'${app.position}' pozisyonu için teklif sunuldu.`,
        type: 'offer',
        timestamp: timeStr,
        formattedDate: new Date(timeStr).toLocaleDateString('tr-TR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      });
    }
  });

  // Sort by timestamp descending
  return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

/**
 * Extracts contacts list from company record fields.
 */
export function extractCompanyContacts(company: DbCompany): CompanyContact[] {
  if (!company) return [];

  const contacts: CompanyContact[] = [];

  if (company.contact_person || company.contact_email || company.contact_phone) {
    contacts.push({
      id: `main-contact-${company.id}`,
      name: company.contact_person || 'Ana İletişim Kişisi',
      position: 'İK / Talent Acquisition',
      email: company.contact_email || undefined,
      phone: company.contact_phone || undefined,
      linkedinUrl: company.linkedin_url || undefined,
      notes: 'Şirket ana iletişim rehberi kaydı',
    });
  }

  return contacts;
}
