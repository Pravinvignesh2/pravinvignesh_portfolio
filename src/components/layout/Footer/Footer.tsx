import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Container } from '@/components/ui/Container/Container';
import { profileData } from '@/data/profile';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <Container variant="standard">
        <div className={styles.footerRow}>
          <div className={styles.copyright}>
            Designed &amp; built by Pravinvignesh P. &copy; 2026
          </div>

          <div className={styles.socialList}>
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              GitHub
            </a>
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className={styles.socialLink}
            >
              Email
            </a>
            <button
              onClick={scrollToTop}
              className={styles.backToTop}
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
