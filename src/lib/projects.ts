export type CaseStudy = {
  problem: string;
  approach: string;
  challenge: string;
  result: string;
};

export type Category = "Cybersecurity" | "Software Engineering";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  category: Category;
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  caseStudy?: CaseStudy;
  architecture?: string[];
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
    category: "Cybersecurity",
    repoUrl: "https://github.com/BlackDeath-1708/ODIN-King-of-Analysis",
    featured: true,
    architecture: [
      "Mirrored traffic",
      "Zeek (conn / dns / ssl logs)",
      "Kafka",
      "6 threat detectors",
      "Correlation engine",
      "Flask API (live SSE)",
      "React dashboard",
    ],
    caseStudy: {
      problem:
        "Security teams monitoring critical infrastructure often only get a one-way mirror of traffic — a passive tap or data diode with no return path into the network being observed. That's the exact constraint the underlying problem statement (built for Smart India Hackathon) poses: catch six distinct attack classes — DDoS, C2 beaconing, DGA/DNS tunnelling, TLS-wrapped malware, reconnaissance, and data exfiltration — from that vantage point alone, in real time.",
      approach:
        "Zeek turns raw packets into structured logs (conn/dns/ssl); Kafka streams those logs to six purpose-built detectors, one per threat class; a correlation engine aggregates their findings; a Flask API streams verdicts live over SSE to a React dashboard. The whole pipeline runs end to end on Docker Compose.",
      challenge:
        "Throughput was the first wall — running inference per-event capped the pipeline well below what real traffic demanded, and micro-batching inference calls raised throughput 4.74×. The harder bug came later: TLS malware detection was silently returning nothing on real traffic, not because the model was wrong but because a Zeek log join was silently dropping the join key — a failure mode that a synthetic-only dataset would never have surfaced.",
      result:
        "All six threat classes have a working detector wired into the live pipeline. The project's own documentation deliberately distinguishes which detectors are validated against real captured traffic versus synthetic data only — an honesty-about-limits stance that mattered more here than claiming blanket coverage.",
    },
  },
  {
    slug: "phishguard",
    title: "PhishGuard — Web Vulnerability Scanner",
    summary:
      "Chrome extension + Django backend running 9 client-side security checks per page.",
    description:
      "A Chrome extension with a Django backend that runs 9 client-side security checks per page, including missing security headers, mixed content, weak cookie flags, open redirects, and outdated JS libraries. Assigns a severity level and remediation steps to every finding; containerized with Docker and deployed on Render.",
    stack: ["Python", "Django", "JavaScript", "Chrome Extension APIs", "Docker"],
    category: "Cybersecurity",
    repoUrl: "https://github.com/BlackDeath-1708/phishguard",
    featured: true,
    caseStudy: {
      problem:
        "Most lightweight vulnerability scanners either need server-side access or only catch server-visible misconfigurations. The goal here was to audit a page the way a browser actually renders it — headers, DOM, loaded scripts and all — without installing anything on the target.",
      approach:
        "A Chrome extension's content script inspects the live page (forms, inline scripts, mixed content, loaded library versions) while the background worker POSTs the URL plus that page context to a Django backend, which independently fetches and inspects response headers and HTML. The two result sets are merged, so a finding only surfaces once it's corroborated rather than taken from a single source.",
      challenge:
        "Nine distinct checks run per page — missing security headers, HTTP pages carrying sensitive forms, mixed content, inline scripts/event handlers, external form actions, sensitive query parameters, open-redirect candidates, weak cookie flags, and outdated JS libraries — and each one needed its own severity weighting and a concrete remediation string, not just a boolean flag.",
      result:
        "Containerized with Docker and deployed on Render, so the backend runs the same way in production as it does locally — no gap between what was demoed and what's actually live.",
    },
  },
  {
    slug: "endpoint-application-firewall",
    title: "Endpoint Application Firewall",
    summary:
      "Host-based firewall that maps every outgoing connection to its originating process.",
    description:
      "A host-based firewall that maps each outgoing connection to its originating process via /proc and netlink sockets, with a rule-based allow/deny/throttle policy engine. Includes a Flask REST management console for multi-endpoint administration, traffic logging, and alerts, and enforces policy on encrypted traffic using TLS metadata (JA3, SNI) rather than decryption.",
    stack: ["Python", "Flask", "Linux", "iptables", "NFQUEUE"],
    category: "Cybersecurity",
    featured: false,
  },
  {
    slug: "kernel-level-endpoint-security",
    title: "Kernel-Level Endpoint Security",
    summary:
      "In-kernel packet classification and per-process network access control via eBPF/XDP.",
    description:
      "A self-initiated, ongoing project writing eBPF programs at the XDP hook for line-rate in-kernel packet classification, and BPF-LSM hooks for per-process network access control that resists root bypass. Includes a telemetry pipeline streaming events from the eBPF programs to a userspace daemon through shared-memory ring buffers.",
    stack: ["C", "eBPF", "XDP", "BPF-LSM"],
    category: "Cybersecurity",
    featured: false,
  },
  {
    slug: "rjpolice-hackathon-phishing-detector",
    title: "Phishing URL Detector — Rajasthan Police Hackathon",
    summary:
      "ML-based phishing URL classifier with a Flask front end and VirusTotal API cross-checks.",
    description:
      "Built for the Rajasthan Police Hackathon (National Level), where it placed in the Top 5: extracts URL/domain features (IP-in-URL, domain age, redirect patterns, and more) to feed a trained classifier that flags phishing links, then cross-references suspicious URLs against the VirusTotal API before rendering a verdict through a Flask web UI.",
    stack: ["Python", "Flask", "scikit-learn", "VirusTotal API"],
    category: "Cybersecurity",
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
    category: "Cybersecurity",
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
    category: "Software Engineering",
    repoUrl: "https://github.com/BlackDeath-1708/E-COMMERCE",
    featured: true,
  },
  {
    slug: "syncpad",
    title: "SyncPad — Real-Time Collaborative Notepad",
    summary:
      "Create a room, share the link, write together — live content sync and presence over WebSockets, built from scratch.",
    description:
      "A real-time collaborative notepad: create a room, share the link, and everyone with it types into the same document live. A custom Node HTTP server wraps Next.js's request handler and attaches a Socket.io instance to it, since persistent WebSocket connections aren't supported on Vercel's serverless model. Per-room presence is tracked as a live user map, and debounced content edits are broadcast to every other socket in the room.",
    stack: ["Next.js", "TypeScript", "Socket.io", "Node.js", "Tailwind CSS"],
    category: "Software Engineering",
    repoUrl: "https://github.com/BlackDeath-1708/syncpad",
    liveUrl: "https://syncpad-cbs7.onrender.com",
    featured: true,
    caseStudy: {
      problem:
        "Real-time collaboration demos often either lean entirely on a managed pub/sub SaaS — leaving nothing to actually engineer — or fake it with polling. The goal was to build the two things that actually matter in live sync, presence and content propagation, from scratch.",
      approach:
        "A custom Node HTTP server wraps Next.js's request handler and attaches a Socket.io instance to the same server, since Vercel's serverless functions can't hold a persistent WebSocket connection. Clients join a room, receive its current content, then broadcast debounced edits that the server relays to every other socket in that room — never back to the sender, which is what keeps a local textarea from fighting its own cursor.",
      challenge:
        "Presence had to survive disconnects cleanly: each room tracks a Map of socket ID to user, and on disconnect the user is removed and presence is rebroadcast to whoever's left. Verified directly — two isolated browser sessions joined to the same room, edited from both, then one closed to confirm the other's presence list updated live.",
      result:
        "Working end to end: two tabs in the same room sync typed content in real time and see each other's live presence. One limitation is deliberately left undisguised — content sync is last-writer-wins on the full string, not a CRDT/OT merge, which is the right tradeoff for an MVP but not for a production multi-editor tool.",
    },
  },
];
