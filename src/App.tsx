import { useEffect, useState } from "react";
import { AboutSkills } from "./components/AboutSkills";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Lightbox, ProjectModal, TimelineModal, VideoModal } from "./components/Modals";
import { Navbar } from "./components/Navbar";
import { Content, Graphic, UIUX, Video } from "./components/WorkSections";
import type { Category } from "./data";

export default function App() {
  const [category, setCategory] = useState<Category | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [video, setVideo] = useState(false);
  const [timeline, setTimeline] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCategory(null);
        setLightbox(null);
        setVideo(false);
        setTimeline(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-[#06080f] font-sans text-white antialiased">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <UIUX onView={setCategory} onOpen={setLightbox} />
        <Graphic onView={setCategory} onOpen={setLightbox} />
        <Video onView={setCategory} onPlay={() => setVideo(true)} onOpen={setLightbox} />
        <Content onView={setCategory} onOpen={setLightbox} />
        <AboutSkills />
        <Experience onOpenTimeline={() => setTimeline(true)} onOpen={setLightbox} />
        <Contact />
      </main>
      <Footer />

      {category && (
        <ProjectModal
          category={category}
          onClose={() => setCategory(null)}
          onOpen={setLightbox}
        />
      )}
      {timeline && <TimelineModal onClose={() => setTimeline(false)} />}
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
      {video && <VideoModal onClose={() => setVideo(false)} />}
    </div>
  );
}
