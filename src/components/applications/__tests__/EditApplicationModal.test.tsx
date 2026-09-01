import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import { EditApplicationModal } from '../EditApplicationModal';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useApplicationsQueryModule from '@/hooks/queries/useApplicationsQuery';
import { mockApplications } from '@/test/mocks';

describe('EditApplicationModal Component', () => {
  const mockMutateAsync = vi.fn();
  const mockOnClose = vi.fn();
  const sampleApp = mockApplications[0];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useApplicationsQueryModule, 'useUpdateApplicationMutation').mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    } as any);
  });

  it('pre-fills input fields with existing application data when opened', () => {
    render(
      <EditApplicationModal
        isOpen={true}
        onClose={mockOnClose}
        application={sampleApp}
      />
    );

    expect(screen.getByRole('heading', { name: /başvuru.*düzenle/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/şirket adı \*/i)).toHaveValue(sampleApp.company_name);
    expect(screen.getByLabelText(/pozisyon ünvanı \*/i)).toHaveValue(sampleApp.position);
  });

  it('submits updated values when fields are modified and saved', async () => {
    mockMutateAsync.mockResolvedValueOnce({ id: sampleApp.id });

    render(
      <EditApplicationModal
        isOpen={true}
        onClose={mockOnClose}
        application={sampleApp}
      />
    );

    const positionInput = screen.getByLabelText(/pozisyon ünvanı \*/i);
    await userEvent.clear(positionInput);
    await userEvent.type(positionInput, 'Lead Frontend Developer');

    const saveButton = screen.getByRole('button', { name: /değişiklikleri kaydet/i });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        id: sampleApp.id,
        payload: expect.objectContaining({
          position: 'Lead Frontend Developer',
        }),
      });
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
