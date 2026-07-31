import React from 'react';
import { Activity } from 'lucide-react';
import { WeeklyActivityItem } from '@/utils/analyticsUtils';

interface WeeklyActivityChartProps {
  data: WeeklyActivityItem[];
}

export const WeeklyActivityChart: React.FC<WeeklyActivityChartProps> = ({ data }) => {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const totalCount = data.reduce((sum, d) => sum + d.count, 0);

  if (totalCount === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl space-y-2">
        <Activity className="w-8 h-8 text-slate-500" />
        <p className="text-xs font-semibold text-slate-400">Aktivite Bulunmuyor</p>
        <p className="text-[11px] text-slate-500 max-w-xs">
          Son 7 gün içinde kaydedilen bir aktivite bulunmamaktadır.
        </p>
      </div>
    );
  }

  // Generate SVG Line Points
  const width = 300;
  const height = 120;
  const stepX = width / (data.length - 1 || 1);

  const points = data.map((item, idx) => {
    const x = idx * stepX;
    const y = height - (item.count / maxCount) * (height - 20) - 10;
    return { x, y, ...item };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className="space-y-4">
      <div className="relative w-full pt-4">
        {/* SVG Line Chart */}
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32 overflow-visible">
          {/* Subtle Grid Lines */}
          <line x1="0" y1="20" x2={width} y2="20" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
          <line x1="0" y1="60" x2={width} y2="60" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
          <line x1="0" y1="100" x2={width} y2="100" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />

          {/* Area Fill Gradient */}
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <polygon
            points={`0,${height} ${polylinePoints} ${width},${height}`}
            fill="url(#lineGrad)"
          />

          {/* Line Path */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylinePoints}
          />

          {/* Data Points */}
          {points.map((p, idx) => (
            <g key={idx} className="group cursor-pointer">
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                className="fill-blue-500 stroke-white dark:stroke-slate-900 stroke-2 group-hover:r-6 transition-all"
              />
              <title>{`${p.dayLabel}: ${p.count} aktivite`}</title>
            </g>
          ))}
        </svg>

        {/* X-Axis Labels */}
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          {data.map((item, idx) => (
            <span key={idx} className="capitalize">{item.dayLabel}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
