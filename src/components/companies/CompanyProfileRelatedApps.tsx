import React from 'react';
import { Briefcase, ArrowUpRight, Calendar, DollarSign, MapPin } from 'lucide-react';
import { DbApplication } from '@/types';
import { useNavigate } from 'react-router-dom';

interface CompanyProfileRelatedAppsProps {
  applications: DbApplication[];
}

export const CompanyProfileRelatedApps: React.FC<CompanyProfileRelatedAppsProps> = ({ applications }) => {
  const navigate = useNavigate();

  if (!applications || applications.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark text-center space-y-2">
        <Briefcase className="w-8 h-8 text-slate-500 mx-auto" />
        <p className="text-xs font-bold text-slate-300">İlişkili Başvuru Bulunmuyor</p>
        <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
          Bu şirket adına henüz kaydedilmiş bir iş başvurusu bulunmamaktadır.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">İlişkili Başvurular ({applications.length})</h3>
            <p className="text-xs text-slate-400">Bu şirket altında kayıtlı iş başvurularınız</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {applications.map((app) => (
          <div
            key={app.id}
            onClick={() => navigate(`/applications/${app.id}`)}
            className="py-3 px-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-foreground group-hover:text-indigo-400 transition-colors">
                  {app.position}
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-400 uppercase">
                  {app.status}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                {app.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {app.location}
                  </span>
                )}
                {app.salary && (
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <DollarSign className="w-3 h-3" />
                    {app.salary}
                  </span>
                )}
                {app.applied_date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {new Date(app.applied_date).toLocaleDateString('tr-TR')}
                  </span>
                )}
              </div>
            </div>

            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
