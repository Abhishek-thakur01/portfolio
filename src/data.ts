export type Category = "uiux" | "graphic" | "video" | "content";

export type Project = {
  id: string;
  title: string;
  category: Category;
  tags: string[];
  image: string;
  description: string;
};

export const NAV = [
  { id: "home", label: "Home" },
  { id: "uiux", label: "UI/UX Design" },
  { id: "graphic", label: "Graphic Design" },
  { id: "video", label: "Video" },
  { id: "content", label: "Content Creation" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Build Better Products",
    category: "uiux",
    tags: ["SaaS", "Dashboard", "Product"],
    image: "/images/ui-laptop.png",
    description: "A product analytics dashboard designed for clarity — charts, flows and a mobile companion app.",
  },
  {
    id: "p2",
    title: "AT Mobile Finance",
    category: "uiux",
    tags: ["App", "Fintech", "Mobile"],
    image: "https://images.pexels.com/photos/7948065/pexels-photo-7948065.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "A dark-mode finance app with spending insights, budgets and a calm, focused interface.",
  },
  {
    id: "p3",
    title: "Analytics OS",
    category: "uiux",
    tags: ["Web", "Charts", "UX"],
    image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "An internal analytics system with modular widgets, live graphs and role-based views.",
  },
  {
    id: "p4",
    title: "Wander — Travel Journal",
    category: "uiux",
    tags: ["Website", "Travel", "UI"],
    image: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "A light, editorial travel website with cinematic photography and a simple booking flow.",
  },
  {
    id: "p5",
    title: "Good Things Take Time",
    category: "graphic",
    tags: ["Poster", "Typography"],
    image: "/images/poster-good-things.png",
    description: "A high-contrast typographic poster exploring patience, craft and the long game.",
  },
  {
    id: "p6",
    title: "Create Something Bigger",
    category: "graphic",
    tags: ["Campaign", "Print"],
    image: "/images/poster-create.png",
    description: "A bold red campaign visual for a brand launch — energy, scale and ambition.",
  },
  {
    id: "p7",
    title: "Dream Plan Do",
    category: "graphic",
    tags: ["Poster", "Landscape"],
    image: "/images/poster-dream.png",
    description: "Cinematic landscape poster pairing a simple mantra with mountain photography.",
  },
  {
    id: "p8",
    title: "AT Brand System",
    category: "graphic",
    tags: ["Identity", "Stationery"],
    image: "/images/poster-brand.png",
    description: "Personal brand identity — monogram, cards and dark stationery for AT.",
  },
  {
    id: "p9",
    title: "Studio Session",
    category: "video",
    tags: ["Shooting", "Cinema"],
    image: "/images/video-camera.png",
    description: "A controlled studio shoot with cinema cameras, motivated lighting and a tight crew.",
  },
  {
    id: "p10",
    title: "Golden Hour Reels",
    category: "video",
    tags: ["Reels", "Outdoor"],
    image: "https://images.pexels.com/photos/2315049/pexels-photo-2315049.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "Short-form films shot at sunset — silhouettes, handheld movement and natural sound.",
  },
  {
    id: "p11",
    title: "Edit Bay",
    category: "video",
    tags: ["Editing", "Color"],
    image: "https://images.pexels.com/photos/8102677/pexels-photo-8102677.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "Color, cut and sound design for a brand film — paced for emotion, not just information.",
  },
  {
    id: "p12",
    title: "Ideas Turn Into Impact",
    category: "content",
    tags: ["Campaign", "Direction"],
    image: "/images/content-impact.png",
    description: "A content platform idea — from concept lines to a full campaign narrative.",
  },
  {
    id: "p13",
    title: "Social Series",
    category: "content",
    tags: ["Social", "Copy"],
    image: "https://images.pexels.com/photos/15226551/pexels-photo-15226551.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "A weekly social series mixing product stills, carousels and founder notes.",
  },
  {
    id: "p14",
    title: "Desk Stories",
    category: "content",
    tags: ["Lifestyle", "Photo"],
    image: "https://images.pexels.com/photos/1229862/pexels-photo-1229862.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "Quiet desk photography and captions that make process feel like a story.",
  },
  {
    id: "p15",
    title: "Into the Range",
    category: "content",
    tags: ["Photo", "Narrative"],
    image: "https://images.pexels.com/photos/35711550/pexels-photo-35711550.jpeg?auto=compress&cs=tinysrgb&w=900",
    description: "A travel narrative built around one figure against a mountain horizon.",
  },
];

export const TIMELINE = [
  {
    years: "2021 – 2022",
    role: "Creative Designer",
    place: "XYZ Agency",
    tags: "Branding / Social / Web",
  },
  {
    years: "2022 – 2023",
    role: "Frontend Developer",
    place: "Freelance",
    tags: "React / Tailwind / Web Apps",
  },
  {
    years: "2023 – Present",
    role: "Creative Director",
    place: "Self Employed",
    tags: "Design / Video / Content",
  },
];

export const TOOLS = [
  { id: "figma", name: "Figma" },
  { id: "ps", name: "Photoshop" },
  { id: "ai", name: "Illustrator" },
  { id: "pr", name: "Premiere Pro" },
  { id: "ae", name: "After Effects" },
  { id: "vscode", name: "VS Code" },
  { id: "capcut", name: "CapCut" },
  { id: "notion", name: "Notion" },
  { id: "framer", name: "Framer" },
] as const;

export const CATEGORY_META: Record<
  Category,
  { title: string; blurb: string }
> = {
  uiux: {
    title: "UI/UX Design",
    blurb: "Websites, apps and product interfaces designed for simplicity and impact.",
  },
  graphic: {
    title: "Graphic Design",
    blurb: "Posters, social and campaigns that leave a lasting impression.",
  },
  video: {
    title: "Video",
    blurb: "Reels, shooting and editing that tell stories and grab attention.",
  },
  content: {
    title: "Content Creation",
    blurb: "Concepts, campaigns and creative direction from idea to impact.",
  },
};

export const RESUME_TEXT = `ABHISHEK THAKUR
Creative Designer & Content Creator

Email: abhishek@gmail.com
Phone: +91 98765 43210
Location: India

PROFILE
Creative designer and content creator focused on building modern websites,
eye-catching visuals and engaging content that connect with people.

EXPERIENCE
2023 – Present  | Creative Director — Self Employed
Design / Video / Content

2022 – 2023     | Frontend Developer — Freelance
React / Tailwind / Web Apps

2021 – 2022     | Creative Designer — XYZ Agency
Branding / Social / Web

SKILLS
UI/UX Design · Graphic Design · Video Production · Content Direction
Figma · Adobe Photoshop · Illustrator · Premiere Pro · After Effects
VS Code · CapCut · Notion · Framer
`;
