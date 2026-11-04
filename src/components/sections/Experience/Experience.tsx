import React from 'react';
import { motion } from 'motion/react';
import { Container } from '@/components/ui/Container/Container';
import { experienceData } from '@/data/experience';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Experience.module.css';

export const Experience: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const getCategoryLabel = (id: string) => {
    switch (id) {
      case 'exp-independent-dev':
        return 'PROJECT EXPERIENCE';
      case 'exp-tech-analyst':
        return 'EMPLOYMENT';
      case 'edu-training-java':
        return 'COURSEWORK';
      case 'edu-mechanical-engineering':
        return 'DEGREE';
      default:
        return '';
    }
  };

  return (
    <section id="experience" className={styles.experienceSection}>
      <Container variant="standard">
        {/* Full-Width Sticky Horizontal Header */}
        <div className={styles.stickyHeaderGroup}>
          <span className={styles.kicker}>03. Background</span>
          <h2 className={styles.title}>Experience &amp; Education.</h2>
          <p className={styles.subtitle}>
            A transparent chronicle of my academic foundation, software engineering training,
            independent product builds, and prior technical analysis experience.
          </p>
        </div>

        {/* Full-Width Timeline Content Area */}
        <div className={styles.contentWrap}>
          <div className={styles.timelineContainer}>
            <div className={styles.timelineTrack} />

            {experienceData.map((item, index) => {
              const isFirst = index === 0;

              return (
                <motion.div
                  key={item.id}
                  className={styles.timelineCard}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Timeline Node */}
                  <div
                    className={`${styles.timelineNode} ${
                      isFirst ? styles.timelineNodeActive : ''
                    }`}
                  >
                    {isFirst && <div className={styles.timelineNodeActiveInner} />}
                  </div>

                  {/* Card Inner */}
                  <div className={styles.cardInner}>
                    <div className={styles.cardTopRow}>
                      <span className={styles.period}>{item.period}</span>
                      <span className={styles.categoryBadge}>
                        {getCategoryLabel(item.id)}
                      </span>
                    </div>

                    <h3 className={styles.roleTitle}>{item.roleOrDegree}</h3>
                    <div className={styles.organization}>{item.organization}</div>

                    <ul className={styles.responsibilitiesList}>
                      {item.responsibilities.map((resp, i) => (
                        <li key={i} className={styles.responsibilityItem}>
                          <span className={styles.bullet}>&bull;</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {/* No notice needed */}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
