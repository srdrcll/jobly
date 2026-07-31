import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { interviewSchema, InterviewFormValues } from '@/lib/validations/interviewSchema';
import { useCreateInterviewMutation } from '@/hooks/queries/useInterviewsQuery';
import { useApplicationsListQuery } from '@/hooks/queries/useApplicationsQuery';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Building2, Calendar, Clock, Video, MapPin, User, Link as LinkIcon, FileText } from 'lucide-react';

interface CreateInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateInterviewModal: React.FC<CreateInterviewModalProps> = ({ isOpen, onClose }) => {
  const createMutation = useCreateInterviewMutation();
  const { data: applications = [] } = useApplicationsListQuery();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      company_name: '',
      position: '',
      stage: 'İK Görüşmesi',
      type: 'Online',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      duration_minutes: 45,
      interviewer_name: '',
      interviewer_role: '',
      meeting_link: '',
      location: '',
      prep_notes: '',
      interview_notes: '',
      result: 'Pending',
    },
  });

  const selectedAppId = watch('application_id');

  // Auto-fill company and position when an application is selected
  useEffect(() => {
    if (selectedAppId) {
      const app = applications.find((a) => a.id === selectedAppId);
      if (app) {
        setValue('company_name', app.company_name);
        setValue('position', app.position);
        if (app.work_type === 'On-site') setValue('type', 'On-site');
        if (app.work_type === 'Remote') setValue('type', 'Online');
      }
    }
  }, [selectedAppId, applications, setValue]);

  const onSubmit = (data: InterviewFormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Yeni Mülakat Planla"
      description="Teknik mülakat, İK randevusu veya vaka sunum detaylarını kaydedin."
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Related Application Selector */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-foreground">İlişkili Başvuru (Opsiyonel)</label>
            <select
              {...register('application_id')}
              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">İlişkili bir başvuru seçin (veya manuel doldurun)...</option>
              {applications.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.company_name} — {app.position} ({app.status})
                </option>
              ))}
            </select>
          </div>

          {/* Company Name */}
          <Input
            label="Şirket Adı *"
            placeholder="Örn: Teknoloji A.Ş."
            leftIcon={<Building2 className="w-4 h-4 text-slate-400" />}
            error={errors.company_name?.message}
            {...register('company_name')}
          />

          {/* Position */}
          <Input
            label="Pozisyon Adı *"
            placeholder="Örn: Senior Frontend Developer"
            error={errors.position?.message}
            {...register('position')}
          />

          {/* Interview Stage */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Mülakat Aşaması</label>
            <select
              {...register('stage')}
              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="İK Görüşmesi">👥 İK Ön Görüşmesi</option>
              <option value="Teknik Mülakat">💻 Teknik Mülakat (Coding)</option>
              <option value="Vaka Çalışması">🧩 Vaka Çalışması (Case Study)</option>
              <option value="System Design">🏗️ System Design Mülakatı</option>
              <option value="Pair Programming">⚡ Pair Programming</option>
              <option value="Yönetici Görüşmesi">👔 Yönetici / Director Mülakatı</option>
              <option value="Teklif Görüşmesi">🏆 Teklif & Maaş Görüşmesi</option>
            </select>
          </div>

          {/* Interview Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Görüşme Türü</label>
            <select
              {...register('type')}
              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground font-bold focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Online">📹 Online Görüşme (Görüntülü Toplantı)</option>
              <option value="On-site">🏢 Ofiste (Yüz Yüze)</option>
              <option value="Phone">📞 Telefon Görüşmesi</option>
              <option value="Hybrid">🔀 Hibrit</option>
            </select>
          </div>

          {/* Date */}
          <Input
            label="Mülakat Tarihi *"
            type="date"
            leftIcon={<Calendar className="w-4 h-4 text-slate-400" />}
            error={errors.date?.message}
            {...register('date')}
          />

          {/* Time & Duration */}
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Saat *"
              type="time"
              leftIcon={<Clock className="w-4 h-4 text-slate-400" />}
              error={errors.time?.message}
              {...register('time')}
            />

            <Input
              label="Süre (Dakika)"
              type="number"
              placeholder="45"
              error={errors.duration_minutes?.message}
              {...register('duration_minutes')}
            />
          </div>

          {/* Interviewer Name */}
          <Input
            label="Mülakatçı Adı"
            placeholder="Örn: Mehmet Can (Lead Engineer)"
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
            error={errors.interviewer_name?.message}
            {...register('interviewer_name')}
          />

          {/* Interviewer Role */}
          <Input
            label="Mülakatçı Unvanı"
            placeholder="Örn: Engineering Manager"
            error={errors.interviewer_role?.message}
            {...register('interviewer_role')}
          />

          {/* Meeting Link */}
          <Input
            label="Online Toplantı Bağlantısı (URL)"
            placeholder="https://toplanti-linki.com/..."
            leftIcon={<LinkIcon className="w-4 h-4 text-slate-400" />}
            error={errors.meeting_link?.message}
            {...register('meeting_link')}
          />

          {/* Location */}
          <Input
            label="Lokasyon / Adres"
            placeholder="Örn: Levent Plazas Kat 12"
            leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
            error={errors.location?.message}
            {...register('location')}
          />

          {/* Preparation Notes */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Mülakat Öncesi Hazırlık Notları</label>
            <textarea
              rows={3}
              placeholder="Sorulacak sorular, incelenecek projeler, şirket değerleri..."
              {...register('prep_notes')}
              className="w-full p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            İptal
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={createMutation.isPending}
          >
            Mülakatı Kaydet
          </Button>
        </div>
      </form>
    </Modal>
  );
};
