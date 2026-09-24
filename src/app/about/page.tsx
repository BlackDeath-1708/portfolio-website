import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
};

const skills = {
  Languages: ["Python", "Java", "JavaScript", "C", "Bash"],
  "Backend & Platforms": [
    "MERN (MongoDB, Express, React, Node.js)",
    "Flask (REST APIs)",
    "Django",
    "Streamlit",
    "Kafka",
    "AWS",
    "Linux",
    "Docker",
  ],
  "Systems & Networking": [
    "eBPF / XDP",
    "Netfilter / NFQUEUE",
    "netlink sockets",
    "/proc",
    "TCP/IP",
    "TLS",
  ],
  "Security & Identity": [
    "SIEM (Wazuh)",
    "Suricata",
    "Zeek",
    "Wireshark",
    "Nmap",
    "Metasploit",
    "OpenVAS",
    "Active Directory",
  ],
};

const experience = [
  {
    role: "Research Intern",
    org: "Centre for Artificial Intelligence & Robotics (CAIR), DRDO",
    period: "Jul 2026 – Dec 2026",
    points: [
      "Designing measurement-based and topology-based methods to geolocate IP addresses at city level across Indian ISP networks, as a more precise alternative to OSINT geolocation databases.",
      "Collecting and cleaning traceroute data from distributed probes; analyzing hop timing and topology to infer location.",
      "Building Python and Streamlit tooling to run measurements and explore results.",
    ],
  },
  {
    role: "Co-Founder & Chief Technology Officer",
    org: "XecureOne (cybersecurity startup)",
    period: "May 2025 – Nov 2025",
    points: [
      "Engineered backend services on the MERN stack and deployed websites on AWS, owning the path from code to production.",
      "Owned technical architecture and on-time delivery; deployed a centralized SIEM platform and Zeek/Suricata traffic-inspection pipelines for real-time threat detection across enterprise endpoints.",
      "Communicated security concepts to non-specialists through SIEM operations and incident response training; hardened identity infrastructure with Active Directory and Group Policy.",
    ],
  },
];

const achievements = [
  "Top 5, Rajasthan Police Hackathon (National Level) — national cybersecurity challenge organized with law enforcement.",
  "Winner, Pitch Perfect, Anokha 2024 — technical innovation competition, Amrita Vishwa Vidyapeetham, Coimbatore.",
  "Winner, Ideathon, Cauvery College, Trichy — design of a real-time network threat detection system.",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">About</h1>
      <p className="mt-6 max-w-2xl leading-relaxed text-foreground/80">{siteConfig.bio}</p>

      <h2 className="mt-12 text-sm font-semibold uppercase tracking-wide text-foreground/60">
        Experience
      </h2>
      <div className="mt-4 flex flex-col gap-8">
        {experience.map((job) => (
          <div key={job.role}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-semibold">{job.role}</h3>
              <span className="text-sm text-foreground/60">{job.period}</span>
            </div>
            <p className="text-sm text-foreground/60">{job.org}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/80">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-sm font-semibold uppercase tracking-wide text-foreground/60">
        Skills & stack
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <p className="text-sm font-medium text-foreground/70">{category}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {items.map((skill) => (
                <li key={skill}>
                  <Badge>{skill}</Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-sm font-semibold uppercase tracking-wide text-foreground/60">
        Achievements
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80">
        {achievements.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
