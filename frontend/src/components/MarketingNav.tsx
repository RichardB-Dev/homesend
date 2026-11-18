import { useEffect, useId, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { homeSend } from "../branding";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/pricing", label: "Pricing", end: false },
  { to: "/sign-in", label: "Login", end: false },
] as const;

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const [brandLarge, setBrandLarge] = useState(false);
  const panelId = useId();
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!onHome) {
      setBrandLarge(false);
      return;
    }

    function update() {
      setBrandLarge(window.scrollY < 48);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [onHome]);

  const className = [
    "marketing-nav",
    open ? "is-open" : "",
    brandLarge ? "is-brand-large" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={className}>
      <div className="marketing-nav-bar">
        <Link className="marketing-nav-brand" to="/">
          <img src={homeSend.logo} alt="" />
          <span>{homeSend.name}</span>
        </Link>
        <button
          type="button"
          className="marketing-nav-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="marketing-nav-burger" aria-hidden="true" />
        </button>
        <nav id={panelId} className="marketing-nav-links" aria-label="Marketing">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
          <span className="marketing-nav-disabled" aria-disabled="true">
            Contact us
          </span>
        </nav>
      </div>
    </header>
  );
}
