import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  FileText,
  Sparkles,
  Layers,
  Code2,
  Cpu,
  Palette,
  CheckCircle2,
} from 'lucide-react';
import { Container } from '@/components/ui/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { MetaList, FilterTab } from '@/components/ui/Tag/Tag';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';
import { skillsData, skillCategories } from '@/data/skills';
import { experienceData } from '@/data/experience';
import styles from './Phase1Showcase.module.css';

export const Phase1Showcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'components' | 'projects' | 'skills' | 'timeline'>('tokens');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('All');

  const filteredSkills =
    selectedSkillCategory === 'All'
      ? skillsData
      : skillsData.filter((s) => s.category === selectedSkillCategory);

  return (
    <main className={styles.main}>
      {/* =====================================================================
          HERO SECTION — APPLE EDITORIAL IDENTITY & PROFILE PHOTOGRAPH AREA
          ===================================================================== */}
      <section id="hero" className={styles.heroSection}>
        <Container variant="standard">
          <div className={styles.heroGrid}>
            <div>
              {/* Identity & Status */}
              <div className={styles.identityKicker}>
                <span className={styles.statusIndicator}>
                  <span className={styles.statusDot} />
                  {profileData.availabilityNote}
                </span>
              </div>

              {/* Editorial Hero Headline */}
              <h1 className={styles.heroTitle}>{profileData.tagline}</h1>

              {/* Supporting Text */}
              <p className={styles.heroSubtitle}>{profileData.supportingText}</p>

              {/* CTAs */}
              <div className={styles.heroCtaGroup}>
                <Button
                  variant="primary"
                  size="lg"
                  href="#foundations"
                  iconRight={<ArrowDown size={18} />}
                >
                  Explore Foundations
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  href="/resume/resume-notice.txt"
                  isExternal
                  iconLeft={<FileText size={18} />}
                >
                  Resume Placeholder
                </Button>
              </div>

              {/* Verified Links */}
              <div className={styles.socialRow}>
                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Github size={16} />
                  <span>GitHub ({profileData.githubUsername})</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={14} />
                </a>

                <a href={`mailto:${profileData.email}`} className={styles.socialLink}>
                  <Mail size={16} />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Dedicated Profile Photograph Area */}
            <div>
              <div className={styles.profileCard}>
                <div className={styles.profileImageContainer}>
                  <img
                    src="/images/profile/profile.svg"
                    alt="Pravinvignesh P. - Profile Portrait Placeholder"
                    className={styles.profileImage}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className={styles.profileBadge}>
                  <div className={styles.profileName}>{profileData.name}</div>
                  <div className={styles.profileRole}>{profileData.title}</div>
                  <div className={styles.profileLocation}>Based in {profileData.location}</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          FOUNDATIONS & ARCHITECTURE EXPLORER (PHASE 1 COMPLETE ENGINE)
          ===================================================================== */}
      <section id="foundations" className={styles.foundationsSection}>
        <Container variant="standard">
          <SectionHeading
            kicker="Phase 1 Foundation"
            title="Design System & Architecture Engine"
            subtitle="Engineered with Apple-inspired minimalism, CSS Modules, pure design tokens, and strictly non-fabricated project data structures ready for Phase 2."
          />

          {/* Interactive Navigation Tabs */}
          <div className={styles.tabsBar} role="tablist">
            <button
              className={`${styles.tabItem} ${activeTab === 'tokens' ? styles.tabItemActive : ''}`}
              onClick={() => setActiveTab('tokens')}
              role="tab"
              aria-selected={activeTab === 'tokens'}
            >
              <Palette size={14} style={{ display: 'inline', marginRight: 6 }} />
              Design Tokens
            </button>
            <button
              className={`${styles.tabItem} ${activeTab === 'components' ? styles.tabItemActive : ''}`}
              onClick={() => setActiveTab('components')}
              role="tab"
              aria-selected={activeTab === 'components'}
            >
              <Layers size={14} style={{ display: 'inline', marginRight: 6 }} />
              UI Components
            </button>
            <button
              className={`${styles.tabItem} ${activeTab === 'projects' ? styles.tabItemActive : ''}`}
              onClick={() => setActiveTab('projects')}
              role="tab"
              aria-selected={activeTab === 'projects'}
            >
              <Code2 size={14} style={{ display: 'inline', marginRight: 6 }} />
              Projects Data ({projectsData.length})
            </button>
            <button
              className={`${styles.tabItem} ${activeTab === 'skills' ? styles.tabItemActive : ''}`}
              onClick={() => setActiveTab('skills')}
              role="tab"
              aria-selected={activeTab === 'skills'}
            >
              <Cpu size={14} style={{ display: 'inline', marginRight: 6 }} />
              Skills Catalog ({skillsData.length})
            </button>
            <button
              className={`${styles.tabItem} ${activeTab === 'timeline' ? styles.tabItemActive : ''}`}
              onClick={() => setActiveTab('timeline')}
              role="tab"
              aria-selected={activeTab === 'timeline'}
            >
              <CheckCircle2 size={14} style={{ display: 'inline', marginRight: 6 }} />
              Experience &amp; Education
            </button>
          </div>

          {/* TAB 1: DESIGN TOKENS */}
          {activeTab === 'tokens' && (
            <div className={styles.tokensGrid}>
              <Card>
                <div className={styles.swatch} style={{ backgroundColor: '#F5F4F0' }} />
                <div className={styles.tokenLabel}>Canvas Background (Light)</div>
                <div className={styles.tokenValue}>#F5F4F0 (Warm Off-White)</div>
                <p className="text-body-muted" style={{ marginTop: 8, fontSize: '0.8125rem' }}>
                  Dominant 60% warm paper editorial aesthetic.
                </p>
              </Card>

              <Card>
                <div className={styles.swatch} style={{ backgroundColor: '#171717' }} />
                <div className={styles.tokenLabel}>Primary Text</div>
                <div className={styles.tokenValue}>#171717 (Near-Black)</div>
                <p className="text-body-muted" style={{ marginTop: 8, fontSize: '0.8125rem' }}>
                  WCAG AA high-contrast editorial typography.
                </p>
              </Card>

              <Card>
                <div className={styles.swatch} style={{ backgroundColor: '#77736F' }} />
                <div className={styles.tokenLabel}>Secondary Text</div>
                <div className={styles.tokenValue}>#77736F (Warm Grey)</div>
                <p className="text-body-muted" style={{ marginTop: 8, fontSize: '0.8125rem' }}>
                  Natural subdued reading hierarchy.
                </p>
              </Card>

              <Card>
                <div className={styles.swatch} style={{ backgroundColor: '#5268E8' }} />
                <div className={styles.tokenLabel}>Brand Accent</div>
                <div className={styles.tokenValue}>#5268E8 (Muted Electric Blue)</div>
                <p className="text-body-muted" style={{ marginTop: 8, fontSize: '0.8125rem' }}>
                  Strict 10% high-intent action budget.
                </p>
              </Card>

              <Card>
                <div className={styles.swatch} style={{ backgroundColor: '#151515' }} />
                <div className={styles.tokenLabel}>Dark Mode Canvas</div>
                <div className={styles.tokenValue}>#151515 (Apple Pure Dark)</div>
                <p className="text-body-muted" style={{ marginTop: 8, fontSize: '0.8125rem' }}>
                  Seamless dual-theme surface matching.
                </p>
              </Card>

              <Card>
                <div className={styles.swatch} style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(23,23,23,0.1)' }} />
                <div className={styles.tokenLabel}>Card Surfaces</div>
                <div className={styles.tokenValue}>#FFFFFF (Radius: 12–20px)</div>
                <p className="text-body-muted" style={{ marginTop: 8, fontSize: '0.8125rem' }}>
                  Hairline border with zero card-in-card nesting.
                </p>
              </Card>
            </div>
          )}

          {/* TAB 2: UI COMPONENTS SANDBOX */}
          {activeTab === 'components' && (
            <div className={styles.sandboxGrid}>
              <Card>
                <h3 className="text-heading-3">Button Hierarchy</h3>
                <p className="text-body-muted" style={{ marginTop: 4 }}>
                  Apple-inspired single-line interactive controls.
                </p>

                <div className={styles.componentRow}>
                  <Button variant="primary" size="md">
                    Primary Button
                  </Button>
                  <Button variant="accent" size="md">
                    Accent Action
                  </Button>
                  <Button variant="secondary" size="md">
                    Secondary
                  </Button>
                  <Button variant="ghost" size="md">
                    Ghost Link
                  </Button>
                  <Button variant="outline" size="md">
                    Outline
                  </Button>
                </div>
              </Card>

              <Card>
                <h3 className="text-heading-3">Magnetic Physics &amp; Reduced Motion</h3>
                <p className="text-body-muted" style={{ marginTop: 4 }}>
                  Hover with cursor to experience gentle magnetic attraction.
                </p>

                <div className={styles.componentRow}>
                  <Button variant="accent" size="md" iconRight={<Sparkles size={16} />}>
                    Accent Action
                  </Button>
                  <Button variant="secondary" size="md">
                    Secondary Action
                  </Button>
                </div>
              </Card>

              <Card>
                <h3 className="text-heading-3">Zero-Pill Metadata Discipline</h3>
                <p className="text-body-muted" style={{ marginTop: 4 }}>
                  Unboxed text with typographic separators; no garish pill capsules.
                </p>

                <div style={{ marginTop: 16 }}>
                  <MetaList
                    items={[
                      'Software Developer',
                      'Mechanical Engineering',
                      'Full-Stack & AI',
                      'India',
                    ]}
                  />
                  <div style={{ marginTop: 12 }}>
                    <MetaList
                      items={[
                        'Cairn',
                        'Offline-First',
                        'Integer Paise Calculations',
                        'React + IndexedDB',
                      ]}
                      separator="/"
                    />
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-heading-3">Single-Elevation Cards</h3>
                <p className="text-body-muted" style={{ marginTop: 4 }}>
                  Surfaces engineered with subtle hairline borders.
                </p>

                <div className={styles.componentRow}>
                  <Card variant="default" padding="sm" style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Default Surface</span>
                  </Card>
                  <Card variant="subtle" padding="sm" style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Subtle Inset</span>
                  </Card>
                  <Card variant="elevated" interactive padding="sm" style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Hoverable Card</span>
                  </Card>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 3: PROJECTS DATA */}
          {activeTab === 'projects' && (
            <div className={styles.projectsList}>
              {projectsData.map((project) => (
                <Card key={project.id} interactive>
                  <div className={styles.projectCardVisual}>
                    <img
                      src={project.placeholderImage}
                      alt={project.title}
                      className={styles.projectVisualImg}
                    />
                  </div>

                  <div className={styles.projectHeader}>
                    <span className={styles.projectIndex}>{project.index}.</span>
                    <span className="text-caption">{project.category}</span>
                  </div>

                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <div className={styles.projectSubtitle}>{project.subtitle}</div>
                  <p className={styles.projectDescription}>{project.shortDescription}</p>

                  <MetaList items={project.technologies.slice(0, 3)} />

                  <div className={styles.techTags}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      href={project.githubUrl}
                      isExternal
                      iconLeft={<Github size={14} />}
                      iconRight={<ArrowUpRight size={12} />}
                    >
                      GitHub Repo
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* TAB 4: SKILLS DATA */}
          {activeTab === 'skills' && (
            <div>
              {/* Filter Tabs */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                <FilterTab
                  active={selectedSkillCategory === 'All'}
                  onClick={() => setSelectedSkillCategory('All')}
                >
                  All Skills ({skillsData.length})
                </FilterTab>
                {skillCategories.map((category) => (
                  <FilterTab
                    key={category}
                    active={selectedSkillCategory === category}
                    onClick={() => setSelectedSkillCategory(category)}
                  >
                    {category}
                  </FilterTab>
                ))}
              </div>

              <div className={styles.skillsGrid}>
                {filteredSkills.map((skill) => (
                  <div key={skill.name} className={styles.skillCard}>
                    <div className={styles.skillCategoryTag}>{skill.category}</div>
                    <div className={styles.skillName}>{skill.name}</div>
                    <p className={styles.skillDesc}>{skill.description}</p>
                    <p
                      style={{
                        marginTop: 8,
                        fontSize: '0.75rem',
                        color: 'var(--color-accent)',
                      }}
                    >
                      {skill.confidenceContext}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: EXPERIENCE & EDUCATION TIMELINE */}
          {activeTab === 'timeline' && (
            <div className={styles.timeline}>
              {experienceData.map((item) => (
                <div key={item.id} className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelinePeriod}>{item.period}</div>
                  <h3 className={styles.timelineRole}>{item.roleOrDegree}</h3>
                  <div className={styles.timelineOrg}>{item.organization}</div>

                  <ul className={styles.timelineList}>
                    {item.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>

                  {!item.isEngineeringRole && (
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        fontStyle: 'italic',
                      }}
                    >
                      Accurately recorded as publishing/technical document workflow, not software engineering.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
};
