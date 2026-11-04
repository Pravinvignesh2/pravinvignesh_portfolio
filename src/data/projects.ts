import { ProjectCaseStudy } from '../types';

export const projectsData: ProjectCaseStudy[] = [
  {
    id: 'cairn',
    slug: 'cairn',
    index: '01',
    title: 'Cairn',
    subtitle: 'Personal Finance, Clearly.',
    shortDescription:
      'Offline-first personal expense tracker featuring integer paise arithmetic, zero-latency IndexedDB persistence, Firebase cloud synchronization, and multi-party reimbursement management.',
    featured: true,
    category: 'Offline-First Full-Stack Web',
    technologies: ['React', 'TypeScript', 'IndexedDB', 'Firebase Firestore', 'CSS Modules'],
    status: 'Implemented',
    motivation:
      'Most personal finance applications fail in real-world everyday contexts: they require continuous network connectivity to record a 2-second grocery bill, introduce cumulative floating-point rounding errors when tracking split transactions, or lock personal financial data inside proprietary cloud silos.',
    myApproach:
      'Engineered a deterministic, local-first web application where all state transitions, monetary balances, and category aggregations execute synchronously in browser IndexedDB. Cloud synchronization with Firebase Firestore runs as an opportunistic, non-blocking background queue with idempotency keys and vector clocks.',
    problemStatement:
      'Users frequently need to record transactions in low-connectivity retail basements or transit zones. Cloud-dependent apps fail on transaction entry, causing users to abandon logging. Additionally, standard JavaScript floating-point numbers (0.1 + 0.2 !== 0.3) produce rounding drift over months of financial accounting.',
    keyFeatures: [
      'Offline-First Local Storage: Direct, instant writes to browser IndexedDB with zero spinner delay.',
      'Integer Paise Currency Arithmetic: Stores every transaction in integer paise (₹1 = 100 paise), eliminating IEEE 754 float drift.',
      'Opportunistic Firebase Cloud Sync: Background service worker detects online/offline transitions and synchronizes local change-logs to Firestore.',
      'Multi-Party Reimbursement Tracking: Differentiates personal expenditures from recoverable company or shared group expenses.',
      'Granular Categorization & Aggregations: Dynamic tag indices supporting multi-dimensional spending breakdown by month, category, and payment mode.',
      'Local Data Portability: One-click export/import in standardized JSON and CSV formats for user autonomy.',
    ],
    architecture: {
      pattern: 'Offline-First Reactive Cache with Event Sourcing Sync',
      description:
        'Client transactions are written synchronously to an IndexedDB object store with an incrementing vector clock and uuid. A background synchronization manager monitors the window online/offline events and flushes pending writes to Firebase Firestore with idempotency keys.',
      flowPoints: [
        'User submits expense -> Validation pass -> Conversion to integer paise (₹542.50 -> 54250 paise)',
        'Synchronous commit to IndexedDB object store -> Instant UI state update',
        'Sync Engine checks navigator.onLine: If online, post idempotent patch to Firestore; if offline, flag record in pending queue',
        'On network reconnection, sync manager flushes pending queue and performs timestamp-based conflict reconciliation',
      ],
      nodes: [
        { id: 'ui', label: 'React UI Boundary', role: 'Input & Paise Formatter', type: 'client' },
        { id: 'idb', label: 'IndexedDB Store', role: 'Authoritative Local Cache', type: 'storage' },
        { id: 'sync', label: 'Sync Engine', role: 'Vector Clock Queue', type: 'service' },
        { id: 'cloud', label: 'Firebase Firestore', role: 'Cloud Backup & Sync', type: 'service' },
      ],
    },
    implementationDetails: [
      'Authored a lightweight promise-based wrapper over raw IndexedDB IDBDatabase transactions to avoid heavy external ORM dependencies.',
      'Constructed a specialized MonetaryInteger class that encapsulates all currency math, validation, and localized currency formatting (₹).',
      'Optimistic state updates via custom React hooks guaranteeing zero-latency feedback during high-frequency expense entries.',
      'Structured schema migrations to cleanly upgrade IndexedDB object stores across version revisions without data corruption.',
    ],
    technicalChallenges: [
      {
        challenge: 'Floating-Point Currency Drift in Multi-Item Splits',
        solution:
          'Strictly mandated 64-bit integer paise throughout application state, converting to decimal display format solely at the visual UI boundary.',
      },
      {
        challenge: 'IndexedDB Schema Migrations Across App Versions',
        solution:
          'Engineered an incremental schema versioning hook that intercepts onupgradeneeded events to migrate legacy structures without data loss.',
      },
      {
        challenge: 'Intermittent Connectivity & Double-Sync Prevention',
        solution:
          'Assigned deterministic client-generated UUIDs to each transaction as Firestore document IDs, ensuring idempotent cloud writes even if network dropped mid-handshake.',
      },
    ],
    tradeoffs: [
      {
        decision: 'IndexedDB vs. LocalStorage',
        chosen: 'IndexedDB Object Stores',
        alternative: 'window.localStorage',
        rationale:
          'LocalStorage is synchronous and blocks the main thread on large datasets with a 5MB storage ceiling. IndexedDB offers transactional integrity, structured indexes, and ample client storage.',
      },
      {
        decision: 'State Authority',
        chosen: 'Local Client Database',
        alternative: 'Cloud-first with local fallback',
        rationale:
          'Prioritizes immediate user entry speed regardless of network health, treating cloud sync as an enhancement rather than a dependency.',
      },
    ],
    codeSnippet: {
      title: 'Integer Paise Conversion & IDB Transaction',
      language: 'typescript',
      code: `// Eliminating IEEE 754 float drift by standardizing on integer paise
export const toPaise = (rupees: number | string): number => {
  const numeric = typeof rupees === 'string' ? parseFloat(rupees) : rupees;
  if (isNaN(numeric)) throw new Error('Invalid monetary input');
  return Math.round(numeric * 100);
};

export const toRupees = (paise: number): string => {
  return (paise / 100).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  });
};`,
    },
    githubUrl: 'https://github.com/Pravinvignesh2/Expense_Trackerr',
    liveUrl: 'https://expense-trackerr.ai.studio/',
    caseStudyUrl: '/projects/cairn',
    placeholderImage: '/images/projects/cairn/cover.png',
    coverImage: '/images/projects/cairn/cover.png',
    gallery: [
      {
        url: '/images/projects/cairn/cover.png',
        alt: 'Cairn dashboard overview showing integer paise currency and transaction logs',
        caption: 'Main dashboard with zero-latency IndexedDB persistence and instant categorization.',
      },
    ],
    accentColor: '#5268E8',
  },
  {
    id: 'catprep-pro',
    slug: 'catprep-pro',
    index: '02',
    title: 'CATPrep Pro',
    subtitle: 'Smarter Verbal Practice.',
    shortDescription:
      'AI-powered CAT VARC examination preparation platform featuring timed reading comprehension drills, question database sync, and structured logical reasoning breakdowns via Gemini API.',
    featured: true,
    category: 'AI Application / EdTech',
    technologies: ['React', 'Vite', 'Gemini API', 'TypeScript', 'CSS Modules'],
    status: 'Implemented',
    motivation:
      'Aspirants preparing for the CAT VARC (Verbal Ability & Reading Comprehension) section face extreme difficulty understanding why subtle distractor options are incorrect in high-difficulty passages. Standard answer keys provide static explanations that fail to answer a student’s specific cognitive misunderstandings.',
    myApproach:
      'Designed a focused, distraction-free reading engine with strict sectional exam timers and integrated Google Gemini API to serve as an on-demand critical reasoning tutor. Prompts are constrained to provide counterfactual analysis grounded strictly within passage premises without hallucinating external facts.',
    problemStatement:
      'Commercial CAT preparation platforms charge high subscription fees for static, pre-recorded explanations. Students need real-time, interactive breakdowns of why Option C contradicts Paragraph 3 while Option A is merely an unsupported generalization.',
    keyFeatures: [
      'Timed VARC Simulations: Real exam conditions with strict 40-minute sectional countdowns and passage-level pacing telemetry.',
      'Curated RC Passages: Categorized across dense disciplines: philosophy, economics, cognitive science, and sociology.',
      'Gemini AI Logical Reasoning: Contextual question explanations highlighting precise logical flaws in incorrect distractor options.',
      'Question Bank Synchronization: Structured question repository with categorization by topic, difficulty tier, and question type.',
      'Distraction-Free Reader: Adjustable typography, comfortable column measure (65ch), and split-screen viewing.',
      'Session Accuracy Breakdown: Performance tracking across central-idea, inference-based, tone, and author-attitude queries.',
    ],
    architecture: {
      pattern: 'Client-Side Evaluation Pipeline with Serverless AI Proxy',
      description:
        'Passage and question data are structured into hierarchical JSON models. The testing interface maintains timer state in memory and requests deep logical justifications from Gemini API via prompt templates designed specifically for critical reasoning.',
      flowPoints: [
        'User launches timed passage drill -> Timer initiates and passage view renders',
        'User submits selected options -> Scoring engine validates against authoritative answer key',
        'If student requests explanation, client invokes Gemini API with passage context and user choice',
        'Gemini returns structured logical breakdown analyzing premises, inferences, and flaws',
      ],
      nodes: [
        { id: 'reader', label: 'Split-Screen Reader', role: 'Ergonomic Passage Pane', type: 'client' },
        { id: 'timer', label: 'Sectional Engine', role: 'Time Countdown & Pacing', type: 'client' },
        { id: 'qbank', label: 'Question Bank', role: 'Structured Passage Corpus', type: 'storage' },
        { id: 'gemini', label: 'Gemini API', role: 'Critical Reasoning LLM', type: 'ai' },
      ],
    },
    implementationDetails: [
      'Constructed a distraction-free two-pane reading layout with independent scrolling to keep passage text visible while evaluating 4-line options.',
      'Engineered a deterministic prompt schema passing the full passage, question text, student selection, and authoritative key to yield step-by-step counterfactual logic.',
      'Implemented local session storage to allow students to pause, review, and resume drills.',
    ],
    technicalChallenges: [
      {
        challenge: 'Eliminating AI Hallucinations in Passage Inference',
        solution:
          'Enforced prompt constraints instructing Gemini to only reference statements explicitly stated or logically entailed within the provided passage text, explicitly forbidding real-world external knowledge.',
      },
      {
        challenge: 'Maintaining Test Focus and Reader Ergonomics',
        solution:
          'Engineered split-screen layout with independent scrolling and clean typography scale so students do not experience eye fatigue during 1,200-word passages.',
      },
    ],
    tradeoffs: [
      {
        decision: 'LLM Role',
        chosen: 'Targeted Option Explainer',
        alternative: 'Generative Question Creator',
        rationale:
          'AI often generates flawed CAT questions with multiple defensible answers. Using verified questions and reserving AI for deep pedagogical explanation guarantees test validity.',
      },
    ],
    codeSnippet: {
      title: 'Constrained Gemini AI Reasoning Prompt Schema',
      language: 'typescript',
      code: `const prompt = \`
You are an expert CAT VARC instructor. Analyze this Reading Comprehension question.
Passage: "\${passageText}"
Question: "\${questionText}"
Authoritative Key: "\${correctOption}"
Student Selection: "\${studentOption}"

Instructions:
1. Explain WHY the authoritative key is logically entailed by the passage text.
2. Specifically identify the cognitive trap in the student's selected option (e.g., Extreme Phrasing, Distortion, Out of Scope, Premise Inversion).
3. Ground all reasoning strictly in passage text.
\`;`,
    },
    githubUrl: 'https://github.com/Pravinvignesh2/CATPrep-Pro',
    liveUrl: 'https://cat-verbal-practice-pro.ai.studio/',
    caseStudyUrl: '/projects/catprep-pro',
    placeholderImage: '/images/projects/catprep-pro/cover.png',
    coverImage: '/images/projects/catprep-pro/cover.png',
    gallery: [
      {
        url: '/images/projects/catprep-pro/cover.png',
        alt: 'CATPrep Pro split-screen reading interface and Gemini AI logical reasoning panel',
        caption: 'Distraction-free reading environment with sectional timer and AI tutor.',
      },
    ],
    accentColor: '#2563EB',
  },
  {
    id: 'fraud-detection',
    slug: 'fraud-detection',
    index: '03',
    title: 'Payment Fraud Detection',
    subtitle: 'Making Transactions Smarter.',
    shortDescription:
      'Machine learning model development and analysis pipeline exploring fraudulent transaction detection on highly skewed, class-imbalanced financial datasets.',
    featured: true,
    category: 'Machine Learning / Data Science',
    technologies: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib'],
    status: 'Research Prototype',
    motivation:
      'Digital payment fraud accounts for billions of dollars in losses annually. However, fraud represents less than 0.17% of all financial transactions in production datasets. Traditional accuracy metrics mislead engineering teams into deploying models that fail to stop real-world fraud.',
    myApproach:
      'Developed a reproducible Python machine learning workflow focused on handling extreme class imbalance. Benchmarked SMOTE over-sampling and random under-sampling, prioritizing Precision-Recall Area Under Curve (PR-AUC) and F2-Score over deceptive raw accuracy.',
    problemStatement:
      'In a dataset where 99.83% of transactions are legitimate and 0.17% are fraudulent, a naive dummy model that predicts every transaction as legitimate achieves 99.83% accuracy while completely failing to detect a single fraudulent charge.',
    keyFeatures: [
      'Imbalanced Data Strategies: Comparative experimentation using SMOTE, NearMiss, and class weight penalties.',
      'Feature Transformation: Robust scaling of transaction amounts and rolling time-delta anomaly detection.',
      'Multi-Model Benchmarking: Side-by-side performance comparison of Logistic Regression, Random Forests, and XGBoost.',
      'Metric Alignment: Evaluating models on PR-AUC, Recall, and False Negative costs rather than overall accuracy.',
      'Diagnostic Visualizations: Confusion matrices, Precision-Recall curves, and tree feature importance plots.',
    ],
    architecture: {
      pattern: 'Supervised ML Training & Evaluation Pipeline',
      description:
        'End-to-end Python exploratory data analysis and modeling workflow with automated train-test splitting, cross-validation, and metric reporting.',
      flowPoints: [
        'Data Ingestion: European credit card transactions dataset (284,807 transactions, 492 fraud cases)',
        'Data Preprocessing: StandardScaler normalization of Amount and Time features; PCA components preserved',
        'Class Rebalancing: Synthetic Minority Over-sampling Technique (SMOTE) applied strictly to training folds',
        'Model Training: Stratified K-Fold cross validation with hyperparameter tuning',
        'Threshold Optimization: Calibrating decision boundaries to prioritize high recall on minority fraud classes',
      ],
      nodes: [
        { id: 'data', label: 'Imbalanced Dataset', role: '0.17% Fraud Ratio', type: 'storage' },
        { id: 'prep', label: 'Preprocessing & SMOTE', role: 'Feature Scaling & Resampling', type: 'service' },
        { id: 'models', label: 'Classifiers', role: 'Random Forest & XGBoost', type: 'ai' },
        { id: 'eval', label: 'PR-AUC Evaluation', role: 'Precision-Recall Tuning', type: 'service' },
      ],
    },
    implementationDetails: [
      'Implemented clean, modular Python functions ensuring zero data leakage between training folds and validation folds.',
      'Documented every statistical hypothesis and mathematical rationale in clear Jupyter notebook markdown sections.',
      'Visualized decision boundaries showing how synthetic fraud points allow tree-based ensembles to form tight anomaly frontiers.',
    ],
    technicalChallenges: [
      {
        challenge: 'Severe Class Imbalance Masking Deficiencies',
        solution:
          'Strictly discarded raw accuracy in favor of Precision-Recall AUC and targeted F2-score to heavily penalize false negatives (missed fraud).',
      },
      {
        challenge: 'Preventing Data Leakage During Resampling',
        solution:
          'Utilized imbalanced-learn Pipeline abstractions to ensure SMOTE synthesis was applied exclusively to training splits, never validation sets.',
      },
    ],
    tradeoffs: [
      {
        decision: 'Evaluation Metric',
        chosen: 'PR-AUC & F2-Score',
        alternative: 'ROC-AUC & Accuracy',
        rationale:
          'ROC-AUC produces an overly optimistic evaluation when the negative class heavily dominates. Precision-Recall curves focus directly on the minority positive class.',
      },
    ],
    codeSnippet: {
      title: 'Leak-Free Pipeline with SMOTE & Random Forest',
      language: 'python',
      code: `# Ensuring zero data leakage via imblearn Pipeline
from imblearn.pipeline import Pipeline
from imblearn.over_sampling import SMOTE
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, average_precision_score

pipeline = Pipeline([
    ('smote', SMOTE(random_state=42, sampling_strategy=0.2)),
    ('classifier', RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42))
])

# Fit only on training data; evaluate on untouched test distribution
pipeline.fit(X_train, y_train)
y_pred_proba = pipeline.predict_proba(X_test)[:, 1]
pr_auc = average_precision_score(y_test, y_pred_proba)
print(f"Test PR-AUC: {pr_auc:.4f}")`,
    },
    githubUrl: 'https://github.com/Pravinvignesh2/payment-fraud-detection',
    liveUrl: undefined,
    caseStudyUrl: '/projects/fraud-detection',
    placeholderImage: '/images/projects/fraud-detection/cover.png',
    coverImage: '/images/projects/fraud-detection/cover.png',
    gallery: [
      {
        url: '/images/projects/fraud-detection/cover.png',
        alt: 'Precision-Recall evaluation curve and confusion matrix for imbalanced transaction classification',
        caption: 'SMOTE resampling pipeline evaluation and anomaly detection diagnostics.',
      },
    ],
    accentColor: '#EF4444',
  },
];
