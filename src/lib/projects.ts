export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  repoUrl?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "odin-king-of-analysis",
    title: "ODIN — Passive Network Threat Detection",
    summary:
      "Real-time threat detection for one-way-mirrored network traffic, built for Smart India Hackathon.",
    description:
      "A threat-detection system for one-way mirrored network traffic: Zeek parses raw packets into structured logs, Kafka streams them to six threat detectors covering DDoS, C2 beaconing, DGA/DNS tunnelling, TLS-wrapped malware, reconnaissance, and data exfiltration, a correlation engine aggregates findings, and a Flask API streams results live via SSE to a React dashboard — all running on Docker Compose. Raised pipeline throughput 4.74× by micro-batching inference, and diagnosed a Zeek log join bug that had silently disabled TLS detection.",
    stack: ["Python", "Zeek", "Kafka", "Flask", "React", "Docker"],
    repoUrl: "https://github.com/BlackDeath-1708/ODIN-King-of-Analysis",
    featured: true,
  },
  {
    slug: "phishguard",
    title: "PhishGuard — Web Vulnerability Scanner",
    summary:
      "Chrome extension + Django backend running 9 client-side security checks per page.",
    description:
      "A Chrome extension with a Django backend that runs 9 client-side security checks per page, including missing security headers, mixed content, weak cookie flags, open redirects, and outdated JS libraries. Assigns a severity level and remediation steps to every finding; containerized with Docker and deployed on Render.",
    stack: ["Python", "Django", "JavaScript", "Chrome Extension APIs", "Docker"],
    repoUrl: "https://github.com/BlackDeath-1708/phishguard",
    featured: true,
  },
  {
    slug: "endpoint-application-firewall",
    title: "Endpoint Application Firewall",
    summary:
      "Host-based firewall that maps every outgoing connection to its originating process.",
    description:
      "A host-based firewall that maps each outgoing connection to its originating process via /proc and netlink sockets, with a rule-based allow/deny/throttle policy engine. Includes a Flask REST management console for multi-endpoint administration, traffic logging, and alerts, and enforces policy on encrypted traffic using TLS metadata (JA3, SNI) rather than decryption.",
    stack: ["Python", "Flask", "Linux", "iptables", "NFQUEUE"],
    featured: true,
  },
  {
    slug: "kernel-level-endpoint-security",
    title: "Kernel-Level Endpoint Security",
    summary:
      "In-kernel packet classification and per-process network access control via eBPF/XDP.",
    description:
      "A self-initiated, ongoing project writing eBPF programs at the XDP hook for line-rate in-kernel packet classification, and BPF-LSM hooks for per-process network access control that resists root bypass. Includes a telemetry pipeline streaming events from the eBPF programs to a userspace daemon through shared-memory ring buffers.",
    stack: ["C", "eBPF", "XDP", "BPF-LSM"],
    featured: true,
  },
  {
    slug: "rjpolice-hackathon-phishing-detector",
    title: "Phishing URL Detector — Rajasthan Police Hackathon",
    summary:
      "ML-based phishing URL classifier with a Flask front end and VirusTotal API cross-checks.",
    description:
      "Built for the Rajasthan Police Hackathon (National Level), where it placed in the Top 5: extracts URL/domain features (IP-in-URL, domain age, redirect patterns, and more) to feed a trained classifier that flags phishing links, then cross-references suspicious URLs against the VirusTotal API before rendering a verdict through a Flask web UI.",
    stack: ["Python", "Flask", "scikit-learn", "VirusTotal API"],
    repoUrl: "https://github.com/BlackDeath-1708/RJPOLICE_HACK_1251_OMEGA_5",
    featured: true,
  },
  {
    slug: "secure-data-exchange",
    title: "Secure Data Exchange Using Cryptographic Techniques",
    summary:
      "End-to-end secure client-server data exchange built with AES, RSA, SHA-256, PKI, and SSL/TLS.",
    description:
      "A hands-on implementation of a secure communication stack on Kali Linux using OpenSSL: AES-256 symmetric encryption, RSA-2048 asymmetric encryption, SHA-256 integrity hashing, RSA+SHA-256 digital signatures, a full PKI (CA + server certificates), and a TLS client-server channel. Validated with real failure-mode testing — wrong keys fail decryption, tampered data fails hash checks, untrusted certs fail the TLS handshake.",
    stack: ["OpenSSL", "Kali Linux", "SSL/TLS", "PKI"],
    repoUrl:
      "https://github.com/BlackDeath-1708/SECURE-DATA-EXCHANGE-USING-CRYPTOGRAPHIC-TECHNIQUES",
    featured: false,
  },
  {
    slug: "e-commerce",
    title: "E-Commerce Platform",
    summary:
      "Full-stack MERN e-commerce app with a separate storefront and admin panel.",
    description:
      "A complete e-commerce build with an Express/MongoDB backend (JWT auth, Multer file uploads) serving a React storefront and a dedicated React admin panel for managing products and orders.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    repoUrl: "https://github.com/BlackDeath-1708/E-COMMERCE",
    featured: false,
  },
];
