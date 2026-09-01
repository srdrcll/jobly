import React from 'react';
import { Calendar, ArrowUpRight, Sparkles } from 'lucide-react';
import { InterviewItemData } from '@/utils/interviewUtils';
import { InterviewCard } from './InterviewCard';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

interface UpcomingInterviewsProps {
  interviews: InterviewItemData[];
}

export const UpcomingInterviews: React.FC<UpcomingInterviewsProps> = ({ interviews }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/80 dark:bg-[#0D1424]/75 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/70 rounded-3xl p-6 shadow-soft dark:shadow-soft-dark space-y-4 h-full flex flex-col justify-between specular-border hover:border-slate-300 dark:hover:border-slate-700/80 transition-all">
      {/* Header with View All Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Yaklaşan Mülakatlar</h3>
            <p className="text-xs text-slate-400">Takvime ekli teknik ve İK randevularınız</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          rightIcon={<ArrowUpRight className="w-4 h-4" />}
          onClick={() => navigate('/applications')}
        >
          Tümünü Gör ({interviews.length})
        </Button>
      </div>

      {/* Interviews List or Friendly Empty State */}
      {!interviews || interviews.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-center space-y-3 my-auto">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mx-auto flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-300">Planlanmış Mülakat Bulunmuyor</p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Başvurularınız mülakat aşamasına geçtiğinde randevu detayları burada otomatik listelenecektir.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/applications')}
            className="text-xs"
          >
            Başvuruları İncele
          </Button>
        </div>
      ) : (
        <div className="space-y-3 overflow-y-auto max-h-[340px] pr-1">
          {interviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
      )}
    </div>
  );
};
