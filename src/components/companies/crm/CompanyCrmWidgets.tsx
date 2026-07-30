import React from 'react';
import { AlertCircle, Star, ArrowUpRight, Building2, Clock } from 'lucide-react';
import { DbCompany } from '@/types';
import { CompanyStatusBadge } from '../CompanyStatusBadge';
import { useNavigate } from 'react-router-dom';
import { getCompaniesRequiringAttention } from '@/utils/companyCrmUtils';

interface CompanyCrmWidgetsProps {
  companies: DbCompany[];
}

export const CompanyCrmWidgets: React.FC<CompanyCrmWidgetsProps> = ({ companies }) => {
  const navigate = useNavigate();

  const attentionCompanies = getCompaniesRequiringAttention(companies);
  const favoriteCompanies = companies.filter((c) => c.is_favorite);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Widget 1: Companies Requiring Attention */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">İlgi Bekleyen Şirketler</h3>
              <p className="text-[11px] text-slate-400">Son zamanlarda etkileşim kurulmamış hedef şirketler</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
            {attentionCompanies.length} Takipsiz
          </span>
        </div>

        {attentionCompanies.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-400">
            Tüm hedef şirketleriniz düzenli takip altında! 🎉
          </div>
        ) : (
          <div className="space-y-2">
            {attentionCompanies.map((comp) => (
              <div
                key={comp.id}
                onClick={() => navigate(`/companies/${comp.id}`)}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center text-xs shrink-0">
                    {comp.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-foreground group-hover:text-indigo-400 transition-colors truncate">
                      {comp.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">{comp.industry || 'Genel Teknoloji'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <CompanyStatusBadge status={comp.status} />
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Widget 2: Favorite Companies Quick Access */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Star className="w-5 h-5 fill-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Favori Hedef Şirketler</h3>
              <p className="text-[11px] text-slate-400">Öncelikli takip listenizdeki yıldızlı şirketler</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            {favoriteCompanies.length} Yıldızlı
          </span>
        </div>

        {favoriteCompanies.length === 0 ? (
          <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-xs text-slate-400">
            Henüz favorilere eklenmiş şirket bulunmamaktadır. Yıldız butonuna tıklayarak ekleyin.
          </div>
        ) : (
          <div className="space-y-2">
            {favoriteCompanies.slice(0, 4).map((comp) => (
              <div
                key={comp.id}
                onClick={() => navigate(`/companies/${comp.id}`)}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0">
                    {comp.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-foreground group-hover:text-indigo-400 transition-colors truncate">
                      {comp.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">{comp.location || 'Uzaktan'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{comp.rating || 3}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
