import type { ReactNode } from "react";
import type { Category } from "../data";
import { Reveal, SectionLabel, ViewLink } from "./Reveal";
import { IconPlay } from "./Icons";
import { Carousel } from "./Carousel";

function ImageCard({
  src,
  alt,
  onOpen,
  wide,
}: {
  src: string;
  alt: string;
  onOpen: (src: string) => void;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(src)}
      className={
        wide
          ? "group relative h-[240px] w-[340px] shrink-0 overflow-hidden rounded-2xl sm:h-[280px] sm:w-[400px]"
          : "group relative h-[240px] w-[200px] shrink-0 overflow-hidden rounded-2xl sm:h-[280px] sm:w-[240px]"
      }
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
    </button>
  );
}

function SectionShell({
  id,
  num,
  title,
  subtitle,
  description,
  onView,
  category,
  children,
}: {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  onView: (c: Category) => void;
  category: Category;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-b border-white/[0.06]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8 lg:py-24">
        <Reveal className="max-w-2xl">
          <SectionLabel num={num} />
          <h2 className="mt-1 text-[28px] font-semibold tracking-tight text-white sm:text-[34px] lg:text-[40px]">
            {title}
          </h2>
          <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.14em] text-white/40">
            {subtitle}
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/50">
            {description}
          </p>
          <ViewLink onClick={() => onView(category)} />
        </Reveal>

        <Reveal className="mt-10 overflow-hidden" delay={120}>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function UIUX({ onView, onOpen }: { onView: (c: Category) => void; onOpen: (src: string) => void }) {
  const slides = [
    <ImageCard key="laptop" wide src="/images/ui-laptop.png" alt="Accessories Website UI" onOpen={onOpen} />,
    <ImageCard
      key="ui1"
      src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"
      alt="UI design"
      onOpen={onOpen}
    />,
    <ImageCard
      key="ui2"
      src="https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800"
      alt="App interface"
      onOpen={onOpen}
    />,
    <ImageCard
      key="ui3"
      src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800"
      alt="Web design"
      onOpen={onOpen}
    />,
  ];

  return (
    <SectionShell
      id="uiux"
      num="01"
      title="UI/UX Design"
      subtitle="Websites  ·  Apps  ·  Product"
      description="I design intuitive and visually engaging experiences for web and mobile. From research to final UI, I focus on clarity, usability and impact."
      onView={onView}
      category="uiux"
    >
      <Carousel autoPlay={4500}>{slides}</Carousel>
    </SectionShell>
  );
}

const posters = [
  { src: "/images/poster-good-things.png", title: "Poster & Banner Design" },
  { src: "/images/poster-create.png", title: "Social Media Graphics" },
  { src: "/images/poster-dream.png", title: "Brand Campaign" },
  { src: "/images/poster-brand.png", title: "Brand Identity System" },
];

export function Graphic({ onView, onOpen }: { onView: (c: Category) => void; onOpen: (src: string) => void }) {
  const slides = posters.map((p) => (
    <button
      key={p.src}
      type="button"
      onClick={() => onOpen(p.src)}
      className="group relative h-[260px] w-[180px] shrink-0 overflow-hidden rounded-2xl sm:h-[300px] sm:w-[200px]"
    >
      <img
        src={p.src}
        alt={p.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition duration-500 group-hover:opacity-100">
        <p className="text-left text-[12px] font-medium text-white">{p.title}</p>
      </div>
    </button>
  ));

  return (
    <SectionShell
      id="graphic"
      num="02"
      title="Graphic Design"
      subtitle="Posters  ·  Brand  ·  Campaigns"
      description="I create bold and meaningful designs that communicate ideas, build brands and leave a lasting impression."
      onView={onView}
      category="graphic"
    >
      <Carousel autoPlay={4000}>{slides}</Carousel>
    </SectionShell>
  );
}

const videoThumbs = [
  {
    src: "https://images.pexels.com/photos/2315049/pexels-photo-2315049.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Golden hour",
  },
  {
    src: "https://images.pexels.com/photos/2446711/pexels-photo-2446711.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "On location",
  },
  {
    src: "https://images.pexels.com/photos/8102677/pexels-photo-8102677.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Edit bay",
  },
];

export function Video({
  onView,
  onPlay,
  onOpen,
}: {
  onView: (c: Category) => void;
  onPlay: () => void;
  onOpen: (src: string) => void;
}) {
  const slides = [
    <button
      key="camera"
      type="button"
      onClick={onPlay}
      className="group relative h-[240px] w-[340px] shrink-0 overflow-hidden rounded-2xl sm:h-[280px] sm:w-[420px]"
    >
      <img
        src="/images/video-camera.png"
        alt="Cinema camera"
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-black/25" />
      <span className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#0b0d14] shadow-xl transition group-hover:scale-110">
        <span className="pulse-ring absolute inset-0 rounded-full bg-white/40" />
        <IconPlay size={22} />
      </span>
    </button>,
    ...videoThumbs.map((t) => (
      <ImageCard key={t.src} src={t.src} alt={t.title} onOpen={onOpen} />
    )),
  ];

  return (
    <SectionShell
      id="video"
      num="03"
      title="Video"
      subtitle="Reels  ·  Shooting  ·  Editing"
      description="I produce and edit engaging videos that tell stories, grab attention and bring ideas to life."
      onView={onView}
      category="video"
    >
      <Carousel autoPlay={5000}>{slides}</Carousel>
    </SectionShell>
  );
}

export function Content({ onView, onOpen }: { onView: (c: Category) => void; onOpen: (src: string) => void }) {
  const slides = [
    <ImageCard
      key="c1"
      src="https://images.pexels.com/photos/1229862/pexels-photo-1229862.jpeg?auto=compress&cs=tinysrgb&w=800"
      alt="Workspace"
      onOpen={onOpen}
    />,
    <ImageCard
      key="c2"
      src="https://images.pexels.com/photos/35711550/pexels-photo-35711550.jpeg?auto=compress&cs=tinysrgb&w=800"
      alt="Creative moment"
      onOpen={onOpen}
    />,
    <ImageCard
      key="c3"
      src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
      alt="Collaboration"
      onOpen={onOpen}
    />,
    <ImageCard
      key="c4"
      src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
      alt="Content creation"
      onOpen={onOpen}
    />,
  ];

  return (
    <SectionShell
      id="content"
      num="04"
      title="Content Creation"
      subtitle="Concepts  ·  Campaigns  ·  Direction"
      description="I create content that informs, inspires and connects — from concepts to campaigns and creative direction."
      onView={onView}
      category="content"
    >
      <Carousel autoPlay={4200}>{slides}</Carousel>
    </SectionShell>
  );
}
