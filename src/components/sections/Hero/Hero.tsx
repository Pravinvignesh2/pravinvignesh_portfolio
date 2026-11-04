import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, FileText, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { HeroVisual } from './HeroVisual';
import { profileData } from '@/data/profile';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.hero}>
      <Container variant="standard">
        <div className={styles.heroGrid}>
          {/* Typographic Left Column */}
          <motion.div
            className={styles.contentCol}
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Availability Indicator */}
            {profileData.isAvailableForHire && (
              <div className={styles.availabilityBar}>
                <span className={styles.availabilityDot} />
                <span>{profileData.availabilityNote}</span>
              </div>
            )}

            {/* Editorial Headline */}
            <h1 className={styles.headline}>{profileData.tagline}</h1>

            {/* Supporting Description */}
            <p className={styles.supportingText}>{profileData.supportingText}</p>

            {/* Primary & Secondary Actions */}
            <div className={styles.ctaRow}>
              <Button
                variant="primary"
                size="lg"
                href="#about"
                onClick={handleScrollToProjects}
                iconRight={<ArrowDown size={18} />}
              >
                Explore Background
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href="/resume/pravinvignesh_resume.pdf"
                download="Pravinvignesh_P_Resume.pdf"
                iconLeft={<FileText size={18} />}
              >
                Download Resume
              </Button>
            </div>

            {/* Social & Verification Row */}
            <div className={styles.metaRow}>
              <a
                href={profileData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.metaItem}
              >
                <Github size={16} />
                <span>github.com/{profileData.githubUsername}</span>
                <ArrowUpRight size={14} />
              </a>

              <span className={styles.metaSeparator} aria-hidden="true">
                /
              </span>

              <a
                href={profileData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.metaItem}
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* New Portrait Visual Column */}
          <div className={styles.portraitCol}>
            <div className={styles.ambientGlow} />
            <motion.img
              src="/images/profile/profile-removebg-preview.png"
              alt="Pravinvignesh P."
              className={styles.portraitImg}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
