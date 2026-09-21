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
  { id: "uiux", label: "UI/UX" },
  { id: "graphic", label: "Graphic" },
  { id: "video", label: "Video" },
  { id: "content", label: "Content" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Accessories Website UI",
    category: "uiux",
    tags: ["Figma", "Wireframe", "UI Mockup"],
    image: "/images/ui-laptop.png",
    description: "Created a basic wireframe and UI mockup of an Accessories Website using Figma.",
  },
  {
    id: "p2",
    title: "Social Media Campaign",
    category: "content",
    tags: ["Canva", "Figma", "CapCut"],
    image: "/images/content-impact.png",
    description: "Designed Instagram and Facebook post templates, videos and gifs for real brands using Canva, Figma, Illustrator and CapCut.",
  },
  {
    id: "p3",
    title: "Brand Identity System",
    category: "graphic",
    tags: ["Logo", "Stationery", "Illustrator"],
    image: "/images/poster-brand.png",
    description: "Developed branding elements (logo, business card, letterhead) for companies using Figma and Illustrator.",
  },
  {
    id: "p4",
    title: "Poster & Banner Design",
    category: "graphic",
    tags: ["Poster", "Banner", "Print"],
    image: "/images/poster-good-things.png",
    description: "High-impact posters and banners designed for brand campaigns and social promotions.",
  },
  {
    id: "p5",
    title: "Reel & Short-Form Content",
    category: "video",
    tags: ["Reels", "Shooting", "Editing"],
    image: "/images/video-camera.png",
    description: "Reel shooting and short-form content creation with editing in CapCut and Premiere Pro.",
  },
  {
    id: "p6",
    title: "Social Media Graphics",
    category: "content",
    tags: ["Instagram", "Facebook", "Canva"],
    image: "/images/poster-create.png",
    description: "Consistent social media graphics and templates that drive engagement and brand recall.",
  },
];

export const TIMELINE = [
  {
    years: "2024 – Present",
    role: "Graphic Designer, Social Media Content Creator & UI/UX Designer",
    place: "Cuilsoft Pvt. Ltd.",
    tags: "Branding / Social Media / UI-UX",
  },
  {
    years: "2023 – 2024",
    role: "Graphic Designing & UI/UX Intern",
    place: "Pisoft Informatics Pvt. Ltd. (Mohali)",
    tags: "6 Months Internship · Graphic Design · UI/UX",
  },
];

export const TOOLS = [
  { id: "figma", name: "Figma" },
  { id: "ps", name: "Photoshop" },
  { id: "ai", name: "Illustrator" },
  { id: "pr", name: "Premiere Pro" },
  { id: "canva", name: "Canva" },
  { id: "capcut", name: "CapCut" },
] as const;

export const CATEGORY_META: Record<
  Category,
  { title: string; blurb: string }
> = {
  uiux: {
    title: "UI/UX Design",
    blurb: "Clean, user-friendly interfaces and mockups that improve engagement and experience.",
  },
  graphic: {
    title: "Graphic Design",
    blurb: "Logos, branding, posters and visual identity that communicate ideas and build brand strength.",
  },
  video: {
    title: "Video Editing",
    blurb: "Reels, short-form videos and edits that tell stories and connect with audiences.",
  },
  content: {
    title: "Content Creation",
    blurb: "Social media graphics, campaigns and strategically effective content.",
  },
};

export const RESUME_TEXT = `ABHISHEK THAKUR
Graphic / UI & UX Designer

Email: iabhishekbhardwaj07@gmail.com
Phone: +91 98827 00510
Location: Mandi (175001), Himachal Pradesh

ABOUT
I'm a creative Graphic & UI Designer who turns ideas into impactful visuals. I specialize in branding, social media design, and UI, along with video editing, reel shooting, and short-form content creation. With experience in social media handling, I create content that's both visually engaging and strategically effective.

EDUCATION
• Masters in Computer Applications (2025)
  Himachal Pradesh Technical University, Hamirpur

• Bachelors in Computer Applications (2023)
  Vallabh Govt. College, Mandi

EXPERIENCE
2024 – Present  | Graphic Designer, Social Media Content Creator & UI/UX Designer
Cuilsoft Pvt. Ltd.

2023 – 2024     | Graphic Designing & UI/UX Intern (6 months)
Pisoft Informatics Pvt. Ltd. (Mohali)

SKILLS
Design: Logo Design, Branding, Social Media Graphics, UI Mockups, Poster & Banner Design, Business Card Design, Video Editing, Reel Shooting & Editing, Short-Form Content Creation, Social Media Content Creation
Soft: Creativity, Attention to Detail, Time Management, Communication, Adaptability
Tools: Canva, Figma, Adobe Illustrator, Adobe Photoshop, Adobe Premiere Pro, CapCut

PROJECTS
• Social Media Campaign Mockups – Instagram & Facebook templates, videos & gifs for real brands (Canva, Figma, Illustrator, CapCut)
• Website UI Design – Wireframe and UI mockup of an Accessories Website (Figma)
• Branding – Logo, business card, letterhead for companies (Figma, Illustrator)
`;
