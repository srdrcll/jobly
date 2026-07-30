import React from 'react';
import { PieChart as PieChartIcon } from 'lucide-react';
import { StatusDistributionItem } from '@/utils/analyticsUtils';

interface StatusDistributionChartProps {
  data: StatusDistributionItem[];
  totalApplications: number;
}

export const StatusDistributionChart: React.FC<StatusDistributionChartProps> = ({ data, totalApplications }) => {
  if (!data || data.length === 0 || totalApplications === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl space-y-2">
        <PieChartIcon className="w-8 h-8 text-slate-500" />
        <p className="text-xs font-semibold text-slate-400">Veri Bulunmuyor</p>
        <p className="text-[11px] text-slate-500 max-w-xs">
          Henüz durum dağılımını gösterecek kayıtlı bir başvuru bulunmamaktadır.
        </p>
      </div>
    );
  }

  // Calculate SVG Pie/Donut Chart slices
  let cumulativePercent = 0;
  const slices = data.map((item) => {
    const startAngle = cumulativePercent * 3.6;
    cumulativePercent += item.percentage;
    const endAngle = cumulativePercent * 3.6;
    return { ...item, startAngle, endAngle };
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Interactive Donut SVG Chart */}
        <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {slices.map((slice, i) => {
              const startRad = (slice.startAngle * Math.PI) / 180;
              const endRad = (slice.endAngle * Math.PI) / 180;
              const x1 = 50 + 40 * Math.cos(startRad);
              const y1 = 50 + 40 * Math.sin(startRad);
              const x2 = 50 + 40 * Math.cos(endRad);
              const y2 = 50 + 40 * Math.sin(endRad);
              const largeArcFlag = slice.percentage > 50 ? 1 : 0;
              const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

              return (
                <path
                  key={i}
                  d={pathData}
                  fill={slice.color}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                >
                  <title>{`${slice.label}: ${slice.count} (${slice.percentage}%)`}</title>
                </path>
              );
            })}
            {/* Donut Center Hole */}
            <circle cx="50" cy="50" r="26" fill="currentColor" className="text-white dark:text-slate-900" />
          </svg>

          {/* Donut Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xl font-extrabold text-foreground tracking-tight">{totalApplications}</span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Başvuru</span>
          </div>
        </div>

        {/* Legend & Percentages List */}
        <div className="flex-1 w-full space-y-2.5">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs space-x-2">
              <div className="flex items-center space-x-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-slate-300 truncate">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2 font-mono text-[11px]">
                <span className="font-bold text-foreground">{item.count}</span>
                <span className="text-slate-400">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
