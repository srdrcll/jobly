import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import { CreateApplicationModal } from '../CreateApplicationModal';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useApplicationsQueryModule from '@/hooks/queries/useApplicationsQuery';

describe('CreateApplicationModal Component', () => {
  const mockMutateAsync = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useApplicationsQueryModule, 'useCreateApplicationMutation').mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as any);
  });

  it('renders modal content when isOpen is true', () => {
    render(<CreateApplicationModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByRole('heading', { name: /yeni iş başvurusu ekle/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/şirket adı \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pozisyon ünvanı \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /başvuruyu kaydet/i })).toBeInTheDocument();
  });

  it('does not render modal when isOpen is false', () => {
    render(<CreateApplicationModal isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByRole('heading', { name: /yeni iş başvurusu ekle/i })).not.toBeInTheDocument();
  });

  it('validates required fields when submitting empty form', async () => {
    render(<CreateApplicationModal isOpen={true} onClose={mockOnClose} />);

    const saveButton = screen.getByRole('button', { name: /başvuruyu kaydet/i });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Şirket adı zorunludur.')).toBeInTheDocument();
      expect(screen.getByText('Pozisyon ünvanı zorunludur.')).toBeInTheDocument();
    });

    expect(mockMutateAsync).not.toHaveBeenCalled();
  });

  it('submits form successfully when valid data is entered', async () => {
    mockMutateAsync.mockResolvedValueOnce({ id: 'new-app-id' });

    render(<CreateApplicationModal isOpen={true} onClose={mockOnClose} />);

    await userEvent.type(screen.getByLabelText(/şirket adı \*/i), 'Getir');
    await userEvent.type(screen.getByLabelText(/pozisyon ünvanı \*/i), 'Senior React Developer');

    const saveButton = screen.getByRole('button', { name: /başvuruyu kaydet/i });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          company_name: 'Getir',
          position: 'Senior React Developer',
        })
      );
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
