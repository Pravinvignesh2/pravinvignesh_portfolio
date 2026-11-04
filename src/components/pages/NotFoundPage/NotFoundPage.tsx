import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Compass } from 'lucide-react';
import { Container } from '@/components/ui/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { useSEO } from '@/hooks/useSEO';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './NotFoundPage.module.css';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateProjects: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onNavigateProjects,
}) => {
  const prefersReduced = useReducedMotion();

  useSEO({
    title: '404: Page Not Found — Pravinvignesh P.',
    description: 'The requested page or project route could not be found in the portfolio.',
    path: '/404',
  });

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.containerWrap}>
        <Container variant="narrow">
          <motion.div
            className={styles.contentCard}
            initial={prefersReduced ? false : { opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
          <div className={styles.badge404}>404</div>
          <h1 className={styles.title}>This page took a wrong turn.</h1>
          <p className={styles.description}>
            The link you followed may be broken, or the project route you are looking for has been
            moved or archived.
          </p>

          <div className={styles.actionRow}>
            <Button
              variant="primary"
              size="md"
              onClick={onNavigateHome}
              iconLeft={<ArrowLeft size={16} />}
            >
              Back to Home
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={onNavigateProjects}
              iconLeft={<Compass size={16} />}
            >
              Explore Projects
            </Button>
          </div>

          <div className={styles.brandFooterNote}>
            Pravinvignesh P. &bull; Software Developer Portfolio
          </div>
        </motion.div>
      </Container>
    </div>
    </main>
  );
};
