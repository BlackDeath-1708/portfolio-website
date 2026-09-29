/**
 * About-page content, kept separate from presentation. Everything here is
 * derived from, or cross-referenced against, resume.ts / projects.ts /
 * research.ts / writing.ts / site-config.ts — no invented tools, milestones,
 * metrics or hobbies. Tools a design brief suggested but that aren't evidenced
 * anywhere in the source data are deliberately left out.
 */
import { heroStats, type Stat } from "@/lib/home-content";
import { achievements, experience } from "@/lib/resume";
import { siteConfig } from "@/lib/site-config";
import { posts } from "@/lib/writing";

export const aboutHero = {
  eyebrow: "About me",
  intro:
    "I'm a final-year Computer Science and Engineering student focused on cybersecurity, software engineering and research. I like understanding how systems actually work — from network traffic and operating-system behaviour to the applications built on top of them — and turning that understanding into practical tools.",
};

export const aboutStats: Stat[] = [
  ...heroStats,
  { value: siteConfig.education.graduation, label: "Graduation" },
];

export type HeroCallout = {
  label: string;
  meta: string;
  tone: "accent" | "violet" | "success";
  tag?: string;
  /** Position within the hero backdrop, chosen to sit in the image's empty areas. */
  position: string;
};

/** Real work areas with their actual stacks (see projects.ts / site-config.ts "now"). */
export const heroCallouts: HeroCallout[] = [
  { label: "Network security", meta: "Zeek · Kafka · ML detectors", tone: "accent", position: "top-[15%] right-[6%]" },
  { label: "Kernel security", meta: "eBPF · XDP · BPF-LSM", tone: "violet", tag: "building", position: "top-[41%] right-[3%]" },
  { label: "Software", meta: "MERN · Java · C · Python", tone: "success", position: "bottom-[29%] right-[24%]" },
];

export const identity = [
  { key: "Name", value: siteConfig.name },
  { key: "Focus", value: "Security · Software · Research" },
  { key: "Location", value: "Bengaluru, India" },
  { key: "Status", value: "Building", isLive: true },
];

export const whoIAm = {
  story: [
    "I'm studying Computer Science and Engineering with a specialisation in cyber security, and most of what I build sits where networks, operating systems and security overlap — the gap between what a system is supposed to do and what you can actually verify it's doing.",
    "That question shows up in everything I work on: a detection pipeline that only gets a one-way mirror of traffic, a firewall that has to police encrypted connections without decrypting them, eBPF programs that decide a packet's fate before the kernel's network stack ever sees it. I learn a system by building against it, then write down what broke and why.",
  ],
  panel: [
    {
      label: "Education",
      lines: [
        siteConfig.education.degree,
        `Specialisation: ${siteConfig.education.specialization}`,
        `Graduation: ${siteConfig.education.graduation}`,
      ],
    },
    { label: "Focus", lines: ["Cybersecurity", "Software Engineering", "Research"] },
    { label: "Building", lines: ["Network security", "Endpoint security", "Detection systems", "Security tooling"] },
    { label: "Availability", lines: [siteConfig.openTo] },
  ],
};

export type ThinkingStep = {
  index: string;
  title: string;
  text: string;
  icon: "eye" | "search" | "build" | "validate" | "ship";
};

export const thinking: { intro: string; steps: ThinkingStep[] } = {
  intro:
    "I approach problems from the system level — understanding how they work, identifying where assumptions fail, building practical controls, and validating them against real environments.",
  steps: [
    { index: "01", title: "Understand", text: "Understand the architecture, traffic, processes and constraints.", icon: "eye" },
    { index: "02", title: "Find", text: "Identify weaknesses, risky assumptions and attack surfaces.", icon: "search" },
    { index: "03", title: "Build", text: "Turn the understanding into a practical control or system.", icon: "build" },
    { index: "04", title: "Validate", text: "Test it against realistic behaviour and failure cases.", icon: "validate" },
    { index: "05", title: "Ship", text: "Turn the solution into something usable and maintainable.", icon: "ship" },
  ],
};

export type WorkArea = {
  index: string;
  title: string;
  description: string;
  tools: string[];
  icon: "globe" | "cpu" | "shield" | "code";
};

/** Tools are limited to ones evidenced in resume.ts / projects.ts. */
export const workAreas: WorkArea[] = [
  {
    index: "01",
    title: "Network Security",
    description: "Traffic analysis, passive network monitoring and threat detection.",
    tools: ["Zeek", "Suricata", "Wireshark", "Nmap", "Kafka", "TLS / JA3"],
    icon: "globe",
  },
  {
    index: "02",
    title: "Endpoint Security",
    description: "Process-aware network control, kernel-level enforcement and system hardening.",
    tools: ["eBPF", "XDP", "BPF-LSM", "NFQUEUE", "iptables", "Linux"],
    icon: "cpu",
  },
  {
    index: "03",
    title: "Detection Engineering",
    description: "SIEM operations, correlation and ML-assisted detection.",
    tools: ["Wazuh", "SIEM", "scikit-learn", "VirusTotal API", "OpenVAS", "Metasploit"],
    icon: "shield",
  },
  {
    index: "04",
    title: "Software Engineering",
    description: "Building secure, usable applications, backends and tooling.",
    tools: ["Python", "Django", "Flask", "React", "Node.js", "Docker"],
    icon: "code",
  },
];

export type JourneyStop = { year: string; items: string[]; tags: string[] };

const graduationYear = Number(siteConfig.education.graduation);
const hasXecure = experience.some((job) => job.org.startsWith("XecureOne"));
const writing2026 = posts.filter((post) => post.date.startsWith("2026"));

/** Only dated, confirmed milestones — undated projects are not placed on a year. */
export const journey: JourneyStop[] = [
  {
    year: String(graduationYear - 4),
    items: ["Started B.E. Computer Science & Engineering (Cyber Security)"],
    tags: ["Foundations"],
  },
  {
    year: "2024",
    items: ["Winner — Pitch Perfect, Anokha 2024"],
    tags: ["Competition"],
  },
  {
    year: "2025",
    items: hasXecure ? ["Co-Founder & CTO, XecureOne (May–Nov)", "SIEM rollout and Zeek/Suricata pipelines"] : [],
    tags: ["SIEM", "Zeek", "AWS"],
  },
  {
    year: "2026",
    items: [
      "Research Intern, CAIR · DRDO (Jul–Dec)",
      ...(writing2026.length ? [`Technical writing — ${writing2026.length} published notes`] : []),
    ],
    tags: ["Research", "Writing"],
  },
  {
    year: String(graduationYear),
    items: ["B.E. Computer Science & Engineering — expected"],
    tags: ["Graduation"],
  },
];

/** Confirmed results that carry no date in the source data. */
export const undatedRecognition = achievements.filter((item) => !/\b20\d\d\b/.test(item));

export type Direction = {
  verb: string;
  title: string;
  text: string;
  icon: "radar" | "chip" | "flow" | "chart" | "code" | "book";
};

export const exploring: Direction[] = [
  { verb: "Building", title: "Network Threat Detection", text: "Passive monitoring, traffic classification and detection pipelines.", icon: "radar" },
  { verb: "Building", title: "Endpoint & Kernel Security", text: "eBPF, XDP and BPF-LSM for process-aware controls.", icon: "chip" },
  { verb: "Exploring", title: "Security Automation", text: "Detection pipelines, security tooling and operational workflows.", icon: "flow" },
  { verb: "Experimenting", title: "Applied ML for Security", text: "Classification, ML-assisted detection and LLM-based tooling.", icon: "chart" },
  { verb: "Building", title: "Software Engineering", text: "Secure backends, applications and the infrastructure under them.", icon: "code" },
  { verb: "Researching", title: "Open Source & Writing", text: "Experimenting, documenting and building in public.", icon: "book" },
];

export const beyondTheCode =
  "Outside individual projects, I enjoy exploring new ideas, learning unfamiliar systems, experimenting with tools, and finding problems that are interesting enough to build around — then writing down what I learned so the next person doesn't have to rediscover it.";
