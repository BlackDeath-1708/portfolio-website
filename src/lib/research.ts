export type ResearchEntry = {
  slug: string;
  title: string;
  org: string;
  location: string;
  period: string;
  area: string;
  description: string;
  technologies: string[];
};

export const research: ResearchEntry[] = [
  {
    slug: "network-security-research-cair-drdo",
    title: "Network Security Research",
    org: "Centre for Artificial Intelligence & Robotics (CAIR), DRDO",
    location: "Bengaluru",
    period: "Jul 2026 – Dec 2026",
    area: "Confidential",
    description: "Project details are confidential.",
    technologies: ["Python", "Streamlit", "LLMs", "RAG", "Neo4j", "Zeek"],
  },
];
