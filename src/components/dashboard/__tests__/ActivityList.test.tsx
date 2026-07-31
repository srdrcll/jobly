import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { ActivityList } from '../ActivityList';
import { ActivityEvent } from '@/utils/activityUtils';
import React from 'react';

describe('ActivityList Component', () => {
  it('renders empty state when no activities exist', () => {
    render(<ActivityList activities={[]} />);

    expect(screen.getByText('Henüz Aktivite Yok')).toBeInTheDocument();
    expect(screen.getByText(/Yeni iş başvurusu ekledikçe veya durumları güncelledikçe/i)).toBeInTheDocument();
  });

  it('renders activity items when activities are provided', () => {
    const mockActivities: ActivityEvent[] = [
      {
        id: 'act-1',
        type: 'application_created',
        title: 'Yeni Başvuru Yapıldı',
        description: 'Trendyol - Frontend Developer pozisyonuna başvuru yapıldı.',
        timestamp: '2026-07-29T10:00:00Z',
        targetId: 'app-1',
        targetType: 'application',
      },
    ];

    render(<ActivityList activities={mockActivities} />);

    expect(screen.getByText('Yeni Başvuru Yapıldı')).toBeInTheDocument();
    expect(screen.getByText('Trendyol - Frontend Developer pozisyonuna başvuru yapıldı.')).toBeInTheDocument();
  });
});
