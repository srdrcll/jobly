import { DbApplication } from '@/types';

export interface DynamicInsight {
  id: string;
  type: 'success' | 'info' | 'warning' | 'tip';
  title: string;
  description: string;
  iconName: 'Sparkles' | 'TrendingUp' | 'AlertTriangle' | 'CheckCircle2' | 'Target' | 'Award' | 'Clock';
  badge: string;
}

/**
 * Dynamically generates up to 3 actionable career insights based on user application data.
 */
export function generateCareerInsights(applications: DbApplication[] = []): DynamicInsight[] {
  // Case 1: Empty application list
  if (!applications || applications.length === 0) {
    return [
      {
        id: 'tip-first-app',
        type: 'tip',
        title: 'İlk Başvurunuzu Ekleyin',
        description: 'İş arama sürecinizi düzene sokmak için ilk başvurunuzu sisteme ekleyin. İstatistik ve mülakat takibiniz anında başlayacaktır.',
        iconName: 'Sparkles',
        badge: 'Tavsiye',
      },
      {
        id: 'tip-target-companies',
        type: 'info',
        title: 'Hedef Şirket Listesi',
        description: 'İlgilendiğiniz teknoloji şirketlerini ve pozisyonları kaydederek düzenli takip oluşturun.',
        iconName: 'Target',
        badge: 'İpucu',
      },
    ];
  }

  const insights: DynamicInsight[] = [];
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // 1. Check recent applications in last 7 days
  const recentAppsCount = applications.filter((app) => {
    const d = new Date(app.applied_date || app.created_at);
    return !isNaN(d.getTime()) && d >= sevenDaysAgo;
  }).length;

  if (recentAppsCount > 0) {
    insights.push({
      id: 'recent-activity-high',
      type: 'success',
      title: 'Haftalık Yüksek Momentum',
      description: `Son 7 gün içinde ${recentAppsCount} yeni iş başvurusu kaydettiniz. Süreciniz yüksek hararetle devam ediyor!`,
      iconName: 'TrendingUp',
      badge: 'Performans',
    });
  } else {
    insights.push({
      id: 'recent-activity-low',
      type: 'warning',
      title: 'Haftalık Başvuru Hatırlatması',
      description: 'Son 7 gün içinde henüz yeni bir başvuru kaydetmediniz. Hedef pozisyonlarınızı gözden geçirebilirsiniz.',
      iconName: 'Clock',
      badge: 'Hatırlatma',
    });
  }

  // 2. Offers Received
  const offersCount = applications.filter((app) => app.status === 'offer').length;

  if (offersCount > 0) {
    insights.push({
      id: 'offers-received',
      type: 'success',
      title: 'İş Teklifi Başarısı',
      description: `Tebrikler! Sisteminizde ${offersCount} adet aktif iş teklifi bulunuyor. Şartları ve maaş paketlerini karşılaştırabilirsiniz.`,
      iconName: 'Award',
      badge: 'Kutlama',
    });
  }

  // 3. Upcoming / Ongoing Interviews
  const interviewsCount = applications.filter(
    (app) => app.status === 'interview' || app.status === 'case_study'
  ).length;

  if (interviewsCount > 0) {
    insights.push({
      id: 'interviews-active',
      type: 'success',
      title: 'Aktif Mülakat Takvimi',
      description: `Şu anda sürecinde olduğunuz ${interviewsCount} adet aktif mülakat veya vaka çalışmanız var. Hazırlık notlarınızı gözden geçirin.`,
      iconName: 'CheckCircle2',
      badge: 'Mülakat',
    });
  }

  // 4. Highest Focus Role
  const positionCounts: Record<string, number> = {};
  applications.forEach((app) => {
    if (app.position) {
      positionCounts[app.position] = (positionCounts[app.position] || 0) + 1;
    }
  });

  const sortedPositions = Object.entries(positionCounts).sort((a, b) => b[1] - a[1]);
  if (sortedPositions.length > 0 && sortedPositions[0][1] >= 2 && insights.length < 3) {
    const [topPosition, topCount] = sortedPositions[0];
    insights.push({
      id: 'top-role',
      type: 'info',
      title: 'En Yoğun Başvurulan Rol',
      description: `'${topPosition}' pozisyonunda ${topCount} başvurunuz var. Bu alandaki cv versiyonlarınızı optimize edebilirsiniz.`,
      iconName: 'Target',
      badge: 'Odak Alanı',
    });
  }

  // Max 3 insights
  return insights.slice(0, 3);
}
