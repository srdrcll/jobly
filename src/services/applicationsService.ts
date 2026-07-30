import { applicationsRepository } from '@/repositories/applicationsRepository';
import { applicationSchema, ApplicationFormValues } from '@/lib/validations/applicationSchema';
import { DbApplication, DbApplicationUpdate } from '@/types';
import { AppError } from '@/lib/errors';

export const applicationsService = {
  async fetchApplications(): Promise<DbApplication[]> {
    return await applicationsRepository.getAll();
  },

  async fetchApplicationById(id: string): Promise<DbApplication | null> {
    if (!id) throw new AppError('Geçersiz başvuru kimliği.');
    return await applicationsRepository.getById(id);
  },

  async createApplication(userId: string, values: ApplicationFormValues): Promise<DbApplication> {
    const validated = applicationSchema.parse(values);

    return await applicationsRepository.create({
      user_id: userId,
      company_name: validated.company_name,
      position: validated.position,
      company_id: validated.company_id ?? null,
      location: validated.location ?? null,
      work_type: validated.work_type ?? null,
      salary: validated.salary ?? null,
      status: validated.status,
      applied_date: validated.applied_date ?? new Date().toISOString(),
      notes_count: validated.notes_count ?? 0,
    });
  },

  async updateApplication(id: string, payload: DbApplicationUpdate): Promise<DbApplication> {
    if (!id) throw new AppError('Güncellenecek başvuru seçilmedi.');
    return await applicationsRepository.update(id, payload);
  },

  async deleteApplication(id: string): Promise<void> {
    if (!id) throw new AppError('Silinecek başvuru seçilmedi.');
    await applicationsRepository.delete(id);
  },
};
