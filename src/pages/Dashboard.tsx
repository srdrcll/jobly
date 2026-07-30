import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  PartyPopper, 
  TrendingUp, 
  Calendar, 
  Plus, 
  Sparkles,
  ArrowUpRight,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatisticCard } from '@/components/common/StatisticCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { CardSkeleton, TableRowSkeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/hooks/useToast';
import { ApplicationItem } from '@/types';
import { useOutletContext } from 'react-router-dom';

const MOCK_APPLICATIONS: ApplicationItem[] = [
  {
    id: '1',
    companyName: 'Trendyol Tech',
    position: 'Senior Frontend Engineer',
    location: 'İstanbul (Hybrid)',
    workType: 'Hybrid',
    salary: '95,000 TRY',
    status: 'interview',
    appliedDate: '24 Temmuz 2026',
    lastUpdated: 'Dün',
    notesCount: 4,
  },
  {
    id: '2',
    companyName: 'Getir Tech',
    position: 'Lead React Developer',
    location: 'İstanbul (Remote)',
    workType: 'Remote',
    salary: '110,000 TRY',
    status: 'offer',
    appliedDate: '12 Temmuz 2026',
    lastUpdated: 'Bugün',
    notesCount: 7,
  },
  {
    id: '3',
    companyName: 'Stripe International',
    position: 'UI/UX & Product Engineer',
    location: 'Londra (Remote)',
    workType: 'Remote',
    salary: '£85,000 / Yıl',
    status: 'case_study',
    appliedDate: '28 Temmuz 2026',
    lastUpdated: '2 saat önce',
    notesCount: 2,
  },
  {
    id: '4',
    companyName: 'Insider',
    position: 'Full Stack Web Developer',
    location: 'İstanbul (Hybrid)',
    workType: 'Hybrid',
    status: 'applied',
    appliedDate: '29 Temmuz 2026',
    lastUpdated: '3 gün önce',
    notesCount: 1,
  },
  {
    id: '5',
    companyName: 'Vercel Inc.',
    position: 'Design Systems Architect',
    location: 'San Francisco (Remote)',
    workType: 'Remote',
    status: 'saved',
    appliedDate: '30 Temmuz 2026',
    lastUpdated: 'Yeni',
    notesCount: 0,
  },
];

export const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const context = useOutletContext<{ onOpenNewModal?: () => void }>();

  const toggleLoading = () => {
    setIsLoading(true);
    toast.info('Veriler Yenileniyor', 'Kariyer verileriniz senkronize ediliyor...');
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Yenilendi', 'İstatistikleriniz güncel.');
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <PageHeader
        title="Genel Bakış"
        description="Aktif iş başvurularınız, yaklaşan mülakatlar ve performans istatistikleriniz."
        icon={LayoutDashboard}
        badge="Live"
        actionSlot={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLoading}
            >
              Yenile
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}
              onClick={() => context?.onOpenNewModal?.()}
            >
              Yeni Başvuru
            </Button>
          </div>
        }
      />

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <StatisticCard
              title="Aktif Başvurular"
              value="14"
              change="+18%"
              changeType="positive"
              timeframe="son 30 gün"
              icon={Briefcase}
              description="Süreçte olan toplam başvuru"
            />
            <StatisticCard
              title="Mülakat Sürecinde"
              value="4"
              change="+2"
              changeType="positive"
              timeframe="bu hafta"
              icon={Users}
              description="Planlanmış mülakat sayısı"
            />
            <StatisticCard
              title="Alınan Teklifler"
              value="2"
              change="+100%"
              changeType="positive"
              timeframe="son 60 gün"
              icon={PartyPopper}
              description="Değerlendirme aşamasındaki teklifler"
            />
            <StatisticCard
              title="Kabul Oranı"
              value="%28.5"
              change="+4.2%"
              changeType="positive"
              timeframe="tüm zamanlar"
              icon={TrendingUp}
              description="Geri dönüş alma yüzdesi"
            />
          </>
        )}
      </div>

      {/* Main Section: Recent Applications & Upcoming Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List Table Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-foreground">Son Başvurular</h3>
              <p className="text-xs text-slate-400 mt-0.5">En son güncellenen iş başvuru kartlarınız</p>
            </div>
            <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="w-4 h-4" aria-hidden="true" />}>
              Tümünü Gör (14)
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {MOCK_APPLICATIONS.map((app) => (
                <div
                  key={app.id}
                  className="py-3.5 flex items-center justify-between gap-4 group hover:bg-slate-50 dark:hover:bg-slate-800/40 px-3 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/20 border border-indigo-500/20 text-indigo-500 font-extrabold flex items-center justify-center text-sm shrink-0 group-hover:scale-105 transition-transform">
                      {app.companyName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-foreground truncate group-hover:text-indigo-500 transition-colors">
                        {app.position}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="font-medium text-slate-300">{app.companyName}</span>
                        <span>•</span>
                        <span>{app.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <StatusBadge status={app.status} size="sm" showDot />
                    <button
                      className="p-1.5 rounded-lg text-slate-400 hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                      title="Detaylar"
                      aria-label="Başvuru Detayları"
                    >
                      <MoreVertical className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Widget: Upcoming Interviews */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-soft dark:shadow-soft-dark">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400" aria-hidden="true">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Yaklaşan Mülakatlar</h3>
                <p className="text-[11px] text-slate-400">Bu haftaki randevularınız</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5 dark:bg-purple-950/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-purple-300">Trendyol Tech</span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-semibold text-[10px]">
                    Teknik Mülakat
                  </span>
                </div>
                <p className="text-xs font-semibold text-white">System Design & Live Coding</p>
                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Yarın, 14:30</span>
                  <span className="text-indigo-400 font-medium cursor-pointer hover:underline flex items-center gap-1">
                    Google Meet <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">Getir Tech</span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-semibold text-[10px]">
                    Kültür & Fit
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-200">Engineering Manager Görüşmesi</p>
                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Cuma, 11:00</span>
                  <span>Zoom Meeting</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/50 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-lg relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 shrink-0" aria-hidden="true">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Pusula Tavsiyesi
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Trendyol mülakatı öncesinde System Design ve Micro-Frontend mimarisi hakkında 2 not eklediniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
