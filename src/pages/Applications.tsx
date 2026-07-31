import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@/lib/utils';
import { 
  Briefcase, 
  Plus, 
  Filter, 
  ArrowUpDown, 
  Building2, 
  Calendar, 
  MapPin, 
  DollarSign, 
  MoreHorizontal, 
  AlertCircle,
  RefreshCw,
  Target,
  Edit3,
  Trash2,
  Eye,
  SearchX,
  X,
  Check,
  SlidersHorizontal,
  CheckSquare,
  Sparkles
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge, PriorityLevel } from '@/components/common/PriorityBadge';
import { EmptyState } from '@/components/common/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { ConfirmationDialog } from '@/components/ui/ConfirmationDialog';
import { CreateApplicationModal } from '@/components/applications/CreateApplicationModal';
import { EditApplicationModal } from '@/components/applications/EditApplicationModal';
import { useDebounce } from '@/hooks/useDebounce';
import { useApplicationFilters, SortOption } from '@/hooks/useApplicationFilters';
import { 
  useApplicationsListQuery, 
  useDeleteApplicationMutation,
  useBulkUpdateStatusMutation,
  useBulkDeleteMutation
} from '@/hooks/queries/useApplicationsQuery';
import { ApplicationStatus, DbApplication } from '@/types';
import { STATUS_CONFIG } from '@/constants/status';

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'date-desc', label: 'Tarihe Göre (En Yeni)' },
  { id: 'date-asc', label: 'Tarihe Göre (En Eski)' },
  { id: 'company-asc', label: 'Şirket Adı (A - Z)' },
  { id: 'company-desc', label: 'Şirket Adı (Z - A)' },
  { id: 'priority-desc', label: 'Önceliğe Göre (Kritik -> Düşük)' },
];

export const ApplicationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkStatusMenuOpen, setIsBulkStatusMenuOpen] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  // Modals & Single Action States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<DbApplication | null>(null);
  const [deletingApplication, setDeletingApplication] = useState<DbApplication | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Popover Toggles
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  const [isSortPopoverOpen, setIsSortPopoverOpen] = useState(false);

  const { data: applications, isLoading, isError, error, refetch } = useApplicationsListQuery();
  const deleteMutation = useDeleteApplicationMutation();
  const bulkUpdateMutation = useBulkUpdateStatusMutation();
  const bulkDeleteMutation = useBulkDeleteMutation();

  const {
    filters,
    activeFiltersCount,
    toggleStatus,
    togglePriority,
    toggleWorkModel,
    setSortBy,
    clearFilters,
    filteredAndSortedApplications,
  } = useApplicationFilters(applications, debouncedSearchQuery);

  // Selection Handlers & Auto-Pruning for Filter Changes
  const visibleIds = filteredAndSortedApplications.map((a) => a.id);

  // Auto-prune selected IDs if they are filtered out
  useEffect(() => {
    if (selectedIds.length > 0) {
      setSelectedIds((prev) => prev.filter((id) => visibleIds.includes(id)));
    }
  }, [debouncedSearchQuery, filters]);

  // Global ESC Key Listener for Keyboard Accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenuId(null);
        setIsFilterPopoverOpen(false);
        setIsSortPopoverOpen(false);
        setIsBulkStatusMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isAllSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));
  const isSomeSelected = selectedIds.length > 0;

  const toggleSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(visibleIds);
    }
  }, [isAllSelected, visibleIds]);

  const toggleSelectOne = useCallback((id: string, e: React.SyntheticEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleBulkStatusChange = useCallback(async (status: ApplicationStatus) => {
    if (selectedIds.length === 0) return;
    try {
      await bulkUpdateMutation.mutateAsync({ ids: selectedIds, status });
      setSelectedIds([]);
      setIsBulkStatusMenuOpen(false);
    } catch {
      // Handled by mutation error callback
    }
  }, [selectedIds, bulkUpdateMutation]);

  const handleConfirmBulkDelete = useCallback(async () => {
    if (selectedIds.length === 0) return;
    try {
      await bulkDeleteMutation.mutateAsync(selectedIds);
      setSelectedIds([]);
      setIsBulkDeleteOpen(false);
    } catch {
      // Handled by mutation error callback
    }
  }, [selectedIds, bulkDeleteMutation]);

  const toggleMenu = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId((prev) => (prev === id ? null : id));
  }, []);

  const handleNavigateDetail = useCallback((id: string) => {
    navigate(`/applications/${id}`);
  }, [navigate]);

  const handleOpenEdit = useCallback((app: DbApplication, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(null);
    setEditingApplication(app);
  }, []);

  const handleOpenDelete = useCallback((app: DbApplication, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(null);
    setDeletingApplication(app);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingApplication?.id) return;

    try {
      await deleteMutation.mutateAsync(deletingApplication.id);
      setDeletingApplication(null);
    } catch {
      // Error handled by mutation callback
    }
  }, [deletingApplication, deleteMutation]);

  const closeAllPopovers = useCallback(() => {
    setActiveMenuId(null);
    setIsFilterPopoverOpen(false);
    setIsSortPopoverOpen(false);
    setIsBulkStatusMenuOpen(false);
  }, []);

  const totalCount = applications?.length || 0;
  const currentDisplayedCount = filteredAndSortedApplications.length;

  return (
    <div className="space-y-6 animate-fadeIn" onClick={closeAllPopovers}>
      {/* Page Header */}
      <PageHeader
        title="İş Başvurularım"
        description="Tüm aktif ve geçmiş iş başvurularınızın veritabanından canlı takibi."
        icon={Briefcase}
        badge="Canlı Veri"
        action={
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsCreateModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}
          >
            Yeni Başvuru
          </Button>
        }
      />

      {/* Glassmorphic Floating Bulk Actions Toolbar */}
      {isSomeSelected && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="p-4 rounded-2xl bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-md border border-indigo-500/40 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn text-white z-20 sticky top-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold text-xs shadow-xs shrink-0">
              <CheckSquare className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs font-black text-foreground block">
                {selectedIds.length} başvuru seçildi
              </span>
              <span className="text-[10px] text-slate-400">
                Seçilen tüm başvurular üzerinde toplu işlem uygulayabilirsiniz.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto justify-end">
            {/* Bulk Status Update Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                aria-haspopup="true"
                aria-expanded={isBulkStatusMenuOpen}
                className="bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 font-bold shadow-xs"
                onClick={() => setIsBulkStatusMenuOpen((prev) => !prev)}
                isLoading={bulkUpdateMutation.isPending}
                leftIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />}
              >
                Durum Değiştir
              </Button>

              {isBulkStatusMenuOpen && (
                <div className="absolute right-0 top-12 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-1.5 z-40 animate-fadeIn text-left space-y-1">
                  <span className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-100 dark:border-slate-800/80 mb-1">
                    Yeni Durum Seçin
                  </span>
                  {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => handleBulkStatusChange(key as ApplicationStatus)}
                      className="w-full px-3 py-2 text-left text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 flex items-center justify-between transition-colors"
                    >
                      <span>{config.label}</span>
                      <StatusBadge status={key as ApplicationStatus} size="sm" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bulk Delete Trigger */}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsBulkDeleteOpen(true)}
              isLoading={bulkDeleteMutation.isPending}
              leftIcon={<Trash2 className="w-3.5 h-3.5" aria-hidden="true" />}
            >
              Toplu Sil ({selectedIds.length})
            </Button>

            {/* Clear Selection */}
            <Button
              variant="outline"
              size="sm"
              className="text-slate-400 border-slate-700 hover:text-white"
              onClick={() => setSelectedIds([])}
            >
              Seçimi Temizle
            </Button>
          </div>
        </div>
      )}

      {/* Toolbar: Search, Filter, Sort Controls */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4 relative">
        <div className="w-full sm:w-80">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            placeholder="Şirket, pozisyon veya not ara..."
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end relative">
          {/* Filter Popover Trigger Button */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Button
              variant={activeFiltersCount > 0 ? 'primary' : 'outline'}
              size="sm"
              aria-haspopup="true"
              aria-expanded={isFilterPopoverOpen}
              aria-controls="filter-popover-menu"
              aria-label="Filtreleme Menüsünü Aç/Kapat"
              className={activeFiltersCount > 0 ? 'bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md shadow-indigo-600/20' : ''}
              onClick={() => {
                setIsFilterPopoverOpen((prev) => !prev);
                setIsSortPopoverOpen(false);
              }}
              leftIcon={<Filter className="w-3.5 h-3.5" aria-hidden="true" />}
            >
              Filtrele {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>

            {/* Filter Popover Dropdown */}
            {isFilterPopoverOpen && (
              <div 
                id="filter-popover-menu"
                role="region"
                aria-label="Filtreleme Seçenekleri"
                className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-40 space-y-4 animate-fadeIn"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" /> Filtreleri Özelleştir
                  </h4>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-[11px] font-semibold text-indigo-400 hover:underline"
                    >
                      Tümünü Temizle
                    </button>
                  )}
                </div>

                {/* Status Multi-select Filter */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Başvuru Durumu
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.keys(STATUS_CONFIG).map((key) => {
                      const st = key as ApplicationStatus;
                      const isSelected = filters.statuses.includes(st);
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => toggleStatus(st)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40 font-bold shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 border-transparent hover:text-foreground'
                          }`}
                        >
                          {STATUS_CONFIG[st].label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Priority Multi-select Filter */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Öncelik Seviyesi
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(['Düşük', 'Orta', 'Yüksek', 'Kritik'] as PriorityLevel[]).map((p) => {
                      const isSelected = filters.priorities.includes(p);
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => togglePriority(p)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-bold shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 border-transparent hover:text-foreground'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Work Model Multi-select Filter */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Çalışma Modeli
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(['Remote', 'Hybrid', 'On-site'] as const).map((m) => {
                      const isSelected = filters.workModels.includes(m);
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => toggleWorkModel(m)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40 font-bold shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 border-transparent hover:text-foreground'
                          }`}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sort Popover Trigger Button */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="outline"
              size="sm"
              aria-haspopup="true"
              aria-expanded={isSortPopoverOpen}
              aria-controls="sort-popover-menu"
              aria-label="Sıralama Menüsünü Aç/Kapat"
              onClick={() => {
                setIsSortPopoverOpen((prev) => !prev);
                setIsFilterPopoverOpen(false);
              }}
              leftIcon={<ArrowUpDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />}
            >
              Sırala
            </Button>

            {/* Sort Popover Dropdown */}
            {isSortPopoverOpen && (
              <div 
                id="sort-popover-menu"
                role="region"
                aria-label="Sıralama Seçenekleri"
                className="absolute right-0 top-12 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-40 animate-fadeIn"
              >
                <span className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-100 dark:border-slate-800 mb-1">
                  Sıralama Ölçütü
                </span>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSortBy(opt.id);
                      setIsSortPopoverOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                      filters.sortBy === opt.id
                        ? 'bg-indigo-500/10 text-indigo-400 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {filters.sortBy === opt.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Summary & Active Filter Chips Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="text-xs text-slate-400 font-medium">
          Toplam <span className="font-bold text-foreground">{currentDisplayedCount}</span> / {totalCount} başvuru gösteriliyor
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Aktif:</span>
            {filters.statuses.map((st) => (
              <span
                key={st}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
              >
                {STATUS_CONFIG[st].label}
                <button onClick={() => toggleStatus(st)} className="hover:text-foreground" aria-label={`Filtreyi Kaldır: ${STATUS_CONFIG[st].label}`}>
                  <X className="w-3 h-3" aria-hidden="true" />
                </button>
              </span>
            ))}

            {filters.priorities.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
              >
                {p}
                <button onClick={() => togglePriority(p)} className="hover:text-foreground" aria-label={`Filtreyi Kaldır: ${p}`}>
                  <X className="w-3 h-3" aria-hidden="true" />
                </button>
              </span>
            ))}

            {filters.workModels.map((m) => (
              <span
                key={m}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-500/10 text-slate-300 border border-slate-500/20"
              >
                {m}
                <button onClick={() => toggleWorkModel(m)} className="hover:text-foreground" aria-label={`Filtreyi Kaldır: ${m}`}>
                  <X className="w-3 h-3" aria-hidden="true" />
                </button>
              </span>
            ))}

            <button
              onClick={clearFilters}
              className="text-xs font-bold text-rose-400 hover:underline ml-1"
            >
              Temizle
            </button>
          </div>
        )}
      </div>

      {/* Content Section based on State */}
      {isLoading ? (
        <div className="space-y-4">
          <div className="hidden md:block rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 space-y-4 shadow-soft">
            <div className="h-6 w-36 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-100 dark:border-slate-800/60">
                  <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>

          <div className="block md:hidden space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
          </div>
        </div>
      ) : isError ? (
        <div className="p-8 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" aria-hidden="true" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-rose-400">Veriler Yüklenemedi</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {error instanceof Error ? error.message : 'Başvurular veritabanından alınırken bir hata oluştu.'}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            leftIcon={<RefreshCw className="w-4 h-4" aria-hidden="true" />}
          >
            Yeniden Dene
          </Button>
        </div>
      ) : !applications || applications.length === 0 ? (
        <EmptyState
          title="Henüz Başvuru Bulunmuyor"
          description="Veritabanında kayıtlı iş başvurunuz yok. Yeni başvuru ekleyerek takibe başlayabilirsiniz."
          actionText="Yeni Başvuru Ekle"
          onAction={() => setIsCreateModalOpen(true)}
        />
      ) : filteredAndSortedApplications.length === 0 ? (
        /* Filter / Search No Results Found State */
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
            <SearchX className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-foreground">Sonuç Bulunamadı</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Seçilen filtreler ve arama kriterleriyle eşleşen başvuru kaydı bulunamadı.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              clearFilters();
            }}
          >
            Filtreleri & Aramayı Temizle
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  {/* Select All Checkbox Column */}
                  <TableHead className="w-10">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      aria-label="Tüm gösterilen başvuruları seç"
                    />
                  </TableHead>
                  <TableHead>Şirket</TableHead>
                  <TableHead>Pozisyon & Konum</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Öncelik</TableHead>
                  <TableHead>Başvuru Tarihi</TableHead>
                  <TableHead className="text-right">Aksiyonlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedApplications.map((app) => {
                  const companyInitials = app.company_name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase();

                  const targetRoleDisplay = app.target_role ?? 'Software Engineer';
                  const priorityDisplay = (app.priority ?? 'Orta') as PriorityLevel;
                  const isMenuOpen = activeMenuId === app.id;
                  const isSelected = selectedIds.includes(app.id);

                  return (
                    <TableRow 
                      key={app.id} 
                      onClick={() => handleNavigateDetail(app.id)}
                      className={`cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-indigo-500/15 dark:bg-indigo-500/20 shadow-xs border-l-4 border-l-indigo-500' 
                          : ''
                      }`}
                    >
                      {/* Row Checkbox Cell */}
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => toggleSelectOne(app.id, e)}
                          className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          aria-label={`${app.company_name} başvurusunu seç`}
                        />
                      </TableCell>

                      {/* Company Column */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0 shadow-sm">
                            {companyInitials || <Building2 className="w-4 h-4" aria-hidden="true" />}
                          </div>
                          <div>
                            <span className="font-bold text-foreground block text-xs hover:underline">{app.company_name}</span>
                            {app.work_type && (
                              <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                <Building2 className="w-3 h-3 text-slate-500" aria-hidden="true" /> {app.work_type}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* Position Column */}
                      <TableCell>
                        <div>
                          <span className="font-bold text-foreground text-xs block">{app.position}</span>
                          {app.location && (
                            <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-500" aria-hidden="true" /> {app.location}
                            </span>
                          )}
                        </div>
                      </TableCell>



                      {/* Status Column */}
                      <TableCell>
                        <StatusBadge status={app.status as ApplicationStatus} size="sm" />
                      </TableCell>

                      {/* Priority Column */}
                      <TableCell>
                        <PriorityBadge priority={priorityDisplay} />
                      </TableCell>

                      {/* Applied Date Column */}
                      <TableCell>
                        <span className="text-xs text-slate-300 flex items-center gap-1.5 whitespace-nowrap">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                          {formatDate(app.applied_date)}
                        </span>
                      </TableCell>

                      {/* Actions Menu Column */}
                      <TableCell className="text-right relative" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => toggleMenu(app.id, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="İşlem Menüsü"
                          aria-label="İşlem Menüsü"
                          aria-haspopup="true"
                          aria-expanded={isMenuOpen}
                        >
                          <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                        </button>

                        {isMenuOpen && (
                          <div className="absolute right-4 top-12 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1 z-30 animate-fadeIn text-left">
                            <button
                              onClick={() => handleNavigateDetail(app.id)}
                              className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 flex items-center gap-2 transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> Detayları Gör
                            </button>
                            <button
                              onClick={(e) => handleOpenEdit(app, e)}
                              className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 flex items-center gap-2 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> Düzenle
                            </button>
                            <button
                              onClick={(e) => handleOpenDelete(app, e)}
                              className="w-full px-3 py-2 text-left text-xs font-semibold text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 transition-colors border-t border-slate-100 dark:border-slate-800/60"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" /> Sil
                            </button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card Layout */}
          <div className="block md:hidden space-y-3">
            {filteredAndSortedApplications.map((app) => {
              const companyInitials = app.company_name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();

              const targetRoleDisplay = app.target_role ?? 'Software Engineer';
              const priorityDisplay = (app.priority ?? 'Orta') as PriorityLevel;
              const isMenuOpen = activeMenuId === app.id;
              const isSelected = selectedIds.includes(app.id);

              return (
                <div
                  key={app.id}
                  onClick={() => handleNavigateDetail(app.id)}
                  className={`p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft space-y-3 relative cursor-pointer transition-all duration-200 ${
                    isSelected ? 'border-indigo-500/80 ring-2 ring-indigo-500/40 bg-indigo-500/10 dark:bg-indigo-500/15' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div onClick={(e) => toggleSelectOne(app.id, e)}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          aria-label={`${app.company_name} başvurusunu seç`}
                          className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer mt-1"
                        />
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0">
                        {companyInitials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-foreground text-sm truncate">{app.company_name}</h4>
                        <p className="text-xs text-indigo-400 font-semibold truncate">{app.position}</p>
                      </div>
                    </div>

                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => toggleMenu(app.id, e)}
                        className="p-1.5 text-slate-400 hover:text-foreground rounded-lg"
                        title="İşlem Menüsü"
                        aria-label="İşlem Menüsü"
                        aria-haspopup="true"
                        aria-expanded={isMenuOpen}
                      >
                        <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                      </button>

                      {isMenuOpen && (
                        <div className="absolute right-0 top-8 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1 z-30 text-left">
                          <button
                            onClick={() => handleNavigateDetail(app.id)}
                            className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> Detaylar
                          </button>
                          <button
                            onClick={(e) => handleOpenEdit(app, e)}
                            className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-400 flex items-center gap-2"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> Düzenle
                          </button>
                          <button
                            onClick={(e) => handleOpenDelete(app, e)}
                            className="w-full px-3 py-2 text-left text-xs font-semibold text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800/60"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" /> Sil
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                    <StatusBadge status={app.status as ApplicationStatus} size="sm" />
                    <PriorityBadge priority={priorityDisplay} />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                      {formatDate(app.applied_date)}
                    </span>
                    {app.salary && (
                      <span className="font-semibold text-emerald-400 flex items-center gap-0.5">
                        <DollarSign className="w-3.5 h-3.5" aria-hidden="true" /> {app.salary}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Create Application Modal */}
      <CreateApplicationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Edit Application Modal */}
      <EditApplicationModal
        isOpen={Boolean(editingApplication)}
        onClose={() => setEditingApplication(null)}
        application={editingApplication}
      />

      {/* Single Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={Boolean(deletingApplication)}
        onClose={() => setDeletingApplication(null)}
        onConfirm={handleConfirmDelete}
        title="Başvuruyu Sil"
        message={
          deletingApplication
            ? `"${deletingApplication.company_name} - ${deletingApplication.position}" iş başvurusunu kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`
            : ''
        }
        confirmText="Başvuruyu Sil"
        cancelText="İptal"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />

      {/* Bulk Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Toplu Başvuru Silme"
        message={`Seçilen ${selectedIds.length} iş başvurusunu veritabanından kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
        confirmText={`Seçilen ${selectedIds.length} Başvuruyu Sil`}
        cancelText="İptal"
        variant="danger"
        isLoading={bulkDeleteMutation.isPending}
      />
    </div>
  );
};
