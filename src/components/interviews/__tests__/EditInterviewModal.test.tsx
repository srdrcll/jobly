import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import { EditInterviewModal } from '../EditInterviewModal';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useInterviewsQueryModule from '@/hooks/queries/useInterviewsQuery';
import { mockInterviews } from '@/test/mocks';

describe('EditInterviewModal Component', () => {
  const mockMutate = vi.fn();
  const mockOnClose = vi.fn();
  const sampleInterview = mockInterviews[0];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useInterviewsQueryModule, 'useUpdateInterviewMutation').mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as any);
  });

  it('pre-fills fields with existing interview details', () => {
    render(
      <EditInterviewModal
        isOpen={true}
        onClose={mockOnClose}
        interview={sampleInterview}
      />
    );

    expect(screen.getByRole('heading', { name: /mülakat bilgilerini güncelle/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/şirket adı \*/i)).toHaveValue(sampleInterview.company_name);
    expect(screen.getByLabelText(/pozisyon adı \*/i)).toHaveValue(sampleInterview.position);
  });

  it('submits updated interview data successfully', async () => {
    render(
      <EditInterviewModal
        isOpen={true}
        onClose={mockOnClose}
        interview={sampleInterview}
      />
    );

    const positionInput = screen.getByLabelText(/pozisyon adı \*/i);
    await userEvent.clear(positionInput);
    await userEvent.type(positionInput, 'Staff Software Engineer');

    const saveButton = screen.getByRole('button', { name: /değişiklikleri kaydet/i });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          id: sampleInterview.id,
          payload: expect.objectContaining({
            position: 'Staff Software Engineer',
          }),
        },
        expect.any(Object)
      );
    });
  });
});
