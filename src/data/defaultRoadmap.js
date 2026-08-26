/**
 * PathForward 90-Day Trajectory Curricula
 * Specialized, production-grade 12-week roadmaps (6 two-week sprints)
 * designed for self-directed learners, dropouts, and career switchers.
 */

export const ROADMAP_TRACKS = {
  webdev: [
    {
      id: 1, label: 'Wk 1–2', active: true,
      title: 'Foundations & Semantic Web',
      milestone: 'Master HTML5 semantics, modern CSS layout (Grid/Flexbox), and publish your first live portfolio project on GitHub Pages.',
      tasks: [
        { id: 'w1_a', text: 'Build responsive portfolio layout with CSS Grid & Flexbox', done: false },
        { id: 'w1_b', text: 'Set up Git, create remote GitHub repository, and deploy via GitHub Pages', done: false },
        { id: 'w1_c', text: 'Validate semantic HTML tags and test keyboard navigation accessibility', done: false },
      ],
      resource: { name: 'FreeCodeCamp: Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' },
    },
    {
      id: 2, label: 'Wk 3–4', active: false,
      title: 'JavaScript DOM & Event Architecture',
      milestone: 'Write clean, modular JavaScript that handles user interactions and complex state logic without frameworks.',
      tasks: [
        { id: 'w2_a', text: 'Deep-dive into closures, array methods (map/filter/reduce), and scope', done: false },
        { id: 'w2_b', text: 'Build an interactive Kanban board or task tracker with LocalStorage persistence', done: false },
        { id: 'w2_c', text: 'Refactor code using ES6 modules and semantic function naming', done: false },
      ],
      resource: { name: 'JavaScript.info: The Modern JavaScript Tutorial', url: 'https://javascript.info/' },
    },
    {
      id: 3, label: 'Wk 5–6', active: false,
      title: 'Async Programming & Live APIs',
      milestone: 'Fetch live data from third-party REST APIs and handle async loading, error boundaries, and cache states.',
      tasks: [
        { id: 'w3_a', text: 'Master Promises, async/await, and try/catch error handling patterns', done: false },
        { id: 'w3_b', text: 'Build a live weather & crypto dashboard consuming real-world public APIs', done: false },
        { id: 'w3_c', text: 'Implement debouncing and error feedback states for user searches', done: false },
      ],
      resource: { name: 'MDN: Asynchronous JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous' },
    },
    {
      id: 4, label: 'Wk 7–8', active: false,
      title: 'React 19 & Component Architecture',
      milestone: 'Re-architect frontends using modern component composition, custom hooks, and unidirectional data flow.',
      tasks: [
        { id: 'w4_a', text: 'Complete React Docs: State as snapshot, useEffect boundaries, and custom hooks', done: false },
        { id: 'w4_b', text: 'Build a multi-page React application with client-side routing and context state', done: false },
        { id: 'w4_c', text: 'Configure Vite build pipeline and analyze production bundle size', done: false },
      ],
      resource: { name: 'React Official Documentation & Guides', url: 'https://react.dev/learn' },
    },
    {
      id: 5, label: 'Wk 9–10', active: false,
      title: 'Performance, A11y & Cloud Deployment',
      milestone: 'Audit and ship production-ready applications with 95+ Lighthouse scores and automated CI/CD.',
      tasks: [
        { id: 'w5_a', text: 'Audit web accessibility (a11y) using axe-core and verify WCAG AAA compliance', done: false },
        { id: 'w5_b', text: 'Deploy frontend to Vercel/Netlify with custom domain and automated branch previews', done: false },
        { id: 'w5_c', text: 'Write automated unit tests using Node.js built-in test runner or Vitest', done: false },
      ],
      resource: { name: 'web.dev: Learn Core Web Vitals & Accessibility', url: 'https://web.dev/accessibility/' },
    },
    {
      id: 6, label: 'Wk 11–12', active: false,
      title: 'Proof-of-Work Portfolio & Job Hunt Sprint',
      milestone: 'Submit 15 high-quality applications with live demos, clean GitHub repositories, and tailored outreach.',
      tasks: [
        { id: 'w6_a', text: 'Author comprehensive READMEs with architecture diagrams and live preview links', done: false },
        { id: 'w6_b', text: 'Send 10 personalized cold messages to tech leads and startup founders', done: false },
        { id: 'w6_c', text: 'Complete 10 frontend coding challenges on LeetCode/GreatFrontEnd', done: false },
      ],
      resource: { name: 'NeetCode: Structured Technical Interview Roadmap', url: 'https://neetcode.io/' },
    },
  ],

  design: [
    {
      id: 1, label: 'Wk 1–2', active: true,
      title: 'Design Foundations & Figma Mastery',
      milestone: 'Master vector networks, typography hierarchies, and layout auto-layout grids in Figma.',
      tasks: [
        { id: 'd1_a', text: 'Master Figma Auto Layout, constraints, and responsive container resizing', done: false },
        { id: 'd1_b', text: 'Deconstruct and clone 3 world-class landing pages to study spacing tokens', done: false },
        { id: 'd1_c', text: 'Establish a personal Figma UI component library with text and color styles', done: false },
      ],
      resource: { name: 'Figma Learn: Auto Layout & Design Basics', url: 'https://help.figma.com/hc/en-us/categories/360002051613-Get-started' },
    },
    {
      id: 2, label: 'Wk 3–4', active: false,
      title: 'User Research & Problem Framing',
      milestone: 'Conduct user interviews, synthesize qualitative insights, and create journey maps for a real problem.',
      tasks: [
        { id: 'd2_a', text: 'Interview 5 target users experiencing a specific pain point in education/work', done: false },
        { id: 'd2_b', text: 'Map user journey from frustration to desired outcome with friction callouts', done: false },
        { id: 'd2_c', text: 'Draft high-level user flow diagrams and low-fidelity wireframe sketches', done: false },
      ],
      resource: { name: 'Nielsen Norman Group: UX Research Methods', url: 'https://www.nngroup.com/articles/' },
    },
    {
      id: 3, label: 'Wk 5–6', active: false,
      title: 'Design Systems & Component Variables',
      milestone: 'Build an atomic design system with reusable components, component variants, and interactive states.',
      tasks: [
        { id: 'd3_a', text: 'Build atomic component library (buttons, inputs, modals, cards) with variants', done: false },
        { id: 'd3_b', text: 'Implement design tokens for dark/light mode using Figma variables', done: false },
        { id: 'd3_c', text: 'Test contrast ratios against WCAG 2.1 AA accessibility guidelines', done: false },
      ],
      resource: { name: 'Design Systems Repo: Guides & Examples', url: 'https://designsystemsrepo.com/' },
    },
    {
      id: 4, label: 'Wk 7–8', active: false,
      title: 'High-Fidelity Interactive Prototyping',
      milestone: 'Create micro-animated, clickable mobile and desktop prototypes that feel like native software.',
      tasks: [
        { id: 'd4_a', text: 'Prototype smart-animate transitions, interactive overlays, and scroll behaviors', done: false },
        { id: 'd4_b', text: 'Conduct usability testing sessions with 3 users to observe friction points', done: false },
        { id: 'd4_c', text: 'Iterate prototype based on qualitative feedback and test data', done: false },
      ],
      resource: { name: 'Interaction Design Foundation: Prototyping', url: 'https://www.interaction-design.org/' },
    },
    {
      id: 5, label: 'Wk 9–10', active: false,
      title: 'Case Study Storytelling & Presentation',
      milestone: 'Publish an in-depth case study detailing problem formulation, tradeoffs, testing, and metrics.',
      tasks: [
        { id: 'd5_a', text: 'Write comprehensive case study: The Problem, The Pivot, The Solution, The Impact', done: false },
        { id: 'd5_b', text: 'Produce polished product mockups and walkthrough GIFs showcasing interactions', done: false },
        { id: 'd5_c', text: 'Publish case study to Behance, Medium, or a custom Framer portfolio', done: false },
      ],
      resource: { name: 'Case Study Club: Top UX Case Studies Analyzed', url: 'https://www.casestudy.club/' },
    },
    {
      id: 6, label: 'Wk 11–12', active: false,
      title: 'Portfolio Review & Designer Outreach',
      milestone: 'Position your portfolio for design agency and startup outreach with live interactive links.',
      tasks: [
        { id: 'd6_a', text: 'Polish your Framer or Webflow personal site with 2 comprehensive case studies', done: false },
        { id: 'd6_b', text: 'Request portfolio critique from 3 senior product designers on ADPList', done: false },
        { id: 'd6_c', text: 'Reach out to 15 design leads and early-stage startup founders directly', done: false },
      ],
      resource: { name: 'ADPList: Free Mentorship from Senior Designers', url: 'https://adplist.org/' },
    },
  ],

  data: [
    {
      id: 1, label: 'Wk 1–2', active: true,
      title: 'Python for Data Analysis & Modern Tooling',
      milestone: 'Master Python syntax, NumPy, Pandas, and environment workflows for data manipulation.',
      tasks: [
        { id: 'dt1_a', text: 'Complete Python data structures, list comprehensions, and vectorized math', done: false },
        { id: 'dt1_b', text: 'Perform exploratory data analysis on a real Kaggle dataset using Pandas', done: false },
        { id: 'dt1_c', text: 'Clean missing data, handle outliers, and publish Jupyter notebook to GitHub', done: false },
      ],
      resource: { name: 'Kaggle: Python & Pandas Micro-Courses', url: 'https://www.kaggle.com/learn' },
    },
    {
      id: 2, label: 'Wk 3–4', active: false,
      title: 'Relational Databases & Advanced SQL',
      milestone: 'Write complex multi-table joins, window functions, and aggregation queries on real databases.',
      tasks: [
        { id: 'dt2_a', text: 'Master INNER/LEFT/FULL joins, GROUP BY, HAVING, and subqueries', done: false },
        { id: 'dt2_b', text: 'Write window functions (ROW_NUMBER, RANK, LAG/LEAD) for cohort analysis', done: false },
        { id: 'dt2_c', text: 'Model a relational schema for an e-commerce platform in PostgreSQL', done: false },
      ],
      resource: { name: 'Mode Analytics: Advanced SQL Tutorial', url: 'https://mode.com/sql-tutorial/' },
    },
    {
      id: 3, label: 'Wk 5–6', active: false,
      title: 'Data Visualization & Interactive Dashboards',
      milestone: 'Transform raw data into executive dashboards that communicate actionable business insights.',
      tasks: [
        { id: 'dt3_a', text: 'Create publication-ready visualizations with Matplotlib, Seaborn, or Plotly', done: false },
        { id: 'dt3_b', text: 'Build an interactive Streamlit web dashboard with user filter controls', done: false },
        { id: 'dt3_c', text: 'Deploy Streamlit data app publicly with live database connection', done: false },
      ],
      resource: { name: 'Streamlit Official Tutorial: Build Data Apps Fast', url: 'https://docs.streamlit.io/' },
    },
    {
      id: 4, label: 'Wk 7–8', active: false,
      title: 'Applied AI & LLM Engineering with Gemini',
      milestone: 'Build an end-to-end intelligent app integrating Google Gemini API and retrieval logic.',
      tasks: [
        { id: 'dt4_a', text: 'Implement structured JSON output generation using Gemini 1.5 Flash API', done: false },
        { id: 'dt4_b', text: 'Build a document analysis tool that summarizes and answers questions on PDFs', done: false },
        { id: 'dt4_c', text: 'Add token cost tracking, prompt caching, and latency telemetry', done: false },
      ],
      resource: { name: 'Google AI Studio: Gemini API Cookbook', url: 'https://ai.google.dev/gemini-api/docs' },
    },
    {
      id: 5, label: 'Wk 9–10', active: false,
      title: 'ETL Pipelines & Automated Ingestion',
      milestone: 'Engineer automated data ingestion pipelines that extract, transform, and load periodic data.',
      tasks: [
        { id: 'dt5_a', text: 'Write scheduled Python script scraping or consuming real-time market data', done: false },
        { id: 'dt5_b', text: 'Transform and upsert records into Supabase or Neon cloud Postgres database', done: false },
        { id: 'dt5_c', text: 'Automate daily pipeline execution using GitHub Actions cron workflows', done: false },
      ],
      resource: { name: 'GitHub Actions: Scheduled Workflows Documentation', url: 'https://docs.github.com/en/actions' },
    },
    {
      id: 6, label: 'Wk 11–12', active: false,
      title: 'Data Proof-of-Work & Portfolio Launch',
      milestone: 'Publish 2 production repositories with live dashboard URLs and technical write-ups.',
      tasks: [
        { id: 'dt6_a', text: 'Write technical blog post breaking down your automated AI data pipeline', done: false },
        { id: 'dt6_b', text: 'Polish GitHub repositories with clean environment configs and requirements.txt', done: false },
        { id: 'dt6_c', text: 'Pitch data insights directly to 10 company founders on LinkedIn/Twitter', done: false },
      ],
      resource: { name: 'Towards Data Science: Structuring a Data Portfolio', url: 'https://towardsdatascience.com/' },
    },
  ],

  freelance: [
    {
      id: 1, label: 'Wk 1–2', active: true,
      title: 'Niche Selection & Offer Packaging',
      milestone: 'Define a specific high-value client outcome (e.g. landing page redesign for local clinics) with tiered pricing.',
      tasks: [
        { id: 'f1_a', text: 'Identify top 2 commercial niches (real estate, clinics, indie SaaS) with budget', done: false },
        { id: 'f1_b', text: 'Package a single clear offer: "$500 Modern Landing Page delivered in 5 days"', done: false },
        { id: 'f1_c', text: 'Build your one-page agency showcase displaying your offer and guarantees', done: false },
      ],
      resource: { name: 'Indie Hackers: Freelance Productized Services Guide', url: 'https://www.indiehackers.com/' },
    },
    {
      id: 2, label: 'Wk 3–4', active: false,
      title: 'Rapid Prototyping & Template Architecture',
      milestone: 'Assemble a repeatable tech stack allowing you to ship client websites in under 10 hours.',
      tasks: [
        { id: 'f2_a', text: 'Master modern component libraries (Tailwind / Vanilla CSS modular systems)', done: false },
        { id: 'f2_b', text: 'Build 3 customizable client starter templates (Lead Gen, Service Business, Portfolio)', done: false },
        { id: 'f2_c', text: 'Integrate contact form handlers (Formspree/Resend) with automated notifications', done: false },
      ],
      resource: { name: 'Resend: Modern Email & Form Notifications', url: 'https://resend.com/docs' },
    },
    {
      id: 3, label: 'Wk 5–6', active: false,
      title: 'Cold Outreach & First Paid Client Sprint',
      milestone: 'Send 50 personalized video audits or website critiques to land your first $300–$500 paid client.',
      tasks: [
        { id: 'f3_a', text: 'Find 30 local or online businesses with outdated, slow, non-mobile websites', done: false },
        { id: 'f3_b', text: 'Record 2-minute Loom video audits showing exactly how a redesign improves sales', done: false },
        { id: 'f3_c', text: 'Close first client deposit (50% upfront) using Stripe Payment Links', done: false },
      ],
      resource: { name: 'Stripe Payment Links Documentation', url: 'https://stripe.com/docs/payment-links' },
    },
    {
      id: 4, label: 'Wk 7–8', active: false,
      title: 'Client Delivery & Frictionless Offboarding',
      milestone: 'Deliver client project ahead of deadline, configure domain/DNS, and secure written testimonial.',
      tasks: [
        { id: 'f4_a', text: 'Deploy client build to custom domain with SSL and test all contact forms', done: false },
        { id: 'f4_b', text: 'Provide 5-minute video walkthrough training client on updating their content', done: false },
        { id: 'f4_c', text: 'Collect full final payment and request a 5-star Google / LinkedIn testimonial', done: false },
      ],
      resource: { name: 'Cloudflare: Fast DNS & Domain Management', url: 'https://developers.cloudflare.com/dns/' },
    },
    {
      id: 5, label: 'Wk 9–10', active: false,
      title: 'Retainers & Maintenance Packages',
      milestone: 'Convert one-off clients into predictable $100–$250/month maintenance retainers.',
      tasks: [
        { id: 'f5_a', text: 'Draft monthly retainer agreement: monthly updates, backups, uptime monitoring', done: false },
        { id: 'f5_b', text: 'Pitch retainer to previous client to lock in recurring monthly income', done: false },
        { id: 'f5_c', text: 'Set up recurring invoicing with Stripe Subscriptions', done: false },
      ],
      resource: { name: 'Bonsai: Freelance Contract & Retainer Templates', url: 'https://www.hellobonsai.com/' },
    },
    {
      id: 6, label: 'Wk 11–12', active: false,
      title: 'Scale Outbound & Systematize Pipeline',
      milestone: 'Establish a weekly outreach rhythm generating 3 qualified client sales calls every week.',
      tasks: [
        { id: 'f6_a', text: 'Publish case study breakdown of your first client results with before/after screenshots', done: false },
        { id: 'f6_b', text: 'Automate CRM pipeline tracking leads from initial contact to proposal to closed', done: false },
        { id: 'f6_c', text: 'Increase project pricing by 50% for all upcoming client proposals', done: false },
      ],
      resource: { name: 'Notion: Freelance CRM & Client Tracking Template', url: 'https://www.notion.so/templates' },
    },
  ],
};

/**
 * Get the specialized 90-day roadmap for a given interest track
 */
export function getRoadmapForTrack(track = 'webdev') {
  const normalized = (track || 'webdev').toLowerCase();
  if (normalized.includes('design') || normalized.includes('ux') || normalized.includes('ui')) {
    return ROADMAP_TRACKS.design;
  }
  if (normalized.includes('data') || normalized.includes('ai') || normalized.includes('python')) {
    return ROADMAP_TRACKS.data;
  }
  if (normalized.includes('freelance') || normalized.includes('consult')) {
    return ROADMAP_TRACKS.freelance;
  }
  return ROADMAP_TRACKS.webdev;
}

// Backwards compatibility default
export const DEFAULT_ROADMAP = ROADMAP_TRACKS.webdev;
