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
    slug: "ip-based-geolocation-cair-drdo",
    title: "City-Level IP Geolocation",
    org: "Centre for Artificial Intelligence & Robotics (CAIR), DRDO",
    location: "Bengaluru",
    period: "Jul 2026 – Dec 2026",
    area: "Network measurement & geolocation",
    description:
      "Designing measurement-based and topology-based methods to geolocate IP addresses at city level across Indian ISP networks, as a more precise alternative to OSINT geolocation databases. Involves collecting and cleaning traceroute data from distributed probes, and analyzing hop timing and topology to infer location, with Python and Streamlit tooling built to run measurements and explore results.",
    technologies: [
      "Python",
      "Streamlit",
      "traceroute",
      "RIPE Atlas / RIPEstat",
      "Globalping",
      "MaxMind GeoLite2",
    ],
  },
];
