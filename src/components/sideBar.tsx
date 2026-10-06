import { Link } from "react-router-dom";
import { Logo } from "../icons/logo";
import { TwitterIcon } from "../icons/twitterIcon";
import { YoutubeIcon } from "../icons/youtubeIcon";
import { SidebarItem } from "./sideBarItem";

export type ContentFilter = "all" | "youtube" | "twitter";

export function Sidebar({ filter, onFilterChange }: { filter: ContentFilter; onFilterChange: (filter: ContentFilter) => void }) {
  return (
    <aside className="sidebar">
      <Link to="/dashboard" className="brand-lockup sidebar-brand" aria-label="Brainly dashboard">
        <span className="brand-mark"><Logo /></span>
        <span>brainly</span>
      </Link>
      <div className="sidebar-label">LIBRARY</div>
      <nav className="sidebar-nav" aria-label="Content filters">
        <SidebarItem text="All content" icon={<span className="nav-grid-icon">▦</span>} active={filter === "all"} onClick={() => onFilterChange("all")} />
        <SidebarItem text="YouTube" icon={<YoutubeIcon />} active={filter === "youtube"} onClick={() => onFilterChange("youtube")} />
        <SidebarItem text="Twitter" icon={<TwitterIcon />} active={filter === "twitter"} onClick={() => onFilterChange("twitter")} />
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-tip"><span className="tip-spark">✦</span><p>Good ideas deserve a place to live.</p></div>
        <Link to="/signin" onClick={() => localStorage.removeItem("token")} className="sidebar-signout">Sign out</Link>
      </div>
    </aside>
  );
}
