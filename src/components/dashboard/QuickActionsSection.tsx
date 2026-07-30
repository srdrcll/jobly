import React from 'react';
import { Plus, Filter, Download, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';

interface QuickActionsSectionProps {
  onOpenNewModal?: () => void;
}

export const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({ onOpenNewModal }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleExportData = () => {
    toast.info('Dışa Aktarma Hazırlanıyor', 'Veri dışa aktarma özelliği Sprint 5.6 kapsamında sunulacaktır.');
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-soft dark:shadow-soft-dark space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Hızlı Eylemler</h3>
            <p className="text-xs text-slate-400">Sık kullanılan iş akışı kısayolları</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
          4 Eylem
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Action 1: Add Application */}
        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => onOpenNewModal ? onOpenNewModal() : navigate('/applications')}
          className="w-full justify-center"
        >
          Yeni Başvuru Ekle
        </Button>

        {/* Action 2: Filter Applications */}
        <Button
          variant="outline"
          size="md"
          leftIcon={<Filter className="w-4 h-4" />}
          onClick={() => navigate('/applications')}
          className="w-full justify-center"
        >
          Başvuruları Filtrele
        </Button>

        {/* Action 3: Export Data */}
        <Button
          variant="outline"
          size="md"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExportData}
          className="w-full justify-center"
        >
          Verileri Dışa Aktar
        </Button>

        {/* Action 4: Settings */}
        <Button
          variant="outline"
          size="md"
          leftIcon={<Settings className="w-4 h-4" />}
          onClick={() => navigate('/settings')}
          className="w-full justify-center"
        >
          Sistem Ayarları
        </Button>
      </div>
    </div>
  );
};
