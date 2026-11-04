import React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, FileText, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { ContactForm } from './ContactForm';
import { profileData } from '@/data/profile';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Contact.module.css';

export const Contact: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section id="contact" className={styles.contactSection}>
      <Container variant="standard">
        <motion.div
          className={styles.contactCard}
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.kicker}>04. Connect</span>
          <h2 className={styles.headline}>Have an idea? Let&apos;s make it happen.</h2>
          <p className={styles.subtext}>
            Whether you are discussing a software engineering position, an offline-first platform,
            or an intelligent AI application, send me a message below or connect via direct
            channels.
          </p>

          {/* Functional Contact Form */}
          <div style={{ marginBottom: 32 }}>
            <ContactForm />
          </div>

          {/* Quick Actions & Resume Download */}
          <div className={styles.actionRow}>
            <Button
              variant="secondary"
              size="md"
              href="/resume/pravinvignesh_resume.pdf"
              download="Pravinvignesh_P_Resume.pdf"
              iconLeft={<FileText size={16} />}
            >
              Download Resume (PDF)
            </Button>

            <Button
              variant="ghost"
              size="md"
              href={`mailto:${profileData.email}`}
              iconLeft={<Mail size={16} />}
            >
              Direct: {profileData.email}
            </Button>
          </div>

          {/* Direct Verification Channels */}
          <div className={styles.channelsGrid}>
            <a href={`mailto:${profileData.email}`} className={styles.channelItem}>
              <Mail size={20} className={styles.channelIcon} />
              <div>
                <div className={styles.channelLabel}>Direct Email</div>
                <div className={styles.channelValue}>{profileData.email}</div>
              </div>
            </a>

            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channelItem}
            >
              <Github size={20} className={styles.channelIcon} />
              <div style={{ flex: 1 }}>
                <div className={styles.channelLabel}>GitHub Profile</div>
                <div className={styles.channelValue}>Pravinvignesh2</div>
              </div>
              <ArrowUpRight size={16} color="var(--color-text-muted)" />
            </a>

            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channelItem}
            >
              <Linkedin size={20} className={styles.channelIcon} />
              <div style={{ flex: 1 }}>
                <div className={styles.channelLabel}>Professional Network</div>
                <div className={styles.channelValue}>LinkedIn</div>
              </div>
              <ArrowUpRight size={16} color="var(--color-text-muted)" />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
