import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Filter, 
  ArrowUpDown, 
  Building2, 
  Calendar, 
  MapPin, 
  DollarSign, 
  FileText, 
  MoreHorizontal, 
  AlertCircle,
  RefreshCw,
  Target
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { EmptyState } from '@/components/common/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { CreateApplicationModal } from '@/components/applications/CreateApplicationModal';
import { useApplicationsListQuery } from '@/hooks/queries/useApplicationsQuery';
import { ApplicationStatus } from '@/types';

export const ApplicationsPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data: applications, isLoading, isError, error, refetch } = useApplicationsListQuery();

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '—';
    try {
      return new Date(dateString).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
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

      {/* Toolbar: Search, Filter, Sort (UI Controls) */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <SearchInput
            placeholder="Şirket veya pozisyon ara..."
            onChange={() => {}}
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Filter className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />}
          >
            Filtrele
          </Button>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<ArrowUpDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />}
          >
            Sırala
          </Button>
        </div>
      </div>

      {/* Content Section based on TanStack Query State */}
      {isLoading ? (
        <div className="space-y-4">
          {/* Skeleton Desktop Table */}
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

          {/* Skeleton Mobile Cards */}
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
      ) : (
        <>
          {/* Desktop Table View (hidden on mobile) */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Şirket</TableHead>
                  <TableHead>Pozisyon & Konum</TableHead>
                  <TableHead>Hedef Rol</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Öncelik</TableHead>
                  <TableHead>Başvuru Tarihi</TableHead>
                  <TableHead className="text-right">Aksiyonlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => {
                  const companyInitials = app.company_name
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase();

                  const targetRoleDisplay = (app as any).target_role || 'Software Engineer';
                  const priorityDisplay = (app as any).priority || 'Orta';

                  return (
                    <TableRow key={app.id}>
                      {/* Company Column */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0 shadow-sm">
                            {companyInitials || <Building2 className="w-4 h-4" aria-hidden="true" />}
                          </div>
                          <div>
                            <span className="font-bold text-foreground block text-xs">{app.company_name}</span>
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

                      {/* Target Role Column */}
                      <TableCell>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          <Target className="w-3 h-3 shrink-0" aria-hidden="true" /> {targetRoleDisplay}
                        </span>
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

                      {/* Actions Column */}
                      <TableCell className="text-right">
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="İşlemler"
                          aria-label="İşlemler"
                        >
                          <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card Layout (block on mobile, hidden on md+) */}
          <div className="block md:hidden space-y-3">
            {applications.map((app) => {
              const companyInitials = app.company_name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .substring(0, 2)
                .toUpperCase();

              const targetRoleDisplay = (app as any).target_role || 'Software Engineer';
              const priorityDisplay = (app as any).priority || 'Orta';

              return (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0">
                        {companyInitials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-foreground text-sm truncate">{app.company_name}</h4>
                        <p className="text-xs text-indigo-400 font-semibold truncate">{app.position}</p>
                      </div>
                    </div>
                    <button
                      className="p-1.5 text-slate-400 hover:text-foreground rounded-lg"
                      title="İşlemler"
                      aria-label="İşlemler"
                    >
                      <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                    <StatusBadge status={app.status as ApplicationStatus} size="sm" />
                    <PriorityBadge priority={priorityDisplay} />
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-300">
                      {targetRoleDisplay}
                    </span>
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
    </div>
  );
};
