import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Compass,
  User,
  Cpu,
  Layers,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  FileText,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './CommandPalette.module.css';

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Case Studies' | 'Actions' | 'Links';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tag?: string;
  keywords?: string[];
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onNavigateProject: (slug: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
  onNavigateProject,
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const prefersReduced = useReducedMotion();

  // Save previous focus on modal open, restore on close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Construct master command list
  const commands: CommandItem[] = useMemo(() => {
    const list: CommandItem[] = [
      // Navigation
      {
        id: 'nav-home',
        category: 'Navigation',
        title: 'Go to Hero / Introduction',
        subtitle: 'Pravinvignesh P. software developer overview',
        icon: <Compass size={18} />,
        keywords: ['home', 'hero', 'intro', 'start'],
        action: () => onNavigateSection('hero'),
      },
      {
        id: 'nav-about',
        category: 'Navigation',
        title: 'Go to About Me',
        subtitle: 'Mechanical engineering background to software development',
        icon: <User size={18} />,
        keywords: ['about', 'bio', 'journey', 'education', 'background'],
        action: () => onNavigateSection('about'),
      },
      {
        id: 'nav-skills',
        category: 'Navigation',
        title: 'Go to Technical Skills',
        subtitle: 'Frontend, backend, databases, AI integration and tools',
        icon: <Cpu size={18} />,
        keywords: ['skills', 'tools', 'technologies', 'react', 'java', 'python'],
        action: () => onNavigateSection('skills'),
      },
      {
        id: 'nav-projects',
        category: 'Navigation',
        title: 'Go to Featured Projects',
        subtitle: 'Bento showcase of selected production case studies',
        icon: <Layers size={18} />,
        keywords: ['projects', 'work', 'case studies', 'showcase'],
        action: () => onNavigateSection('projects'),
      },
      {
        id: 'nav-experience',
        category: 'Navigation',
        title: 'Go to Experience & Education',
        subtitle: 'Work history, Besant training, and academic background',
        icon: <GraduationCap size={18} />,
        keywords: ['experience', 'education', 'timeline', 'k-inventive', 'besant'],
        action: () => onNavigateSection('experience'),
      },
      {
        id: 'nav-contact',
        category: 'Navigation',
        title: 'Go to Contact & Connect',
        subtitle: "Have an idea? Let's make it happen",
        icon: <Mail size={18} />,
        keywords: ['contact', 'email', 'message', 'hire', 'reach'],
        action: () => onNavigateSection('contact'),
      },

      // Project Case Studies
      ...projectsData.map((project) => ({
        id: `project-${project.slug}`,
        category: 'Case Studies' as const,
        title: `${project.index}. ${project.title} — ${project.subtitle}`,
        subtitle: project.shortDescription,
        icon: <Sparkles size={18} />,
        tag: project.category,
        keywords: [
          project.title.toLowerCase(),
          project.slug,
          ...project.technologies.map((t) => t.toLowerCase()),
        ],
        action: () => onNavigateProject(project.slug),
      })),

      // Actions & Settings
      {
        id: 'act-resume',
        category: 'Actions',
        title: 'Download Resume',
        subtitle: 'Access Pravinvignesh P. verified CV document',
        icon: <FileText size={18} />,
        tag: 'PDF',
        keywords: ['resume', 'cv', 'download', 'pdf'],
        action: () => {
          const a = document.createElement('a');
          a.href = '/resume/pravinvignesh_resume.pdf';
          a.download = 'Pravinvignesh_P_Resume.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },
      },

      // External Links
      {
        id: 'link-github',
        category: 'Links',
        title: `Open GitHub Profile (${profileData.githubUsername})`,
        subtitle: 'Explore open-source repositories and code contributions',
        icon: <Github size={18} />,
        tag: 'External',
        keywords: ['github', 'git', 'repo', 'source', 'code'],
        action: () => {
          window.open(profileData.githubUrl, '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'link-linkedin',
        category: 'Links',
        title: 'Open LinkedIn Profile',
        subtitle: 'Connect professionally on LinkedIn',
        icon: <Linkedin size={18} />,
        tag: 'External',
        keywords: ['linkedin', 'network', 'profile', 'connect'],
        action: () => {
          window.open(profileData.linkedinUrl, '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'link-email',
        category: 'Links',
        title: `Send Direct Email (${profileData.email})`,
        subtitle: 'Compose message to personal email address',
        icon: <Mail size={18} />,
        tag: 'Direct',
        keywords: ['email', 'mail', 'write', 'inquiry'],
        action: () => {
          window.location.href = `mailto:${profileData.email}`;
        },
      },
    ];

    return list;
  }, [onNavigateSection, onNavigateProject]);

  // Filter commands by query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const cleanQuery = query.toLowerCase().trim();

    return commands.filter((cmd) => {
      if (cmd.title.toLowerCase().includes(cleanQuery)) return true;
      if (cmd.subtitle.toLowerCase().includes(cleanQuery)) return true;
      if (cmd.category.toLowerCase().includes(cleanQuery)) return true;
      if (cmd.keywords?.some((k) => k.includes(cleanQuery))) return true;
      return false;
    });
  }, [query, commands]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Keyboard navigation handler (Arrows, Enter, Escape)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        filteredCommands[activeIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Ensure active element is scrolled into view in list
  useEffect(() => {
    const list = listRef.current;
    if (list) {
      const activeElement = list.querySelector(`.${styles.itemActive}`) as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className={styles.backdrop}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        <motion.div
          className={styles.modal}
          initial={prefersReduced ? false : { opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Search Bar Input */}
          <div className={styles.searchBar}>
            <Search size={20} className={styles.searchIcon} />
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder="Type a command or search sections, case studies, tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck="false"
            />
            <span className={styles.shortcutBadge}>ESC</span>
          </div>

          {/* Results List */}
          <div ref={listRef} className={styles.resultsList}>
            {filteredCommands.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyTitle}>No matching commands</div>
                <div className={styles.emptySubtitle}>
                  Try searching for &quot;Cairn&quot;, &quot;Skills&quot;, &quot;Theme&quot;, or &quot;Resume&quot;
                </div>
              </div>
            ) : (
              filteredCommands.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    role="option"
                    aria-selected={isActive}
                  >
                    <div className={styles.itemLeft}>
                      <span className={styles.itemIcon}>{item.icon}</span>
                      <div className={styles.itemContent}>
                        <div className={styles.itemTitle}>{item.title}</div>
                        <div className={styles.itemSubtitle}>{item.subtitle}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {item.tag && <span className={styles.itemTag}>{item.tag}</span>}
                      {isActive && <ArrowRight size={14} color="var(--color-accent)" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts Guide */}
          <div className={styles.footer}>
            <div className={styles.shortcutsRow}>
              <div className={styles.shortcutItem}>
                <span className={styles.kbd}>&uarr;</span>
                <span className={styles.kbd}>&darr;</span>
                <span>Navigate</span>
              </div>
              <div className={styles.shortcutItem}>
                <span className={styles.kbd}>&crarr;</span>
                <span>Select</span>
              </div>
              <div className={styles.shortcutItem}>
                <span className={styles.kbd}>ESC</span>
                <span>Close</span>
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>
              {filteredCommands.length} commands available
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
