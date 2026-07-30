import { remindersRepository } from '@/repositories/remindersRepository';
import { reminderSchema, ReminderFormValues } from '@/lib/validations/reminderSchema';
import { DbReminder, DbReminderUpdate } from '@/types';
import { AppError } from '@/lib/errors';

export const remindersService = {
  async fetchReminders(): Promise<DbReminder[]> {
    return await remindersRepository.getAll();
  },

  async fetchRemindersByApplication(applicationId: string): Promise<DbReminder[]> {
    if (!applicationId) throw new AppError('Geçersiz başvuru kimliği.');
    return await remindersRepository.getByApplicationId(applicationId);
  },

  async createReminder(userId: string, values: ReminderFormValues): Promise<DbReminder> {
    const validated = reminderSchema.parse(values);

    return await remindersRepository.create({
      user_id: userId,
      application_id: validated.application_id ?? null,
      title: validated.title,
      description: validated.description ?? null,
      due_date: validated.due_date,
      is_completed: validated.is_completed ?? false,
    });
  },

  async updateReminder(id: string, payload: DbReminderUpdate): Promise<DbReminder> {
    if (!id) throw new AppError('Güncellenecek hatırlatma seçilmedi.');
    return await remindersRepository.update(id, payload);
  },

  async deleteReminder(id: string): Promise<void> {
    if (!id) throw new AppError('Silinecek hatırlatma seçilmedi.');
    await remindersRepository.delete(id);
  },
};
