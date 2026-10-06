import { useRef, useState } from "react";
import { api, getApiErrorMessage } from "../api";
import { Button } from "./button";
import { Input } from "./input";

type ContentType = "youtube" | "twitter";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>("youtube");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function addContent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = titleRef.current?.value.trim();
    const link = linkRef.current?.value.trim();
    setError("");
    setSaving(true);
    try {
      await api.post("/content", { link, title, type });
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      onClose();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Couldn’t save this item. Please try again."));
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <form className="content-modal" role="dialog" aria-modal="true" aria-labelledby="add-content-title" onSubmit={addContent}>
        <header className="modal-header">
          <div><p className="eyebrow">GROW YOUR LIBRARY</p><h2 id="add-content-title">Add something good</h2></div>
          <button type="button" onClick={onClose} aria-label="Close modal" className="modal-close">×</button>
        </header>
        <div className="modal-fields">
          <Input reference={titleRef} placeholder="e.g. A talk worth saving" label="Title" required maxLength={120} />
          <Input reference={linkRef} placeholder="Paste a YouTube or Twitter link" label="Link" type="url" required />
        </div>
        <div className="modal-type">
          <span>Content type</span>
          <div className="modal-type-options">
            <Button text="YouTube" variant={type === "youtube" ? "primary" : "secondary"} onClick={() => setType("youtube")} />
            <Button text="Twitter" variant={type === "twitter" ? "primary" : "secondary"} onClick={() => setType("twitter")} />
          </div>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <Button type="submit" loading={saving} variant="primary" text={saving ? "Saving…" : "Save to library"} fullWidth />
      </form>
    </div>
  );
}
