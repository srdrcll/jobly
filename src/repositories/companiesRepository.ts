import { supabase } from '@/lib/supabase';
import { DbCompany, DbCompanyInsert, DbCompanyUpdate } from '@/types';
import { handleDatabaseError } from '@/lib/errors';
import { getUserStorageKey } from '@/utils/userStorageUtils';

const BASE_STORAGE_KEY = 'kp_companies_fallback_v1';

function getLocalCompanies(): DbCompany[] {
  try {
    const raw = localStorage.getItem(getUserStorageKey(BASE_STORAGE_KEY));
    return raw ? JSON.parse(raw) : [];
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
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

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
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single();

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

    try {
      const { data, error } = await supabase
        .from('companies')
        .insert(payload)
        .select()
        .single();

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

    try {
      const { data, error } = await supabase
        .from('companies')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

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
      saveLocalCompanies(local);
      return local[idx];
    }

    throw new Error('Şirket kaydı bulunamadı.');
  },

  async delete(id: string): Promise<void> {
    const local = getLocalCompanies();
    saveLocalCompanies(local.filter((c) => c.id !== id));

    try {
      await supabase
        .from('companies')
        .delete()
        .eq('id', id);
    } catch {
      // Handled by local deletion fallback
    }
  },
};
