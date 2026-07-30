import { supabase } from '@/lib/supabase';
import { DbInterview, DbInterviewInsert, DbInterviewUpdate } from '@/types';
import { handleDatabaseError } from '@/lib/errors';

import { getUserStorageKey } from '@/utils/userStorageUtils';

const BASE_STORAGE_KEY = 'kp_interviews_fallback_v1';

function getLocalInterviews(): DbInterview[] {
  try {
    const raw = localStorage.getItem(getUserStorageKey(BASE_STORAGE_KEY));
    return raw ? JSON.parse(raw) : [];
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
    try {
      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        // Fallback to local storage if table doesn't exist yet in Supabase
        return getLocalInterviews();
      }
      return (data as DbInterview[]) || [];
    } catch {
      return getLocalInterviews();
    }
  },

  async getById(id: string): Promise<DbInterview | null> {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .eq('id', id)
        .single();

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
    try {
      const { data, error } = await supabase
        .from('interviews')
        .insert(payload)
        .select()
        .single();

      if (error) {
        // Fallback create
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
        local.unshift(newItem);
        saveLocalInterviews(local);
        return newItem;
      }
      return data as DbInterview;
    } catch {
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
      local.unshift(newItem);
      saveLocalInterviews(local);
      return newItem;
    }
  },

  async update(id: string, payload: DbInterviewUpdate): Promise<DbInterview> {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        const local = getLocalInterviews();
        const idx = local.findIndex((i) => i.id === id);
        if (idx !== -1) {
          local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
          saveLocalInterviews(local);
          return local[idx];
        }
      }
      return data as DbInterview;
    } catch {
      const local = getLocalInterviews();
      const idx = local.findIndex((i) => i.id === id);
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
        saveLocalInterviews(local);
        return local[idx];
      }
      throw new Error('Interview not found');
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { error } = await supabase.from('interviews').delete().eq('id', id);
      if (error) {
        const local = getLocalInterviews();
        saveLocalInterviews(local.filter((i) => i.id !== id));
      }
    } catch {
      const local = getLocalInterviews();
      saveLocalInterviews(local.filter((i) => i.id !== id));
    }
  },
};
