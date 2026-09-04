import React, { useState } from 'react';
import { Menu, Bell, PanelLeftClose, PanelLeftOpen, Plus } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ThemeSwitch } from '@/components/ui/ThemeSwitch';
import { Button } from '@/components/ui/Button';
import { NotificationPopover } from '@/components/common/NotificationPopover';

interface TopNavbarProps {
  onMobileToggle: () => void;
  onDesktopToggle?: () => void;
  isSidebarCollapsed?: boolean;
  onOpenNewModal?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onMobileToggle,
  onDesktopToggle,
  isSidebarCollapsed,
  onOpenNewModal,
}) => {
  const [hasUnread, setHasUnread] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 h-16 w-full glass-panel border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4 transition-colors">
      {/* Left: Mobile/Desktop Toggle & Breadcrumb */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Mobile Hamburger */}
        <button
          onClick={onMobileToggle}
          className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Menüyü Aç"
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Desktop Sidebar Toggle Button */}
        {onDesktopToggle && (
          <button
            onClick={onDesktopToggle}
            className="hidden md:flex p-2 rounded-xl border border-slate-200 dark:border-slate-800/80 text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            title={isSidebarCollapsed ? 'Kenar Çubuğunu Aç' : 'Kenar Çubuğunu Daralt'}
            aria-label={isSidebarCollapsed ? 'Kenar Çubuğunu Aç' : 'Kenar Çubuğunu Daralt'}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" aria-hidden="true" />
            ) : (
              <PanelLeftClose className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        )}

        <Breadcrumb />
      </div>

      {/* Right: Actions, Notifications, Theme, User Button */}
      <div className="flex items-center gap-2.5">
        {/* Quick New Action */}
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}
          onClick={onOpenNewModal}
          className="hidden sm:inline-flex"
        >
          Yeni Başvuru
        </Button>

        {/* Notifications Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationOpen((prev) => !prev)}
            className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-foreground transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            aria-label="Bildirimler"
            title="Bildirimler"
          >
            <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" aria-hidden="true" />
            {hasUnread && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-background animate-pulse" />
            )}
          </button>

          {/* Notification Popover Dropdown */}
          <NotificationPopover
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
            onHasUnreadChange={setHasUnread}
          />
        </div>

        {/* Theme Switcher */}
        <ThemeSwitch />
      </div>
    </header>
  );
};
