export type ProjectCategory = "Full Stack" | "Web" | "Desktop" | "Product";

export type CoverVariant = "desktop" | "dashboard" | "browser" | "roles" | "cart" | "chat" | "mark";

type Point = { title: string; body: string };

/**
 * Every section is optional — a section with no content is simply not rendered.
 * Only add what is actually known about a project; don't pad.
 */
export type CaseStudy = {
  overview: string[];
  context?: string[];
  contribution?: string[];
  features?: Point[];
  implementation?: Point[];
  challenges?: Point[];
  outcome?: string[];
  /** Optional step diagram shown under Technical Implementation. */
  flow?: { label: string; body: string }[];
};

export type Project = {
  slug: string;
  number: string;
  name: string;
  /** Short label describing what the product is. */
  type: string;
  /** Display category, e.g. "Full Stack / Healthcare". */
  label: string;
  /** One-line summary used in hero areas. */
  tagline: string;
  /** Short description used in listings. */
  summary: string;
  /** Filter categories on /work. */
  categories: ProjectCategory[];
  role: string;
  platform?: string;
  /** Confirmed technologies. Leave empty rather than guess. */
  stack: string[];
  /** What the work covered — shown when the stack isn't listed. */
  scope: string[];
  featured: boolean;
  cover: {
    variant: CoverVariant;
    monogram: string;
    /** Background tone for the abstract cover. */
    tone: string;
  };
  /**
   * Real screenshot. When present it replaces the abstract cover —
   * drop a file in /public/work and set e.g. { src: "/work/time-tact.jpg", alt: "…" }.
   */
  image?: { src: string; alt: string };
  caseStudy: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "time-tact",
    number: "01",
    name: "Time Tact",
    type: "Employee tracking & productivity desktop app",
    label: "Desktop / Full Stack",
    tagline:
      "A cross-platform desktop app that keeps tracking work activity — online or off.",
    summary:
      "Electron and React desktop client for Windows and macOS: activity, idle-time and screenshot tracking, with offline storage, automatic sync and API integration.",
    categories: ["Desktop", "Full Stack"],
    role: "Desktop & full-stack development",
    platform: "Windows · macOS",
    stack: ["Electron.js", "React.js", "IndexedDB", "API integration"],
    scope: ["Desktop client", "Offline storage", "Data sync", "APIs"],
    featured: true,
    cover: { variant: "desktop", monogram: "TT", tone: "#151513" },
    caseStudy: {
      overview: [
        "Time Tact is an employee tracking and productivity desktop application built with Electron.js and React.js, running on both Windows and macOS. It records how working time is spent — the active window, the applications in use, idle periods and mouse activity — and captures screenshots at configurable intervals.",
        "It is built to keep working when the network doesn’t. Connectivity is detected continuously; while offline, activity is stored locally in IndexedDB and synchronised automatically once the connection returns.",
      ],
      context: [
        "Tracking software runs all day in the background, on machines and networks the developer doesn’t control. That sets two hard requirements: it has to stay light enough not to get in the way of the work it measures, and the data it records has to survive unstable or missing internet connections without gaps.",
        "It also has to give people a clear way to step out of tracking, which is what private mode is for.",
      ],
      contribution: [
        "Developed the cross-platform desktop client with Electron.js and React.js for Windows and macOS.",
        "Implemented active window, application usage, idle-time and mouse activity tracking.",
        "Implemented screenshot capture at configurable intervals, and private mode.",
        "Built internet connectivity detection, IndexedDB offline storage and automatic synchronisation after recovery.",
        "Integrated the desktop client with the product’s APIs.",
        "Worked on performance and data continuity for continuous background operation.",
      ],
      features: [
        {
          title: "Active window & application tracking",
          body: "Records which window is in focus and which applications are in use across the working session.",
        },
        {
          title: "Idle & mouse activity",
          body: "Idle-time detection and mouse activity tracking separate active work from time away from the machine.",
        },
        {
          title: "Screenshot capture",
          body: "Screenshots are captured at configurable intervals rather than a fixed, hard-coded rate.",
        },
        {
          title: "Private mode",
          body: "A dedicated mode for time that shouldn’t be tracked.",
        },
        {
          title: "Offline storage",
          body: "When connectivity drops, records are written to IndexedDB on the device instead of being lost.",
        },
        {
          title: "Automatic sync",
          body: "Stored records synchronise automatically once the internet connection recovers — no manual step.",
        },
      ],
      implementation: [
        {
          title: "Electron + React",
          body: "Electron provides the cross-platform desktop shell and the operating-system access that tracking and capture depend on; React drives the application interface. One codebase ships to both Windows and macOS.",
        },
        {
          title: "Connectivity-aware data flow",
          body: "The app watches its own internet connection. Online, data goes to the API as normal; offline, records are persisted to IndexedDB; on recovery, the stored records are synchronised automatically.",
        },
        {
          title: "Performance under constant load",
          body: "Because tracking never stops while the app runs, performance is part of the core work — keeping the application responsive while it monitors activity in the background.",
        },
      ],
      challenges: [
        {
          title: "Local first, network second",
          body: "Treating IndexedDB as the safety net means a dropped connection doesn’t become dropped data. Data continuity is designed in, not patched on.",
        },
        {
          title: "Configuration over constants",
          body: "Screenshot capture runs on a configurable interval, so the behaviour can match how a team actually wants to track.",
        },
        {
          title: "One codebase, two platforms",
          body: "Electron with React keeps Windows and macOS on a single codebase instead of two diverging native apps.",
        },
      ],
      flow: [
        { label: "Online", body: "Activity is recorded and sent to the API as normal." },
        { label: "Connection lost", body: "Connectivity detection routes records into IndexedDB on the device." },
        { label: "Connection restored", body: "Stored records synchronise automatically." },
      ],
      outcome: [
        "A cross-platform desktop application for Windows and macOS that covers the full tracking feature set and keeps its data continuous through connectivity loss.",
      ],
    },
  },
  {
    slug: "acute",
    number: "02",
    name: "Acute",
    type: "Hospital management application",
    label: "Full Stack / Healthcare",
    tagline:
      "A hospital management application for running healthcare workflows through one modern dashboard.",
    summary:
      "Full-stack work on a hospital management product — the application and dashboard, the backend behind them, and the web work around the product.",
    categories: ["Full Stack", "Product"],
    role: "Full-stack development",
    platform: "Web application & dashboard",
    stack: [],
    scope: ["Application", "Dashboard", "Backend", "Web"],
    featured: true,
    cover: { variant: "dashboard", monogram: "AC", tone: "#141414" },
    caseStudy: {
      overview: [
        "Acute is a hospital management application — a product for managing healthcare-related workflows through a modern application and dashboard.",
        "I worked on it full stack: the application and dashboard people use day to day, the backend that supports them, and the web development around the product.",
      ],
      context: [
        "Hospital teams work across many connected workflows. A management product has to bring them into one dependable interface — and the backend behind it has to keep that interface accurate.",
      ],
      contribution: [
        "Full-stack development across the product.",
        "Application and dashboard interfaces.",
        "Backend development supporting the application.",
        "Web-related development for the product.",
      ],
    },
  },
  {
    slug: "moi-wash",
    number: "03",
    name: "Moi Wash",
    type: "Car-wash service product · Dubai",
    label: "Full Stack / Product",
    tagline: "A digital product for car-wash service management in Dubai.",
    summary:
      "A car-washing product built for the Dubai market. Full-stack work across the application, its dashboard and the web side of the product.",
    categories: ["Full Stack", "Product"],
    role: "Full-stack development",
    platform: "Application, dashboard & web",
    stack: [],
    scope: ["Application", "Dashboard", "Backend", "Web"],
    featured: true,
    cover: { variant: "mark", monogram: "MW", tone: "#151413" },
    caseStudy: {
      overview: [
        "Moi Wash is a car-washing product for Dubai — a digital product for managing a car-wash service, made up of an application, a dashboard and the web presence around them.",
        "I worked on it full stack, across the application and dashboard and the backend and web work that connect them.",
      ],
      context: [
        "A service business needs more than a website. Moi Wash is a working product: the application and the dashboard behind it have to fit together so the service can actually be run through them.",
      ],
      contribution: [
        "Full-stack development across the product.",
        "Application and dashboard work.",
        "Web-related development for the product.",
      ],
    },
  },
  {
    slug: "range-ae",
    number: "04",
    name: "Range.ae",
    type: "Full-stack web project",
    label: "Full Stack / Web",
    tagline: "A web project built full stack, from interface to backend.",
    summary: "A web project where I worked across the full stack — the frontend and the backend behind it.",
    categories: ["Full Stack", "Web"],
    role: "Full-stack development",
    platform: "Web",
    stack: [],
    scope: ["Frontend", "Backend", "Web"],
    featured: true,
    cover: { variant: "browser", monogram: "R", tone: "#131413" },
    caseStudy: {
      overview: [
        "Range.ae is a web project I worked on full stack, covering both the interface and the backend that serves it.",
      ],
      contribution: ["Frontend development.", "Backend development.", "Full-stack delivery of the web project."],
    },
  },
  {
    slug: "crm",
    number: "05",
    name: "CRM",
    type: "Customer relationship management system",
    label: "Full Stack",
    tagline: "A customer relationship management system with a React frontend and a Fastify backend.",
    summary:
      "React frontend, Fastify backend and REST APIs, with role-based access that gives admins and users their own experience of the system.",
    categories: ["Full Stack", "Web"],
    role: "Full-stack development",
    platform: "Web",
    stack: ["React.js", "Fastify", "REST APIs"],
    scope: ["Frontend", "Backend", "APIs", "Auth"],
    featured: true,
    cover: { variant: "roles", monogram: "CRM", tone: "#161614" },
    caseStudy: {
      overview: [
        "A customer relationship management system built across both ends of the stack: a React frontend, a Fastify backend and REST APIs between them.",
        "Role-based authentication shapes the whole product — admins and users each get the views and actions meant for them, through responsive dashboards.",
      ],
      contribution: [
        "Frontend development in React.",
        "Backend development with Fastify.",
        "REST API design and integration between frontend and backend.",
        "Role-based authentication and access.",
        "Admin and user experiences, with responsive dashboards.",
      ],
      features: [
        {
          title: "Role-based access",
          body: "Authentication with roles, so what someone can see and do depends on who they are.",
        },
        {
          title: "Admin & user experiences",
          body: "Separate experiences for administrators and for everyday users of the system.",
        },
        {
          title: "Responsive dashboards",
          body: "Dashboards that hold up from a desktop monitor down to smaller screens.",
        },
        {
          title: "REST APIs",
          body: "The frontend talks to the backend over a REST API layer.",
        },
      ],
      implementation: [
        {
          title: "React on the front",
          body: "A React frontend for the dashboards and the admin and user interfaces.",
        },
        {
          title: "Fastify behind it",
          body: "A Fastify backend serving the application’s REST APIs.",
        },
        {
          title: "Access as a first-class concern",
          body: "Role-based authentication runs through both sides — it decides which experience a person gets, not just whether they can sign in.",
        },
      ],
    },
  },
  {
    slug: "palm-tree-shopping-cart",
    number: "06",
    name: "Palm Tree Shopping Cart",
    type: "E-commerce application",
    label: "E-Commerce / Web",
    tagline: "An e-commerce application — cart, checkout, payments and inventory.",
    summary:
      "E-commerce product work in React and Redux: shopping cart, checkout flows, payment gateway integration and inventory-related functionality.",
    categories: ["Web"],
    role: "E-commerce product engineering",
    platform: "Web · Responsive",
    stack: ["React.js", "Redux"],
    scope: ["Cart", "Checkout", "Payments", "Inventory"],
    featured: false,
    cover: { variant: "cart", monogram: "PT", tone: "#131312" },
    caseStudy: {
      overview: [
        "Palm Tree Shopping Cart is an e-commerce application built with React.js and Redux. The work went beyond the storefront interface into the parts that make a shop function: the cart, checkout, payment integration and inventory.",
      ],
      contribution: [
        "Responsive e-commerce interface in React.js.",
        "Shopping cart and checkout-related flows.",
        "Payment gateway integration.",
        "Inventory-related functionality.",
        "Application state management with Redux.",
      ],
      features: [
        { title: "Shopping cart", body: "Cart state that follows the customer through the purchase." },
        { title: "Checkout flows", body: "The steps from cart to completed order." },
        { title: "Payment gateway", body: "Payment gateway integration as part of checkout." },
        { title: "Inventory", body: "Inventory-related functionality connected to what the shop can sell." },
      ],
      implementation: [
        {
          title: "Redux for commerce state",
          body: "Cart and checkout state live in Redux, so every part of the interface reads from the same source of truth.",
        },
        {
          title: "Responsive by default",
          body: "The shopping experience is built to work across screen sizes rather than adapted afterwards.",
        },
      ],
    },
  },
  {
    slug: "lets-prosper",
    number: "07",
    name: "Let’s Prosper",
    type: "Web application",
    label: "Web Application",
    tagline: "A web application project.",
    summary: "Web application development for Let’s Prosper.",
    categories: ["Web"],
    role: "Web development",
    platform: "Web",
    stack: [],
    scope: ["Web application"],
    featured: false,
    cover: { variant: "browser", monogram: "LP", tone: "#141413" },
    caseStudy: {
      overview: [
        "Let’s Prosper is a web application I worked on as part of my production work. A fuller write-up is on the way — I’m happy to walk through it in conversation.",
      ],
    },
  },
  {
    slug: "enzo-sports",
    number: "08",
    name: "Enzo Sports",
    type: "Sports application",
    label: "Sports Application",
    tagline: "A sports-focused application.",
    summary: "Development work on a sports-focused application.",
    categories: [],
    role: "Application development",
    stack: [],
    scope: ["Application"],
    featured: false,
    cover: { variant: "mark", monogram: "ES", tone: "#131413" },
    caseStudy: {
      overview: [
        "Enzo Sports is a sports-focused application I worked on as part of my production work. A fuller write-up is on the way — I’m happy to walk through it in conversation.",
      ],
    },
  },
];

export const categories: ProjectCategory[] = ["Full Stack", "Web", "Desktop", "Product"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

/** Technologies if known, otherwise what the work covered. */
export function projectTech(p: Project) {
  return p.stack.length
    ? { term: "Technology", items: p.stack }
    : { term: "Scope", items: p.scope };
}
