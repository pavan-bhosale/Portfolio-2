export interface ProjectData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  accentColor: string;
  description: string;
  supportedInputs?: string[];
  pipelineSteps: {
    label: string;
    description: string;
  }[];
  features: string[];
  theme: string;
  role?: string;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projectsData: ProjectData[] = [
  {
    id: "neuronotes",
    number: "01",
    title: "NEURONOTES",
    subtitle: "INTELLIGENT STUDY ASSISTANT & AUTOMATED LEARNING PLATFORM",
    tagline: "Converting study materials into flashcards, quizzes, and personalized guidance.",
    category: "AI / EDTECH PLATFORM",
    accentColor: "#6CA8FF",
    description:
      "An AI-powered platform that converts study materials into flashcards, quizzes, and interactive study guidance. Designed to transform passive study notes, PDFs, presentations, and videos into active, memorable learning modules.",
    supportedInputs: ["Notes", "PDFs", "PPTs", "Videos"],
    pipelineSteps: [
      { label: "INPUT", description: "Multi-modal ingestion of raw student notes, PDFs, PPTs, and video lectures" },
      { label: "UNDERSTAND", description: "Semantic extraction, contextual parsing, and key concept distillation" },
      { label: "GENERATE", description: "Automated generation of spaced-repetition flashcards & tailored quizzes" },
      { label: "LEARN", description: "AI chat assistance, personalized concept clarification, and study guidance" },
    ],
    features: [
      "Intelligent Flashcard Generation",
      "Automated Quiz Generation",
      "AI Chat Assistant for Concept Clarification",
      "Personalized Study Guidance",
      "Motivation & Mental Well-being Support",
      "Multi-format input parsing (Notes, PDF, PPT, Video)",
    ],
    theme: "NEURAL KNOWLEDGE GRAPH & ACTIVE RETRIEVAL",
  },
  {
    id: "greencode",
    number: "02",
    title: "GREENCODE",
    subtitle: "A HYBRID MODEL FOR ACCURATE AND EFFICIENT CARBON AND COST PREDICTION",
    tagline: "Analyzing software carbon footprint and cloud computing costs for sustainable code.",
    category: "GREEN COMPUTING / AI RESEARCH",
    accentColor: "#B8FF4A",
    description:
      "A green computing research tool analyzing software carbon footprint and cloud costs. Evaluates source code to predict and optimize environmental impact, reducing energy consumption and cloud costs while strictly preserving runtime accuracy and performance.",
    pipelineSteps: [
      { label: "SOURCE CODE", description: "Static and dynamic AST analysis of computation bottlenecks and loops" },
      { label: "COMPUTATION", description: "Profiling compute workload, memory allocation, and processor cycles" },
      { label: "ENERGY & CARBON", description: "Mapping execution overhead to hardware energy draw and carbon intensity" },
      { label: "CLOUD COST", description: "Predicting cloud infrastructure expenses based on resource footprints" },
      { label: "OPTIMIZATION", description: "Refactoring code paths to minimize emissions while preserving performance" },
    ],
    features: [
      "Source Code Carbon Footprint Analysis",
      "Algorithmic Energy Consumption Profiling",
      "Cloud Computing & Infrastructure Cost Prediction",
      "Code Optimization & Structural Refactoring",
      "Performance and Output Accuracy Preservation",
      "Hybrid ML Modeling for Eco-efficiency",
    ],
    theme: "CODE × ENERGY × CARBON × CLOUD",
  },
];
