import { useEffect } from "react";
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastContainer from "./components/ToastContainer";
import Landing from "./pages/Landing";
import Planner from "./pages/Planner";
import Tutor from "./pages/Tutor";
import Subjects from "./pages/Subjects";
import Insights from "./pages/Insights";
import Slides from "./pages/Slides";
import { useApp } from "./context/AppContext";

function AppContent() {
  const navigate = useNavigate();
  const { regeneratePlan } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "SELECT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable)
      ) {
        return;
      }

      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case "p":
            e.preventDefault();
            navigate("/planner");
            break;
          case "t":
            e.preventDefault();
            navigate("/tutor");
            break;
          case "s":
            e.preventDefault();
            navigate("/subjects");
            break;
          case "i":
            e.preventDefault();
            navigate("/insights");
            break;
          case "o":
            e.preventDefault();
            navigate("/planner");
            regeneratePlan();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, regeneratePlan]);

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/slides" element={<Slides />} />
        </Routes>
      </main>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
