import { detectPlatformFromUrl } from './platformUtils';

export interface ParsedJobUrl {
  company_name?: string;
  position?: string;
  source?: string;
}

/**
 * Capitalizes title words cleanly (e.g., "frontend-developer" -> "Frontend Developer")
 */
function formatSlugToText(slug: string): string {
  if (!slug) return '';
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

/**
 * Extracts company name and position title from common job board URLs.
 */
export function parseJobUrl(url: string | null | undefined): ParsedJobUrl {
  if (!url || !url.trim()) return {};

  const cleanUrl = url.trim();
  const source = detectPlatformFromUrl(cleanUrl) || undefined;
  const result: ParsedJobUrl = { source };

  try {
    const parsed = new URL(cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`);
    const pathname = parsed.pathname;
    const hostname = parsed.hostname.toLowerCase();

    // 1. LinkedIn Jobs: /jobs/view/senior-frontend-developer-at-trendyol-12345/ or /jobs/view/12345/
    if (hostname.includes('linkedin.com')) {
      const match = pathname.match(/\/jobs\/view\/([^/]+)/);
      if (match && match[1]) {
        const rawSlug = match[1].replace(/-\d+$/, ''); // Remove trailing ID numbers
        if (rawSlug.includes('-at-')) {
          const [posPart, compPart] = rawSlug.split('-at-');
          if (posPart) result.position = formatSlugToText(posPart);
          if (compPart) result.company_name = formatSlugToText(compPart);
        } else if (isNaN(Number(rawSlug))) {
          result.position = formatSlugToText(rawSlug);
        }
      }
    }

    // 2. Lever Jobs: jobs.lever.co/company-name/job-id OR company.lever.co/job-id
    else if (hostname.includes('lever.co')) {
      const parts = pathname.split('/').filter(Boolean);
      if (hostname === 'jobs.lever.co' && parts.length >= 1) {
        result.company_name = formatSlugToText(parts[0]);
      } else {
        const sub = hostname.replace('.lever.co', '');
        if (sub && sub !== 'jobs') {
          result.company_name = formatSlugToText(sub);
        }
      }
    }

    // 3. Greenhouse Jobs: boards.greenhouse.io/company-name/jobs/12345
    else if (hostname.includes('greenhouse.io')) {
      const parts = pathname.split('/').filter(Boolean);
      if (parts.length >= 1) {
        result.company_name = formatSlugToText(parts[0]);
      }
    }

    // 4. Kariyer.net: /is-ilani/trendyol-senior-frontend-developer-391028
    else if (hostname.includes('kariyer.net')) {
      const match = pathname.match(/\/is-ilani\/([^/]+)/);
      if (match && match[1]) {
        const rawSlug = match[1].replace(/-\d+$/, '');
        const words = rawSlug.split('-');
        if (words.length > 1) {
          result.company_name = formatSlugToText(words[0]);
          result.position = formatSlugToText(words.slice(1).join(' '));
        } else {
          result.position = formatSlugToText(rawSlug);
        }
      }
    }

    // 5. Youthall: /trendyol/frontend-developer-internship/
    else if (hostname.includes('youthall.com')) {
      const parts = pathname.split('/').filter(Boolean);
      if (parts.length >= 1) {
        result.company_name = formatSlugToText(parts[0]);
      }
      if (parts.length >= 2) {
        result.position = formatSlugToText(parts[1]);
      }
    }

    // 6. Indeed: /viewjob?jk=123&q=Frontend+Developer
    else if (hostname.includes('indeed.com')) {
      const searchParams = parsed.searchParams;
      const queryPos = searchParams.get('q');
      if (queryPos) {
        result.position = formatSlugToText(queryPos);
      }
    }
  } catch {
    // Ignore invalid URL format errors
  }

  return result;
}
