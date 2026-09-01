import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Download } from 'lucide-react';
import { DbInterview } from '@/types';
import { Button } from '@/components/ui/Button';
import { exportAllInterviewsToIcs } from '@/utils/calendarIntegrationUtils';

interface InterviewCalendarProps {
  interviews: DbInterview[];
  onSelectInterview: (interview: DbInterview) => void;
}

export const InterviewCalendar: React.FC<InterviewCalendarProps> = ({
  interviews,
  onSelectInterview,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

  // Navigation handlers
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => setCurrentDate(new Date());

  // Generate calendar grid days
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7; // Monday index 0

  const calendarDays = useMemo(() => {
    const days: Array<{ dateStr: string; dayNum: number; isCurrentMonth: boolean }> = [];

    // Prev month padding
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const prevDate = new Date(year, month - 1, d);
      days.push({
        dateStr: prevDate.toISOString().split('T')[0],
        dayNum: d,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dateStr,
        dayNum: d,
        isCurrentMonth: true,
      });
    }

    // Next month padding to fill 35 or 42 grid cells
    const remaining = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const nextDate = new Date(year, month + 1, d);
      days.push({
        dateStr: nextDate.toISOString().split('T')[0],
        dayNum: d,
        isCurrentMonth: false,
      });
    }

    return days;
  }, [year, month, daysInMonth, firstDayOfWeek]);

  const todayStr = new Date().toISOString().split('T')[0];

  // Group interviews by date string
  const interviewsByDate = useMemo(() => {
    const map: Record<string, DbInterview[]> = {};
    interviews.forEach((i) => {
      if (i.date) {
        if (!map[i.date]) map[i.date] = [];
        map[i.date].push(i);
      }
    });
    return map;
  }, [interviews]);

  return (
    <div className="bg-white/80 dark:bg-[#0D1424]/75 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/70 rounded-3xl p-6 shadow-soft dark:shadow-soft-dark space-y-4 animate-fadeIn specular-border">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground capitalize">{monthName} Takvimi</h3>
            <p className="text-xs text-slate-400">Planlanmış mülakat randevuları ve saatleri</p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {interviews.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-3.5 h-3.5 text-purple-400" />}
              onClick={() => exportAllInterviewsToIcs(interviews)}
              title="Tüm mülakatları .ics takvim dosyası olarak indir"
            >
              Takvimi Dışa Aktar (.ics)
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleToday}>
            Bugün
          </Button>
          <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-foreground transition-colors"
              title="Önceki Ay"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-foreground transition-colors"
              title="Sonraki Ay"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Weekday Labels Header */}
      <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 border-b border-slate-200 dark:border-slate-800/80 pb-2">
        <span>Pzt</span>
        <span>Sal</span>
        <span>Çar</span>
        <span>Per</span>
        <span>Cum</span>
        <span>Cmt</span>
        <span>Paz</span>
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {calendarDays.map((cell, index) => {
          const dayInterviews = interviewsByDate[cell.dateStr] || [];
          const isToday = cell.dateStr === todayStr;

          return (
            <div
              key={index}
              className={`min-h-[90px] p-1.5 sm:p-2 rounded-xl border transition-all flex flex-col justify-between ${
                isToday
                  ? 'bg-purple-500/10 border-purple-500/40 shadow-sm'
                  : cell.isCurrentMonth
                  ? 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/60'
                  : 'bg-slate-100/30 dark:bg-slate-950/20 border-slate-200/50 dark:border-slate-900 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-extrabold px-1.5 py-0.5 rounded-md ${
                    isToday
                      ? 'bg-purple-600 text-white shadow-sm'
                      : cell.isCurrentMonth
                      ? 'text-slate-700 dark:text-slate-300'
                      : 'text-slate-500'
                  }`}
                >
                  {cell.dayNum}
                </span>
                {dayInterviews.length > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300">
                    {dayInterviews.length}
                  </span>
                )}
              </div>

              {/* Renders Interview Badges */}
              <div className="space-y-1 mt-1">
                {dayInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    onClick={() => onSelectInterview(interview)}
                    className="p-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-200 text-[10px] font-bold truncate cursor-pointer transition-colors flex items-center justify-between gap-1 group"
                    title={`${interview.company_name} — ${interview.position}`}
                  >
                    <span className="truncate">{interview.company_name}</span>
                    <span className="text-[9px] text-indigo-300 shrink-0">{interview.time || '14:00'}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
