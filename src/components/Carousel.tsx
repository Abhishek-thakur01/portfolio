import { useRef, useState, useEffect, type ReactNode } from "react";
import { cn } from "../utils/cn";

type CarouselProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  /** Approximate width of each item for scroll-by-one */
  itemWidth?: number;
};

export function Carousel({ children, className, itemClassName, itemWidth = 220 }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    const ro = new ResizeObserver(updateButtons);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      ro.disconnect();
    };
  }, [children]);

  const scrollBy = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (itemWidth + 12), behavior: "smooth" });
  };

  return (
    <div className={cn("relative group/carousel", className)}>
      {/* Prev button */}
      <button
        type="button"
        aria-label="Previous"
        onClick={() => scrollBy(-1)}
        disabled={!canPrev}
        className={cn(
          "absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1/2",
          "flex h-9 w-9 items-center justify-center rounded-full",
          "bg-white/10 backdrop-blur-md border border-white/15 text-white",
          "transition-all duration-300 hover:bg-white/20",
          "opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 disabled:pointer-events-none",
          "shadow-lg shadow-black/30"
        )}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next button */}
      <button
        type="button"
        aria-label="Next"
        onClick={() => scrollBy(1)}
        disabled={!canNext}
        className={cn(
          "absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2",
          "flex h-9 w-9 items-center justify-center rounded-full",
          "bg-white/10 backdrop-blur-md border border-white/15 text-white",
          "transition-all duration-300 hover:bg-white/20",
          "opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 disabled:pointer-events-none",
          "shadow-lg shadow-black/30"
        )}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className={cn(
          "flex gap-3 overflow-x-auto scroll-smooth pb-1",
          "snap-x snap-mandatory",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <div key={i} className={cn("snap-start shrink-0", itemClassName)}>
                {child}
              </div>
            ))
          : children}
      </div>
    </div>
  );
}
