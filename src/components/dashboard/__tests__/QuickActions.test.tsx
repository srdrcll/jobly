import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import { QuickActions } from '../QuickActions';
import userEvent from '@testing-library/user-event';
import React from 'react';

describe('QuickActions Component', () => {
  it('renders all quick action cards', () => {
    render(<QuickActions />);

    expect(screen.getByText('Yeni Başvuru Ekle')).toBeInTheDocument();
    expect(screen.getByText('Başvuruları İncele')).toBeInTheDocument();
    expect(screen.getByText('Analizleri İncele')).toBeInTheDocument();
    expect(screen.getByText('Profil Yönetimi')).toBeInTheDocument();
  });

  it('triggers onOpenNewModal callback when clicking Add Application button', async () => {
    const handleOpenNewModal = vi.fn();
    render(<QuickActions onOpenNewModal={handleOpenNewModal} />);

    const addButton = screen.getByRole('button', { name: /başvuru oluştur/i });
    await userEvent.click(addButton);

    expect(handleOpenNewModal).toHaveBeenCalledTimes(1);
  });
});
