import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { useSidebar } from '@/hooks/useSidebar';
import { CreateApplicationModal } from '@/components/applications/CreateApplicationModal';

export const DashboardLayout: React.FC = () => {
  const { isCollapsed, toggleSidebar, isMobileOpen, toggleMobile, closeMobile } = useSidebar();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden relative">
      {/* Ambient Aurora Light Spots in Background */}
      <div className="ambient-glow-blue -top-28 -left-20 hidden dark:block opacity-75 pointer-events-none" aria-hidden="true" />
      <div className="ambient-glow-purple top-1/3 -right-24 hidden dark:block opacity-65 pointer-events-none" aria-hidden="true" />
      <div className="ambient-glow-cyan bottom-10 left-1/3 hidden dark:block opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0 z-20">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
            onClick={closeMobile}
            aria-hidden="true"
          />
          <div className="relative w-64 max-w-xs bg-slate-950 z-10 animate-slideUp">
            <Sidebar
              isCollapsed={false}
              onToggleCollapse={closeMobile}
              onMobileClose={closeMobile}
            />
          </div>
        </div>
      )}

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto z-10">
        <TopNavbar
          onMobileToggle={toggleMobile}
          onDesktopToggle={toggleSidebar}
          isSidebarCollapsed={isCollapsed}
          onOpenNewModal={() => setIsCreateModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
          <Outlet context={{ onOpenNewModal: () => setIsCreateModalOpen(true) }} />
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200/80 dark:border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl w-full mx-auto">
          <p>© 2026 Jobly. Tüm hakları saklıdır.</p>
          <span className="text-[11px] text-slate-400">Modern Kariyer ve Başvuru Takip Platformu</span>
        </footer>
      </div>

      {/* Fully Functional Real Create Application Modal with React Query & Database Persistence */}
      <CreateApplicationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
