export interface MilestoneNode {
  id: string;
  step: string;
  role: string;
  organization?: string;
  type: "academic" | "domain" | "research" | "industry" | "vision";
  description: string;
  isExpandable?: boolean;
  // Future fields supported cleanly:
  dates?: string;
  technologies?: string[];
  responsibilities?: string[];
  projects?: string[];
  achievements?: string[];
}

export const journeyMilestones: MilestoneNode[] = [
  {
    id: "student",
    step: "01",
    role: "STUDENT",
    organization: "VCET",
    type: "academic",
    description:
      "Forming deep foundations in Computer Science with a specialization in Data Science, algorithms, systems, and mathematics.",
  },
  {
    id: "ai-ml",
    step: "02",
    role: "AI / ML SPECIALIZATION",
    organization: "Advanced Studies",
    type: "domain",
    description:
      "Hands-on immersion into machine learning architectures, NLP models, and generative AI systems to build assistive intelligence.",
  },
  {
    id: "research",
    step: "03",
    role: "RESEARCH & OPTIMIZATION",
    organization: "INDIACom & Competitions",
    type: "research",
    description:
      "Investigating sustainable software engineering, carbon and cost prediction models, and precision aerodynamic glider engineering.",
  },
  {
    id: "cozmoh",
    step: "04",
    role: "FULL STACK WEB DEVELOPER",
    organization: "COZMOH",
    type: "industry",
    description:
      "Engineered web applications and interactive digital solutions, bridging interface design with server logic and reliable data handling.",
    isExpandable: true,
    // Prepared architecture for future addition without inventing data
    dates: undefined,
    technologies: undefined,
    responsibilities: undefined,
  },
  {
    id: "builder",
    step: "05",
    role: "SOFTWARE & AI BUILDER",
    organization: "Independent & Open Systems",
    type: "vision",
    description:
      "Building scalable software, AI study platforms, and green computing tools that address tangible real-world computing challenges.",
  },
];
