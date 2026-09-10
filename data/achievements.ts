export interface AchievementItem {
  id: string;
  nodeIndex: string;
  title: string;
  badge: string;
  affiliation: string;
  summary: string;
  details: string[];
  accentColor: string;
}

export const achievementsData: AchievementItem[] = [
  {
    id: "greencode-indiacom",
    nodeIndex: "NODE // 01",
    title: "RESEARCH AUTHOR — GREENCODE",
    badge: "INDIACom Publication",
    affiliation: "INDIACom International Conference",
    summary:
      "Authored a research paper on sustainable software analysis and prediction, investigating hybrid models for software carbon footprint and cloud cost reduction.",
    details: [
      "Authored research exploring code-level carbon emissions and energy consumption.",
      "Analyzed cloud infrastructure costs correlated with computational complexity.",
      "Evaluated hybrid modeling methods for code refactoring with preserved performance.",
    ],
    accentColor: "#B8FF4A",
  },
  {
    id: "airnova-glider",
    nodeIndex: "NODE // 02",
    title: "AERODYNAMICS TEAM MEMBER — AIRNOVA",
    badge: "1st Place Winner",
    affiliation: "IIT BHU Glider Competition",
    summary:
      "Contributed to glider aerodynamic design as a key team member, securing 1st Place at the prestigious IIT BHU Glider Competition.",
    details: [
      "Contributed to aerodynamic calculations, airfoil geometry, and structural balance.",
      "Engineered physical glider dynamics optimized for glide ratio and flight stability.",
      "Secured 1st Place nationally at the IIT BHU Competition.",
    ],
    accentColor: "#D9B86C",
  },
  {
    id: "oscillations-award",
    nodeIndex: "NODE // 03",
    title: "OSCILLATIONS PAPER PRESENTATION",
    badge: "1st Prize Winner",
    affiliation: "Oscillations Technical Conference",
    summary:
      "Won 1st Prize for a paper presentation on GreenCode — a hybrid AI framework focused on optimizing code to minimize carbon emissions, energy usage, and cloud infrastructure costs.",
    details: [
      "Presented the mathematical and machine learning foundation of the GreenCode framework.",
      "Demonstrated how algorithmic optimizations minimize environmental and financial cloud footprints.",
      "Awarded 1st Prize by the evaluation panel for novelty, rigor, and societal impact.",
    ],
    accentColor: "#6CA8FF",
  },
];
