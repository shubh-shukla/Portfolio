/**
 * Lightweight analytics shim.
 *
 * Sends custom events to whichever providers happen to be loaded on the page:
 *   - Umami (window.umami) — privacy-friendly counts + custom events
 *   - Microsoft Clarity (window.clarity) — heatmaps + session replay tags
 *
 * If neither script is loaded (e.g. in dev without env vars set, or while a
 * user has an ad-blocker enabled) every call is a silent no-op. Never throws.
 *
 * Usage:
 *   import { track } from '@/lib/analytics';
 *   track('cv_download', { source: 'hero' });
 */

type EventData = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: EventData) => void;
    };
    clarity?: (...args: unknown[]) => void;
  }
}

export const track = (event: string, data?: EventData): void => {
  if (typeof window === 'undefined') return;
  try {
    window.umami?.track(event, data);
  } catch {
    /* swallow — analytics must never break the UI */
  }
  try {
    // Clarity uses tagged sessions: clarity('set', key, value) attaches
    // arbitrary metadata to the current session, and clarity('event', name)
    // marks a named event in the replay timeline.
    window.clarity?.('event', event);
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          window.clarity?.('set', key, String(value));
        }
      }
    }
  } catch {
    /* swallow */
  }
};

/**
 * Collects coarse client-side device/locale info and POSTs it to one of our
 * own /api/* endpoints (cv-click, github-click, …). Mirrors the body shape
 * that `/api/cv-click` already expects so each backend route can stay simple.
 *
 * Uses `navigator.sendBeacon` when available (survives navigation away),
 * falls back to `fetch` with `keepalive`. Never throws.
 */
export const postClickEvent = (
  endpoint: string,
  extra: Record<string, string> = {}
): void => {
  if (typeof window === 'undefined') return;
  try {
    const nav = window.navigator as any;
    const ua: string = nav?.userAgent || '';

    let browser = 'Other';
    if (/Edg\//.test(ua)) browser = 'Edge';
    else if (/OPR\//.test(ua) || /Opera/.test(ua)) browser = 'Opera';
    else if (/CriOS\//.test(ua) || /Chrome\//.test(ua)) browser = 'Chrome';
    else if (/Firefox\//.test(ua)) browser = 'Firefox';
    else if (/Safari\//.test(ua)) browser = 'Safari';

    let os = 'Other';
    if (/Windows/.test(ua)) os = 'Windows';
    else if (/Android/.test(ua)) os = 'Android';
    else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';
    else if (/Mac OS/.test(ua)) os = 'macOS';
    else if (/Linux/.test(ua)) os = 'Linux';
    else if (/CrOS/.test(ua)) os = 'ChromeOS';

    const params = new URLSearchParams({
      browser,
      os,
      language: nav?.language || '',
      referrer: document.referrer || '',
      screen: `${screen.width}x${screen.height}`,
      timezone: Intl?.DateTimeFormat?.()?.resolvedOptions?.()?.timeZone || '',
      mobile: String(nav?.maxTouchPoints > 0),
      ...extra,
    });
    const body = params.toString();

    if (nav?.sendBeacon) {
      const blob = new Blob([body], {
        type: 'application/x-www-form-urlencoded',
      });
      nav.sendBeacon(endpoint, blob);
      return;
    }

    void fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      keepalive: true,
    });
  } catch {
    /* never break the UI on logging failures */
  }
};

/**
 * Convenience: log a GitHub-button click to Upstash + Umami + Clarity.
 *   source — 'profile' for hero/social, or the project name
 *   target — full GitHub URL the click is leading to
 */
export const logGithubClick = (source: string, target: string): void => {
  postClickEvent('/api/github-click', { source, target });
  track('github_click', { source, target });
};
