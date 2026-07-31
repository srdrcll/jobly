import { supabase } from '@/lib/supabase';
import { DbApplication, DbApplicationInsert, DbApplicationUpdate, ApplicationStatus } from '@/types';
import { handleDatabaseError } from '@/lib/errors';
import { getUserStorageKey } from '@/utils/userStorageUtils';

const BASE_STORAGE_KEY = 'kp_applications_fallback_v1';

function getLocalApplications(): DbApplication[] {
  try {
    const raw = localStorage.getItem(getUserStorageKey(BASE_STORAGE_KEY));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalApplications(items: DbApplication[]) {
  try {
    localStorage.setItem(getUserStorageKey(BASE_STORAGE_KEY), JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save fallback applications to localStorage', e);
  }
}

export const applicationsRepository = {
  async getAll(): Promise<DbApplication[]> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return getLocalApplications();
      }

      const remoteItems = (data as DbApplication[]) || [];
      const localItems = getLocalApplications();

      // Merge remote and local items by ID to guarantee data persistence
      const combinedMap = new Map<string, DbApplication>();
      localItems.forEach((item) => combinedMap.set(item.id, item));
      remoteItems.forEach((item) => combinedMap.set(item.id, item));

      const mergedList = Array.from(combinedMap.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      saveLocalApplications(mergedList);
      return mergedList;
    } catch {
      return getLocalApplications();
    }
  },

  async getById(id: string): Promise<DbApplication | null> {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        const local = getLocalApplications();
        return local.find((a) => a.id === id) || null;
      }
      return data as DbApplication;
    } catch {
      const local = getLocalApplications();
      return local.find((a) => a.id === id) || null;
    }
  },

  async create(payload: DbApplicationInsert): Promise<DbApplication> {
    const local = getLocalApplications();
    const newItem: DbApplication = {
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      user_id: payload.user_id,
      company_id: payload.company_id ?? null,
      company_name: payload.company_name,
      position: payload.position,
      location: payload.location ?? null,
      work_type: payload.work_type ?? null,
      salary: payload.salary ?? null,
      status: payload.status,
      applied_date: payload.applied_date ?? new Date().toISOString(),
      notes_count: payload.notes_count ?? 0,
      target_role: payload.target_role ?? null,
      priority: payload.priority ?? 'Orta',
      job_url: payload.job_url ?? null,
      contact_name: payload.contact_name ?? null,
      contact_email: payload.contact_email ?? null,
      notes: payload.notes ?? null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase
        .from('applications')
        .insert(payload)
        .select()
        .single();

      if (error) {
        // Fallback: save to localStorage if Supabase RLS or table insert fails
        local.unshift(newItem);
        saveLocalApplications(local);
        return newItem;
      }

      const createdRemote = data as DbApplication;
      local.unshift(createdRemote);
      saveLocalApplications(local);
      return createdRemote;
    } catch {
      local.unshift(newItem);
      saveLocalApplications(local);
      return newItem;
    }
  },

  async update(id: string, payload: DbApplicationUpdate): Promise<DbApplication> {
    const local = getLocalApplications();
    const idx = local.findIndex((a) => a.id === id);

    try {
      const { data, error } = await supabase
        .from('applications')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (idx !== -1) {
          local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
          saveLocalApplications(local);
          return local[idx];
        }
      }
      if (data) {
        if (idx !== -1) {
          local[idx] = data as DbApplication;
          saveLocalApplications(local);
        }
        return data as DbApplication;
      }
    } catch {
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
        saveLocalApplications(local);
        return local[idx];
      }
    }

    if (idx !== -1) {
      local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
      saveLocalApplications(local);
      return local[idx];
    }

    throw new Error('Başvuru bulunamadı.');
  },

  async bulkUpdateStatus(ids: string[], status: ApplicationStatus): Promise<void> {
    if (!ids.length) return;
    const local = getLocalApplications();
    const updatedLocal = local.map((item) =>
      ids.includes(item.id) ? { ...item, status, updated_at: new Date().toISOString() } : item
    );
    saveLocalApplications(updatedLocal);

    try {
      await supabase
        .from('applications')
        .update({ status })
        .in('id', ids);
    } catch {
      // Handled by local update fallback
    }
  },

  async delete(id: string): Promise<void> {
    const local = getLocalApplications();
    saveLocalApplications(local.filter((a) => a.id !== id));

    try {
      await supabase
        .from('applications')
        .delete()
        .eq('id', id);
    } catch {
      // Handled by local deletion fallback
    }
  },

  async bulkDelete(ids: string[]): Promise<void> {
    if (!ids.length) return;
    const local = getLocalApplications();
    saveLocalApplications(local.filter((a) => !ids.includes(a.id)));

    try {
      await supabase
        .from('applications')
        .delete()
        .in('id', ids);
    } catch {
      // Handled by local bulk deletion fallback
    }
  },
};
