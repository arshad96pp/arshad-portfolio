export type SkillGroup = {
  id: string;
  title: string;
  note: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    id: "01",
    title: "Frontend",
    note: "Interfaces, component architecture and state.",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Context API",
      "Tailwind CSS",
      "ShadCN UI",
      "Ant Design",
    ],
  },
  {
    id: "02",
    title: "Backend & APIs",
    note: "Services, REST APIs and real-time features.",
    items: ["Fastify", "Express.js", "REST APIs", "Socket.io"],
  },
  {
    id: "03",
    title: "Desktop & Cross-platform",
    note: "One codebase, more than one platform.",
    items: ["Electron.js", "React Native"],
  },
  {
    id: "04",
    title: "CMS",
    note: "Managed content behind the application.",
    items: ["Payload CMS"],
  },
  {
    id: "05",
    title: "Tools",
    note: "Everyday version control and design handoff.",
    items: ["Git", "Figma"],
  },
];

/** Services and technologies for the home marquee — all drawn from the lists above. */
export const marquee = [
  "Web Applications",
  "Backend & APIs",
  "Desktop Apps",
  "React.js",
  "Next.js",
  "TypeScript",
  "Fastify",
  "Express.js",
  "Socket.io",
  "Electron.js",
  "Payload CMS",
];
