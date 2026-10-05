export type Role = {
  company?: string;
  title: string;
  start: string;
  end: string;
  summary: string;
};

export const experience: Role[] = [
  {
    company: "Pixbit Solutions",
    title: "Software Developer",
    start: "Feb 2025",
    end: "Present",
    summary:
      "Building production applications across the stack — React and Next.js interfaces, the APIs and backend services behind them, and CMS-backed, API-driven product work.",
  },
  {
    company: "Trogon Media",
    title: "Software Developer",
    start: "Feb 2024",
    end: "Feb 2025",
    summary:
      "Shipped client-facing web applications — product interfaces in React, application features and the REST APIs that connect them, with responsive layouts and practical state management.",
  },
  {
    title: "Software Developer",
    start: "Jun 2023",
    end: "Feb 2024",
    summary:
      "Developed web applications, building a working foundation in modern JavaScript, React, component-based UI and production development workflows.",
  },
];
