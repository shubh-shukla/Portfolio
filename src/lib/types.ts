import type { StaticImageData } from 'next/image';

export type TechDetails = {
  logo: string | StaticImageData;
  darkModeLogo?: string | StaticImageData;
  label: string;
  url: string;
};

export type ExperienceDetails = {
  logo: string | StaticImageData;
  darkModeLogo?: string | StaticImageData;
  logoAlt: string;
  company?: string;
  position: string;
  location?: string;
  currentlyWorkHere?: boolean;
  startDate: Date;
  endDate?: Date;
  summary: string[];
  skills?: string[];
  /** Tailwind color hint used for timeline dot + accent. */
  accent?: 'sky' | 'indigo' | 'emerald' | 'amber' | 'fuchsia' | 'rose';
};

export type ProjectKind = 'web' | 'mobile';

export type ProjectMedia = {
  src: string | StaticImageData;
  /** Optional dark-theme variant. When set and theme is dark, this is used. */
  srcDark?: string | StaticImageData;
  type?: 'image' | 'video';
  /** Poster image used as the video's first frame; loads ~50KB instead of MB. */
  poster?: string;
  caption?: string;
};

export type ProjectDetails = {
  name: string;
  tagline?: string;
  description: string;
  url?: string;
  /** Source-code link (GitHub, GitLab, etc). */
  githubUrl?: string;
  kind?: ProjectKind;
  /** When kind === 'mobile', whether to render images inside a phone frame.
   *  Set to false if the screenshots already contain device chrome. */
  framed?: boolean;
  media: ProjectMedia[];
  appStoreUrl?: string;
  playStoreUrl?: string;
  technologies: string[];
};

export type TestimonialDetails = {
  personName: string;
  personAvatar?: string | StaticImageData;
  testimonial: string;
  title: string;
  company: string;
};
