import { supabase, isSupabaseConfigured, withSupabaseTimeout } from '@/lib/supabase';
import { DbInterview, DbInterviewInsert, DbInterviewUpdate } from '@/types';
import { getUserStorageKey } from '@/utils/userStorageUtils';

const BASE_STORAGE_KEY = 'kp_interviews_fallback_v1';

function getLocalInterviews(): DbInterview[] {
  try {
    const userKey = getUserStorageKey(BASE_STORAGE_KEY);
    const raw = localStorage.getItem(userKey);
    if (raw) return JSON.parse(raw);

    const anonRaw = localStorage.getItem(`${BASE_STORAGE_KEY}_anonymous`);
    if (anonRaw) {
      const parsed = JSON.parse(anonRaw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        localStorage.setItem(userKey, anonRaw);
        return parsed;
      }
    }

    const legacyRaw = localStorage.getItem(BASE_STORAGE_KEY);
    if (legacyRaw) {
      const parsed = JSON.parse(legacyRaw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        localStorage.setItem(userKey, legacyRaw);
        return parsed;
      }
    }

    return [];
  } catch {
    return [];
  }
}

function saveLocalInterviews(items: DbInterview[]) {
  try {
    localStorage.setItem(getUserStorageKey(BASE_STORAGE_KEY), JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save fallback interviews to localStorage', e);
  }
}

export const interviewsRepository = {
  async getAll(): Promise<DbInterview[]> {
    if (!isSupabaseConfigured()) {
      return getLocalInterviews();
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('interviews')
          .select('*')
          .order('date', { ascending: false }),
        2000
      );

      const { data, error } = response;
      if (error) {
        return getLocalInterviews();
      }
      return (data as DbInterview[]) || [];
    } catch {
      return getLocalInterviews();
    }
  },

  async getById(id: string): Promise<DbInterview | null> {
    if (!isSupabaseConfigured()) {
      const local = getLocalInterviews();
      return local.find((i) => i.id === id) || null;
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('interviews')
          .select('*')
          .eq('id', id)
          .single(),
        2000
      );

      const { data, error } = response;
      if (error) {
        const local = getLocalInterviews();
        return local.find((i) => i.id === id) || null;
      }
      return data as DbInterview;
    } catch {
      const local = getLocalInterviews();
      return local.find((i) => i.id === id) || null;
    }
  },

  async create(payload: DbInterviewInsert): Promise<DbInterview> {
    const local = getLocalInterviews();
    const newItem: DbInterview = {
      id: `interview-${Date.now()}`,
      user_id: payload.user_id,
      application_id: payload.application_id || null,
      company_name: payload.company_name,
      position: payload.position,
      stage: payload.stage || 'İK Görüşmesi',
      type: payload.type || 'Online',
      date: payload.date,
      time: payload.time || '14:00',
      duration_minutes: payload.duration_minutes || 45,
      interviewer_name: payload.interviewer_name || null,
      interviewer_role: payload.interviewer_role || null,
      meeting_link: payload.meeting_link || null,
      location: payload.location || null,
      prep_notes: payload.prep_notes || null,
      interview_notes: payload.interview_notes || null,
      result: payload.result || 'Pending',
      follow_up_date: payload.follow_up_date || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured()) {
      local.unshift(newItem);
      saveLocalInterviews(local);
      return newItem;
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('interviews')
          .insert(payload)
          .select()
          .single(),
        2500
      );

      const { data, error } = response;
      if (error) {
        local.unshift(newItem);
        saveLocalInterviews(local);
        return newItem;
      }
      return data as DbInterview;
    } catch {
      local.unshift(newItem);
      saveLocalInterviews(local);
      return newItem;
    }
  },

  async update(id: string, payload: DbInterviewUpdate): Promise<DbInterview> {
    const local = getLocalInterviews();
    const idx = local.findIndex((i) => i.id === id);

    if (!isSupabaseConfigured()) {
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
        saveLocalInterviews(local);
        return local[idx];
      }
      throw new Error('Mülakat bulunamadı.');
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('interviews')
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
          saveLocalInterviews(local);
          return local[idx];
        }
      }
      return data as DbInterview;
    } catch {
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
        saveLocalInterviews(local);
        return local[idx];
      }
      throw new Error('Mülakat bulunamadı.');
    }
  },

  async delete(id: string): Promise<void> {
    const local = getLocalInterviews();
    saveLocalInterviews(local.filter((i) => i.id !== id));

    if (!isSupabaseConfigured()) return;

    try {
      await withSupabaseTimeout(
        supabase.from('interviews').delete().eq('id', id),
        2500
      );
    } catch {
      // Handled by local deletion fallback
    }
  },
};
