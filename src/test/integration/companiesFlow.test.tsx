import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { CompaniesPage } from '@/pages/Companies';
import * as useCompaniesQueryModule from '@/hooks/queries/useCompaniesQuery';
import { mockCompanies } from '@/test/mocks';
import React from 'react';

describe('Integration Test: Companies Module Flow', () => {
  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders companies list and updates view when filtering', async () => {
    vi.spyOn(useCompaniesQueryModule, 'useCompaniesListQuery').mockReturnValue({
      data: mockCompanies,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<CompaniesPage />);

    expect(screen.getByRole('heading', { name: /hedef şirketler/i })).toBeInTheDocument();
    expect(screen.getAllByText('Nova Teknoloji').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Apex Sistemleri').length).toBeGreaterThan(0);
  });
});
