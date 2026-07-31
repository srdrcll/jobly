import React from 'react';
import { Sparkles, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const greeting = getGreeting();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Kariyer Yolcusu';

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/80 border border-blue-500/20 p-6 sm:p-8 shadow-xl text-white">
      {/* Background Ambient Glow Effects */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-semibold">
              <span>{greeting.emoji}</span>
              <span>{greeting.text}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 font-medium">
              <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>{getFormattedDate()}</span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hoş Geldin, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">{userName}</span> 👋
          </h1>

          {/* Motivational Subtitle */}
          <p className="text-sm text-slate-300 leading-relaxed">
            Bugün kariyer hedeflerinize bir adım daha yaklaşmak için harika bir gün. Başvurularınızı düzenleyin, mülakat hazırlıklarınızı takip edin ve performansınızı analiz edin.
          </p>
        </div>

        {/* Quick Action Button in Banner */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            leftIcon={<Sparkles className="w-4 h-4 text-amber-300" />}
            onClick={() => onOpenNewModal ? onOpenNewModal() : navigate('/applications')}
            className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25"
          >
            Yeni Başvuru Ekle
          </Button>
          <Button
            variant="outline"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/applications')}
            className="border-blue-400/30 text-blue-100 hover:bg-blue-500/20 hover:text-white hover:border-blue-400/50"
          >
            Tüm Liste
          </Button>
        </div>
      </div>
    </div>
  );
};
