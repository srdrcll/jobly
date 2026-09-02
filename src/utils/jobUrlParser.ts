import { detectPlatformFromUrl } from './platformUtils';

export interface ParsedJobUrl {
  company_name?: string;
  position?: string;
  source?: string;
}

function formatSlugToText(slug: string): string {
  if (!slug) return '';
  let text = slug;
  try {
    text = decodeURIComponent(slug);
  } catch {
    // fallback
  }
  return text
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

export function parseJobUrl(url: string | null | undefined): ParsedJobUrl {
  if (!url || !url.trim()) return {};

  const cleanUrl = url.trim();
  const source = detectPlatformFromUrl(cleanUrl) || undefined;
  const result: ParsedJobUrl = { source };

  try {
    const parsed = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
    const pathname = parsed.pathname;
    const hostname = parsed.hostname.toLowerCase();
    const searchParams = parsed.searchParams;

    // 1. LinkedIn Jobs
    if (hostname.includes('linkedin.com')) {
      result.source = 'LinkedIn';

      const match = pathname.match(/\/jobs\/(?:view|search|collections)\/([^/]+)/);
      if (match && match[1]) {
        let rawSlug = match[1].replace(/-\d{6,}$/, '').replace(/\d{6,}$/, '');
        if (rawSlug.includes('-at-')) {
          const parts = rawSlug.split('-at-');
          if (parts[0]) result.position = formatSlugToText(parts[0]);
          if (parts[1]) result.company_name = formatSlugToText(parts[1]);
        } else if (rawSlug && isNaN(Number(rawSlug)) && rawSlug.length > 2) {
          result.position = formatSlugToText(rawSlug);
        }
      }

      if (searchParams.has('keywords') && !result.position) {
        result.position = formatSlugToText(searchParams.get('keywords') || '');
      }
      if (searchParams.has('company') && !result.company_name) {
        result.company_name = formatSlugToText(searchParams.get('company') || '');
      }
    }

    // 2. Kariyer.net
    else if (hostname.includes('kariyer.net')) {
      result.source = 'Kariyer.net';
      const match = pathname.match(/\/is-ilani\/([^/]+)/);
      if (match && match[1]) {
        const rawSlug = match[1].replace(/-\d+$/, '');
        const words = rawSlug.split('-');
        if (words.length > 1) {
          result.company_name = formatSlugToText(words[0]);
          result.position = formatSlugToText(words.slice(1).join(' '));
        } else if (rawSlug) {
          result.position = formatSlugToText(rawSlug);
        }
      }
    }

    // 3. Youthall
    else if (hostname.includes('youthall.com')) {
      result.source = 'Youthall';
      const parts = pathname.split('/').filter(Boolean);
      if (parts.length >= 1) result.company_name = formatSlugToText(parts[0]);
      if (parts.length >= 2) result.position = formatSlugToText(parts[1]);
    }

    // 4. Lever
    else if (hostname.includes('lever.co')) {
      result.source = 'Lever';
      const parts = pathname.split('/').filter(Boolean);
      if (hostname === 'jobs.lever.co' && parts.length >= 1) {
        result.company_name = formatSlugToText(parts[0]);
        if (parts.length >= 2) result.position = formatSlugToText(parts[1]);
      } else {
        const sub = hostname.replace('.lever.co', '');
        if (sub && sub !== 'jobs') result.company_name = formatSlugToText(sub);
        if (parts.length >= 1) result.position = formatSlugToText(parts[0]);
      }
    }

    // 5. Greenhouse
    else if (hostname.includes('greenhouse.io')) {
      result.source = 'Greenhouse';
      const parts = pathname.split('/').filter(Boolean);
      if (parts.length >= 1) result.company_name = formatSlugToText(parts[0]);
    }

    // 6. Indeed
    else if (hostname.includes('indeed.com')) {
      result.source = 'Indeed';
      const queryPos = searchParams.get('q');
      if (queryPos) result.position = formatSlugToText(queryPos);
    }
  } catch {
    // Ignore invalid URL
  }

  return result;
}
