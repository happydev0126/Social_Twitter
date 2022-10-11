import { useRequireAuth } from '@lib/hooks/useRequireAuth';
import { Sidebar } from '@components/sidebar/sidebar';
import { Aside } from '@components/aside/aside';
import { Placeholder } from '../common/placeholder';
import type { ReactNode } from 'react';

export type LayoutProps = {
  children: ReactNode;
};

export function ProtectedLayout({ children }: LayoutProps): JSX.Element {
  const user = useRequireAuth();

  if (!user) return <Placeholder />;

  return <>{children}</>;
}

export function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <div className='flex justify-center gap-4'>
      <Sidebar />
      {children}
    </div>
  );
}

export function HomeLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      {children}
      <Aside />
    </>
  );
}
