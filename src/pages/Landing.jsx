import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, BookOpen, Clock, AlertTriangle, CheckCircle, GraduationCap } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Prioritize Your Day",
    body: "StudyOS compiles your subjects and automatically ranks topics by upcoming exam deadlines (urgency) and your lowest masteries (weakness).",
  },
  {
    n: "02",
    title: "Synthesize Concepts",
    body: "Engage with the digital AI tutor to read conceptual breakdowns mapped to simple, real-world analogies rather than dry textbook copy.",
  },
  {
    n: "03",
    title: "Calibrate Retention",
    body: "Run diagnostic multiple-choice quizzes to verify active recall. Scoring a perfect quiz applies a permanent boost to your topic mastery index.",
  },
];

export default function Landing() {
  const revealRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Live Planner Simulator state
  const [isSorting, setIsSorting] = useState(false);
  const [simSorted, setSimSorted] = useState(false);
  const [simItems, setSimItems] = useState([
    { id: 1, subject: "Chemistry", topic: "Organic Synthesis", days: 18, mastery: 35, color: "#EC4899" },
    { id: 2, subject: "Physics", topic: "Electromagnetism", days: 4, mastery: 30, color: "#8B5CF6" },
    { id: 3, subject: "Mathematics", topic: "Calculus", days: 12, mastery: 40, color: "#3B82F6" },
  ]);

  const handleSimulateSort = () => {
    setIsSorting(true);
    setTimeout(() => {
      // Sort by urgency, then weakness
      const sorted = [...simItems].sort((a, b) => {
        if (a.days !== b.days) return a.days - b.days;
        return a.mastery - b.mastery;
      });
      setSimItems(sorted);
      setIsSorting(false);
      setSimSorted(true);
    }, 900);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (revealRef.current) {
      observer.observe(revealRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="container-page pt-16 pb-20 md:pt-24 md:pb-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-indigo-600 font-mono font-bold block mb-4">
            cognitive study optimizer
          </span>
          <h1 className="font-display text-[2.75rem] leading-[1.05] md:text-6xl md:leading-[1.05] text-ink font-bold">
            Most revision schedules waste your study window.
          </h1>
          <p className="mt-6 text-base text-ink2 max-w-md leading-relaxed">
            StudyOS is a zero-friction academic companion that automatically balances your subjects by exam urgency and personal topic weaknesses, keeping your study hours aligned.
          </p>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <Link
              to="/planner"
              className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 rounded-full text-xs font-bold hover:bg-opacity-80 transition-all shadow-sm"
            >
              Open Daily Planner <ArrowRight size={14} />
            </Link>
            <Link
              to="/tutor"
              className="text-xs text-ink2 hover:text-ink font-mono font-semibold underline underline-offset-4"
            >
              Ask the AI Tutor
            </Link>
          </div>
        </div>

        {/* Live Interactive Hero Simulation */}
        <div className="flex justify-center md:justify-end">
          <div className="bg-surface border border-line rounded-xl2 p-6 w-full max-w-[380px] shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
              <span className="text-[10px] font-mono text-ink2 uppercase font-bold">Daily Priority Simulator</span>
              <button
                onClick={handleSimulateSort}
                disabled={isSorting || simSorted}
                className="text-[9px] bg-indigo-50 border border-indigo-100 hover:border-indigo-300 text-indigo-700 px-3 py-1.5 rounded-full font-bold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed font-mono"
              >
                {isSorting ? "Sorting..." : simSorted ? "AI Aligned" : "Simulate Sort"}
              </button>
            </div>

            <div className="space-y-3 relative">
              {isSorting && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center rounded">
                  <span className="text-[10px] bg-white border border-line px-3 py-1.5 rounded-full text-ink font-mono font-semibold shadow flex items-center gap-1.5">
                    <Sparkles size={11} className="animate-spin text-indigo-500" /> Calculating order...
                  </span>
                </div>
              )}

              {simItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-paper border border-line p-3.5 rounded-lg flex items-center gap-3 transition-all duration-500 shadow-sm"
                >
                  <div className="font-mono text-xs font-bold text-ink2">0{idx + 1}</div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-[9px] uppercase tracking-wider text-ink2 font-bold">{item.subject}</span>
                    </div>
                    <p className="font-semibold text-ink leading-none">{item.topic}</p>
                    <div className="flex gap-2 mt-1.5 text-[9px] font-mono text-ink2 font-semibold">
                      <span>{item.days}d to exam</span>
                      <span>•</span>
                      <span style={{ color: item.color }}>{item.mastery}% mastery</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Narrative Section */}
      <section className="bg-paper border-t border-b border-line py-16">
        <div className="container-page max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="border-l-2 border-red-400 pl-6">
              <span className="text-[10px] font-mono text-red-600 uppercase tracking-widest block mb-2 font-bold">Unoptimized Study Cycle</span>
              <p className="text-xs text-ink leading-relaxed font-serif italic">
                "You select topics at random based on how you feel. You spend hours re-reading high-mastery summaries, neglect weak subjects until the night before the exam, and suffer severe performance anxiety."
              </p>
            </div>
            <div className="border-l-2 border-indigo-500 pl-6">
              <span className="text-[10px] font-mono text-indigo-600 uppercase tracking-widest block mb-2 font-bold">StudyOS Optimized Cycle</span>
              <p className="text-xs text-ink leading-relaxed font-serif italic">
                "Your daily revision order is calculated by urgency and topic weakness. You review concept analogies in a streaming chat, run quizzes to check recall gaps, and watch your mastery charts climb."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Numbered Process Sequence (Plan -> Study -> Review) */}
      <section ref={revealRef} className="container-page py-20 md:py-28 overflow-hidden">
        <div className="max-w-md mb-14">
          <span className="text-xs tracking-[0.2em] uppercase text-indigo-600 font-mono font-bold block mb-1">
            structured workflow
          </span>
          <h2
            className={`font-display text-3xl md:text-4xl text-ink font-bold transition-all duration-700 motion-reduce:transition-none motion-reduce:transform-none ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            A Genuine Process Loop
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map(({ n, title, body }, index) => (
            <div
              key={n}
              style={{
                transitionDelay: `${index * 150}ms`,
                transitionDuration: "600ms",
              }}
              className={`border-t border-line pt-6 transition-all motion-reduce:transition-none motion-reduce:transform-none ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center justify-between mb-6 font-mono font-bold">
                <span className="text-xs text-ink2">{n}</span>
                <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wider">Step</span>
              </div>
              <h3 className="font-display text-lg text-ink font-semibold mb-2">{title}</h3>
              <p className="text-xs text-ink2 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="bg-[#1C1C1A] text-paper">
        <div className="container-page py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight">
              Calibrate your study week.
            </h2>
            <p className="text-xs text-indigo-300 font-mono mt-1">Start prioritizing by exam urgency and weakness.</p>
          </div>
          <Link
            to="/planner"
            className="inline-flex items-center gap-2 bg-paper text-ink px-5 py-3 rounded-full text-xs font-bold hover:bg-opacity-90 transition-colors w-fit"
          >
            Launch StudyOS <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
