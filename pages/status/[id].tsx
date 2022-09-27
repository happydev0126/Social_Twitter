import { useRouter } from 'next/router';
import { ProtectedRoute, Layout, HomeLayout } from '@components/common/layout';
import { HomeHeader } from '@components/home/home-header';
import { ViewStatus } from '@components/view/view-status';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import type { ReactElement, ReactNode } from 'react';

export default function Status(): JSX.Element {
  const {
    query: { id },
    back
  } = useRouter();

  return (
    <main className='flex min-h-screen w-full max-w-xl flex-col border-x border-border-color'>
      <HomeHeader className='flex items-center gap-4'>
        <Button
          className='p-2 hover:bg-primary/10 active:bg-primary/20'
          onClick={back}
        >
          <HeroIcon className='h-5 w-5' iconName='ArrowLeftIcon' />
        </Button>
        <h2 className='text-xl font-bold'>Tweet</h2>
      </HomeHeader>
      <ViewStatus statusId={id as string} />
    </main>
  );
}

Status.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedRoute>
    <Layout>
      <HomeLayout>{page}</HomeLayout>
    </Layout>
  </ProtectedRoute>
);
