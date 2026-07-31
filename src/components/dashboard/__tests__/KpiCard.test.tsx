import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { KpiCard } from '../KpiCard';
import { Briefcase } from 'lucide-react';
import React from 'react';

describe('KpiCard Component', () => {
  it('renders title, value, and helperText', () => {
    render(
      <KpiCard 
        title="Toplam Başvuru"
        value={15}
        change="+15"
        changeType="positive"
        helperText="Tüm zamanların verisi"
        icon={Briefcase}
      />
    );

    expect(screen.getByText('TOPLAM BAŞVURU')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('+15')).toBeInTheDocument();
    expect(screen.getByText('Tüm zamanların verisi')).toBeInTheDocument();
  });

  it('renders CardSkeleton when isLoading is true', () => {
    const { container } = render(
      <KpiCard 
        title="Yükleniyor Card"
        value={0}
        icon={Briefcase}
        isLoading={true}
      />
    );

    expect(screen.queryByText('YÜKLENİYOR CARD')).not.toBeInTheDocument();
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });
});
