import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Building2, 
  Briefcase, 
  Target, 
  Calendar, 
  Globe, 
  User, 
  Mail, 
  FileText, 
  Sparkles, 
  Save,
  AlertTriangle
} from 'lucide-react';
import { TurkishLiraIcon } from '@/components/common/TurkishLiraIcon';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  applicationSchema, 
  ApplicationFormValues, 
  TARGET_ROLE_OPTIONS 
} from '@/lib/validations/applicationSchema';
import { useUpdateApplicationMutation } from '@/hooks/queries/useApplicationsQuery';
import { STATUS_CONFIG } from '@/constants/status';
import { DbApplication } from '@/types';
import { detectPlatformFromUrl } from '@/utils/platformUtils';
import { useToast } from '@/hooks/useToast';

interface EditApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: DbApplication | null;
}

export const EditApplicationModal: React.FC<EditApplicationModalProps> = ({
  isOpen,
  onClose,
  application,
}) => {
  const updateMutation = useUpdateApplicationMutation();
  const { toast } = useToast();
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
  });

  const watchedJobUrl = watch('job_url');

  useEffect(() => {
    if (watchedJobUrl) {
      const detected = detectPlatformFromUrl(watchedJobUrl);
      if (detected) {
        setValue('source', detected, { shouldDirty: true });
      }
    }
  }, [watchedJobUrl, setValue]);

  useEffect(() => {
    if (isOpen && application) {
      reset({
        company_name: application.company_name ?? '',
        position: application.position ?? '',
        target_role: application.target_role ?? 'Software Engineer',
        status: application.status ?? 'applied',
        applied_date: application.applied_date 
          ? new Date(application.applied_date).toISOString().split('T')[0] 
          : '',
        job_url: application.job_url ?? '',
        salary: application.salary ?? '',
        work_type: application.work_type ?? 'Remote',
        contact_name: application.contact_name ?? '',
        contact_email: application.contact_email ?? '',
        priority: application.priority ?? 'Orta',
        source: application.source ?? '',
        notes: application.notes ?? '',
        notes_count: application.notes_count ?? 0,
      });
    }
  }, [isOpen, application, reset]);

  // Reset warning state when modal closes
  useEffect(() => {
    if (!isOpen) setShowUnsavedWarning(false);
  }, [isOpen]);

  const handleAttemptClose = useCallback(() => {
    if (isDirty) {
      setShowUnsavedWarning(true);
    } else {
      onClose();
    }
  }, [isDirty, onClose]);

  const onSubmit = async (values: ApplicationFormValues) => {
    if (!application?.id) return;

    try {
      await updateMutation.mutateAsync({
        id: application.id,
        payload: {
          company_name: values.company_name,
          position: values.position,
          target_role: values.target_role ?? null,
          status: values.status,
          applied_date: values.applied_date ? new Date(values.applied_date).toISOString() : null,
          job_url: values.job_url || null,
          salary: values.salary || null,
          work_type: values.work_type ?? null,
          contact_name: values.contact_name || null,
          contact_email: values.contact_email || null,
          priority: values.priority ?? 'Orta',
          source: values.source || null,
          notes: values.notes || null,
        },
      });
      onClose();
    } catch {
      // Error handled by mutation callback
    }
  };

  const onFormError = (formErrors: Record<string, any>) => {
    const errorKeys = Object.keys(formErrors);
    if (errorKeys.length > 0) {
      const firstError = formErrors[errorKeys[0]];
      toast.error('Formu Kontrol Edin', firstError?.message || 'Lütfen zorunlu alanları kontrol edin.');
    }
  };

  // Unsaved changes confirmation dialog
  if (showUnsavedWarning) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setShowUnsavedWarning(false)}
        title="Kaydedilmemiş Değişiklikler"
        icon={<AlertTriangle className="w-5 h-5 text-amber-400" aria-hidden="true" />}
        maxWidth="sm"
        footer={
          <div className="flex items-center justify-end gap-3 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowUnsavedWarning(false)}
            >
              Doldurmaya Devam Et
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setShowUnsavedWarning(false);
                onClose();
              }}
            >
              Değişiklikleri Sil ve Çık
            </Button>
          </div>
        }
      >
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Yaptığınız değişiklikler kaydedilmedi. Çıkmak istediğinizden emin misiniz?
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleAttemptClose}
      title="Başvuruyu Düzenle"
      description="Başvuru durumunu ve detaylarını güncelleyin."
      maxWidth="xl"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={handleAttemptClose}
            disabled={isSubmitting || updateMutation.isPending}
          >
            İptal
          </Button>
          <Button
            type="submit"
            form="edit-application-form"
            variant="primary"
            disabled={!isDirty || isSubmitting || updateMutation.isPending}
            isLoading={isSubmitting || updateMutation.isPending}
            leftIcon={<Save className="w-4 h-4" aria-hidden="true" />}
          >
            Değişiklikleri Kaydet
          </Button>
        </div>
      }
    >
      <form id="edit-application-form" onSubmit={handleSubmit(onSubmit, onFormError)} className="space-y-5" noValidate>
        {/* Main Required & Core Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <Input
            label="Şirket Adı *"
            placeholder="örn. Teknoloji A.Ş., Global Corp"
            leftIcon={<Building2 className="w-4 h-4" aria-hidden="true" />}
            error={errors.company_name?.message}
            {...register('company_name')}
          />

          <Input
            label="Pozisyon Ünvanı *"
            placeholder="örn. Frontend Developer"
            leftIcon={<Briefcase className="w-4 h-4" aria-hidden="true" />}
            error={errors.position?.message}
            {...register('position')}
          />

          {/* Status Select */}
          <div className="space-y-1.5 w-full">
            <label htmlFor="edit-status" className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Başvuru Durumu *
            </label>
            <div className="relative flex items-center w-full">
              <div className="absolute left-3.5 text-slate-500 pointer-events-none shrink-0" aria-hidden="true">
                <Sparkles className="w-4 h-4 text-blue-500" />
              </div>
              <select
                id="edit-status"
                className="w-full h-10 pl-10 pr-3.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                {...register('status')}
              >
                {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Work Type Select */}
          <div className="space-y-1.5 w-full">
            <label htmlFor="edit-work-type" className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Çalışma Modeli
            </label>
            <select
              id="edit-work-type"
              className="w-full h-10 px-3.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              {...register('work_type')}
            >
              <option value="Remote">Remote (Uzaktan)</option>
              <option value="Hybrid">Hybrid (Karma)</option>
              <option value="On-site">On-site (Ofis)</option>
            </select>
          </div>

          <Input
            label="Başvuru Tarihi"
            type="date"
            leftIcon={<Calendar className="w-4 h-4" aria-hidden="true" />}
            error={errors.applied_date?.message}
            {...register('applied_date')}
          />

          <div className="space-y-1.5 w-full">
            <label htmlFor="edit-source" className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Başvuru Kaynağı (Platform)
            </label>
            <div className="relative flex items-center w-full">
              <div className="absolute left-3.5 text-slate-500 pointer-events-none shrink-0" aria-hidden="true">
                <Globe className="w-4 h-4 text-blue-500" />
              </div>
              <input
                id="edit-source"
                list="edit-platform-sources"
                placeholder="örn. LinkedIn, Kariyer.net, Youthall"
                className="w-full h-10 pl-10 pr-3.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                {...register('source')}
              />
            </div>
            <datalist id="edit-platform-sources">
              <option value="LinkedIn" />
              <option value="Kariyer.net" />
              <option value="Youthall" />
              <option value="Indeed" />
              <option value="Glassdoor" />
              <option value="Şirket Sitesi" />
            </datalist>
            {errors.source?.message && (
              <p className="text-[11px] text-rose-400 font-medium" role="alert" aria-live="assertive">{errors.source.message}</p>
            )}
          </div>
        </div>

        {/* Optional Fields Section */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/60 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Ek Detaylar (Opsiyonel)</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <Input
              label="Maaş Beklentisi"
              placeholder="örn. 45.000 TL / Ay"
              leftIcon={<TurkishLiraIcon className="w-4 h-4" aria-hidden="true" />}
              error={errors.salary?.message}
              {...register('salary')}
            />

            <Input
              label="İletişim Kişisi"
              placeholder="örn. Ayşe Yılmaz"
              leftIcon={<User className="w-4 h-4" aria-hidden="true" />}
              {...register('contact_name')}
            />

            <Input
              label="İletişim E-Postası"
              type="text"
              inputMode="email"
              placeholder="hr@company.com"
              leftIcon={<Mail className="w-4 h-4" aria-hidden="true" />}
              error={errors.contact_email?.message}
              {...register('contact_email')}
            />

            <Input
              label="İlan Linki (URL)"
              type="text"
              inputMode="url"
              placeholder="https://linkedin.com/jobs/..."
              leftIcon={<Globe className="w-4 h-4" aria-hidden="true" />}
              error={errors.job_url?.message}
              {...register('job_url')}
            />

            {/* Notes Area */}
            <div className="sm:col-span-2 space-y-1.5 w-full">
              <label htmlFor="edit-notes" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" aria-hidden="true" /> Özel Notlar & Detaylar
              </label>
              <textarea
                id="edit-notes"
                rows={3}
                placeholder="Mülakat detayları veya notlarınızı ekleyin..."
                className="w-full p-3 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none"
                {...register('notes')}
              />
              {errors.notes?.message && (
                <p className="text-[11px] text-rose-400 font-medium" role="alert" aria-live="assertive">{errors.notes.message}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
