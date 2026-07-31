import React from 'react';
import { DbCompany } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { CompanyStatusBadge } from './CompanyStatusBadge';
import { Button } from '@/components/ui/Button';
import { 
  Building2, 
  Globe, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Linkedin, 
  ExternalLink, 
  Star, 
  Edit3, 
  Trash2,
  Briefcase
} from 'lucide-react';

interface CompanyDetailModalProps {
  company: DbCompany | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (company: DbCompany) => void;
  onDelete: (id: string) => void;
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  company,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!company) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={company.name}
      description="Şirket profili, iletişim kişileri ve başvuru detayları"
      size="lg"
    >
      <div className="space-y-6 pt-2">
        {/* Top Header Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-xl flex items-center justify-center shrink-0">
              {company.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-foreground">{company.name}</h3>
                {company.is_favorite && (
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                {company.industry && (
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {company.industry}
                  </span>
                )}
                {company.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {company.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <CompanyStatusBadge status={company.status} />
          </div>
        </div>

        {/* Rating & Quick Actions Links */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-400">Değerlendirme:</span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= (company.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-foreground ml-1">({company.rating || 0} / 5)</span>
          </div>

          <div className="flex items-center gap-2">
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-400 text-xs font-semibold transition-colors"
              >
                <Globe className="w-3.5 h-3.5" /> Web Sitesi
              </a>
            )}
            {company.career_page_url && (
              <a
                href={company.career_page_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-xs font-semibold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Kariyer Sayfası
              </a>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Company Size */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400">Şirket Büyüklüğü</span>
            <p className="font-bold text-foreground">{company.company_size || 'Belirtilmedi'}</p>
          </div>

          {/* Contact Person */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400">İletişim Kişisi (İK)</span>
            <p className="font-bold text-foreground flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              {company.contact_person || 'Belirtilmedi'}
            </p>
          </div>

          {/* Contact Email */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400">İletişim E-Postası</span>
            {company.contact_email ? (
              <a href={`mailto:${company.contact_email}`} className="font-bold text-indigo-400 hover:underline flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {company.contact_email}
              </a>
            ) : (
              <p className="font-bold text-slate-500">Belirtilmedi</p>
            )}
          </div>

          {/* Contact Phone */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400">Telefon Numarası</span>
            {company.contact_phone ? (
              <a href={`tel:${company.contact_phone}`} className="font-bold text-foreground hover:underline flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                {company.contact_phone}
              </a>
            ) : (
              <p className="font-bold text-slate-500">Belirtilmedi</p>
            )}
          </div>

          {/* LinkedIn Page */}
          {company.linkedin_url && (
            <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 space-y-1">
              <span className="text-[11px] font-semibold text-slate-400">LinkedIn Şirket Profili</span>
              <a
                href={company.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-indigo-400 hover:underline flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                {company.linkedin_url}
              </a>
            </div>
          )}
        </div>

        {/* Notes & Research Section */}
        {company.notes && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Araştırma Notları</h4>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
              {company.notes}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
            onClick={() => onDelete(company.id)}
          >
            Şirketi Sil
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Kapat
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Edit3 className="w-3.5 h-3.5" />}
              onClick={() => {
                onClose();
                onEdit(company);
              }}
            >
              Düzenle
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
