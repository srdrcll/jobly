import { supabase, isSupabaseConfigured, withSupabaseTimeout } from '@/lib/supabase';
import { DbReminder, DbReminderInsert, DbReminderUpdate } from '@/types';
import { getUserStorageKey } from '@/utils/userStorageUtils';

const BASE_STORAGE_KEY = 'kp_reminders_fallback_v1';

function getLocalReminders(): DbReminder[] {
  try {
    const raw = localStorage.getItem(getUserStorageKey(BASE_STORAGE_KEY));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalReminders(items: DbReminder[]) {
  try {
    localStorage.setItem(getUserStorageKey(BASE_STORAGE_KEY), JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save fallback reminders to localStorage', e);
  }
}

export const remindersRepository = {
  async getAll(): Promise<DbReminder[]> {
    if (!isSupabaseConfigured()) {
      return getLocalReminders();
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('reminders')
          .select('*')
          .order('due_date', { ascending: true }),
        2000
      );

      const { data, error } = response;
      if (error) return getLocalReminders();
      return (data as DbReminder[]) || [];
    } catch {
      return getLocalReminders();
    }
  },

  async getByApplicationId(applicationId: string): Promise<DbReminder[]> {
    if (!isSupabaseConfigured()) {
      const local = getLocalReminders();
      return local.filter((r) => r.application_id === applicationId);
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('reminders')
          .select('*')
          .eq('application_id', applicationId)
          .order('due_date', { ascending: true }),
        2000
      );

      const { data, error } = response;
      if (error) {
        const local = getLocalReminders();
        return local.filter((r) => r.application_id === applicationId);
      }
      return (data as DbReminder[]) || [];
    } catch {
      const local = getLocalReminders();
      return local.filter((r) => r.application_id === applicationId);
    }
  },

  async create(payload: DbReminderInsert): Promise<DbReminder> {
    const local = getLocalReminders();
    const newItem: DbReminder = {
      id: `reminder-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      user_id: payload.user_id,
      application_id: payload.application_id ?? null,
      title: payload.title,
      due_date: payload.due_date,
      is_completed: payload.is_completed ?? false,
      created_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured()) {
      local.unshift(newItem);
      saveLocalReminders(local);
      return newItem;
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('reminders')
          .insert(payload)
          .select()
          .single(),
        2500
      );

      const { data, error } = response;
      if (error) {
        local.unshift(newItem);
        saveLocalReminders(local);
        return newItem;
      }
      return data as DbReminder;
    } catch {
      local.unshift(newItem);
      saveLocalReminders(local);
      return newItem;
    }
  },

  async update(id: string, payload: DbReminderUpdate): Promise<DbReminder> {
    const local = getLocalReminders();
    const idx = local.findIndex((r) => r.id === id);

    if (!isSupabaseConfigured()) {
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...payload };
        saveLocalReminders(local);
        return local[idx];
      }
      throw new Error('Hatırlatıcı bulunamadı.');
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('reminders')
          .update(payload)
          .eq('id', id)
          .select()
          .single(),
        2500
      );

      const { data, error } = response;
      if (error) {
        if (idx !== -1) {
          local[idx] = { ...local[idx], ...payload };
          saveLocalReminders(local);
          return local[idx];
        }
      }
      return data as DbReminder;
    } catch {
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...payload };
        saveLocalReminders(local);
        return local[idx];
      }
      throw new Error('Hatırlatıcı bulunamadı.');
    }
  },

  async delete(id: string): Promise<void> {
    const local = getLocalReminders();
    saveLocalReminders(local.filter((r) => r.id !== id));

    if (!isSupabaseConfigured()) return;

    try {
      await withSupabaseTimeout(
        supabase.from('reminders').delete().eq('id', id),
        2500
      );
    } catch {
      // Handled by local deletion fallback
    }
  },
};
