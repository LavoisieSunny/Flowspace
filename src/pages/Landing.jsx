import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, NotebookPen, Timer, LineChart } from "lucide-react";
import FocusRing from "../components/FocusRing";

const steps = [
  {
    n: "01",
    title: "Plan",
    icon: NotebookPen,
    body: "Each morning, Flowspace reorders your list around when your energy is actually highest — not just deadlines.",
  },
  {
    n: "02",
    title: "Focus",
    icon: Timer,
    body: "One task on screen at a time. The ring fills as you work; interruptions are logged, not judged.",
  },
  {
    n: "03",
    title: "Reflect",
    icon: LineChart,
    body: "At day's end, see what actually got done, where your attention went, and one pattern worth adjusting.",
  },
];

export default function Landing() {
  const revealRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      {/* Hero */}
      <section className="container-page pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-focus-600 font-medium mb-5">
            Your day, in the right order
          </p>
          <h1 className="font-display text-[2.75rem] leading-[1.05] md:text-6xl md:leading-[1.05] text-ink">
            Most to-do lists ignore how you actually feel at 9am.
          </h1>
          <p className="mt-6 text-lg text-ink2 max-w-md">
            Flowspace is a focus copilot that learns your energy rhythm, protects
            time for what matters, and shows you what's really working — instead
            of another list you'll rewrite tomorrow.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 rounded-full text-sm font-medium hover:bg-focus-700 transition-colors"
            >
              Open the dashboard <ArrowUpRight size={16} />
            </Link>
            <Link to="/insights" className="text-sm text-ink2 hover:text-ink underline underline-offset-4">
              See a sample insight
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="bg-surface border border-line rounded-xl2 p-8 shadow-sm">
            <FocusRing progress={0.68} label="34:12" sublabel="Deep work — Checkout redesign" size={240} />
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-ink2">Session 3 of 4 today</span>
              <span className="font-mono text-focus-600">68%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Narrative Section */}
      <section className="bg-paper border-t border-line py-16">
        <div className="container-page max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="border-l-2 border-amber-500 pl-6">
              <span className="text-[10px] font-mono text-amber-600 uppercase tracking-widest block mb-2 font-bold">A day without Flowspace</span>
              <p className="text-sm text-ink leading-relaxed font-serif italic">
                "You face a flat list of 15 tasks. You attempt high-focus drafting during a 2pm energy slump, get frustrated, check Slack, and rewrite the same items onto tomorrow's plan."
              </p>
            </div>
            <div className="border-l-2 border-focus-500 pl-6">
              <span className="text-[10px] font-mono text-focus-600 uppercase tracking-widest block mb-2 font-bold">A day with Flowspace</span>
              <p className="text-sm text-ink leading-relaxed font-serif italic">
                "Your hardest task is locked into your morning alertness peak. You work inside a single-item focus ring with brown noise humming, logging interruptions instead of giving in."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem strip */}
      <section className="border-y border-line bg-surface">
        <div className="container-page py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ["23", "avg. interruptions per workday"],
            ["2.1×", "tasks rescheduled before completion"],
            ["11am", "most people's true energy peak"],
            ["31%", "of planned deep work actually happens"],
          ].map(([stat, label]) => (
            <div key={label}>
              <div className="font-display text-3xl text-ink">{stat}</div>
              <div className="text-xs text-ink2 mt-1 leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Plan / Focus / Reflect with Scroll-Trigger Reveal */}
      <section ref={revealRef} className="container-page py-20 md:py-28 overflow-hidden">
        <h2
          className={`font-display text-3xl md:text-4xl text-ink max-w-lg transition-all duration-700 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          A three-part rhythm, not a longer list.
        </h2>
        
        <div className="mt-14 grid md:grid-cols-3 gap-10">
          {steps.map(({ n, title, icon: Icon, body }, index) => (
            <div
              key={n}
              style={{
                transitionDelay: `${index * 150}ms`,
                transitionDuration: "600ms",
              }}
              className={`border-t border-line pt-6 transition-all motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-ink2">{n}</span>
                <Icon size={20} className="text-focus-500" />
              </div>
              <h3 className="font-display text-xl text-ink mb-2">{title}</h3>
              <p className="text-sm text-ink2 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-paper">
        <div className="container-page py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="font-display text-2xl md:text-3xl max-w-md">
            See where your next hour is best spent.
          </h2>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-paper text-ink px-5 py-3 rounded-full text-sm font-medium hover:bg-focus-100 transition-colors w-fit"
          >
            Open the dashboard <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
