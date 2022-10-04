import { AnimatePresence, motion } from 'framer-motion';
import { getStatsMove } from '@lib/utils';
import { formatNumber } from '@lib/format';

type NumberStatsProps = {
  move: number;
  stats: number;
};

export function NumberStats({ move, stats }: NumberStatsProps): JSX.Element {
  return (
    <div className='overflow-hidden'>
      <AnimatePresence mode='wait' initial={false}>
        {!!stats && (
          <motion.p className='text-sm' {...getStatsMove(move)} key={stats}>
            {formatNumber(stats)}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
