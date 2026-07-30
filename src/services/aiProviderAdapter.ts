import { AiSettings } from '@/types/ai';

export interface LlmRequest {
  prompt: string;
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
  settings?: AiSettings;
}

export interface LlmResponse {
  text: string;
  modelUsed: string;
  tokensEstimated?: number;
}

export interface ILlmProviderAdapter {
  providerName: string;
  generateResponse(request: LlmRequest): Promise<LlmResponse>;
}

export class MockProviderAdapter implements ILlmProviderAdapter {
  providerName = 'Mock Provider (Offline Engine)';

  async generateResponse(request: LlmRequest): Promise<LlmResponse> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const text = request.prompt.toLowerCase();

    if (text.includes('özgeçmiş') || text.includes('cv')) {
      return {
        text: 'Özgeçmişinizin ATS geçirgenliğini artırmak için deneyim başlıkları altına ölçülebilir başarı yüzdeleri ekleyin ve gereksiz grafik elemanlarından kaçının.',
        modelUsed: 'mock-engine-v1',
      };
    }

    return {
      text: `"${request.prompt}" konulu talebinizi aldım. Kariyer hedeflerinize ulaşmanız için stratejik adımları başarıyla uygulamaya devam edin.`,
      modelUsed: 'mock-engine-v1',
    };
  }
}

export class GeminiProviderAdapter implements ILlmProviderAdapter {
  providerName = 'Google Gemini 1.5 Pro Adapter';

  async generateResponse(request: LlmRequest): Promise<LlmResponse> {
    // Ready for Google Gemini REST API / SDK integration
    const mock = new MockProviderAdapter();
    const res = await mock.generateResponse(request);
    return { ...res, modelUsed: 'gemini-1.5-pro' };
  }
}

export class OpenAiProviderAdapter implements ILlmProviderAdapter {
  providerName = 'OpenAI GPT-4o Adapter';

  async generateResponse(request: LlmRequest): Promise<LlmResponse> {
    // Ready for OpenAI REST API integration
    const mock = new MockProviderAdapter();
    const res = await mock.generateResponse(request);
    return { ...res, modelUsed: 'gpt-4o' };
  }
}

export class AnthropicProviderAdapter implements ILlmProviderAdapter {
  providerName = 'Anthropic Claude 3.5 Sonnet Adapter';

  async generateResponse(request: LlmRequest): Promise<LlmResponse> {
    // Ready for Anthropic REST API integration
    const mock = new MockProviderAdapter();
    const res = await mock.generateResponse(request);
    return { ...res, modelUsed: 'claude-3.5-sonnet' };
  }
}

/**
 * Dependency Injection Registry for LLM Providers
 */
export class AiProviderRegistry {
  private static adapters: Record<string, ILlmProviderAdapter> = {
    'gemini-1.5-pro': new GeminiProviderAdapter(),
    'gemini-1.5-flash': new GeminiProviderAdapter(),
    'gpt-4o': new OpenAiProviderAdapter(),
    'claude-3.5-sonnet': new AnthropicProviderAdapter(),
    default: new MockProviderAdapter(),
  };

  static getAdapter(modelName?: string): ILlmProviderAdapter {
    if (!modelName) return this.adapters.default;
    return this.adapters[modelName] || this.adapters.default;
  }
}
