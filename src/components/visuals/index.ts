import type { ComponentType } from "react";
import { EbpfVisual } from "@/components/visuals/EbpfVisual";
import { FirewallVisual } from "@/components/visuals/FirewallVisual";
import { OdinVisual } from "@/components/visuals/OdinVisual";
import { PhishGuardVisual } from "@/components/visuals/PhishGuardVisual";
import { PhishingVisual } from "@/components/visuals/PhishingVisual";

/** Custom visual per project slug (projects without one render no visual). */
export const projectVisuals: Record<string, ComponentType> = {
  "odin-king-of-analysis": OdinVisual,
  phishguard: PhishGuardVisual,
  "endpoint-application-firewall": FirewallVisual,
  "kernel-level-endpoint-security": EbpfVisual,
  "rjpolice-hackathon-phishing-detector": PhishingVisual,
};
