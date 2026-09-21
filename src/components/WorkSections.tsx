import type { Category } from "../data";
import { DashboardMockup, IdeasCard, PhoneMockup, SocialMockup, WebsiteMockup } from "./Mockups";
import { Reveal, SectionLabel, ViewLink } from "./Reveal";
import { IconPlay } from "./Icons";
import { Carousel } from "./Carousel";

export function UIUX({ onView, onOpen }: { onView: (c: Category) => void; onOpen: (src: string) => void }) {
  const slides = [
    <button
      key="laptop"
      onClick={() => onOpen("/images/ui-laptop.png")}
      className="h-[210px] w-[280px] overflow-hidden rounded-2xl md:h-[250px] md:w-[320px]"
    >
      <img
        src="/images/ui-laptop.png"
        alt="Product dashboard on laptop"
        className="h-full w-full object-cover transition duration-500 hover:scale-[1.04]"
      />
    </button>,
    <div key="phone" className="h-[210px] w-[140px] md:h-[250px] md:w-[150px]">
      <PhoneMockup />
    </div>,
    <div key="dashboard" className="h-[210px] w-[140px] md:h-[250px] md:w-[150px]">
      <DashboardMockup />
    </div>,
    <div key="website" className="h-[210px] w-[200px] md:h-[250px] md:w-[220px]">
      <WebsiteMockup />
    </div>,
  ];

  return (
    <section id="uiux" className="border-b border-white/6">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
        <Reveal className="lg:col-span-4">
          <SectionLabel num="01" />
          <h2 className="text-[28px] font-semibold tracking-tight text-white lg:text-[32px]">UI/UX Design</h2>
          <p className="mt-2 text-[14px] text-white/45">Websites / Apps / UX</p>
          <p className="mt-4 max-w-[360px] text-[13.5px] leading-relaxed text-white/45">
            I design intuitive and visually engaging experiences for web and mobile. From user research to final UI, I
            focus on simplicity, usability and impact.
          </p>
          <ViewLink onClick={() => onView("uiux")} />
        </Reveal>

        <div className="lg:col-span-8 overflow-hidden">
          <Carousel autoPlay={4500}>{slides}</Carousel>
        </div>
      </div>
    </section>
  );
}

const posters = [
  { src: "/images/poster-good-things.png", title: "Good Things Take Time" },
  { src: "/images/poster-create.png", title: "Create Something Bigger" },
  { src: "/images/poster-dream.png", title: "Dream Plan Do" },
  { src: "/images/poster-brand.png", title: "AT Brand System" },
];

export function Graphic({ onView, onOpen }: { onView: (c: Category) => void; onOpen: (src: string) => void }) {
  const slides = posters.map((p) => (
    <button
      key={p.src}
      onClick={() => onOpen(p.src)}
      className="group relative h-[210px] w-[150px] overflow-hidden rounded-2xl sm:h-[230px] sm:w-[160px]"
    >
      <img
        src={p.src}
        alt={p.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
      />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-[11px] text-white opacity-0 transition group-hover:opacity-100">
        {p.title}
      </span>
    </button>
  ));

  return (
    <section id="graphic" className="border-b border-white/6">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="lg:col-span-7 overflow-hidden">
          <Carousel autoPlay={4000}>{slides}</Carousel>
        </div>

        <Reveal className="lg:col-span-5 lg:pl-8">
          <SectionLabel num="02" />
          <h2 className="text-[28px] font-semibold tracking-tight text-white uppercase lg:text-[32px]">Graphic Design</h2>
          <p className="mt-2 text-[14px] text-white/45">Posters / Social / Campaigns</p>
          <p className="mt-4 max-w-[380px] text-[13.5px] leading-relaxed text-white/45">
            I create bold and meaningful designs that communicate ideas, build brands and leave a lasting impression.
          </p>
          <ViewLink onClick={() => onView("graphic")} />
        </Reveal>
      </div>
    </section>
  );
}

const videoThumbs = [
  {
    src: "https://images.pexels.com/photos/2315049/pexels-photo-2315049.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "Golden hour shoot",
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
      onClick={onPlay}
      className="group relative h-[220px] w-[320px] overflow-hidden rounded-2xl sm:h-[280px] sm:w-[380px]"
    >
      <img
        src="/images/video-camera.png"
        alt="Cinema camera"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-black/20" />
      <span className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#0b0d14] shadow-xl">
        <span className="pulse-ring absolute inset-0 rounded-full bg-white/40" />
        <IconPlay size={22} />
      </span>
    </button>,
    ...videoThumbs.map((t) => (
      <button
        key={t.src}
        onClick={() => onOpen(t.src)}
        className="h-[220px] w-[180px] overflow-hidden rounded-2xl sm:h-[280px] sm:w-[200px]"
      >
        <img
          src={t.src}
          alt={t.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </button>
    )),
  ];

  return (
    <section id="video" className="border-b border-white/6">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
        <Reveal className="lg:col-span-4">
          <SectionLabel num="03" />
          <h2 className="text-[28px] font-semibold tracking-tight text-white uppercase lg:text-[32px]">Video</h2>
          <p className="mt-2 text-[14px] text-white/45">Reels / Shooting / Editing</p>
          <p className="mt-4 max-w-[360px] text-[13.5px] leading-relaxed text-white/45">
            I produce and edit engaging videos that tell stories, grab attention and bring ideas to life.
          </p>
          <ViewLink onClick={() => onView("video")} />
        </Reveal>

        <div className="lg:col-span-8 overflow-hidden">
          <Carousel autoPlay={5000}>{slides}</Carousel>
        </div>
      </div>
    </section>
  );
}

export function Content({ onView, onOpen }: { onView: (c: Category) => void; onOpen: (src: string) => void }) {
  const slides = [
    <div key="ideas" className="h-[210px] w-[160px] sm:h-[230px] sm:w-[170px]">
      <IdeasCard />
    </div>,
    <div key="social" className="h-[210px] w-[160px] sm:h-[230px] sm:w-[170px]">
      <SocialMockup />
    </div>,
    <button
      key="laptop"
      onClick={() =>
        onOpen("https://images.pexels.com/photos/1229862/pexels-photo-1229862.jpeg?auto=compress&cs=tinysrgb&w=1200")
      }
      className="h-[210px] w-[160px] overflow-hidden rounded-2xl sm:h-[230px] sm:w-[170px]"
    >
      <img
        src="https://images.pexels.com/photos/1229862/pexels-photo-1229862.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt="Laptop and coffee"
        className="h-full w-full object-cover transition duration-500 hover:scale-[1.05]"
      />
    </button>,
    <button
      key="mountain"
      onClick={() =>
        onOpen("https://images.pexels.com/photos/35711550/pexels-photo-35711550.jpeg?auto=compress&cs=tinysrgb&w=1200")
      }
      className="h-[210px] w-[160px] overflow-hidden rounded-2xl sm:h-[230px] sm:w-[170px]"
    >
      <img
        src="https://images.pexels.com/photos/35711550/pexels-photo-35711550.jpeg?auto=compress&cs=tinysrgb&w=800"
        alt="Looking at the mountains"
        className="h-full w-full object-cover transition duration-500 hover:scale-[1.05]"
      />
    </button>,
  ];

  return (
    <section id="content" className="border-b border-white/6">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="lg:col-span-7 overflow-hidden">
          <Carousel autoPlay={4200}>{slides}</Carousel>
        </div>

        <Reveal className="lg:col-span-5 lg:pl-8">
          <SectionLabel num="04" />
          <h2 className="text-[28px] font-semibold tracking-tight text-white uppercase lg:text-[32px]">Content Creation</h2>
          <p className="mt-2 text-[14px] text-white/45">Concepts / Campaigns / Creative Direction</p>
          <p className="mt-4 max-w-[380px] text-[13.5px] leading-relaxed text-white/45">
            I create content that informs, inspires and connects — from concepts to campaigns and creative direction.
          </p>
          <ViewLink onClick={() => onView("content")} />
        </Reveal>
      </div>
    </section>
  );
}
