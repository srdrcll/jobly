import { supabase, isSupabaseConfigured, withSupabaseTimeout } from '@/lib/supabase';
import { DbCompany, DbCompanyInsert, DbCompanyUpdate } from '@/types';
import { getUserStorageKey } from '@/utils/userStorageUtils';

const BASE_STORAGE_KEY = 'kp_companies_fallback_v1';

function getLocalCompanies(): DbCompany[] {
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

function saveLocalCompanies(items: DbCompany[]) {
  try {
    localStorage.setItem(getUserStorageKey(BASE_STORAGE_KEY), JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save fallback companies to localStorage', e);
  }
}

export const companiesRepository = {
  async getAll(): Promise<DbCompany[]> {
    if (!isSupabaseConfigured()) {
      return getLocalCompanies();
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('companies')
          .select('*')
          .order('created_at', { ascending: false }),
        2000
      );

      const { data, error } = response;
      if (error) {
        return getLocalCompanies();
      }

      const remoteItems = (data as DbCompany[]) || [];
      const localItems = getLocalCompanies();

      const combinedMap = new Map<string, DbCompany>();
      localItems.forEach((item) => combinedMap.set(item.id, item));
      remoteItems.forEach((item) => combinedMap.set(item.id, item));

      const mergedList = Array.from(combinedMap.values()).sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      saveLocalCompanies(mergedList);
      return mergedList;
    } catch {
      return getLocalCompanies();
    }
  },

  async getById(id: string): Promise<DbCompany | null> {
    if (!isSupabaseConfigured()) {
      const local = getLocalCompanies();
      return local.find((c) => c.id === id) || null;
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('companies')
          .select('*')
          .eq('id', id)
          .single(),
        2000
      );

      const { data, error } = response;
      if (error) {
        const local = getLocalCompanies();
        return local.find((c) => c.id === id) || null;
      }
      return data as DbCompany;
    } catch {
      const local = getLocalCompanies();
      return local.find((c) => c.id === id) || null;
    }
  },

  async create(payload: DbCompanyInsert): Promise<DbCompany> {
    const local = getLocalCompanies();
    const newItem: DbCompany = {
      id: `company-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      user_id: payload.user_id,
      name: payload.name,
      industry: payload.industry ?? null,
      website: payload.website ?? null,
      location: payload.location ?? null,
      company_size: payload.company_size ?? null,
      contact_person: payload.contact_person ?? null,
      contact_email: payload.contact_email ?? null,
      contact_phone: payload.contact_phone ?? null,
      linkedin_url: payload.linkedin_url ?? null,
      career_page_url: payload.career_page_url ?? null,
      notes: payload.notes ?? null,
      status: payload.status ?? 'Target',
      rating: payload.rating ?? 3,
      is_favorite: payload.is_favorite ?? false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured()) {
      local.unshift(newItem);
      saveLocalCompanies(local);
      return newItem;
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('companies')
          .insert(payload)
          .select()
          .single(),
        2500
      );

      const { data, error } = response;
      if (error) {
        local.unshift(newItem);
        saveLocalCompanies(local);
        return newItem;
      }

      const createdRemote = data as DbCompany;
      local.unshift(createdRemote);
      saveLocalCompanies(local);
      return createdRemote;
    } catch {
      local.unshift(newItem);
      saveLocalCompanies(local);
      return newItem;
    }
  },

  async update(id: string, payload: DbCompanyUpdate): Promise<DbCompany> {
    const local = getLocalCompanies();
    const idx = local.findIndex((c) => c.id === id);

    if (!isSupabaseConfigured()) {
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
        saveLocalCompanies(local);
        return local[idx];
      }
      throw new Error('Şirket kaydı bulunamadı.');
    }

    try {
      const response = await withSupabaseTimeout(
        supabase
          .from('companies')
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
          saveLocalCompanies(local);
          return local[idx];
        }
      }
      if (data) {
        if (idx !== -1) {
          local[idx] = data as DbCompany;
          saveLocalCompanies(local);
        }
        return data as DbCompany;
      }
    } catch {
      if (idx !== -1) {
        local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
        saveLocalCompanies(local);
        return local[idx];
      }
    }

    if (idx !== -1) {
      local[idx] = { ...local[idx], ...payload, updated_at: new Date().toISOString() };
      saveLocalApplicationsWrapper(local);
      return local[idx];
    }

    throw new Error('Şirket kaydı bulunamadı.');
  },

  async delete(id: string): Promise<void> {
    const local = getLocalCompanies();
    saveLocalCompanies(local.filter((c) => c.id !== id));

    if (!isSupabaseConfigured()) return;

    try {
      await withSupabaseTimeout(
        supabase
          .from('companies')
          .delete()
          .eq('id', id),
        2500
      );
    } catch {
      // Handled by local deletion fallback
    }
  },
};

function saveLocalApplicationsWrapper(items: DbCompany[]) {
  saveLocalCompanies(items);
}
