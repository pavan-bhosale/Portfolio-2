export interface ProfileData {
  name: string;
  firstName: string;
  lastName: string;
  resumeTitle: string;
  degree: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github?: string;
  positioning: string;
  specializations: string[];
  identityCards: {
    id: string;
    title: string;
    label: string;
    description: string;
    tags: string[];
  }[];
}

export const profileData: ProfileData = {
  name: "Pavan Bhosale",
  firstName: "PAVAN",
  lastName: "BHOSALE",
  resumeTitle: "Aspiring Software Developer",
  degree: "Computer Science Engineering (Data Science)",
  location: "Vasai West, India",
  phone: "9021556711",
  email: "pavanbhosale212@gmail.com",
  linkedin: "https://www.linkedin.com/in/pavan-prb",
  positioning:
    "Motivated Computer Science (Data Science) profile proficient in Python programming, software development, and AI/ML project execution. Interested in applying data-driven insights to real-world problems and building scalable software solutions.",
  specializations: [
    "SOFTWARE",
    "AI / ML",
    "DATA",
    "FULL STACK WEB",
  ],
  identityCards: [
    {
      id: "software",
      title: "SOFTWARE",
      label: "CORE ARCHITECTURE",
      description: "Designing structured, efficient, and maintainable software systems with rigorous engineering practices.",
      tags: ["Python", "C", "Object-Oriented Design", "System Logic"],
    },
    {
      id: "ai-ml",
      title: "AI / ML",
      label: "INTELLIGENT SYSTEMS",
      description: "Developing machine learning workflows, NLP pipelines, and data-driven intelligence for actionable problem solving.",
      tags: ["Predictive Modeling", "NLP", "Neural Concepts", "GenAI Foundations"],
    },
    {
      id: "data",
      title: "DATA",
      label: "DATA SCIENCE",
      description: "Synthesizing and querying complex datasets to extract structural patterns, insights, and predictive signals.",
      tags: ["SQL", "Relational Databases", "Data Processing", "Feature Extraction"],
    },
    {
      id: "web",
      title: "FULL STACK WEB",
      label: "INTERACTION & CLIENT-SERVER",
      description: "Building responsive web interfaces and connecting frontend interactions with robust data pipelines.",
      tags: ["HTML5 / CSS3", "Modern Frontend", "API Integration", "Web Architecture"],
    },
    {
      id: "problem-solving",
      title: "PROBLEM SOLVING",
      label: "RESEARCH & OPTIMIZATION",
      description: "Applying algorithmic thinking to optimize software efficiency, resource consumption, and sustainable computing.",
      tags: ["Optimization", "Algorithmic Analysis", "Research Methodology", "Analytical Rigor"],
    },
  ],
};
