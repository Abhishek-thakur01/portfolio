import { useEffect, useState } from "react";
import { NAV, RESUME_TEXT } from "./data";
import { IconArrowRight, IconDownload, IconMail, IconPhone, IconPin, IconClose, IconMenu } from "./components/Icons";
import { cn } from "./utils/cn";
import { useContent } from "./hooks/useContent";

function downloadResume() {
  const blob = new Blob([RESUME_TEXT], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Abhishek_Thakur_Resume.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function Navbar({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      let current = "home";
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < 140) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={cn("fixed top-0 right-0 left-0 z-50 transition-all duration-300", scrolled ? "border-b border-white/6 bg-[#06080f]/90 backdrop-blur-xl" : "bg-transparent")}>
      <div className="mx-auto flex h-[70px] max-w-[1200px] items-center justify-between px-5 lg:px-8">
        <button onClick={() => go("home")} className="flex items-center gap-2">
          <span className="text-[15px] font-bold text-white">{`</>`} {name.split(" ")[0]}</span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <button key={item.id} onClick={() => go(item.id)} className={cn("text-[13px] font-medium transition", active === item.id ? "text-[#60a5fa]" : "text-white/60 hover:text-white")}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={downloadResume} className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[12px] font-medium text-white/80 transition hover:border-white/30 hover:text-white md:inline-flex">
            Download Resume <IconDownload size={14} />
          </button>
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white lg:hidden" onClick={() => setOpen((v) => !v)}>
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/8 bg-[#06080f]/95 px-5 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <button key={item.id} onClick={() => go(item.id)} className="rounded-lg px-3 py-2.5 text-left text-sm text-white/70 hover:bg-white/5 hover:text-white">{item.label}</button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default function App() {
  const { personal, about, projects, skills, experience, loading } = useContent();
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06080f] text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#60a5fa] border-t-transparent" />
      </div>
    );
  }

  const filters = ["all", "uiux", "graphic", "video", "content"];
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category.toLowerCase().includes(filter) || p.category.toLowerCase() === filter);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#06080f] text-white">
      <Navbar name={personal.fullName} />

      {/* 1. HERO */}
      <section id="home" className="relative overflow-hidden pt-[70px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-5%] right-[5%] h-[500px] w-[500px] rounded-full bg-[#3b82f6]/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-5 pt-14 pb-16 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 text-[13px] font-medium tracking-wide text-white/50">{personal.greeting.toUpperCase()}</p>
            <h1 className="text-[42px] leading-[1.1] font-bold tracking-tight sm:text-[52px]">
              <span className="text-white">{personal.fullName.split(" ")[0]}</span>{" "}
              <span className="text-[#60a5fa]">{personal.fullName.split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="mt-2 text-[18px] font-medium text-white/70">{personal.role}</p>
            <p className="mt-5 max-w-[480px] text-[15px] leading-relaxed text-white/50">{personal.bio}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="inline-flex items-center gap-2 rounded-lg bg-[#3b82f6] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#2563eb]">
                View My Projects <IconArrowRight size={16} />
              </a>
              <button onClick={downloadResume} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-[14px] font-medium text-white/80 transition hover:border-white/30 hover:text-white">
                Download Resume <IconDownload size={16} />
              </button>
            </div>
          </div>
          <div className="relative mx-auto h-[380px] w-full max-w-[400px] lg:h-[440px]">
            <div className="absolute inset-0 rounded-2xl bg-[#3b82f6]/10 blur-[60px]" />
            <img
              src={personal.heroImage || "/images/hero-portrait.png"}
              alt={personal.fullName}
              className="relative z-10 h-full w-full rounded-2xl object-cover object-top"
            />
            <div className="absolute top-6 right-[-10px] z-20 hidden rotate-12 sm:block">
              <p className="text-[22px] font-semibold leading-tight text-[#60a5fa]">Build<br />Create<br />Improve</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS */}
      <section className="border-y border-white/6 py-10">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-5 sm:grid-cols-4 lg:px-8">
          {[
            { value: "15+", label: "Projects Completed" },
            { value: "10+", label: "Happy Clients" },
            { value: "1+", label: "Years Experience" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[28px] font-bold text-white sm:text-[32px]">{s.value}</p>
              <p className="mt-1 text-[12px] text-white/40">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT */}
      <section id="about" className="py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.15em] text-[#60a5fa]">ABOUT ME</p>
            <h2 className="mt-2 text-[28px] font-bold text-white sm:text-[34px]">{about.heading || "A little about me"}</h2>
            {about.paragraphs?.map((para, i) => (
              <p key={i} className="mt-4 text-[15px] leading-relaxed text-white/50">{para}</p>
            ))}
            {!about.paragraphs?.length && (
              <p className="mt-4 text-[15px] leading-relaxed text-white/50">{personal.bio}</p>
            )}
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-[13px] font-medium text-white/80 transition hover:border-white/30 hover:text-white">
              Learn More <IconArrowRight size={14} />
            </a>
          </div>

          <div className="rounded-2xl border border-white/8 bg-[#0c1018] p-6">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#3b82f6]/15 text-[#60a5fa]">
                  <IconPin size={16} />
                </span>
                <div>
                  <p className="text-[12px] text-white/40">Location</p>
                  <p className="text-[14px] font-medium text-white">{personal.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#3b82f6]/15 text-[#60a5fa]">
                  <IconMail size={16} />
                </span>
                <div>
                  <p className="text-[12px] text-white/40">Email</p>
                  <p className="text-[14px] font-medium text-white">{personal.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#3b82f6]/15 text-[#60a5fa]">
                  <IconPhone size={16} />
                </span>
                <div>
                  <p className="text-[12px] text-white/40">Phone</p>
                  <p className="text-[14px] font-medium text-white">{personal.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#3b82f6]/15 text-[#60a5fa]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </span>
                <div>
                  <p className="text-[12px] text-white/40">Availability</p>
                  <p className="text-[14px] font-medium text-white">Open to work</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROJECTS */}
      <section id="work" className="border-t border-white/6 py-20">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.15em] text-[#60a5fa]">MY PROJECTS</p>
              <h2 className="mt-2 text-[28px] font-bold text-white sm:text-[34px]">Featured Projects</h2>
              <p className="mt-2 max-w-lg text-[14px] text-white/45">Here are some of my recent projects. Each project helped me learn something new.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={cn("rounded-full px-3.5 py-1.5 text-[12px] font-medium capitalize transition", filter === f ? "bg-[#3b82f6] text-white" : "border border-white/12 text-white/50 hover:border-white/25 hover:text-white")}>
                  {f === "all" ? "All" : f === "uiux" ? "UI/UX" : f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <div key={p.id} className="group overflow-hidden rounded-2xl border border-white/8 bg-[#0c1018] transition hover:border-[#3b82f6]/30">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-[16px] font-semibold text-white">{p.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/45">{p.description || p.type || p.category}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] text-white/50">{t}</span>
                    ))}
                  </div>
                  {p.liveLink && (
                    <a href={p.liveLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#60a5fa] hover:text-white">
                      View Project <IconArrowRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SKILLS */}
      <section id="skills" className="border-t border-white/6 py-20">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
          <p className="text-[12px] font-semibold tracking-[0.15em] text-[#60a5fa]">MY SKILLS</p>
          <h2 className="mt-2 text-[28px] font-bold text-white sm:text-[34px]">Technologies & Tools</h2>
          <p className="mt-2 max-w-lg text-[14px] text-white/45">I work with modern tools to create impactful designs and content.</p>
          <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5">
            {skills.map((t) => (
              <div key={t.name} className="flex flex-col items-center gap-2.5 rounded-xl border border-white/8 bg-[#0c1018] p-4 transition hover:border-[#3b82f6]/30">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-[13px] font-bold text-white"
                  style={{ background: (t.color || "#3b82f6") + "33" }}
                >
                  {t.name.slice(0, 2)}
                </div>
                <span className="text-[12px] text-white/55">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EXPERIENCE */}
      <section id="experience" className="border-t border-white/6 py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 lg:grid-cols-[1fr_340px] lg:px-8">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.15em] text-[#60a5fa]">MY EXPERIENCE</p>
            <h2 className="mt-2 text-[28px] font-bold text-white sm:text-[34px]">Work Experience</h2>
            <p className="mt-2 text-[14px] text-white/45">My professional journey so far.</p>

            <div className="mt-10 space-y-0">
              {experience.map((exp, i) => (
                <div key={exp.id} className="relative flex gap-5 pb-10">
                  <div className="flex flex-col items-center">
                    <span className={cn("h-3 w-3 shrink-0 rounded-full", i === 0 ? "bg-[#3b82f6] ring-4 ring-[#3b82f6]/20" : "bg-white/25")} />
                    {i < experience.length - 1 && <span className="w-px flex-1 bg-white/10" />}
                  </div>
                  <div className="pb-2">
                    <p className="text-[12px] font-medium text-[#60a5fa]">{exp.period}</p>
                    <p className="mt-1 text-[16px] font-semibold text-white">{exp.title}</p>
                    <p className="mt-1 text-[13px] text-white/45">{exp.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {exp.tags.map((t) => (
                        <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-white/45">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-[#0c1018] p-7 text-center lg:self-start">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#3b82f6]/15 text-[#60a5fa]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            </div>
            <p className="text-[12px] font-semibold tracking-wider text-[#60a5fa]">LET'S WORK TOGETHER</p>
            <h3 className="mt-2 text-[20px] font-bold text-white">Have a project in mind?</h3>
            <p className="mt-2 text-[13px] text-white/45">I'm always open to new opportunities and collaborations.</p>
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#3b82f6] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#2563eb]">
              Get In Touch <IconArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 7. CONTACT */}
      <section id="contact" className="border-t border-white/6 py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.15em] text-[#60a5fa]">CONTACT</p>
            <h2 className="mt-2 text-[28px] font-bold text-white sm:text-[34px]">Let's Connect</h2>
            <p className="mt-3 max-w-md text-[15px] text-white/45">Feel free to reach out if you have a project in mind or just want to say hello!</p>
            <div className="mt-8 space-y-4">
              <a href={`mailto:${personal.email}`} className="flex items-center gap-3 text-white/70 transition hover:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3b82f6]/10 text-[#60a5fa]"><IconMail size={16} /></span>
                {personal.email}
              </a>
              <a href={`tel:${personal.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-white/70 transition hover:text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3b82f6]/10 text-[#60a5fa]"><IconPhone size={16} /></span>
                {personal.phone}
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3b82f6]/10 text-[#60a5fa]"><IconPin size={16} /></span>
                {personal.location}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 bg-[#0c1018] p-6">
            {status === "sent" ? (
              <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center">
                <p className="text-lg font-semibold text-white">Message sent!</p>
                <p className="mt-2 text-[14px] text-white/50">I'll get back to you soon.</p>
                <button onClick={() => setStatus("idle")} className="mt-6 text-[13px] text-[#60a5fa] hover:text-white">Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-[12px] text-white/40">Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required className="w-full rounded-lg border border-white/10 bg-[#06080f] px-4 py-2.5 text-sm text-white outline-none focus:border-[#3b82f6]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] text-white/40">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your email" required className="w-full rounded-lg border border-white/10 bg-[#06080f] px-4 py-2.5 text-sm text-white outline-none focus:border-[#3b82f6]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] text-white/40">Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message..." required rows={4} className="w-full rounded-lg border border-white/10 bg-[#06080f] px-4 py-2.5 text-sm text-white outline-none focus:border-[#3b82f6]" />
                </div>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3b82f6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2563eb]">
                  Send Message <IconArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/6 py-6 text-center text-[13px] text-white/35">
        © {new Date().getFullYear()} {personal.fullName}. All rights reserved.
      </footer>
    </div>
  );
}
