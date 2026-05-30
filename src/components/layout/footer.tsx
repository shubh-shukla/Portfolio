'use client';

import { Copyright } from 'lucide-react';

import Typography from '@/components/general/typography';
import Link from '@/components/navigation/link';
import { EXTERNAL_LINKS } from '@/lib/data';
import { logGithubClick } from '@/lib/analytics';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 py-6">
      <div className="flex items-center justify-center gap-1">
        <Typography className="flex items-center" variant="body3">
          <Copyright className="mr-1 inline-block h-4 w-4" />
          {new Date().getFullYear()} |&nbsp;
          Designed
          and&nbsp;
          <Link
            noCustomization
            externalLink
            withUnderline
            href={EXTERNAL_LINKS.GITHUB_REPO}
            onClick={() =>
              logGithubClick('footer_repo', EXTERNAL_LINKS.GITHUB_REPO)
            }
          >
            coded
          </Link>
          {/* &nbsp;with ❤️️ by Shubham Shukla */}
          &nbsp;with&nbsp;
          <Link
            noCustomization
            externalLink
            withUnderline
            href={EXTERNAL_LINKS.NEXTJS}
          >
            NextJS
          </Link>
          &nbsp;by{' '}
          <span
            className="font-signature text-base font-semibold leading-none text-gray-900"
            style={{ fontFamily: 'var(--font-signature), cursive' }}
          >
            Shubham Shukla
          </span>
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
