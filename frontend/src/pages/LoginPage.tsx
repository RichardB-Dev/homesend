import { useState } from "react";
import { Navigate } from "react-router-dom";
import { agency, agent } from "../branding";
import { readSession, signIn } from "../storage";

export function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  if (readSession() || signedIn) return <Navigate to="/select" replace />;

  return (
    <main className="login">
      <section className="hero" aria-hidden="true">
        <div className="hero-brand">
          <img src={agency.logo} alt="" />
          <span>{agency.shortName}</span>
        </div>
        <p>{agency.tagline}</p>
      </section>
      <section className="login-panel">
        <form
          className="login-card"
          onSubmit={(event) => {
            event.preventDefault();
            const message = signIn(password);
            if (message) {
              setError(message);
              return;
            }
            setSignedIn(true);
          }}
        >
          <p className="eyebrow">
            <img src={agency.logo} alt="" />
            {agency.shortName}
          </p>
          <h1>Sign in</h1>
          <label>
            Name
            <input value={agent.name} readOnly />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              autoComplete="current-password"
              autoFocus
              onChange={(event) => {
                setPassword(event.target.value);
                if (error) setError(null);
              }}
            />
            {error ? <span className="field-error">{error}</span> : null}
          </label>
          <button type="submit" className="button">
            Continue
          </button>
          <p className="hint">Demo sign-in. Any password works.</p>
        </form>
      </section>
    </main>
  );
}
