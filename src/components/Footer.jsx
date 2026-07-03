import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-10 no-print">
      <div className="container-page py-8 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-ink2">
        <span>
          Flowspace — built for{" "}
          <Link to="/slides" className="underline hover:text-ink font-medium">
            Frontend Battle 2026
          </Link>
        </span>
        <span>Prototype data shown is illustrative</span>
      </div>
    </footer>
  );
}
