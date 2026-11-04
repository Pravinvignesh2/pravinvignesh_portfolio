import React from 'react';
import styles from './Tag.module.css';

interface MetaListProps {
  items: (string | React.ReactNode)[];
  separator?: string;
  className?: string;
}

/**
 * MetaList renders unboxed metadata items separated by clean typographic dots,
 * strictly abiding by the zero-pill design constitution.
 */
export const MetaList: React.FC<MetaListProps> = ({
  items,
  separator = '·',
  className = '',
}) => {
  return (
    <div className={`${styles.metaText} ${className}`.trim()}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span>{item}</span>
          {index < items.length - 1 && (
            <span className={styles.separator} aria-hidden="true">
              {separator}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

interface FilterTabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

/**
 * Interactive filter tab button for categorizing content cleanly
 */
export const FilterTab: React.FC<FilterTabProps> = ({
  active = false,
  children,
  className = '',
  ...rest
}) => {
  return (
    <button
      className={`${styles.filterButton} ${active ? styles.active : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
};
