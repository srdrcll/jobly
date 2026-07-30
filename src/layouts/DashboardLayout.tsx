import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { useSidebar } from '@/hooks/useSidebar';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/hooks/useToast';
import { Briefcase, Building2, MapPin, DollarSign } from 'lucide-react';
import { ApplicationStatus } from '@/types';

export const DashboardLayout: React.FC = () => {
  const { isCollapsed, toggleSidebar, isMobileOpen, toggleMobile, closeMobile } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>('applied');
  const { toast } = useToast();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    toast.success('Başvuru Kaydedildi', 'Yeni iş başvurusu kariyer listenize başarıyla eklendi.');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
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
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
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
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <TopNavbar
          onMobileToggle={toggleMobile}
          onOpenNewModal={() => setIsModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
          <Outlet context={{ onOpenNewModal: () => setIsModalOpen(true) }} />
        </main>
      </div>

      {/* Interactive New Application Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Yeni İş Başvurusu Ekle"
        description="Takip etmek istediğiniz yeni bir iş başvurusunu kaydedin."
        icon={<Briefcase className="w-5 h-5 text-indigo-400" aria-hidden="true" />}
        maxWidth="lg"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              İptal
            </Button>
            <Button variant="primary" size="sm" type="submit" form="new-app-form">
              Başvuruyu Kaydet
            </Button>
          </>
        }
      >
        <form id="new-app-form" onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Şirket Adı"
              required
              placeholder="örn. Trendyol, Getir, Google"
              leftIcon={<Building2 className="w-4 h-4" aria-hidden="true" />}
            />
            <Input
              label="Pozisyon Ünvanı"
              required
              placeholder="örn. Senior Frontend Engineer"
              leftIcon={<Briefcase className="w-4 h-4" aria-hidden="true" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Konum / Çalışma Tipi"
              placeholder="İstanbul (Remote)"
              leftIcon={<MapPin className="w-4 h-4" aria-hidden="true" />}
            />
            <Input
              label="Maaş Beklentisi / Teklif (Opsiyonel)"
              placeholder="85,000 TRY / Ay"
              leftIcon={<DollarSign className="w-4 h-4" aria-hidden="true" />}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Başvuru Durumu Seçin
            </label>
            <div className="flex flex-wrap gap-2">
              {(['saved', 'applied', 'interview', 'case_study', 'offer', 'rejected'] as ApplicationStatus[]).map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedStatus(st)}
                    className={`transition-all ${
                      selectedStatus === st ? 'ring-2 ring-indigo-500 rounded-xl scale-105' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <StatusBadge status={st} size="md" />
                  </button>
                )
              )}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
