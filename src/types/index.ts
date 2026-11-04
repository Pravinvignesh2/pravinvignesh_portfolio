export type ThemeMode = 'light' | 'dark' | 'system';

export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'email' | 'external';
}

export interface ProfileData {
  name: string;
  brand: string;
  title: string;
  tagline: string;
  supportingText: string;
  location: string;
  githubUrl: string;
  githubUsername: string;
  linkedinUrl: string;
  email: string;
  isAvailableForHire: boolean;
  availabilityNote: string;
  bioParagraphs: string[];
  keyHighlights: string[];
}

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'AI Integration' | 'Tools';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  description: string;
  confidenceContext: string;
  iconName?: string;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string; // e.g. "cairn", "catprep-pro", "murugan-erp", "memorychat", "fraud-detection"
  index: string; // e.g. "01"
  title: string;
  subtitle: string;
  shortDescription: string;
  featured: boolean;
  category: string;
  technologies: string[];
  status: 'Implemented' | 'In Active Development' | 'Research Prototype';
  motivation: string;
  myApproach: string;
  problemStatement: string;
  keyFeatures: string[];
  architecture: {
    pattern: string;
    description: string;
    flowPoints: string[];
    nodes?: { id: string; label: string; role: string; type: 'client' | 'service' | 'storage' | 'ai' }[];
  };
  implementationDetails: string[];
  technicalChallenges: {
    challenge: string;
    solution: string;
  }[];
  tradeoffs: {
    decision: string;
    chosen: string;
    alternative: string;
    rationale: string;
  }[];
  codeSnippet?: {
    title: string;
    language: string;
    code: string;
  };
  githubUrl: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  placeholderImage: string;
  coverImage?: string;
  gallery?: {
    url: string;
    caption?: string;
    alt: string;
  }[];
  accentColor: string;
}

export interface TimelineItem {
  id: string;
  category: 'education' | 'training' | 'experience' | 'independent';
  roleOrDegree: string;
  organization: string;
  period: string;
  location?: string;
  responsibilities: string[];
  credentialOrProof?: string;
  isEngineeringRole: boolean;
}
