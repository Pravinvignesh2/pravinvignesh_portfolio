import React from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'subtle' | 'elevated';
  interactive?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  as?: React.ElementType;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  interactive = false,
  padding = 'md',
  children,
  className = '',
  as: Component = 'div',
  ...rest
}) => {
  const paddingClass =
    padding === 'sm' ? styles.paddingSm : padding === 'lg' ? styles.paddingLg : '';

  const classNames = [
    styles.card,
    styles[variant],
    interactive ? styles.interactive : '',
    paddingClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classNames} {...rest}>
      {children}
    </Component>
  );
};
