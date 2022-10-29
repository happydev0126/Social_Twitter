/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NumberStats } from '@components/tweet/number-stats';
import type { User } from '@lib/types/user';

type UserFollowStatsProps = Pick<User, 'following' | 'followers'>;

export function UserFollowStats({
  following,
  followers
}: UserFollowStatsProps): JSX.Element {
  const totalFollowing = following.length;
  const totalFollowers = followers.length;

  const [{ currentFollowers, currentFollowing }, setCurrentStats] = useState({
    currentFollowing: totalFollowing,
    currentFollowers: totalFollowers
  });

  useEffect(() => {
    setCurrentStats({
      currentFollowing: totalFollowing,
      currentFollowers: totalFollowers
    });
  }, [totalFollowing, totalFollowers]);

  const followingMove = useMemo(
    () => (totalFollowing > currentFollowing ? -25 : 25),
    [totalFollowing]
  );

  const followersMove = useMemo(
    () => (totalFollowers > currentFollowers ? -25 : 25),
    [totalFollowers]
  );

  const {
    query: { id }
  } = useRouter();

  const userPath = `/user/${id as string}`;

  const allStats: Readonly<[string, string, number, number][]> = [
    ['Following', `${userPath}/following`, followingMove, currentFollowing],
    ['Follower', `${userPath}/followers`, followersMove, currentFollowers]
  ];

  return (
    <div
      className='flex gap-4 text-light-secondary dark:text-dark-secondary
                 [&>a>div]:font-bold [&>a>div]:text-light-primary 
                 dark:[&>a>div]:text-dark-primary'
    >
      {allStats.map(([title, link, move, stats], index) => (
        <Link href={link} key={title}>
          <a
            className='mt-0.5 mb-[3px] flex h-4 items-center gap-1 border-b border-b-transparent 
                       outline-none transition duration-200 hover:border-b-light-primary 
                       focus-visible:border-b-light-primary dark:hover:border-b-dark-primary
                       dark:focus-visible:border-b-light-primary'
          >
            <NumberStats move={move} stats={stats} alwaysShowStats />
            <p>{index === 1 && stats > 1 ? `${title}s` : title}</p>
          </a>
        </Link>
      ))}
    </div>
  );
}
