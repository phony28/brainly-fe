import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/createContentModal";
import { Sidebar, type ContentFilter } from "../components/sideBar";
import { PlusIcon } from "../icons/plusIcon";
import { ShareIcon } from "../icons/shareIcon";
import { useContent } from "../hooks/custom";
import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<ContentFilter>("all");
  const [loadError, setLoadError] = useState(false);
  const { contents, refresh } = useContent();

  const loadContent = useCallback(async () => {
    try {
      await refresh();
      setLoadError(false);
    } catch {
      setLoadError(true);
    }
  }, [refresh]);

  useEffect(() => {
    void loadContent();
  }, [loadContent, modalOpen]);

  const visibleContents = filter === "all" ? contents : contents.filter((content) => content.type === filter);

  async function shareBrain() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, { share: true }, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
      await navigator.clipboard.writeText(shareUrl);
      window.alert(`Share link copied to clipboard:\n${shareUrl}`);
    } catch {
      window.alert("We couldn’t create a share link. Please try again.");
    }
  }

  return (
    <div className="dashboard-shell">
      <Sidebar filter={filter} onFilterChange={setFilter} />
      <main className="dashboard-main">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">YOUR PERSONAL LIBRARY</p>
            <h1>Your brain</h1>
            <p className="dashboard-subtitle">A home for the things you want to remember.</p>
          </div>
          <div className="dashboard-actions">
            <Button onClick={shareBrain} variant="secondary" text="Share brain" startIcon={<ShareIcon />} />
            <Button onClick={() => setModalOpen(true)} variant="primary" text="Add content" startIcon={<PlusIcon />} />
          </div>
        </header>
        <div className="library-toolbar">
          <div>
            <h2>Your collection</h2>
            <span>{visibleContents.length} {visibleContents.length === 1 ? "item" : "items"}</span>
          </div>
          <span className="collection-label"><span className="collection-dot" /> ALL CONTENT</span>
        </div>
        {loadError ? (
          <div className="empty-state">
            <div className="empty-icon">↻</div>
            <h3>We couldn’t load your collection</h3>
            <p>Check your connection and try again.</p>
            <button className="text-action" onClick={() => void loadContent()}>Try again</button>
          </div>
        ) : visibleContents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><PlusIcon /></div>
            <h3>{contents.length === 0 ? "Your library starts here" : `No ${filter === "youtube" ? "YouTube" : "Twitter"} items yet`}</h3>
            <p>{contents.length === 0 ? "Save a video or a post you want to revisit later." : "Try another filter or add something new to your library."}</p>
            <Button onClick={() => setModalOpen(true)} variant="primary" text="Add content" startIcon={<PlusIcon />} />
          </div>
        ) : (
          <section className="content-grid" aria-label="Saved content">
            {visibleContents.map(({ type, link, title }, index) => (
              <Card key={`${link}-${index}`} type={type} link={link} title={title} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
