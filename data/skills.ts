export interface SkillItem {
  id: string;
  name: string;
  category: "PROGRAMMING" | "AI / ML" | "WEB" | "TOOLS";
  orbitRadius: number;
  speed: number;
  description: string;
}

export const skillCategories = [
  "ALL",
  "PROGRAMMING",
  "AI / ML",
  "WEB",
  "TOOLS",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

export const skillsData: SkillItem[] = [
  // PROGRAMMING
  {
    id: "python",
    name: "PYTHON",
    category: "PROGRAMMING",
    orbitRadius: 2.8,
    speed: 0.6,
    description: "Core language for software engineering, scientific computing, AI/ML scripting, and data pipelines.",
  },
  {
    id: "sql",
    name: "SQL",
    category: "PROGRAMMING",
    orbitRadius: 3.4,
    speed: 0.5,
    description: "Relational database querying, schema structuring, data extraction, and relational modeling.",
  },
  {
    id: "c",
    name: "C",
    category: "PROGRAMMING",
    orbitRadius: 2.2,
    speed: 0.75,
    description: "Low-level systems programming, memory discipline, algorithms, and computational efficiency.",
  },

  // AI / ML
  {
    id: "ai-ml",
    name: "AI / ML",
    category: "AI / ML",
    orbitRadius: 4.0,
    speed: 0.45,
    description: "Model development, NLP pipelines, data preprocessing, feature engineering, and generative AI methods.",
  },

  // WEB
  {
    id: "html-css",
    name: "HTML / CSS",
    category: "WEB",
    orbitRadius: 3.0,
    speed: 0.65,
    description: "Semantic document architecture, modern CSS layout systems, responsive UI, and interactive styling.",
  },

  // TOOLS
  {
    id: "git",
    name: "GIT",
    category: "TOOLS",
    orbitRadius: 2.5,
    speed: 0.7,
    description: "Distributed version control, branch management, collaborative workflows, and history tracking.",
  },
  {
    id: "github",
    name: "GITHUB",
    category: "TOOLS",
    orbitRadius: 3.2,
    speed: 0.55,
    description: "Repository hosting, code collaboration, pull requests, CI pipelines, and open development.",
  },
  {
    id: "unreal-engine",
    name: "UNREAL ENGINE",
    category: "TOOLS",
    orbitRadius: 4.4,
    speed: 0.4,
    description: "Real-time 3D simulation, spatial environments, physics interactions, and visual computing.",
  },
  {
    id: "word",
    name: "WORD",
    category: "TOOLS",
    orbitRadius: 3.7,
    speed: 0.5,
    description: "Technical document drafting, research publications, project specification, and formal reports.",
  },
  {
    id: "powerpoint",
    name: "POWERPOINT",
    category: "TOOLS",
    orbitRadius: 4.2,
    speed: 0.42,
    description: "Visual technical presentations, research defense decks, and architectural communication.",
  },
  {
    id: "canva",
    name: "CANVA",
    category: "TOOLS",
    orbitRadius: 4.6,
    speed: 0.38,
    description: "Visual assets, infographics, technical layout illustrations, and design presentation.",
  },
];
