import { TimelineItem } from '../types';

export const experienceData: TimelineItem[] = [
  {
    id: 'exp-independent-dev',
    category: 'independent',
    roleOrDegree: 'Independent Software Developer',
    organization: 'Self-Directed Product Development',
    period: '2023 — Present',
    location: 'India',
    isEngineeringRole: true,
    responsibilities: [
      'Cairn — Offline-first personal finance application with secure transaction tracking.',
      'CATPrep Pro — AI-powered verbal practice platform utilizing LLM-based assessment.',
      'Payment Fraud Detection — Machine learning classification model for transactional anomaly detection.',
    ],
  },
  {
    id: 'exp-tech-analyst',
    category: 'experience',
    roleOrDegree: 'Technical Analyst',
    organization: 'Inventive Research Organization',
    period: 'Prior Experience',
    location: 'India',
    isEngineeringRole: false,
    responsibilities: [
      'Standardized academic conference papers according to specific publisher guidelines.',
      'Verified technical document integrity and performed multi-point checks prior to editorial review.',
      'Managed plagiarism screening and academic integrity auditing workflows.',
      'Prepared conference proceedings, tables of contents, and comprehensive author indices.',
    ],
  },
  {
    id: 'edu-training-java',
    category: 'training',
    roleOrDegree: 'Java Full Stack Development Program',
    organization: 'Besant Technologies',
    period: 'Completed Intensive Training',
    location: 'India',
    isEngineeringRole: true,
    responsibilities: [
      'Studied Core Java, Object-Oriented Design principles, and advanced exception handling.',
      'Developed relational database solutions using SQL, MySQL, and schema normalization techniques.',
      'Built multi-tier, database-driven applications utilizing MVC architectural patterns.',
      'Implemented web application interfaces using Servlets, JSP, and core frontend technologies.',
    ],
  },
  {
    id: 'edu-mechanical-engineering',
    category: 'education',
    roleOrDegree: 'Bachelor of Engineering (B.E.) — Mechanical Engineering',
    organization: 'Undergraduate Degree',
    period: 'Completed',
    location: 'India',
    isEngineeringRole: false,
    responsibilities: [
      'Established a strong analytical foundation in physical modeling, systems engineering, and complex problem decomposition.',
      'Facilitated the transition from physical mechanics to software systems, algorithms, and computational architecture.',
    ],
  },
];
