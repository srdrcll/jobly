import { supabase } from '@/lib/supabase';
import { DbApplication, DbApplicationInsert, DbApplicationUpdate, ApplicationStatus } from '@/types';
import { handleDatabaseError } from '@/lib/errors';

export const applicationsRepository = {
  async getAll(): Promise<DbApplication[]> {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw handleDatabaseError(error);
    return (data as DbApplication[]) || [];
  },

  async getById(id: string): Promise<DbApplication | null> {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw handleDatabaseError(error);
    return data as DbApplication;
  },

  async create(payload: DbApplicationInsert): Promise<DbApplication> {
    const { data, error } = await supabase
      .from('applications')
      .insert(payload)
      .select()
      .single();

    if (error) throw handleDatabaseError(error);
    return data as DbApplication;
  },

  async update(id: string, payload: DbApplicationUpdate): Promise<DbApplication> {
    const { data, error } = await supabase
      .from('applications')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw handleDatabaseError(error);
    return data as DbApplication;
  },

  async bulkUpdateStatus(ids: string[], status: ApplicationStatus): Promise<void> {
    if (!ids.length) return;
    const { error } = await supabase
      .from('applications')
      .update({ status })
      .in('id', ids);

    if (error) throw handleDatabaseError(error);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id);

    if (error) throw handleDatabaseError(error);
  },

  async bulkDelete(ids: string[]): Promise<void> {
    if (!ids.length) return;
    const { error } = await supabase
      .from('applications')
      .delete()
      .in('id', ids);

    if (error) throw handleDatabaseError(error);
  },
};
