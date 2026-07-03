import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-12 no-print bg-paper">
      <div className="container-page py-8 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-ink2 font-medium">
        <span>
          StudyOS — built for{" "}
          <Link to="/slides" className="underline hover:text-ink">
            Frontend Battle 2026
          </Link>
        </span>
        <span>Prototype database. Data shown is dynamically simulated in memory.</span>
      </div>
    </footer>
  );
}
