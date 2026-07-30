import { aiRepository } from '@/repositories/aiRepository';
import { AiConversation, AiMessage, AiSettings, AiCategory } from '@/types/ai';

export const aiService = {
  getConversations(): AiConversation[] {
    return aiRepository.getConversations();
  },

  getConversationById(id: string): AiConversation | null {
    return aiRepository.getConversationById(id);
  },

  createConversation(title: string, category: AiCategory, initialMessage?: string): AiConversation {
    return aiRepository.createConversation(title, category, initialMessage);
  },

  renameConversation(id: string, newTitle: string): void {
    aiRepository.renameConversation(id, newTitle);
  },

  toggleFavorite(id: string): void {
    aiRepository.toggleFavorite(id);
  },

  deleteConversation(id: string): void {
    aiRepository.deleteConversation(id);
  },

  async sendMessage(conversationId: string, userMessage: string): Promise<{ userMsg: AiMessage; assistantMsg: AiMessage }> {
    // 1. Add user message
    const userMsg = aiRepository.addMessage(conversationId, 'user', userMessage);

    // 2. Generate simulated AI Response (Ready for LLM API Integration in Sprint 8.2)
    const replyContent = generateAssistantReply(userMessage);
    const assistantMsg = aiRepository.addMessage(conversationId, 'assistant', replyContent);

    return { userMsg, assistantMsg };
  },

  getSettings(): AiSettings {
    return aiRepository.getSettings();
  },

  saveSettings(settings: AiSettings): void {
    aiRepository.saveSettings(settings);
  },
};

function generateAssistantReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('özgeçmiş') || q.includes('cv') || q.includes('resume')) {
    return `**Özgeçmiş (CV) Analiz Değerlendirmesi**\n\nATS (Applicant Tracking System) taraflı inceleme ve geri bildirimlerim:\n\n- **Güçlü Alanlar**: Teknik becerilerin başlangıçta açıkça listelenmesi harika.\n- **Gelişim Fırsatları**: Deneyimler bölümünde aksiyon fiillerini (**geliştirildi, optimize edildi, yönetildi**) ve ölçülebilir başarı yüzdelerini artırabilirsiniz.\n- **Eylem Adımı**: Projelerinizde kullandığınız teknolojileri doğrudan iş ilanındaki aranan niteliklerle eşleştirin.`;
  }

  if (q.includes('mülakat') || q.includes('soru') || q.includes('interview')) {
    return `**Mülakat Hazırlık & Simülasyon Tavsiyeleri**\n\nGörüşmelerde en çok karşılaşılan mülakat soruları ve yanıt stratejileri:\n\n1. **STAR Yöntemi**: Cevaplarınızı *Situation (Durum)*, *Task (Görev)*, *Action (Eylem)*, ve *Result (Sonuç)* adımlarına göre yapılandırın.\n2. **Zorlu Teknik Sorular**: Bilmediğiniz bir konu sorulduğunda dürüstçe öğrenme iştahınızı ve problemi nasıl araştıracağınızı belirtin.\n3. **Mülakatçıya Sorular**: Şirketin mühendislik kültürü ve 6 aylık hedefleri hakkında 2 soru sorun.`;
  }

  if (q.includes('maaş') || q.includes('teklif') || q.includes('salary')) {
    return `**Maaş Pazarlığı ve Müzakere Stratejisi**\n\nTeklif aşamasında hak ettiğiniz değeri almak için izlenebilecek yol:\n\n- Pazar ortalamalarını Glassdoor ve piyasa raporlarından teyit edin.\n- Teklif geldiğinde heyecanınızı belirtip 24 saat düşünme süresi isteyin.\n- "Şirketinizin vizyonu beni heyecanlandırıyor. Deneyimlerimi göz önüne aldığımda X tutarındaki teklifinize yaklaşabilirsek hemen imzalayabilirim" şeklinde saygılı bir karşı teklif yapın.`;
  }

  return `Sorunuzu aldım: **"${query}"**\n\nKariyer Pusulası AI Asistanı olarak kariyer hedeflerinizi desteklemek için buradayım. Detaylı analiz veya özel bir tavsiye isterseniz lütfen belirtin.`;
}
