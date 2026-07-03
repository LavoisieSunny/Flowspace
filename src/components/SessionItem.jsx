import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Check, Sparkles, MessageCircleWarning, Clock, HelpCircle } from "lucide-react";

export default function SessionItem({ session, onToggle }) {
  const [justChecked, setJustChecked] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (session.done) {
      setJustChecked(true);
      const timer = setTimeout(() => setJustChecked(false), 750);
      return () => clearTimeout(timer);
    }
  }, [session.done]);

  const getUrgencyStyles = () => {
    switch (session.urgency) {
      case "Urgent":
        return "bg-red-50 border-red-200 text-red-700 font-bold";
      case "Medium":
        return "bg-amber-50 border-amber-200 text-amber-700 font-semibold";
      case "Planned":
      default:
        return "bg-blue-50 border-blue-200 text-blue-700 font-medium";
    }
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 motion-reduce:transition-none motion-reduce:scale-100 ${
        session.done ? "opacity-50" : ""
      } ${
        justChecked
          ? "motion-safe:animate-border-flash"
          : "bg-surface border-line"
      }`}
    >
      {/* Checkbox selector */}
      <button
        onClick={() => onToggle(session.id)}
        aria-label={session.done ? "Mark session as incomplete" : "Mark session as complete"}
        className={`shrink-0 w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
          session.done
            ? "bg-[#1C1C1A] border-[#1C1C1A] text-paper"
            : "border-line hover:border-ink"
        } ${justChecked ? "motion-safe:animate-check-pulse" : ""}`}
      >
        {session.done && <Check size={14} strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: session.color }}
          />
          <span className="text-[10px] text-ink2 uppercase tracking-wider font-bold">
            {session.subjectName}
          </span>
        </div>
        
        <p className={`text-sm text-ink font-medium leading-snug ${session.done ? "line-through" : ""}`}>
          {session.topicName}
        </p>
        
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getUrgencyStyles()}`}>
            {session.urgency} ({session.daysToExam}d exam)
          </span>
          
          <span className="text-xs text-ink2 flex items-center gap-1 font-mono">
            <Clock size={11} /> {session.minutes}m
          </span>
        </div>
      </div>

      {/* Action links */}
      <div className="flex items-center gap-2">
        <Link
          to={`/tutor?subject=${session.subjectId}&topic=${session.topicId}`}
          className="text-xs inline-flex items-center gap-1 bg-paper border border-line text-ink2 hover:text-ink hover:border-ink px-3 py-1.5 rounded-full transition-all"
        >
          <HelpCircle size={12} />
          <span>Ask Tutor</span>
        </Link>
      </div>
    </div>
  );
}
