import { supabase } from '@/lib/supabase';
import { DbCompany, DbCompanyInsert, DbCompanyUpdate } from '@/types';
import { handleDatabaseError } from '@/lib/errors';

export const companiesRepository = {
  async getAll(): Promise<DbCompany[]> {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw handleDatabaseError(error);
    return (data as DbCompany[]) || [];
  },

  async getById(id: string): Promise<DbCompany | null> {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw handleDatabaseError(error);
    return data as DbCompany;
  },

  async create(payload: DbCompanyInsert): Promise<DbCompany> {
    const { data, error } = await supabase
      .from('companies')
      .insert(payload)
      .select()
      .single();

    if (error) throw handleDatabaseError(error);
    return data as DbCompany;
  },

  async update(id: string, payload: DbCompanyUpdate): Promise<DbCompany> {
    const { data, error } = await supabase
      .from('companies')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw handleDatabaseError(error);
    return data as DbCompany;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id);

    if (error) throw handleDatabaseError(error);
  },
};
