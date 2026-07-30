import { DbInterview } from '@/types';

export interface InterviewChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface InterviewPrepData {
  interviewId: string;
  checklist: InterviewChecklistItem[];
  companyResearch: string;
  roleResearch: string;
  technicalTopics: string[];
  behavioralQuestions: string[];
  questionsToAsk: string[];
  personalNotes: string;
}

export interface InterviewEvaluationData {
  interviewId: string;
  overallRating: number; // 1-5
  technicalRating: number; // 1-5
  communicationRating: number; // 1-5
  confidenceRating: number; // 1-5
  difficultyLevel: 'Kolay' | 'Orta' | 'Zor' | 'Zorlayıcı';
  outcome: 'Pending' | 'Passed' | 'Failed' | 'Offer';
  strengths: string;
  weaknesses: string;
  lessonsLearned: string;
  improvementPlan: string;
  evaluatedAt: string;
}

export interface InterviewTimelineEvent {
  id: string;
  interviewId: string;
  title: string;
  type: 'created' | 'prep_updated' | 'completed' | 'eval_submitted' | 'followup_scheduled';
  timestamp: string;
  description: string;
}

const PREP_STORAGE_KEY = 'kp_interview_prep_v1';
const EVAL_STORAGE_KEY = 'kp_interview_eval_v1';

/* -------------------------------------------------------------------------- */
/* 1. Preparation Data Storage & Calculations                                */
/* -------------------------------------------------------------------------- */

export function getInterviewPrep(interviewId: string): InterviewPrepData {
  try {
    const raw = localStorage.getItem(PREP_STORAGE_KEY);
    if (raw) {
      const all: Record<string, InterviewPrepData> = JSON.parse(raw);
      if (all[interviewId]) return all[interviewId];
    }
  } catch (e) {
    console.error('Failed to read prep data', e);
  }

  return getDefaultPrepData(interviewId);
}

export function saveInterviewPrep(prep: InterviewPrepData): void {
  try {
    const raw = localStorage.getItem(PREP_STORAGE_KEY);
    const all: Record<string, InterviewPrepData> = raw ? JSON.parse(raw) : {};
    all[prep.interviewId] = prep;
    localStorage.setItem(PREP_STORAGE_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save prep data', e);
  }
}

export function calculatePrepProgress(prep: InterviewPrepData): number {
  if (!prep || !prep.checklist || prep.checklist.length === 0) return 0;
  const completed = prep.checklist.filter((i) => i.completed).length;
  return Math.round((completed / prep.checklist.length) * 100);
}

function getDefaultPrepData(interviewId: string): InterviewPrepData {
  return {
    interviewId,
    checklist: [
      { id: 'c1', text: 'Özgeçmiş ve portfolyo projelerini gözden geçir', completed: true },
      { id: 'c2', text: 'Şirketin ürün ve teknik mimarisini incele', completed: true },
      { id: 'c3', text: 'Mülakatçı profiline LinkedIn üzerinden göz at', completed: false },
      { id: 'c4', text: 'Kamera, mikrofon ve internet bağlantısını test et', completed: false },
      { id: 'c5', text: 'Mülakatçıya sorulacak 3 stratejik soru hazırla', completed: false },
    ],
    companyResearch: 'Şirket yüksek ölçekli SaaS altyapıları sunuyor. Micro-frontend ve Kubernetes mimarisi kullanıyor.',
    roleResearch: 'Frontend ekibinde performans iyileştirmeleri, Design System yönetimi ve React 19 dönüşümü bekleniyor.',
    technicalTopics: ['React 19 Server Components', 'State Management & TanStack Query', 'TypeScript Generics & Types'],
    behavioralQuestions: ['En zor teknik zorluğu nasıl çözdün?', 'Ekip içi görüş ayrılığını nasıl yönettin?'],
    questionsToAsk: ['Şirket içi mühendislik kültürü ve kod inceleme süreçleri nasıl işliyor?', 'Gelecek 6 aydaki en kritik teknik hedef nedir?'],
    personalNotes: 'Sakin ve kendinden emin konuş. STAR yöntemini kullan (Situation, Task, Action, Result).',
  };
}

/* -------------------------------------------------------------------------- */
/* 2. Evaluation Data Storage                                                 */
/* -------------------------------------------------------------------------- */

export function getInterviewEvaluation(interviewId: string): InterviewEvaluationData | null {
  try {
    const raw = localStorage.getItem(EVAL_STORAGE_KEY);
    if (raw) {
      const all: Record<string, InterviewEvaluationData> = JSON.parse(raw);
      return all[interviewId] || null;
    }
  } catch {
    return null;
  }
  return null;
}

export function saveInterviewEvaluation(evalData: InterviewEvaluationData): void {
  try {
    const raw = localStorage.getItem(EVAL_STORAGE_KEY);
    const all: Record<string, InterviewEvaluationData> = raw ? JSON.parse(raw) : {};
    all[evalData.interviewId] = evalData;
    localStorage.setItem(EVAL_STORAGE_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save evaluation data', e);
  }
}

/* -------------------------------------------------------------------------- */
/* 3. Timeline Extraction                                                     */
/* -------------------------------------------------------------------------- */

export function extractInterviewTimeline(interview: DbInterview): InterviewTimelineEvent[] {
  const events: InterviewTimelineEvent[] = [
    {
      id: `ev-1-${interview.id}`,
      interviewId: interview.id,
      title: 'Mülakat Randevusu Oluşturuldu',
      type: 'created',
      timestamp: interview.created_at || new Date().toISOString(),
      description: `${interview.company_name} — ${interview.position} için randevu takvime eklendi.`,
    },
  ];

  const prep = getInterviewPrep(interview.id);
  const progress = calculatePrepProgress(prep);
  if (progress > 0) {
    events.push({
      id: `ev-2-${interview.id}`,
      interviewId: interview.id,
      title: 'Mülakat Hazırlığı Güncellendi',
      type: 'prep_updated',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      description: `Hazırlık kontrol listesi %${progress} oranında tamamlandı.`,
    });
  }

  const evalData = getInterviewEvaluation(interview.id);
  if (evalData) {
    events.push({
      id: `ev-3-${interview.id}`,
      interviewId: interview.id,
      title: 'Değerlendirme Tamamlandı',
      type: 'eval_submitted',
      timestamp: evalData.evaluatedAt,
      description: `Görüşme değerlendirmesi kaydedildi (Puan: ${evalData.overallRating}/5).`,
    });
  }

  return events;
}

/* -------------------------------------------------------------------------- */
/* 4. Dashboard & Analytics Widgets Helpers                                   */
/* -------------------------------------------------------------------------- */

export function getInterviewsThisMonth(interviews: DbInterview[] = []): DbInterview[] {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return interviews.filter((i) => {
    const d = new Date(i.date);
    return !isNaN(d.getTime()) && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });
}
