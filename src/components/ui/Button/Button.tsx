import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconOnly?: boolean;
  href?: string;
  isExternal?: boolean;
  download?: string | boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      iconOnly = false,
      href,
      isExternal = false,
      download,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      iconOnly ? styles.iconOnly : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
        {children && <span>{children}</span>}
        {iconRight && <span className={styles.icon}>{iconRight}</span>}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={classNames}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          download={download}
        >
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} className={classNames} {...rest}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
