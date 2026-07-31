import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import { CreateInterviewModal } from '../CreateInterviewModal';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useInterviewsQueryModule from '@/hooks/queries/useInterviewsQuery';

describe('CreateInterviewModal Component', () => {
  const mockMutate = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useInterviewsQueryModule, 'useCreateInterviewMutation').mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as any);
  });

  it('renders modal when isOpen is true', () => {
    render(<CreateInterviewModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByRole('heading', { name: /yeni mülakat planla/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/şirket adı \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pozisyon adı \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mülakatı kaydet/i })).toBeInTheDocument();
  });

  it('validates required fields on empty submit', async () => {
    render(<CreateInterviewModal isOpen={true} onClose={mockOnClose} />);

    const saveButton = screen.getByRole('button', { name: /mülakatı kaydet/i });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Şirket adı zorunludur')).toBeInTheDocument();
      expect(screen.getByText('Pozisyon adı zorunludur')).toBeInTheDocument();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('submits form successfully with valid data', async () => {
    render(<CreateInterviewModal isOpen={true} onClose={mockOnClose} />);

    await userEvent.type(screen.getByLabelText(/şirket adı \*/i), 'Apex Sistemleri');
    await userEvent.type(screen.getByLabelText(/pozisyon \*/i), 'Software Engineer');

    await userEvent.click(screen.getByRole('button', { name: /mülakatı kaydet/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          company_name: 'Apex Sistemleri',
          position: 'Senior Software Engineer',
        }),
        expect.any(Object)
      );
    });
  });
});
