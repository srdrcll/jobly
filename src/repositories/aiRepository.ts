import { AiConversation, AiMessage, AiSettings } from '@/types/ai';
import { getUserStorageKey } from '@/utils/userStorageUtils';

const CONVERSATIONS_KEY_BASE = 'kp_ai_conversations_v1';
const SETTINGS_KEY_BASE = 'kp_ai_settings_v1';

const getConversationsKey = () => getUserStorageKey(CONVERSATIONS_KEY_BASE);
const getSettingsKey = () => getUserStorageKey(SETTINGS_KEY_BASE);

const DEFAULT_SETTINGS: AiSettings = {
  model: 'gemini-1.5-pro',
  persona: 'Career Coach',
  creativity: 0.7,
  responseLength: 'balanced',
};

function getInitialConversations(): AiConversation[] {
  const initialId = 'conv-initial-1';
  return [
    {
      id: initialId,
      title: 'Özgeçmiş İncelemesi & Kariyer Tavsiyesi',
      category: 'resume',
      isFavorite: true,
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 'msg-1',
          conversationId: initialId,
          role: 'assistant',
          content: 'Merhaba! Ben **Jobly AI Asistanınız**. Özgeçmiş incelemesi, mülakat simülasyonu, maaş pazarlığı veya LinkedIn profil iyileştirme konularında size nasıl yardımcı olabilirim?',
          timestamp: new Date().toISOString(),
        },
      ],
    },
  ];
}

export const aiRepository = {
  getConversations(): AiConversation[] {
    try {
      const raw = localStorage.getItem(getConversationsKey());
      if (!raw) {
        const init = getInitialConversations();
        localStorage.setItem(getConversationsKey(), JSON.stringify(init));
        return init;
      }
      return JSON.parse(raw);
    } catch {
      return getInitialConversations();
    }
  },

  getConversationById(id: string): AiConversation | null {
    const conversations = this.getConversations();
    return conversations.find((c) => c.id === id) || null;
  },

  createConversation(title: string, category: AiConversation['category'], initialUserMessage?: string): AiConversation {
    const conversations = this.getConversations();
    const newId = `conv-${Date.now()}`;
    const now = new Date().toISOString();

    const messages: AiMessage[] = [
      {
        id: `msg-${Date.now()}-1`,
        conversationId: newId,
        role: 'assistant',
        content: `Harika! **${title}** konusunda size özel rehberlik sunmaya hazırım. Ne sormak veya inceletmek istersiniz?`,
        timestamp: now,
      },
    ];

    if (initialUserMessage) {
      messages.push({
        id: `msg-${Date.now()}-2`,
        conversationId: newId,
        role: 'user',
        content: initialUserMessage,
        timestamp: now,
      });

      messages.push({
        id: `msg-${Date.now()}-3`,
        conversationId: newId,
        role: 'assistant',
        content: `**${title}** ile ilgili sorunuzu aldım:\n\n> "${initialUserMessage}"\n\nBu alandaki deneyimlerime göre, hedefinize ulaşmak için öncelikli olarak şu 3 adımı uygulamanızı öneririm:\n\n1. **Öne Çıkan Başarı Metrikleri**: Özgeçmişinizde sadece sorumlulukları değil, ürettiğiniz somut iş sonuçlarını (% artış, performans optimizasyonu) vurgulayın.\n2. **Hedef Şirket Kültürü**: Başvurduğunuz şirketin teknik stack ve vizyonuna uygun anahtar kelimeleri ekleyin.\n3. **Takip ve İletişim**: İK yetkilisine Linkedin üzerinden saygılı bir takip mesajı iletin.\n\nDetaylandırmamı istediğiniz özel bir bölüm var mı?`,
        timestamp: new Date(Date.now() + 1000).toISOString(),
      });
    }

    const newConv: AiConversation = {
      id: newId,
      title: title || 'Yeni Kariyer Sohbeti',
      category: category || 'general',
      isFavorite: false,
      isArchived: false,
      createdAt: now,
      updatedAt: now,
      messages,
    };

    conversations.unshift(newConv);
    localStorage.setItem(getConversationsKey(), JSON.stringify(conversations));
    return newConv;
  },

  renameConversation(id: string, newTitle: string): void {
    const conversations = this.getConversations();
    const target = conversations.find((c) => c.id === id);
    if (target) {
      target.title = newTitle;
      target.updatedAt = new Date().toISOString();
      localStorage.setItem(getConversationsKey(), JSON.stringify(conversations));
    }
  },

  toggleFavorite(id: string): void {
    const conversations = this.getConversations();
    const target = conversations.find((c) => c.id === id);
    if (target) {
      target.isFavorite = !target.isFavorite;
      localStorage.setItem(getConversationsKey(), JSON.stringify(conversations));
    }
  },

  toggleArchive(id: string): void {
    const conversations = this.getConversations();
    const target = conversations.find((c) => c.id === id);
    if (target) {
      target.isArchived = !target.isArchived;
      localStorage.setItem(getConversationsKey(), JSON.stringify(conversations));
    }
  },

  deleteConversation(id: string): void {
    const conversations = this.getConversations();
    const filtered = conversations.filter((c) => c.id !== id);
    localStorage.setItem(getConversationsKey(), JSON.stringify(filtered));
  },

  addMessage(conversationId: string, role: 'user' | 'assistant', content: string): AiMessage {
    const conversations = this.getConversations();
    const conv = conversations.find((c) => c.id === conversationId);
    const now = new Date().toISOString();

    const newMessage: AiMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      role,
      content,
      timestamp: now,
    };

    if (conv) {
      conv.messages.push(newMessage);
      conv.updatedAt = now;
      localStorage.setItem(getConversationsKey(), JSON.stringify(conversations));
    }

    return newMessage;
  },

  exportMarkdown(id: string): string {
    const conv = this.getConversationById(id);
    if (!conv) return '';

    let md = `# ${conv.title}\n\n*Tarih: ${new Date(conv.createdAt).toLocaleDateString('tr-TR')}*\n\n---\n\n`;
    conv.messages.forEach((m) => {
      const sender = m.role === 'user' ? '👤 **Kullanıcı**' : '🤖 **Kariyer AI Asistanı**';
      md += `${sender} (${new Date(m.timestamp).toLocaleTimeString('tr-TR')}):\n${m.content}\n\n---\n\n`;
    });

    return md;
  },

  getSettings(): AiSettings {
    try {
      const raw = localStorage.getItem(getSettingsKey());
      return raw ? JSON.parse(raw) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: AiSettings): void {
    try {
      localStorage.setItem(getSettingsKey(), JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save AI settings', e);
    }
  },
};
