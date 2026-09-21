import { useEffect, useState } from "react";

interface SiteData {
  name: string;
  title: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  heroText: string;
  heroImage: string;
  aboutImage: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  type: string;
  image: string;
  tags: string[];
  description: string;
}

interface ExperienceItem {
  years: string;
  role: string;
  place: string;
  tags: string;
}

interface Service {
  title: string;
  desc: string;
  icon: string;
}

const defaultSite: SiteData = {
  name: "Abhishek Thakur",
  title: "Graphic & UI Designer",
  about: "I'm a creative Graphic & UI Designer who turns ideas into impactful visuals.",
  email: "iabhishekbhardwaj07@gmail.com",
  phone: "+91 98827 00510",
  location: "Mandi, Himachal Pradesh",
  heroText: "I'm a creative Graphic & UI Designer who turns ideas into impactful visuals. I specialize in branding, social media design, UI, video editing and short-form content creation.",
  heroImage: "/images/hero-portrait.png",
  aboutImage: "/images/about-portrait.png",
};

const defaultProjects: Project[] = [
  { id: "p1", title: "Accessories Website UI", category: "uiux", type: "UI Mockup", image: "/images/ui-laptop.png", tags: ["Figma", "Wireframe", "UI"], description: "Created a basic wireframe and UI mockup of an Accessories Website using Figma." },
  { id: "p2", title: "Social Media Campaign", category: "content", type: "Campaign", image: "/images/content-impact.png", tags: ["Canva", "Figma", "CapCut"], description: "Designed Instagram and Facebook post templates, videos and gifs for real brands." },
  { id: "p3", title: "Brand Identity", category: "graphic", type: "Branding", image: "/images/poster-brand.png", tags: ["Logo", "Stationery", "Illustrator"], description: "Developed branding elements (logo, business card, letterhead) for companies." },
  { id: "p4", title: "Poster & Banner Design", category: "graphic", type: "Graphic", image: "/images/poster-good-things.png", tags: ["Poster", "Banner", "Print"], description: "High-impact posters and banners designed for brand campaigns." },
];

const defaultExperience: ExperienceItem[] = [
  { years: "2024 – Present", role: "Graphic Designer, Social Media Content Creator & UI/UX Designer", place: "Cuilsoft Pvt. Ltd.", tags: "Branding / Social Media / UI-UX" },
  { years: "2023 – 2024", role: "Graphic Designing & UI/UX Intern", place: "Pisoft Informatics Pvt. Ltd. (Mohali)", tags: "6 Months Internship" },
];

const defaultServices: Service[] = [
  { title: "UI/UX Design", desc: "Clean, user-friendly designs that improve engagement and experience.", icon: "monitor" },
  { title: "Graphic Design", desc: "Visual content that communicates ideas and builds brand identity.", icon: "pen" },
  { title: "Video Editing", desc: "Engaging videos and reels that tell stories and connect with your audience.", icon: "play" },
  { title: "Content Creation", desc: "Social media graphics, campaigns and strategically effective content.", icon: "content" },
];

const defaultTools = ["Figma", "Photoshop", "Illustrator", "Premiere Pro", "Canva", "CapCut", "HTML5", "CSS3"];

export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState<"site" | "projects" | "experience" | "services" | "skills">("site");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [site, setSite] = useState<SiteData>(defaultSite);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [experience, setExperience] = useState<ExperienceItem[]>(defaultExperience);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [tools, setTools] = useState<string[]>(defaultTools);

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
    if (!token) { setLoading(false); return; }
    fetch("https://api.github.com/user", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((u) => {
        if (u.login) setUser(u);
        else { localStorage.removeItem("gh_token"); setToken(null); }
      })
      .catch(() => { localStorage.removeItem("gh_token"); setToken(null); })
      .finally(() => setLoading(false));
  }, [token]);

  // Load existing content from public/content
  useEffect(() => {
    Promise.all([
      fetch("/content/site.json").then((r) => r.ok ? r.json() : null).catch(() => null),
      fetch("/content/projects.json").then((r) => r.ok ? r.json() : null).catch(() => null),
    ]).then(([siteData, projectsData]) => {
      if (siteData) setSite({ ...defaultSite, ...siteData });
      if (projectsData && Array.isArray(projectsData) && projectsData.length) setProjects(projectsData);
    });
  }, []);

  const login = () => (window.location.href = "/api/auth/login");
  const logout = () => { localStorage.removeItem("gh_token"); setToken(null); setUser(null); };

  const saveToGitHub = async (path: string, contentObj: any, commitMsg: string) => {
    if (!token) return false;
    try {
      let sha: string | undefined;
      const getRes = await fetch(`https://api.github.com/repos/Abhishek-thakur01/portfolio/contents/${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }
      const content = btoa(unescape(encodeURIComponent(JSON.stringify(contentObj, null, 2))));
      const putRes = await fetch(`https://api.github.com/repos/Abhishek-thakur01/portfolio/contents/${path}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ message: commitMsg, content, sha, branch: "main" }),
      });
      return putRes.ok;
    } catch { return false; }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    const results = await Promise.all([
      saveToGitHub("public/content/site.json", site, "CMS: Update site settings"),
      saveToGitHub("public/content/projects.json", projects, "CMS: Update projects"),
      saveToGitHub("public/content/experience.json", experience, "CMS: Update experience"),
      saveToGitHub("public/content/services.json", services, "CMS: Update services"),
      saveToGitHub("public/content/tools.json", tools, "CMS: Update tools"),
    ]);
    setMessage(results.every(Boolean) ? "✅ Saved! Website will update in 1-2 minutes after deploy." : "⚠️ Some files failed. Check token has repo write access.");
    setSaving(false);
  };

  const addProject = () => setProjects([...projects, { id: "p" + Date.now(), title: "New Project", category: "uiux", type: "Project", image: "/images/ui-laptop.png", tags: [], description: "" }]);
  const removeProject = (id: string) => setProjects(projects.filter((p) => p.id !== id));
  const updateProject = (id: string, field: keyof Project, value: any) => setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));

  const addExperience = () => setExperience([...experience, { years: "", role: "", place: "", tags: "" }]);
  const removeExperience = (i: number) => setExperience(experience.filter((_, idx) => idx !== i));

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#06080f] text-white">Loading...</div>;

  if (!token || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06080f] px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0c1018] p-8 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8b7cff] text-xl font-bold text-white">AT</div>
          <h1 className="text-2xl font-bold text-white">Portfolio CMS</h1>
          <p className="mt-2 text-sm text-white/50">Login with GitHub to manage your entire portfolio</p>
          <button onClick={login} className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 font-semibold text-black transition hover:bg-white/90">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            Login with GitHub
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "site" as const, label: "Site & Images" },
    { id: "projects" as const, label: "Projects" },
    { id: "experience" as const, label: "Experience" },
    { id: "services" as const, label: "Services" },
    { id: "skills" as const, label: "Skills & Tools" },
  ];

  return (
    <div className="min-h-screen bg-[#06080f] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c1018]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8b7cff] text-sm font-bold">AT</div>
            <div>
              <h1 className="text-base font-bold">Portfolio CMS</h1>
              <p className="text-xs text-white/40">@{user.login}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5">View Site ↗</a>
            <button onClick={logout} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5">Logout</button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-5 py-8">
        <aside className="hidden w-52 shrink-0 md:block">
          <nav className="sticky top-24 space-y-1">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition ${tab === t.id ? "bg-[#8b7cff] text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}>
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium ${tab === t.id ? "bg-[#8b7cff] text-white" : "border border-white/15 text-white/60"}`}>
              {t.label}
            </button>
          ))}
        </div>

        <main className="min-w-0 flex-1">
          {tab === "site" && (
            <div className="space-y-5 rounded-2xl border border-white/10 bg-[#0c1018] p-6">
              <h2 className="text-lg font-semibold">Site Settings & Images</h2>
              {(["name", "title", "email", "phone", "location"] as const).map((key) => (
                <div key={key}>
                  <label className="mb-1.5 block text-xs capitalize text-white/50">{key}</label>
                  <input value={site[key]} onChange={(e) => setSite({ ...site, [key]: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-2.5 text-sm outline-none focus:border-[#8b7cff]" />
                </div>
              ))}
              <div>
                <label className="mb-1.5 block text-xs text-white/50">Hero Text</label>
                <textarea value={site.heroText} onChange={(e) => setSite({ ...site, heroText: e.target.value })} rows={3} className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-2.5 text-sm outline-none focus:border-[#8b7cff]" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-white/50">About Text</label>
                <textarea value={site.about} onChange={(e) => setSite({ ...site, about: e.target.value })} rows={4} className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-2.5 text-sm outline-none focus:border-[#8b7cff]" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-white/50">Hero Image URL</label>
                <input value={site.heroImage} onChange={(e) => setSite({ ...site, heroImage: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-2.5 text-sm outline-none focus:border-[#8b7cff]" placeholder="/images/hero-portrait.png" />
                {site.heroImage && <img src={site.heroImage} alt="Hero preview" className="mt-2 h-24 rounded-lg object-cover" />}
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-white/50">About Image URL</label>
                <input value={site.aboutImage} onChange={(e) => setSite({ ...site, aboutImage: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-2.5 text-sm outline-none focus:border-[#8b7cff]" placeholder="/images/about-portrait.png" />
                {site.aboutImage && <img src={site.aboutImage} alt="About preview" className="mt-2 h-24 rounded-lg object-cover" />}
              </div>
            </div>
          )}

          {tab === "projects" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Projects ({projects.length})</h2>
                <button onClick={addProject} className="rounded-lg bg-[#8b7cff] px-4 py-2 text-sm font-medium hover:bg-[#7a6bef]">+ Add Project</button>
              </div>
              {projects.map((p) => (
                <div key={p.id} className="rounded-2xl border border-white/10 bg-[#0c1018] p-5">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <input value={p.title} onChange={(e) => updateProject(p.id, "title", e.target.value)} className="w-full bg-transparent text-base font-semibold outline-none" placeholder="Project title" />
                    <button onClick={() => removeProject(p.id)} className="shrink-0 text-xs text-red-400 hover:text-red-300">Delete</button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs text-white/40">Category</label>
                      <select value={p.category} onChange={(e) => updateProject(p.id, "category", e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#06080f] px-3 py-2 text-sm">
                        <option value="uiux">UI/UX</option>
                        <option value="graphic">Graphic</option>
                        <option value="video">Video</option>
                        <option value="content">Content</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-white/40">Type</label>
                      <input value={p.type} onChange={(e) => updateProject(p.id, "type", e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#06080f] px-3 py-2 text-sm" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs text-white/40">Image URL (put images in public/images/ folder)</label>
                      <input value={p.image} onChange={(e) => updateProject(p.id, "image", e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#06080f] px-3 py-2 text-sm" placeholder="/images/your-image.png" />
                      {p.image && <img src={p.image} alt="" className="mt-2 h-20 rounded-lg object-cover" />}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs text-white/40">Tags (comma separated)</label>
                      <input value={p.tags.join(", ")} onChange={(e) => updateProject(p.id, "tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} className="w-full rounded-lg border border-white/10 bg-[#06080f] px-3 py-2 text-sm" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs text-white/40">Description</label>
                      <textarea value={p.description} onChange={(e) => updateProject(p.id, "description", e.target.value)} rows={2} className="w-full rounded-lg border border-white/10 bg-[#06080f] px-3 py-2 text-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "experience" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Experience</h2>
                <button onClick={addExperience} className="rounded-lg bg-[#8b7cff] px-4 py-2 text-sm font-medium hover:bg-[#7a6bef]">+ Add</button>
              </div>
              {experience.map((exp, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-[#0c1018] p-5">
                  <div className="mb-3 flex justify-end"><button onClick={() => removeExperience(i)} className="text-xs text-red-400">Delete</button></div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input value={exp.years} onChange={(e) => { const n = [...experience]; n[i] = { ...n[i], years: e.target.value }; setExperience(n); }} placeholder="Years" className="rounded-lg border border-white/10 bg-[#06080f] px-3 py-2 text-sm" />
                    <input value={exp.place} onChange={(e) => { const n = [...experience]; n[i] = { ...n[i], place: e.target.value }; setExperience(n); }} placeholder="Company" className="rounded-lg border border-white/10 bg-[#06080f] px-3 py-2 text-sm" />
                    <input value={exp.role} onChange={(e) => { const n = [...experience]; n[i] = { ...n[i], role: e.target.value }; setExperience(n); }} placeholder="Role" className="sm:col-span-2 rounded-lg border border-white/10 bg-[#06080f] px-3 py-2 text-sm" />
                    <input value={exp.tags} onChange={(e) => { const n = [...experience]; n[i] = { ...n[i], tags: e.target.value }; setExperience(n); }} placeholder="Tags" className="sm:col-span-2 rounded-lg border border-white/10 bg-[#06080f] px-3 py-2 text-sm" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "services" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Services</h2>
              {services.map((s, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-[#0c1018] p-5">
                  <input value={s.title} onChange={(e) => { const n = [...services]; n[i] = { ...n[i], title: e.target.value }; setServices(n); }} className="mb-2 w-full bg-transparent text-base font-semibold outline-none" />
                  <textarea value={s.desc} onChange={(e) => { const n = [...services]; n[i] = { ...n[i], desc: e.target.value }; setServices(n); }} rows={2} className="w-full rounded-lg border border-white/10 bg-[#06080f] px-3 py-2 text-sm" />
                </div>
              ))}
            </div>
          )}

          {tab === "skills" && (
            <div className="rounded-2xl border border-white/10 bg-[#0c1018] p-6">
              <h2 className="mb-4 text-lg font-semibold">Skills & Tools</h2>
              <p className="mb-3 text-xs text-white/40">Comma separated</p>
              <textarea value={tools.join(", ")} onChange={(e) => setTools(e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} rows={4} className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-3 text-sm outline-none focus:border-[#8b7cff]" />
              <div className="mt-4 flex flex-wrap gap-2">{tools.map((t) => <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs">{t}</span>)}</div>
            </div>
          )}

          <div className="sticky bottom-6 mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0c1018]/95 p-4 backdrop-blur-xl">
            <button onClick={handleSave} disabled={saving} className="rounded-xl bg-[#8b7cff] px-6 py-3 text-sm font-semibold transition hover:bg-[#7a6bef] disabled:opacity-60">
              {saving ? "Saving..." : "Save All Changes"}
            </button>
            {message && <p className="text-sm">{message}</p>}
          </div>
        </main>
      </div>
    </div>
  );
}
