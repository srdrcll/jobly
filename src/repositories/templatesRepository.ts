import { supabase, isSupabaseConfigured, withSupabaseTimeout } from '@/lib/supabase';
import { DbTemplate, DbTemplateInsert, DbTemplateUpdate } from '@/types';
import { getUserStorageKey } from '@/utils/userStorageUtils';

const BASE_STORAGE_KEY = 'kp_templates_fallback_v1';

function getLocalTemplates(): DbTemplate[] {
  try {
    const raw = localStorage.getItem(getUserStorageKey(BASE_STORAGE_KEY));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalTemplates(items: DbTemplate[]) {
  try {
    localStorage.setItem(getUserStorageKey(BASE_STORAGE_KEY), JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save fallback templates to localStorage', e);
  }
}

export const templatesRepository = {
  async getAll(): Promise<DbTemplate[]> {
    if (!isSupabaseConfigured()) {
      return getLocalTemplates();
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('templates')
          .select('*')
          .order('created_at', { ascending: false }),
        2000
      );

      const { data, error } = response;
      if (error) return getLocalTemplates();
      return (data as DbTemplate[]) || [];
    } catch {
      return getLocalTemplates();
    }
  },

  async getById(id: string): Promise<DbTemplate | null> {
    if (!isSupabaseConfigured()) {
      const local = getLocalTemplates();
      return local.find((t) => t.id === id) || null;
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('templates')
          .select('*')
          .eq('id', id)
          .single(),
        2000
      );

      const { data, error } = response;
      if (error) {
        const local = getLocalTemplates();
        return local.find((t) => t.id === id) || null;
      }
      return data as DbTemplate;
    } catch {
      const local = getLocalTemplates();
      return local.find((t) => t.id === id) || null;
    }
  },

  async create(payload: DbTemplateInsert): Promise<DbTemplate> {
    const local = getLocalTemplates();
    const newItem: DbTemplate = {
      id: `template-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      user_id: payload.user_id,
      title: payload.title,
      type: payload.type ?? 'Email',
      content: payload.content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured()) {
      local.unshift(newItem);
      saveLocalTemplates(local);
      return newItem;
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('templates')
          .insert(payload)
          .select()
          .single(),
        2500
      );

      const { data, error } = response;
      if (error) {
        local.unshift(newItem);
        saveLocalTemplates(local);
        return newItem;
      }
      return data as DbTemplate;
    } catch {
      local.unshift(newItem);
      saveLocalTemplates(local);
      return newItem;
    }
  },

  async update(id: string, payload: DbTemplateUpdate): Promise<DbTemplate> {
    const local = getLocalTemplates();
    const idx = local.findIndex((t) => t.id === id);

    if (!isSupabaseConfigured()) {
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
        saveLocalTemplates(local);
        return local[idx];
      }
      throw new Error('Şablon bulunamadı.');
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('templates')
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
          saveLocalTemplates(local);
          return local[idx];
        }
      }
      return data as DbTemplate;
    } catch {
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
        saveLocalTemplates(local);
        return local[idx];
      }
      throw new Error('Şablon bulunamadı.');
    }
  },

  async delete(id: string): Promise<void> {
    const local = getLocalTemplates();
    saveLocalTemplates(local.filter((t) => t.id !== id));

    if (!isSupabaseConfigured()) return;

    try {
      await withSupabaseTimeout(
        supabase.from('templates').delete().eq('id', id),
        2500
      );
    } catch {
      // Handled by local deletion fallback
    }
  },
};
