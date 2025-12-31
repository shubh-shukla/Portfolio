'use client';

import { useState } from 'react';
import { Copy, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

import SocialIcons from '@/components/data-display/social-icons';
import Tag from '@/components/data-display/tag';
import IconButton from '@/components/general/icon-button';
import Typography from '@/components/general/typography';
import Container from '@/components/layout/container';
import useWindowSize from '@/hooks/use-window-size';
import { copyTextToClipboard } from '@/lib/utils';

let email = 'shukla111shubh@gmail.com';
let phone = '+91 8868886697';

type CopyValue = 'email' | 'phone';

const ContactSection = () => {
  const { width } = useWindowSize();
  const [isCopied, setIsCopied] = useState(false);
  const [copiedValueType, setCopiedValueType] = useState<CopyValue | null>(
    null
  );

  const handleCopyClick = async (text: string, type: CopyValue) => {
    try {
      await copyTextToClipboard(text);
      setIsCopied(true);
      setCopiedValueType(type);
      let timoutId: any = setTimeout(() => {
        setIsCopied(false);
        setCopiedValueType(null);
        clearTimeout(timoutId);
      }, 1500);
    } catch (error) {
      setIsCopied(false);
      setCopiedValueType(null);
      alert('Unable to copy!');
    }
  };

  return (
    <Container id="contact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-80">
        <div className="absolute left-[-8%] top-6 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.2),rgba(14,165,233,0))] blur-3xl" />
        <div className="absolute right-[-6%] bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),rgba(99,102,241,0))] blur-3xl" />
      </div>

      <div className="flex flex-col items-center gap-4 text-gray-900 dark:text-white">
        <div className="self-center">
          <Tag label="Get in touch" />
        </div>
        <Typography variant="subtitle" className="max-w-2xl text-center">
          Looking for a senior who can lead delivery and still stay hands-on? Let&apos;s talk.
        </Typography>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8">
        <div className="grid w-full gap-4 md:grid-cols-1">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200/80 bg-white/85 p-6 shadow-[0_20px_80px_-50px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/12 dark:bg-[rgba(8,12,24,0.9)] dark:shadow-[0_28px_95px_-54px_rgba(0,0,0,0.85)]">
            <div className="flex flex-wrap items-center justify-center gap-4 text-gray-800 dark:text-white">
              <Mail className="h-6 w-6 md:h-7 md:w-7" />
              <Link href={`mailto:${email}`}>
                <Typography variant="h2" className="text-gray-900 dark:text-white">
                  {email}
                </Typography>
              </Link>
              <IconButton
                size={width && width < 768 ? 'md' : 'lg'}
                onClick={() => handleCopyClick(email, 'email')}
                showTooltip={isCopied && copiedValueType === 'email'}
                tooltipText="Copied!"
                className="border border-gray-200/80 bg-white/80 text-gray-800 hover:border-gray-300 hover:bg-white dark:border-white/22 dark:bg-[rgba(8,12,24,0.9)] dark:text-white dark:hover:border-white/30 dark:hover:bg-[rgba(8,12,24,0.97)]"
              >
                <Copy />
              </IconButton>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-gray-800 dark:text-white">
              <Phone className="h-6 w-6 md:h-7 md:w-7" />
              <Link href={`tel:${phone.replace(' ', '')}`}>
                <Typography variant="h2" className="text-gray-900 dark:text-white">
                  {phone}
                </Typography>
              </Link>
              <IconButton
                size={width && width < 768 ? 'md' : 'lg'}
                onClick={() => handleCopyClick(phone.replace(' ', ''), 'phone')}
                showTooltip={isCopied && copiedValueType === 'phone'}
                tooltipText="Copied!"
                className="border border-gray-200/80 bg-white/80 text-gray-800 hover:border-gray-300 hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/20"
              >
                <Copy />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-gray-800 dark:text-white">
          <Typography className="text-center text-gray-700 dark:text-white/85">
            You may also find me on these platforms.
          </Typography>
          <SocialIcons />
        </div>
      </div>
    </Container>
  );
};

export default ContactSection;
