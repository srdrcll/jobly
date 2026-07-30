import { aiRepository } from '@/repositories/aiRepository';
import { AiProviderRegistry } from './aiProviderAdapter';
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

  toggleArchive(id: string): void {
    aiRepository.toggleArchive(id);
  },

  deleteConversation(id: string): void {
    aiRepository.deleteConversation(id);
  },

  exportMarkdown(id: string): string {
    return aiRepository.exportMarkdown(id);
  },

  async sendMessage(conversationId: string, userMessage: string): Promise<{ userMsg: AiMessage; assistantMsg: AiMessage }> {
    const userMsg = aiRepository.addMessage(conversationId, 'user', userMessage);

    const settings = aiRepository.getSettings();
    const adapter = AiProviderRegistry.getAdapter(settings.model);

    const conv = aiRepository.getConversationById(conversationId);
    const history = conv?.messages.map((m) => ({
      role: m.role === 'assistant' ? ('assistant' as const) : ('user' as const),
      content: m.content,
    }));

    const response = await adapter.generateResponse({
      prompt: userMessage,
      conversationHistory: history,
      settings,
    });

    const assistantMsg = aiRepository.addMessage(conversationId, 'assistant', response.text);

    return { userMsg, assistantMsg };
  },

  getSettings(): AiSettings {
    return aiRepository.getSettings();
  },

  saveSettings(settings: AiSettings): void {
    aiRepository.saveSettings(settings);
  },
};
