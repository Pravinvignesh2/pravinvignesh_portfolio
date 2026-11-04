import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ArrowUpRight,
  Layers,
  Cpu,
  ShieldAlert,
  GitCommit,
  CheckCircle2,
  Copy,
  Check,
  Info,
  Globe,
} from 'lucide-react';
import { Container } from '@/components/ui/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { projectsData } from '@/data/projects';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useSEO } from '@/hooks/useSEO';
import styles from './CaseStudyPage.module.css';

interface CaseStudyPageProps {
  slug: string;
  onNavigateHome: () => void;
  onNavigateProject: (slug: string) => void;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({
  slug,
  onNavigateHome,
  onNavigateProject,
}) => {
  const prefersReduced = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeImageModal, setActiveImageModal] = useState<{
    url: string;
    caption?: string;
    alt: string;
  } | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImageModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[currentIndex];

  // Dynamic Case Study SEO metadata
  useSEO({
    title: project
      ? `${project.title} — ${project.subtitle} | Pravinvignesh P.`
      : 'Case Study | Pravinvignesh P.',
    description: project
      ? `${project.shortDescription} Architecture: ${project.architecture.pattern}. Built with ${project.technologies.slice(0, 3).join(', ')}.`
      : 'Software engineering case study by Pravinvignesh P.',
    path: `/projects/${slug}`,
    image: project?.placeholderImage || '/images/profile/profile.jpg',
  });

  // Scroll to top on project load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedNodeId(null);
    setCopied(false);
  }, [slug]);

  if (!project) {
    return (
      <article className={styles.article}>
        <Container variant="standard">
          <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <h1 className={styles.title}>Case Study Not Found</h1>
            <p className={styles.subtitle}>The requested project could not be located.</p>
            <Button variant="primary" onClick={onNavigateHome} iconLeft={<ArrowLeft size={16} />}>
              Return to Portfolio
            </Button>
          </div>
        </Container>
      </article>
    );
  }

  // Previous and Next project calculations
  const prevProject =
    currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject =
    currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];

  // Related projects (other projects excluding current)
  const relatedProjects = projectsData.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <motion.article
      className={styles.article}
      initial={prefersReduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReduced ? undefined : { opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Container variant="standard">
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumbBar} aria-label="Breadcrumb">
          <button className={styles.breadcrumbLink} onClick={onNavigateHome}>
            Home
          </button>
          <span className={styles.breadcrumbSeparator}>/</span>
          <button className={styles.breadcrumbLink} onClick={onNavigateHome}>
            Projects
          </button>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{project.title}</span>
        </nav>

        {/* Hero Header */}
        <header className={styles.caseHeader}>
          <div className={styles.kickerRow}>
            <span className={styles.projectIndex}>Case Study {project.index}</span>
            <span className={styles.statusBadge}>{project.status}</span>
            <span className="text-caption">{project.category}</span>
          </div>

          <h1 className={styles.title}>{project.title}</h1>
          <div className={styles.subtitle}>{project.subtitle}</div>

          <div className={styles.actionRow}>
            {Boolean(project.liveUrl && project.liveUrl.trim()) && (
              <Button
                variant="accent"
                size="md"
                href={project.liveUrl}
                isExternal
                iconLeft={<Globe size={16} />}
                iconRight={<ArrowUpRight size={14} />}
              >
                Live Demo
              </Button>
            )}

            <Button
              variant={project.liveUrl ? 'secondary' : 'primary'}
              size="md"
              href={project.githubUrl}
              isExternal
              iconLeft={<Github size={16} />}
              iconRight={<ArrowUpRight size={14} />}
            >
              GitHub Repository
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={onNavigateHome}
              iconLeft={<ArrowLeft size={16} />}
            >
              Back to All Projects
            </Button>
          </div>
        </header>

        {/* Hero Illustration / Media Frame */}
        <div
          className={styles.heroMediaFrame}
          data-cursor="view-project"
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onClick={() =>
            setActiveImageModal({
              url: project.coverImage || project.placeholderImage,
              alt: `${project.title} cover preview`,
              caption: project.subtitle,
            })
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setActiveImageModal({
                url: project.coverImage || project.placeholderImage,
                alt: `${project.title} cover preview`,
                caption: project.subtitle,
              });
            }
          }}
          title="Click or press Enter to view full image preview"
        >
          <img
            src={project.coverImage || project.placeholderImage}
            alt={`${project.title} technical architecture and interface overview`}
            className={styles.heroMediaImg}
          />
        </div>

        {/* Two-Column Editorial Content */}
        <div className={styles.contentGrid}>
          {/* Sticky Sidebar Meta */}
          <aside className={styles.stickySidebar}>
            <div className={styles.metaBlock}>
              <div className={styles.metaLabel}>Domain &amp; Classification</div>
              <div className={styles.metaValue}>{project.category}</div>
            </div>

            <div className={styles.metaBlock}>
              <div className={styles.metaLabel}>Technologies &amp; Libraries</div>
              <div className={styles.techPillsWrap}>
                {project.technologies.map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.metaBlock}>
              <div className={styles.metaLabel}>Source Code Authority</div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.875rem',
                  color: 'var(--color-accent)',
                  fontWeight: 600,
                }}
              >
                <Github size={16} />
                <span>github.com/{project.slug}</span>
                <ArrowUpRight size={12} />
              </a>
            </div>

            {Boolean(project.liveUrl && project.liveUrl.trim()) && (
              <div className={styles.metaBlock}>
                <div className={styles.metaLabel}>Live Production App</div>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: '0.875rem',
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                  }}
                >
                  <Globe size={16} />
                  <span>Launch Live Demo</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            )}

            <div className={styles.metaBlock}>
              <div className={styles.metaLabel}>Architecture Pattern</div>
              <div className={styles.metaValue} style={{ fontSize: '0.875rem' }}>
                {project.architecture.pattern}
              </div>
            </div>
          </aside>

          {/* Main Case Narrative */}
          <div className={styles.caseNarrative}>
            {/* 1. Problem Statement & Motivation */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>The Problem &amp; Motivation</h2>
              <div className={styles.prose}>
                <p>
                  <strong>Context: </strong>
                  {project.problemStatement}
                </p>
                <p style={{ marginTop: 16 }}>
                  <strong>Motivation: </strong>
                  {project.motivation}
                </p>
              </div>
            </section>

            {/* 2. My Approach */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>Engineering Approach</h2>
              <p className={styles.prose}>{project.myApproach}</p>
            </section>

            {/* 3. System Architecture & Flow */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>System Architecture</h2>
              <div className={styles.architectureBox}>
                <div className={styles.architecturePattern}>
                  Pattern: {project.architecture.pattern}
                </div>
                <p className="text-body-muted">{project.architecture.description}</p>

                {/* Node Flow Visualizer */}
                {project.architecture.nodes && (
                  <>
                    <div className={styles.architectureNodesRow}>
                      {project.architecture.nodes.map((node, i) => {
                        const isSelected = selectedNodeId === node.id;
                        return (
                          <React.Fragment key={node.id}>
                            <div
                              className={`${styles.archNode} ${
                                isSelected ? styles.archNodeActive : ''
                              }`}
                              onClick={() =>
                                setSelectedNodeId(selectedNodeId === node.id ? null : node.id)
                              }
                              title="Click to inspect component role"
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  setSelectedNodeId(selectedNodeId === node.id ? null : node.id);
                                }
                              }}
                            >
                              <div className={styles.archNodeLabel}>{node.label}</div>
                              <div className={styles.archNodeRole}>{node.role}</div>
                            </div>
                            {i < project.architecture.nodes!.length - 1 && (
                              <div className={styles.archArrow}>
                                <ArrowRight size={18} />
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {selectedNodeId && (
                      <div className={styles.nodeDetailCallout}>
                        <Info size={16} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                        <div>
                          <strong>
                            {project.architecture.nodes.find((n) => n.id === selectedNodeId)?.label}:{' '}
                          </strong>
                          <span>
                            {project.architecture.nodes.find((n) => n.id === selectedNodeId)?.role} —
                            Architectural layer handling runtime communication, integrity checks,
                            and state boundary enforcement.
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Step-by-Step Flow Points */}
                <div style={{ marginTop: 20 }}>
                  <div className={styles.metaLabel}>Execution Lifecycle</div>
                  <ul className={styles.flowPointsList}>
                    {project.architecture.flowPoints.map((flow, i) => (
                      <li key={i} className={styles.flowPointItem}>
                        <span className={styles.flowStepNum}>0{i + 1}.</span>
                        <span>{flow}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Key Features */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>Key Capabilities</h2>
              <div className={styles.featureGrid}>
                {project.keyFeatures.map((feat, i) => {
                  const parts = feat.split(':');
                  const title = parts[0];
                  const desc = parts.slice(1).join(':');

                  return (
                    <div key={i} className={styles.featureCard}>
                      <div className={styles.featureTitle}>
                        <CheckCircle2
                          size={16}
                          color="var(--color-accent)"
                          style={{ display: 'inline', marginRight: 8 }}
                        />
                        {title}
                      </div>
                      {desc && <p className={styles.featureText}>{desc.trim()}</p>}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 5. Implementation Details & Code Snippet */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>Implementation Highlights</h2>
              <ul className={styles.flowPointsList}>
                {project.implementationDetails.map((detail, i) => (
                  <li key={i} className={styles.flowPointItem}>
                    <GitCommit size={16} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {project.codeSnippet && (
                <div style={{ marginTop: 24 }}>
                  <div className={styles.codeFrame}>
                    <div className={styles.codeHeader}>
                      <span className={styles.codeTitle}>{project.codeSnippet.title}</span>
                      <div className={styles.codeHeaderRight}>
                        <span className={styles.codeLang}>{project.codeSnippet.language}</span>
                        <button
                          className={`${styles.copyCodeButton} ${
                            copied ? styles.copyCodeSuccess : ''
                          }`}
                          onClick={() => {
                            navigator.clipboard.writeText(project.codeSnippet!.code);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          aria-label="Copy code to clipboard"
                        >
                          {copied ? <Check size={12} /> : <Copy size={12} />}
                          <span>{copied ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                    <pre className={styles.codeContent}>
                      <code>{project.codeSnippet.code}</code>
                    </pre>
                  </div>
                </div>
              )}
            </section>

            {/* 6. Technical Challenges, Solutions & Trade-offs */}
            <section className={styles.sectionBlock}>
              <h2 className={styles.sectionHeading}>Technical Challenges &amp; Trade-offs</h2>

              {project.technicalChallenges.map((ch, i) => (
                <div key={i} className={styles.challengeCard}>
                  <div className={styles.challengeTitle}>
                    <ShieldAlert
                      size={18}
                      color="var(--color-accent)"
                      style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }}
                    />
                    Challenge: {ch.challenge}
                  </div>
                  <div className={styles.solutionBox}>
                    <strong>Engineered Solution: </strong>
                    {ch.solution}
                  </div>
                </div>
              ))}

              {project.tradeoffs.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <div className={styles.metaLabel}>Architectural Trade-Off Rationale</div>
                  {project.tradeoffs.map((to, i) => (
                    <div key={i} className={styles.tradeoffCard}>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: 6 }}>
                        Decision: {to.decision}
                      </div>
                      <div className={styles.tradeoffGrid}>
                        <div className={`${styles.tradeoffChoice} ${styles.tradeoffChosen}`}>
                          <strong style={{ color: 'var(--color-accent)' }}>Chosen: </strong>
                          {to.chosen}
                        </div>
                        <div className={styles.tradeoffChoice}>
                          <strong style={{ color: 'var(--color-text-muted)' }}>
                            Alternative:
                          </strong>{' '}
                          {to.alternative}
                        </div>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                        <strong>Rationale: </strong>
                        {to.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Editorial Screenshot Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className={styles.gallerySection}>
            <h3 className={styles.sectionHeading}>Editorial Screenshot Gallery</h3>
            <div className={styles.galleryGrid}>
              {project.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className={styles.galleryItem}
                  data-cursor="view-project"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveImageModal(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveImageModal(item);
                    }
                  }}
                  title="Click or press Enter to view image"
                >
                  <div className={styles.galleryImgWrap}>
                    <img src={item.url} alt={item.alt} className={styles.galleryImg} loading="lazy" />
                  </div>
                  {item.caption && <div className={styles.galleryCaption}>{item.caption}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Previous / Next Project Navigation */}
        <div className={styles.prevNextBar}>
          <button
            className={styles.prevNextButton}
            onClick={() => onNavigateProject(prevProject.slug)}
            aria-label={`Previous project: ${prevProject.title}`}
          >
            <span className={styles.navDirectionLabel}>
              <ArrowLeft size={14} /> Previous Case Study
            </span>
            <span className={styles.navProjectTitle}>
              {prevProject.index}. {prevProject.title}
            </span>
          </button>

          <button
            className={`${styles.prevNextButton} ${styles.next}`}
            onClick={() => onNavigateProject(nextProject.slug)}
            aria-label={`Next project: ${nextProject.title}`}
          >
            <span className={styles.navDirectionLabel}>
              Next Case Study <ArrowRight size={14} />
            </span>
            <span className={styles.navProjectTitle}>
              {nextProject.index}. {nextProject.title}
            </span>
          </button>
        </div>

        {/* Related Projects Strip */}
        <div className={styles.relatedSection}>
          <h3 className={styles.relatedTitle}>Explore Related Works</h3>
          <div className={styles.relatedGrid}>
            {relatedProjects.map((rel) => (
              <div
                key={rel.id}
                className={styles.relatedCard}
                onClick={() => onNavigateProject(rel.slug)}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}
                >
                  <span className={styles.projectIndex}>{rel.index}.</span>
                  <span className="text-caption">{rel.category}</span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 4 }}>
                  {rel.title}
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  {rel.shortDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Image Preview Modal */}
      {activeImageModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setActiveImageModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalCloseButton}
              onClick={() => setActiveImageModal(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={activeImageModal.url}
              alt={activeImageModal.alt}
              className={styles.modalImg}
            />
            {activeImageModal.caption && (
              <div className={styles.modalFooter}>{activeImageModal.caption}</div>
            )}
          </div>
        </div>
      )}
    </motion.article>
  );
};
