import { useState, useMemo, useCallback, useEffect } from 'react';
import { DbApplication, ApplicationStatus } from '@/types';

export type SortOption = 
  | 'date-desc' 
  | 'date-asc' 
  | 'company-asc' 
  | 'company-desc';

export interface ApplicationFilterState {
  statuses: ApplicationStatus[];
  sources: string[];
  workModels: ('Remote' | 'Hybrid' | 'On-site')[];
  sortBy: SortOption;
}

const STORAGE_KEY = 'kp_application_filters_v2';

const INITIAL_FILTER_STATE: ApplicationFilterState = {
  statuses: [],
  sources: [],
  workModels: [],
  sortBy: 'date-desc',
};

function getStoredFilters(): ApplicationFilterState {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        statuses: Array.isArray(parsed.statuses) ? parsed.statuses : [],
        sources: Array.isArray(parsed.sources) ? parsed.sources : [],
        workModels: Array.isArray(parsed.workModels) ? parsed.workModels : [],
        sortBy: parsed.sortBy || 'date-desc',
      };
    }
  } catch {
    // Fallback on error
  }
  return INITIAL_FILTER_STATE;
}

export function useApplicationFilters(applications: DbApplication[] = [], searchQuery: string = '') {
  const [filters, setFilters] = useState<ApplicationFilterState>(getStoredFilters);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch {
      // Ignore quota restrictions
    }
  }, [filters]);

  const toggleStatus = useCallback((status: ApplicationStatus) => {
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }));
  }, []);

  const setSingleStatus = useCallback((status: ApplicationStatus | null) => {
    setFilters((prev) => ({
      ...prev,
      statuses: status === null ? [] : [status],
    }));
  }, []);

  const setStatuses = useCallback((statuses: ApplicationStatus[]) => {
    setFilters((prev) => ({
      ...prev,
      statuses,
    }));
  }, []);

  const toggleSource = useCallback((source: string) => {
    setFilters((prev) => ({
      ...prev,
      sources: prev.sources.includes(source)
        ? prev.sources.filter((s) => s !== source)
        : [...prev.sources, source],
    }));
  }, []);

  const toggleWorkModel = useCallback((model: 'Remote' | 'Hybrid' | 'On-site') => {
    setFilters((prev) => ({
      ...prev,
      workModels: prev.workModels.includes(model)
        ? prev.workModels.filter((m) => m !== model)
        : [...prev.workModels, model],
    }));
  }, []);

  const setSortBy = useCallback((sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      statuses: [],
      sources: [],
      workModels: [],
      sortBy: 'date-desc',
    });
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const activeFiltersCount = 
    filters.statuses.length + 
    filters.sources.length + 
    filters.workModels.length;

  const filteredAndSortedApplications = useMemo(() => {
    let result = Array.isArray(applications) ? [...applications] : [];

    // 1. Search Query Filter
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (trimmedQuery) {
      result = result.filter((app) => {
        const companyMatch = app?.company_name?.toLowerCase().includes(trimmedQuery);
        const positionMatch = app?.position?.toLowerCase().includes(trimmedQuery);
        const sourceMatch = app?.source?.toLowerCase().includes(trimmedQuery);
        const notesMatch = app?.notes?.toLowerCase().includes(trimmedQuery);
        return companyMatch || positionMatch || sourceMatch || notesMatch;
      });
    }

    // 2. Status Filter
    if (filters.statuses.length > 0) {
      result = result.filter((app) => filters.statuses.includes(app?.status as ApplicationStatus));
    }

    // 3. Platform / Source Filter
    if (filters.sources.length > 0) {
      result = result.filter((app) => {
        const appSource = app?.source?.trim().toLowerCase() || 'diğer';
        return filters.sources.some((s) => s.toLowerCase() === appSource || (s === 'Diğer' && (!app?.source || !app.source.trim())));
      });
    }

    // 4. Work Model Filter
    if (filters.workModels.length > 0) {
      result = result.filter((app) => app?.work_type && filters.workModels.includes(app.work_type));
    }

    // 5. Sorting Engine
    result.sort((a, b) => {
      const compA = a?.company_name || '';
      const compB = b?.company_name || '';

      switch (filters.sortBy) {
        case 'date-asc': {
          const dateA = new Date(a?.applied_date || a?.created_at || 0).getTime();
          const dateB = new Date(b?.applied_date || b?.created_at || 0).getTime();
          return dateA - dateB;
        }
        case 'company-asc':
          return compA.localeCompare(compB, 'tr-TR');
        case 'company-desc':
          return compB.localeCompare(compA, 'tr-TR');
        case 'date-desc':
        default: {
          const dateA = new Date(a?.applied_date || a?.created_at || 0).getTime();
          const dateB = new Date(b?.applied_date || b?.created_at || 0).getTime();
          return dateB - dateA;
        }
      }
    });

    return result;
  }, [applications, searchQuery, filters]);

  return {
    filters,
    activeFiltersCount,
    toggleStatus,
    setSingleStatus,
    setStatuses,
    toggleSource,
    toggleWorkModel,
    setSortBy,
    clearFilters,
    filteredAndSortedApplications,
  };
}
