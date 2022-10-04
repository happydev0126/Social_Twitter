import { useRef } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { doc, query, where, orderBy } from 'firebase/firestore';
import { tweetsCollection } from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import { useDocument } from '@lib/hooks/useDocument';
import { ProtectedRoute, Layout, HomeLayout } from '@components/common/layout';
import { MainHeader } from '@components/home/main-header';
import { Tweet } from '@components/tweet/tweet';
import { ViewTweet } from '@components/view/view-tweet';
import { SEO } from '@components/common/seo';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { ViewParentTweet } from '@components/view/view-parent-tweet';
import type { ReactElement, ReactNode } from 'react';

export default function TweetId(): JSX.Element {
  const {
    query: { id },
    back
  } = useRouter();

  const { data: tweetData, loading: tweetLoading } = useDocument(
    doc(tweetsCollection, id as string),
    { includeUser: true, allowNull: true }
  );

  const viewTweetRef = useRef<HTMLElement>(null);
  const viewTweetHasParent = !!tweetData?.parent;

  const { data: repliesData, loading: repliesLoading } = useCollection(
    query(
      tweetsCollection,
      where('parent.id', '==', id),
      orderBy('createdAt', 'desc')
    ),
    { includeUser: true, allowNull: true, disabled: viewTweetHasParent }
  );

  const { text, images } = tweetData ?? {};

  const imagesLength = images?.length ?? 0;
  const parentId = tweetData?.parent?.id;

  const pageTitle = tweetData
    ? `${tweetData.user.username} on Twitter: "${text ? `${text} ` : ''}${
        images ? `(${imagesLength} image${imagesLength > 1 ? 's' : ''})` : ''
      }" / Twitter`
    : null;

  return (
    <main
      className='flex min-h-screen w-full max-w-xl flex-col
                 border-x border-border-color pb-[448px]'
    >
      <MainHeader
        useActionButton
        title={parentId ? 'Thread' : 'Tweet'}
        action={back}
      />
      <section>
        {tweetLoading ? (
          <Loading className='mt-5' />
        ) : !tweetData ? (
          <>
            <SEO title='Tweet not found / Twitter' />
            <Error message='Tweet not found' />
          </>
        ) : (
          <>
            {pageTitle && <SEO title={pageTitle} />}
            {parentId && (
              <ViewParentTweet
                parentId={parentId}
                viewTweetRef={viewTweetRef}
              />
            )}
            <ViewTweet
              reply={viewTweetHasParent}
              viewTweetRef={viewTweetRef}
              {...tweetData}
            />
            {tweetData &&
              (repliesLoading ? (
                <Loading className='mt-5' />
              ) : (
                <AnimatePresence mode='popLayout'>
                  {repliesData?.map((tweet) => (
                    <Tweet reply {...tweet} key={tweet.id} />
                  ))}
                </AnimatePresence>
              ))}
          </>
        )}
      </section>
    </main>
  );
}

TweetId.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedRoute>
    <Layout>
      <HomeLayout>{page}</HomeLayout>
    </Layout>
  </ProtectedRoute>
);
