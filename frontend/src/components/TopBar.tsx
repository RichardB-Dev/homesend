import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { agency, agent } from "../branding";
import { signOut } from "../storage";

export function TopBar() {
  const navigate = useNavigate();
  const choosing = useLocation().pathname.startsWith("/property/");

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" to="/select">
          <img src={agency.logo} alt="" />
          <span>Home Send</span>
        </Link>
        <nav className="nav" aria-label="Sections">
          <NavLink to="/select" className={({ isActive }) => (isActive || choosing ? "is-active" : undefined)}>
            Select
          </NavLink>
          <NavLink to="/sent" className={({ isActive }) => (isActive ? "is-active" : undefined)}>
            Sent
          </NavLink>
        </nav>
        <div className="agent-chip">
          <img src={agent.portrait} alt="" />
          <span className="agent-name">{agent.name}</span>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              signOut();
              navigate("/");
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
