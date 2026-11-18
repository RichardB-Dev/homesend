import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { agency, agent, homeSend } from "../branding";
import { signOut } from "../storage";

export function TopBar() {
  const navigate = useNavigate();
  const choosing = useLocation().pathname.startsWith("/property/");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onPointer(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" to="/select">
          <img src={homeSend.logo} alt={homeSend.name} />
        </Link>
        <nav className="nav" aria-label="Sections">
          <NavLink to="/select" className={({ isActive }) => (isActive || choosing ? "is-active" : undefined)}>
            Homes
          </NavLink>
          <NavLink to="/clients" className={({ isActive }) => (isActive ? "is-active" : undefined)}>
            Clients
          </NavLink>
          <NavLink to="/sent" className={({ isActive }) => (isActive ? "is-active" : undefined)}>
            Sent
          </NavLink>
        </nav>
        <div className="topbar-end">
          <div className="agency-pill">
            <img src={agency.logo} alt="" />
            <span>{agency.shortName}</span>
          </div>
          <div className="agent-menu" ref={menuRef}>
            <button
              type="button"
              className="agent-chip"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              aria-label={`${agent.name} menu`}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <img src={agent.portrait} alt="" />
              <span className="agent-name">{agent.name}</span>
            </button>
            {menuOpen ? (
              <div className="agent-dropdown" role="menu">
                <p className="agent-dropdown-name">{agent.name}</p>
                <button
                  type="button"
                  role="menuitem"
                  className="agent-dropdown-item"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                    navigate("/");
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
