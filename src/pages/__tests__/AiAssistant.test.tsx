import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { AiAssistantPage } from '../AiAssistant';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useAiQueryModule from '@/hooks/queries/useAiQuery';

describe('AiAssistantPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Element.prototype.scrollIntoView = vi.fn();

    vi.spyOn(useAiQueryModule, 'useAiConversationsQuery').mockReturnValue({
      data: [
        {
          id: 'conv-1',
          user_id: 'user-1',
          title: 'Yazılım Kariyer Tavsiyeleri',
          category: 'general',
          is_favorite: true,
          is_archived: false,
          created_at: '2026-07-30T10:00:00Z',
          updated_at: '2026-07-30T10:00:00Z',
          messages: [
            { id: 'msg-1', role: 'user', content: 'Merhaba AI', timestamp: '2026-07-30T10:00:00Z' },
            { id: 'msg-2', role: 'assistant', content: 'Merhaba! Nasıl yardımcı olabilirim?', timestamp: '2026-07-30T10:00:01Z' },
          ],
        },
      ],
      isLoading: false,
    } as any);

    vi.spyOn(useAiQueryModule, 'useAiSettingsQuery').mockReturnValue({
      data: { model: 'Gemini 1.5 Pro', persona: 'Kariyer Koçu', temperature: 0.7 },
      isLoading: false,
    } as any);

    vi.spyOn(useAiQueryModule, 'useAiConversationDetailQuery').mockReturnValue({
      data: {
        id: 'conv-1',
        title: 'Yazılım Kariyer Tavsiyeleri',
        messages: [
          { id: 'msg-1', role: 'user', content: 'Merhaba AI', timestamp: '2026-07-30T10:00:00Z' },
          { id: 'msg-2', role: 'assistant', content: 'Merhaba! Nasıl yardımcı olabilirim?', timestamp: '2026-07-30T10:00:01Z' },
        ],
      },
      isLoading: false,
    } as any);

    vi.spyOn(useAiQueryModule, 'useCreateAiConversationMutation').mockReturnValue({
      mutate: vi.fn(),
    } as any);

    vi.spyOn(useAiQueryModule, 'useRenameAiConversationMutation').mockReturnValue({
      mutate: vi.fn(),
    } as any);

    vi.spyOn(useAiQueryModule, 'useToggleAiFavoriteMutation').mockReturnValue({
      mutate: vi.fn(),
    } as any);

    vi.spyOn(useAiQueryModule, 'useToggleAiArchiveMutation').mockReturnValue({
      mutate: vi.fn(),
    } as any);

    vi.spyOn(useAiQueryModule, 'useDeleteAiConversationMutation').mockReturnValue({
      mutate: vi.fn(),
    } as any);

    vi.spyOn(useAiQueryModule, 'useSendAiMessageMutation').mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);
  });

  it('renders AI assistant page title and main navigation tabs', () => {
    render(<AiAssistantPage />);

    expect(screen.getByRole('heading', { name: /yapay zekâ kariyer asistanı & mülakat koçu/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ai chat/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mülakat koçu/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /insights/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hedefler/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cv taraması/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ön mektup/i })).toBeInTheDocument();
  });

  it('switches between main tabs correctly', async () => {
    render(<AiAssistantPage />);

    const coachTab = screen.getByRole('button', { name: /mülakat koçu/i });
    await userEvent.click(coachTab);

    expect(screen.getByText('AI Mülakat Simülatörü')).toBeInTheDocument();

    const cvTab = screen.getByRole('button', { name: /cv taraması/i });
    await userEvent.click(cvTab);

    expect(screen.getByText('AI CV & Özgeçmiş İnceleme')).toBeInTheDocument();
  });

  it('renders chat message bubbles and handles message input typing', async () => {
    render(<AiAssistantPage />);

    expect(screen.getByText('Merhaba AI')).toBeInTheDocument();
    expect(screen.getByText('Merhaba! Nasıl yardımcı olabilirim?')).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/ai kariyer asistanına bir soru sorun/i);
    await userEvent.type(input, 'Mülakat öncesi ne çalışmalıyım?');

    expect(input).toHaveValue('Mülakat öncesi ne çalışmalıyım?');
  });
});
