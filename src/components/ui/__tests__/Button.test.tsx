import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import { Button } from '../Button';
import React from 'react';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Tıkla</Button>);
    expect(screen.getByRole('button', { name: /tıkla/i })).toBeInTheDocument();
  });

  it('triggers onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Tıkla</Button>);
    
    const button = screen.getByRole('button', { name: /tıkla/i });
    button.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled and shows loader when isLoading is true', () => {
    render(<Button isLoading>Tıkla</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // Loader2 icon is rendered
    expect(button.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is passed', () => {
    render(<Button disabled>Tıkla</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct class names for variants and sizes', () => {
    const { rerender } = render(<Button variant="destructive" size="lg">Destructive</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-rose-600');
    expect(button).toHaveClass('text-base');

    rerender(<Button variant="outline" size="sm">Outline</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('border-slate-300');
    expect(button).toHaveClass('text-xs');
  });

  it('renders left and right icons correctly', () => {
    render(
      <Button 
        leftIcon={<span data-testid="left-icon">👈</span>}
        rightIcon={<span data-testid="right-icon">👉</span>}
      >
        İkonlu Buton
      </Button>
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
});
