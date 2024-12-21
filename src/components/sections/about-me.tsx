import Image from 'next/image';

import AboutMeImage from '/public/images/aboutme-image.webp';
import Tag from '@/components/data-display/tag';
import Container from '@/components/layout/container';
import Typography from '@/components/general/typography';
import Link from '@/components/navigation/link';
import { EXTERNAL_LINKS } from '@/lib/data';

const AboutMeSection = () => {
  return (
    <Container className="bg-gray-50" id="about">
      <div className="self-center">
        <Tag label="About me" />
      </div>

      <div className="flex w-full flex-col justify-between gap-12 md:flex-row">
        {/* Image */}
        <div className="flex justify-center items-center md:order-first md:justify-end">
          <div className="relative h-[380px] w-[320px] md:h-[460px] md:w-[380px] lg:h-[520px] lg:w-[440px]">
            <Image
              src={AboutMeImage}
              alt="Featured Image"
              className="absolute z-10 h-[360px] w-[280px] border-8 border-gray-50 max-md:left-5 md:right-0 md:top-0 md:h-[420px] md:w-[340px] lg:h-[480px] lg:w-[400px]"
              style={{ objectFit: 'cover' }}
            ></Image>
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col gap-6">
          <Typography variant="h3">
            Curious about me? Here you have it:
          </Typography>
          <Typography>
            Welcome to my realm as a dynamic application developer! 🌟<br /><br />
            I&apos;m a passionate Full Stack Engineer
            who specializes in full stack development for both web and mobile. I am
            enthusiastic about bringing the technical and visual aspects of
            digital products to life. User experience, pixel perfect design, and
            writing clear, readable, highly performant code matters to me.
          </Typography>
          <Typography>
            Embarking on my journey into app development in 2021 was just the beginning of an exciting adventure, and since then,
            I&apos;ve continued to grow and evolve as a developer, taking on new
            challenges and learning the latest technologies along the way. Now,
            in my early twenties, nearly 4 years after starting my development
            journey, I&apos;m building cutting-edge iOS, Android and Web applications using
            modern technologies such as React Native, Next.js, React.js, TypeScript, NodeJS,
            Tailwindcss, and much more.
          </Typography>
          <Typography>
          Driven by creativity and fueled by innovation, I thrive on pushing the boundaries of what's possible in app development. From crafting pixel-perfect designs to optimizing performance, I am dedicated to delivering exceptional results that exceed expectations and inspire action. 🎨<br /><br />
            Join me on this exhilarating journey as we unlock the full potential of hybrid app development, one line of code at a time. 💻
          </Typography>
          <Typography>
            When I&apos;m not in full-on developer mode, you can find me
            hovering around on linkedin or on youtube, learning new tech or enjoying some free time. You can follow
            me on{' '}
            <Link
              noCustomization
              externalLink
              withUnderline
              href={EXTERNAL_LINKS.LINKEDIN}
            >
              Linkedin
            </Link>{' '}
            where I share tech-related bites and build in public, or you can
            follow me on{' '}
            <Link
              noCustomization
              externalLink
              withUnderline
              href={EXTERNAL_LINKS.GITHUB}
            >
              GitHub
            </Link>
            .
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default AboutMeSection;
