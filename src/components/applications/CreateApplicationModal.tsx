import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Building2, 
  Briefcase, 
  Target, 
  Calendar, 
  Globe, 
  DollarSign, 
  User, 
  Mail, 
  FileText, 
  Sparkles, 
  PlusCircle,
  AlertTriangle
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  applicationSchema, 
  ApplicationFormValues, 
  TARGET_ROLE_OPTIONS 
} from '@/lib/validations/applicationSchema';
import { useCreateApplicationMutation } from '@/hooks/queries/useApplicationsQuery';
import { STATUS_CONFIG } from '@/constants/status';
import { detectPlatformFromUrl } from '@/utils/platformUtils';
import { parseJobUrl } from '@/utils/jobUrlParser';
import { useToast } from '@/hooks/useToast';

/** Default values extracted as a constant to prevent duplication. */
const CREATE_DEFAULTS: ApplicationFormValues = {
  company_name: '',
  position: '',
  target_role: 'Software Engineer',
  status: 'applied',
  applied_date: new Date().toISOString().split('T')[0],
  job_url: '',
  salary: '',
  work_type: 'Remote',
  contact_name: '',
  contact_email: '',
  priority: 'Orta',
  source: '',
  notes: '',
  notes_count: 0,
};

interface CreateApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<ApplicationFormValues>;
}

export const CreateApplicationModal: React.FC<CreateApplicationModalProps> = ({
  isOpen,
  onClose,
  initialValues,
}) => {
  const createMutation = useCreateApplicationMutation();
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
    defaultValues: { ...CREATE_DEFAULTS, ...initialValues },
  });

  const watchedJobUrl = watch('job_url');
  const watchedCompany = watch('company_name');
  const watchedPosition = watch('position');
  const watchedSource = watch('source');

  useEffect(() => {
    if (watchedJobUrl && watchedJobUrl.trim().length > 8) {
      const parsed = parseJobUrl(watchedJobUrl);

      if (parsed.source && (!watchedSource || !watchedSource.trim())) {
        setValue('source', parsed.source, { shouldDirty: true, shouldValidate: true });
      }
      if (parsed.company_name && (!watchedCompany || !watchedCompany.trim())) {
        setValue('company_name', parsed.company_name, { shouldDirty: true, shouldValidate: true });
      }
      if (parsed.position && (!watchedPosition || !watchedPosition.trim())) {
        setValue('position', parsed.position, { shouldDirty: true, shouldValidate: true });
      }
    }
  }, [watchedJobUrl, watchedCompany, watchedPosition, watchedSource, setValue]);

  // Reset form and warning state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      reset({ 
        ...CREATE_DEFAULTS, 
        applied_date: new Date().toISOString().split('T')[0],
        ...initialValues 
      });
    } else {
      setShowUnsavedWarning(false);
    }
  }, [isOpen, initialValues, reset]);

  const handleAttemptClose = useCallback(() => {
    if (isDirty) {
      setShowUnsavedWarning(true);
    } else {
      onClose();
    }
  }, [isDirty, onClose]);

  const onSubmit = async (values: ApplicationFormValues) => {
    try {
      await createMutation.mutateAsync(values);
      reset();
      onClose();
    } catch {
      // Error handled by mutation onError callback
    }
  };

  const onFormError = (formErrors: Record<string, any>) => {
    const errorKeys = Object.keys(formErrors);
    if (errorKeys.length > 0) {
      const firstError = formErrors[errorKeys[0]];
      toast.error('Formu Kontrol Edin', firstError?.message || 'Lütfen zorunlu alanları kontrol edin.');
    }
  };

  // Unsaved changes confirmation dialog (accessible alternative to window.confirm)
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
          Doldurduğunuz form alanları kaydedilmemiş. Çıkarsanız girdiğiniz bilgiler kaybolacaktır.
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleAttemptClose}
      title="Yeni İş Başvurusu Ekle"
      description="Veritabanınıza yeni bir iş başvurusu kaydı ekleyin."
      maxWidth="xl"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={handleAttemptClose}
            disabled={isSubmitting || createMutation.isPending}
          >
            İptal
          </Button>
          <Button
            type="submit"
            form="create-application-form"
            variant="primary"
            isLoading={isSubmitting || createMutation.isPending}
            leftIcon={<PlusCircle className="w-4 h-4" aria-hidden="true" />}
          >
            Başvuruyu Kaydet
          </Button>
        </div>
      }
    >
      <form id="create-application-form" onSubmit={handleSubmit(onSubmit, onFormError)} className="space-y-5" noValidate>
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
            placeholder="örn. Senior Frontend Developer"
            leftIcon={<Briefcase className="w-4 h-4" aria-hidden="true" />}
            error={errors.position?.message}
            {...register('position')}
          />

          {/* Status Selection with Visual Color Indicators */}
          <div className="space-y-1.5 w-full">
            <label htmlFor="create-status" className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Başvuru Durumu *
            </label>
            <div className="relative flex items-center w-full">
              <select
                id="create-status"
                className="w-full h-10 px-3 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer"
                {...register('status')}
              >
                {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.status?.message && (
              <p className="text-[11px] text-rose-400 font-medium" role="alert" aria-live="assertive">{errors.status.message}</p>
            )}
          </div>

          {/* Work Type Selection */}
          <div className="space-y-1.5 w-full">
            <label htmlFor="create-work-type" className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Çalışma Modeli
            </label>
            <div className="relative flex items-center w-full">
              <select
                id="create-work-type"
                className="w-full h-10 px-3 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer"
                {...register('work_type')}
              >
                <option value="Remote">Remote (Uzaktan)</option>
                <option value="Hybrid">Hybrid (Karma)</option>
                <option value="On-site">On-site (Ofis)</option>
              </select>
            </div>
            {errors.work_type?.message && (
              <p className="text-[11px] text-rose-400 font-medium" role="alert" aria-live="assertive">{errors.work_type.message}</p>
            )}
          </div>

          <Input
            label="Başvuru Tarihi"
            type="date"
            leftIcon={<Calendar className="w-4 h-4" aria-hidden="true" />}
            error={errors.applied_date?.message}
            {...register('applied_date')}
          />

          {/* Quick Platform Source with Autocomplete Suggestions */}
          <div className="space-y-1.5 w-full">
            <label htmlFor="create-source" className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Başvuru Kaynağı (Platform)
            </label>
            <div className="relative flex items-center w-full">
              <div className="absolute left-3.5 text-slate-500 pointer-events-none shrink-0" aria-hidden="true">
                <Globe className="w-4 h-4 text-blue-500" />
              </div>
              <input
                id="create-source"
                list="platform-sources"
                placeholder="örn. LinkedIn, Kariyer.net, Youthall"
                className="w-full h-10 pl-10 pr-3.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                {...register('source')}
              />
            </div>
            <datalist id="platform-sources">
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
              leftIcon={<DollarSign className="w-4 h-4" aria-hidden="true" />}
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
              <label htmlFor="create-notes" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" aria-hidden="true" /> Özel Notlar & Detaylar
              </label>
              <textarea
                id="create-notes"
                rows={3}
                placeholder="Mülakat süreci, teknoloji mülakatı detayları veya başvuru notlarınızı ekleyin..."
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
