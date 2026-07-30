import { DbCompany, DbApplication } from '@/types';

export type InteractionType = 
  | 'linkedin' 
  | 'email' 
  | 'phone' 
  | 'interview' 
  | 'followup' 
  | 'meeting' 
  | 'recruiter_msg';

export interface CompanyInteraction {
  id: string;
  companyId: string;
  contactName?: string;
  type: InteractionType;
  date: string;
  description: string;
  outcome?: string;
  nextFollowUpDate?: string;
}

export interface CompanyNoteItem {
  id: string;
  companyId: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyTaskItem {
  id: string;
  companyId: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'Düşük' | 'Orta' | 'Yüksek' | 'Kritik';
  status: 'Pending' | 'In Progress' | 'Completed';
  completed: boolean;
}

export interface NetworkContact {
  id: string;
  companyId: string;
  fullName: string;
  jobTitle: string;
  department?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  notes?: string;
}

// Local Storage Keys for structured CRM sub-entities
const CRM_INTERACTIONS_KEY = 'kp_crm_interactions_v1';
const CRM_NOTES_KEY = 'kp_crm_notes_v1';
const CRM_TASKS_KEY = 'kp_crm_tasks_v1';
const CRM_CONTACTS_KEY = 'kp_crm_contacts_v1';

/* -------------------------------------------------------------------------- */
/* 1. Interactions Management                                                */
/* -------------------------------------------------------------------------- */

export function getCompanyInteractions(companyId: string): CompanyInteraction[] {
  try {
    const raw = localStorage.getItem(CRM_INTERACTIONS_KEY);
    if (!raw) return getInitialInteractions(companyId);
    const all: CompanyInteraction[] = JSON.parse(raw);
    return all.filter((i) => i.companyId === companyId);
  } catch {
    return getInitialInteractions(companyId);
  }
}

export function saveCompanyInteraction(interaction: Omit<CompanyInteraction, 'id'>): CompanyInteraction {
  const newInteraction: CompanyInteraction = {
    ...interaction,
    id: `int-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
  };

  try {
    const raw = localStorage.getItem(CRM_INTERACTIONS_KEY);
    const all: CompanyInteraction[] = raw ? JSON.parse(raw) : [];
    all.unshift(newInteraction);
    localStorage.setItem(CRM_INTERACTIONS_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save CRM interaction', e);
  }

  return newInteraction;
}

function getInitialInteractions(companyId: string): CompanyInteraction[] {
  return [
    {
      id: `int-initial-${companyId}`,
      companyId,
      contactName: 'İK Yöneticisi',
      type: 'linkedin',
      date: new Date().toISOString(),
      description: 'LinkedIn üzerinden bağlantı kuruldu ve ön tanıtım mesajı iletildi.',
      outcome: 'Bağlantı kabul edildi.',
      nextFollowUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
}

/* -------------------------------------------------------------------------- */
/* 2. Pinned Notes Management                                                 */
/* -------------------------------------------------------------------------- */

export function getCompanyNotes(companyId: string): CompanyNoteItem[] {
  try {
    const raw = localStorage.getItem(CRM_NOTES_KEY);
    if (!raw) return [];
    const all: CompanyNoteItem[] = JSON.parse(raw);
    return all
      .filter((n) => n.companyId === companyId)
      .sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
  } catch {
    return [];
  }
}

export function saveCompanyNote(note: Omit<CompanyNoteItem, 'id' | 'createdAt' | 'updatedAt'>): CompanyNoteItem {
  const now = new Date().toISOString();
  const newNote: CompanyNoteItem = {
    ...note,
    id: `note-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const raw = localStorage.getItem(CRM_NOTES_KEY);
    const all: CompanyNoteItem[] = raw ? JSON.parse(raw) : [];
    all.unshift(newNote);
    localStorage.setItem(CRM_NOTES_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save CRM note', e);
  }

  return newNote;
}

export function toggleNotePin(noteId: string): void {
  try {
    const raw = localStorage.getItem(CRM_NOTES_KEY);
    if (!raw) return;
    const all: CompanyNoteItem[] = JSON.parse(raw);
    const target = all.find((n) => n.id === noteId);
    if (target) {
      target.isPinned = !target.isPinned;
      localStorage.setItem(CRM_NOTES_KEY, JSON.stringify(all));
    }
  } catch (e) {
    console.error('Failed to pin note', e);
  }
}

export function deleteCompanyNote(noteId: string): void {
  try {
    const raw = localStorage.getItem(CRM_NOTES_KEY);
    if (!raw) return;
    const all: CompanyNoteItem[] = JSON.parse(raw);
    const filtered = all.filter((n) => n.id !== noteId);
    localStorage.setItem(CRM_NOTES_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to delete note', e);
  }
}

/* -------------------------------------------------------------------------- */
/* 3. Company Specific Tasks Management                                       */
/* -------------------------------------------------------------------------- */

export function getCompanyTasks(companyId: string): CompanyTaskItem[] {
  try {
    const raw = localStorage.getItem(CRM_TASKS_KEY);
    if (!raw) return getInitialCompanyTasks(companyId);
    const all: CompanyTaskItem[] = JSON.parse(raw);
    return all.filter((t) => t.companyId === companyId);
  } catch {
    return getInitialCompanyTasks(companyId);
  }
}

export function saveCompanyTask(task: Omit<CompanyTaskItem, 'id' | 'completed'>): CompanyTaskItem {
  const newTask: CompanyTaskItem = {
    ...task,
    id: `task-${Date.now()}`,
    completed: task.status === 'Completed',
  };

  try {
    const raw = localStorage.getItem(CRM_TASKS_KEY);
    const all: CompanyTaskItem[] = raw ? JSON.parse(raw) : [];
    all.unshift(newTask);
    localStorage.setItem(CRM_TASKS_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save CRM task', e);
  }

  return newTask;
}

export function toggleCompanyTaskCompleted(taskId: string): void {
  try {
    const raw = localStorage.getItem(CRM_TASKS_KEY);
    if (!raw) return;
    const all: CompanyTaskItem[] = JSON.parse(raw);
    const target = all.find((t) => t.id === taskId);
    if (target) {
      target.completed = !target.completed;
      target.status = target.completed ? 'Completed' : 'Pending';
      localStorage.setItem(CRM_TASKS_KEY, JSON.stringify(all));
    }
  } catch (e) {
    console.error('Failed to toggle task', e);
  }
}

function getInitialCompanyTasks(companyId: string): CompanyTaskItem[] {
  return [
    {
      id: `task-1-${companyId}`,
      companyId,
      title: 'Teknoloji Ekibi & Tech Stack Araştırması Yap',
      description: 'Şirketin kullandığı mimari, bulut sağlayıcıları ve frontend kütüphanelerini incele.',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'Yüksek',
      status: 'Pending',
      completed: false,
    },
    {
      id: `task-2-${companyId}`,
      companyId,
      title: 'İK Yetkilisine Takip Mesajı Gönder',
      description: 'Başvuru durumu ve mülakat takvimi için saygılı bir takip mesajı ilet.',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      priority: 'Orta',
      status: 'Pending',
      completed: false,
    },
  ];
}

/* -------------------------------------------------------------------------- */
/* 4. CRM Analytics & Attention Widgets Calculations                          */
/* -------------------------------------------------------------------------- */

/**
 * Identifies companies requiring candidate attention (e.g. Target/Contacted companies without recent interactions).
 */
export function getCompaniesRequiringAttention(companies: DbCompany[] = []): DbCompany[] {
  if (!companies || companies.length === 0) return [];

  return companies.filter(
    (c) => c.status === 'Target' || c.status === 'Contacted' || c.status === 'Researching'
  ).slice(0, 4);
}
