import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import { AiMessageBubble } from '../AiMessageBubble';
import { AiMessage } from '@/types/ai';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('AiMessageBubble Component', () => {
  const userMessage: AiMessage = {
    id: 'm-1',
    role: 'user',
    content: 'Frontend mülakat soruları nelerdir?',
    timestamp: '2026-07-30T10:00:00Z',
  };

  const assistantMessage: AiMessage = {
    id: 'm-2',
    role: 'assistant',
    content: 'Frontend mülakatlarında genellikle React Hooks, Virtual DOM ve CSS soruları sorulur.',
    timestamp: '2026-07-30T10:00:05Z',
  };

  it('renders user message correctly', () => {
    render(<AiMessageBubble message={userMessage} />);
    expect(screen.getByText('Frontend mülakat soruları nelerdir?')).toBeInTheDocument();
  });

  it('renders assistant message and regenerate button when provided', async () => {
    const handleRegenerate = vi.fn();
    render(<AiMessageBubble message={assistantMessage} onRegenerate={handleRegenerate} />);

    expect(screen.getByText(/Frontend mülakatlarında genellikle React Hooks/i)).toBeInTheDocument();

    const regenButton = screen.getByTitle('Yeniden Yanıt Üret');
    await userEvent.click(regenButton);

    expect(handleRegenerate).toHaveBeenCalledTimes(1);
  });
});
