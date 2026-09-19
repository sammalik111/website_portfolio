export const profile = {
  name: "Shahmeer Malik",
  role: "Full-Stack Software Engineer",
  summary:
    "Full-stack software engineer with production experience in software architecture, backend and frontend development, distributed systems, data pipelines, and cloud infrastructure (AWS) — including fintech-adjacent financial forecasting and RBAC-based authorization.",
  email: "malikshahmeer.ms@gmail.com",
  phone: "760-212-0696",
  linkedin: "https://linkedin.com/in/shahmeer-malik-30b3b822b",
  github: "https://github.com/sammalik111",
};

export const stats = [
  { value: "2+", label: "Years in Production" },
  { value: "1M", label: "Requests/Day Scaled" },
  { value: "18+", label: "Apps Shipped Solo" },
];

export type Experience = {
  company: string;
  title: string;
  location: string;
  dates: string;
  bullets: string[];
  skills: string[];
};

export const experience: Experience[] = [
  {
    company: "ReadySignal",
    title: "Full-Stack Engineer",
    location: "Ann Arbor, MI",
    dates: "June 2026 — Present",
    bullets: [
      "Took a vibe-coded prototype to production in 3 months with 1 other engineer, architecting Next.js, FastAPI, and MySQL to scale to 1,000,000 requests per day on a multi-tenant AWS SaaS platform for under $200/month",
      "Engineered a pipeline that iteratively runs an exhaustive subset search, falling back to greedy pruning, fit memoization, and thread-pool concurrency, to aggregate and overlay external public data for sales forecasting — improving prototype forecast accuracy from 75% to 93%",
      "Built an LLM chat bot supporting 10 model personalities across multiple providers, automating financial-analysis and forecast requests end-to-end across 11 SQS async jobs, saving roughly 2 hours/week of support time",
    ],
    skills: ["Next.js", "FastAPI", "MySQL", "AWS", "SQS", "LLM Integration"],
  },
  {
    company: "Amazon Web Services",
    title: "Software Engineer",
    location: "Herndon, VA",
    dates: "September 2024 — December 2025",
    bullets: [
      "Redesigned production monitoring dashboards with pagination, region-based clustering, and embedded runbook links, cutting incident response time from 6 hours to 50 minutes — an 85% reduction",
      "Resolved a multi-region SSH outage caused by a 46GB transfer bypassing legacy rate limiting by adding pre-prod load testing (JUnit, Mocha) and payload-aware throttling",
      "Eliminated recurring false-positive SSH alerts by fixing a race condition between health checks and host-patching cycles, improving on-call signal reliability",
    ],
    skills: ["AWS", "SSH", "JUnit", "Mocha", "Observability", "On-call"],
  },
];

export const education = {
  school: "University of Michigan",
  degree: "Bachelor's degree, Computer Science",
  dates: "May 2024",
  coursework: [
    "Computer Security",
    "Artificial Intelligence",
    "Advanced Data Analytics",
    "Computer Architecture",
  ],
};

export type Project = {
  title: string;
  role: string;
  location: string;
  dates: string;
  bullets: string[];
  tech: string[];
  link?: string;
  featured?: boolean;
};

export const featuredProject: Project = {
  title: "MiraajGames.com",
  role: "Solo Founder / Full-Stack Engineer",
  location: "Remote",
  dates: "February 2026 — Present",
  bullets: [
    "Architected a production-grade full-stack platform using a custom Node.js REST API server and PostgreSQL, shipping 18+ browser-based applications end-to-end",
    "Engineered JWT-authenticated WebSocket connections, a GDPR-compliant payment flow, and cursor-paginated messaging serving 500+ messages per week",
    "Deployed and operated AWS infrastructure with a TLS reverse proxy, reducing monthly compute costs by 65% through load profiling and right-sizing",
  ],
  tech: ["Node.js", "PostgreSQL", "WebSockets", "JWT", "AWS"],
  link: "https://miraajgames.com",
  featured: true,
};

// Earlier personal projects (pre-2024/25), kept as verifiable secondary portfolio pieces.
export const additionalProjects: Project[] = [
  {
    title: "Malik Industries",
    role: "E-commerce Platform",
    location: "",
    dates: "",
    bullets: [
      "Full-stack e-commerce site with a Sanity IO-managed product database and real-time Stripe payments with post-purchase feedback.",
    ],
    tech: ["React", "Next.js", "Sanity", "Stripe"],
    link: "https://github.com/sammalik111/malik_Industries",
  },
  {
    title: "3D Wheelchair Tool",
    role: "Parametric Modeling Platform",
    location: "",
    dates: "",
    bullets: [
      "Parametric 3D modeling platform for patient-specific wheelchair design with real-time manipulation, built for University of Michigan hospital research.",
    ],
    tech: ["Three.js", "OpenJSCad", "React"],
    link: "https://humanshape.org/WheelchairTool/",
  },
  {
    title: "Would You Rather?",
    role: "Full-Stack Web App",
    location: "",
    dates: "",
    bullets: [
      "Online game site with comments, search, session-based auth, and a live database.",
    ],
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://github.com/sammalik111/Would-You-Rather-",
  },
  {
    title: "Multi-Cycle Processor Simulator",
    role: "Systems Programming",
    location: "",
    dates: "",
    bullets: [
      "Two-stage simulator for a multi-stage processor pipeline converting LegV8 assembly into machine code, with a virtual register/stack and hazard handling.",
    ],
    tech: ["C", "LegV8", "Assembly"],
  },
  {
    title: "Convolutions",
    role: "Neural Network Experiments",
    location: "",
    dates: "",
    bullets: [
      "Experiments in convolutional neural networks and image interpretation across varying kernels and layer depths.",
    ],
    tech: ["Python"],
    link: "https://github.com/sammalik111/convolutions",
  },
  {
    title: "Stock Exchange Simulator",
    role: "Data Analysis Tool",
    location: "",
    dates: "",
    bullets: [
      "Simulates trades over a given time period from CSV input, validated against 100,000 test sales for accuracy.",
    ],
    tech: ["C++"],
  },
];

export const skills = [
  {
    category: "Programming Languages",
    items: ["Java", "TypeScript", "JavaScript", "Python", "Go", "Bash", "C", "C++", "SQL"],
  },
  {
    category: "Frameworks & Tools",
    items: [
      "REST APIs",
      "Microservices",
      "FastAPI",
      "React",
      "Next.js",
      "Node.js",
      "SQLAlchemy",
      "Pydantic",
      "Alembic",
      "WebSockets",
      "JUnit",
      "Mocha",
      "pytest",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      "AWS (EC2, SQS, ECS Fargate, CloudWatch, DynamoDB, IAM, VPC)",
      "Terraform",
      "VPC Peering",
      "Docker",
      "LocalStack",
      "Twingate",
      "Turborepo",
      "pnpm",
      "CI/CD",
    ],
  },
  {
    category: "Databases & Tooling",
    items: ["MySQL", "PostgreSQL", "NoSQL", "Postman", "DataGrip", "Git", "GitHub"],
  },
  {
    category: "Engineering Practices",
    items: [
      "Software Architecture",
      "Technical Documentation",
      "Root-Cause Analysis",
      "Authorization / RBAC",
      "Cross-Functional Communication",
      "Agile",
    ],
  },
];
