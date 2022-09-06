import { useRouter } from 'next/router';
import Link from 'next/link';
import { NextImage } from '@components/ui/next-image';
import { SidebarLink } from '@components/sidebar/sidebar-link';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import type { IconName } from '@components/ui/hero-icon';

type NavLinks = { href: string; linkName: string; iconName: IconName }[];

const navLinks: NavLinks = [
  {
    href: '/home',
    linkName: 'Home',
    iconName: 'HomeIcon'
  },
  {
    href: '/explore',
    linkName: 'Explore',
    iconName: 'HashtagIcon'
  },
  {
    href: '/notifications',
    linkName: 'Notifications',
    iconName: 'BellIcon'
  },
  {
    href: '/messages',
    linkName: 'Messages',
    iconName: 'EnvelopeIcon'
  },
  {
    href: '/bookmarks',
    linkName: 'Bookmarks',
    iconName: 'BookmarkIcon'
  },
  {
    href: '/lists',
    linkName: 'Lists',
    iconName: 'Bars3BottomLeftIcon'
  },
  {
    href: '/profile',
    linkName: 'Profile',
    iconName: 'UserIcon'
  }
];

export function Sidebar(): JSX.Element {
  const { pathname } = useRouter();

  return (
    <header className='-mr-4 flex w-full max-w-xs justify-end'>
      <div className='fixed top-0 flex h-full w-72 flex-col justify-between overflow-auto px-4 py-3 pt-2'>
        <div className='flex flex-col gap-2'>
          <h1 className='flex'>
            <Link href='/home'>
              <a
                className='custom-button smooth-tab relative text-icon-background transition
                           hover:bg-hover-color focus-visible:ring-accent-blue-focus'
              >
                <HeroIcon className='h-7 w-7' iconName='TwitterIcon' />
              </a>
            </Link>
          </h1>
          <nav>
            {navLinks.map(({ ...linkData }) => (
              <SidebarLink
                pathname={pathname}
                {...linkData}
                key={linkData.href}
              />
            ))}
            <div className='group flex py-1'>
              <Button className='flex gap-4 pr-5 text-xl group-hover:bg-hover-color'>
                <HeroIcon
                  className='h-7 w-7'
                  iconName='EllipsisHorizontalCircleIcon'
                />{' '}
                More
              </Button>
            </div>
          </nav>
          <Button
            className='w-11/12 bg-accent-blue font-bold text-white outline-none
                       transition hover:brightness-90'
          >
            Tweet
          </Button>
        </div>
        <Button className='flex items-center justify-between hover:bg-hover-color focus-visible:bg-hover-color'>
          <div className='flex items-center gap-3'>
            <NextImage
              imgClassName='rounded-full'
              width={40}
              height={40}
              src='/placeholder/yagakimi.jpg'
              alt='ccrsxx'
              useSkeleton
            />
            <div className='leading-5'>
              <div className='flex items-center gap-1'>
                <p className='text-start font-bold'>Ami</p>
                <i>
                  <HeroIcon
                    className='h-5 w-5'
                    iconName='CheckBadgeIcon'
                    solid
                  />
                </i>
              </div>
              <p className='text-secondary'>@ccrsxx</p>
            </div>
          </div>
          <HeroIcon iconName='EllipsisHorizontalIcon' />
        </Button>
      </div>
    </header>
  );
}
