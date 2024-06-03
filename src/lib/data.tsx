import { Github, Linkedin, Twitter as X } from 'lucide-react';

import LogoJavascript from '/public/images/logos/icon-javascript.svg';
import LogoTypescript from '/public/images/logos/icon-typescript.svg';
import LogoReact from '/public/images/logos/icon-react.svg';
import LogoNextjs from '/public/images/logos/icon-nextjs.svg';
import LogoNodejs from '/public/images/logos/icon-nodejs.svg';
import LogoExpress from '/public/images/logos/icon-express.svg';
import LogoExpressLight from '/public/images/logos/icon-express-light.svg';
import Redux from '/public/images/logos/icon-redux.svg';
import LogoSocket from '/public/images/logos/icon-socket.svg';
import LogoSocketLight from '/public/images/logos/icon-socket-light.svg';
import LogoMongoDB from '/public/images/logos/icon-mongodb.svg';
import LogoD3js from '/public/images/logos/icon-d3js.svg';
import LogoSass from '/public/images/logos/icon-sass.svg';
import LogoTailwindcss from '/public/images/logos/icon-tailwindcss.svg';
import LogoFigma from '/public/images/logos/icon-figma.svg';
import LogoGit from '/public/images/logos/icon-git.svg';
import LogoJest from '/public/images/logos/icon-jest.svg';

import LogoMSI from '/public/images/logos/logo-msi.svg';
import LogoMSILight from '/public/images/logos/logo-msi-light.svg';
import LogoUpaayIndia from '/public/images/logos/logo-upaayindia.png';

import AvatarKartik from '/public/images/avatar-kartik.png';
import AvatarUjjwal from '/public/images/avatar-ujjwal.png';
import AvatarShekhar from '/public/images/avatar-shekhar.png';

import ChatSphere from '/public/images/chat-sphere.png';

import {
  ExperienceDetails,
  ProjectDetails,
  TechDetails,
  TestimonialDetails,
} from '@/lib/types';

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
  },
  {
    icon: X,
    url: 'https://x.com/shubh_shukla29',
  },
  {
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/shubham-shukla29',
  }
];

export const TECHNOLOGIES: TechDetails[] = [
  {
    label: 'Javascript',
    logo: LogoJavascript,
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    label: 'Typescript',
    logo: LogoTypescript,
    url: 'https://www.typescriptlang.org/',
  },
  {
    label: 'React',
    logo: LogoReact,
    url: 'https://react.dev/',
  },
  {
    label: 'React Native',
    logo: LogoReact,
    url: 'https://reactnative.dev/',
  },
  {
    label: 'Next.js',
    logo: LogoNextjs,
    url: 'https://nextjs.org/',
  },
  {
    label: 'Node.js',
    logo: LogoNodejs,
    url: 'https://nodejs.org/en',
  },
  {
    label: 'Express.js',
    logo: LogoExpress,
    darkModeLogo: LogoExpressLight,
    url: 'https://expressjs.com/',
  },
  {
    label: 'Redux',
    logo: Redux,
    url: 'https://redux.js.org/',
  },
  {
    label: 'Socket.io',
    logo: LogoSocket,
    darkModeLogo: LogoSocketLight,
    url: 'https://socket.io/',
  },
  {
    label: 'MongoDB',
    logo: LogoMongoDB,
    url: 'https://www.mongodb.com/',
  },
  {
    label: 'D3js',
    logo: LogoD3js,
    url: 'https://d3js.org/',
  },
  {
    label: 'Sass/Scss',
    logo: LogoSass,
    url: 'https://sass-lang.com/',
  },
  {
    label: 'Tailwindcss',
    logo: LogoTailwindcss,
    url: 'https://tailwindcss.com/',
  },
  {
    label: 'Figma',
    logo: LogoFigma,
    url: 'https://www.figma.com/',
  },
  {
    label: 'Jest',
    logo: LogoJest,
    url: 'https://jestjs.io/',
  },
  {
    label: 'Git',
    logo: LogoGit,
    url: 'https://git-scm.com/',
  },
];

export const EXPERIENCES: ExperienceDetails[] = [
  {
    logo: LogoMSI,
    darkModeLogo: LogoMSILight,
    logoAlt: 'Metricstream logo',
    position: 'Member of Technical Staff',
    startDate: new Date(2021, 7),
    currentlyWorkHere: true,
    summary: [
      "Modernized the front-end framework, transitioning from BackboneJS to ReactJS, significantly boosting the GRC application's scalability and maintainability.",
      "Successfully led the migration of all charts within a GRC application, transitioning from Fusion Charts to D3, enhancing data visualization and interactivity.",
      "Fostered cross-functional collaboration to align project requirements and seamlessly integrate components.",
      "Worked on Audits & Survey Mobile Application",
      "Taking care of Enhancement requests proposed during the development cycle",
    ],
  },
  {
    logo: LogoUpaayIndia,
    logoAlt: 'Upaay India logo',
    position: 'Web Developer - Intern',
    startDate: new Date(2020, 11),
    endDate: new Date(2021, 1),
    summary: [
      'Acted as team lead in different projects.',
      'Brainstormed new ideas & gathered requirements for internal projects.',
      'Designed architecture of different projects (frontend + backend).',
      'Handled sprint planning & task distribution.',
    ],
  }
];

export const PROJECTS: ProjectDetails[] = [
  {
    name: 'ChatSphere',
    description:
      'This Realtime Chat App is a dynamic web application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It harnesses the power of WenSockets for seamless and real-time communication, enabling users to engage in instant messaging with ease.',
    url: 'https://github.com/shubh-shukla/ChatSphere',
    previewImage: "https://res.cloudinary.com/shubham-node/image/upload/v1716134122/Chat_umvhrx.png",
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
    name: 'XtraTune',
    description: "Crafted a sleek and intuitive song streaming application using Next.js and React.js, seamlessly integrating navigation and playback functionalities for an enhanced user experience.",
    url: 'https://github.com/shubh-shukla/XtraTune',
    previewImage: "https://res.cloudinary.com/shubham-node/image/upload/v1717314084/Screenshot_2024-06-02_at_1.07.27_PM_f2zoye.png",
    technologies: [
      'Next.js',
      'React.js',
      'Radix UI',
      'Typescript',
      'Tailwindcss'
    ],
  }
];

export const TESTIMONIALS: TestimonialDetails[] = [
  {
    personName: 'Ujjwal Kumar',
    personAvatar: AvatarUjjwal,
    title: 'Member of Technical Staff - Metricstream',
    testimonial:
      'Shubham and I joined Metricstream together after college. It\'s been around 3 years that we worked together on multiple challenging project. He is always willing to work hard and stick with a task until completed. In addition he consistently demonstrated an ability to work with many different people in a successful manner.He always brings a new perspective to the table. He is goal driven and always delivers more than what is expected. He strives for excellence and makes no compromises on quality. I have personally learnt a great deal from him and his way of working.',
  },
  {
    personName: 'Kartik Subramaniam',
    personAvatar: AvatarKartik,
    title: 'Technical Architect - Metricstream',
    testimonial:
      'I worked with Shubham during my journey in Metricstream. We contributed to multiple projects in our Mobile apps team. I must say, he\'s a highly enthusiastic engineer who can quickly learn new technologies. He has a huge potential to build great products from scratch. He respectfully challenge decisions and insist on high standards. He consistently exceeded expectations, delivering high-quality work within tight deadlines. His strong analytical skills and attention to detail were invaluable to our team.',
  },
  {
    personName: 'Shekhar Dubey',
    personAvatar: AvatarShekhar,
    title: 'Member of Technical Staff - Metricstream',
    testimonial:
      'Shubham is a sincere & hard working guy who finds his way through most of challenging projects. He is a quick learner and aspires to reach newer heights all the time. He\'s a great person to work with and always try to build great solutions. He worked in Mobile as well as Web Apps team for Metricstream where he built products from scratch. He\'s self driven and focuses on developing high quality end product while meeting the deadlines.He will be an asset to any organization, wishing him the very best for all his professional endeavors.',
  },
];
