import { NavLink } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const links = [
  { to: "/", label: "Overview", end: true },
  { to: "/planner", label: "Planner" },
  { to: "/tutor", label: "AI Tutor" },
  { to: "/subjects", label: "Subjects" },
  { to: "/insights", label: "Insights" },
  { to: "/slides", label: "Slides" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-line no-print">
      <div className="container-page h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5 font-display text-xl text-ink font-bold">
          <GraduationCap size={22} className="text-[#1C1C1A]" />
          StudyOS
        </NavLink>
        
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `transition-colors font-medium ${
                  isActive ? "text-ink border-b-2 border-ink pb-1" : "text-ink2 hover:text-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/planner"
          className="text-xs bg-ink text-paper px-4 py-2 rounded-full font-bold hover:bg-opacity-80 transition-all shadow-sm"
        >
          Launch OS
        </NavLink>
      </div>
    </header>
  );
}
