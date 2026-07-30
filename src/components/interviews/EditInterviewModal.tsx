import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { interviewSchema, InterviewFormValues } from '@/lib/validations/interviewSchema';
import { useUpdateInterviewMutation } from '@/hooks/queries/useInterviewsQuery';
import { DbInterview } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Building2, Calendar, Clock, MapPin, User, Link as LinkIcon } from 'lucide-react';

interface EditInterviewModalProps {
  interview: DbInterview | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditInterviewModal: React.FC<EditInterviewModalProps> = ({ interview, isOpen, onClose }) => {
  const updateMutation = useUpdateInterviewMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewSchema),
  });

  useEffect(() => {
    if (interview) {
      reset({
        company_name: interview.company_name,
        position: interview.position,
        stage: interview.stage || 'İK Görüşmesi',
        type: (interview.type as any) || 'Online',
        date: interview.date,
        time: interview.time || '14:00',
        duration_minutes: interview.duration_minutes || 45,
        interviewer_name: interview.interviewer_name || '',
        interviewer_role: interview.interviewer_role || '',
        meeting_link: interview.meeting_link || '',
        location: interview.location || '',
        prep_notes: interview.prep_notes || '',
        interview_notes: interview.interview_notes || '',
        result: (interview.result as any) || 'Pending',
        follow_up_date: interview.follow_up_date || '',
      });
    }
  }, [interview, reset]);

  const onSubmit = (data: InterviewFormValues) => {
    if (!interview) return;

    updateMutation.mutate(
      { id: interview.id, payload: data },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Mülakat Bilgilerini Güncelle"
      description={`${interview?.company_name || ''} — ${interview?.position || ''} randevusunu düzenleyin.`}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Company Name */}
          <Input
            label="Şirket Adı *"
            leftIcon={<Building2 className="w-4 h-4 text-slate-400" />}
            error={errors.company_name?.message}
            {...register('company_name')}
          />

          {/* Position */}
          <Input
            label="Pozisyon Adı *"
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

          {/* Result Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Mülakat Sonucu</label>
            <select
              {...register('result')}
              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground font-extrabold focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="Pending">⏳ Sonuç Bekleniyor</option>
              <option value="Passed">✅ Başarılı / Olumlu (Aşama Geçildi)</option>
              <option value="Failed">❌ Olumsuz Dönüş</option>
              <option value="Offer">🏆 İş Teklifi Alındı</option>
            </select>
          </div>

          {/* Interview Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Görüşme Türü</label>
            <select
              {...register('type')}
              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="Online">📹 Online (Google Meet / Zoom / Teams)</option>
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
              error={errors.duration_minutes?.message}
              {...register('duration_minutes')}
            />
          </div>

          {/* Interviewer Name */}
          <Input
            label="Mülakatçı Adı"
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
            error={errors.interviewer_name?.message}
            {...register('interviewer_name')}
          />

          {/* Meeting Link */}
          <Input
            label="Online Toplantı Bağlantısı"
            leftIcon={<LinkIcon className="w-4 h-4 text-slate-400" />}
            error={errors.meeting_link?.message}
            {...register('meeting_link')}
          />

          {/* Location */}
          <Input
            label="Lokasyon / Adres"
            leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
            error={errors.location?.message}
            {...register('location')}
          />

          {/* Preparation Notes */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Öncesi Hazırlık Notları</label>
            <textarea
              rows={2}
              {...register('prep_notes')}
              className="w-full p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          {/* Post Interview Notes */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Görüşme Sonrası Değerlendirme Notları</label>
            <textarea
              rows={3}
              placeholder="Görüşmede sorulan sorular, verilen cevaplar ve izlenimler..."
              {...register('interview_notes')}
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
            isLoading={updateMutation.isPending}
          >
            Değişiklikleri Kaydet
          </Button>
        </div>
      </form>
    </Modal>
  );
};
