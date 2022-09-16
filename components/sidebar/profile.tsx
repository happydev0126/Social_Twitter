import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { LogOutModal } from '@components/modal/log-out-modal';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { NextImage } from '@components/ui/next-image';
import { variant } from './more';
import type { User } from '@lib/types/user';

export function Profile(): JSX.Element {
  const { user, signOut } = useAuth();
  const { open, openModal, closeModal } = useModal();

  const { name, username, verified, photoURL } = user as User;

  return (
    <>
      <Modal
        modalClassName='flex flex-col gap-6 max-w-xs 
                        bg-black w-full p-8 rounded-2xl'
        open={open}
        closeModal={closeModal}
      >
        <LogOutModal signOut={signOut} closeModal={closeModal} />
      </Modal>
      <Menu className='relative' as='div'>
        {({ open }): JSX.Element => (
          <>
            <Menu.Button
              className={cn(
                'custom-button smooth-tab flex w-full',
                'items-center justify-between hover:bg-primary/10',
                'focus-visible:bg-primary/10 active:bg-primary/20',
                open && 'bg-primary/10'
              )}
            >
              <div className='flex gap-3'>
                <NextImage
                  imgClassName='rounded-full'
                  width={40}
                  height={40}
                  src={photoURL}
                  alt={name}
                  useSkeleton
                />
                <div className='text-start leading-5'>
                  <div className='flex items-center gap-1'>
                    <p className='text-start font-bold'>{name}</p>
                    {verified && (
                      <i>
                        <HeroIcon
                          className='h-5 w-5'
                          iconName='CheckBadgeIcon'
                          solid
                        />
                      </i>
                    )}
                  </div>
                  <p className='text-secondary'>@{username}</p>
                </div>
              </div>
              <HeroIcon iconName='EllipsisHorizontalIcon' />
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className='absolute left-0 right-0 -top-36 w-full rounded-md bg-black outline-none
                             [box-shadow:#ffffff33_0px_0px_15px,#ffffff26_0px_0px_3px_1px]'
                  as={motion.div}
                  {...variant}
                  static
                >
                  <Menu.Item
                    className='flex items-center justify-between gap-2 
                               border-b border-border-color px-4 py-3'
                    as='div'
                    disabled
                  >
                    <div className='flex items-center gap-3'>
                      <NextImage
                        imgClassName='rounded-full'
                        width={48}
                        height={48}
                        src={photoURL}
                        alt={name}
                      />
                      <div className='leading-5'>
                        <p className='font-bold'>{name}</p>
                        <p className='text-secondary'>@{username}</p>
                      </div>
                    </div>
                    <i>
                      <HeroIcon
                        className='h-5 w-5 text-accent-blue-secondary'
                        iconName='CheckIcon'
                      />
                    </i>
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <Button
                        className={cn(
                          'flex w-full gap-3 rounded-md rounded-t-none p-4',
                          active && 'bg-sidebar-background'
                        )}
                        onClick={openModal}
                      >
                        <HeroIcon iconName='ArrowRightOnRectangleIcon' />
                        Log out {name}
                      </Button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
}
