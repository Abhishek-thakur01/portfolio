import type { Category } from "../data";
import { DashboardMockup, IdeasCard, PhoneMockup, SocialMockup, WebsiteMockup } from "./Mockups";
import { Reveal, SectionLabel, ViewLink } from "./Reveal";
import { IconPlay } from "./Icons";

export function UIUX({ onView, onOpen }: { onView: (c: Category) => void; onOpen: (src: string) => void }) {
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

        <div className="grid grid-cols-2 gap-3 md:grid-cols-12 lg:col-span-8">
          <button
            onClick={() => onOpen("/images/ui-laptop.png")}
            className="col-span-2 h-[210px] overflow-hidden rounded-2xl md:col-span-5 md:h-[250px]"
          >
            <img
              src="/images/ui-laptop.png"
              alt="Product dashboard on laptop"
              className="h-full w-full object-cover transition duration-500 hover:scale-[1.04]"
            />
          </button>
          <div className="h-[210px] md:col-span-2 md:h-[250px]">
            <PhoneMockup />
          </div>
          <div className="h-[210px] md:col-span-2 md:h-[250px]">
            <DashboardMockup />
          </div>
          <div className="col-span-2 h-[210px] md:col-span-3 md:h-[250px]">
            <WebsiteMockup />
          </div>
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
  return (
    <section id="graphic" className="border-b border-white/6">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-7">
          {posters.map((p) => (
            <button
              key={p.src}
              onClick={() => onOpen(p.src)}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl sm:aspect-auto sm:h-[230px]"
            >
              <img src={p.src} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-[11px] text-white opacity-0 transition group-hover:opacity-100">
                {p.title}
              </span>
            </button>
          ))}
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

        <div className="grid grid-cols-12 gap-3 lg:col-span-8">
          <button
            onClick={onPlay}
            className="group relative col-span-12 h-[220px] overflow-hidden rounded-2xl sm:col-span-7 sm:h-[280px]"
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
          </button>
          <div className="col-span-12 grid grid-cols-2 gap-3 sm:col-span-5 sm:grid-rows-2 sm:h-[280px]">
            <button
              onClick={() => onOpen(videoThumbs[0].src)}
              className="col-span-2 h-[120px] overflow-hidden rounded-2xl sm:h-auto"
            >
              <img src={videoThumbs[0].src} alt={videoThumbs[0].title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
            </button>
            <button onClick={() => onOpen(videoThumbs[1].src)} className="h-[110px] overflow-hidden rounded-2xl sm:h-auto">
              <img src={videoThumbs[1].src} alt={videoThumbs[1].title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
            </button>
            <button onClick={() => onOpen(videoThumbs[2].src)} className="h-[110px] overflow-hidden rounded-2xl sm:h-auto">
              <img src={videoThumbs[2].src} alt={videoThumbs[2].title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Content({ onView, onOpen }: { onView: (c: Category) => void; onOpen: (src: string) => void }) {
  return (
    <section id="content" className="border-b border-white/6">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-7">
          <div className="h-[210px] sm:h-[230px]">
            <IdeasCard />
          </div>
          <div className="h-[210px] sm:h-[230px]">
            <SocialMockup />
          </div>
          <button
            onClick={() =>
              onOpen("https://images.pexels.com/photos/1229862/pexels-photo-1229862.jpeg?auto=compress&cs=tinysrgb&w=1200")
            }
            className="h-[210px] overflow-hidden rounded-2xl sm:h-[230px]"
          >
            <img
              src="https://images.pexels.com/photos/1229862/pexels-photo-1229862.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Laptop and coffee"
              className="h-full w-full object-cover transition duration-500 hover:scale-[1.05]"
            />
          </button>
          <button
            onClick={() =>
              onOpen("https://images.pexels.com/photos/35711550/pexels-photo-35711550.jpeg?auto=compress&cs=tinysrgb&w=1200")
            }
            className="h-[210px] overflow-hidden rounded-2xl sm:h-[230px]"
          >
            <img
              src="https://images.pexels.com/photos/35711550/pexels-photo-35711550.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Looking at the mountains"
              className="h-full w-full object-cover transition duration-500 hover:scale-[1.05]"
            />
          </button>
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
