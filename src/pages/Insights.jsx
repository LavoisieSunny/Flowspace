import { Sparkles, TrendingUp, Bell, Compass, HelpCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

const kindMeta = {
  pattern: { icon: TrendingUp, label: "Mastery pattern" },
  nudge: { icon: Bell, label: "Revision alert" },
  encouragement: { icon: Sparkles, label: "Keep going" },
  forecast: { icon: Compass, label: "Completion forecast" },
};

const SkeletonCard = () => (
  <div className="bg-surface border border-line rounded-xl2 p-6 flex flex-col shadow-sm animate-pulse">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-4 h-4 bg-line rounded-full"></div>
      <div className="w-24 h-3 bg-line rounded-md"></div>
    </div>
    <div className="w-3/4 h-5 bg-line rounded-md mb-3"></div>
    <div className="space-y-2">
      <div className="w-full h-3.5 bg-line rounded-md"></div>
      <div className="w-5/6 h-3.5 bg-line rounded-md"></div>
    </div>
  </div>
);

export default function Insights() {
  const { getDerivedInsights, isOptimizing } = useApp();
  const insightsList = getDerivedInsights();

  return (
    <div className="container-page py-12 md:py-16">
      {/* Top Header */}
      <div className="max-w-xl mb-12">
        <span className="text-xs tracking-[0.2em] uppercase text-ink2 font-mono font-bold block mb-1 flex items-center gap-2">
          <Sparkles size={14} className="text-indigo-500 animate-pulse" />
          AI diagnostics
        </span>
        <h1 className="font-display text-3xl md:text-4xl text-ink font-bold">
          Your Revision Insights
        </h1>
        <p className="mt-4 text-ink2 text-sm leading-relaxed">
          StudyOS analyzes your scheduled sessions, completed quizzes, and upcoming exam dates to surface critical adjustments and forecast target completion dates.
        </p>
      </div>

      {isOptimizing ? (
        <div className="grid md:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        /* Staggered Fade-in Cards */
        <div className="grid md:grid-cols-2 gap-6">
          {insightsList.map(({ id, title, body, kind }, index) => {
            const { icon: Icon, label } = kindMeta[kind] || kindMeta.pattern;
            return (
              <div
                key={id}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
                className="bg-surface border border-line rounded-xl2 p-6 flex flex-col shadow-sm animate-fade-in motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:animation-none"
              >
                <div className="flex items-center gap-2 text-xs text-ink font-bold mb-4 font-mono">
                  <Icon size={14} className="text-indigo-500 shrink-0" />
                  <span>{label}</span>
                </div>
                <h3 className="font-display text-lg text-ink font-semibold mb-2">{title}</h3>
                <p className="text-xs text-ink2 leading-relaxed">{body}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Advisory Bottom Banner */}
      <div className="mt-10 bg-indigo-50 border border-indigo-100 rounded-xl2 p-6 flex items-start gap-4">
        <Sparkles size={18} className="text-indigo-600 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-700 leading-relaxed font-mono font-medium">
          Insights recalculate dynamically as you check off tasks on the Daily Planner and score correct answers on knowledge quizzes. It reflects your active in-memory progress.
        </p>
      </div>
    </div>
  );
}
