export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  points: string[];
};

export const experience: ExperienceEntry[] = [
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

export const achievements: string[] = [
  "Top 5, Rajasthan Police Hackathon (National Level) — national cybersecurity challenge organized with law enforcement.",
  "Winner, Pitch Perfect, Anokha 2024 — technical innovation competition, Amrita Vishwa Vidyapeetham, Coimbatore.",
  "Winner, Ideathon, Cauvery College, Trichy — design of a real-time network threat detection system.",
];

export const skills = {
  Development: [
    "Python",
    "Java",
    "JavaScript",
    "C",
    "Bash",
    "MERN (MongoDB, Express, React, Node.js)",
    "Flask (REST APIs)",
    "Django",
    "Streamlit",
    "Docker",
  ],
  "Systems & Networking": [
    "eBPF / XDP",
    "Netfilter / NFQUEUE",
    "netlink sockets",
    "/proc",
    "TCP/IP",
    "TLS",
    "Kafka",
    "AWS",
    "Linux",
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
} as const;
