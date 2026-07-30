import { useState, useMemo, useCallback, useEffect } from 'react';
import { DbApplication, ApplicationStatus } from '@/types';
import { PriorityLevel } from '@/components/common/PriorityBadge';

export type SortOption = 
  | 'date-desc' 
  | 'date-asc' 
  | 'company-asc' 
  | 'company-desc' 
  | 'priority-desc';

export interface ApplicationFilterState {
  statuses: ApplicationStatus[];
  priorities: PriorityLevel[];
  workModels: ('Remote' | 'Hybrid' | 'On-site')[];
  sortBy: SortOption;
}

const STORAGE_KEY = 'kp_application_filters_v1';

const INITIAL_FILTER_STATE: ApplicationFilterState = {
  statuses: [],
  priorities: [],
  workModels: [],
  sortBy: 'date-desc',
};

const PRIORITY_RANK: Record<string, number> = {
  Kritik: 4,
  Critical: 4,
  Yüksek: 3,
  High: 3,
  Orta: 2,
  Medium: 2,
  Düşük: 1,
  Low: 1,
};

function getStoredFilters(): ApplicationFilterState {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        statuses: Array.isArray(parsed.statuses) ? parsed.statuses : [],
        priorities: Array.isArray(parsed.priorities) ? parsed.priorities : [],
        workModels: Array.isArray(parsed.workModels) ? parsed.workModels : [],
        sortBy: parsed.sortBy || 'date-desc',
      };
    }
  } catch {
    // Fallback to initial state on parse error
  }
  return INITIAL_FILTER_STATE;
}

export function useApplicationFilters(applications: DbApplication[] = [], searchQuery: string = '') {
  const [filters, setFilters] = useState<ApplicationFilterState>(getStoredFilters);

  // Persist filter state to sessionStorage on state change
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch {
      // Storage quota or restriction fallback
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

  const togglePriority = useCallback((priority: PriorityLevel) => {
    setFilters((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter((p) => p !== priority)
        : [...prev.priorities, priority],
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
      priorities: [],
      workModels: [],
      sortBy: 'date-desc',
    });
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const activeFiltersCount = 
    filters.statuses.length + 
    filters.priorities.length + 
    filters.workModels.length;

  const filteredAndSortedApplications = useMemo(() => {
    let result = [...applications];

    // 1. Search Query Filter (Company, Position, Notes)
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (trimmedQuery) {
      result = result.filter((app) => {
        const companyMatch = app.company_name?.toLowerCase().includes(trimmedQuery);
        const positionMatch = app.position?.toLowerCase().includes(trimmedQuery);
        const notesMatch = app.notes?.toLowerCase().includes(trimmedQuery);
        return companyMatch || positionMatch || notesMatch;
      });
    }

    // 2. Status Multi-select Filter
    if (filters.statuses.length > 0) {
      result = result.filter((app) => filters.statuses.includes(app.status as ApplicationStatus));
    }

    // 3. Priority Multi-select Filter
    if (filters.priorities.length > 0) {
      result = result.filter((app) => {
        const appPriority = (app.priority ?? 'Orta') as PriorityLevel;
        return filters.priorities.includes(appPriority);
      });
    }

    // 4. Work Model Multi-select Filter
    if (filters.workModels.length > 0) {
      result = result.filter((app) => app.work_type && filters.workModels.includes(app.work_type));
    }

    // 5. Combined Sorting Engine
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-asc': {
          const dateA = new Date(a.applied_date || a.created_at).getTime();
          const dateB = new Date(b.applied_date || b.created_at).getTime();
          return dateA - dateB;
        }
        case 'company-asc':
          return a.company_name.localeCompare(b.company_name, 'tr-TR');
        case 'company-desc':
          return b.company_name.localeCompare(a.company_name, 'tr-TR');
        case 'priority-desc': {
          const rankA = PRIORITY_RANK[a.priority ?? 'Orta'] ?? 2;
          const rankB = PRIORITY_RANK[b.priority ?? 'Orta'] ?? 2;
          return rankB - rankA;
        }
        case 'date-desc':
        default: {
          const dateA = new Date(a.applied_date || a.created_at).getTime();
          const dateB = new Date(b.applied_date || b.created_at).getTime();
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
    togglePriority,
    toggleWorkModel,
    setSortBy,
    clearFilters,
    filteredAndSortedApplications,
  };
}
