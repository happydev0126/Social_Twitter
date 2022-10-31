import {
  ProfileLayout,
  ProtectedLayout
} from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { UserLayout } from '@components/layout/user-layout';
import { UserFollowLayout } from '@components/layout/user-follow-layout';
import { UserFollow } from '@components/user/user-follow';
import type { ReactElement, ReactNode } from 'react';

export default function UserFollowers(): JSX.Element {
  return <UserFollow type='followers' />;
}

UserFollowers.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <ProfileLayout>
        <UserLayout>
          <UserFollowLayout>{page}</UserFollowLayout>
        </UserLayout>
      </ProfileLayout>
    </MainLayout>
  </ProtectedLayout>
);
