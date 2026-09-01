import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

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

export const WelcomeSection: React.FC<{ onOpenNewModal?: () => void }> = () => {
  const { user } = useAuth();
  const greeting = getGreeting();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Kariyer Yolcusu';

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800/60">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 font-semibold">
            <span>{greeting.emoji}</span>
            <span>{greeting.text}</span>
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
            <CalendarIcon className="w-3.5 h-3.5 mr-1" />
            <span>{getFormattedDate()}</span>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Hoş Geldin, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">{userName}</span> 👋
        </h1>
      </div>
    </div>
  );
};
