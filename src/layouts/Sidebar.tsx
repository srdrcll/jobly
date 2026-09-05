import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MAIN_NAV_ITEMS, 
  SECONDARY_NAV_ITEMS
} from '@/constants/navigation';
import { LogOut } from 'lucide-react';
import { cn, getInitials } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useApplicationsListQuery } from '@/hooks/queries/useApplicationsQuery';
import { useCompaniesListQuery } from '@/hooks/queries/useCompaniesQuery';
import { useInterviewsListQuery } from '@/hooks/queries/useInterviewsQuery';
import { JoblyLogo } from '@/components/common/JoblyLogo';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse?: () => void;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
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
    return undefined;
  };

  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Kullanıcı';
  const avatarInitials = getInitials(fullName) || 'K';

  return (
    <aside
      className={cn(
        'h-screen bg-white/90 dark:bg-[#111A2E]/95 backdrop-blur-2xl border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between transition-all duration-300 select-none z-30 relative overflow-x-hidden',
        isCollapsed ? 'w-20' : 'w-64'
      )}
      aria-label="Ana Gezinme Menüsü"
    >
      {/* Top Header & Logo */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className={cn(
          'h-16 flex items-center border-b border-slate-200/70 dark:border-slate-800/60 shrink-0 transition-all',
          isCollapsed ? 'justify-center px-2' : 'justify-between px-4'
        )}>
          <NavLink
            to="/dashboard"
            onClick={onMobileClose}
            className={cn(
              'flex items-center overflow-hidden focus:outline-none',
              isCollapsed && 'justify-center w-full'
            )}
            title={isCollapsed ? 'Jobly' : undefined}
          >
            <JoblyLogo
              size="md"
              showText={!isCollapsed}
              subtitle="Career & Application OS"
            />
          </NavLink>
        </div>

        {/* Navigation Groups (Scrollable) */}
        <div className="p-3 space-y-5 overflow-y-auto overflow-x-hidden flex-1 no-scrollbar">
          {/* Navigation Group 1: Main App */}
          <div>
            {!isCollapsed && (
              <h4 className="px-3 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Kariyer Yönetimi
              </h4>
            )}
            <nav className="space-y-1.5">
              {MAIN_NAV_ITEMS.filter(item => !item.disabled).map((item) => {
                const Icon = item.icon;
                const badge = getDynamicBadge(item.href);

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={onMobileClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center rounded-2xl text-sm font-medium transition-all duration-200 group relative',
                        isCollapsed 
                          ? 'w-12 h-12 mx-auto justify-center' 
                          : 'px-3.5 py-2.5 gap-3',
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/25'
                          : 'text-slate-600 dark:text-slate-400 hover:text-foreground hover:bg-slate-100/80 dark:hover:bg-slate-900/60'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={cn('w-5 h-5 shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-white' : 'text-slate-400')} aria-hidden="true" />
                        {!isCollapsed && (
                          <span className="truncate flex-1">{item.title}</span>
                        )}
                        {!isCollapsed && badge !== undefined && (
                          <span className={cn(
                            'px-2 py-0.5 text-[10px] font-bold rounded-full border',
                            isActive 
                              ? 'bg-white/20 text-white border-white/30' 
                              : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                          )}>
                            {badge}
                          </span>
                        )}
                        {/* Collapsed Tooltip */}
                        {isCollapsed && (
                          <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900/95 text-white text-xs font-semibold rounded-xl shadow-2xl border border-slate-700/80 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 flex items-center gap-2">
                            <span>{item.title}</span>
                            {badge !== undefined && (
                              <span className="px-1.5 py-0.2 rounded-full bg-blue-500 text-[10px] font-bold">
                                {badge}
                              </span>
                            )}
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
              <h4 className="px-3 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Hesap & Tercihler
              </h4>
            )}
            <nav className="space-y-1.5">
              {SECONDARY_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={onMobileClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center rounded-2xl text-sm font-medium transition-all duration-200 group relative',
                        isCollapsed 
                          ? 'w-12 h-12 mx-auto justify-center' 
                          : 'px-3.5 py-2.5 gap-3',
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/25'
                          : 'text-slate-600 dark:text-slate-400 hover:text-foreground hover:bg-slate-100/80 dark:hover:bg-slate-900/60'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={cn('w-5 h-5 shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-white' : 'text-slate-400')} aria-hidden="true" />
                        {!isCollapsed && <span className="truncate">{item.title}</span>}
                        {/* Collapsed Tooltip */}
                        {isCollapsed && (
                          <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900/95 text-white text-xs font-semibold rounded-xl shadow-2xl border border-slate-700/80 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
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

      {/* Bottom User Profile Card */}
      <div className="p-3 border-t border-slate-200/70 dark:border-slate-800/60 shrink-0">
        {!isCollapsed ? (
          <div className="p-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between shadow-soft">
            <NavLink to="/profile" className="flex items-center gap-2.5 min-w-0 flex-1 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                {avatarInitials}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-foreground truncate group-hover:text-blue-500 transition-colors">{fullName}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                  {user?.email || 'Aktif Oturum'}
                </span>
              </div>
            </NavLink>
            <button
              onClick={() => logout()}
              className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-xl hover:bg-rose-500/10 focus:outline-none"
              title="Çıkış Yap"
              aria-label="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <NavLink
              to="/profile"
              className="group relative w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:scale-105 transition-all"
            >
              {avatarInitials}
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900/95 text-white text-xs font-semibold rounded-xl shadow-2xl border border-slate-700/80 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                <p className="font-bold">{fullName}</p>
                <p className="text-[10px] text-slate-400">{user?.email}</p>
              </div>
            </NavLink>
            <button
              onClick={() => logout()}
              className="group relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors focus:outline-none"
              aria-label="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-rose-950/95 text-rose-200 text-xs font-semibold rounded-xl shadow-2xl border border-rose-800/80 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                Çıkış Yap
              </div>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
