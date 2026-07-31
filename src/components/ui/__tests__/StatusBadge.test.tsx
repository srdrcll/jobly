import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { StatusBadge } from '../StatusBadge';
import React from 'react';

describe('StatusBadge Component', () => {
  it('renders correct label for status', () => {
    const { rerender } = render(<StatusBadge status="applied" />);
    expect(screen.getByText('Başvuruldu')).toBeInTheDocument();

    rerender(<StatusBadge status="interview" />);
    expect(screen.getByText('Mülakat')).toBeInTheDocument();

    rerender(<StatusBadge status="rejected" />);
    expect(screen.getByText('Reddedildi')).toBeInTheDocument();
  });

  it('applies correct class names for sizes', () => {
    const { rerender } = render(<StatusBadge status="offer" size="sm" />);
    let badge = screen.getByText('Teklif Alındı').parentElement;
    expect(badge).toHaveClass('text-xs');
    expect(badge).toHaveClass('px-2.5');

    rerender(<StatusBadge status="offer" size="lg" />);
    badge = screen.getByText('Teklif Alındı').parentElement;
    expect(badge).toHaveClass('text-sm');
    expect(badge).toHaveClass('px-3.5');
  });

  it('renders status icons and dots based on options', () => {
    const { container, rerender } = render(<StatusBadge status="case_study" showIcon={true} showDot={false} />);
    // Icon is present (svg element)
    expect(container.querySelector('svg')).toBeInTheDocument();
    // Dot is not present
    expect(container.querySelector('.animate-pulse')).not.toBeInTheDocument();

    rerender(<StatusBadge status="case_study" showIcon={false} showDot={true} />);
    // Icon is not present
    expect(container.querySelector('svg')).not.toBeInTheDocument();
    // Dot is present
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });
});
