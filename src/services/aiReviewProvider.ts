import { IAiReviewProvider, ResumeReviewRecord, CoverLetterReviewRecord } from '@/types/aiReview';

export class MockAiReviewProvider implements IAiReviewProvider {
  async reviewResume(fileName: string, contentText: string): Promise<ResumeReviewRecord> {
    // Simulate short network latency for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    const textLength = contentText.length;
    const hasMetrics = /%|\$|\b(artırıldı|optimize edildi|yönetildi|geliştirildi)\b/i.test(contentText);
    const hasGithub = /github|linkedin|portfolio/i.test(contentText);

    const expScore = hasMetrics ? 92 : 74;
    const contactScore = hasGithub ? 95 : 80;
    const summaryScore = textLength > 100 ? 88 : 70;
    const skillsScore = 90;
    const projectsScore = 85;
    const eduScore = 88;
    const certScore = 82;

    const overallScore = Math.round(
      (expScore * 0.3 + contactScore * 0.15 + summaryScore * 0.15 + skillsScore * 0.15 + projectsScore * 0.15 + eduScore * 0.1)
    );

    return {
      id: `res-rev-${Date.now()}`,
      fileName,
      version: 1,
      overallScore,
      createdAt: new Date().toISOString(),
      fileContentText: contentText,
      sections: [
        {
          sectionName: 'Contact Information',
          score: contactScore,
          status: contactScore >= 90 ? 'excellent' : 'good',
          feedback: 'İletişim bilgileri anlaşılır ve güncel. LinkedIn ve GitHub profil bağlantıları eklenmiş.',
          strengths: ['E-posta ve telefon erişilebilir', 'Profesyonel LinkedIn profili bağlantılı'],
          improvements: ['Portfolyo kişisel web sitesi linki eklenebilir'],
        },
        {
          sectionName: 'Summary',
          score: summaryScore,
          status: summaryScore >= 85 ? 'excellent' : 'needs_improvement',
          feedback: 'Giriş özeti kariyer hedeflerinizi özetliyor ancak daha fazla sayısal metrik ekleyebilirsiniz.',
          strengths: ['Net pozisyon unvanı (Senior Frontend Dev)', 'Teknoloji odaklı özet'],
          improvements: ['Son 3 yıldaki ana teknik başarı yüzdesini özete ekleyin'],
        },
        {
          sectionName: 'Experience',
          score: expScore,
          status: expScore >= 90 ? 'excellent' : 'needs_improvement',
          feedback: 'İş deneyimleriniz kronolojik ve düzenli. Aksiyon fiilleri kullanımı başarılı.',
          strengths: ['Sorumluluklar açık yazılmış', 'React 19 ve TypeScript projeleri vurgulanmış'],
          improvements: ['%30 performans artışı veya %40 yükleme süresi düşüşü gibi rakamsal metrikleri öne çıkarın'],
        },
        {
          sectionName: 'Education',
          score: eduScore,
          status: 'good',
          feedback: 'Eğitim geçmişiniz tam ve açık.',
          strengths: ['Üniversite adı ve mezuniyet yılı net'],
          improvements: ['Varsa önemli lisans projelerini ekleyin'],
        },
        {
          sectionName: 'Skills',
          score: skillsScore,
          status: 'excellent',
          feedback: 'Teknik ve sosyal beceriler kategorize edilmiş ve ATS taramasına uygun.',
          strengths: ['Frontend kütüphaneleri tam', 'Tailwind, TanStack Query, Supabase öne çıkarılmış'],
          improvements: ['Eski teknolojileri (jQuery vb.) kaldırıp güncel araçları koruyun'],
        },
        {
          sectionName: 'Projects',
          score: projectsScore,
          status: 'good',
          feedback: 'Kişisel ve açık kaynak projeler iyi detaylandırılmış.',
          strengths: ['Kariyer Pusulası SaaS projesi mimarisi anlatılmış'],
          improvements: ['Canlı demo linki ekleyin'],
        },
        {
          sectionName: 'Certifications',
          score: certScore,
          status: 'good',
          feedback: 'Sertifikalar güncel ve doğrulanabilir.',
          strengths: ['AWS & Frontend sertifikaları ekli'],
          improvements: ['Sertifika rozet bağlantılarını güncelleyin'],
        },
      ],
      suggestions: {
        criticalIssues: [
          'İş deneyimleri bölümündeki sorumlulukların sayısal başarı metrikleri (% artış, dönüşüm) oranla zayıf.',
        ],
        improvements: [
          'Giriş özet paragrafını 3-4 cümleyi geçmeyecek şekilde daha vurucu hale getirin.',
          'Projelerin altına canlı demo (Vercel / Netlify) linklerini ekleyin.',
        ],
        strengths: [
          'ATS tarama robotları için temiz layout ve okunaklı font seçimi.',
          'Geniş ve güncel teknik beceri yelpazesi.',
        ],
        recommendedChanges: [
          'Özgeçmiş dosya adını "Ad_Soyad_CV_2026.pdf" formatında kaydedin.',
        ],
      },
    };
  }

  async reviewCoverLetter(title: string, contentText: string): Promise<CoverLetterReviewRecord> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const isCustomized = /şirket|ekip|vizyon|trendyol|getir|hepsiburada/i.test(contentText);
    const textLen = contentText.length;

    const grammarScore = 94;
    const clarityScore = 90;
    const toneScore = 92;
    const personalizationScore = isCustomized ? 95 : 72;
    const atsScore = textLen > 200 ? 88 : 75;
    const structureScore = 90;

    const overallScore = Math.round(
      (grammarScore + clarityScore + toneScore + personalizationScore + atsScore + structureScore) / 6
    );

    return {
      id: `cov-rev-${Date.now()}`,
      title,
      version: 1,
      overallScore,
      grammarScore,
      clarityScore,
      toneScore,
      personalizationScore,
      atsScore,
      structureScore,
      createdAt: new Date().toISOString(),
      content: contentText,
      suggestions: {
        criticalIssues: isCustomized
          ? []
          : ['Ön mektup genel ve şablon duruyor. Başvurulan şirketin adı ve ürünü belirtilmeli.'],
        improvements: [
          'Şirkete nasıl bir değer katabileceğinizi ilk paragrafta daha güçlü vurgulayın.',
          'Görüşme daveti için saygılı bir kapanış cümlesi ekleyin.',
        ],
        strengths: [
          'Dilbilgisi ve imla kuralları kusursuz.',
          'Profesyonel ve özgüvenli hitap tonu.',
        ],
        recommendedChanges: [
          'Mektup uzunluğunu 250-350 kelime arasında tutun.',
        ],
      },
    };
  }
}

export const aiReviewProvider = new MockAiReviewProvider();
