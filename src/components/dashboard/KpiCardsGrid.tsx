import React from 'react';
import { 
  Briefcase, 
  Clock, 
  Users, 
  PartyPopper, 
  XCircle, 
  TrendingUp, 
  AlertCircle, 
  RefreshCw,
  Plus
} from 'lucide-react';
import { KpiCard } from './KpiCard';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { useApplicationsListQuery } from '@/hooks/queries/useApplicationsQuery';
import { DbApplication } from '@/types';
import { Button } from '@/components/ui/Button';

export interface KpiMetrics {
  total: number;
  active: number;
  interviews: number;
  offers: number;
  rejections: number;
  successRate: number;
}

export function calculateKpiMetrics(applications: DbApplication[] = []): KpiMetrics {
  if (!applications || applications.length === 0) {
    return {
      total: 0,
      active: 0,
      interviews: 0,
      offers: 0,
      rejections: 0,
      successRate: 0,
    };
  }

  const total = applications.length;

  // Active: Not rejected and not saved (ongoing recruitment pipeline)
  const active = applications.filter(a => a.status !== 'rejected' && a.status !== 'saved').length;

  // Interviews: interview or case_study or contacted
  const interviews = applications.filter(a => a.status === 'interview' || a.status === 'case_study' || a.status === 'contacted').length;

  // Offers
  const offers = applications.filter(a => a.status === 'offer').length;

  // Rejections
  const rejections = applications.filter(a => a.status === 'rejected').length;

  // Success Rate (%): Percentage of applications reaching interview or offer
  const positiveOutcomes = offers + interviews;
  const successRate = total > 0 ? Number(((positiveOutcomes / total) * 100).toFixed(1)) : 0;

  return {
    total,
    active,
    interviews,
    offers,
    rejections,
    successRate,
  };
}

interface KpiCardsGridProps {
  onOpenNewModal?: () => void;
}

export const KpiCardsGrid: React.FC<KpiCardsGridProps> = ({ onOpenNewModal }) => {
  const { data: applications = [], isLoading, isError, error, refetch } = useApplicationsListQuery();

  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  // 2. Query Error State
  if (isError) {
    return (
      <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-rose-200">İstatistikler Yüklenemedi</p>
            <p className="text-rose-300/80">{error?.message || 'Veritabanı bağlantısı sırasında bir sorun oluştu.'}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="border-rose-500/30 text-rose-300 hover:bg-rose-500/20 shrink-0"
        >
          Tekrar Dene
        </Button>
      </div>
    );
  }

  // 3. Compute Metrics
  const metrics = calculateKpiMetrics(applications);
  const isEmpty = applications.length === 0;

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Empty State Banner (If no applications exist yet) */}
      {isEmpty && (
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <p className="font-bold text-indigo-300">Henüz Kayıtlı Başvurunuz Bulunmuyor</p>
            <p className="text-slate-400">
              İlk iş başvurunuzu ekleyerek başarı oranınızı ve istatistiklerinizi canlı takip etmeye başlayın.
            </p>
          </div>
          {onOpenNewModal && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={onOpenNewModal}
              className="shrink-0"
            >
              İlk Başvuruyu Ekle
            </Button>
          )}
        </div>
      )}

      {/* Responsive 6 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* KPI 1: Total Applications */}
        <KpiCard
          title="Toplam Başvuru"
          value={metrics.total}
          change={metrics.total > 0 ? `+${metrics.total}` : '0 kayıt'}
          changeType={metrics.total > 0 ? 'positive' : 'neutral'}
          helperText="Tüm zamanların kayıtlı başvuruları"
          icon={Briefcase}
          iconBgClass="bg-indigo-500/10 text-indigo-500 border border-indigo-500/20"
        />

        {/* KPI 2: Active Applications */}
        <KpiCard
          title="Aktif Başvurular"
          value={metrics.active}
          change={metrics.active > 0 ? `${metrics.active} süreçte` : '0 aktif'}
          changeType={metrics.active > 0 ? 'positive' : 'neutral'}
          helperText="Devam eden başvuru süreçleriniz"
          icon={Clock}
          iconBgClass="bg-purple-500/10 text-purple-400 border border-purple-500/20"
        />

        {/* KPI 3: Interviews */}
        <KpiCard
          title="Mülakat Sürecinde"
          value={metrics.interviews}
          change={metrics.interviews > 0 ? `+${metrics.interviews}` : '0 mülakat'}
          changeType={metrics.interviews > 0 ? 'positive' : 'neutral'}
          helperText="Teknik & İK randevu ve vakaları"
          icon={Users}
          iconBgClass="bg-amber-500/10 text-amber-500 border border-amber-500/20"
        />

        {/* KPI 4: Offers */}
        <KpiCard
          title="Alınan Teklifler"
          value={metrics.offers}
          change={metrics.offers > 0 ? `+${metrics.offers} teklif` : '0 teklif'}
          changeType={metrics.offers > 0 ? 'positive' : 'neutral'}
          helperText="Değerlendirilen iş teklifleri"
          icon={PartyPopper}
          iconBgClass="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        />

        {/* KPI 5: Rejections */}
        <KpiCard
          title="Reddedilenler"
          value={metrics.rejections}
          change={metrics.rejections > 0 ? `${metrics.rejections} olumsuz` : '0 olumsuz'}
          changeType={metrics.rejections > 0 ? 'negative' : 'neutral'}
          helperText="Sonuçlanan olumsuz dönüşler"
          icon={XCircle}
          iconBgClass="bg-rose-500/10 text-rose-400 border border-rose-500/20"
        />

        {/* KPI 6: Success Rate (%) */}
        <KpiCard
          title="Başarı Oranı"
          value={`%${metrics.successRate}`}
          change={metrics.successRate > 0 ? `%${metrics.successRate}` : '%0'}
          changeType={metrics.successRate > 0 ? 'positive' : 'neutral'}
          helperText="Mülakat & teklif dönüşüm yüzdesi"
          icon={TrendingUp}
          iconBgClass="bg-teal-500/10 text-teal-400 border border-teal-500/20"
        />
      </div>
    </div>
  );
};
