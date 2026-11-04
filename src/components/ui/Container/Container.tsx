import React from 'react';
import styles from './Container.module.css';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'narrow' | 'full';
  children: React.ReactNode;
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
  variant = 'standard',
  children,
  className = '',
  as: Component = 'div',
  ...rest
}) => {
  return (
    <Component
      className={`${styles.container} ${styles[variant]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
};
