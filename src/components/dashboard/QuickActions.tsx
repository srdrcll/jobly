import React from 'react';
import { Plus, Briefcase, BarChart3, User, Zap } from 'lucide-react';
import { ActionCard } from './ActionCard';
import { useNavigate } from 'react-router-dom';

interface QuickActionsProps {
  onOpenNewModal?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onOpenNewModal }) => {
  const navigate = useNavigate();

  const handleAddApplication = () => {
    if (onOpenNewModal) {
      onOpenNewModal();
    } else {
      navigate('/applications');
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Hızlı İş Akışları</h3>
            <p className="text-xs text-slate-400">Sık kullanılan kısayollar ve modül yönlendirmeleri</p>
          </div>
        </div>
        <span className="text-xs text-slate-400 font-medium">Hızlı Erişim</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Action 1: Add Application */}
        <ActionCard
          title="Yeni Başvuru Ekle"
          description="Sisteme yeni bir iş başvurusu, maaş ve pozisyon detayı ekleyin."
          ctaText="Başvuru Oluştur"
          icon={Plus}
          iconBgClass="bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
          onClick={handleAddApplication}
          primary
        />

        {/* Action 2: View Applications */}
        <ActionCard
          title="Başvuruları İncele"
          description="Tüm aktif ve geçmiş başvurularınızı tablo veya kart görünümünde filtreleyin."
          ctaText="Listeyi Gör"
          icon={Briefcase}
          iconBgClass="bg-purple-500/10 text-purple-400 border-purple-500/20"
          onClick={() => navigate('/applications')}
        />

        {/* Action 3: View Analytics */}
        <ActionCard
          title="Analizleri İncele"
          description="Haftalık performansınızı, başvuru huninizi ve dönüşüm istatistiklerinizi analiz edin."
          ctaText="Grafikleri Gör"
          icon={BarChart3}
          iconBgClass="bg-violet-500/10 text-violet-400 border-violet-500/20"
          onClick={() => {
            const el = document.getElementById('analytics-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate('/dashboard');
            }
          }}
        />

        {/* Action 4: Manage Profile */}
        <ActionCard
          title="Profil Yönetimi"
          description="Kişisel bilgi, cv bağlantıları ve hesap tercihlerinizi güncelleyin."
          ctaText="Profili Düzenle"
          icon={User}
          iconBgClass="bg-amber-500/10 text-amber-400 border-amber-500/20"
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  );
};
