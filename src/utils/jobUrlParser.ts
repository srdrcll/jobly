import { detectPlatformFromUrl } from './platformUtils';

export interface ParsedJobUrl {
  company_name?: string;
  position?: string;
  location?: string;
  source?: string;
  logo_url?: string;
}

function formatSlugToText(slug: string): string {
  if (!slug) return '';
  let text = slug;
  try {
    text = decodeURIComponent(slug);
  } catch {
    // fallback
  }

  // Clean trailing location / pipes from slug
  text = text
    .replace(/\s*\|\s*(LinkedIn Jobs|LinkedIn|Kariyer\.net|Youthall|Indeed|Glassdoor).*$/i, '')
    .replace(/\s*[\u2014\u2013—–-]\s*(Istanbul|Ankara|Izmir|Turkey|Türkiye|Remote).*$/i, '')
    .trim();

  return text
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

/**
 * Normalizes LinkedIn search/collections and Indeed URLs to clean canonical URLs.
 */
export function normalizeJobUrl(url: string | null | undefined): string {
  if (!url || !url.trim()) return '';
  let cleanUrl = url.trim();
  if (!cleanUrl.startsWith('http')) cleanUrl = `https://${cleanUrl}`;

  try {
    const parsed = new URL(cleanUrl);
    if (parsed.hostname.includes('linkedin.com')) {
      const jobId = parsed.searchParams.get('currentJobId') || parsed.searchParams.get('jobId') || parsed.searchParams.get('job_id');
      if (jobId && /^\d+$/.test(jobId)) {
        return `https://www.linkedin.com/jobs/view/${jobId}/`;
      }
    } else if (parsed.hostname.includes('indeed.com')) {
      const jk = parsed.searchParams.get('jk');
      if (jk) {
        return `https://${parsed.hostname}/viewjob?jk=${jk}`;
      }
    }
  } catch {
    // Ignore invalid URL
  }
  return cleanUrl;
}

/**
 * Generates high-res company logo URL using Clearbit Logo API or custom logo URL.
 */
export function getCompanyLogoUrl(companyName: string | null | undefined, customLogoUrl?: string | null): string | null {
  if (customLogoUrl && customLogoUrl.startsWith('http')) {
    return customLogoUrl;
  }
  if (!companyName || !companyName.trim()) return null;

  const cleanDomain = companyName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  if (!cleanDomain || cleanDomain.length < 2) return null;

  return `https://logo.clearbit.com/${cleanDomain}.com`;
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

/**
 * Asynchronously fetches metadata from webpage HTML (via microlink API).
 * Cleanly extracts Company, Position, and Location.
 */
export async function fetchJobMetaFromUrl(url: string | null | undefined): Promise<ParsedJobUrl> {
  const localParsed = parseJobUrl(url);

  if (!url || !url.trim()) return localParsed;

  try {
    const targetUrl = normalizeJobUrl(url);
    const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(targetUrl)}`);
    if (!res.ok) return localParsed;

    const json = await res.json();
    const title = (json?.data?.title as string) || '';
    const logoUrl = (json?.data?.logo?.url as string) || (json?.data?.image?.url as string) || undefined;

    const result: ParsedJobUrl = { 
      ...localParsed,
      logo_url: logoUrl 
    };

    if (!title || typeof title !== 'string' || title.includes('Search | LinkedIn')) return result;

    // Strip trailing site branding
    let cleanTitle = title
      .replace(/\s*\|\s*(LinkedIn Jobs|LinkedIn|Kariyer\.net|Youthall|Indeed\.com|Indeed|Glassdoor).*$/i, '')
      .replace(/\s*-\s*(LinkedIn Jobs|LinkedIn|Kariyer\.net|Youthall|Indeed\.com|Indeed|Glassdoor).*$/i, '')
      .trim();

    // Indeed format: "Position - Company - Location"
    if (title.toLowerCase().includes('indeed')) {
      const parts = cleanTitle.split(/\s*-\s*/);
      if (parts.length >= 3) {
        if (!result.position) result.position = parts[0].trim();
        if (!result.company_name) result.company_name = parts[1].trim();
        if (!result.location) result.location = parts[2].trim();
        return result;
      } else if (parts.length === 2) {
        if (!result.position) result.position = parts[0].trim();
        if (!result.company_name) result.company_name = parts[1].trim();
        return result;
      }
    }

    // 1. Format: "Position - Location at Company - Position - Location"
    if (cleanTitle.includes(' at ')) {
      const atParts = cleanTitle.split(' at ');
      const leftPart = atParts[0].trim();
      const rightPart = atParts[1].trim();

      // Right part contains company
      const rightSub = rightPart.split(' - ');
      result.company_name = rightSub[0].trim();

      // Left part contains position & location
      const leftSub = leftPart.split(' - ');
      result.position = leftSub[0].trim();
      if (leftSub.length > 1) {
        result.location = leftSub.slice(1).join(' - ').trim();
      }

      return result;
    }

    // 2. Format: "Company hiring Position in Location" (LinkedIn format)
    const hiringMatch = cleanTitle.match(/^(.+?)\s+hiring\s+(.+?)(?:\s+in\s+(.+))?$/i);
    if (hiringMatch) {
      result.company_name = hiringMatch[1].trim();
      result.position = hiringMatch[2].trim();
      if (hiringMatch[3] && !result.location) result.location = hiringMatch[3].trim();
      return result;
    }

    // 3. Format: "Mackolik — Istanbul, Türkiye" or "Mackolik - Istanbul, Turkey"
    if (cleanTitle.includes('—') || cleanTitle.includes('–')) {
      const parts = cleanTitle.split(/\s*[\u2014\u2013—–]\s*/);
      if (parts.length >= 2) {
        result.company_name = parts[0].trim();
        result.location = parts[1].trim();
      }
    }

    // Clean up any remaining dashes/pipes in company_name if set
    if (result.company_name) {
      result.company_name = result.company_name
        .replace(/\s*[\u2014\u2013—–|-].*$/, '')
        .replace(/\s*\|\s*.*$/, '')
        .trim();
    }

    return result;
  } catch {
    return localParsed;
  }
}
