'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/**
 * Mounts once at the root and silently tracks ambient interactions:
 *   - Section views (one-shot IntersectionObserver per <section id="…">)
 *   - Scroll-depth milestones (25 / 50 / 75 / 100)
 *   - Outbound link clicks (any anchor opening in a new tab)
 *   - Time on page (sent on tab hide / unload)
 *
 * Component-specific events (CTA labels, copy buttons, project expand, etc.)
 * stay co-located with their components and call `track()` directly.
 *
 * Renders nothing.
 */
const AnalyticsAutoTracker = () => {
  useEffect(() => {
    const startedAt = Date.now();
    const cleanups: Array<() => void> = [];

    /* ─── section views ─────────────────────────────────────────── */
    const sectionsSeen = new Set<string>();
    const sections = document.querySelectorAll<HTMLElement>('section[id], main [id]');
    if (sections.length && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const id = entry.target.id;
            if (!id || sectionsSeen.has(id)) continue;
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
              sectionsSeen.add(id);
              track('section_view', { section: id });
            }
          }
        },
        { threshold: [0.4] }
      );
      sections.forEach((el) => obs.observe(el));
      cleanups.push(() => obs.disconnect());
    }

    /* ─── scroll-depth milestones ───────────────────────────────── */
    const milestones = [25, 50, 75, 100];
    const milestonesHit = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop + window.innerHeight;
      const total = doc.scrollHeight;
      if (total <= 0) return;
      const pct = Math.min(100, Math.round((scrolled / total) * 100));
      for (const m of milestones) {
        if (pct >= m && !milestonesHit.has(m)) {
          milestonesHit.add(m);
          track('scroll_depth', { percent: m });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', onScroll));

    /* ─── outbound link clicks ──────────────────────────────────── */
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a') as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;
      try {
        const url = new URL(anchor.href, window.location.href);
        const isExternal = url.host && url.host !== window.location.host;
        if (isExternal) {
          track('outbound_click', {
            host: url.host,
            href: url.href,
            label: (anchor.textContent || '').trim().slice(0, 60),
          });
        }
      } catch {
        /* ignore malformed hrefs */
      }
    };
    document.addEventListener('click', onClick, { capture: true });
    cleanups.push(() => document.removeEventListener('click', onClick, { capture: true } as any));

    /* ─── time on page ──────────────────────────────────────────── */
    const sendTimeOnPage = () => {
      const seconds = Math.round((Date.now() - startedAt) / 1000);
      if (seconds < 2) return; // discard accidental loads
      track('time_on_page', { seconds });
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') sendTimeOnPage();
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', sendTimeOnPage);
    cleanups.push(() => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', sendTimeOnPage);
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
};

export default AnalyticsAutoTracker;
