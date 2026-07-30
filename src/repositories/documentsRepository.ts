import { supabase } from '@/lib/supabase';
import { DbDocument, DbDocumentInsert, DbDocumentUpdate } from '@/types';
import { handleDatabaseError } from '@/lib/errors';

export const documentsRepository = {
  async getAll(): Promise<DbDocument[]> {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw handleDatabaseError(error);
    return (data as DbDocument[]) || [];
  },

  async getByApplicationId(applicationId: string): Promise<DbDocument[]> {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: false });

    if (error) throw handleDatabaseError(error);
    return (data as DbDocument[]) || [];
  },

  async create(payload: DbDocumentInsert): Promise<DbDocument> {
    const { data, error } = await supabase
      .from('documents')
      .insert(payload)
      .select()
      .single();

    if (error) throw handleDatabaseError(error);
    return data as DbDocument;
  },

  async update(id: string, payload: DbDocumentUpdate): Promise<DbDocument> {
    const { data, error } = await supabase
      .from('documents')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw handleDatabaseError(error);
    return data as DbDocument;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) throw handleDatabaseError(error);
  },
};
