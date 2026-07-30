import React from 'react';
import { History, Clock, Sparkles } from 'lucide-react';

export const RecentActivityPlaceholder: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark space-y-5 h-full flex flex-col justify-between">
      {/* Container Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Son Aktiviteler</h3>
            <p className="text-xs text-slate-400">Başvuru durumu güncellemeleri ve geçmiş akışı</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
          <Sparkles className="w-3 h-3" /> Sprint 5.4
        </span>
      </div>

      {/* Wireframe Activity Timeline Placeholder Content */}
      <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-4 my-auto min-h-[220px]">
        {/* Mock Activity Items Wireframe */}
        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          <div className="relative flex items-center justify-between text-xs">
            <div className="absolute -left-6 top-0.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />
            <div className="space-y-0.5">
              <p className="font-semibold text-slate-300">Yeni başvuru eklendi</p>
              <p className="text-[11px] text-slate-500">Trendyol Tech • Frontend Engineer</p>
            </div>
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Henüz yok
            </span>
          </div>

          <div className="relative flex items-center justify-between text-xs opacity-60">
            <div className="absolute -left-6 top-0.5 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-purple-500/20" />
            <div className="space-y-0.5">
              <p className="font-semibold text-slate-300">Mülakat aşamasına geçildi</p>
              <p className="text-[11px] text-slate-500">Getir Tech • Lead Developer</p>
            </div>
            <span className="text-[10px] text-slate-500">Planlandı</span>
          </div>
        </div>

        <div className="pt-2 text-center">
          <p className="text-xs text-slate-500">
            Canlı başvuru ekledikçe aktiviteleriniz zaman tünelinde kronolojik olarak listelenecektir.
          </p>
        </div>
      </div>
    </div>
  );
};
