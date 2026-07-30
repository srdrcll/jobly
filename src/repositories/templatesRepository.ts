import { supabase } from '@/lib/supabase';
import { DbTemplate, DbTemplateInsert, DbTemplateUpdate } from '@/types';
import { handleDatabaseError } from '@/lib/errors';

export const templatesRepository = {
  async getAll(): Promise<DbTemplate[]> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw handleDatabaseError(error);
    return (data as DbTemplate[]) || [];
  },

  async getById(id: string): Promise<DbTemplate | null> {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw handleDatabaseError(error);
    return data as DbTemplate;
  },

  async create(payload: DbTemplateInsert): Promise<DbTemplate> {
    const { data, error } = await supabase
      .from('templates')
      .insert(payload)
      .select()
      .single();

    if (error) throw handleDatabaseError(error);
    return data as DbTemplate;
  },

  async update(id: string, payload: DbTemplateUpdate): Promise<DbTemplate> {
    const { data, error } = await supabase
      .from('templates')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw handleDatabaseError(error);
    return data as DbTemplate;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);

    if (error) throw handleDatabaseError(error);
  },
};
