import React from 'react';
import { BarChart as BarChartIcon } from 'lucide-react';
import { MonthlyApplicationsItem } from '@/utils/analyticsUtils';

interface MonthlyApplicationsChartProps {
  data: MonthlyApplicationsItem[];
}

export const MonthlyApplicationsChart: React.FC<MonthlyApplicationsChartProps> = ({ data }) => {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const totalCount = data.reduce((sum, d) => sum + d.count, 0);

  if (totalCount === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl space-y-2">
        <BarChartIcon className="w-8 h-8 text-slate-500" />
        <p className="text-xs font-semibold text-slate-400">Veri Bulunmuyor</p>
        <p className="text-[11px] text-slate-500 max-w-xs">
          Son 6 aya ait kayıtlı bir başvuru aktivitesi bulunmamaktadır.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bar Chart Container */}
      <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2">
        {data.map((item, idx) => {
          const heightPercent = Math.max(Math.round((item.count / maxCount) * 100), item.count > 0 ? 12 : 4);

          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
              {/* Value Badge above Bar */}
              <span className="text-[11px] font-bold text-slate-300 group-hover:text-indigo-400 transition-colors">
                {item.count}
              </span>

              {/* Bar Column */}
              <div className="w-full max-w-[36px] bg-slate-100 dark:bg-slate-800/60 rounded-t-lg h-36 flex items-end p-1 overflow-hidden relative">
                <div
                  className="w-full bg-gradient-to-t from-indigo-600 to-violet-500 rounded-t-md transition-all duration-500 group-hover:from-indigo-500 group-hover:to-violet-400 group-hover:shadow-lg group-hover:shadow-indigo-500/25"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* Month X-Axis Label */}
              <span className="text-[11px] font-medium text-slate-400 capitalize">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
