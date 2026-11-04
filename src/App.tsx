import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { ScrollProgress } from '@/components/ui/ScrollProgress/ScrollProgress';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Hero } from '@/components/sections/Hero/Hero';
import { About } from '@/components/sections/About/About';
import { Skills } from '@/components/sections/Skills/Skills';
import { ProjectShowcase } from '@/components/sections/Projects/ProjectShowcase';
import { Experience } from '@/components/sections/Experience/Experience';
import { Contact } from '@/components/sections/Contact/Contact';
import { Footer } from '@/components/layout/Footer/Footer';
import { CaseStudyPage } from '@/components/case-study/CaseStudyPage';
import { NotFoundPage } from '@/components/pages/NotFoundPage/NotFoundPage';
import { CommandPalette } from '@/components/ui/CommandPalette/CommandPalette';
import { useRouter } from '@/hooks/useRouter';
import { useSEO } from '@/hooks/useSEO';
import { pageTransitionVariants } from '@/lib/motion';

export default function App() {
  const { currentProjectSlug, isProjectPage, isNotFound, navigate } = useRouter();
  const [activeSection, setActiveSection] = useState('hero');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Homepage SEO metadata
  useSEO({
    title: 'Pravinvignesh P. — Software Developer Portfolio',
    description:
      'Portfolio of Pravinvignesh P., a Software Developer passionate about building modern applications, solving practical problems, and exploring AI possibilities.',
    path: '/',
    image: '/images/og/portfolio-preview.png',
  });

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll spy on homepage
  useEffect(() => {
    if (isProjectPage || isNotFound) return;

    const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isProjectPage, isNotFound]);

  const handleNavigate = (sectionId: string) => {
    if (isProjectPage || isNotFound) {
      // Return to homepage and then scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } else {
      setActiveSection(sectionId);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="portfolio-app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>


      <ScrollProgress />

      <Navbar
        activeSection={isProjectPage ? 'projects' : activeSection}
        onNavigate={handleNavigate}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Global Spotlight Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateSection={handleNavigate}
        onNavigateProject={(slug) => navigate(`/projects/${slug}`)}
      />

      {/* Page Transitions */}
      <AnimatePresence mode="wait">
        {isNotFound ? (
          <motion.div
            key="404"
            id="main-content"
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <NotFoundPage
              onNavigateHome={() => navigate('/')}
              onNavigateProjects={() => handleNavigate('projects')}
            />
          </motion.div>
        ) : isProjectPage && currentProjectSlug ? (
          <motion.div
            key={currentProjectSlug}
            id="main-content"
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <CaseStudyPage
              slug={currentProjectSlug}
              onNavigateHome={() => navigate('/')}
              onNavigateProject={(slug) => navigate(`/projects/${slug}`)}
            />
          </motion.div>
        ) : (
          <motion.main
            key="home"
            id="main-content"
            variants={pageTransitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Hero />
            <About />
            <Skills />
            <ProjectShowcase
              onSelectProject={(slug) => navigate(`/projects/${slug}`)}
            />
            <Experience />
            <Contact />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer />
      <Analytics />
    </div>
  );
}

