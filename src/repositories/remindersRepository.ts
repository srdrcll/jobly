import { supabase } from '@/lib/supabase';
import { DbReminder, DbReminderInsert, DbReminderUpdate } from '@/types';
import { handleDatabaseError } from '@/lib/errors';

export const remindersRepository = {
  async getAll(): Promise<DbReminder[]> {
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .order('due_date', { ascending: true });

    if (error) throw handleDatabaseError(error);
    return (data as DbReminder[]) || [];
  },

  async getByApplicationId(applicationId: string): Promise<DbReminder[]> {
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('application_id', applicationId)
      .order('due_date', { ascending: true });

    if (error) throw handleDatabaseError(error);
    return (data as DbReminder[]) || [];
  },

  async create(payload: DbReminderInsert): Promise<DbReminder> {
    const { data, error } = await supabase
      .from('reminders')
      .insert(payload)
      .select()
      .single();

    if (error) throw handleDatabaseError(error);
    return data as DbReminder;
  },

  async update(id: string, payload: DbReminderUpdate): Promise<DbReminder> {
    const { data, error } = await supabase
      .from('reminders')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw handleDatabaseError(error);
    return data as DbReminder;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('reminders')
      .delete()
      .eq('id', id);

    if (error) throw handleDatabaseError(error);
  },
};
