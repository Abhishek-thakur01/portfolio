import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionLabel({
  num,
  extra,
}: {
  num: string;
  extra?: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="text-[11px] font-medium tracking-[0.18em] text-white/40">{num}</span>
      <span className="h-px w-7 bg-white/20" />
      {extra ? (
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">{extra}</span>
      ) : null}
    </div>
  );
}

export function ViewLink({
  children = "View Projects",
  onClick,
}: {
  children?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-[#8ea0ff] transition-colors hover:text-white"
    >
      {children}
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </button>
  );
}
