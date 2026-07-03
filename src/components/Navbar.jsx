import { NavLink } from "react-router-dom";
import { Circle } from "lucide-react";

const links = [
  { to: "/", label: "Overview", end: true },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/insights", label: "Insights" },
  { to: "/analytics", label: "Analytics" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-line no-print">
      <div className="container-page h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-display text-xl text-ink">
          <Circle size={18} strokeWidth={3} className="text-focus-500" />
          Flowspace
        </NavLink>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `transition-colors ${isActive ? "text-ink font-medium" : "text-ink2 hover:text-ink"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <NavLink
          to="/dashboard"
          className="text-sm bg-ink text-paper px-4 py-2 rounded-full hover:bg-focus-700 transition-colors"
        >
          Open app
        </NavLink>
      </div>
    </header>
  );
}
