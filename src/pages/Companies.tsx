import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Star, 
  MapPin, 
  Trash2, 
  Edit3, 
  Eye, 
  RefreshCw, 
  AlertCircle,
  Target,
  Users,
  Archive,
  CheckSquare,
  BarChart3
} from 'lucide-react';
import { 
  useCompaniesListQuery, 
  useDeleteCompanyMutation, 
  useToggleCompanyFavoriteMutation,
  useUpdateCompanyMutation
} from '@/hooks/queries/useCompaniesQuery';
import { useApplicationsListQuery } from '@/hooks/queries/useApplicationsQuery';
import { DbCompany } from '@/types';
import { CompanyStatusBadge } from '@/components/companies/CompanyStatusBadge';
import { CreateCompanyModal } from '@/components/companies/CreateCompanyModal';
import { EditCompanyModal } from '@/components/companies/EditCompanyModal';
import { CompanyDetailModal } from '@/components/companies/CompanyDetailModal';
import { CompanyCrmWidgets } from '@/components/companies/crm/CompanyCrmWidgets';
import { CompanyAnalyticsSection } from '@/components/companies/CompanyAnalyticsSection';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { useNavigate } from 'react-router-dom';

export const CompaniesPage: React.FC = () => {
  const navigate = useNavigate();

  // Queries & Mutations
  const { data: companies = [], isLoading, isError, error, refetch } = useCompaniesListQuery();
  const { data: applications = [] } = useApplicationsListQuery();
  const deleteMutation = useDeleteCompanyMutation();
  const updateMutation = useUpdateCompanyMutation();
  const toggleFavoriteMutation = useToggleCompanyFavoriteMutation();

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<DbCompany | null>(null);
  const [selectedEdit, setSelectedEdit] = useState<DbCompany | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'date' | 'status'>('date');

  // Unique Lists
  const uniqueIndustries = useMemo(() => {
    const set = new Set<string>();
    companies.forEach((c) => {
      if (c.industry) set.add(c.industry);
    });
    return Array.from(set).sort();
  }, [companies]);

  // Filtered and Sorted Companies
  const filteredCompanies = useMemo(() => {
    return companies
      .filter((company) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          company.name.toLowerCase().includes(query) ||
          (company.industry && company.industry.toLowerCase().includes(query)) ||
          (company.location && company.location.toLowerCase().includes(query)) ||
          (company.contact_person && company.contact_person.toLowerCase().includes(query));

        const matchesStatus = selectedStatus === 'all' || company.status === selectedStatus;
        const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
        const matchesSize = selectedSize === 'all' || company.company_size === selectedSize;
        const matchesFavorite = !showFavoritesOnly || Boolean(company.is_favorite);

        return matchesSearch && matchesStatus && matchesIndustry && matchesSize && matchesFavorite;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name, 'tr');
        }
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0);
        }
        if (sortBy === 'status') {
          return (a.status || '').localeCompare(b.status || '', 'tr');
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [companies, searchQuery, selectedStatus, selectedIndustry, selectedSize, showFavoritesOnly, sortBy]);

  // Metric counts
  const targetCount = useMemo(() => companies.filter((c) => c.status === 'Target').length, [companies]);
  const interviewCount = useMemo(() => companies.filter((c) => c.status === 'Interviewed').length, [companies]);
  const favoriteCount = useMemo(() => companies.filter((c) => c.is_favorite).length, [companies]);

  // Bulk Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredCompanies.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkArchive = () => {
    selectedIds.forEach((id) => {
      updateMutation.mutate({ id, payload: { status: 'Archived' } });
    });
    setSelectedIds([]);
  };

  const handleBulkRestore = () => {
    selectedIds.forEach((id) => {
      updateMutation.mutate({ id, payload: { status: 'Target' } });
    });
    setSelectedIds([]);
  };

  const handleBulkFavorite = (fav: boolean) => {
    selectedIds.forEach((id) => {
      updateMutation.mutate({ id, payload: { is_favorite: fav } });
    });
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Seçili ${selectedIds.length} şirketi silmek istediğinizden emin misiniz?`)) {
      selectedIds.forEach((id) => {
        deleteMutation.mutate(id);
      });
      setSelectedIds([]);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => {
          setDeleteId(null);
          if (selectedDetail?.id === deleteId) setSelectedDetail(null);
        },
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-2.5">
            <Building2 className="w-7 h-7 text-indigo-500" />
            Şirket Yönetimi & CRM
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Hedef teknoloji şirketlerini, iletişim kişilerini ve mülakat geçmişlerini düzenleyin.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="md"
            leftIcon={<BarChart3 className="w-4 h-4 text-purple-400" />}
            onClick={() => setShowAnalytics(!showAnalytics)}
          >
            {showAnalytics ? 'Grafikleri Gizle' : 'CRM Analizleri'}
          </Button>

          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsCreateOpen(true)}
            className="shrink-0 focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Yeni Şirket Ekle
          </Button>
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Toplam Kayıtlı</span>
            <p className="text-lg font-extrabold text-foreground">{companies.length}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Hedef Şirketler</span>
            <p className="text-lg font-extrabold text-foreground">{targetCount}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Mülakat Sürecinde</span>
            <p className="text-lg font-extrabold text-foreground">{interviewCount}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Star className="w-5 h-5 fill-emerald-400" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Favoriler</span>
            <p className="text-lg font-extrabold text-foreground">{favoriteCount}</p>
          </div>
        </div>
      </div>

      {/* 3. Company Analytics Visualizations (Toggled) */}
      {showAnalytics && <CompanyAnalyticsSection companies={companies} applications={applications} />}

      {/* 4. CRM Attention Widgets */}
      <CompanyCrmWidgets companies={companies} />

      {/* 5. Bulk Actions Toolbar (Appears when items are checked) */}
      {selectedIds.length > 0 && (
        <div className="p-4 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-xs">
            <CheckSquare className="w-4 h-4 text-indigo-400" />
            <span>{selectedIds.length} şirket seçildi</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleBulkArchive} className="text-xs border-indigo-500/40">
              <Archive className="w-3.5 h-3.5 mr-1" /> Arşivle
            </Button>
            <Button variant="outline" size="sm" onClick={handleBulkRestore} className="text-xs border-indigo-500/40">
              Geri Yükle
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleBulkFavorite(true)} className="text-xs border-indigo-500/40">
              <Star className="w-3.5 h-3.5 mr-1 fill-amber-400 text-amber-400" /> Favori Yap
            </Button>
            <Button variant="danger" size="sm" onClick={handleBulkDelete} className="text-xs">
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Seçilenleri Sil
            </Button>
          </div>
        </div>
      )}

      {/* 6. Toolbar: Search, Filters & Sorting */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft dark:shadow-soft-dark space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <Input
              placeholder="Şirket adı, sektör veya lokasyon ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground focus:ring-2 focus:ring-indigo-500 outline-none font-semibold"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="Target">🎯 Hedef Şirket</option>
            <option value="Researching">🔍 Araştırılıyor</option>
            <option value="Applied">📩 Başvuruldu</option>
            <option value="Contacted">📞 İletişime Geçildi</option>
            <option value="Interviewed">👥 Mülakat Sürecinde</option>
            <option value="Offer">🏆 Teklif Alındı</option>
            <option value="Archived">📦 Arşivlendi</option>
          </select>

          {/* Industry Filter */}
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground focus:ring-2 focus:ring-indigo-500 outline-none font-semibold"
          >
            <option value="all">Tüm Sektörler</option>
            {uniqueIndustries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>

          {/* Company Size Filter */}
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground focus:ring-2 focus:ring-indigo-500 outline-none font-semibold"
          >
            <option value="all">Tüm Büyüklükler</option>
            <option value="1-10">1-10 Çalışan</option>
            <option value="11-50">11-50 Çalışan</option>
            <option value="51-200">51-200 Çalışan</option>
            <option value="201-500">201-500 Çalışan</option>
            <option value="500+">500+ Çalışan</option>
          </select>

          {/* Sorting */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground focus:ring-2 focus:ring-indigo-500 outline-none font-semibold"
          >
            <option value="date">Sıralama: Eklenme Tarihi</option>
            <option value="name">Sıralama: Şirket Adı (A-Z)</option>
            <option value="rating">Sıralama: Değerlendirme Puanı</option>
            <option value="status">Sıralama: Takip Durumu</option>
          </select>
        </div>

        {/* Favorites Filter Toggle Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <button
            type="button"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold transition-all ${
              showFavoritesOnly
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 hover:text-foreground'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
            Sadece Favoriler ({favoriteCount})
          </button>

          <span className="text-slate-400 font-medium">
            Toplam <strong className="text-foreground">{filteredCompanies.length}</strong> şirket listeleniyor
          </span>
        </div>
      </div>

      {/* 7. Data Views (Table for Desktop, Cards for Mobile) */}
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <div 
          role="alert"
          className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-rose-200">Şirket Listesi Yüklenemedi</p>
              <p className="text-rose-300/80">{error?.message || 'Veritabanına erişilirken sorun oluştu.'}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            className="border-rose-500/30 text-rose-300 hover:bg-rose-500/20 shrink-0"
          >
            Tekrar Dene
          </Button>
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="p-12 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-foreground">Şirket Kaydı Bulunamadı</h3>
            <p className="text-xs text-slate-400">
              Arama kriterlerinize uyan bir şirket bulunamadı veya henüz hiç şirket eklemediniz.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsCreateOpen(true)}
          >
            İlk Şirketi Ekle
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop Table View with Checkboxes */}
          <div className="hidden md:block bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-soft dark:shadow-soft-dark">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3.5 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredCompanies.length && filteredCompanies.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                    />
                  </th>
                  <th className="py-3.5 px-4">Şirket</th>
                  <th className="py-3.5 px-4">Sektör</th>
                  <th className="py-3.5 px-4">Lokasyon</th>
                  <th className="py-3.5 px-4">Takip Durumu</th>
                  <th className="py-3.5 px-4 text-center">Puan</th>
                  <th className="py-3.5 px-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {filteredCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer ${
                      selectedIds.includes(company.id) ? 'bg-indigo-500/5 dark:bg-indigo-950/20' : ''
                    }`}
                    onClick={() => navigate(`/companies/${company.id}`)}
                  >
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(company.id)}
                        onChange={() => handleToggleSelect(company.id)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                      />
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavoriteMutation.mutate({ id: company.id, currentStatus: Boolean(company.is_favorite) });
                          }}
                          className="text-slate-400 hover:scale-125 transition-transform"
                          title="Favorilere Ekle / Çıkar"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              company.is_favorite ? 'fill-amber-400 text-amber-400' : 'text-slate-600 hover:text-amber-400'
                            }`}
                          />
                        </button>
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-extrabold flex items-center justify-center text-sm shrink-0">
                          {company.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-foreground group-hover:text-indigo-400 transition-colors truncate">
                            {company.name}
                          </p>
                          {company.website && (
                            <span className="text-[11px] text-slate-400 hover:underline truncate block">
                              {company.website.replace(/^https?:\/\//, '')}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      {company.industry || <span className="text-slate-500">-</span>}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate max-w-[140px]">{company.location || 'Uzaktan'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <CompanyStatusBadge status={company.status} />
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-0.5 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{company.rating || 3}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedDetail(company)}
                          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-colors"
                          title="Detay Gör"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedEdit(company)}
                          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-400 transition-colors"
                          title="Düzenle"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(company.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Grid View */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                onClick={() => navigate(`/companies/${company.id}`)}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-3 cursor-pointer hover:border-indigo-500/40 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-sm flex items-center justify-center shrink-0">
                      {company.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-foreground truncate">{company.name}</h4>
                      <p className="text-xs text-slate-400 truncate">{company.industry || 'Genel Teknoloji'}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavoriteMutation.mutate({ id: company.id, currentStatus: Boolean(company.is_favorite) });
                    }}
                    className="p-1"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        company.is_favorite ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <CompanyStatusBadge status={company.status} />
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{company.rating || 3} / 5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modals */}
      <CreateCompanyModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />

      <EditCompanyModal
        company={selectedEdit}
        isOpen={Boolean(selectedEdit)}
        onClose={() => setSelectedEdit(null)}
      />

      <CompanyDetailModal
        company={selectedDetail}
        isOpen={Boolean(selectedDetail)}
        onClose={() => setSelectedDetail(null)}
        onEdit={(company) => setSelectedEdit(company)}
        onDelete={(id) => setDeleteId(id)}
      />

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-rose-300">Şirket Kaydını Sil</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bu şirketi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setDeleteId(null)}>
                Vazgeç
              </Button>
              <Button
                variant="danger"
                size="sm"
                isLoading={deleteMutation.isPending}
                onClick={handleDeleteConfirm}
              >
                Evet, Sil
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
