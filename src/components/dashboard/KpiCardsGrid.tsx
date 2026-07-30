import React from 'react';
import { Briefcase, Clock, Users, PartyPopper } from 'lucide-react';
import { StatisticCard } from '@/components/common/StatisticCard';
import { CardSkeleton } from '@/components/ui/Skeleton';

export interface KpiData {
  totalApplications?: number;
  activeApplications?: number;
  interviewsCount?: number;
  offersCount?: number;
}

interface KpiCardsGridProps {
  data?: KpiData;
  isLoading?: boolean;
}

export const KpiCardsGrid: React.FC<KpiCardsGridProps> = ({ data, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const total = data?.totalApplications ?? 0;
  const active = data?.activeApplications ?? 0;
  const interviews = data?.interviewsCount ?? 0;
  const offers = data?.offersCount ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Applications */}
      <StatisticCard
        title="Toplam Başvuru"
        value={total > 0 ? total : '0'}
        change={total > 0 ? `+${total}` : '0'}
        changeType={total > 0 ? 'positive' : 'neutral'}
        timeframe="toplam kayıt"
        icon={Briefcase}
        description="Sistemdeki tüm kayıtlı başvurularınız"
      />

      {/* Card 2: Active Applications */}
      <StatisticCard
        title="Aktif Başvurular"
        value={active > 0 ? active : '0'}
        change={active > 0 ? `${active} süreçte` : '0 süreçte'}
        changeType={active > 0 ? 'positive' : 'neutral'}
        timeframe="değerlendirmede"
        icon={Clock}
        description="Devam eden başvuru süreçleriniz"
      />

      {/* Card 3: Interviews */}
      <StatisticCard
        title="Mülakat Sürecinde"
        value={interviews > 0 ? interviews : '0'}
        change={interviews > 0 ? `+${interviews}` : '0'}
        changeType={interviews > 0 ? 'positive' : 'neutral'}
        timeframe="bu ay"
        icon={Users}
        description="Planlanan teknik & İK mülakatları"
      />

      {/* Card 4: Offers */}
      <StatisticCard
        title="Alınan Teklifler"
        value={offers > 0 ? offers : '0'}
        change={offers > 0 ? `+${offers}` : '0 teklif'}
        changeType={offers > 0 ? 'positive' : 'neutral'}
        timeframe="tüm zamanlar"
        icon={PartyPopper}
        description="Kabul edilen ve değerlendirilen teklifler"
      />
    </div>
  );
};
