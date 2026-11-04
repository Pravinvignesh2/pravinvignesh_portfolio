import React from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import styles from './ScrollProgress.module.css';

export const ScrollProgress: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div
      className={styles.progressBar}
      style={{
        transform: `scaleX(${progress / 100})`,
        opacity: progress > 1 ? 1 : 0,
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page reading progress"
    />
  );
};
