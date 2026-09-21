import { TOOLS } from "../data";
import { Reveal, SectionLabel, ViewLink } from "./Reveal";
import { ToolIcon } from "./ToolIcons";

export function AboutSkills() {
  return (
    <section id="about" className="border-b border-white/6">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
        <Reveal className="lg:col-span-3">
          <SectionLabel num="05" />
          <h2 className="text-[28px] font-semibold tracking-tight text-white uppercase lg:text-[32px]">About Me</h2>
          <p className="mt-2 text-[14px] text-white/45">Your story + approach</p>
          <p className="mt-4 text-[13.5px] leading-relaxed text-white/45">
            I'm Abhishek, a creative problem-solver with a passion for design, technology and storytelling. I love
            turning ideas into meaningful digital experiences and visual content.
          </p>
          <ViewLink
            onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
          >
            Learn More
          </ViewLink>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-5">
          <div className="relative grid h-full min-h-[280px] overflow-hidden rounded-2xl bg-[#0c1018] ring-1 ring-white/8 sm:grid-cols-2">
            <img src="/images/about-portrait.png" alt="Abhishek sitting" className="h-full min-h-[280px] w-full object-cover object-top" />
            <div className="relative hidden items-center justify-center p-6 sm:flex">
              <p className="font-hand rotate-[-8deg] text-[34px] leading-[1.1] font-semibold text-white/85">
                Good
                <br />
                Design
                <br />
                Better
                <br />
                Tomorrow
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} className="lg:col-span-4" >
          <div id="skills">
            <SectionLabel num="06" extra="Skills & Tools" />
            <p className="text-[15px] text-white/70">Figma / Adobe / Premiere / etc.</p>
            <p className="mt-4 text-[13.5px] leading-relaxed text-white/45">
              I work with modern tools and technologies to bring ideas to life — from design and development to editing
              and content creation.
            </p>
            <div className="mt-6 grid grid-cols-5 gap-2.5">
              {TOOLS.map((t) => (
                <div key={t.id} className="group relative">
                  <div className="flex h-[52px] w-full items-center justify-center rounded-xl bg-[#121826] ring-1 ring-white/8 transition group-hover:-translate-y-0.5 group-hover:ring-white/20">
                    <ToolIcon id={t.id} />
                  </div>
                  <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 rounded-md bg-white px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-[#0b0d14] opacity-0 shadow transition group-hover:opacity-100">
                    {t.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
