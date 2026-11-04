import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Search } from 'lucide-react';
import { Container } from '@/components/ui/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import styles from './Navbar.module.css';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection = 'hero',
  onNavigate,
  onOpenCommandPalette,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Work', href: '#projects', id: 'projects' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={styles.header}>
      <Container variant="standard">
        <div className={styles.navRow}>
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#hero"
            className={styles.brand}
            onClick={(e) => handleLinkClick(e, 'hero')}
            aria-label="Pravinvignesh P. - Home"
          >
            pravinvignesh<span className={styles.brandDot}>.</span>
          </a>

          {/* Zone 2: 4-5 Clean Nav Links */}
          <nav className={styles.navLinks} aria-label="Main Navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`${styles.navLink} ${
                  activeSection === item.id ? styles.active : ''
                }`.trim()}
                onClick={(e) => handleLinkClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Command Trigger + Theme Switcher */}
          <div className={styles.actions}>
            {onOpenCommandPalette && (
              <button
                className={styles.commandTrigger}
                onClick={onOpenCommandPalette}
                aria-label="Open command palette (Cmd+K)"
                title="Command Palette (Cmd+K / Ctrl+K)"
              >
                <Search size={15} />
                <span className={styles.commandTriggerText}>Commands</span>
                <span className={styles.commandShortcut}>⌘K</span>
              </button>
            )}

            <Button
              variant="primary"
              size="sm"
              href="#contact"
              onClick={(e) => handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, 'contact')}
              iconRight={<ArrowUpRight size={14} />}
            >
              Get in Touch
            </Button>

            <button
              className={styles.mobileMenuButton}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className={`${styles.mobileDrawer} ${styles.mobileDrawerOpen}`}>
          <div className={styles.mobileNavLinks}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={styles.mobileNavLink}
                onClick={(e) => handleLinkClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className={styles.mobileActions}>
            {onOpenCommandPalette && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCommandPalette();
                }}
                iconLeft={<Search size={16} />}
                style={{ width: '100%', marginBottom: 8 }}
              >
                Command Palette (⌘K)
              </Button>
            )}
            <Button
              variant="primary"
              size="md"
              href="#contact"
              onClick={(e) => handleLinkClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, 'contact')}
              style={{ width: '100%' }}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
