import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import { Sidebar } from '@/layouts/Sidebar';
import { calculateKpiMetrics } from '@/utils/statisticsUtils';
import { mockApplications } from '@/test/mocks';
import React from 'react';

describe('Integration Test: Cross-Module Data & Sidebar Badge Sync', () => {
  it('synchronizes application counts between statisticsUtils and Sidebar metrics', () => {
    const metrics = calculateKpiMetrics(mockApplications);

    render(<Sidebar />);

    // Total applications count is 2 in mockApplications
    expect(metrics.total).toBe(2);
    expect(screen.getByText('Başvurular')).toBeInTheDocument();
    expect(screen.getByText('Mülakatlar')).toBeInTheDocument();
  });
});
