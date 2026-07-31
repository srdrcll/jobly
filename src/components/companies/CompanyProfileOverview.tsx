import React from 'react';
import { DbCompany } from '@/types';
import { CompanyStatusBadge } from './CompanyStatusBadge';
import { Button } from '@/components/ui/Button';
import { 
  Building2, 
  Globe, 
  MapPin, 
  Linkedin, 
  ExternalLink, 
  Star, 
  Edit3, 
  Archive,
  ArrowLeft,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CompanyProfileOverviewProps {
  company: DbCompany;
  onEdit: (company: DbCompany) => void;
  onToggleFavorite: (id: string, currentStatus: boolean) => void;
}

export const CompanyProfileOverview: React.FC<CompanyProfileOverviewProps> = ({
  company,
  onEdit,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate('/companies')}
        >
          Şirket Listesine Dön
        </Button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleFavorite(company.id, Boolean(company.is_favorite))}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400/40 bg-slate-50 dark:bg-slate-900 transition-colors"
            title="Favorilere Ekle / Çıkar"
          >
            <Star className={`w-4 h-4 ${company.is_favorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
          </button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Edit3 className="w-3.5 h-3.5" />}
            onClick={() => onEdit(company)}
          >
            Düzenle
          </Button>
        </div>
      </div>

      {/* Main Profile Info Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-2xl flex items-center justify-center shrink-0 shadow-sm">
            {company.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-black text-foreground tracking-tight">{company.name}</h1>
              <CompanyStatusBadge status={company.status} />
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              {company.industry && (
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                  {company.industry}
                </span>
              )}
              {company.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  {company.location}
                </span>
              )}
              {company.company_size && (
                <span className="flex items-center gap-1 font-semibold text-slate-300">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  {company.company_size} Çalışan
                </span>
              )}
            </div>
          </div>
        </div>

        {/* External Links Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-400 text-xs font-semibold transition-colors"
            >
              <Globe className="w-4 h-4" /> Web Sitesi
            </a>
          )}
          {company.linkedin_url && (
            <a
              href={company.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-xs font-semibold transition-colors"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          )}
          {company.career_page_url && (
            <a
              href={company.career_page_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Kariyer İlanları
            </a>
          )}
        </div>
      </div>

      {/* Notes Banner if present */}
      {company.notes && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">Şirket Notları</span>
          {company.notes}
        </div>
      )}
    </div>
  );
};
