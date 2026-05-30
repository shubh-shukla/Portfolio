'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from '@/components/navigation/drawer';
import { NAV_LINKS } from '@/lib/data';
import { mergeClasses } from '@/lib/utils';
import useWindowSize from '@/hooks/use-window-size';
import useScroll from '@/hooks/use-scroll';
import Link from '@/components/navigation/link';
import ThemeSwitcher from '@/components/general/theme-switcher';
import IconButton from '@/components/general/icon-button';
import DownloadCV from '@/components/general/download-cv';
import Typography from '@/components/general/typography';
import { track } from '@/lib/analytics';

const Logo = () => (
  <span className="inline-flex items-center gap-2">
    <span
      aria-hidden
      className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 text-[11px] font-black text-white shadow-[0_6px_18px_-6px_rgba(99,102,241,0.7)]"
    >
      SS
    </span>
    <Typography variant="h3" className="font-bold tracking-tight">
      Shubham
    </Typography>
  </span>
);

const Header = () => {
  const scrolled = useScroll(40);
  const [isOpen, setIsOpen] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    if (size?.width && size?.width > 767 && isOpen) {
      setIsOpen(false);
    }
  }, [size, isOpen]);

  return (
    <header className="sticky top-0 z-30 w-full px-4 pt-3 md:px-6 md:pt-4">
      <div
        className={mergeClasses(
          'mx-auto flex w-full max-w-6xl items-center justify-between gap-4',
          'rounded-2xl px-3 py-2 md:px-4',
          'transition-all duration-300',
          // glass surface
          'bg-white/55 ring-1 ring-inset ring-white/60 backdrop-blur-2xl backdrop-saturate-[1.6]',
          'dark:bg-[#0b1224]/55 dark:ring-white/10',
          // shadow grows when scrolled
          scrolled
            ? 'shadow-[0_22px_70px_-30px_rgba(15,23,42,0.45)] dark:shadow-[0_28px_90px_-40px_rgba(0,0,0,0.9)]'
            : 'shadow-[0_10px_40px_-30px_rgba(15,23,42,0.25)]',
          // top specular line
          'before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:h-px',
          'before:bg-gradient-to-r before:from-transparent before:via-white/85 before:to-transparent',
          'dark:before:via-white/30',
          'relative'
        )}
      >
        <Link
          href="/"
          noCustomization
          className="text-slate-900 dark:text-white"
        >
          <Logo />
        </Link>

        {/* Desktop center nav */}
        <nav className="hidden md:flex">
          <ul className="flex list-none items-center gap-1">
            {NAV_LINKS.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  noCustomization
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-900/5 hover:text-slate-950 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
                  onClick={() => track('nav_click', { link: link.label, location: 'header' })}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeSwitcher />
          <DownloadCV />
        </div>

        {/* Mobile trigger */}
        <Drawer
          open={isOpen}
          onOpenChange={(open) => {
            if (open) track('drawer_open');
            setIsOpen(open);
          }}
        >
          <DrawerTrigger asChild className="flex md:hidden">
            <IconButton>
              <Menu />
            </IconButton>
          </DrawerTrigger>
          <DrawerContent>
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
              <Logo />
              <DrawerClose asChild>
                <IconButton>
                  <X />
                </IconButton>
              </DrawerClose>
            </div>
            <div className="border-b border-gray-100 p-4">
              <ul className="flex list-none flex-col gap-4">
                {NAV_LINKS.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      onClick={() => {
                        track('nav_click', { link: link.label, location: 'drawer' });
                        const timeoutId = setTimeout(() => {
                          setIsOpen(false);
                          clearTimeout(timeoutId);
                        }, 500);
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex items-center justify-between">
                <Typography>Switch Theme</Typography>
                <ThemeSwitcher />
              </div>
              <DownloadCV />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
