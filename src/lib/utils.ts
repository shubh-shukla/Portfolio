import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const mergeClasses = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Sanitize a media path so it's a valid Supabase Storage object key.
 * Supabase rejects keys containing characters like `|`. We replace anything
 * outside the safe set with `_`. Slashes and dots are preserved.
 * Must match the sanitization in scripts/upload-media.mjs.
 */
export const sanitizeMediaKey = (path: string): string =>
  path.replace(/[^A-Za-z0-9._\-/ ]/g, '_');

/**
 * Resolve a media path. Behavior for `/media/projects/...`:
 *   - If `NEXT_PUBLIC_MEDIA_BASE_URL` is set → rewrite to that public origin
 *     (use this with a public Supabase bucket).
 *   - Else if `NEXT_PUBLIC_MEDIA_PROXY` is "1" → rewrite to the same-origin
 *     signed-URL proxy at `/api/media/...` (use this with a private bucket).
 *   - Else → leave untouched (served from /public locally).
 * Absolute http(s) URLs and non-project paths always pass through.
 */
export const mediaUrl = (path: string): string => {
  if (!path || typeof path !== 'string') return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (!path.startsWith('/media/projects/')) return path;

  const safe = sanitizeMediaKey(path);
  const encoded = safe
    .split('/')
    .map((seg, i) => (i === 0 ? seg : encodeURIComponent(seg)))
    .join('/');

  const publicBase = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
  if (publicBase) return `${publicBase.replace(/\/$/, '')}${encoded}`;

  if (process.env.NEXT_PUBLIC_MEDIA_PROXY === '1') {
    return `/api/media${encoded}`;
  }

  return path;
};

export const copyTextToClipboard = async (text: string) => {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
};
