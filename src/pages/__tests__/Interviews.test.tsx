import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils';
import { InterviewsPage } from '../Interviews';
import userEvent from '@testing-library/user-event';
import React from 'react';
import * as useInterviewsQueryModule from '@/hooks/queries/useInterviewsQuery';
import { mockInterviews } from '@/test/mocks';

describe('InterviewsPage Component', () => {
  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders page header and view mode toggles correctly', () => {
    vi.spyOn(useInterviewsQueryModule, 'useInterviewsListQuery').mockReturnValue({
      data: mockInterviews,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<InterviewsPage />);

    expect(screen.getByRole('heading', { name: /mülakat yönetimi & takvim/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /yeni mülakat planla/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /liste/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /takvim/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /analiz/i })).toBeInTheDocument();
  });

  it('renders loading skeleton when query is loading', () => {
    vi.spyOn(useInterviewsQueryModule, 'useInterviewsListQuery').mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<InterviewsPage />);

    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders error alert and handles refetch click when query fails', async () => {
    vi.spyOn(useInterviewsQueryModule, 'useInterviewsListQuery').mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: new Error('Mülakat verileri yüklenemedi'),
      refetch: mockRefetch,
    } as any);

    render(<InterviewsPage />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Mülakatlar Yüklenemedi')).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /tekrar dene/i });
    await userEvent.click(retryButton);

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('renders empty state when no interviews exist', () => {
    vi.spyOn(useInterviewsQueryModule, 'useInterviewsListQuery').mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<InterviewsPage />);

    expect(screen.getByText('Mülakat Kaydı Bulunamadı')).toBeInTheDocument();
  });

  it('filters interviews by search query', async () => {
    vi.spyOn(useInterviewsQueryModule, 'useInterviewsListQuery').mockReturnValue({
      data: mockInterviews,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    } as any);

    render(<InterviewsPage />);

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/şirket, pozisyon veya mülakatçı ara/i);
    await userEvent.type(searchInput, 'Google');

    expect(searchInput).toHaveValue('Google');
  });
});
