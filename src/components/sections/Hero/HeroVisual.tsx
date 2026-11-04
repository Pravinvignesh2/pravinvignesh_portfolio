import React, { useState } from 'react';
import { motion, TargetAndTransition } from 'motion/react';
import { Terminal, MapPin } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './HeroVisual.module.css';

interface HeroVisualProps {
  location: string;
  role: string;
}

export const HeroVisual: React.FC<HeroVisualProps> = ({ location, role }) => {
  const prefersReduced = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(true);

  // Floating animation variants with strict typing
  const floatAnim1: TargetAndTransition = prefersReduced
    ? {}
    : {
        y: [0, -10, 0],
        rotate: [0, 2, 0],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      };

  const floatAnim2: TargetAndTransition = prefersReduced
    ? {}
    : {
        y: [0, 8, 0],
        rotate: [0, -2, 0],
        transition: {
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        },
      };

  const pulseRing: TargetAndTransition = prefersReduced
    ? {}
    : {
        scale: [1, 1.05, 1],
        opacity: [0.3, 0.5, 0.3],
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      };

  return (
    <div className={styles.visualContainer}>
      {/* Soft Ambient Glow */}
      <div className={styles.ambientGlow} />

      {/* Abstract Software Engineering Geometric Canvas */}
      <svg
        className={styles.svgCanvas}
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Concentric Coordinate Rings */}
        <motion.circle
          cx="240"
          cy="240"
          r="190"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="4 6"
          animate={pulseRing}
        />
        <circle
          cx="240"
          cy="240"
          r="140"
          stroke="var(--color-border-subtle)"
          strokeWidth="1"
        />

        {/* Diagonal Structural Vector Grid */}
        <line
          x1="60"
          y1="120"
          x2="420"
          y2="360"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <line
          x1="120"
          y1="400"
          x2="380"
          y2="80"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />

        {/* Isometric Engineering Planes (Left & Top) */}
        <motion.polygon
          points="70,180 140,140 180,200 110,240"
          fill="url(#planeGrad)"
          stroke="var(--color-border-strong)"
          strokeWidth="1"
          animate={floatAnim1}
        />
        <motion.polygon
          points="310,110 380,80 410,140 340,170"
          fill="url(#planeGrad)"
          stroke="var(--color-border-strong)"
          strokeWidth="1"
          animate={floatAnim2}
        />

        {/* Interconnected System Nodes */}
        <circle cx="140" cy="140" r="4" fill="var(--color-accent)" />
        <circle cx="340" cy="170" r="4" fill="var(--color-accent)" />
        <circle cx="380" cy="310" r="3" fill="var(--color-text-secondary)" />
        <circle cx="100" cy="300" r="3" fill="var(--color-text-secondary)" />

        <line
          x1="140"
          y1="140"
          x2="240"
          y2="180"
          stroke="var(--color-accent)"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <line
          x1="340"
          y1="170"
          x2="290"
          y2="240"
          stroke="var(--color-accent)"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
      </svg>

      {/* Profile Photograph Anchor */}
      <div className={styles.profileAnchor}>
        <motion.div
          className={styles.profileImageWrap}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={imageLoaded ? '/images/profile/profile.jpg' : '/images/profile/profile.svg'}
            alt="Pravinvignesh P."
            className={styles.profileImg}
            referrerPolicy="no-referrer"
            onError={() => setImageLoaded(false)}
          />
        </motion.div>
      </div>

      {/* Floating Meta Micro-Cards */}
      <motion.div
        className={`${styles.floatingCard} ${styles.cardTopRight}`}
        animate={floatAnim1}
      >
        <Terminal size={14} color="var(--color-accent)" />
        <span>{role}</span>
        <span className={styles.cardDot} />
      </motion.div>

      <motion.div
        className={`${styles.floatingCard} ${styles.cardBottomLeft}`}
        animate={floatAnim2}
      >
        <MapPin size={14} color="var(--color-accent)" />
        <span>{location}</span>
      </motion.div>
    </div>
  );
};
