import { systemStatus } from "@/lib/home-content";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";

export type CommandResult = {
  lines: string[];
  isError?: boolean;
  clear?: boolean;
  close?: boolean;
  navigate?: string;
};

export const PROMPT = "sudhareshan@portfolio:~$";
export const BOOT_COMMANDS = ["whoami", "ls projects/"];

/** Short directory names for featured projects, as shown by `ls projects/`. */
const DIRS: Record<string, string> = {
  odin: "odin-king-of-analysis",
  phishguard: "phishguard",
  "endpoint-firewall": "endpoint-application-firewall",
  "ebpf-security": "kernel-level-endpoint-security",
  "phishing-detector": "rjpolice-hackathon-phishing-detector",
};

const HELP = [
  "whoami               who is this",
  "focus                what I'm working on",
  "ls projects/         list featured projects",
  "cat <project>        one-line summary",
  "open <project>       go to the project page",
  "contact              how to reach me",
  "status               system status",
  "clear                clear the screen",
  "exit                 close the terminal",
];

function findProject(arg: string | undefined) {
  const key = (arg ?? "").replace(/^projects\//, "").replace(/\/$/, "");
  const slug = DIRS[key];
  return slug ? projects.find((project) => project.slug === slug) : undefined;
}

export function runCommand(input: string): CommandResult {
  const [command = "", arg] = input.trim().split(/\s+/);

  switch (command) {
    case "":
      return { lines: [] };
    case "help":
      return { lines: HELP };
    case "whoami":
      return { lines: ["Cybersecurity Engineer", "Software Developer", "Researcher"] };
    case "focus":
      return { lines: ["network-security", "endpoint-security", "security-research", "software-engineering"] };
    case "ls":
      if (arg && !/^projects\/?$/.test(arg)) return { lines: [`ls: ${arg}: No such file or directory`], isError: true };
      return { lines: [Object.keys(DIRS).map((dir) => `${dir}/`).join("  ")] };
    case "cat":
    case "open": {
      const project = findProject(arg);
      if (!project) {
        return { lines: [`${command}: ${arg ?? "missing operand"}: try 'ls projects/'`], isError: true };
      }
      if (command === "cat") return { lines: [project.title, project.summary] };
      return { lines: [`opening ${project.title}…`], navigate: `/work/${project.slug}`, close: true };
    }
    case "contact":
      return { lines: [`email     ${siteConfig.email}`, `github    ${siteConfig.github}`, `linkedin  ${siteConfig.linkedin}`] };
    case "status":
      return { lines: systemStatus.map((item) => `● ${item.label.padEnd(13)} ${item.value}`) };
    case "clear":
      return { lines: [], clear: true };
    case "exit":
      return { lines: [], close: true };
    case "sudo":
      return { lines: ["Permission denied. Nice try, though."], isError: true };
    default:
      return { lines: [`command not found: ${command}. Type 'help'.`], isError: true };
  }
}
