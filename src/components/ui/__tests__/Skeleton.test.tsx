import { describe, it, expect } from 'vitest';
import { render } from '@/test/utils';
import { Skeleton, CardSkeleton, TableSkeleton } from '../Skeleton';
import React from 'react';

describe('Skeleton Components', () => {
  it('renders skeleton variants correctly', () => {
    const { container, rerender } = render(<Skeleton variant="rectangular" />);
    let element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('animate-pulse');
    expect(element).toHaveClass('rounded-xl');

    rerender(<Skeleton variant="circular" />);
    element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('rounded-full');

    rerender(<Skeleton variant="text" />);
    element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('h-4');
  });

  it('renders CardSkeleton correctly', () => {
    const { container } = render(<CardSkeleton />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('animate-pulse');
    expect(card).toHaveClass('p-5');
    // Inner circular avatar skeleton is present
    expect(container.querySelector('.rounded-full')).toBeInTheDocument();
  });

  it('renders TableSkeleton correctly', () => {
    const { container } = render(<TableSkeleton />);
    const table = container.firstChild as HTMLElement;
    expect(table).toHaveClass('space-y-2');
    // Multiple row skeletons are rendered
    const rows = container.querySelectorAll('.divide-y, .flex');
    expect(rows.length).toBeGreaterThanOrEqual(5);
  });
});
