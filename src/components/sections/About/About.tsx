import React from 'react';
import { motion } from 'motion/react';
import { Compass, Cpu, Layers, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container/Container';
import { profileData } from '@/data/profile';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './About.module.css';

export const About: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const highlights = [
    {
      index: '01',
      title: 'Engineering foundation.',
      description:
        'My background in Mechanical Engineering established a deep respect for first principles, mathematical rigor, and systematic failure-mode decomposition. When building software, I design architectures that are physically grounded, predictable, and resilient under stress.',
      icon: <Compass size={18} />,
    },
    {
      index: '02',
      title: 'Full-stack development.',
      description:
        'Trained intensively in Java Full Stack development at Besant Technologies, I build across the entire modern technical surface: responsive React/TypeScript interfaces, structured backend systems, and production AI inference pipelines.',
      icon: <Layers size={18} />,
    },
    {
      index: '03',
      title: 'Product-oriented thinking.',
      description:
        'I do not write code for its own sake. Whether engineering offline-first currency calculations with integer paise precision in Cairn or rigorous fraud detection modeling on imbalanced financial datasets, every engineering decision is guided by real-world user utility.',
      icon: <Cpu size={18} />,
    },
  ];

  return (
    <section id="about" className={styles.aboutSection}>
      <Container variant="standard">
        <div className={styles.aboutGrid}>
          {/* Left Column: Heading and Short Introduction */}
          <motion.div
            className={styles.leftCol}
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.sectionKicker}>01. About Me</span>
            <h2 className={styles.sectionTitle}>A little about me.</h2>
            <p className={styles.shortIntro}>
              Bridging mechanical precision with modern software craft to build tangible,
              reliable digital solutions.
            </p>

            <div className={styles.statsPills}>
              <div className={styles.statItem}>
                <Sparkles size={16} className={styles.statIcon} />
                <span>B.E. Mechanical Engineering &bull; India</span>
              </div>
              <div className={styles.statItem}>
                <Layers size={16} className={styles.statIcon} />
                <span>Java Full Stack Graduate &bull; Besant Technologies</span>
              </div>
              <div className={styles.statItem}>
                <Cpu size={16} className={styles.statIcon} />
                <span>Web, Android (Kotlin), Supabase &amp; Gemini AI</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Detailed Narrative & 3 Understated Highlights */}
          <motion.div
            className={styles.narrativeCol}
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.narrativeText}>
              {profileData.bioParagraphs.map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Three Understated Highlights */}
            <div className={styles.highlightsGrid}>
              {highlights.map((highlight) => (
                <div key={highlight.index} className={styles.highlightCard}>
                  <div className={styles.highlightHeader}>
                    <span className={styles.highlightIndex}>{highlight.index} —</span>
                    <h3 className={styles.highlightTitle}>{highlight.title}</h3>
                  </div>
                  <p className={styles.highlightDesc}>{highlight.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
