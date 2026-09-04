import { detectPlatformFromUrl } from './platformUtils';

export interface ParsedJobUrl {
  company_name?: string;
  position?: string;
  location?: string;
  source?: string;
  logo_url?: string;
  work_type?: 'Remote' | 'Hybrid' | 'On-site';
}

/**
 * Detects Work Model (Remote, Hybrid, On-site) from any text string (title, description, URL params).
 */
export function detectWorkType(text: string | null | undefined): 'Remote' | 'Hybrid' | 'On-site' | undefined {
  if (!text) return undefined;
  const lower = text.toLowerCase();

  // If text says "on site or hybrid or remote", it represents an unselected multi-filter, skip
  if (lower.includes('on site or hybrid or remote') || lower.includes('on-site or hybrid or remote')) {
    return undefined;
  }

  // 1. Remote indicators
  if (/\b(remote|uzaktan|tamamen uzaktan|home office|evden|telecommute|work from home)\b/i.test(lower)) {
    return 'Remote';
  }

  // 2. Hybrid indicators
  if (/\b(hybrid|hibrit|karma|hibrit çalışma)\b/i.test(lower)) {
    return 'Hybrid';
  }

  // 3. On-site indicators
  if (/\b(on[- ]site|yerinde|ofis|ofiste|ofisten|iş yerinde)\b/i.test(lower)) {
    return 'On-site';
  }

  return undefined;
}

/**
 * Extracts and removes work model info (Remote, Hybrid, On-site) from a position title string.
 */
function extractWorkTypeAndClean(text: string): { cleaned: string; work_type?: 'Remote' | 'Hybrid' | 'On-site' } {
  if (!text) return { cleaned: '' };

  let cleaned = text;
  let work_type: 'Remote' | 'Hybrid' | 'On-site' | undefined = undefined;

  const lower = text.toLowerCase();

  // Detect specific work type before stripping
  if (/\b(remote|uzaktan)\b/i.test(lower) && !lower.includes('hybrid') && !lower.includes('on site') && !lower.includes('on-site')) {
    work_type = 'Remote';
  } else if (/\b(hybrid|hibrit)\b/i.test(lower) && !lower.includes('on site') && !lower.includes('on-site') && !lower.includes('remote')) {
    work_type = 'Hybrid';
  } else if (/\b(on[- ]site|ofiste?)\b/i.test(lower) && !lower.includes('hybrid') && !lower.includes('remote')) {
    work_type = 'On-site';
  }

  // Clean trailing / embedded work models from title
  cleaned = cleaned
    .replace(/,\s*on[- ]site or hybrid or remote/gi, '')
    .replace(/on[- ]site or hybrid or remote/gi, '')
    .replace(/,\s*(remote|uzaktan|hybrid|hibrit|on[- ]site|ofiste?)/gi, '')
    .replace(/\((remote|uzaktan|hybrid|hibrit|on[- ]site|ofiste?)\)/gi, '')
    .replace(/\[(remote|uzaktan|hybrid|hibrit|on[- ]site|ofiste?)\]/gi, '')
    .replace(/^[\s,–—-]+|[\s,–—-]+$/g, '')
    .trim();

  return { cleaned, work_type };
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

    // Detect work type from URL query parameters (e.g. LinkedIn f_WT)
    const f_WT = searchParams.get('f_WT');
    if (f_WT) {
      if (f_WT.includes('2')) result.work_type = 'Remote';
      else if (f_WT.includes('3')) result.work_type = 'Hybrid';
      else if (f_WT.includes('1')) result.work_type = 'On-site';
    }

    const wpt = searchParams.get('workplaceType');
    if (wpt && !result.work_type) {
      if (wpt.includes('2')) result.work_type = 'Remote';
      else if (wpt.includes('3')) result.work_type = 'Hybrid';
      else if (wpt.includes('1')) result.work_type = 'On-site';
    }

    // 1. LinkedIn Jobs
    if (hostname.includes('linkedin.com')) {
      result.source = 'LinkedIn';

      const match = pathname.match(/\/jobs\/(?:view|search|collections|search-results)\/([^/]+)/);
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

      // Check URL query params for explicit company
      if (searchParams.has('company') && !result.company_name) {
        result.company_name = formatSlugToText(searchParams.get('company') || '');
      }
      if (searchParams.has('companyName') && !result.company_name) {
        result.company_name = formatSlugToText(searchParams.get('companyName') || '');
      }

      // Check keywords for "Position at Company" or "Company - Position"
      if (searchParams.has('keywords') && (!result.position || !result.company_name)) {
        const rawKw = searchParams.get('keywords') || '';
        const { cleaned, work_type } = extractWorkTypeAndClean(rawKw);
        if (work_type && !result.work_type) result.work_type = work_type;

        if (cleaned.toLowerCase().includes(' at ')) {
          const atParts = cleaned.split(/ at /i);
          if (!result.position) result.position = formatSlugToText(atParts[0]);
          if (!result.company_name) result.company_name = formatSlugToText(atParts[1]);
        } else if (cleaned.includes(' - ')) {
          const dashParts = cleaned.split(' - ');
          if (!result.position) result.position = formatSlugToText(dashParts[0]);
          if (!result.company_name) result.company_name = formatSlugToText(dashParts[1]);
        } else if (!result.position && cleaned) {
          result.position = formatSlugToText(cleaned);
        }
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
      if (queryPos) {
        const { cleaned, work_type } = extractWorkTypeAndClean(queryPos);
        if (work_type && !result.work_type) result.work_type = work_type;
        result.position = formatSlugToText(cleaned);
      }
    }
  } catch {
    // Ignore invalid URL
  }

  // Clean position if work type is inside
  if (result.position) {
    const { cleaned, work_type } = extractWorkTypeAndClean(result.position);
    result.position = cleaned;
    if (work_type && !result.work_type) result.work_type = work_type;
  }

  return result;
}

/**
 * Asynchronously fetches metadata from webpage HTML (via microlink API).
 * Cleanly extracts Company, Position, Location, and Work Model.
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
    const description = (json?.data?.description as string) || '';
    const author = (json?.data?.author as string) || '';
    const publisher = (json?.data?.publisher as string) || '';
    const logoUrl = (json?.data?.logo?.url as string) || (json?.data?.image?.url as string) || undefined;

    const result: ParsedJobUrl = { 
      ...localParsed,
      logo_url: logoUrl || localParsed.logo_url 
    };

    // Detect Work Model from title or description
    if (!result.work_type) {
      result.work_type = detectWorkType(title) || detectWorkType(description);
    }

    // If author is a company name and not LinkedIn
    if (author && typeof author === 'string' && !author.toLowerCase().includes('linkedin') && !result.company_name) {
      result.company_name = author.trim();
    }

    // If description mentions "XYZ firmasında ... pozisyonu" (Turkish LinkedIn)
    if (description && typeof description === 'string' && !result.company_name) {
      const descMatchTr = description.match(/(.+?)\s+firmasında\s+(.+?)\s+pozisyonu/i);
      if (descMatchTr) {
        result.company_name = descMatchTr[1].trim();
        if (!result.position) result.position = descMatchTr[2].trim();
      } else {
        const descMatchEn = description.match(/^(.+?)\s+is hiring(?:\s+a|\s+an)?\s+(.+?)(?:\s+in\s+(.+))?$/i);
        if (descMatchEn) {
          result.company_name = descMatchEn[1].trim();
          if (!result.position) result.position = descMatchEn[2].trim();
          if (descMatchEn[3] && !result.location) result.location = descMatchEn[3].trim();
        }
      }
    }

    if (!title || typeof title !== 'string' || title.includes('Search | LinkedIn') || title === 'LinkedIn') {
      return result;
    }

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

    // 3. Format: "Company — Position" or "Company - Position"
    if (cleanTitle.includes('—') || cleanTitle.includes('–')) {
      const parts = cleanTitle.split(/\s*[\u2014\u2013—–]\s*/);
      if (parts.length >= 2) {
        if (!result.company_name) result.company_name = parts[0].trim();
        if (!result.position) result.position = parts[1].trim();
      }
    }

    // Clean up any remaining dashes/pipes in company_name if set
    if (result.company_name) {
      result.company_name = result.company_name
        .replace(/\s*[\u2014\u2013—–|-].*$/, '')
        .replace(/\s*\|\s*.*$/, '')
        .trim();
    }

    // Clean position if work type is inside
    if (result.position) {
      const { cleaned, work_type } = extractWorkTypeAndClean(result.position);
      result.position = cleaned;
      if (work_type && !result.work_type) result.work_type = work_type;
    }

    return result;
  } catch {
    return localParsed;
  }
}
