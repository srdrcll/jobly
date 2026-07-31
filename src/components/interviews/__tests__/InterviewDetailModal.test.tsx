import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import { InterviewDetailModal } from '../InterviewDetailModal';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { mockInterviews } from '@/test/mocks';

describe('InterviewDetailModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  const sampleInterview = mockInterviews[0];

  it('renders interview detail details when open', () => {
    render(
      <InterviewDetailModal
        interview={sampleInterview}
        isOpen={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByRole('heading', { name: `${sampleInterview.company_name} — ${sampleInterview.position}` })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mülakat bilgileri/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hazırlık araçları/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /görüşme değerlendirmesi/i })).toBeInTheDocument();
  });

  it('triggers delete callback when delete button is clicked', async () => {
    render(
      <InterviewDetailModal
        interview={sampleInterview}
        isOpen={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /mülakatı sil/i });
    await userEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(sampleInterview.id);
  });
});
