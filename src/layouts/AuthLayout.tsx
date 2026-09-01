import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ThemeSwitch } from '@/components/ui/ThemeSwitch';
import { JoblyLogo } from '@/components/common/JoblyLogo';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <header className="flex items-center justify-between max-w-6xl w-full mx-auto z-10">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-foreground transition-colors p-2 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Paneli İncele</span>
        </Link>

        <Link to="/landing" className="focus:outline-none">
          <JoblyLogo size="md" showText={true} />
        </Link>

        <ThemeSwitch />
      </header>

      {/* Auth Form Center Container */}
      <main className="w-full max-w-md mx-auto my-auto z-10 py-8">
        <Outlet />
      </main>

      {/* Bottom Footer */}
      <footer className="text-center text-xs text-slate-500 dark:text-slate-500 z-10 py-2">
        <p>© 2026 Jobly. Kariyerinizi hedefleriniz doğrultusunda yönetin. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
};
