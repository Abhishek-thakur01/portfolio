export function ToolIcon({ id }: { id: string }) {
  switch (id) {
    case "figma":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M8.5 3.5H12V8H8.5C6.57 8 5 6.43 5 4.5C5 3.67 6.57 3.5 8.5 3.5Z" fill="#F24E1E" />
          <path d="M12 3.5H15.5C17.43 3.5 19 4.57 19 6.5C19 8.43 17.43 8 15.5 8H12V3.5Z" fill="#FF7262" />
          <path d="M5 12C5 10.07 6.57 8.5 8.5 8.5H12V15.5H8.5C6.57 15.5 5 13.93 5 12Z" fill="#A259FF" />
          <path d="M12 8.5H15.5C17.43 8.5 19 10.07 19 12C19 13.93 17.43 15.5 15.5 15.5H12V8.5Z" fill="#1ABCFE" />
          <circle cx="12" cy="19" r="3.5" fill="#0ACF83" />
        </svg>
      );
    case "ps":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#001E36]">
          <span className="text-[11px] font-bold text-[#31A8FF]">Ps</span>
        </div>
      );
    case "ai":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#330000]">
          <span className="text-[11px] font-bold text-[#FF9A00]">Ai</span>
        </div>
      );
    case "pr":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2A1035]">
          <span className="text-[11px] font-bold text-[#EA77FF]">Pr</span>
        </div>
      );
    case "ae":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00005B]">
          <span className="text-[11px] font-bold text-[#9999FF]">Ae</span>
        </div>
      );
    case "vscode":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M17.5 4.2L21 5.5V18.5L17.5 19.8L9 13.5L5.8 16L3 14.7V9.3L5.8 8L9 10.5L17.5 4.2Z" fill="#007ACC" />
          <path d="M17.5 4.2V19.8L9 13.5L17.5 4.2Z" fill="#1F9CF0" />
        </svg>
      );
    case "canva":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00C4CC]">
          <span className="text-[10px] font-bold text-white">Ca</span>
        </div>
      );
    case "capcut":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.6" />
          <path d="M9 8.5L15.5 12L9 15.5V8.5Z" fill="white" />
        </svg>
      );
    case "notion":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M5 4.5H16.5L19.5 7.5V19.5H7.2L5 17.5V4.5Z" fill="none" stroke="white" strokeWidth="1.6" />
          <path d="M9 8V16M9 8H13.5C14.6 8 15.2 8.7 15.2 9.8C15.2 10.9 14.6 11.6 13.5 11.6H9" stroke="white" strokeWidth="1.6" />
        </svg>
      );
    case "framer":
      return (
        <svg width="16" height="18" viewBox="0 0 14 20" fill="white">
          <path d="M0 0H14V6.5H7L0 0ZM0 6.5H7L14 13H7V6.5H0ZM7 13V20L0 13H7Z" />
        </svg>
      );
    default:
      return null;
  }
}
