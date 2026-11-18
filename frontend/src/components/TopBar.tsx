import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { agency, agent, homeSend } from "../branding";
import { signOut } from "../storage";

export function TopBar() {
  const navigate = useNavigate();
  const choosing = useLocation().pathname.startsWith("/property/");

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
      </div>
    </header>
  );
}
