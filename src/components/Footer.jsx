import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-12 no-print bg-paper">
      <div className="container-page py-8 flex flex-col items-center gap-4 text-xs text-ink2 font-medium">
        {/* Shortcut Guide Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 border-b border-line pb-4 mb-2">
          <span>
            StudyOS — built for{" "}
            <Link to="/slides" className="underline hover:text-ink">
              Frontend Battle 2026
            </Link>
          </span>
          <span className="font-mono text-[10px] bg-surface px-3 py-1 rounded-full border border-line">
            Shortcuts: <kbd className="text-ink font-bold">Alt + P</kbd> Planner · <kbd className="text-ink font-bold">Alt + T</kbd> Tutor · <kbd className="text-ink font-bold">Alt + S</kbd> Subjects · <kbd className="text-ink font-bold">Alt + I</kbd> Insights · <kbd className="text-ink font-bold">Alt + O</kbd> Optimize
          </span>
        </div>
        
        <span className="opacity-75">Prototype database. Data shown is dynamically simulated in memory.</span>
      </div>
    </footer>
  );
}
