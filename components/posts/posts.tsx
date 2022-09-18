import { AnimatePresence } from 'framer-motion';
import { query, orderBy } from 'firebase/firestore';
import { postsCollection } from '@lib/firebase/collections';
import { useFirestoreQuery } from '@lib/hooks/useFirestoreQuery';
import { Loading } from '@components/ui/loading';
import { Article } from './article';

export function Posts(): JSX.Element {
  // error can be used
  const { data, loading } = useFirestoreQuery(
    query(postsCollection, orderBy('createdAt', 'desc')),
    { includeUser: true }
  );

  if (loading) return <Loading className='mx-auto mt-4' />;

  return (
    <div>
      <AnimatePresence mode='popLayout'>
        {data.map((post) => (
          <Article {...post} key={post.id} />
        ))}
      </AnimatePresence>
    </div>
  );
}
