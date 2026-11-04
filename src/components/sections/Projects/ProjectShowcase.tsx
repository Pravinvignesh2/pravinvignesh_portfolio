import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Github, ArrowUpRight, Globe, Layers } from 'lucide-react';
import { Container } from '@/components/ui/Container/Container';
import { projectsData } from '@/data/projects';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './ProjectShowcase.module.css';

interface ProjectShowcaseProps {
  onSelectProject: (slug: string) => void;
}

const ProjectImageCover: React.FC<{
  src: string;
  alt: string;
  accentColor: string;
  title: string;
  category: string;
}> = ({ src, alt, accentColor, title, category }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div className={styles.fallbackFrame} style={{ borderColor: `${accentColor}33` }}>
        <div className={styles.fallbackPattern} />
        <div className={styles.fallbackContent}>
          <div
            className={styles.fallbackIconBadge}
            style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
          >
            <Layers size={22} />
          </div>
          <div className={styles.fallbackTitle}>{title}</div>
          <div className={styles.fallbackTag}>{category}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.imageLoadingWrapper}>
      {!isLoaded && <div className={styles.imageShimmer} />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${styles.visualImg} ${isLoaded ? styles.visualImgLoaded : ''}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onSelectProject }) => {
  const prefersReduced = useReducedMotion();
  const [filter, setFilter] = useState<string>('All');

  const categories = [
    'All',
    'Offline-First',
    'AI Application',
    'Machine Learning',
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (filter === 'All') return true;
    return p.category.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <section id="projects" className={styles.section}>
      <Container variant="standard">
        {/* Full-Width Sticky Horizontal Header */}
        <div className={styles.stickyHeaderGroup}>
          <span className={styles.kicker}>Selected Case Studies</span>
          <h2 className={styles.title}>Featured Projects.</h2>
          <p className={styles.subtitle}>
            Production applications and data engines engineered with a focus on real-world
            reliability, offline persistence, and intelligent assistance.
          </p>
        </div>

        {/* Full-Width Content Area */}
        <div className={styles.contentWrap}>
          {/* Filter Controls */}
          <div className={styles.filterRow} role="tablist" aria-label="Project Categories">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterButton} ${
                  filter === cat ? styles.filterButtonActive : ''
                }`}
                onClick={() => setFilter(cat)}
                role="tab"
                aria-selected={filter === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 2-Column Desktop Grid for Featured Projects */}
          <div className={styles.projectGrid}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.projectCard}
                >
                  {/* 1. Project Screenshot */}
                  <div
                    className={styles.visualFrame}
                    onClick={() => onSelectProject(project.slug)}
                    title={`View ${project.title} case study`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onSelectProject(project.slug);
                      }
                    }}
                  >
                    <ProjectImageCover
                      src={project.coverImage || project.placeholderImage}
                      alt={`${project.title} interface preview`}
                      accentColor={project.accentColor}
                      title={project.title}
                      category={project.category}
                    />
                  </div>

                  {/* 2. Project Number and Category */}
                  <div className={styles.cardHeader}>
                    <span className={styles.indexLabel}>{project.index}.</span>
                    <span className={styles.categoryTag}>{project.category}</span>
                  </div>

                  {/* 3. Project Title */}
                  <h3 className={styles.projectTitle}>{project.title}</h3>

                  {/* 4. Short Tagline */}
                  <div className={styles.projectSubtitle}>{project.subtitle}</div>

                  {/* 5. Project Description */}
                  <p className={styles.projectDesc}>{project.shortDescription}</p>

                  {/* 6. Technology Metadata */}
                  <div className={styles.techList}>
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className={styles.techItem}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* 7. Divider */}
                  <hr className={styles.cardDivider} />

                  {/* 8. Live Demo and GitHub actions */}
                  <div className={styles.actionButtonsRow}>
                    {Boolean(project.liveUrl && project.liveUrl.trim()) && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.liveDemoLink}
                        title={`Open ${project.title} live demo`}
                      >
                        <Globe size={14} />
                        <span>Live Demo</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.githubIconLink}
                      title={`Open ${project.title} GitHub repository`}
                    >
                      <Github size={14} />
                      <span>GitHub</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>

                  {/* 9. Case Study Link */}
                  <div className={styles.caseStudyRow}>
                    <button
                      className={styles.caseStudyLink}
                      onClick={() => onSelectProject(project.slug)}
                      title={`Read ${project.title} case study`}
                    >
                      <span>Read Case Study</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
};
