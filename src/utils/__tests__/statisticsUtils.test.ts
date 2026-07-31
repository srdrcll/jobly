import { describe, it, expect } from 'vitest';
import { calculateKpiMetrics } from '../statisticsUtils';
import { DbApplication } from '@/types';

describe('statisticsUtils - calculateKpiMetrics', () => {
  it('returns default zero values for empty or undefined applications array', () => {
    const metrics = calculateKpiMetrics([]);
    expect(metrics).toEqual({
      total: 0,
      active: 0,
      interviews: 0,
      offers: 0,
      rejections: 0,
      successRate: 0,
    });

    const metricsUndefined = calculateKpiMetrics(undefined as any);
    expect(metricsUndefined).toEqual({
      total: 0,
      active: 0,
      interviews: 0,
      offers: 0,
      rejections: 0,
      successRate: 0,
    });
  });

  it('calculates total, active, interviews, offers, rejections, and successRate correctly', () => {
    const sampleApps: Partial<DbApplication>[] = [
      { id: '1', status: 'saved' },
      { id: '2', status: 'applied' },
      { id: '3', status: 'contacted' },
      { id: '4', status: 'interview' },
      { id: '5', status: 'case_study' },
      { id: '6', status: 'offer' },
      { id: '7', status: 'rejected' },
      { id: '8', status: 'rejected' },
    ];

    const metrics = calculateKpiMetrics(sampleApps as DbApplication[]);

    expect(metrics.total).toBe(8);
    // Active = total except 'rejected' and 'saved' -> 8 - 2(rejected) - 1(saved) = 5
    expect(metrics.active).toBe(5);
    // Interviews = 'interview' + 'case_study' + 'contacted' = 1 + 1 + 1 = 3
    expect(metrics.interviews).toBe(3);
    // Offers = 'offer' = 1
    expect(metrics.offers).toBe(1);
    // Rejections = 'rejected' = 2
    expect(metrics.rejections).toBe(2);
    // Positive outcomes = offers (1) + interviews (3) = 4
    // Success rate = (4 / 8) * 100 = 50.0%
    expect(metrics.successRate).toBe(50);
  });
});
