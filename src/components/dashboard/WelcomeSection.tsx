import React from 'react';
import { Calendar as CalendarIcon, Sparkles, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

const getGreeting = (): { text: string; emoji: string } => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return { text: 'Günaydın', emoji: '☀️' };
  } else if (hour >= 12 && hour < 18) {
    return { text: 'İyi Günler', emoji: '🌤️' };
  } else if (hour >= 18 && hour < 23) {
    return { text: 'İyi Akşamlar', emoji: '🌙' };
  } else {
    return { text: 'İyi Geceler', emoji: '✨' };
  }
};

const getFormattedDate = (): string => {
  return new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const WelcomeSection: React.FC<{ onOpenNewModal?: () => void }> = ({ onOpenNewModal }) => {
  const { user } = useAuth();
  const greeting = getGreeting();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Kariyer Yolcusu';

  return (
    <div className="p-6 sm:p-8 rounded-3xl spatial-card relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 specular-border">
      {/* Background Aurora Radial Glow */}
      <div className="ambient-glow-cyan -top-24 -left-24 pointer-events-none" />

      <div className="space-y-2 relative z-10">
        <div className="flex items-center gap-2.5 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 font-bold border border-blue-500/20 flex items-center gap-1.5">
            <span>{greeting.emoji}</span>
            <span>{greeting.text}</span>
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 font-semibold">
            <CalendarIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>{getFormattedDate()}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">
          Hoş Geldin, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400">{userName}</span> 👋
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
          Kariyer hedeflerinize ve iş başvurularınıza dair tüm canlı metrikler, mülakat takipleri ve yapay zeka analizleri elinizin altında.
        </p>
      </div>

      <div className="relative z-10 shrink-0">
        <Button
          variant="primary"
          size="md"
          onClick={onOpenNewModal}
          leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold shadow-lg shadow-blue-500/25 rounded-2xl px-5 py-3"
        >
          Hızlı Başvuru Ekle
        </Button>
      </div>
    </div>
  );
};
