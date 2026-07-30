import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companySchema, CompanyFormValues } from '@/lib/validations/companySchema';
import { useCreateCompanyMutation } from '@/hooks/queries/useCompaniesQuery';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Building2, Globe, MapPin, User, Mail, Phone, Linkedin, ExternalLink, Star } from 'lucide-react';

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({ isOpen, onClose }) => {
  const createMutation = useCreateCompanyMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      industry: '',
      website: '',
      location: '',
      company_size: '',
      contact_person: '',
      contact_email: '',
      contact_phone: '',
      linkedin_url: '',
      career_page_url: '',
      notes: '',
      status: 'Target',
      rating: 3,
      is_favorite: false,
    },
  });

  const ratingValue = watch('rating') || 3;
  const isFavorite = watch('is_favorite') || false;

  const onSubmit = (data: CompanyFormValues) => {
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
      title="Yeni Şirket Ekle"
      description="Hedeflediğiniz veya başvuru yaptığınız şirket bilgilerini kaydedin."
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Company Name */}
          <div className="sm:col-span-2">
            <Input
              label="Şirket Adı *"
              placeholder="Örn: Trendyol Tech, Getir, Google"
              leftIcon={<Building2 className="w-4 h-4 text-slate-400" />}
              error={errors.name?.message}
              {...register('name')}
            />
          </div>

          {/* Industry */}
          <Input
            label="Sektör"
            placeholder="Örn: E-Ticaret, FinTech, SaaS"
            error={errors.industry?.message}
            {...register('industry')}
          />

          {/* Location */}
          <Input
            label="Lokasyon / Merkez"
            placeholder="Örn: İstanbul / Levent, Remote"
            leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
            error={errors.location?.message}
            {...register('location')}
          />

          {/* Website */}
          <Input
            label="Web Sitesi"
            placeholder="https://company.com"
            leftIcon={<Globe className="w-4 h-4 text-slate-400" />}
            error={errors.website?.message}
            {...register('website')}
          />

          {/* Company Size */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Şirket Büyüklüğü</label>
            <select
              {...register('company_size')}
              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Seçiniz</option>
              <option value="1-10">1-10 Çalışan (Mikro)</option>
              <option value="11-50">11-50 Çalışan (Startup)</option>
              <option value="51-200">51-200 Çalışan (Ölçeklenen)</option>
              <option value="201-500">201-500 Çalışan (Orta Ölçek)</option>
              <option value="500+">500+ Çalışan (Kurumsal)</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Takip Durumu</label>
            <select
              {...register('status')}
              className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
            >
              <option value="Target">🎯 Hedef Şirket</option>
              <option value="Researching">🔍 Araştırılıyor</option>
              <option value="Applied">📩 Başvuruldu</option>
              <option value="Contacted">📞 İletişime Geçildi</option>
              <option value="Interviewed">👥 Mülakat Sürecinde</option>
              <option value="Offer">🏆 Teklif Alındı</option>
              <option value="Archived">📦 Arşivlendi</option>
            </select>
          </div>

          {/* Rating */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Şirket Değerlendirme Puanı</label>
            <div className="flex items-center gap-1.5 h-10">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setValue('rating', star)}
                  className="p-1 text-amber-400 hover:scale-125 transition-transform focus:outline-none"
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= ratingValue ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-400 ml-2">{ratingValue} / 5</span>
            </div>
          </div>

          {/* Contact Person */}
          <Input
            label="İletişim Kişisi (İK / Recruiter)"
            placeholder="Örn: Ayşe Yılmaz"
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
            error={errors.contact_person?.message}
            {...register('contact_person')}
          />

          {/* Contact Email */}
          <Input
            label="İletişim E-Postası"
            placeholder="hr@company.com"
            leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
            error={errors.contact_email?.message}
            {...register('contact_email')}
          />

          {/* Contact Phone */}
          <Input
            label="Telefon Numarası"
            placeholder="+90 532 000 0000"
            leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
            error={errors.contact_phone?.message}
            {...register('contact_phone')}
          />

          {/* LinkedIn URL */}
          <Input
            label="LinkedIn Sayfası"
            placeholder="https://linkedin.com/company/..."
            leftIcon={<Linkedin className="w-4 h-4 text-slate-400" />}
            error={errors.linkedin_url?.message}
            {...register('linkedin_url')}
          />

          {/* Career Page URL */}
          <div className="sm:col-span-2">
            <Input
              label="Kariyer / Açık Pozisyonlar Sayfası"
              placeholder="https://company.com/careers"
              leftIcon={<ExternalLink className="w-4 h-4 text-slate-400" />}
              error={errors.career_page_url?.message}
              {...register('career_page_url')}
            />
          </div>

          {/* Notes */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Özel Notlar & Araştırma Detayları</label>
            <textarea
              rows={3}
              placeholder="Şirket kültürü, maaş skalası, kullanılan teknolojiler..."
              {...register('notes')}
              className="w-full p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-foreground placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>
        </div>

        {/* Favorite Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
            <span className="text-xs font-bold text-foreground">Favori Şirketlerime Ekle</span>
          </div>
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={(e) => setValue('is_favorite', e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
          />
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
            Şirketi Kaydet
          </Button>
        </div>
      </form>
    </Modal>
  );
};
