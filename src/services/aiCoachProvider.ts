import { 
  IAiCoachProvider, 
  CoachSession, 
  SeniorityLevel, 
  AnswerEvaluation 
} from '@/types/aiCoach';

export class MockAiCoachProvider implements IAiCoachProvider {
  async generateCoachSession(
    companyName: string,
    position: string,
    interviewType: string,
    seniority: SeniorityLevel
  ): Promise<CoachSession> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const sessionId = `coach-sess-${Date.now()}`;

    return {
      id: sessionId,
      companyName: companyName || 'Teknoloji Şirketi',
      position: position || 'Senior Developer',
      interviewType: interviewType || 'Online',
      seniority: seniority || 'Senior',
      createdAt: new Date().toISOString(),
      questions: [
        {
          id: `q-1-${sessionId}`,
          category: 'Technical',
          questionText: `${position} olarak React 19 Server Components ve state re-render optimizasyonunu projelerinizde nasıl kurguluyorsunuz?`,
          sampleAnswer: 'React Server Components ile istemci paket boyutunu küçültür, TanStack Query önbellek stratejisi ile gereksiz network re-fetch akışlarını engellerim.',
        },
        {
          id: `q-2-${sessionId}`,
          category: 'Behavioral',
          questionText: 'Takım arkadaşınızla mimari bir seçimde (Zustand vs Redux) anlaşmazlığa düştüğünüzde süreci nasıl yönettiniz? (STAR Yöntemi)',
          sampleAnswer: 'Her iki kütüphanenin performans ve bundle size analizlerini PoC hazırlayarak şeffaf biçimde ekiple paylaştım ve ortak karar aldık.',
        },
        {
          id: `q-3-${sessionId}`,
          category: 'Company-Specific',
          questionText: `${companyName} ölçeğinde ve yüksek kullanıcılı SaaS mimarisinde karşılaşılabilecek performans darboğazlarını nasıl engellersiniz?`,
          sampleAnswer: 'CDN önbellekleme, lazy-loading, code splitting ve Supabase RLS indeks optimizasyonu uygularım.',
        },
        {
          id: `q-4-${sessionId}`,
          category: 'Role-Specific',
          questionText: `${seniority} seviyesinde bir mühendis olarak junior geliştiricilerin kod inceleme (Code Review) süreçlerini nasıl yönlendiriyorsunuz?`,
          sampleAnswer: 'Yapıcı geri bildirimlerle linter kurallarına uymalarını sağlar, sadece hatayı değil doğru çözüm mantığını açıklarım.',
        },
        {
          id: `q-5-${sessionId}`,
          category: 'HR',
          questionText: 'Kariyerinizdeki en büyük teknik zorluk neydi ve bu süreçten ne öğrendiniz?',
          sampleAnswer: 'Eski monolitik frontend kod tabanını micro-frontend mimarisine canlıda sıfır kesinti ile taşımaktı.',
        },
        {
          id: `q-6-${sessionId}`,
          category: 'Follow-up',
          questionText: 'Bu rol için 6 aylık ilk döneminizde ekibe katmak istediğiniz en somut yenilik ne olurdu?',
          sampleAnswer: 'Design System bileşen kütüphanesini ve otomatik CI/CD test kapsayıcılığını %85 üzerine çıkarmak.',
        },
      ],
    };
  }

  async evaluateUserAnswer(questionText: string, userAnswerText: string): Promise<AnswerEvaluation> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const len = userAnswerText.length;
    const hasMetrics = /%|\$|artış|düştü|yüzde/i.test(userAnswerText);
    const score = len > 100 ? (hasMetrics ? 95 : 85) : 70;

    return {
      score,
      strengths: [
        'Soruya doğrudan ve kendinden emin yanıt verildi.',
        'Teknik terimler doğru bağlamda kullanıldı.',
      ],
      weaknesses: [
        len < 80 ? 'Cevap biraz kısa kaldı, STAR yöntemiyle detaylandırılabilir.' : 'Biraz daha somut metrik eklenebilir.',
      ],
      suggestedImprovements: [
        'Cevabınıza "%30 performans artışı elde ettik" gibi somut iş sonucu ekleyin.',
        'Mülakatçıya sürecin sonucunda ne öğrenildiğini vurgulayın.',
      ],
      exampleBetterAnswer: `Durum (Situation): Projede yüksek yükleme süresi sorunu vardı. Eylem (Action): TanStack Query önbellek kuralları ve lazy loading uyguladım. Sonuç (Result): Sayfa hızımız %40 arttı.`,
    };
  }
}

export const aiCoachProvider = new MockAiCoachProvider();
