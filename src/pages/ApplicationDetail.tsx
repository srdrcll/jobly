import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building2, 
  Briefcase, 
  Target, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Globe, 
  User, 
  Mail, 
  FileText, 
  Clock, 
  Edit3, 
  Trash2, 
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { Skeleton } from '@/components/ui/Skeleton';
import { ConfirmationDialog } from '@/components/ui/ConfirmationDialog';
import { EditApplicationModal } from '@/components/applications/EditApplicationModal';
import { 
  useApplicationDetailQuery, 
  useDeleteApplicationMutation 
} from '@/hooks/queries/useApplicationsQuery';
import { ApplicationStatus } from '@/types';

export const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: application, isLoading, isError, error, refetch } = useApplicationDetailQuery(id);
  const deleteMutation = useDeleteApplicationMutation();

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

  const formatDateTime = (dateString?: string | null) => {
    if (!dateString) return '—';
    try {
      return new Date(dateString).toLocaleString('tr-TR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const handleConfirmDelete = async () => {
    if (!application?.id) return;
    try {
      await deleteMutation.mutateAsync(application.id);
      setIsDeleteOpen(false);
      navigate('/applications');
    } catch {
      // Error handled by mutation callback
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
        <Skeleton className="h-6 w-36 rounded-lg" />
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-2xl shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-60" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" aria-hidden="true" />
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-rose-400">Başvuru Yüklenemedi</h3>
          <p className="text-xs text-slate-400">
            {error instanceof Error ? error.message : 'Başvuru detayları getirilirken bir sorun oluştu.'}
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link to="/applications">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Başvurulara Dön
            </Button>
          </Link>
          <Button variant="primary" size="sm" onClick={() => refetch()} leftIcon={<RefreshCw className="w-4 h-4" />}>
            Yeniden Dene
          </Button>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-center space-y-4">
        <Briefcase className="w-12 h-12 text-slate-500 mx-auto" aria-hidden="true" />
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground">Başvuru Bulunamadı</h3>
          <p className="text-xs text-slate-400">İstenen başvuru kaydı veritabanında mevcut değil veya yetkiniz bulunmuyor.</p>
        </div>
        <Link to="/applications" className="inline-block">
          <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Başvurulara Dön
          </Button>
        </Link>
      </div>
    );
  }

  const companyInitials = application.company_name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const targetRoleDisplay = (application as any).target_role || 'Software Engineer';
  const priorityDisplay = (application as any).priority || 'Orta';
  const jobUrl = (application as any).job_url;
  const contactName = (application as any).contact_name;
  const contactEmail = (application as any).contact_email;
  const notes = (application as any).notes;

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      {/* Top Header Navigation & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link to="/applications">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" aria-hidden="true" />}
          >
            Başvurulara Dön
          </Button>
        </Link>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            leftIcon={<Edit3 className="w-4 h-4 text-indigo-400" aria-hidden="true" />}
          >
            Düzenle
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsDeleteOpen(true)}
            leftIcon={<Trash2 className="w-4 h-4" aria-hidden="true" />}
          >
            Sil
          </Button>
        </div>
      </div>

      {/* Main Header Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-xl shrink-0 shadow-sm">
              {companyInitials || <Building2 className="w-8 h-8" aria-hidden="true" />}
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-black text-foreground">{application.company_name}</h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300 font-semibold">
                <span className="text-indigo-400">{application.position}</span>
                {application.location && (
                  <span className="text-slate-400 flex items-center gap-1 text-xs font-normal">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" /> {application.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start">
            <StatusBadge status={application.status as ApplicationStatus} size="lg" />
            <PriorityBadge priority={priorityDisplay} />
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800/60">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> Hedef Rol
            </span>
            <p className="text-xs font-bold text-foreground truncate">{targetRoleDisplay}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> Başvuru Tarihi
            </span>
            <p className="text-xs font-bold text-foreground">{formatDate(application.applied_date)}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> Çalışma Modeli
            </span>
            <p className="text-xs font-bold text-foreground">{application.work_type || 'Belirtilmedi'}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> Maaş Beklentisi
            </span>
            <p className="text-xs font-bold text-emerald-400">{application.salary || '—'}</p>
          </div>
        </div>
      </div>

      {/* Grid Layout for Detailed Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Columns: Job URL, Contact & Notes */}
        <div className="md:col-span-2 space-y-6">
          {/* Section: Contact & Link */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" aria-hidden="true" /> İletişim & İlan Detayları
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                <span className="text-slate-400 font-semibold block">İletişim Kişisi</span>
                <p className="font-bold text-foreground">{contactName || 'Belirtilmedi'}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                <span className="text-slate-400 font-semibold block">İletişim E-Postası</span>
                {contactEmail ? (
                  <a href={`mailto:${contactEmail}`} className="font-bold text-indigo-400 hover:underline flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" /> {contactEmail}
                  </a>
                ) : (
                  <p className="text-slate-500">—</p>
                )}
              </div>
            </div>

            {jobUrl && (
              <div className="pt-2">
                <a
                  href={jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
                >
                  <Globe className="w-4 h-4" aria-hidden="true" /> İlan Linkini Aç (Harici Sayfa)
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

          {/* Section: Notes */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft space-y-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" aria-hidden="true" /> Özel Notlar & Mülakat Detayları
            </h3>
            {notes ? (
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
                {notes}
              </p>
            ) : (
              <p className="text-xs text-slate-500 italic">Bu başvuru için henüz not eklenmemiş.</p>
            )}
          </div>
        </div>

        {/* Right 1 Column: Metadata & Security */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-soft space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" aria-hidden="true" /> Sistem Kayıt Bilgileri
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-400">Kayıt Kimliği (ID):</span>
                <span className="font-mono text-[11px] text-indigo-400 truncate max-w-[140px]">{application.id}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
                <span className="text-slate-400">Oluşturulma Tarihi:</span>
                <span className="font-medium text-foreground">{formatDateTime(application.created_at)}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-slate-400">Son Güncelleme:</span>
                <span className="font-medium text-foreground">{formatDateTime(application.updated_at)}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
              <Shield className="w-4 h-4" aria-hidden="true" /> Güvenli Veri Koruması
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Bu başvuru kaydı Supabase PostgreSQL Row Level Security (RLS) ile yalnızca sizin kullanıcı kimliğinize özel olarak korunmaktadır.
            </p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditApplicationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        application={application}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Başvuruyu Sil"
        message={`"${application.company_name} - ${application.position}" iş başvurusunu kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
        confirmText="Başvuruyu Sil"
        cancelText="İptal"
        variant="danger"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
