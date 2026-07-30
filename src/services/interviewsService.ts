import { interviewsRepository } from '@/repositories/interviewsRepository';
import { interviewSchema, InterviewFormValues } from '@/lib/validations/interviewSchema';
import { DbInterview, DbInterviewUpdate } from '@/types';
import { AppError } from '@/lib/errors';

export const interviewsService = {
  async fetchInterviews(): Promise<DbInterview[]> {
    return await interviewsRepository.getAll();
  },

  async fetchInterviewById(id: string): Promise<DbInterview | null> {
    if (!id) throw new AppError('Geçersiz mülakat kimliği.');
    return await interviewsRepository.getById(id);
  },

  async createInterview(userId: string, values: InterviewFormValues): Promise<DbInterview> {
    const validated = interviewSchema.parse(values);

    return await interviewsRepository.create({
      user_id: userId,
      application_id: validated.application_id || null,
      company_name: validated.company_name,
      position: validated.position,
      stage: validated.stage || 'İK Görüşmesi',
      type: validated.type || 'Online',
      date: validated.date,
      time: validated.time || '14:00',
      duration_minutes: validated.duration_minutes || 45,
      interviewer_name: validated.interviewer_name || null,
      interviewer_role: validated.interviewer_role || null,
      meeting_link: validated.meeting_link || null,
      location: validated.location || null,
      prep_notes: validated.prep_notes || null,
      interview_notes: validated.interview_notes || null,
      result: validated.result || 'Pending',
      follow_up_date: validated.follow_up_date || null,
    });
  },

  async updateInterview(id: string, payload: DbInterviewUpdate): Promise<DbInterview> {
    if (!id) throw new AppError('Güncellenecek mülakat seçilmedi.');
    return await interviewsRepository.update(id, payload);
  },

  async deleteInterview(id: string): Promise<void> {
    if (!id) throw new AppError('Silinecek mülakat seçilmedi.');
    await interviewsRepository.delete(id);
  },
};
