import React from 'react';
import styles from './Magnetic.module.css';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticButton: React.FC<MagneticProps> = ({
  children,
  className = '',
}) => {
  // Render cleanly without translation drift to prevent button overlap and jitter
  return <div className={`${styles.wrapper} ${className}`}>{children}</div>;
};
