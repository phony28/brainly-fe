import { useRef, useState } from "react";
import axios from "axios";
import { Button } from "./button";
import { Input } from "./input";

type ContentType = "youtube" | "twitter";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>("youtube");

  async function addContent() {
    const title = titleRef.current?.value.trim();
    const link = linkRef.current?.value.trim();
    if (!title || !link) return;
    await axios.post(`${BACKEND_URL}/api/v1/content`, { link, title, type }, {
      headers: { Authorization: localStorage.getItem("token") || "" },
    });
    if (titleRef.current) titleRef.current.value = "";
    if (linkRef.current) linkRef.current.value = "";
    onClose();
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="content-modal" role="dialog" aria-modal="true" aria-labelledby="add-content-title">
        <header className="modal-header">
          <div><p className="eyebrow">GROW YOUR LIBRARY</p><h2 id="add-content-title">Add something good</h2></div>
          <button type="button" onClick={onClose} aria-label="Close modal" className="modal-close">×</button>
        </header>
        <div className="modal-fields">
          <Input reference={titleRef} placeholder="e.g. A talk worth saving" label="Title" />
          <Input reference={linkRef} placeholder="Paste a YouTube or Twitter link" label="Link" type="url" />
        </div>
        <div className="modal-type">
          <span>Content type</span>
          <div className="modal-type-options">
            <Button text="YouTube" variant={type === "youtube" ? "primary" : "secondary"} onClick={() => setType("youtube")} />
            <Button text="Twitter" variant={type === "twitter" ? "primary" : "secondary"} onClick={() => setType("twitter")} />
          </div>
        </div>
        <Button onClick={addContent} variant="primary" text="Save to library" fullWidth />
      </section>
    </div>
  );
}
