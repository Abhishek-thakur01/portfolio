import { useEffect, useState } from "react";
import { NAV, SERVICES, PROJECTS, TOOLS, RESUME_TEXT } from "./data";
import { IconArrowRight, IconDownload, IconMail, IconPhone, IconPin, IconClose, IconMenu } from "./components/Icons";
import { cn } from "./utils/cn";

function downloadResume() {
  const blob = new Blob([RESUME_TEXT], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Abhishek_Thakur_Resume.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function Navbar() {
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
    <header className={cn("fixed top-0 right-0 left-0 z-50 transition-all duration-300", scrolled ? "border-b border-white/6 bg-[#06080f]/85 backdrop-blur-xl" : "bg-transparent")}>
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
        <button onClick={() => go("home")} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8b7cff] text-sm font-bold text-white">AT</span>
          <div className="hidden text-left sm:block">
            <p className="text-[13px] font-semibold leading-none text-white">Abhishek Thakur</p>
            <p className="text-[10px] text-white/50">Graphic & UI Designer</p>
          </div>
        </button>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <button key={item.id} onClick={() => go(item.id)} className={cn("text-[13px] font-medium transition", active === item.id ? "text-white" : "text-white/55 hover:text-white")}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => go("contact")} className="hidden items-center gap-2 rounded-full bg-[#8b7cff] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#7a6bef] md:inline-flex">
            Let's Talk <IconArrowRight size={14} />
          </button>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden" onClick={() => setOpen((v) => !v)}>
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

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-[72px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] right-[8%] h-[520px] w-[520px] rounded-full bg-[#8b7cff]/15 blur-[120px]" />
      </div>
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-5 pt-12 pb-20 lg:grid-cols-2 lg:px-8 lg:pt-16">
        <div className="max-w-[580px]">
          <p className="mb-4 text-[12px] font-semibold tracking-[0.2em] text-[#9aa3d6]">HI, I'M ABHISHEK</p>
          <h1 className="text-[40px] leading-[1.1] font-bold tracking-tight text-white sm:text-[52px] lg:text-[56px]">
            I create digital<br />
            <span className="text-[#8b7cff]">experiences, brands</span><br />
            and content.
          </h1>
          <p className="mt-6 max-w-[460px] text-[15px] leading-relaxed text-white/55">
            I'm a creative Graphic & UI Designer who turns ideas into impactful visuals. I specialize in branding, social media design, UI, video editing and short-form content creation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-[#8b7cff] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#7a6bef]">
              View My Work <IconArrowRight size={16} />
            </a>
            <button onClick={downloadResume} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[14px] font-medium text-white/80 transition hover:border-white/40 hover:text-white">
              Download Resume <IconDownload size={16} />
            </button>
          </div>
          <div className="mt-10">
            <p className="mb-3 text-[11px] font-medium tracking-wide text-white/40">Tools I Use</p>
            <div className="flex flex-wrap gap-2">
              {["Canva", "Figma", "Illustrator", "Photoshop", "Premiere Pro", "CapCut"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-medium text-white/70">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="relative mx-auto h-[400px] w-full max-w-[480px] lg:h-[520px]">
          <div className="absolute top-[8%] right-[0%] z-20 hidden rotate-[12deg] sm:block">
            <p className="font-hand text-[30px] leading-[1.05] font-semibold text-[#c4b5fd] lg:text-[36px]">Better<br />Ideas<br />Better<br />Products</p>
          </div>
          <div className="absolute inset-0 rounded-full bg-[#8b7cff]/20 blur-[80px]" />
          <img src="/images/hero-portrait.png" alt="Abhishek Thakur" className="relative z-10 h-full w-full object-cover object-top" style={{ maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)" }} />
        </div>
      </div>
    </section>
  );
}

function Services() {
  const icons: Record<string, React.ReactNode> = {
    monitor: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    pen: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/></svg>,
    play: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z"/></svg>,
    content: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>,
  };

  return (
    <section id="services" className="border-t border-white/6 py-20">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <p className="text-[12px] font-semibold tracking-[0.2em] text-[#8b7cff]">01 — SERVICES</p>
        <h2 className="mt-2 text-[32px] font-bold text-white sm:text-[40px]">What I Do</h2>
        <p className="mt-3 max-w-xl text-[15px] text-white/50">I design and build digital products that are reliable, responsive and results-driven.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/8 bg-[#0c1018] p-6 transition hover:border-[#8b7cff]/40 hover:bg-[#0e1320]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#8b7cff]/15 text-[#c4b5fd]">{icons[s.icon]}</div>
              <h3 className="text-[17px] font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/50">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedWork() {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "uiux", "graphic", "video", "content"];
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" className="border-t border-white/6 py-20">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <p className="text-[12px] font-semibold tracking-[0.2em] text-[#8b7cff]">02 — FEATURED WORK</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[32px] font-bold text-white sm:text-[40px]">Selected Projects</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={cn("rounded-full px-4 py-1.5 text-[12px] font-medium capitalize transition", filter === f ? "bg-[#8b7cff] text-white" : "border border-white/15 text-white/60 hover:border-white/30 hover:text-white")}>
                {f === "all" ? "All" : f === "uiux" ? "UI/UX" : f}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <div key={p.id} className="group overflow-hidden rounded-2xl border border-white/8 bg-[#0c1018] transition hover:border-[#8b7cff]/30">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="text-[15px] font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-[12px] text-white/45">{p.type}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/50">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="border-t border-white/6 py-20">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <p className="text-[12px] font-semibold tracking-[0.2em] text-[#8b7cff]">03 — SKILLS & TOOLS</p>
        <h2 className="mt-2 text-[32px] font-bold text-white sm:text-[40px]">Technologies I Work With</h2>
        <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {TOOLS.map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-[#0c1018] p-4 transition hover:border-[#8b7cff]/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[14px] font-bold text-white/80">{t.abbr}</div>
              <span className="text-[11px] text-white/50">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceAbout() {
  return (
    <section id="experience" className="border-t border-white/6 py-20">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-5 lg:grid-cols-2 lg:px-8">
        <div className="rounded-2xl border border-white/8 bg-[#0c1018] p-6 lg:p-8">
          <p className="text-[12px] font-semibold tracking-[0.2em] text-[#8b7cff]">04 — EXPERIENCE</p>
          <h2 className="mt-2 text-[28px] font-bold text-white">Experience</h2>
          <div className="mt-8 space-y-6">
            <div className="relative pl-6">
              <span className="absolute top-1.5 left-0 h-3 w-3 rounded-full bg-[#8b7cff] ring-4 ring-[#8b7cff]/20" />
              <p className="text-[12px] text-white/40">2024 – Present</p>
              <p className="mt-1 text-[16px] font-semibold text-white">Graphic Designer, Social Media Content Creator & UI/UX Designer</p>
              <p className="text-[13px] text-white/55">Cuilsoft Pvt. Ltd.</p>
            </div>
            <div className="relative pl-6">
              <span className="absolute top-1.5 left-0 h-3 w-3 rounded-full bg-white/30" />
              <p className="text-[12px] text-white/40">2023 – 2024</p>
              <p className="mt-1 text-[16px] font-semibold text-white">Graphic Designing & UI/UX Intern</p>
              <p className="text-[13px] text-white/55">Pisoft Informatics Pvt. Ltd. (Mohali) · 6 months</p>
            </div>
          </div>
        </div>

        <div id="about" className="rounded-2xl border border-white/8 bg-[#0c1018] p-6 lg:p-8">
          <p className="text-[12px] font-semibold tracking-[0.2em] text-[#8b7cff]">05 — ABOUT ME</p>
          <h2 className="mt-2 text-[28px] font-bold text-white">About Me</h2>
          <div className="mt-6 flex items-start gap-4">
            <img src="/images/about-portrait.png" alt="Abhishek" className="h-20 w-20 rounded-full object-cover" />
            <div>
              <p className="text-[15px] font-semibold text-white">Abhishek Thakur</p>
              <p className="text-[13px] text-white/50">Location: Mandi, Himachal Pradesh</p>
              <p className="text-[13px] text-white/50">Experience: 1+ Years</p>
            </div>
          </div>
          <p className="mt-5 text-[14px] leading-relaxed text-white/55">
            Creative Graphic & UI Designer specializing in branding, social media design, UI mockups, video editing and short-form content. Currently working at Cuilsoft Pvt. Ltd.
          </p>
          <button onClick={downloadResume} className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-medium text-white/80 transition hover:border-white/30 hover:text-white">
            Download Resume <IconDownload size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-[#6d5ce7] to-[#8b7cff] px-8 py-10 sm:flex-row">
          <div>
            <h3 className="text-[24px] font-bold text-white sm:text-[28px]">Have a project in mind?</h3>
            <p className="mt-1 text-[15px] text-white/80">Let's create something amazing together.</p>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-[#4c3bd4] transition hover:bg-white/90">
            Let's Talk <IconArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { value: "15+", label: "Projects Completed" },
    { value: "10+", label: "Happy Clients" },
    { value: "1+", label: "Years Experience" },
    { value: "100%", label: "Client Satisfaction" },
  ];
  return (
    <section className="border-t border-white/6 py-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-5 sm:grid-cols-4 lg:px-8">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-[32px] font-bold text-white sm:text-[36px]">{s.value}</p>
            <p className="mt-1 text-[13px] text-white/45">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="border-t border-white/6 py-20">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.2em] text-[#8b7cff]">06 — CONTACT</p>
          <h2 className="mt-2 text-[32px] font-bold text-white sm:text-[40px]">Let's create<br /><span className="text-[#8b7cff]">something great.</span></h2>
          <p className="mt-4 max-w-md text-[15px] text-white/50">I'm available for freelance projects and full-time opportunities.</p>
          <div className="mt-8 space-y-4">
            <a href="mailto:iabhishekbhardwaj07@gmail.com" className="flex items-center gap-3 text-white/70 transition hover:text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"><IconMail size={16} /></span>
              iabhishekbhardwaj07@gmail.com
            </a>
            <a href="tel:+919882700510" className="flex items-center gap-3 text-white/70 transition hover:text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"><IconPhone size={16} /></span>
              +91 98827 00510
            </a>
            <div className="flex items-center gap-3 text-white/70">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"><IconPin size={16} /></span>
              Mandi, Himachal Pradesh
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#0c1018] p-6">
          {status === "sent" ? (
            <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center">
              <p className="text-lg font-semibold text-white">Message sent!</p>
              <p className="mt-2 text-[14px] text-white/50">I'll get back to you soon.</p>
              <button onClick={() => setStatus("idle")} className="mt-6 text-[13px] text-[#8b7cff] hover:text-white">Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" required className="w-full rounded-xl border border-white/10 bg-[#0a0d14] px-4 py-3 text-[14px] text-white placeholder:text-white/30 outline-none focus:border-[#8b7cff]" />
                <input name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Your Email" required className="w-full rounded-xl border border-white/10 bg-[#0a0d14] px-4 py-3 text-[14px] text-white placeholder:text-white/30 outline-none focus:border-[#8b7cff]" />
              </div>
              <textarea name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your Message" rows={4} required className="w-full resize-none rounded-xl border border-white/10 bg-[#0a0d14] px-4 py-3 text-[14px] text-white placeholder:text-white/30 outline-none focus:border-[#8b7cff]" />
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#8b7cff] py-3.5 text-[14px] font-semibold text-white transition hover:bg-[#7a6bef]">
                Send Message <IconArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/6 py-8">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-5 sm:flex-row lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8b7cff] text-xs font-bold text-white">AT</span>
          <p className="text-[12px] text-white/40">© 2025 Abhishek Thakur. All rights reserved.</p>
        </div>
        <div className="flex gap-6 text-[12px] text-white/40">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="hover:text-white">{n.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#06080f] font-sans text-white antialiased">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <FeaturedWork />
        <Skills />
        <ExperienceAbout />
        <CTA />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
