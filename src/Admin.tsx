import { useEffect, useState } from "react";

/* ───────── Types ───────── */
interface Personal {
  fullName: string;
  role: string;
  greeting: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  heroImage: string;
}

interface About {
  heading: string;
  paragraphs: string[];
}

interface Project {
  id: string;
  title: string;
  category: string;
  platform: string;
  liveLink: string;
  description: string;
  tags: string[];
  image: string;
}

interface Skill {
  name: string;
  color: string;
  category: string;
}

interface Experience {
  id: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
}

/* ───────── Defaults ───────── */
const defaultPersonal: Personal = {
  fullName: "Abhishek Thakur",
  role: "Graphic & UI Designer",
  greeting: "Hi, I'm",
  bio: "I'm a creative Graphic & UI Designer who turns ideas into impactful visuals. I specialize in branding, social media design, UI, video editing and short-form content creation.",
  email: "iabhishekbhardwaj07@gmail.com",
  phone: "+91 98827 00510",
  location: "Mandi, Himachal Pradesh",
  heroImage: "/images/hero-portrait.png",
};

const defaultAbout: About = {
  heading: "A little about me",
  paragraphs: [
    "I'm Abhishek Thakur — a Graphic & UI Designer focused on creating modern, impactful visuals and user-friendly interfaces.",
    "I specialize in branding, social media design, UI mockups, video editing and short-form content creation.",
  ],
};

const defaultProjects: Project[] = [
  {
    id: "p1",
    title: "Accessories Website UI",
    category: "UI/UX",
    platform: "Figma",
    liveLink: "",
    description: "Created a basic wireframe and UI mockup of an Accessories Website using Figma.",
    tags: ["Figma", "Wireframe", "UI"],
    image: "/images/ui-laptop.png",
  },
  {
    id: "p2",
    title: "Social Media Campaign",
    category: "Content",
    platform: "Canva + CapCut",
    liveLink: "",
    description: "Designed Instagram and Facebook post templates, videos and gifs for real brands.",
    tags: ["Canva", "Figma", "CapCut"],
    image: "/images/content-impact.png",
  },
  {
    id: "p3",
    title: "Brand Identity",
    category: "Graphic",
    platform: "Illustrator",
    liveLink: "",
    description: "Developed branding elements (logo, business card, letterhead) for companies.",
    tags: ["Logo", "Stationery", "Illustrator"],
    image: "/images/poster-brand.png",
  },
  {
    id: "p4",
    title: "Poster & Banner Design",
    category: "Graphic",
    platform: "Photoshop",
    liveLink: "",
    description: "High-impact posters and banners designed for brand campaigns.",
    tags: ["Poster", "Banner", "Print"],
    image: "/images/poster-good-things.png",
  },
];

const defaultSkills: Skill[] = [
  { name: "Figma", color: "#A259FF", category: "Design" },
  { name: "Photoshop", color: "#31A8FF", category: "Design" },
  { name: "Illustrator", color: "#FF9A00", category: "Design" },
  { name: "Premiere Pro", color: "#9999FF", category: "Video" },
  { name: "Canva", color: "#00C4CC", category: "Design" },
  { name: "CapCut", color: "#000000", category: "Video" },
  { name: "HTML5", color: "#E34F26", category: "Frontend" },
  { name: "CSS3", color: "#1572B6", category: "Frontend" },
];

const defaultExperience: Experience[] = [
  {
    id: "e1",
    title: "Graphic Designer, Social Media Content Creator & UI/UX Designer",
    period: "2024 – Present",
    description: "Working at Cuilsoft Pvt. Ltd. Creating branding, social media content, UI designs and video content.",
    tags: ["Branding", "Social Media", "UI/UX"],
  },
  {
    id: "e2",
    title: "Graphic Designing & UI/UX Intern",
    period: "2023 – 2024",
    description: "6 months internship at Pisoft Informatics Pvt. Ltd. (Mohali). Worked on real client projects.",
    tags: ["Internship", "UI/UX", "Graphic Design"],
  },
];

/* ───────── Component ───────── */
export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [section, setSection] = useState("personal");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedProject, setExpandedProject] = useState<string | null>("p1");

  const [personal, setPersonal] = useState<Personal>(defaultPersonal);
  const [about, setAbout] = useState<About>(defaultAbout);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [experience, setExperience] = useState<Experience[]>(defaultExperience);

  // Auth
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      localStorage.setItem("gh_token", urlToken);
      setToken(urlToken);
      window.history.replaceState({}, "", "/admin");
    } else {
      const saved = localStorage.getItem("gh_token");
      if (saved) setToken(saved);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch("https://api.github.com/user", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((u) => {
        if (u.login) setUser(u);
        else { localStorage.removeItem("gh_token"); setToken(null); }
      })
      .catch(() => { localStorage.removeItem("gh_token"); setToken(null); });
  }, [token]);

  const login = () => (window.location.href = "/api/auth/login");
  const logout = () => { localStorage.removeItem("gh_token"); setToken(null); setUser(null); };

  const saveToGitHub = async (path: string, data: any, msg: string) => {
    if (!token) return false;
    try {
      let sha: string | undefined;
      const getRes = await fetch(`https://api.github.com/repos/Abhishek-thakur01/portfolio/contents/${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (getRes.ok) sha = (await getRes.json()).sha;
      const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
      const putRes = await fetch(`https://api.github.com/repos/Abhishek-thakur01/portfolio/contents/${path}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, content, sha, branch: "main" }),
      });
      return putRes.ok;
    } catch { return false; }
  };

  const publish = async () => {
    setSaving(true);
    setMessage("");
    const results = await Promise.all([
      saveToGitHub("public/content/personal.json", personal, "CMS: Update personal"),
      saveToGitHub("public/content/about.json", about, "CMS: Update about"),
      saveToGitHub("public/content/projects.json", projects, "CMS: Update projects"),
      saveToGitHub("public/content/skills.json", skills, "CMS: Update skills"),
      saveToGitHub("public/content/experience.json", experience, "CMS: Update experience"),
    ]);
    setMessage(results.every(Boolean) ? "✅ Published successfully! Site will update in 1-2 min." : "⚠️ Some files failed to save.");
    setSaving(false);
  };

  /* ───── Login ───── */
  if (!token || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121826] p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">AT</div>
          <h1 className="text-2xl font-bold text-white">Portfolio CMS</h1>
          <p className="mt-2 text-sm text-white/50">Login with GitHub to manage content</p>
          <button onClick={login} className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 font-semibold text-black hover:bg-white/90">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            Login with GitHub
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "personal", label: "Personal" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
  ];

  const inputCls = "w-full rounded-lg border border-white/10 bg-[#0b0f19] px-3.5 py-2.5 text-sm text-white outline-none focus:border-blue-500";
  const labelCls = "mb-1.5 block text-xs font-medium text-white/50";

  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-white">
      {/* ── Sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-white/8 bg-[#121826]">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold">AT</div>
          <span className="text-sm font-semibold">Portfolio CMS</span>
        </div>

        <div className="px-3 text-[10px] font-semibold tracking-wider text-white/30">WEBSITE</div>
        <nav className="mt-1 flex-1 space-y-0.5 px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                section === item.id ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/8 p-3">
          <button onClick={logout} className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-white/5">
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="ml-56 flex flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/8 bg-[#0b0f19]/90 px-8 py-4 backdrop-blur">
          <div>
            <p className="text-[11px] font-medium tracking-wider text-white/40">CONTENT CONTROL</p>
            <h1 className="text-xl font-semibold capitalize">{section}</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70 hover:bg-white/5">
              View Website
            </a>
            <button
              onClick={publish}
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60"
            >
              {saving ? "Publishing..." : "Publish Changes"}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-8">
          {message && (
            <div className="mb-6 rounded-lg border border-white/10 bg-[#121826] px-4 py-3 text-sm">{message}</div>
          )}

          {/* ── PERSONAL ── */}
          {section === "personal" && (
            <div className="max-w-3xl space-y-6">
              <div className="rounded-xl border border-white/8 bg-[#121826] p-6">
                <div className="mb-1 flex items-center gap-2">
                  <h2 className="font-semibold">Personal</h2>
                  <span className="text-xs text-green-400">Synced from GitHub</span>
                </div>

                <p className="mb-5 text-xs font-medium tracking-wider text-white/30">BASIC INFO</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Full Name</label>
                    <input className={inputCls} value={personal.fullName} onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Role / Title</label>
                    <input className={inputCls} value={personal.role} onChange={(e) => setPersonal({ ...personal, role: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Greeting</label>
                    <input className={inputCls} value={personal.greeting} onChange={(e) => setPersonal({ ...personal, greeting: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Bio</label>
                    <textarea className={inputCls} rows={4} value={personal.bio} onChange={(e) => setPersonal({ ...personal, bio: e.target.value })} />
                  </div>
                </div>

                <p className="mb-4 mt-8 text-xs font-medium tracking-wider text-white/30">CONTACT</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Email</label>
                    <input className={inputCls} value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone</label>
                    <input className={inputCls} value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Location</label>
                    <input className={inputCls} value={personal.location} onChange={(e) => setPersonal({ ...personal, location: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Hero Image URL</label>
                    <input className={inputCls} value={personal.heroImage} onChange={(e) => setPersonal({ ...personal, heroImage: e.target.value })} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ABOUT ── */}
          {section === "about" && (
            <div className="max-w-3xl space-y-6">
              <div className="rounded-xl border border-white/8 bg-[#121826] p-6">
                <div className="mb-1 flex items-center gap-2">
                  <h2 className="font-semibold">About</h2>
                  <span className="text-xs text-green-400">Synced from GitHub</span>
                </div>

                <p className="mb-4 mt-5 text-xs font-medium tracking-wider text-white/30">HEADING</p>
                <div>
                  <label className={labelCls}>Section Heading</label>
                  <input className={inputCls} value={about.heading} onChange={(e) => setAbout({ ...about, heading: e.target.value })} />
                </div>

                <p className="mb-4 mt-8 text-xs font-medium tracking-wider text-white/30">PARAGRAPHS</p>
                {about.paragraphs.map((p, i) => (
                  <div key={i} className="mb-4 rounded-lg border border-white/8 bg-[#0b0f19] p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-white/40">Paragraph {i + 1}</span>
                      <button
                        onClick={() => setAbout({ ...about, paragraphs: about.paragraphs.filter((_, idx) => idx !== i) })}
                        className="text-xs text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                    <textarea
                      className={inputCls}
                      rows={3}
                      value={p}
                      onChange={(e) => {
                        const next = [...about.paragraphs];
                        next[i] = e.target.value;
                        setAbout({ ...about, paragraphs: next });
                      }}
                    />
                  </div>
                ))}
                <button
                  onClick={() => setAbout({ ...about, paragraphs: [...about.paragraphs, ""] })}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  + Add Paragraph
                </button>
              </div>
            </div>
          )}

          {/* ── PROJECTS ── */}
          {section === "projects" && (
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Projects</h2>
                  <p className="text-xs text-green-400">Synced from GitHub · {projects.length} projects</p>
                </div>
                <button
                  onClick={() => {
                    const id = "p" + Date.now();
                    setProjects([...projects, { id, title: "New Project", category: "UI/UX", platform: "", liveLink: "", description: "", tags: [], image: "" }]);
                    setExpandedProject(id);
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
                >
                  + Add Project
                </button>
              </div>

              {projects.map((p, idx) => (
                <div key={p.id} className="rounded-xl border border-white/8 bg-[#121826]">
                  <button
                    onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-white/10 text-xs">{idx + 1}</span>
                      <div>
                        <p className="text-sm font-medium">{p.title}</p>
                        <p className="text-xs text-white/40">{p.category} · {p.platform}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setProjects(projects.filter((x) => x.id !== p.id)); }}
                        className="rounded px-2 py-1 text-xs text-red-400 hover:bg-red-400/10"
                      >
                        Delete
                      </button>
                      <span className="text-white/30">{expandedProject === p.id ? "▴" : "▾"}</span>
                    </div>
                  </button>

                  {expandedProject === p.id && (
                    <div className="border-t border-white/8 px-5 py-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className={labelCls}>Title</label>
                          <input className={inputCls} value={p.title} onChange={(e) => setProjects(projects.map((x) => x.id === p.id ? { ...x, title: e.target.value } : x))} />
                        </div>
                        <div>
                          <label className={labelCls}>Category</label>
                          <input className={inputCls} value={p.category} onChange={(e) => setProjects(projects.map((x) => x.id === p.id ? { ...x, category: e.target.value } : x))} />
                        </div>
                        <div>
                          <label className={labelCls}>Platform</label>
                          <input className={inputCls} value={p.platform} onChange={(e) => setProjects(projects.map((x) => x.id === p.id ? { ...x, platform: e.target.value } : x))} placeholder="e.g. Figma, Canva" />
                        </div>
                        <div>
                          <label className={labelCls}>Live Link</label>
                          <input className={inputCls} value={p.liveLink} onChange={(e) => setProjects(projects.map((x) => x.id === p.id ? { ...x, liveLink: e.target.value } : x))} placeholder="https://..." />
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelCls}>Description</label>
                          <textarea className={inputCls} rows={3} value={p.description} onChange={(e) => setProjects(projects.map((x) => x.id === p.id ? { ...x, description: e.target.value } : x))} />
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelCls}>Tags (comma separated)</label>
                          <input
                            className={inputCls}
                            value={p.tags.join(", ")}
                            onChange={(e) =>
                              setProjects(
                                projects.map((x) =>
                                  x.id === p.id
                                    ? { ...x, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) }
                                    : x
                                )
                              )
                            }
                          />
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {p.tags.map((t) => (
                              <span key={t} className="rounded bg-blue-600/20 px-2 py-0.5 text-xs text-blue-300">{t}</span>
                            ))}
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label className={labelCls}>Image URL</label>
                          <input className={inputCls} value={p.image} onChange={(e) => setProjects(projects.map((x) => x.id === p.id ? { ...x, image: e.target.value } : x))} placeholder="/images/..." />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── SKILLS ── */}
          {section === "skills" && (
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Skills</h2>
                  <p className="text-xs text-green-400">Synced from GitHub</p>
                </div>
                <button
                  onClick={() => setSkills([...skills, { name: "New Skill", color: "#8b7cff", category: "Design" }])}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
                >
                  + Add Skill
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {skills.map((s, i) => (
                  <div key={i} className="rounded-xl border border-white/8 bg-[#121826] p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ background: s.color }} />
                      <input
                        className="flex-1 bg-transparent text-sm font-medium outline-none"
                        value={s.name}
                        onChange={(e) => {
                          const n = [...skills];
                          n[i] = { ...n[i], name: e.target.value };
                          setSkills(n);
                        }}
                      />
                      <button onClick={() => setSkills(skills.filter((_, idx) => idx !== i))} className="text-xs text-red-400">×</button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        className={inputCls}
                        value={s.color}
                        onChange={(e) => {
                          const n = [...skills];
                          n[i] = { ...n[i], color: e.target.value };
                          setSkills(n);
                        }}
                        placeholder="#hex"
                      />
                      <input
                        className={inputCls}
                        value={s.category}
                        onChange={(e) => {
                          const n = [...skills];
                          n[i] = { ...n[i], category: e.target.value };
                          setSkills(n);
                        }}
                        placeholder="Category"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── EXPERIENCE ── */}
          {section === "experience" && (
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">Experience</h2>
                  <p className="text-xs text-green-400">Synced from GitHub · {experience.length} entries</p>
                </div>
                <button
                  onClick={() => setExperience([...experience, { id: "e" + Date.now(), title: "", period: "", description: "", tags: [] }])}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500"
                >
                  + Add Entry
                </button>
              </div>

              {experience.map((exp, i) => (
                <div key={exp.id} className="rounded-xl border border-white/8 bg-[#121826] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs text-green-400">{exp.period || "Period"}</span>
                    <button onClick={() => setExperience(experience.filter((_, idx) => idx !== i))} className="text-xs text-red-400">Delete</button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Title</label>
                      <input className={inputCls} value={exp.title} onChange={(e) => { const n = [...experience]; n[i] = { ...n[i], title: e.target.value }; setExperience(n); }} />
                    </div>
                    <div>
                      <label className={labelCls}>Period</label>
                      <input className={inputCls} value={exp.period} onChange={(e) => { const n = [...experience]; n[i] = { ...n[i], period: e.target.value }; setExperience(n); }} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Description</label>
                      <textarea className={inputCls} rows={3} value={exp.description} onChange={(e) => { const n = [...experience]; n[i] = { ...n[i], description: e.target.value }; setExperience(n); }} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Tags (comma separated)</label>
                      <input
                        className={inputCls}
                        value={exp.tags.join(", ")}
                        onChange={(e) => {
                          const n = [...experience];
                          n[i] = { ...n[i], tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) };
                          setExperience(n);
                        }}
                      />
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {exp.tags.map((t) => (
                          <span key={t} className="rounded bg-blue-600/20 px-2 py-0.5 text-xs text-blue-300">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
