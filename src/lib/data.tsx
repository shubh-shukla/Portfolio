import { Github, Linkedin, Twitter as X } from 'lucide-react';

import LogoJavascript from '/public/media/tech/javascript.svg';
import LogoTypescript from '/public/media/tech/typescript.svg';
import LogoReact from '/public/media/tech/react.svg';
import LogoNextjs from '/public/media/tech/nextjs.svg';
import LogoNodejs from '/public/media/tech/nodejs.svg';
import LogoExpress from '/public/media/tech/express.svg';
import LogoExpressLight from '/public/media/tech/express-light.svg';
import Redux from '/public/media/tech/redux.svg';
import LogoSocket from '/public/media/tech/socket.svg';
import LogoSocketLight from '/public/media/tech/socket-light.svg';
import LogoMongoDB from '/public/media/tech/mongodb.svg';
import LogoD3js from '/public/media/tech/d3js.svg';
import LogoSass from '/public/media/tech/sass.svg';
import LogoTailwindcss from '/public/media/tech/tailwindcss.svg';
import LogoFigma from '/public/media/tech/figma.svg';
import LogoGit from '/public/media/tech/git.svg';
import LogoJest from '/public/media/tech/jest.svg';
import LogoIOS from '/public/media/tech/ios.svg';
import LogoIOSLight from '/public/media/tech/ios-light.svg';
import LogoAndroid from '/public/media/tech/android.svg';
import LogoStorybook from '/public/media/tech/storybook.svg';
import LogoXcode from '/public/media/tech/xcode.svg';
import LogoAndroidStudio from '/public/media/tech/android-studio.svg';
import LogoPostman from '/public/media/tech/postman.svg';
import LogoRealm from '/public/media/tech/realm.svg';
import LogoJenkins from '/public/media/tech/jenkins.svg';
import LogoGraphQL from '/public/media/tech/graphql.svg';
import LogoGithubActions from '/public/media/tech/github-actions.svg';
import LogoFirebase from '/public/media/tech/firebase.svg';
import LogoSentry from '/public/media/tech/sentry.svg';
import LogoCypress from '/public/media/tech/cypress.svg';
import LogoDetox from '/public/media/tech/detox.svg';

import LogoMSI from '/public/media/brands/msi.svg';
import LogoMSILight from '/public/media/brands/msi-light.svg';
import LogoUpaayIndia from '/public/media/brands/upaayindia.png';
import LogoACV from '/public/media/brands/acv.png';

import AvatarKartik from '/public/media/people/kartik.png';
import AvatarUjjwal from '/public/media/people/ujjwal.png';
import AvatarShekhar from '/public/media/people/shekhar.png';

import {
  ExperienceDetails,
  ProjectDetails,
  TechDetails,
  TestimonialDetails,
} from '@/lib/types';
import { mediaUrl } from '@/lib/utils';

export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com/shubh-shukla',
  GITHUB_REPO: 'https://github.com/shubh-shukla/Portfolio',
  X: 'https://x.com/shubh_shukla29',
  LINKEDIN: 'https://www.linkedin.com/in/shubham-shukla29/',
  NEXTJS: 'https://nextjs.org/'
  // FIGMA: 'https://www.figma.com/',
  // FIGMA_FILE:
  //   '',
};

export const NAV_LINKS = [
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Skills',
    href: '#skills',
  },
  {
    label: 'How I work',
    href: '#how-i-work',
  },
  {
    label: 'Work',
    href: '#work',
  },
  {
    label: 'Testimonials',
    href: '#testimonials',
  },
  {
    label: 'Contact',
    href: '#contact',
  },
];

export const SOCIAL_LINKS = [
  {
    icon: Github,
    url: 'https://github.com/shubh-shukla',
    label: 'GitHub',
  },
  {
    icon: X,
    url: 'https://x.com/shubh_shukla29',
    label: 'X',
  },
  {
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/shubham-shukla29',
    label: 'LinkedIn',
  }
];

const TECH = {
  javascript: { label: 'Javascript', logo: LogoJavascript, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  typescript: { label: 'Typescript', logo: LogoTypescript, url: 'https://www.typescriptlang.org/' },
  react: { label: 'React', logo: LogoReact, url: 'https://react.dev/' },
  reactNative: { label: 'React Native', logo: LogoReact, url: 'https://reactnative.dev/' },
  nextjs: { label: 'Next.js', logo: LogoNextjs, url: 'https://nextjs.org/' },
  redux: { label: 'Redux', logo: Redux, url: 'https://redux.js.org/' },
  tailwind: { label: 'Tailwindcss', logo: LogoTailwindcss, url: 'https://tailwindcss.com/' },
  sass: { label: 'Sass/Scss', logo: LogoSass, url: 'https://sass-lang.com/' },
  d3: { label: 'D3js', logo: LogoD3js, url: 'https://d3js.org/' },
  ios: { label: 'iOS', logo: LogoIOS, darkModeLogo: LogoIOSLight, url: 'https://developer.apple.com/ios/' },
  android: { label: 'Android', logo: LogoAndroid, url: 'https://developer.android.com/' },
  xcode: { label: 'Xcode', logo: LogoXcode, url: 'https://developer.apple.com/xcode/' },
  androidStudio: { label: 'Android Studio', logo: LogoAndroidStudio, url: 'https://developer.android.com/studio' },
  detox: { label: 'Detox', logo: LogoDetox, url: 'https://wix.github.io/Detox/' },
  realm: { label: 'Realm', logo: LogoRealm, url: 'https://realm.io/' },
  firebase: { label: 'Firebase', logo: LogoFirebase, url: 'https://firebase.google.com/' },
  graphql: { label: 'GraphQL', logo: LogoGraphQL, url: 'https://graphql.org/' },
  socket: { label: 'Socket.io', logo: LogoSocket, darkModeLogo: LogoSocketLight, url: 'https://socket.io/' },
  jest: { label: 'Jest', logo: LogoJest, url: 'https://jestjs.io/' },
  cypress: { label: 'Cypress', logo: LogoCypress, url: 'https://www.cypress.io/' },
  storybook: { label: 'Storybook', logo: LogoStorybook, url: 'https://storybook.js.org/' },
  sentry: { label: 'Sentry', logo: LogoSentry, url: 'https://sentry.io/' },
  figma: { label: 'Figma', logo: LogoFigma, url: 'https://www.figma.com/' },
  git: { label: 'Git', logo: LogoGit, url: 'https://git-scm.com/' },
  githubActions: { label: 'GitHub Actions', logo: LogoGithubActions, url: 'https://github.com/features/actions' },
  jenkins: { label: 'Jenkins', logo: LogoJenkins, url: 'https://www.jenkins.io/' },
  postman: { label: 'Postman', logo: LogoPostman, url: 'https://www.postman.com/' },
  nodejs: { label: 'Node.js', logo: LogoNodejs, url: 'https://nodejs.org/en' },
  express: { label: 'Express.js', logo: LogoExpress, darkModeLogo: LogoExpressLight, url: 'https://expressjs.com/' },
  mongodb: { label: 'MongoDB', logo: LogoMongoDB, url: 'https://www.mongodb.com/' },
} satisfies Record<string, TechDetails>;

export const TECHNOLOGY_GROUPS: { title: string; items: TechDetails[] }[] = [
  {
    title: 'Core',
    items: [TECH.react, TECH.reactNative, TECH.nextjs, TECH.typescript, TECH.javascript, TECH.redux],
  },
  {
    title: 'Styling & Visualization',
    items: [TECH.tailwind, TECH.sass, TECH.d3, TECH.figma],
  },
  {
    title: 'Quality & Tooling',
    items: [TECH.jest, TECH.cypress, TECH.storybook, TECH.sentry, TECH.git, TECH.githubActions, TECH.jenkins, TECH.postman],
  },
  {
    title: 'Mobile',
    items: [TECH.ios, TECH.android, TECH.xcode, TECH.androidStudio, TECH.detox, TECH.realm, TECH.firebase],
  },
  {
    title: 'Data & Realtime',
    items: [TECH.graphql, TECH.socket],
  },
  {
    title: 'Backend',
    items: [TECH.nodejs, TECH.express, TECH.mongodb],
  },
];

export const TECHNOLOGIES: TechDetails[] = TECHNOLOGY_GROUPS.flatMap((g) => g.items);

export const EXPERIENCES: ExperienceDetails[] = [
  {
    logo: LogoACV,
    logoAlt: 'ACV logo',
    company: 'ACV Auctions',
    position: 'Software Engineer 2',
    startDate: new Date(2024, 10),
    currentlyWorkHere: true,
    accent: 'sky',
    skills: ['React Native', 'Typescript', 'iOS', 'Android', 'Redux', 'Jest'],
    summary: [
      'Contributing to the development and optimization of the Vehicle Inspection App using React Native for both iOS and Android platforms',
      'Developing and implementing new features to enhance user experience and meet business requirements',
      'Writing clean, maintainable code and conducting code reviews to uphold best practices',
      'Addressing bugs and enhancing app stability through rigorous testing and debugging',
      'Performing rigorous testing (unit, integration, and UI tests) to ensure stability and reliability',
    ],
  },
  {
    logo: LogoMSI,
    darkModeLogo: LogoMSILight,
    logoAlt: 'Metricstream logo',
    company: 'MetricStream',
    position: 'Senior Member of Technical Staff',
    startDate: new Date(2024, 6),
    endDate: new Date(2024, 9),
    accent: 'indigo',
    skills: ['React.js', 'Next.js', 'AgGrid', 'Typescript', 'iOS', 'Android'],
    summary: [
      'Led the development of Audit Plan and Scope modules from scratch using AgGrid and React.js',
      'Modernized the frontend framework, transitioning from Backbone.js to Next.js',
      'Managing the development and management for Mobile Apps (iOS/Android) delivering exceptional user experiences.',
      'Creating shareable modules that can be used across 10+ products',
      'Taking care of Enhancement requests proposed during the development cycle',
    ],
  },
  {
    logo: LogoMSI,
    darkModeLogo: LogoMSILight,
    logoAlt: 'Metricstream logo',
    company: 'MetricStream',
    position: 'Member of Technical Staff',
    startDate: new Date(2021, 7),
    endDate: new Date(2024, 5),
    accent: 'indigo',
    skills: ['React Native', 'Javascript', 'Redux', 'D3.js', 'Detox', 'Jest', 'AWS'],
    summary: [
      'Developed hybrid mobile apps for Android and iOS using React Native, JavaScript, and Redux',
      'Developed and integrated CyberGRC with AWS Audit Manager',
      'Led the migration of all charts within a GRC application, transitioning from Fusion Charts to D3, delivering advanced scorecards, reports, and trend charts',
      'Integrated Detox and Jest for end-to-end test automation',
      'Executed feature migration to use React Native\u2019s new architecture',
      'Fostered cross-functional collaboration to align project requirements and seamlessly integrate components',
    ],
  },
  {
    logo: LogoUpaayIndia,
    logoAlt: 'Upaay India logo',
    company: 'Upaay India',
    position: 'Web Developer \u2014 Intern',
    startDate: new Date(2020, 11),
    endDate: new Date(2021, 1),
    accent: 'emerald',
    skills: ['HTML', 'CSS', 'Javascript', 'Node.js'],
    summary: [
      'Acted as team lead in different projects.',
      'Brainstormed new ideas & gathered requirements for internal projects.',
      'Designed architecture of different projects (frontend + backend).',
      'Handled sprint planning & task distribution.',
    ],
  },
];

const RAW_PROJECTS: ProjectDetails[] = [
  {
    name: 'ACV Pro',
    tagline: 'iOS & Android · 2024 — Present',
    description:
      "ACV's self-inspection app used by certified dealers to inspect vehicles in the field and list them on ACV's nationwide marketplace. Built native flows for guided inspection, OBD-II diagnostics via BlueDriver, photo capture, and offline sync.",
    kind: 'mobile',
    framed: false,
    url: '',
    githubUrl: '',
    media: [
      { src: '/media/projects/acv-inspection-app/ios-1.webp', caption: 'iOS' },
      { src: '/media/projects/acv-inspection-app/ios-2.webp', caption: 'iOS' },
      { src: '/media/projects/acv-inspection-app/ios-3.webp', caption: 'iOS' },
      { src: '/media/projects/acv-inspection-app/ios-4.webp', caption: 'iOS' },
      { src: '/media/projects/acv-inspection-app/android-1.webp', caption: 'Android' },
      { src: '/media/projects/acv-inspection-app/android-2.webp', caption: 'Android' },
      { src: '/media/projects/acv-inspection-app/android-3.webp', caption: 'Android' },
      { src: '/media/projects/acv-inspection-app/android-4.webp', caption: 'Android' },
      { src: '/media/projects/acv-inspection-app/android-5.webp', caption: 'Android' },
    ],
    appStoreUrl: 'https://apps.apple.com/us/app/acv-pro/id6477305313',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.acvauctions.acvpro&hl=en_IN',
    technologies: ['React Native', 'Typescript', 'iOS', 'Android', 'Redux'],
  },
  {
    name: 'XtraTune',
    tagline: 'Music streaming UI · Web · Side project',
    description:
      'A sleek song streaming app built with Next.js, Radix UI and Tailwind — focused on smooth navigation, polished playback controls and a delightful listening experience.',
    kind: 'web',
    url: 'https://github.com/shubh-shukla/XtraTune',
    githubUrl: '',
    media: [
      {
        src: '/media/projects/xtratune-web/light-1.webp',
        srcDark: '/media/projects/xtratune-web/dark-1.webp',
      },
      {
        src: '/media/projects/xtratune-web/light-2.webp',
        srcDark: '/media/projects/xtratune-web/dark-2.webp',
      },
      {
        src: '/media/projects/xtratune-web/light-3.webp',
        srcDark: '/media/projects/xtratune-web/dark-3.webp',
      },
      {
        src: '/media/projects/xtratune-web/light-4.webp',
        srcDark: '/media/projects/xtratune-web/dark-4.webp',
      },
      {
        src: '/media/projects/xtratune-web/light-5.webp',
        srcDark: '/media/projects/xtratune-web/dark-5.webp',
      },
    ],
    technologies: ['Next.js', 'React.js', 'Radix UI', 'Typescript', 'Tailwindcss'],
  },
  {
    name: 'XtraTune Mobile',
    tagline: 'Music streaming · iOS & Android · Side project',
    description:
      'The mobile companion to XtraTune — a React Native build of the same streaming experience with native playback, offline downloads, and a tactile, gesture-driven UI.',
    kind: 'mobile',
    framed: true,
    url: '',
    githubUrl: '',
    media: [
      { src: '/media/projects/xtratune-mobile/video-1.mp4', type: 'video', poster: '/media/projects/xtratune-mobile/video-1.poster.webp' },
      { src: '/media/projects/xtratune-mobile/video-2.mp4', type: 'video', poster: '/media/projects/xtratune-mobile/video-2.poster.webp' },
      { src: '/media/projects/xtratune-mobile/video-3.mp4', type: 'video', poster: '/media/projects/xtratune-mobile/video-3.poster.webp' },
      { src: '/media/projects/xtratune-mobile/video-4.mp4', type: 'video', poster: '/media/projects/xtratune-mobile/video-4.poster.webp' },
      { src: '/media/projects/xtratune-mobile/video-5.mp4', type: 'video', poster: '/media/projects/xtratune-mobile/video-5.poster.webp' },
      { src: '/media/projects/xtratune-mobile/video-6.mp4', type: 'video', poster: '/media/projects/xtratune-mobile/video-6.poster.webp' },
      { src: '/media/projects/xtratune-mobile/video-7.mp4', type: 'video', poster: '/media/projects/xtratune-mobile/video-7.poster.webp' },
      { src: '/media/projects/xtratune-mobile/video-8.mp4', type: 'video', poster: '/media/projects/xtratune-mobile/video-8.poster.webp' },
      { src: '/media/projects/xtratune-mobile/video-9.mp4', type: 'video', poster: '/media/projects/xtratune-mobile/video-9.poster.webp' },
      { src: '/media/projects/xtratune-mobile/screen-1.webp' },
      { src: '/media/projects/xtratune-mobile/screen-2.webp' },
      { src: '/media/projects/xtratune-mobile/screen-3.webp' },
      { src: '/media/projects/xtratune-mobile/screen-4.webp' },
      { src: '/media/projects/xtratune-mobile/screen-5.webp' },
      { src: '/media/projects/xtratune-mobile/screen-6.webp' },
    ],
    technologies: ['React Native', 'Typescript', 'Redux', 'Tailwindcss'],
  },
  {
    name: 'ChatSphere',
    tagline: 'Realtime MERN chat · Web · Side project',
    description:
      'A realtime chat app built on the MERN stack with WebSockets for instant messaging, presence indicators, media sharing via Cloudinary and a clean Tailwind UI.',
    kind: 'web',
    url: 'https://my-chatsphere.vercel.app/',
    githubUrl: '',
    media: [
      {
        src: '/media/projects/chat-sphere/light-1.webp',
        srcDark: '/media/projects/chat-sphere/dark-1.webp',
      },
      { src: '/media/projects/chat-sphere/architecture.webp' },
    ],
    technologies: [
      'React.js',
      'Node.js',
      'MongoDB',
      'Express.js',
      'Javascript',
      'Tailwindcss',
      'WebSockets',
      'Cloudinary',
    ],
  },
  {
    name: 'MetricStream Mobile · M7',
    tagline: 'Next-gen GRC companion · iOS & Android',
    description:
      "The rebuilt M7 generation of MetricStream's enterprise GRC mobile app. Modernized the navigation model, design system and offline-first workflow engine. Covers issue management, audit observations, approvals and on-the-go GRC actions.",
    kind: 'mobile',
    framed: false,
    url: '',
    githubUrl: '',
    media: [
      { src: '/media/projects/metricstream-grc/m7/screen-1.webp' },
      { src: '/media/projects/metricstream-grc/m7/screen-2.webp' },
      { src: '/media/projects/metricstream-grc/m7/screen-3.webp' },
      { src: '/media/projects/metricstream-grc/m7/screen-4.webp' },
      { src: '/media/projects/metricstream-grc/m7/screen-5.webp' },
      { src: '/media/projects/metricstream-grc/m7/screen-6.webp' },
      { src: '/media/projects/metricstream-grc/m7/screen-7.webp' },
      { src: '/media/projects/metricstream-grc/m7/screen-8.webp' },
    ],
    technologies: ['React Native', 'Typescript', 'iOS', 'Android', 'Redux', 'Realm'],
  },
  {
    name: 'D3 Charting System',
    tagline: "Shared visualization layer powering MetricStream's GRC suite",
    description:
      "Designed and built a reusable D3-based charting and dashboarding system used across MetricStream's GRC products — ERM, ORM, CyberGRC, IRCM, Compliance Management and AiSPIRE. Drives every analytics surface you see in those product pages.",
    kind: 'web',
    url: '',
    githubUrl: '',
    media: [
      { src: '/media/projects/d3-charting-system/01-erm-banner.webp', caption: 'Enterprise Risk Management' },
      { src: '/media/projects/d3-charting-system/02-erm-analytics.webp', caption: 'ERM analytics' },
      { src: '/media/projects/d3-charting-system/03-orm.webp', caption: 'Operational Risk Management' },
      { src: '/media/projects/d3-charting-system/04-orm-dashboards.webp', caption: 'ORM dashboards' },
      { src: '/media/projects/d3-charting-system/05-cybergrc.webp', caption: 'CyberGRC' },
      { src: '/media/projects/d3-charting-system/06-cybergrc-charts.webp', caption: 'CyberGRC charts' },
      { src: '/media/projects/d3-charting-system/07-compliance.webp', caption: 'Compliance Management' },
      { src: '/media/projects/d3-charting-system/08-ircm.webp', caption: 'IRCM' },
      { src: '/media/projects/d3-charting-system/09-aispire.webp', caption: 'AiSPIRE — AI-based GRC' },
      { src: '/media/projects/d3-charting-system/10-rcm.webp', caption: 'Risk & Control Matrix' },
      { src: '/media/projects/d3-charting-system/11-rem.webp', caption: 'Regulatory Engagement' },
      { src: '/media/projects/d3-charting-system/12-cim.webp', caption: 'Continuous Issue Mgmt' },
      { src: '/media/projects/d3-charting-system/13-dark-mode.jpeg', caption: 'Dark mode' },
    ],
    technologies: ['D3.js', 'React.js', 'Typescript', 'Sass', 'SVG'],
  },
  {
    name: 'MetricStream Mobile · Euphrates',
    tagline: 'Original GRC companion · iOS & Android',
    description:
      "The original Euphrates-era MetricStream GRC mobile app. Shipped end-to-end mobile workflows for audit observations, issue management, risk assessments and approvals — synced with the core M7 enterprise platform.",
    kind: 'mobile',
    framed: false,
    url: '',
    githubUrl: '',
    media: [
      { src: '/media/projects/metricstream-grc/euphrates/screen-1.webp' },
      { src: '/media/projects/metricstream-grc/euphrates/screen-2.webp' },
      { src: '/media/projects/metricstream-grc/euphrates/screen-3.webp' },
      { src: '/media/projects/metricstream-grc/euphrates/screen-4.webp' },
      { src: '/media/projects/metricstream-grc/euphrates/screen-5.webp' },
      { src: '/media/projects/metricstream-grc/euphrates/screen-6.webp' },
      { src: '/media/projects/metricstream-grc/euphrates/screen-7.webp' },
      { src: '/media/projects/metricstream-grc/euphrates/screen-8.webp' },
    ],
    technologies: ['React Native', 'Javascript', 'iOS', 'Android', 'Redux'],
  },
  {
    name: 'CyberGRC',
    tagline: 'Cyber risk & compliance product · Web',
    description:
      "MetricStream's CyberGRC product — an enterprise platform for managing IT & cyber risk, threat and vulnerability management, third-party cyber posture and continuous control assessments. Contributed to the assessment workflows and dashboarding UI.",
    kind: 'web',
    url: 'https://www.metricstream.com/products/cyber-grc.htm',
    githubUrl: '',
    media: [
      { src: '/media/projects/cybergrc/overview.mp4', type: 'video', poster: '/media/projects/cybergrc/overview.poster.webp' },
      { src: '/media/projects/cybergrc/screen-2.webp' },
      { src: '/media/projects/cybergrc/screen-1.webp' },
    ],
    technologies: ['React.js', 'Typescript', 'Redux', 'D3.js', 'Sass'],
  },
];

export const PROJECTS: ProjectDetails[] = RAW_PROJECTS.map((p) => ({
  ...p,
  media: p.media?.map((m) => ({
    ...m,
    src: typeof m.src === 'string' ? mediaUrl(m.src) : m.src,
    srcDark:
      typeof m.srcDark === 'string' ? mediaUrl(m.srcDark) : m.srcDark,
    poster: m.poster ? mediaUrl(m.poster) : m.poster,
  })),
}));

export const TESTIMONIALS: TestimonialDetails[] = [
  {
    personName: 'Ujjwal Kumar',
    personAvatar: AvatarUjjwal,
    title: 'Senior Member of Technical Staff',
    company: 'Metricstream',
    testimonial:
      'Shubham and I joined Metricstream together after college. It\'s been around 3 years that we worked together on multiple challenging project. He is always willing to work hard and stick with a task until completed. In addition he consistently demonstrated an ability to work with many different people in a successful manner.He always brings a new perspective to the table. He is goal driven and always delivers more than what is expected. He strives for excellence and makes no compromises on quality. I have personally learnt a great deal from him and his way of working.',
  },
  {
    personName: 'Kartik Subramaniam',
    personAvatar: AvatarKartik,
    title: 'Technical Architect',
    company: 'Metricstream',
    testimonial:
      'I worked with Shubham during my journey in Metricstream. We contributed to multiple projects in our Mobile apps team. I must say, he\'s a highly enthusiastic engineer who can quickly learn new technologies. He has a huge potential to build great products from scratch. He respectfully challenge decisions and insist on high standards. He consistently exceeded expectations, delivering high-quality work within tight deadlines. His strong analytical skills and attention to detail were invaluable to our team.',
  },
  {
    personName: 'Shekhar Dubey',
    personAvatar: AvatarShekhar,
    title: 'Senior Member of Technical Staff',
    company: 'Metricstream',
    testimonial:
      'Shubham is a sincere & hard working guy who finds his way through most of challenging projects. He is a quick learner and aspires to reach newer heights all the time. He\'s a great person to work with and always try to build great solutions. He worked in Mobile as well as Web Apps team for Metricstream where he built products from scratch. He\'s self driven and focuses on developing high quality end product while meeting the deadlines.He will be an asset to any organization, wishing him the very best for all his professional endeavors.',
  },
];
