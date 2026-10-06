import type { ReactElement } from "react";

export function SidebarItem({ text, icon, active = false, onClick }: { text: string; icon: ReactElement; active?: boolean; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`sidebar-item${active ? " sidebar-item-active" : ""}`}>
      <span className="sidebar-item-icon">{icon}</span>
      <span>{text}</span>
    </button>
  );
}
