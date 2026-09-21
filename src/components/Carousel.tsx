import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { cn } from "../utils/cn";

type CarouselProps = {
  children: ReactNode[];
  className?: string;
  /** Gap between items in px */
  gap?: number;
  /** Auto-play interval in ms (0 = off) */
  autoPlay?: number;
};

export function Carousel({ children, className, gap = 12, autoPlay = 0 }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const count = children.length;

  // Triple the items for seamless infinite loop
  const items = [...children, ...children, ...children];

  const scrollToIndex = useCallback(
    (i: number, smooth = true) => {
      const el = trackRef.current;
      if (!el || count === 0) return;
      const normalized = ((i % count) + count) % count;
      const child = el.children[normalized + count] as HTMLElement | undefined;
      if (!child) return;
      const left = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;
      el.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
      setIndex(normalized);
    },
    [count]
  );

  // Jump to middle set on mount
  useEffect(() => {
    const el = trackRef.current;
    if (!el || count === 0) return;
    const child = el.children[count] as HTMLElement;
    if (child) {
      el.scrollLeft = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;
    }
  }, [count]);

  // Infinite loop logic
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const kids = Array.from(el.children) as HTMLElement[];
        if (kids.length < count * 2) {
          ticking = false;
          return;
        }

        const midStart = kids[count].offsetLeft;
        const midEnd = kids[count * 2 - 1].offsetLeft + kids[count * 2 - 1].offsetWidth;
        const center = el.scrollLeft + el.clientWidth / 2;

        if (center < midStart - 40) {
          const target = kids[count + (count - 1)];
          el.scrollLeft = target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2;
        } else if (center > midEnd + 40) {
          const target = kids[count];
          el.scrollLeft = target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2;
        }

        let closest = 0;
        let minDist = Infinity;
        for (let i = 0; i < count; i++) {
          const c = kids[count + i];
          const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        }
        setIndex(closest);
        ticking = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isHovered || count <= 1) return;
    const id = setInterval(() => scrollToIndex(index + 1), autoPlay);
    return () => clearInterval(id);
  }, [autoPlay, isHovered, index, count, scrollToIndex]);

  const go = (dir: -1 | 1) => scrollToIndex(index + dir);

  return (
    <div
      className={cn("relative group/carousel", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={trackRef}
        className={cn(
          "flex overflow-x-auto scroll-smooth",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        )}
        style={{ gap: `${gap}px` }}
      >
        {items.map((child, i) => (
          <div key={i} className="snap-center shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Soft edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-12 bg-gradient-to-r from-[#06080f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-12 bg-gradient-to-l from-[#06080f] to-transparent" />

      {/* Prev button */}
      <button
        type="button"
        aria-label="Previous"
        onClick={() => go(-1)}
        className={cn(
          "absolute left-3 top-1/2 z-10 -translate-y-1/2",
          "flex h-10 w-10 items-center justify-center rounded-full",
          "bg-white/10 backdrop-blur-md border border-white/20 text-white",
          "transition-all duration-300 hover:bg-white/25 hover:scale-105",
          "opacity-0 group-hover/carousel:opacity-100 shadow-xl shadow-black/40"
        )}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next button */}
      <button
        type="button"
        aria-label="Next"
        onClick={() => go(1)}
        className={cn(
          "absolute right-3 top-1/2 z-10 -translate-y-1/2",
          "flex h-10 w-10 items-center justify-center rounded-full",
          "bg-white/10 backdrop-blur-md border border-white/20 text-white",
          "transition-all duration-300 hover:bg-white/25 hover:scale-105",
          "opacity-0 group-hover/carousel:opacity-100 shadow-xl shadow-black/40"
        )}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dots indicator */}
      {count > 1 && (
        <div className="mt-5 flex justify-center gap-1.5">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-5 bg-white/85" : "w-1.5 bg-white/25 hover:bg-white/45"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
