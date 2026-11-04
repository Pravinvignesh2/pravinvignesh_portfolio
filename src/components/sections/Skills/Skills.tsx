import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Database,
  Cpu,
  Layers,
  Terminal,
  Server,
  Sparkles,
  GitBranch,
  Globe,
  ArrowRight,
  Info,
} from 'lucide-react';
import { Container } from '@/components/ui/Container/Container';
import { skillsData, skillCategories } from '@/data/skills';
import { SkillCategory, SkillItem } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Skills.module.css';

export const Skills: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(skillsData[0]);

  const filteredSkills =
    activeCategory === 'All'
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  const getSkillIcon = (name: string, category: SkillCategory) => {
    switch (category) {
      case 'Frontend':
        if (name.includes('React') || name.includes('Next')) return <Layers size={16} />;
        if (name.includes('CSS') || name.includes('Bootstrap')) return <Globe size={16} />;
        return <Code2 size={16} />;
      case 'Backend':
        if (name.includes('Java')) return <Cpu size={16} />;
        if (name.includes('Python')) return <Terminal size={16} />;
        return <Server size={16} />;
      case 'Database':
        return <Database size={16} />;
      case 'AI Integration':
        return <Sparkles size={16} />;
      case 'Tools':
        if (name.includes('Git')) return <GitBranch size={16} />;
        return <Terminal size={16} />;
      default:
        return <Code2 size={16} />;
    }
  };

  return (
    <section id="skills" className={styles.skillsSection}>
      <Container variant="standard">
        {/* Section Header */}
        <div className={styles.headerWrap}>
          <span className={styles.kicker}>02. Technical Skills</span>
          <h2 className={styles.title}>Tools I work with.</h2>
          <p className={styles.subtitle}>
            Technologies I have built production applications with and can explain in depth
            from fundamental principles to system architecture.
          </p>

          {/* Category Switcher Tabs */}
          <div className={styles.categoryBar} role="tablist" aria-label="Skill Categories">
            <button
              className={`${styles.categoryButton} ${
                activeCategory === 'All' ? styles.categoryButtonActive : ''
              }`}
              onClick={() => setActiveCategory('All')}
              role="tab"
              aria-selected={activeCategory === 'All'}
            >
              <span>All Technologies</span>
              <span className={styles.categoryCount}>({skillsData.length})</span>
            </button>

            {skillCategories.map((category) => {
              const count = skillsData.filter((s) => s.category === category).length;
              return (
                <button
                  key={category}
                  className={`${styles.categoryButton} ${
                    activeCategory === category ? styles.categoryButtonActive : ''
                  }`}
                  onClick={() => setActiveCategory(category)}
                  role="tab"
                  aria-selected={activeCategory === category}
                >
                  <span>{category}</span>
                  <span className={styles.categoryCount}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid & Interactive Detail Spotlight */}
        <div className={styles.skillsLayout}>
          {/* LEFT: Technology Cards Grid */}
          <motion.div layout className={styles.skillsGrid}>
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkill.name === skill.name;
                return (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReduced ? undefined : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`${styles.skillItemCard} ${
                      isSelected ? styles.skillItemCardActive : ''
                    }`}
                    onClick={() => setSelectedSkill(skill)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedSkill(skill);
                      }
                    }}
                    aria-label={`View details for ${skill.name}`}
                  >
                    <div>
                      <div className={styles.skillTop}>
                        <div className={styles.skillIconBox}>
                          {getSkillIcon(skill.name, skill.category)}
                        </div>
                        <span className={styles.skillCategoryTag}>{skill.category}</span>
                      </div>
                      <div className={styles.skillName}>{skill.name}</div>
                    </div>

                    <div className={styles.skillCardHint}>
                      <span>Inspect context</span>
                      <ArrowRight size={12} />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: Sticky Inspection Panel on Desktop */}
          <div className={styles.detailPane}>
            <div className={styles.detailHeader}>
              <div className={styles.detailIconBox}>
                {getSkillIcon(selectedSkill.name, selectedSkill.category)}
              </div>
              <div>
                <h3 className={styles.detailTitle}>{selectedSkill.name}</h3>
                <span className={styles.detailCategory}>{selectedSkill.category}</span>
              </div>
            </div>

            <div className={styles.detailSectionLabel}>Core Capabilities</div>
            <p className={styles.detailDescription}>{selectedSkill.description}</p>

            <div className={styles.detailSectionLabel}>Demonstrated Application</div>
            <div className={styles.contextBox}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Info size={14} color="var(--color-accent)" />
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  Verified In Real Projects
                </span>
              </div>
              <p className={styles.contextText}>{selectedSkill.confidenceContext}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
