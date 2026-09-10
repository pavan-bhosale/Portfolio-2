export interface CourseItem {
  id: string;
  vaultId: string;
  title: string;
  provider: string;
  tagline: string;
  description: string;
  focusAreas: string[];
}

export const coursesData: CourseItem[] = [
  {
    id: "ai-students-genai",
    vaultId: "VAULT // 01",
    title: "AI FOR STUDENTS: BUILD YOUR OWN GENERATIVE AI MODEL",
    provider: "Specialized Workshop",
    tagline: "Hands-on generative model conceptualization and synthesis.",
    description:
      "A hands-on workshop focused on generative AI architectures, latent space representations, prompt engineering, and building generative model workflows.",
    focusAreas: [
      "Generative AI Architecture",
      "Model Development Concepts",
      "Hands-on Implementation",
      "Prompt Optimization",
    ],
  },
  {
    id: "infosys-nlp",
    vaultId: "VAULT // 02",
    title: "INTRODUCTION TO NATURAL LANGUAGE PROCESSING",
    provider: "Infosys",
    tagline: "Foundations of computational linguistics and language models.",
    description:
      "Comprehensive coursework on NLP fundamentals, text preprocessing, tokenization, semantic analysis, vector embeddings, and language-based AI applications.",
    focusAreas: [
      "NLP Fundamentals",
      "Text Preprocessing & Tokenization",
      "Embeddings & Semantics",
      "Language-based AI Applications",
    ],
  },
];
