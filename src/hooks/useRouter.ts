import { useEffect, useState, useCallback } from 'react';
import { projectsData } from '@/data/projects';

export function useRouter() {
  const getPath = (): string => {
    if (typeof window === 'undefined') return '/';

    // 1. Check if hash specifies a project route (e.g., #/projects/cairn or #projects/cairn)
    const rawHash = window.location.hash.replace(/^#/, '');
    if (rawHash.startsWith('/projects/') || rawHash.startsWith('projects/')) {
      return rawHash.startsWith('/') ? rawHash : `/${rawHash}`;
    }

    // 2. Otherwise return the actual pathname
    const path = window.location.pathname;
    return path && path !== '' ? path : '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPath());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = useCallback((path: string) => {
    if (typeof window === 'undefined') return;

    // Push state and update path
    try {
      window.history.pushState({}, '', path);
    } catch {
      // Fallback for strict sandbox iframe restrictions
      window.location.hash = path;
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Extract slug if on a project route: /projects/:slug
  const projectSlugMatch = currentPath.match(/^\/projects\/([a-zA-Z0-9_-]+)/);
  const rawProjectSlug = projectSlugMatch ? projectSlugMatch[1] : null;

  const validProject = rawProjectSlug
    ? projectsData.find((p) => p.slug === rawProjectSlug)
    : null;

  const isProjectPage = Boolean(rawProjectSlug && validProject);
  const currentProjectSlug = isProjectPage ? rawProjectSlug : null;

  // Route classification
  const isHomepage = currentPath === '/' || currentPath === '';
  const isInvalidProjectRoute = Boolean(rawProjectSlug) && !validProject;
  const isUnknownRoute = !isHomepage && !isProjectPage && !isInvalidProjectRoute;

  const isNotFound = isInvalidProjectRoute || isUnknownRoute;

  return {
    currentPath,
    currentProjectSlug,
    navigate,
    isProjectPage,
    isNotFound,
  };
}


