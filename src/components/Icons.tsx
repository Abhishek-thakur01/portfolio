import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(p: IconProps) {
  const { size = 18, className, ...rest } = p;
  return { width: size, height: size, className, rest };
}

export function IconInstagram(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconLinkedin(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10.5V16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8" cy="8" r="0.9" fill="currentColor" />
      <path d="M12 16.5V13.2C12 12.2 12.8 11.5 13.7 11.5C14.6 11.5 15.2 12.2 15.2 13.2V16.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 12.2V10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconX(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <path d="M5 5L19 19M10.5 5L19 5M5 19L13.5 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconYoutube(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <rect x="3" y="7" width="18" height="10.5" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 10.2L15 12.25L11 14.3V10.2Z" fill="currentColor" />
    </svg>
  );
}

export function IconArrowRight(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconDownload(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <path d="M12 4V15M12 15L8 11M12 15L16 11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19H19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconPlay(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
      <path d="M8.5 6.8V17.2L17.5 12L8.5 6.8Z" />
    </svg>
  );
}

export function IconMail(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 8L12 13L20 8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPhone(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <path
        d="M7.2 3.8H9.6L10.6 6.6L8.7 8C9.5 9.6 10.7 11 12.2 12.1L13.8 10.4L16.6 11.3V13.8C16.6 14.4 16.1 14.9 15.5 15C10.2 16 6.5 12.2 6 7.2C5.9 6.6 6.4 6.1 7 6.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPin(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <path d="M12 21S6.5 14.8 6.5 10.5C6.5 7.5 8.9 5 12 5C15.1 5 17.5 7.5 17.5 10.5C17.5 14.8 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="10.5" r="1.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconMenu(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconUp(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <path d="M12 19V6M12 6L6.5 11.5M12 6L17.5 11.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck(p: IconProps) {
  const { width, height, className, rest } = base(p);
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" className={className} {...rest}>
      <path d="M5 13L9.5 17.5L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
