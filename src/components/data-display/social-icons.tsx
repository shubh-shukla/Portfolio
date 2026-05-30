'use client';

import { SOCIAL_LINKS } from '@/lib/data';
import IconButton from '@/components/general/icon-button';
import { track, logGithubClick } from '@/lib/analytics';

const SocialIcons = () => {
  return (
    <div className="flex gap-1">
      {SOCIAL_LINKS.map((socialLink, index) => (
        <IconButton
          key={index}
          onClick={() => {
            const network = socialLink.label || 'unknown';
            track('social_click', { network });
            if (/github/i.test(network) || /github\.com/.test(socialLink.url)) {
              logGithubClick('profile_social', socialLink.url);
            }
            window.open(socialLink.url, '_blank');
          }}
          aria-label={socialLink.label || 'social icon'}
          className="tilt-hover"
        >
          <socialLink.icon />
        </IconButton>
      ))}
    </div>
  );
};

export default SocialIcons;
