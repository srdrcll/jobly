import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import { CreateCompanyModal } from '../CreateCompanyModal';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useCompaniesQueryModule from '@/hooks/queries/useCompaniesQuery';

describe('CreateCompanyModal Component', () => {
  const mockMutate = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useCompaniesQueryModule, 'useCreateCompanyMutation').mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as any);
  });

  it('renders modal when isOpen is true', () => {
    render(<CreateCompanyModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByRole('heading', { name: /yeni şirket ekle/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/şirket adı \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /şirketi kaydet/i })).toBeInTheDocument();
  });

  it('validates required fields on empty submit', async () => {
    render(<CreateCompanyModal isOpen={true} onClose={mockOnClose} />);

    const saveButton = screen.getByRole('button', { name: /şirketi kaydet/i });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Şirket adı zorunludur')).toBeInTheDocument();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('submits form successfully with valid data', async () => {
    render(<CreateCompanyModal isOpen={true} onClose={mockOnClose} />);

    await userEvent.type(screen.getByLabelText(/şirket adı \*/i), 'Getir');
    const saveButton = screen.getByRole('button', { name: /şirketi kaydet/i });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Getir',
        }),
        expect.any(Object)
      );
    });
  });
});
