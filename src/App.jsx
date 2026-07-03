import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Planner from "./pages/Planner";
import Tutor from "./pages/Tutor";
import Subjects from "./pages/Subjects";
import Insights from "./pages/Insights";
import Slides from "./pages/Slides";

export default function App() {
  return (
    <HashRouter>
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
        <Footer />
      </div>
    </HashRouter>
  );
}
