import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { JoblyLogo } from '@/components/common/JoblyLogo';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Landing Navigation */}
      <header className="h-20 max-w-7xl w-full mx-auto px-6 flex items-center justify-between z-10">
        <Link to="/" className="focus:outline-none">
          <JoblyLogo size="lg" showText={true} />
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Giriş Yap
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm">
              Kayıt Ol
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 max-w-5xl mx-auto text-center space-y-8 my-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold animate-pulse">
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>Kariyer Süreçlerinizi Modernleştirin</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          İş Başvurularınızı <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
            Kusursuz Bir Düzenle
          </span> Yönetin.
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Jobly; başvurduğunuz pozisyonları, mülakat aşamalarını ve tekliflerinizi yüksek netlik ve estetikte takip etmenizi sağlayan yeni nesil SaaS platformu.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link to="/dashboard">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" aria-hidden="true" />}>
              Ücretsiz Kullanmaya Başla
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" size="lg">
              Kayıt Ol
            </Button>
          </Link>
        </div>

        {/* Dynamic Status Showcase Pills */}
        <div className="pt-12 flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          <StatusBadge status="saved" size="md" />
          <StatusBadge status="applied" size="md" />
          <StatusBadge status="interview" size="md" />
          <StatusBadge status="case_study" size="md" />
          <StatusBadge status="offer" size="md" />
          <StatusBadge status="rejected" size="md" />
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-8 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl w-full mx-auto">
        <p>© 2026 Jobly. Tüm hakları saklıdır.</p>
        <span className="text-slate-400">Yeni Nesil Kariyer & Başvuru Yönetim Platformu</span>
      </footer>
    </div>
  );
};
