import React, { useEffect, useState } from 'react';
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
  notes: '',
  notes_count: 0,
};

interface CreateApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateApplicationModal: React.FC<CreateApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const createMutation = useCreateApplicationMutation();
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: CREATE_DEFAULTS,
  });

  // Reset form and warning state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      reset({ ...CREATE_DEFAULTS, applied_date: new Date().toISOString().split('T')[0] });
    } else {
      setShowUnsavedWarning(false);
    }
  }, [isOpen, reset]);

  const handleAttemptClose = () => {
    if (isDirty) {
      setShowUnsavedWarning(true);
    } else {
      onClose();
    }
  };

  const onSubmit = async (values: ApplicationFormValues) => {
    try {
      await createMutation.mutateAsync(values);
      reset();
      onClose();
    } catch {
      // Error handled by mutation onError callback
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
      <form id="create-application-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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
            <label htmlFor="create-status" className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Başvuru Durumu *
            </label>
            <div className="relative flex items-center w-full">
              <div className="absolute left-3.5 text-slate-500 pointer-events-none shrink-0" aria-hidden="true">
                <Sparkles className="w-4 h-4 text-blue-500" />
              </div>
              <select
                id="create-status"
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
            <label htmlFor="create-work-type" className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Çalışma Modeli
            </label>
            <select
              id="create-work-type"
              className="w-full h-10 px-3.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              {...register('work_type')}
            >
              <option value="Remote">Remote (Uzaktan)</option>
              <option value="Hybrid">Hybrid (Karma)</option>
              <option value="On-site">On-site (Ofis)</option>
            </select>
          </div>
        </div>

        {/* Optional Fields Section */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/60 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Ek Detaylar (Opsiyonel)</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <Input
              label="Başvuru Tarihi"
              type="date"
              leftIcon={<Calendar className="w-4 h-4" aria-hidden="true" />}
              error={errors.applied_date?.message}
              {...register('applied_date')}
            />

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
              type="email"
              placeholder="hr@company.com"
              leftIcon={<Mail className="w-4 h-4" aria-hidden="true" />}
              error={errors.contact_email?.message}
              {...register('contact_email')}
            />

            <div className="sm:col-span-2">
              <Input
                label="İlan Linki (URL)"
                type="url"
                placeholder="https://linkedin.com/jobs/..."
                leftIcon={<Globe className="w-4 h-4" aria-hidden="true" />}
                error={errors.job_url?.message}
                {...register('job_url')}
              />
            </div>

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
