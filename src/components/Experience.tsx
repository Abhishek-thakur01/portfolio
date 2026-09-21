import { TIMELINE } from "../data";
import { Reveal, SectionLabel, ViewLink } from "./Reveal";

export function Experience({ onOpenTimeline, onOpen }: { onOpenTimeline: () => void; onOpen: (src: string) => void }) {
  return (
    <section id="experience" className="border-b border-white/6">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
        <Reveal className="lg:col-span-3">
          <SectionLabel num="07" />
          <h2 className="text-[28px] font-semibold tracking-tight text-white uppercase lg:text-[32px]">Experience</h2>
          <p className="mt-2 text-[14px] text-white/45">Internship / Current Role</p>
          <p className="mt-4 text-[13.5px] leading-relaxed text-white/45">
            Currently working as a Graphic Designer, Social Media Content Creator and UI/UX Designer. Previously completed a 6-month internship focused on graphic design and UI/UX.
          </p>
          <ViewLink onClick={onOpenTimeline}>View Timeline</ViewLink>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-3">
          <div className="relative pl-5">
            <span className="absolute top-1 bottom-1 left-[7px] w-px bg-white/10" />
            <div className="space-y-8">
              {TIMELINE.map((t, i) => (
                <div key={t.years} className="relative">
                  <span
                    className={`absolute top-1.5 -left-[17px] h-[9px] w-[9px] rounded-full ${
                      i === 0 ? "bg-[#8b7cff] ring-4 ring-[#8b7cff]/20" : "bg-white/30"
                    }`}
                  />
                  <p className="text-[11px] tracking-wide text-white/40">{t.years}</p>
                  <p className="mt-1 text-[14px] font-semibold text-white">{t.role}</p>
                  <p className="text-[13px] text-white/55">{t.place}</p>
                  <p className="text-[12px] text-white/35">{t.tags}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} className="lg:col-span-6">
          <button
            onClick={() => onOpen("/images/workspace.png")}
            className="block h-[260px] w-full overflow-hidden rounded-2xl lg:h-[300px]"
          >
            <img
              src="/images/workspace.png"
              alt="Workspace"
              className="h-full w-full object-cover transition duration-700 hover:scale-[1.04]"
            />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
