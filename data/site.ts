export const site = {
  name: "Muhammed Arshad",
  shortName: "Arshad",
  role: "Full Stack Developer",
  initial: "A",
  since: 2023,
  focus: ["Web", "Backend", "Desktop"],
  location: "India",
  email: "arshadpp041@gmail.com",
  phone: "+91 7902804206",
  phoneHref: "tel:+917902804206",
  linkedin: {
    label: "linkedin.com/in/muhammed-arshad-35261833a",
    href: "https://www.linkedin.com/in/muhammed-arshad-35261833a/",
  },
  title: "Muhammed Arshad — Full Stack Developer",
  description:
    "Muhammed Arshad is a full stack developer building websites, web applications, backend services, REST APIs and cross-platform desktop apps — from interface to backend — with React, Next.js, Fastify, Express.js and Electron.js.",
  // Set NEXT_PUBLIC_SITE_URL in production so canonical and Open Graph URLs resolve correctly.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const education = [
  {
    title: "B.Com",
    institution: "Calicut University",
    status: "Degree — Pursuing",
  },
  {
    title: "Web Development Diploma",
    institution: "Techolas Technologies",
    status: "Diploma — 2022",
  },
] as const;
