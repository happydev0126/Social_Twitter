import { useRouter } from 'next/router';
import { doc } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { useDocument } from '@lib/hooks/useDocument';
import { useUser } from '@lib/context/user-context';
import { isPlural } from '@lib/utils';
import { userStatsCollection } from '@lib/firebase/collections';
import { VerifiedName } from '@components/ui/verified-name';
import type { Variants } from 'framer-motion';

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function UserHeader(): JSX.Element {
  const {
    pathname,
    query: { id }
  } = useRouter();

  const { user, loading } = useUser();

  const userId = user ? user.id : null;

  const { data: statsData, loading: statsLoading } = useDocument(
    doc(userStatsCollection(userId ?? 'null'), 'stats'),
    {
      allowNull: true,
      disabled: !userId
    }
  );

  const { tweets, likes } = statsData ?? {};

  const [totalTweets, totalPhotos, totalLikes] = [
    (user?.totalTweets ?? 0) + (tweets?.length ?? 0),
    user?.totalPhotos,
    likes?.length
  ];

  const currentPage = pathname.split('/').pop() ?? '';

  const isInTweetPage = ['[id]', 'with_replies'].includes(currentPage);
  const isInFollowPage = ['following', 'followers'].includes(currentPage);

  return (
    <AnimatePresence mode='popLayout'>
      {loading || statsLoading ? (
        <motion.div
          className='-mb-1 inner:animate-pulse inner:rounded-lg inner:bg-white'
          {...variants}
          key='loading'
        >
          <div className='mb-1 -mt-1 h-5 w-24' />
          <div className='h-4 w-12' />
        </motion.div>
      ) : !user ? (
        <motion.h2 className='text-xl font-bold' {...variants} key='not-found'>
          {isInFollowPage ? `@${id as string}` : 'Profile'}
        </motion.h2>
      ) : (
        <motion.div className='-mb-1' {...variants} key='found'>
          <VerifiedName
            className='-mt-1'
            iconClassName='w-6 h-6'
            verified={user.verified}
          >
            <h2 className='text-xl font-bold'>{user.name}</h2>
          </VerifiedName>
          <p className='text-xs text-secondary'>
            {isInFollowPage
              ? `@${user.username}`
              : isInTweetPage
              ? totalTweets
                ? `${totalTweets} ${`Tweet${isPlural(totalTweets)}`}`
                : 'No Tweet'
              : currentPage === 'media'
              ? totalPhotos
                ? `${totalPhotos} Photo${isPlural(totalPhotos)} & GIF${isPlural(
                    totalPhotos
                  )}`
                : 'No Photo & GIF'
              : totalLikes
              ? `${totalLikes} Like${isPlural(totalLikes)}`
              : 'No Like'}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
