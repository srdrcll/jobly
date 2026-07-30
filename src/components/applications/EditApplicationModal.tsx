import React, { useEffect } from 'react';
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
  Save 
} from 'lucide-react';
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
  });

  useEffect(() => {
    if (isOpen && application) {
      reset({
        company_name: application.company_name || '',
        position: application.position || '',
        target_role: (application as any).target_role || 'Software Engineer',
        status: application.status || 'applied',
        applied_date: application.applied_date 
          ? new Date(application.applied_date).toISOString().split('T')[0] 
          : '',
        job_url: (application as any).job_url || '',
        salary: application.salary || '',
        work_type: application.work_type || 'Remote',
        contact_name: (application as any).contact_name || '',
        contact_email: (application as any).contact_email || '',
        priority: (application as any).priority || 'Orta',
        notes: (application as any).notes || '',
        notes_count: application.notes_count || 0,
      });
    }
  }, [isOpen, application, reset]);

  const handleAttemptClose = () => {
    if (isDirty) {
      const confirmClose = window.confirm('Kaydedilmemiş değişiklikleriniz var. Kapatmak istediğinize emin misiniz?');
      if (!confirmClose) return;
    }
    onClose();
  };

  const onSubmit = async (values: ApplicationFormValues) => {
    if (!application?.id) return;

    try {
      await updateMutation.mutateAsync({
        id: application.id,
        payload: {
          company_name: values.company_name,
          position: values.position,
          target_role: values.target_role,
          status: values.status,
          applied_date: values.applied_date ? new Date(values.applied_date).toISOString() : null,
          job_url: values.job_url || null,
          salary: values.salary || null,
          work_type: values.work_type || null,
          contact_name: values.contact_name || null,
          contact_email: values.contact_email || null,
          priority: values.priority || 'Orta',
          notes: values.notes || null,
        } as any,
      });
      onClose();
    } catch {
      // Error handled by mutation callback
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleAttemptClose}
      title="Başvuruyu Düzenle"
      description="İş başvurunuza ait bilgileri güncelleyin."
      size="lg"
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
      <form id="edit-application-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Required Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Şirket Adı *"
            placeholder="örn. Trendyol, Getir"
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Target Role Select */}
          <div className="space-y-1.5 w-full">
            <label className="block text-xs font-semibold text-slate-300">
              Hedef Rol *
            </label>
            <div className="relative flex items-center w-full">
              <div className="absolute left-3.5 text-slate-500 pointer-events-none shrink-0" aria-hidden="true">
                <Target className="w-4 h-4" />
              </div>
              <select
                className="w-full h-10 pl-10 pr-3.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                {...register('target_role')}
              >
                {TARGET_ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            {errors.target_role?.message && (
              <p className="text-[11px] text-rose-400 font-medium">{errors.target_role.message}</p>
            )}
          </div>

          {/* Status Select */}
          <div className="space-y-1.5 w-full">
            <label className="block text-xs font-semibold text-slate-300">
              Başvuru Durumu *
            </label>
            <div className="relative flex items-center w-full">
              <div className="absolute left-3.5 text-slate-500 pointer-events-none shrink-0" aria-hidden="true">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
              <select
                className="w-full h-10 pl-10 pr-3.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
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
        </div>

        {/* Optional Fields */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ek Detaylar (Opsiyonel)</h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

            <div className="space-y-1.5 w-full">
              <label className="block text-xs font-semibold text-slate-300">
                Çalışma Modeli
              </label>
              <select
                className="w-full h-10 px-3.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                {...register('work_type')}
              >
                <option value="Remote">Remote (Uzaktan)</option>
                <option value="Hybrid">Hybrid (Karma)</option>
                <option value="On-site">On-site (Ofis)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="İlan Linki (URL)"
              type="url"
              placeholder="https://linkedin.com/jobs/..."
              leftIcon={<Globe className="w-4 h-4" aria-hidden="true" />}
              error={errors.job_url?.message}
              {...register('job_url')}
            />

            <div className="grid grid-cols-2 gap-2">
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
            </div>
          </div>

          {/* Notes Area */}
          <div className="space-y-1.5 w-full">
            <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" /> Özel Notlar & Detaylar
            </label>
            <textarea
              rows={3}
              placeholder="Mülakat detayları veya notlarınızı ekleyin..."
              className="w-full p-3 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-foreground placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none"
              {...register('notes')}
            />
            {errors.notes?.message && (
              <p className="text-[11px] text-rose-400 font-medium">{errors.notes.message}</p>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};
