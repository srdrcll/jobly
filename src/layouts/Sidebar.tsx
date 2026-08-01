import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MAIN_NAV_ITEMS, 
  SECONDARY_NAV_ITEMS
} from '@/constants/navigation';
import { 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  LogOut,
  Linkedin
} from 'lucide-react';
import { cn, getInitials } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useApplicationsListQuery } from '@/hooks/queries/useApplicationsQuery';
import { useCompaniesListQuery } from '@/hooks/queries/useCompaniesQuery';
import { useInterviewsListQuery } from '@/hooks/queries/useInterviewsQuery';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  onMobileClose,
}) => {
  const { user, logout } = useAuth();
  
  // Dynamic Real-time Counters from Cached Queries
  const { data: applications = [] } = useApplicationsListQuery();
  const { data: companies = [] } = useCompaniesListQuery();
  const { data: interviews = [] } = useInterviewsListQuery();

  const getDynamicBadge = (href: string) => {
    if (href === '/applications') return applications.length > 0 ? applications.length : undefined;
    if (href === '/companies') return companies.length > 0 ? companies.length : undefined;
    if (href === '/interviews') return interviews.length > 0 ? interviews.length : undefined;
    if (href === '/dashboard') return 'Yeni';
    return undefined;
  };

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Kullanıcı';
  const avatarInitials = getInitials(fullName) || 'K';

  return (
    <aside
      className={cn(
        'h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800/80 flex flex-col justify-between transition-all duration-300 select-none z-30 relative',
        isCollapsed ? 'w-20' : 'w-64'
      )}
      aria-label="Ana Gezinme Menüsü"
    >
      {/* Top Header & Logo */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80">
          <NavLink
            to="/dashboard"
            onClick={onMobileClose}
            className="flex items-center gap-3 overflow-hidden group"
          >
            <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform shrink-0">
              <Compass className="w-5 h-5" aria-hidden="true" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-foreground leading-none">
                  Kariyer <span className="text-blue-500">Pusulası</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide mt-0.5">
                  Career Compass v1.0
                </span>
              </div>
            )}
          </NavLink>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            title={isCollapsed ? 'Menüyü Genişlet' : 'Menüyü Daralt'}
            aria-label={isCollapsed ? 'Menüyü Genişlet' : 'Menüyü Daralt'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" aria-hidden="true" /> : <ChevronLeft className="w-4 h-4" aria-hidden="true" />}
          </button>
        </div>

        {/* Navigation Group 1: Main App */}
        <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-14rem)]">
          <div>
            {!isCollapsed && (
              <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Kariyer Yönetimi
              </h4>
            )}
            <nav className="space-y-1">
              {MAIN_NAV_ITEMS.map((item) => {
                const Icon = item.icon;

                if (item.disabled) {
                  return (
                    <div
                      key={item.href}
                      tabIndex={-1}
                      aria-disabled="true"
                      aria-label={`${item.title} (Yakında) - ${item.tooltip || 'Bu özellik yakında kullanıma açılacak.'}`}
                      title={item.tooltip || 'Bu özellik yakında kullanıma açılacak.'}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium opacity-50 text-slate-400 dark:text-slate-500 cursor-not-allowed select-none group relative bg-slate-100/30 dark:bg-slate-900/30"
                    >
                      <Icon className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-600" aria-hidden="true" />
                      {!isCollapsed && (
                        <span className="truncate flex-1 text-slate-400 dark:text-slate-500 font-medium">{item.title}</span>
                      )}
                      {!isCollapsed && (
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300/60 dark:border-slate-700/60 shrink-0 whitespace-nowrap">
                          {item.badge || 'Yakında'}
                        </span>
                      )}
                      {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                          {item.title} (Yakında)
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={onMobileClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                        isActive
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-900/60'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={cn('w-5 h-5 shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-blue-500' : 'text-slate-400')} aria-hidden="true" />
                        {!isCollapsed && (
                          <span className="truncate flex-1">{item.title}</span>
                        )}
                        {!isCollapsed && getDynamicBadge(item.href) && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/25">
                            {getDynamicBadge(item.href)}
                          </span>
                        )}
                        {isCollapsed && (
                          <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                            {item.title}
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Navigation Group 2: Account & Settings */}
          <div>
            {!isCollapsed && (
              <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Hesap & Tercihler
              </h4>
            )}
            <nav className="space-y-1">
              {SECONDARY_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={onMobileClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                        isActive
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-900/60'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={cn('w-5 h-5 shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-blue-500' : 'text-slate-400')} aria-hidden="true" />
                        {!isCollapsed && <span className="truncate">{item.title}</span>}
                        {isCollapsed && (
                          <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                            {item.title}
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom User Card */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800/80">
        {!isCollapsed && (
          <div className="mb-2">
            <a
              href="https://www.linkedin.com/in/srdrcll/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors border border-transparent hover:border-blue-500/20"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-500 shrink-0" aria-hidden="true" />
              <span className="truncate">LinkedIn / srdrcll</span>
            </a>
          </div>
        )}

        {!isCollapsed ? (
          <div className="p-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                {avatarInitials}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-foreground truncate">{fullName}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                  {user?.email || 'Aktif Oturum'}
                </span>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-lg"
              title="Çıkış Yap"
              aria-label="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <a
              href="https://www.linkedin.com/in/srdrcll/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
              title="LinkedIn / srdrcll"
            >
              <Linkedin className="w-4 h-4 text-blue-500" aria-hidden="true" />
            </a>
            <button
              onClick={() => logout()}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-md hover:opacity-90 transition-opacity"
              title="Çıkış Yap"
            >
              {avatarInitials}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
