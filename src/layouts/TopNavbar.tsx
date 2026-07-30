import React, { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SearchInput } from '@/components/ui/SearchInput';
import { ThemeSwitch } from '@/components/ui/ThemeSwitch';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { Plus } from 'lucide-react';

interface TopNavbarProps {
  onMobileToggle: () => void;
  onOpenNewModal?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onMobileToggle,
  onOpenNewModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnread, setHasUnread] = useState(true);
  const { toast } = useToast();

  const handleNotificationClick = () => {
    setHasUnread(false);
    toast.info('Bildirim Bildirimi', 'Şu an okunmamış 3 yeni mülakat güncellemeniz var.');
  };

  return (
    <header className="sticky top-0 z-20 h-16 w-full glass-panel border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4 transition-colors">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileToggle}
          className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Menüyü Aç"
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
        </button>

        <Breadcrumb />
      </div>

      {/* Middle: Search Bar (Responsive) */}
      <div className="flex-1 max-w-md hidden md:block">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
          placeholder="Başvuru, şirket veya pozisyon ara..."
        />
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

        {/* Notifications Button */}
        <button
          onClick={handleNotificationClick}
          className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-foreground transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          aria-label="Bildirimler"
          title="Bildirimler"
        >
          <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" aria-hidden="true" />
          {hasUnread && (
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-background animate-pulse" />
          )}
        </button>

        {/* Theme Switcher */}
        <ThemeSwitch />
      </div>
    </header>
  );
};
