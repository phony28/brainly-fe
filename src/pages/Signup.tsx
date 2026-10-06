import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Logo } from "../icons/logo";
import { api, getApiErrorMessage } from "../api";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/signup", {
        username: usernameRef.current?.value.trim(),
        password: passwordRef.current?.value,
      });
      navigate("/signin", { state: { message: "Your account is ready. Sign in to continue." } });
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "We couldn’t create your account. Please try again."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="signup-title">
        <Link to="/signin" className="brand-lockup" aria-label="Brainly home">
          <span className="brand-mark"><Logo /></span>
          <span>brainly</span>
        </Link>
        <div className="auth-heading">
          <p className="eyebrow">START YOUR COLLECTION</p>
          <h1 id="signup-title">Make space for ideas</h1>
          <p>Create your account and keep everything worth remembering together.</p>
        </div>
        <form onSubmit={signup} className="auth-form">
          <Input reference={usernameRef} placeholder="Choose a username" label="Username" autoComplete="username" required minLength={3} maxLength={30} pattern="[A-Za-z0-9._-]+" title="Use 3–30 letters, numbers, dots, underscores, or hyphens." />
          <Input reference={passwordRef} placeholder="At least 8 characters" label="Password" type="password" autoComplete="new-password" required minLength={8} maxLength={72} />
          {error && <p className="form-error" role="alert">{error}</p>}
          <Button type="submit" loading={loading} variant="primary" text={loading ? "Creating account…" : "Create account"} fullWidth />
        </form>
        <p className="auth-switch">Already have an account? <Link to="/signin">Sign in</Link></p>
      </section>
      <aside className="auth-aside">
        <div className="aside-orbit orbit-one" />
        <div className="aside-orbit orbit-two" />
        <div className="aside-content">
          <span className="aside-kicker">Collect. Connect. Come back.</span>
          <h2>Your next<br />great thought<br />starts here.</h2>
          <p>Build a thoughtful library from the things that inspire you every day.</p>
          <div className="aside-note"><span className="note-dot" /> Simple, personal, and always yours</div>
        </div>
        <span className="aside-footer">MAKE ROOM FOR WHAT MATTERS</span>
      </aside>
    </main>
  );
}
