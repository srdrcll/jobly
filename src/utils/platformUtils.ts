export interface PlatformStyle {
  label: string;
  bg: string;
  text: string;
  border: string;
}

export const PLATFORM_CONFIG: Record<string, PlatformStyle> = {
  'linkedin': {
    label: 'LinkedIn',
    bg: 'bg-blue-500/10 dark:bg-blue-500/5',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/20',
  },
  'kariyer.net': {
    label: 'Kariyer.net',
    bg: 'bg-orange-500/10 dark:bg-orange-500/5',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-500/20',
  },
  'youthall': {
    label: 'Youthall',
    bg: 'bg-purple-500/10 dark:bg-purple-500/5',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/20',
  },
  'indeed': {
    label: 'Indeed',
    bg: 'bg-cyan-500/10 dark:bg-cyan-500/5',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-500/20',
  },
  'github': {
    label: 'GitHub',
    bg: 'bg-slate-600/10 dark:bg-slate-400/10',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-500/20',
  },
  'glassdoor': {
    label: 'Glassdoor',
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/5',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/20',
  },
};

export function getPlatformStyle(source: string | null | undefined): PlatformStyle | null {
  if (!source || !source.trim()) return null;
  
  const cleanSource = source.trim();
  const key = cleanSource.toLowerCase();
  
  if (PLATFORM_CONFIG[key]) {
    return PLATFORM_CONFIG[key];
  }
  
  // Custom fallback style for user-written sources (e.g. "Anbean")
  return {
    label: cleanSource,
    bg: 'bg-teal-500/10 dark:bg-teal-500/5',
    text: 'text-teal-600 dark:text-teal-400',
    border: 'border-teal-500/20',
  };
}

/**
 * Automatically detects job platform from URL string
 */
export function detectPlatformFromUrl(url: string | null | undefined): string | null {
  if (!url || !url.trim()) return null;
  
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes('linkedin.com')) return 'LinkedIn';
  if (lowerUrl.includes('kariyer.net')) return 'Kariyer.net';
  if (lowerUrl.includes('youthall.com')) return 'Youthall';
  if (lowerUrl.includes('indeed.com')) return 'Indeed';
  if (lowerUrl.includes('github.com')) return 'GitHub';
  if (lowerUrl.includes('glassdoor.com')) return 'Glassdoor';
  
  return null;
}
