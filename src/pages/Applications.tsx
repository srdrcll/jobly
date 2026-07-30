import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  LayoutGrid, 
  ListFilter, 
  Trash2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SearchInput } from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/Button';
import { ConfirmationDialog } from '@/components/ui/ConfirmationDialog';
import { EmptyState } from '@/components/common/EmptyState';
import { useToast } from '@/hooks/useToast';
import { ApplicationItem, ApplicationStatus } from '@/types';
import { STATUS_CONFIG } from '@/constants/status';
import { useOutletContext } from 'react-router-dom';

const ALL_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'app-1',
    companyName: 'Trendyol Tech',
    position: 'Senior Frontend Engineer',
    location: 'İstanbul (Hybrid)',
    workType: 'Hybrid',
    salary: '95,000 TRY',
    status: 'interview',
    appliedDate: '24 Temmuz 2026',
    lastUpdated: 'Dün',
    notesCount: 4,
  },
  {
    id: 'app-2',
    companyName: 'Getir Tech',
    position: 'Lead React Developer',
    location: 'İstanbul (Remote)',
    workType: 'Remote',
    salary: '110,000 TRY',
    status: 'offer',
    appliedDate: '12 Temmuz 2026',
    lastUpdated: 'Bugün',
    notesCount: 7,
  },
  {
    id: 'app-3',
    companyName: 'Stripe International',
    position: 'UI/UX & Product Engineer',
    location: 'Londra (Remote)',
    workType: 'Remote',
    salary: '£85,000 / Yıl',
    status: 'case_study',
    appliedDate: '28 Temmuz 2026',
    lastUpdated: '2 saat önce',
    notesCount: 2,
  },
  {
    id: 'app-4',
    companyName: 'Insider',
    position: 'Full Stack Web Developer',
    location: 'İstanbul (Hybrid)',
    workType: 'Hybrid',
    status: 'applied',
    appliedDate: '29 Temmuz 2026',
    lastUpdated: '3 gün önce',
    notesCount: 1,
  },
  {
    id: 'app-5',
    companyName: 'Vercel Inc.',
    position: 'Design Systems Architect',
    location: 'San Francisco (Remote)',
    workType: 'Remote',
    salary: '$140,000 / Yıl',
    status: 'saved',
    appliedDate: '30 Temmuz 2026',
    lastUpdated: 'Yeni',
    notesCount: 0,
  },
  {
    id: 'app-6',
    companyName: 'Peak Games',
    position: 'Game UI Developer',
    location: 'İstanbul (On-site)',
    workType: 'On-site',
    status: 'rejected',
    appliedDate: '05 Haziran 2026',
    lastUpdated: '1 ay önce',
    notesCount: 2,
  },
];

export const ApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationItem[]>(ALL_APPLICATIONS);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<ApplicationStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const { toast } = useToast();
  const context = useOutletContext<{ onOpenNewModal?: () => void }>();

  const filteredApps = applications.filter((app) => {
    const matchesTab = activeTab === 'all' || app.status === activeTab;
    const matchesSearch =
      app.companyName.toLowerCase().includes(search.toLowerCase()) ||
      app.position.toLowerCase().includes(search.toLowerCase()) ||
      app.location.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      setApplications((prev) => prev.filter((a) => a.id !== deleteTargetId));
      setDeleteTargetId(null);
      toast.success('Başvuru Silindi', 'Seçilen başvuru listenizden kaldırıldı.');
    }
  };

  const statusList: (ApplicationStatus | 'all')[] = [
    'all',
    'saved',
    'applied',
    'interview',
    'case_study',
    'offer',
    'rejected',
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <PageHeader
        title="İş Başvuruları"
        description="Kaydettiğiniz, başvurduğunuz ve takip ettiğiniz tüm pozisyonların yönetim paneli."
        icon={Briefcase}
        badge={`${applications.length} Pozisyon`}
        actionSlot={
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}
            onClick={() => context?.onOpenNewModal?.()}
          >
            Başvuru Ekle
          </Button>
        }
      />

      {/* Filter Bar & Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-soft">
        <div className="flex-1 max-w-sm">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            placeholder="Pozisyon veya şirket ara..."
          />
        </div>

        {/* Status Tabs Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {statusList.map((st) => {
            const isAll = st === 'all';
            const isSelected = activeTab === st;
            const count = isAll
              ? applications.length
              : applications.filter((a) => a.status === st).length;

            return (
              <button
                key={st}
                onClick={() => setActiveTab(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{isAll ? 'Tümü' : STATUS_CONFIG[st].label}</span>
                <span
                  className={`px-1.5 py-0.2 text-[10px] rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Switcher */}
        <div className="hidden md:flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'grid' ? 'bg-white dark:bg-slate-900 shadow-sm text-foreground' : 'text-slate-400'
            }`}
            title="Izgara Görünümü"
            aria-label="Izgara Görünümü"
          >
            <LayoutGrid className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'list' ? 'bg-white dark:bg-slate-900 shadow-sm text-foreground' : 'text-slate-400'
            }`}
            title="Liste Görünümü"
            aria-label="Liste Görünümü"
          >
            <ListFilter className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {filteredApps.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="Aramaya uygun başvuru bulunamadı"
          description="Arama kriterlerinizi değiştirebilir veya yeni bir iş başvurusu ekleyebilirsiniz."
          actionSlot={
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}
              onClick={() => context?.onOpenNewModal?.()}
            >
              Yeni Başvuru Oluştur
            </Button>
          }
          secondaryActionSlot={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch('');
                setActiveTab('all');
              }}
            >
              Filtreleri Temizle
            </Button>
          }
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500/10 to-violet-500/20 border border-indigo-500/20 text-indigo-400 font-extrabold flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
                      {app.companyName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-indigo-400 transition-colors">
                        {app.position}
                      </h4>
                      <p className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" aria-hidden="true" /> {app.companyName}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={app.status} size="sm" />
                </div>

                <div className="space-y-2 my-4 text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" /> {app.location}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-300">
                      {app.workType}
                    </span>
                  </div>

                  {app.salary && (
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <DollarSign className="w-3.5 h-3.5" aria-hidden="true" /> {app.salary}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" /> Son güncelleme: {app.lastUpdated}
                    </span>
                    <span>{app.notesCount} Not</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-xs">
                  Detayları Aç
                </Button>
                <button
                  onClick={() => setDeleteTargetId(app.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                  title="Sil"
                  aria-label="Başvuruyu Sil"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-soft">
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500/10 to-violet-500/20 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-sm shrink-0">
                    {app.companyName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-foreground truncate">{app.position}</h4>
                    <p className="text-xs text-slate-400 truncate">{app.companyName} • {app.location}</p>
                  </div>
                </div>

                <div className="hidden sm:block text-xs font-semibold text-emerald-400">
                  {app.salary || '—'}
                </div>

                <StatusBadge status={app.status} size="sm" />

                <button
                  onClick={() => setDeleteTargetId(app.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                  aria-label="Başvuruyu Sil"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
        title="Başvuruyu Sil"
        message="Bu iş başvurusunu kaldırmak istediğinizden emin misiniz? Bu işlem geri alınamaz."
        confirmText="Evet, Sil"
        variant="danger"
      />
    </div>
  );
};
