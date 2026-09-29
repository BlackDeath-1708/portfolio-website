/**
 * Home-page content, kept separate from presentation. Everything here is
 * derived from, or cross-referenced against, resume.ts / projects.ts /
 * research.ts / writing.ts — no invented metrics or milestones.
 */
import { projects } from "@/lib/projects";
import { research } from "@/lib/research";
import { achievements, experience } from "@/lib/resume";
import { siteConfig } from "@/lib/site-config";
import { posts } from "@/lib/writing";

const pad = (n: number) => String(n).padStart(2, "0");

export type Stat = { value: string; label: string };

export const heroStats: Stat[] = [
  { value: pad(projects.length), label: "Projects" },
  { value: pad(achievements.length), label: "Competition wins" },
  { value: pad(experience.length), label: "Roles" },
];

export type StackTool = { name: string; usedIn: string };
export type StackCategory = { label: string; tools: StackTool[] };

export const securityStack: StackCategory[] = [
  {
    label: "Network",
    tools: [
      { name: "Zeek", usedIn: "ODIN — parses mirrored traffic into conn/dns/ssl logs" },
      { name: "Suricata", usedIn: "XecureOne — traffic-inspection pipelines" },
      { name: "Kafka", usedIn: "ODIN — streams Zeek logs to six threat detectors" },
      { name: "TLS / JA3 / SNI", usedIn: "Endpoint Firewall — policy on encrypted traffic without decryption" },
      { name: "Wireshark", usedIn: "Packet-level analysis and debugging" },
      { name: "Nmap", usedIn: "Network reconnaissance and service discovery" },
    ],
  },
  {
    label: "Endpoint",
    tools: [
      { name: "eBPF", usedIn: "Kernel-Level Endpoint Security — in-kernel programs" },
      { name: "XDP", usedIn: "Kernel-Level Endpoint Security — line-rate packet classification" },
      { name: "BPF-LSM", usedIn: "Kernel-Level Endpoint Security — per-process network access control" },
      { name: "NFQUEUE / iptables", usedIn: "Endpoint Application Firewall — allow/deny/throttle enforcement" },
      { name: "netlink · /proc", usedIn: "Endpoint Application Firewall — maps connections to processes" },
      { name: "Linux", usedIn: "Target platform for the firewall and eBPF work" },
    ],
  },
  {
    label: "Detection",
    tools: [
      { name: "Wazuh (SIEM)", usedIn: "XecureOne — centralized SIEM for enterprise endpoints" },
      { name: "Correlation engine", usedIn: "ODIN — aggregates findings across six detectors" },
      { name: "scikit-learn", usedIn: "Phishing URL Detector — trained URL classifier" },
      { name: "VirusTotal API", usedIn: "Phishing URL Detector — cross-checks suspicious URLs" },
      { name: "OpenVAS · Metasploit", usedIn: "Vulnerability assessment toolkit" },
      { name: "Active Directory", usedIn: "XecureOne — identity hardening with Group Policy" },
    ],
  },
  {
    label: "Application",
    tools: [
      { name: "Python", usedIn: "ODIN, Endpoint Firewall, Phishing URL Detector" },
      { name: "Flask", usedIn: "ODIN SSE API, firewall console, phishing detector UI" },
      { name: "Django", usedIn: "PhishGuard — scanning backend" },
      { name: "React", usedIn: "ODIN dashboard, E-Commerce storefront and admin" },
      { name: "Node.js", usedIn: "SyncPad (Socket.io server), E-Commerce API" },
      { name: "Docker", usedIn: "ODIN (Compose pipeline), PhishGuard deployment" },
    ],
  },
];

export type ProcessStep = { index: string; title: string; text: string };

export const processSteps: ProcessStep[] = [
  { index: "01", title: "Observe", text: "Understand the system and collect evidence." },
  { index: "02", title: "Model", text: "Analyze the problem and design the solution." },
  { index: "03", title: "Detect", text: "Build measurable detection or controls." },
  { index: "04", title: "Validate", text: "Test against realistic scenarios." },
  { index: "05", title: "Ship", text: "Turn the solution into something usable." },
];

export type Milestone = { year: string; items: string[] };

const graduationYear = Number(siteConfig.education.graduation);
const hasWriting2026 = posts.some((post) => post.date.startsWith("2026"));

/** Only dated, confirmed milestones (undated projects are deliberately left off). */
export const timeline: Milestone[] = [
  { year: String(graduationYear - 4), items: ["Started B.E. Computer Science (Cyber Security)"] },
  { year: "2024", items: ["Winner — Pitch Perfect, Anokha 2024"] },
  { year: "2025", items: ["Co-Founder & CTO, XecureOne (May–Nov)"] },
  {
    year: "2026",
    items: ["Research Intern, CAIR · DRDO", ...(hasWriting2026 ? ["Technical writing"] : [])],
  },
  { year: String(graduationYear), items: ["B.E. Computer Science — expected"] },
];

export type StatusItem = { label: string; value: string; tone: "success" | "accent" };

const hasActiveResearch = research.some((entry) => entry.period.includes("2026"));

export const systemStatus: StatusItem[] = [
  { label: "Portfolio", value: "Online", tone: "success" },
  { label: "Projects", value: pad(projects.length), tone: "accent" },
  { label: "Research", value: hasActiveResearch ? "Active" : "Idle", tone: "success" },
  // siteConfig.openTo is the single source of truth for availability.
  { label: "Availability", value: "Open", tone: "success" },
];

export const cta = {
  lead: "Let's build something",
  highlight: "worth securing.",
  support: "Have a security problem, system to build, or research idea worth exploring?",
};
