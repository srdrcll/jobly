import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind classes conditionally and resolves conflicts cleanly.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats an ISO date string into a localized Turkish short date.
 * Returns '—' for null/undefined/invalid values.
 */
export function formatDate(dateString?: string | null): string {
  if (!dateString) return '—';
  try {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Formats an ISO date string into a localized Turkish date + time.
 * Returns '—' for null/undefined/invalid values.
 */
export function formatDateTime(dateString?: string | null): string {
  if (!dateString) return '—';
  try {
    return new Date(dateString).toLocaleString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}
