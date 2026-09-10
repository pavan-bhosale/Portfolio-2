export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  field?: string;
  level: "PRIMARY" | "SECONDARY" | "HIGHER_SECONDARY";
  isDominant?: boolean;
  description: string;
}

export const educationData: EducationItem[] = [
  {
    id: "be-cse-ds",
    degree: "B.E. IN COMPUTER SCIENCE ENGINEERING (DATA SCIENCE)",
    institution: "Vidyavardhini's College of Engineering and Technology",
    field: "Data Science Specialization",
    level: "PRIMARY",
    isDominant: true,
    description:
      "Core engineering degree covering algorithms, machine learning, data architecture, software design principles, and systems computing.",
  },
  {
    id: "hsc-science",
    degree: "H.S.C IN SCIENCE",
    institution: "Annasaheb Vartak College",
    field: "Science Stream",
    level: "HIGHER_SECONDARY",
    isDominant: false,
    description:
      "Higher secondary foundation emphasizing mathematics, physics, and analytical problem solving.",
  },
  {
    id: "ssc",
    degree: "S.S.C",
    institution: "St. Augustine's High School",
    level: "SECONDARY",
    isDominant: false,
    description:
      "Fundamental schooling building early analytical aptitude, science, and computing interest.",
  },
];
