import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import { EmptyState } from '../EmptyState';
import { Sparkles, Button } from 'lucide-react';
import React from 'react';

describe('EmptyState Component', () => {
  it('renders title and description correctly', () => {
    render(
      <EmptyState 
        title="Veri Bulunamadı"
        description="Henüz sisteme eklenmiş bir veri bulunmamaktadır."
      />
    );

    expect(screen.getByText('Veri Bulunamadı')).toBeInTheDocument();
    expect(screen.getByText('Henüz sisteme eklenmiş bir veri bulunmamaktadır.')).toBeInTheDocument();
  });

  it('renders custom icon if provided', () => {
    const { container } = render(
      <EmptyState 
        title="Temiz"
        description="Harika durum!"
        icon={Sparkles}
      />
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders action slots correctly', () => {
    render(
      <EmptyState 
        title="Boş"
        description="Detaylar"
        actionSlot={<button data-testid="primary-act">Ekle</button>}
        secondaryActionSlot={<button data-testid="secondary-act">İptal</button>}
      />
    );

    expect(screen.getByTestId('primary-act')).toBeInTheDocument();
    expect(screen.getByTestId('secondary-act')).toBeInTheDocument();
  });
});
