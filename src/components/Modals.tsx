import { useEffect, type ReactNode } from "react";
import { CATEGORY_META, PROJECTS, TIMELINE, type Category } from "../data";
import { IconClose } from "./Icons";

export function ProjectModal({
  category,
  onClose,
  onOpen,
}: {
  category: Category;
  onClose: () => void;
  onOpen: (src: string) => void;
}) {
  useLock(true);
  const items = PROJECTS.filter((p) => p.category === category);
  const meta = CATEGORY_META[category];

  return (
    <Overlay onClose={onClose}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-white/40 uppercase">Selected work</p>
          <h3 className="mt-1 text-2xl font-semibold">{meta.title}</h3>
          <p className="mt-1 text-[13px] text-white/45">{meta.blurb}</p>
        </div>
        <Close onClick={onClose} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((p) => (
          <button
            key={p.id}
            onClick={() => onOpen(p.image)}
            className="group overflow-hidden rounded-2xl bg-[#0c1018] text-left ring-1 ring-white/8"
          >
            <div className="h-44 overflow-hidden">
              <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
                    {t}
                  </span>
                ))}
              </div>
              <h4 className="font-semibold">{p.title}</h4>
              <p className="mt-1 text-[12.5px] leading-relaxed text-white/45">{p.description}</p>
            </div>
          </button>
        ))}
      </div>
    </Overlay>
  );
}

export function TimelineModal({ onClose }: { onClose: () => void }) {
  useLock(true);
  return (
    <Overlay onClose={onClose}>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-white/40 uppercase">Career</p>
          <h3 className="mt-1 text-2xl font-semibold">Experience timeline</h3>
        </div>
        <Close onClick={onClose} />
      </div>
      <div className="relative space-y-6 pl-6">
        <span className="absolute top-2 bottom-2 left-[7px] w-px bg-white/10" />
        {TIMELINE.map((t, i) => (
          <div key={t.years} className="relative rounded-2xl bg-[#0c1018] p-5 ring-1 ring-white/8">
            <span
              className={`absolute top-6 -left-[21px] h-2.5 w-2.5 rounded-full ${
                i === TIMELINE.length - 1 ? "bg-[#8b7cff]" : "bg-white/30"
              }`}
            />
            <p className="text-[12px] text-white/40">{t.years}</p>
            <h4 className="mt-1 text-lg font-semibold">{t.role}</h4>
            <p className="text-sm text-white/60">{t.place}</p>
            <p className="mt-2 text-[13px] text-white/40">{t.tags}</p>
            <p className="mt-3 text-[13px] leading-relaxed text-white/50">
              {i === 0 &&
                "Built brand systems, social campaigns and marketing websites for early-stage and mid-size clients."}
              {i === 1 &&
                "Shipped production React + Tailwind interfaces, design systems and high-converting landing pages."}
              {i === 2 &&
                "Leading end-to-end creative — product UI, motion, video and content strategy for selected partners."}
            </p>
          </div>
        ))}
      </div>
    </Overlay>
  );
}

export function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useLock(true);
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
        aria-label="Close"
      >
        <IconClose />
      </button>
      <img src={src} alt="Preview" className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-2xl" />
    </div>
  );
}

export function VideoModal({ onClose }: { onClose: () => void }) {
  useLock(true);
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white"
          aria-label="Close"
        >
          <IconClose />
        </button>
        <video
          src="https://videos.pexels.com/video-files/37903859/16082177_4096_2160_30fps.mp4"
          poster="/images/video-camera.png"
          controls
          autoPlay
          className="aspect-video w-full bg-black"
        />
      </div>
    </div>
  );
}

function Overlay({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/70 p-4 pt-16 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative mb-10 w-full max-w-3xl rounded-3xl border border-white/8 bg-[#080b12] p-5 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function Close({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white"
      aria-label="Close"
    >
      <IconClose size={16} />
    </button>
  );
}

function useLock(lock: boolean) {
  useEffect(() => {
    if (!lock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") document.body.style.overflow = prev;
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lock]);
}
