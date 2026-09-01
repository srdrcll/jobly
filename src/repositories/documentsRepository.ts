import { supabase, isSupabaseConfigured, withSupabaseTimeout } from '@/lib/supabase';
import { DbDocument, DbDocumentInsert, DbDocumentUpdate } from '@/types';
import { getUserStorageKey } from '@/utils/userStorageUtils';

const BASE_STORAGE_KEY = 'kp_documents_fallback_v1';

function getLocalDocuments(): DbDocument[] {
  try {
    const raw = localStorage.getItem(getUserStorageKey(BASE_STORAGE_KEY));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalDocuments(items: DbDocument[]) {
  try {
    localStorage.setItem(getUserStorageKey(BASE_STORAGE_KEY), JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save fallback documents to localStorage', e);
  }
}

export const documentsRepository = {
  async getAll(): Promise<DbDocument[]> {
    if (!isSupabaseConfigured()) {
      return getLocalDocuments();
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('documents')
          .select('*')
          .order('created_at', { ascending: false }),
        2000
      );

      const { data, error } = response;
      if (error) return getLocalDocuments();
      return (data as DbDocument[]) || [];
    } catch {
      return getLocalDocuments();
    }
  },

  async getByApplicationId(applicationId: string): Promise<DbDocument[]> {
    if (!isSupabaseConfigured()) {
      const local = getLocalDocuments();
      return local.filter((d) => d.application_id === applicationId);
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('documents')
          .select('*')
          .eq('application_id', applicationId)
          .order('created_at', { ascending: false }),
        2000
      );

      const { data, error } = response;
      if (error) {
        const local = getLocalDocuments();
        return local.filter((d) => d.application_id === applicationId);
      }
      return (data as DbDocument[]) || [];
    } catch {
      const local = getLocalDocuments();
      return local.filter((d) => d.application_id === applicationId);
    }
  },

  async create(payload: DbDocumentInsert): Promise<DbDocument> {
    const local = getLocalDocuments();
    const newItem: DbDocument = {
      id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      user_id: payload.user_id,
      application_id: payload.application_id ?? null,
      name: payload.name,
      type: payload.type ?? 'CV',
      file_url: payload.file_url ?? '',
      file_size_bytes: payload.file_size_bytes ?? 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured()) {
      local.unshift(newItem);
      saveLocalDocuments(local);
      return newItem;
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('documents')
          .insert(payload)
          .select()
          .single(),
        2500
      );

      const { data, error } = response;
      if (error) {
        local.unshift(newItem);
        saveLocalDocuments(local);
        return newItem;
      }
      return data as DbDocument;
    } catch {
      local.unshift(newItem);
      saveLocalDocuments(local);
      return newItem;
    }
  },

  async update(id: string, payload: DbDocumentUpdate): Promise<DbDocument> {
    const local = getLocalDocuments();
    const idx = local.findIndex((d) => d.id === id);

    if (!isSupabaseConfigured()) {
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
        saveLocalDocuments(local);
        return local[idx];
      }
      throw new Error('Doküman bulunamadı.');
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('documents')
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single(),
        2500
      );

      const { data, error } = response;
      if (error) {
        if (idx !== -1) {
          local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
          saveLocalDocuments(local);
          return local[idx];
        }
      }
      return data as DbDocument;
    } catch {
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
        saveLocalDocuments(local);
        return local[idx];
      }
      throw new Error('Doküman bulunamadı.');
    }
  },

  async delete(id: string): Promise<void> {
    const local = getLocalDocuments();
    saveLocalDocuments(local.filter((d) => d.id !== id));

    if (!isSupabaseConfigured()) return;

    try {
      await withSupabaseTimeout(
        supabase.from('documents').delete().eq('id', id),
        2500
      );
    } catch {
      // Handled by local deletion fallback
    }
  },
};
