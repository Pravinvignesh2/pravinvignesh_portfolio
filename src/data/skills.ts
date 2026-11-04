import { SkillCategory, SkillItem } from '../types';

export const skillCategories: SkillCategory[] = [
  'Frontend',
  'Backend',
  'Database',
  'AI Integration',
  'Tools',
];

export const skillsData: SkillItem[] = [
  // Frontend
  {
    name: 'React.js',
    category: 'Frontend',
    description: 'Component architecture, custom hooks, context, state management, and lifecycle optimization.',
    confidenceContext: 'Primary web framework used in Cairn and CATPrep Pro.',
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    description: 'App Router architecture, server & client components, API routes, and page routing.',
    confidenceContext: 'Modern full-stack React framework for high-performance production apps.',
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'Frontend',
    description: 'Asynchronous event loop, promises, DOM manipulation, closures, and modern ES features.',
    confidenceContext: 'Core language proficiency used across web applications and data parsers.',
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    description: 'Static typing, interface contracts, generics, strict null checking, and refactoring safety.',
    confidenceContext: 'Implemented for type-safe codebases across projects.',
  },
  {
    name: 'HTML5 & Semantic Markup',
    category: 'Frontend',
    description: 'Accessible semantic structures, forms, audio/video elements, and SEO compliance.',
    confidenceContext: 'Rock-solid foundation for accessible, standard-compliant applications.',
  },
  {
    name: 'CSS3 & CSS Modules',
    category: 'Frontend',
    description: 'Flexbox, CSS Grid, modular CSS scoping, custom properties, and responsive design.',
    confidenceContext: 'Clean layout engineering and zero-conflict component-scoped styling.',
  },

  // Backend
  {
    name: 'Java',
    category: 'Backend',
    description: 'Object-Oriented Programming, collections framework, multi-threading, and core principles.',
    confidenceContext: 'Trained in Java Full Stack development at Besant Technologies.',
  },
  {
    name: 'Python',
    category: 'Backend',
    description: 'Data manipulation with Pandas/NumPy, machine learning modeling with Scikit-Learn.',
    confidenceContext: 'Applied in payment fraud machine learning analysis and data scripts.',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    description: 'Server runtime, Express.js middleware, and asynchronous file/network handling.',
    confidenceContext: 'Used for lightweight backend API routing and serverless endpoints.',
  },

  // Database
  {
    name: 'MySQL',
    category: 'Database',
    description: 'Relational schema design, normalization (1NF-3NF), indexing, and SQL queries.',
    confidenceContext: 'Core relational database studied in Java full-stack coursework.',
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    description: 'Relational data modeling, foreign keys, ACID compliance, and complex joins.',
    confidenceContext: 'Relational database schema modeling, ACID transactions, and query optimization.',
  },
  {
    name: 'Supabase',
    category: 'Database',
    description: 'Postgres BaaS, row-level security (RLS), real-time subscriptions, and object storage.',
    confidenceContext: 'Cloud database provisioning, authentication, and secure access policies.',
  },

  // AI Integration
  {
    name: 'Gemini API',
    category: 'AI Integration',
    description: 'LLM integration, structured JSON output, system instruction design, and token management.',
    confidenceContext: 'Integrated in CATPrep Pro for automated logical question reasoning.',
  },
  {
    name: 'OpenAI API',
    category: 'AI Integration',
    description: 'Chat completions, embeddings, and API consumption in client-side prototypes.',
    confidenceContext: 'Practical familiarity with modern generative AI SDKs.',
  },

  // Tools
  {
    name: 'Git & GitHub',
    category: 'Tools',
    description: 'Branching strategies, atomic commits, pull requests, and collaborative code reviews.',
    confidenceContext: 'Daily source control workflow across all open-source repositories.',
  },
  {
    name: 'Vercel',
    category: 'Tools',
    description: 'Continuous deployment pipelines, preview environments, and domain management.',
    confidenceContext: 'Preferred hosting platform for modern web deployments.',
  },
];
