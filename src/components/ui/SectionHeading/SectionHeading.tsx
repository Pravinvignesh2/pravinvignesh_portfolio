import React from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  centered = false,
  className = '',
}) => {
  return (
    <div
      className={`${styles.wrapper} ${centered ? styles.centered : ''} ${className}`.trim()}
    >
      {kicker && <span className={styles.kicker}>{kicker}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};
