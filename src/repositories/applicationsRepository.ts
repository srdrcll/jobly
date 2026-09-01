import { supabase, isSupabaseConfigured, withSupabaseTimeout } from '@/lib/supabase';
import { DbApplication, DbApplicationInsert, DbApplicationUpdate, ApplicationStatus } from '@/types';
import { getUserStorageKey } from '@/utils/userStorageUtils';

const BASE_STORAGE_KEY = 'kp_applications_fallback_v1';

function getLocalApplications(): DbApplication[] {
  try {
    const userKey = getUserStorageKey(BASE_STORAGE_KEY);
    const raw = localStorage.getItem(userKey);
    if (raw) return JSON.parse(raw);

    // Fallback: migrate from anonymous or legacy key if present
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

function saveLocalApplications(items: DbApplication[]) {
  try {
    localStorage.setItem(getUserStorageKey(BASE_STORAGE_KEY), JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save fallback applications to localStorage', e);
  }
}

export const applicationsRepository = {
  async getAll(): Promise<DbApplication[]> {
    // 1. Instant local return if Supabase is not configured or in offline/mock mode
    if (!isSupabaseConfigured()) {
      return getLocalApplications();
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('applications')
          .select('*')
          .order('created_at', { ascending: false }),
        2000
      );

      const { data, error } = response;
      if (error) {
        return getLocalApplications();
      }

      const remoteItems = (data as DbApplication[]) || [];
      const localItems = getLocalApplications();

      // Auto-sync un-synced local items (e.g. created on phone offline) to remote Supabase
      try {
        const { data: authData } = await supabase.auth.getUser();
        const currentAuthUser = authData?.user;

        if (currentAuthUser?.id) {
          const unSynced = localItems.filter((item) => item.id.startsWith('app-'));
          for (const item of unSynced) {
            const { data: synced } = await supabase
              .from('applications')
              .insert({
                user_id: currentAuthUser.id,
                company_name: item.company_name,
                position: item.position,
                status: item.status,
                applied_date: item.applied_date,
                location: item.location,
                work_type: item.work_type,
                salary: item.salary,
                target_role: item.target_role,
                priority: item.priority,
                job_url: item.job_url,
                contact_name: item.contact_name,
                contact_email: item.contact_email,
                source: item.source,
                notes: item.notes,
              })
              .select()
              .single();

            if (synced) {
              const idx = localItems.findIndex((l) => l.id === item.id);
              if (idx !== -1) localItems.splice(idx, 1);
              remoteItems.unshift(synced as DbApplication);
            }
          }
        }
      } catch (e) {
        console.warn('Auto-sync local applications error:', e);
      }

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
    if (!isSupabaseConfigured()) {
      const local = getLocalApplications();
      return local.find((a) => a.id === id) || null;
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('applications')
          .select('*')
          .eq('id', id)
          .single(),
        2000
      );

      const { data, error } = response;
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
      source: payload.source ?? null,
      notes: payload.notes ?? null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured()) {
      local.unshift(newItem);
      saveLocalApplications(local);
      return newItem;
    }

    try {
      // Ensure real authenticated user ID from active Supabase session
      const { data: authData } = await supabase.auth.getUser();
      const currentAuthUser = authData?.user;

      const insertPayload = {
        ...payload,
        user_id: currentAuthUser?.id || payload.user_id,
      };

      const response = await withSupabaseTimeout(
        supabase
          .from('applications')
          .insert(insertPayload)
          .select()
          .single(),
        2500
      );

      const { data, error } = response;
      if (error) {
        console.warn('Supabase insert application error, saving locally:', error);
        local.unshift(newItem);
        saveLocalApplications(local);
        return newItem;
      }

      const createdRemote = data as DbApplication;
      local.unshift(createdRemote);
      saveLocalApplications(local);
      return createdRemote;
    } catch (e) {
      console.warn('Supabase insert exception:', e);
      local.unshift(newItem);
      saveLocalApplications(local);
      return newItem;
    }
  },

  async update(id: string, payload: DbApplicationUpdate): Promise<DbApplication> {
    const local = getLocalApplications();
    const idx = local.findIndex((a) => a.id === id);

    if (!isSupabaseConfigured()) {
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
        saveLocalApplications(local);
        return local[idx];
      }
      throw new Error('Başvuru bulunamadı.');
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('applications')
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

    if (!isSupabaseConfigured()) return;

    try {
      await withSupabaseTimeout(
        supabase
          .from('applications')
          .update({ status })
          .in('id', ids),
        2500
      );
    } catch {
      // Handled by local update fallback
    }
  },

  async delete(id: string): Promise<void> {
    const local = getLocalApplications();
    saveLocalApplications(local.filter((a) => a.id !== id));

    if (!isSupabaseConfigured()) return;

    try {
      await withSupabaseTimeout(
        supabase
          .from('applications')
          .delete()
          .eq('id', id),
        2500
      );
    } catch {
      // Handled by local deletion fallback
    }
  },

  async bulkDelete(ids: string[]): Promise<void> {
    if (!ids.length) return;
    const local = getLocalApplications();
    saveLocalApplications(local.filter((a) => !ids.includes(a.id)));

    if (!isSupabaseConfigured()) return;

    try {
      await withSupabaseTimeout(
        supabase
          .from('applications')
          .delete()
          .in('id', ids),
        2500
      );
    } catch {
      // Handled by local bulk deletion fallback
    }
  },
};
