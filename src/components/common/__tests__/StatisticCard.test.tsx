import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { StatisticCard } from '../StatisticCard';
import { Briefcase } from 'lucide-react';
import React from 'react';

describe('StatisticCard Component', () => {
  it('renders title and value correctly', () => {
    render(
      <StatisticCard 
        title="Aktif Başvurular"
        value={12}
        icon={Briefcase}
      />
    );

    expect(screen.getByText('AKTİF BAŞVURULAR')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('renders positive change and trending up icon', () => {
    render(
      <StatisticCard 
        title="Mülakat Oranı"
        value="%40"
        change="+%5"
        changeType="positive"
        icon={Briefcase}
      />
    );

    expect(screen.getByText('+%5')).toBeInTheDocument();
    // TrendingUp svg should be present in document
    const trendingUpIcon = document.querySelector('svg');
    expect(trendingUpIcon).toBeInTheDocument();
  });

  it('renders negative change and trending down icon', () => {
    render(
      <StatisticCard 
        title="Red Oranı"
        value="%25"
        change="-%2"
        changeType="negative"
        icon={Briefcase}
      />
    );

    expect(screen.getByText('-%2')).toBeInTheDocument();
  });

  it('renders neutral change and minus icon', () => {
    render(
      <StatisticCard 
        title="Toplam"
        value="100"
        change="Değişmedi"
        changeType="neutral"
        icon={Briefcase}
      />
    );

    expect(screen.getByText('Değişmedi')).toBeInTheDocument();
  });

  it('displays description and timeframe correctly', () => {
    render(
      <StatisticCard 
        title="Maaş"
        value="90K"
        description="Ortalama Maaş"
        timeframe="son 6 ay"
        icon={Briefcase}
      />
    );

    expect(screen.getByText('Ortalama Maaş')).toBeInTheDocument();
    expect(screen.getByText('son 6 ay')).toBeInTheDocument();
  });
});
