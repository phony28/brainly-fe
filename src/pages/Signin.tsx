import { useRef, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Logo } from "../icons/logo";
import { BACKEND_URL } from "../config";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch {
      setError("We couldn’t sign you in. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="signin-title">
        <Link to="/signin" className="brand-lockup" aria-label="Brainly home">
          <span className="brand-mark"><Logo /></span>
          <span>brainly</span>
        </Link>
        <div className="auth-heading">
          <p className="eyebrow">YOUR PERSONAL LIBRARY</p>
          <h1 id="signin-title">Welcome back</h1>
          <p>Sign in to pick up where your ideas left off.</p>
          {location.state?.message && <p className="form-success" role="status">{location.state.message}</p>}
        </div>
        <form onSubmit={signin} className="auth-form">
          <Input reference={usernameRef} placeholder="you@example.com" label="Username" autoComplete="username" />
          <Input reference={passwordRef} placeholder="Enter your password" label="Password" type="password" autoComplete="current-password" />
          {error && <p className="form-error" role="alert">{error}</p>}
          <Button type="submit" loading={loading} variant="primary" text={loading ? "Signing in…" : "Sign in"} fullWidth />
        </form>
        <p className="auth-switch">New to Brainly? <Link to="/signup">Create an account</Link></p>
      </section>
      <aside className="auth-aside">
        <div className="aside-orbit orbit-one" />
        <div className="aside-orbit orbit-two" />
        <div className="aside-content">
          <span className="aside-kicker">A little space for big ideas</span>
          <h2>Keep the good<br />stuff close.</h2>
          <p>Save the videos, posts, and thoughts you want to come back to. Your second brain is ready when you are.</p>
          <div className="aside-note"><span className="note-dot" /> Your ideas, all in one place</div>
        </div>
        <span className="aside-footer">MAKE ROOM FOR WHAT MATTERS</span>
      </aside>
    </main>
  );
}
