'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { useTheme } from 'next-themes';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  Github,
  Pause,
  Play,
  X,
} from 'lucide-react';

import {
  ProjectDetails as ProjectDetailsType,
  ProjectMedia,
} from '@/lib/types';
import { mergeClasses } from '@/lib/utils';
import Typography from '@/components/general/typography';
import Link from '@/components/navigation/link';
import Tag from '@/components/data-display/tag';
import Card from '@/components/layout/card';

type ProjectDetailsProps = ProjectDetailsType & {
  layoutType: 'default' | 'reverse';
};

const isVideo = (m: ProjectMedia) => m.type === 'video';

const ProjectDetails = ({
  name,
  tagline,
  description,
  technologies,
  url,
  githubUrl,
  media,
  kind = 'web',
  framed = true,
  appStoreUrl,
  playStoreUrl,
  layoutType = 'default',
}: ProjectDetailsProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openLightbox = (i: number) => setLightboxIndex(i);

  // Resolve theme-aware src once; downstream components keep using `m.src`.
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === 'dark';
  const resolvedMedia = useMemo<ProjectMedia[]>(
    () => {
      const mapped = media.map((m) => ({
        ...m,
        src: isDark && m.srcDark ? m.srcDark : m.src,
      }));
      // Stable sort: videos first, images after.
      return [...mapped].sort((a, b) => {
        const av = a.type === 'video' ? 0 : 1;
        const bv = b.type === 'video' ? 0 : 1;
        return av - bv;
      });
    },
    [media, isDark]
  );

  return (
    <Card className="group/card relative mx-auto flex w-full max-w-6xl flex-col overflow-hidden md:flex-row">
      {/* Gradient halo on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-sky-400/0 via-indigo-400/0 to-fuchsia-400/0 opacity-0 blur-2xl transition-opacity duration-700 group-hover/card:from-sky-400/30 group-hover/card:via-indigo-400/30 group-hover/card:to-fuchsia-400/30 group-hover/card:opacity-100"
      />

      {/* Media */}
      <div
        className={mergeClasses(
          'relative flex items-center justify-center overflow-hidden p-6 md:w-1/2 lg:p-10',
          kind === 'mobile'
            ? 'bg-[radial-gradient(120%_120%_at_0%_0%,rgba(125,211,252,0.25),transparent_55%),radial-gradient(120%_120%_at_100%_100%,rgba(196,181,253,0.28),transparent_55%),linear-gradient(180deg,#f8fafc,#eef2ff)] dark:bg-[radial-gradient(120%_120%_at_0%_0%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(120%_120%_at_100%_100%,rgba(168,85,247,0.18),transparent_55%),linear-gradient(180deg,#06080f,#0b0f22)]'
            : 'bg-[radial-gradient(120%_120%_at_0%_0%,rgba(56,189,248,0.18),transparent_55%),linear-gradient(180deg,#ffffff,#f1f5f9)] dark:bg-[radial-gradient(120%_120%_at_0%_0%,rgba(56,189,248,0.14),transparent_55%),linear-gradient(180deg,#06080f,#0a0f1f)]',
          'dark:border dark:border-white/10',
          layoutType === 'default'
            ? 'md:rounded-l-2xl md:border-r md:border-white/10'
            : 'md:order-last md:rounded-r-2xl md:border-l md:border-white/10'
        )}
      >
        {kind === 'mobile' ? (
          framed ? (
            <PhoneCarousel media={resolvedMedia} name={name} onExpand={openLightbox} />
          ) : (
            <UnframedMobileCarousel
              media={resolvedMedia}
              name={name}
              onExpand={openLightbox}
            />
          )
        ) : (
          <BrowserCarousel
            media={resolvedMedia}
            name={name}
            url={url}
            onExpand={openLightbox}
          />
        )}
      </div>

      {/* Content */}
      <div
        className={mergeClasses(
          'relative flex flex-col gap-5 p-8 md:w-1/2 lg:p-12 text-gray-800 dark:text-white',
          layoutType === 'default' ? '' : 'md:order-first'
        )}
      >
        {tagline && (
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-slate-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/70">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {tagline}
          </span>
        )}

        <Typography variant="subtitle" className="font-semibold">
          {name}
        </Typography>

        <Typography className="text-gray-700 dark:text-white/80">
          {description}
        </Typography>

        <div className="flex flex-wrap gap-2">
          {technologies?.map((t, i) => (
            <Tag key={i} label={t} />
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-1 flex flex-wrap items-center gap-3">
          {appStoreUrl && <AppStoreBadge href={appStoreUrl} />}
          {playStoreUrl && <PlayStoreBadge href={playStoreUrl} />}
          {url && (
            <Link
              href={url}
              externalLink
              noCustomization
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-900/10 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
            >
              Visit project
              <ArrowUpRight size={16} />
            </Link>
          )}
          {githubUrl && (
            <Link
              href={githubUrl}
              externalLink
              noCustomization
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-900/10 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <Github size={16} />
              Source
            </Link>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        media={resolvedMedia}
        name={name}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </Card>
  );
};

export default ProjectDetails;

/* ================================================================== */
/*  Shared carousel hook                                               */
/* ================================================================== */

const useAutoAdvance = (
  length: number,
  delay: number,
  paused: boolean,
  enabled: boolean
) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled || paused || length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % length),
      delay
    );
    return () => clearInterval(id);
  }, [length, delay, paused, enabled]);

  return [index, setIndex] as const;
};

/* ================================================================== */
/*  Browser / web carousel                                             */
/* ================================================================== */

type CarouselProps = {
  media: ProjectMedia[];
  name: string;
  url?: string;
  onExpand: (i: number) => void;
};

const BrowserCarousel = ({ media, name, url, onExpand }: CarouselProps) => {
  const [paused, setPaused] = useState(false);
  // Disable auto-advance on slides that are videos (video controls itself)
  const activeIsVideoRef = useRef(false);
  const [index, setIndex] = useAutoAdvance(
    media.length,
    5000,
    paused || activeIsVideoRef.current,
    true
  );

  const active = media[index];
  activeIsVideoRef.current = isVideo(active);

  const host = useMemo(() => {
    if (!url) return name.toLowerCase().replace(/\s+/g, '') + '.app';
    try {
      return new URL(url).host.replace(/^www\./, '');
    } catch {
      return url;
    }
  }, [url, name]);

  return (
    <div
      className="flex w-full max-w-[520px] flex-col gap-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Browser chrome */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
        {/* Top bar */}
        <div className="flex items-center gap-2 border-b border-slate-200/80 bg-slate-100/70 px-3 py-2 dark:border-white/10 dark:bg-white/[0.04]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex-1 truncate rounded-md bg-white/80 px-2 py-0.5 text-[11px] text-slate-500 dark:bg-black/40 dark:text-white/60">
            {host}
          </div>
        </div>

        {/* Slides */}
        <div className="relative aspect-[16/10] w-full bg-black/5 dark:bg-black/40">
          {media.map((m, i) => (
            <div
              key={i}
              className={mergeClasses(
                'absolute inset-0 transition-all duration-700 ease-out',
                i === index
                  ? 'translate-x-0 opacity-100'
                  : i < index
                  ? '-translate-x-3 opacity-0'
                  : 'translate-x-3 opacity-0'
              )}
              aria-hidden={i !== index}
            >
              {isVideo(m) ? (
                <InlineVideo
                  src={m.src as string}
                  poster={m.poster}
                  active={i === index}
                  onEnded={() => setIndex((index + 1) % media.length)}
                />
              ) : (
                <Image
                  src={m.src}
                  alt={`${name} preview ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 520px"
                  className="object-cover"
                  priority={i === 0}
                  loading={i === 0 ? undefined : 'eager'}
                  unoptimized
                />
              )}
            </div>
          ))}

          {/* Hover overlay */}
          <button
            type="button"
            onClick={() => onExpand(index)}
            className="absolute inset-0 flex items-end justify-end p-3 opacity-0 transition-opacity duration-300 hover:opacity-100"
            aria-label="Expand"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              <Expand size={14} /> Expand
            </span>
          </button>

          {/* Progress strip */}
          {media.length > 1 && (
            <ProgressStrip
              total={media.length}
              index={index}
              paused={paused || activeIsVideoRef.current}
              duration={5000}
            />
          )}
        </div>
      </div>

      {/* Thumbs */}
      {media.length > 1 && (
        <ThumbRail
          media={media}
          index={index}
          onSelect={setIndex}
          name={name}
        />
      )}
    </div>
  );
};

/* ================================================================== */
/*  Phone carousel                                                     */
/* ================================================================== */

const PhoneCarousel = ({ media, name, onExpand }: CarouselProps) => {
  const [paused, setPaused] = useState(false);
  const activeIsVideoRef = useRef(false);
  const [index, setIndex] = useAutoAdvance(
    media.length,
    3500,
    paused || activeIsVideoRef.current,
    true
  );
  const active = media[index];
  activeIsVideoRef.current = isVideo(active);

  return (
    <div
      className="flex flex-col items-center gap-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Frame */}
      <div className="relative">
        {/* Soft side reflections */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-tr from-sky-300/30 via-fuchsia-300/20 to-transparent opacity-50 blur-2xl dark:from-sky-500/20 dark:via-fuchsia-500/20"
        />

        <button
          type="button"
          onClick={() => onExpand(index)}
          aria-label={`Expand ${name} screenshot ${index + 1}`}
          className="group/phone relative box-content aspect-[9/19.5] w-[240px] rounded-[2.4rem] border-[8px] border-slate-900 bg-slate-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-1 hover:rotate-[-1deg] dark:border-slate-950 dark:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)] sm:w-[260px]"
        >
          {/* Side buttons */}
          <span className="absolute -left-[10px] top-20 h-8 w-[3px] rounded-l bg-slate-700 dark:bg-slate-800" />
          <span className="absolute -left-[10px] top-32 h-12 w-[3px] rounded-l bg-slate-700 dark:bg-slate-800" />
          <span className="absolute -left-[10px] top-48 h-12 w-[3px] rounded-l bg-slate-700 dark:bg-slate-800" />
          <span className="absolute -right-[10px] top-28 h-16 w-[3px] rounded-r bg-slate-700 dark:bg-slate-800" />

          {/* Screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-white">
            {media.map((m, i) => (
              <div
                key={i}
                className={mergeClasses(
                  'absolute inset-0 transition-all duration-700 ease-out',
                  i === index
                    ? 'translate-x-0 opacity-100'
                    : i < index
                    ? '-translate-x-6 opacity-0'
                    : 'translate-x-6 opacity-0'
                )}
                aria-hidden={i !== index}
              >
                {isVideo(m) ? (
                  <InlineVideo
                    src={m.src as string}
                    poster={m.poster}
                    active={i === index}
                    fit="contain"
                    onEnded={() => setIndex((index + 1) % media.length)}
                  />
                ) : (
                  <Image
                    src={m.src}
                    alt={`${name} screenshot ${i + 1}`}
                    fill
                    sizes="260px"
                    className="object-contain"
                    priority={i === 0}
                    loading={i === 0 ? undefined : 'eager'}
                    unoptimized
                  />
                )}
              </div>
            ))}

            {/* Hover hint */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 transition-opacity duration-300 group-hover/phone:opacity-100">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                <Expand size={12} /> Tap to expand
              </span>
            </div>

            {/* Progress on screen edge */}
            {media.length > 1 && (
              <ProgressStrip
                total={media.length}
                index={index}
                paused={paused || activeIsVideoRef.current}
                duration={3500}
                variant="phone"
              />
            )}
          </div>
        </button>
      </div>

      {/* Dots */}
      {media.length > 1 && (
        <div className="flex max-w-[260px] flex-wrap items-center justify-center gap-1.5">
          {media.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show screenshot ${i + 1}`}
              className={mergeClasses(
                'h-1.5 rounded-full transition-all',
                i === index
                  ? 'w-6 bg-slate-900 dark:bg-white'
                  : 'w-1.5 bg-slate-400/50 hover:bg-slate-600 dark:bg-white/30 dark:hover:bg-white/70'
              )}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-white/50">
        {index + 1} / {media.length} · auto-rotating
      </span>
    </div>
  );
};

/* ================================================================== */
/*  Unframed mobile carousel (screenshots already contain device chrome)*/
/* ================================================================== */

const UnframedMobileCarousel = ({ media, name, onExpand }: CarouselProps) => {
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useAutoAdvance(media.length, 3500, paused, true);

  return (
    <div
      className="flex w-full flex-col items-center gap-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        {/* Soft glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-tr from-sky-300/30 via-fuchsia-300/20 to-transparent opacity-50 blur-2xl dark:from-sky-500/20 dark:via-fuchsia-500/20"
        />

        <button
          type="button"
          onClick={() => onExpand(index)}
          aria-label={`Expand ${name} screenshot ${index + 1}`}
          className="group/img relative block aspect-[9/19.5] h-[520px] w-auto overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1 dark:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)] sm:h-[600px]"
        >
          {media.map((m, i) => (
            <div
              key={i}
              className={mergeClasses(
                'absolute inset-0 transition-all duration-700 ease-out',
                i === index
                  ? 'translate-x-0 opacity-100'
                  : i < index
                  ? '-translate-x-6 opacity-0'
                  : 'translate-x-6 opacity-0'
              )}
              aria-hidden={i !== index}
            >
              <Image
                src={m.src}
                alt={`${name} screenshot ${i + 1}`}
                fill
                sizes="320px"
                className="object-contain"
                priority={i === 0}
                loading={i === 0 ? undefined : 'eager'}
                unoptimized
              />
            </div>
          ))}

          {/* Hover hint */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
              <Expand size={12} /> Tap to expand
            </span>
          </div>

          {/* Progress */}
          {media.length > 1 && (
            <ProgressStrip
              total={media.length}
              index={index}
              paused={paused}
              duration={3500}
              variant="phone"
            />
          )}
        </button>
      </div>

      {/* Dots */}
      {media.length > 1 && (
        <div className="flex max-w-[260px] flex-wrap items-center justify-center gap-1.5">
          {media.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show screenshot ${i + 1}`}
              className={mergeClasses(
                'h-1.5 rounded-full transition-all',
                i === index
                  ? 'w-6 bg-slate-900 dark:bg-white'
                  : 'w-1.5 bg-slate-400/50 hover:bg-slate-600 dark:bg-white/30 dark:hover:bg-white/70'
              )}
            />
          ))}
        </div>
      )}

      <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-white/50">
        {index + 1} / {media.length} · auto-rotating
      </span>
    </div>
  );
};

/* ================================================================== */
/*  Inline video (autoplay, muted, loop, hover-to-unmute control)      */
/* ================================================================== */

const InlineVideo = ({
  src,
  active,
  poster,
  fit = 'cover',
  onEnded,
}: {
  src: string;
  active: boolean;
  poster?: string;
  fit?: 'cover' | 'contain';
  onEnded?: () => void;
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [inView, setInView] = useState(false);

  // Observe whether the video tile is meaningfully visible in the viewport.
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.75 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Play only when the slide is active AND on-screen.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active && inView) {
      v.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      v.pause();
      setPlaying(false);
      if (!active) {
        try {
          v.currentTime = 0;
        } catch {}
      }
    }
  }, [active, inView]);

  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div ref={wrapperRef} className="relative h-full w-full bg-black">
      {active ? (
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          playsInline
          autoPlay
          preload="auto"
          onEnded={onEnded}
          className={mergeClasses('h-full w-full', fitClass)}
        />
      ) : poster ? (
        // Cheap placeholder while inactive — no mp4 fetch happens.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className={mergeClasses('h-full w-full', fitClass)}
        />
      ) : (
        <div className={mergeClasses('h-full w-full bg-black', fitClass)} />
      )}
      <div
        className="absolute bottom-2 left-2 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 hover:opacity-100"
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            const v = ref.current;
            if (!v) return;
            if (v.paused) {
              v.play();
              setPlaying(true);
            } else {
              v.pause();
              setPlaying(false);
            }
          }}
          className="rounded-full bg-black/60 p-1.5 text-white backdrop-blur hover:bg-black/80"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
      {/* Always-visible muted hint */}
      <div className="absolute right-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur">
        VIDEO
      </div>
    </div>
  );
};

/* ================================================================== */
/*  Progress strip                                                      */
/* ================================================================== */

const ProgressStrip = ({
  total,
  index,
  paused,
  duration,
  variant = 'web',
}: {
  total: number;
  index: number;
  paused: boolean;
  duration: number;
  variant?: 'web' | 'phone';
}) => (
  <div
    className={mergeClasses(
      'pointer-events-none absolute left-0 right-0 z-10 flex gap-1 px-3',
      variant === 'web' ? 'top-2' : 'top-2'
    )}
  >
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/25"
      >
        <div
          className={mergeClasses(
            'h-full bg-white/90 transition-all',
            i < index && 'w-full',
            i > index && 'w-0',
            i === index && !paused && 'animate-[grow_var(--d)_linear_forwards]',
            i === index && paused && 'w-1/2'
          )}
          style={
            i === index
              ? ({ ['--d' as any]: `${duration}ms` } as React.CSSProperties)
              : undefined
          }
        />
      </div>
    ))}
    <style jsx>{`
      @keyframes grow {
        from {
          width: 0%;
        }
        to {
          width: 100%;
        }
      }
    `}</style>
  </div>
);

/* ================================================================== */
/*  Thumb rail                                                          */
/* ================================================================== */

const ThumbRail = ({
  media,
  index,
  onSelect,
  name,
}: {
  media: ProjectMedia[];
  index: number;
  onSelect: (i: number) => void;
  name: string;
}) => (
  <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {media.map((m, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onSelect(i)}
        aria-label={`Show ${i + 1}`}
        className={mergeClasses(
          'relative h-12 w-20 flex-shrink-0 overflow-hidden rounded-md border transition-all',
          i === index
            ? 'border-sky-400 ring-2 ring-sky-400/40'
            : 'border-slate-200/70 opacity-60 hover:opacity-100 dark:border-white/10'
        )}
      >
        {isVideo(m) ? (
          <div className="flex h-full w-full items-center justify-center bg-black text-white">
            <Play size={14} />
          </div>
        ) : (
          <Image
            src={m.src}
            alt={`${name} thumb ${i + 1}`}
            fill
            sizes="80px"
            className="object-cover"
            unoptimized
          />
        )}
      </button>
    ))}
  </div>
);

/* ================================================================== */
/*  Store badges                                                        */
/* ================================================================== */

const StoreBadgeBase = ({
  href,
  topLabel,
  bottomLabel,
  icon,
}: {
  href: string;
  topLabel: string;
  bottomLabel: string;
  icon: React.ReactNode;
}) => (
  <Link
    href={href}
    externalLink
    noCustomization
    className="inline-flex items-center gap-3 rounded-xl border border-slate-900/90 bg-slate-900 px-4 py-2 text-white transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
  >
    <span className="text-white">{icon}</span>
    <span className="flex flex-col leading-tight">
      <span className="text-[10px] uppercase tracking-wide text-white/70">
        {topLabel}
      </span>
      <span className="text-sm font-semibold text-white">{bottomLabel}</span>
    </span>
  </Link>
);

const AppStoreBadge = ({ href }: { href: string }) => (
  <StoreBadgeBase
    href={href}
    topLabel="Download on the"
    bottomLabel="App Store"
    icon={
      <svg width="22" height="22" viewBox="0 0 384 512" fill="currentColor" aria-hidden>
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM256.4 105c30.1-35.7 27.4-68.2 26.5-79.9-26.6 1.5-57.4 18.1-74.9 38.5-19.3 21.9-30.6 49-28.1 78.4 28.7 2.2 54.9-12.5 76.5-37z" />
      </svg>
    }
  />
);

const PlayStoreBadge = ({ href }: { href: string }) => (
  <StoreBadgeBase
    href={href}
    topLabel="Get it on"
    bottomLabel="Google Play"
    icon={
      <svg width="20" height="22" viewBox="0 0 512 512" aria-hidden>
        <path fill="#34A853" d="M48 60.4C48 47.5 53.1 36 61.7 27.6L284.3 250 61.6 472.4C53.1 464 48 452.5 48 439.6V60.4z" />
        <path fill="#FBBC04" d="M361.7 327.4 284.3 250l77.5-77.4 87.4 50.5c11 6.3 17.7 17.6 17.7 30.2v-6.6c0 12.6-6.7 24-17.7 30.3l-87.5 50.4z" />
        <path fill="#EA4335" d="M82.9 482c-7.3-1-13.9-3.7-19.3-7.7l223.7-223.7L361.7 327.4l-244.5 141c-10.6 6.1-23.1 7.5-34.3 4.6z" />
        <path fill="#4285F4" d="M82.9 18c11.2-2.9 23.6-1.5 34.3 4.6l244.5 141.1L284.3 250 63.6 29.7c5.4-4 12-6.7 19.3-7.7z" />
      </svg>
    }
  />
);

/* ================================================================== */
/*  Lightbox                                                            */
/* ================================================================== */

type LightboxProps = {
  media: ProjectMedia[];
  name: string;
  index: number | null;
  onClose: () => void;
  onChange: (i: number) => void;
};

const Lightbox = ({ media, name, index, onClose, onChange }: LightboxProps) => {
  const open = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % media.length);
  }, [index, media.length, onChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + media.length) % media.length);
  }, [index, media.length, onChange]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, next, prev]);

  const active = index !== null ? media[index] : null;

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md" />
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col outline-none">
          <Dialog.Title className="sr-only">{name} screenshots</Dialog.Title>

          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{name}</span>
              {active?.caption && (
                <span className="text-xs text-white/60">{active.caption}</span>
              )}
            </div>
            <Dialog.Close
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <X size={20} />
            </Dialog.Close>
          </div>

          {/* Main */}
          <div className="relative flex flex-1 items-center justify-center px-4">
            {media.length > 1 && (
              <button
                type="button"
                onClick={prev}
                aria-label="Previous"
                className="absolute left-2 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {active && (
              <div className="flex h-full max-h-[78vh] w-full max-w-6xl items-center justify-center">
                {isVideo(active) ? (
                  <video
                    src={active.src as string}
                    poster={active.poster}
                    controls
                    autoPlay
                    className="max-h-[78vh] w-auto max-w-full rounded-xl shadow-2xl"
                  />
                ) : (
                  <Image
                    src={active.src}
                    alt={`${name} ${index! + 1}`}
                    width={1800}
                    height={1200}
                    className="h-auto max-h-[78vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                    unoptimized
                  />
                )}
              </div>
            )}

            {media.length > 1 && (
              <button
                type="button"
                onClick={next}
                aria-label="Next"
                className="absolute right-2 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-6"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Bottom thumb rail */}
          {media.length > 1 && (
            <div className="flex items-center justify-center gap-2 overflow-x-auto px-4 pb-5 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {media.map((m, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onChange(i)}
                  aria-label={`Show ${i + 1}`}
                  className={mergeClasses(
                    'relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all',
                    i === index
                      ? 'border-sky-400 opacity-100'
                      : 'border-white/10 opacity-50 hover:opacity-100'
                  )}
                >
                  {isVideo(m) ? (
                    <div className="flex h-full w-full items-center justify-center bg-black text-white">
                      <Play size={16} />
                    </div>
                  ) : (
                    <Image
                      src={m.src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Counter */}
          {index !== null && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur sm:bottom-28">
              {index + 1} / {media.length}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
