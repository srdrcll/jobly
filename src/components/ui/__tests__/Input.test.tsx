import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import { Input } from '../Input';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Input Component', () => {
  it('renders input field with label and placeholder', () => {
    render(<Input label="E-Posta" placeholder="ornek@domain.com" />);
    
    expect(screen.getByLabelText(/e-posta/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ornek@domain.com')).toBeInTheDocument();
  });

  it('updates value correctly on user input', async () => {
    render(<Input label="Ad Soyad" />);
    
    const input = screen.getByLabelText(/ad soyad/i);
    await userEvent.type(input, 'Serdar Çil');
    
    expect(input).toHaveValue('Serdar Çil');
  });

  it('displays error message and sets aria-invalid when error is passed', () => {
    render(<Input label="Şifre" error="Şifre en az 6 karakter olmalıdır." />);
    
    const input = screen.getByLabelText(/şifre/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('border-rose-500/80');
    
    const errorText = screen.getByRole('alert');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveAttribute('aria-live', 'assertive');
    expect(errorText).toHaveTextContent('Şifre en az 6 karakter olmalıdır.');
  });

  it('displays helper text when no error is present', () => {
    render(<Input label="Kullanıcı Adı" helperText="Benzersiz bir kullanıcı adı seçin." />);
    
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('Benzersiz bir kullanıcı adı seçin.')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input label="Email" disabled />);
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
  });

  it('correctly forwards DOM ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input label="Test Ref" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
