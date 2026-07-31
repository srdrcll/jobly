import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import { EditCompanyModal } from '../EditCompanyModal';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useCompaniesQueryModule from '@/hooks/queries/useCompaniesQuery';
import { mockCompanies } from '@/test/mocks';

describe('EditCompanyModal Component', () => {
  const mockMutate = vi.fn();
  const mockOnClose = vi.fn();
  const sampleCompany = mockCompanies[0];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useCompaniesQueryModule, 'useUpdateCompanyMutation').mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as any);
  });

  it('pre-fills inputs with existing company data', () => {
    render(
      <EditCompanyModal
        isOpen={true}
        onClose={mockOnClose}
        company={sampleCompany}
      />
    );

    expect(screen.getByRole('heading', { name: /şirket bilgilerini düzenle/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/şirket adı \*/i)).toHaveValue(sampleCompany.name);
  });

  it('submits updated company data successfully', async () => {
    render(
      <EditCompanyModal
        isOpen={true}
        onClose={mockOnClose}
        company={sampleCompany}
      />
    );

    const nameInput = screen.getByLabelText(/şirket adı \*/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Trendyol Group');

    const saveButton = screen.getByRole('button', { name: /değişiklikleri kaydet/i });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          id: sampleCompany.id,
          payload: expect.objectContaining({
            name: 'Trendyol Group',
          }),
        },
        expect.any(Object)
      );
    });
  });
});
