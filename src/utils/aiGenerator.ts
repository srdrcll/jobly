export type CoverLetterTone = 'professional' | 'casual' | 'cold_email' | 'technical';
export type CoverLetterLanguage = 'tr' | 'en';

export interface GenerateCoverLetterOptions {
  companyName: string;
  position: string;
  contactName?: string | null;
  location?: string | null;
  tone: CoverLetterTone;
  language: CoverLetterLanguage;
  senderName?: string;
}

export function generateCoverLetter(options: GenerateCoverLetterOptions): { subject: string; body: string } {
  const { companyName, position, contactName, tone, language, senderName = '[Adınız Soyadınız]' } = options;
  const company = companyName || 'Şirketiniz';
  const pos = position || 'Açık Pozisyon';
  const recipient = contactName && contactName.trim() ? contactName : (language === 'tr' ? `${company} İK Ekibi` : `${company} Hiring Team`);

  // TURKISH GENERATION
  if (language === 'tr') {
    if (tone === 'cold_email') {
      return {
        subject: `${company} — ${pos} Pozisyonu Hakkında / ${senderName}`,
        body: `Merhaba ${recipient},

${company} bünyesindeki ${pos} pozisyonunu gördüm ve vizyonunuz beni oldukça heyecanlandırdı.

Son yıllarda modern web teknolojileri, ölçeklenebilir mimariler ve yüksek performanslı ürün geliştirme süreçlerinde aktif rol almaktayım. Kullanıcı deneyimini ön planda tutan çalışma anlayışımla ${company} ekibine doğrudan katma değer sağlayabileceğime inanıyorum.

Özgeçmişimi incelemek ve uygun bir zamanda 10 dakikalık kısa bir tanışma kahvesi/görüşmesi yapmak isterseniz çok mutlu olurum.

Saygılarımla,
${senderName}`
      };
    }

    if (tone === 'casual') {
      return {
        subject: `${pos} Başvurusu — ${senderName}`,
        body: `Harika bir gün dilerim ${recipient},

${company} ekibinin geliştirdiği projeleri ve kültürünüzü uzun zamandır ilgiyle takip ediyorum. ${pos} pozisyonu ilanını gördüğümde, tutkularımın ve teknik yetkinliklerimin ekibinizle ne kadar örtüştüğünü fark ettim.

Kullanıcı dostu, hızlı ve yenilikçi çözümler üretmeyi seven biri olarak; dinamik yapınıza adapte olup projelerinizi bir üst seviyeye taşımak için sabırsızlanıyorum.

Detayları görüşmek ve özgeçmişimi paylaşmak adına geri dönüşünüzü merakla bekliyorum.

Sevgiler,
${senderName}`
      };
    }

    if (tone === 'technical') {
      return {
        subject: `${pos} Pozisyonu Teknik Başvuru — ${senderName}`,
        body: `Sayın ${recipient},

${company} bünyesinde yer alan ${pos} pozisyonuna başvuruda bulunmaktan memnuniyet duyuyorum.

Kariyerim boyunca temiz kod (Clean Code), test odaklı geliştirme (TDD), performans optimizasyonu ve modüler mimari prensiplerini esas alarak projeler geliştirdim. ${company}'deki teknik gereksinimler ve ölçeklenme hedefleri doğrultusunda sistem mimarinize hızla uyum sağlayabilirim.

Teknik mülakat sürecinizde projelerimi ve yaklaşımımı detaylandırmaktan memnuniyet duyarım.

Saygılarımla,
${senderName}`
      };
    }

    // Default Professional TR
    return {
      subject: `${company} — ${pos} Pozisyonu Başvurusu / ${senderName}`,
      body: `Sayın ${recipient},

${company} bünyesinde duyurulan ${pos} pozisyonu için başvurumu sunmaktan büyük heyecan duyuyorum.

Kariyerim boyunca edindiğim teknik bilgi birikimi, problem çözme becerilerim ve takım çalışmasına verdiğim önem ile ${company}'in hedeflerine ulaşmasında aktif bir rol üstlenmek istiyorum. İlanda belirtilen niteliklerin, geçmiş deneyimlerim ve çalışma disiplinimle birebir örtüştüğüne inanıyorum.

Detaylı özgeçmişimi ekte bilginize sunar, uygun görmeniz halinde pozisyonu ve ekibinize sağlayabileceğim katkıları görüşmek üzere bir mülakat fırsatı rica ederim.

Değerlendirmeniz ve zaman ayırdığınız için teşekkür ederim.

Saygılarımla,
${senderName}`
    };
  }

  // ENGLISH GENERATION
  if (tone === 'cold_email') {
    return {
      subject: `${company} — ${pos} Role / ${senderName}`,
      body: `Hi ${recipient},

I recently came across the ${pos} position at ${company} and was immediately drawn to your team's mission.

With strong hands-on experience in building scalable applications and delivering high-impact user experiences, I believe I can make an immediate contribution to ${company}.

I would love the opportunity to connect for a quick 10-minute call to introduce myself. Attached is my resume for your review.

Best regards,
${senderName}`
    };
  }

  if (tone === 'casual') {
    return {
      subject: `Application for ${pos} — ${senderName}`,
      body: `Hi ${recipient},

I've been following ${company}'s growth for a while, so I was thrilled to discover the ${pos} opening!

I love building fast, intuitive products and thrive in collaborative environment. Given my technical background and passion for quality software, I'm super excited about the prospect of joining ${company}.

I’d love to chat more about how my background fits your team's vision.

Best,
${senderName}`
    };
  }

  if (tone === 'technical') {
    return {
      subject: `${pos} Application — ${senderName}`,
      body: `Dear ${recipient},

I am writing to formally apply for the ${pos} position at ${company}.

Throughout my engineering career, I have focused heavily on modular architecture, clean code principles, performance optimization, and scalable systems. I am confident that my technical skill set aligns perfectly with ${company}'s current stack and engineering goals.

I would welcome the opportunity to discuss my technical background and past project experience in more detail.

Sincerely,
${senderName}`
    };
  }

  // Default Professional EN
  return {
    subject: `Application for ${pos} Position — ${senderName}`,
    body: `Dear ${recipient},

I am writing to express my strong interest in the ${pos} position at ${company}.

My professional background, coupled with my passion for building robust products and driving engineering excellence, makes me a great fit for your team. I admire ${company}'s work and would be thrilled to contribute to your ongoing projects.

Enclosed is my resume outlining my experience. I look forward to the possibility of discussing how my skills and background meet your needs.

Thank you for your time and consideration.

Sincerely,
${senderName}`
  };
}
