import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MAIN_NAV_ITEMS, 
  SECONDARY_NAV_ITEMS, 
  AUTH_NAV_ITEMS 
} from '@/constants/navigation';
import { 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  ShieldCheck 
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform shrink-0">
              <Compass className="w-5 h-5" aria-hidden="true" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-foreground leading-none">
                  Kariyer <span className="text-indigo-500">Pusulası</span>
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
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={onMobileClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                        isActive
                          ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-900/60'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={cn('w-5 h-5 shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-indigo-500' : 'text-slate-400')} aria-hidden="true" />
                        {!isCollapsed && (
                          <span className="truncate flex-1">{item.title}</span>
                        )}
                        {!isCollapsed && item.badge && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/15 text-indigo-500 border border-indigo-500/20">
                            {item.badge}
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
                          ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-900/60'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={cn('w-5 h-5 shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-indigo-500' : 'text-slate-400')} aria-hidden="true" />
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

          {/* Navigation Group 3: Preview Routes */}
          <div>
            {!isCollapsed && (
              <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Hızlı Önizleme
              </h4>
            )}
            <nav className="space-y-1">
              {AUTH_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={onMobileClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 text-slate-500 dark:text-slate-400 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-900/60',
                        isActive && 'bg-slate-100 dark:bg-slate-900 text-foreground font-semibold'
                      )
                    }
                  >
                    <Icon className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                    {!isCollapsed && <span className="truncate">{item.title}</span>}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom User Card */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800/80">
        {!isCollapsed ? (
          <div className="p-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                SÇ
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-foreground truncate">Serdar Çil</span>
                <span className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500 inline" aria-hidden="true" /> Pro Plan
                </span>
              </div>
            </div>
            <NavLink
              to="/login"
              className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-lg"
              title="Çıkış Yap"
              aria-label="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
            </NavLink>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
              SÇ
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
