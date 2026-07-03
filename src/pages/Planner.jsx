import { useState } from "react";
import { Sparkles, Plus, BookOpen, Clock, CheckCircle } from "lucide-react";
import { useApp } from "../context/AppContext";
import SessionItem from "../components/SessionItem";
import FocusRing from "../components/FocusRing";
import Confetti from "../components/Confetti";

export default function Planner() {
  const {
    subjects,
    sessions,
    isOptimizing,
    optimizeStatus,
    regeneratePlan,
    completeSession,
    addSession,
    deleteSession,
  } = useApp();

  const [selectedSubj, setSelectedSubj] = useState(subjects[0]?.id || "math");
  const [topicName, setTopicName] = useState("");
  const [minutes, setMinutes] = useState(30);

  const handleManualAdd = (e) => {
    e.preventDefault();
    if (!topicName.trim()) return;
    addSession(selectedSubj, topicName, minutes);
    setTopicName("");
    setMinutes(30);
  };

  const doneCount = sessions.filter((s) => s.done).length;
  const totalMins = sessions.reduce((sum, s) => sum + s.minutes, 0);
  const doneMins = sessions.filter((s) => s.done).reduce((sum, s) => sum + s.minutes, 0);
  const allCompleted = sessions.length > 0 && sessions.every((s) => s.done);

  return (
    <div className="container-page py-12 md:py-16">
      <Confetti active={allCompleted} />
      {/* Top Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-ink2 font-mono font-bold block mb-1">Daily revision</span>
          <h1 className="font-display text-3xl md:text-4xl text-ink font-bold">Today's Study Plan</h1>
        </div>

        <div className="flex items-center gap-3 bg-surface border border-line rounded-xl px-4 py-2 text-sm shadow-sm font-mono font-semibold">
          <Clock size={16} className="text-indigo-500" />
          <span>{doneMins}m / {totalMins}m reviewed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10">
        {/* Left Column: AI Planner Panel & Add form */}
        <div className="space-y-6">
          {/* Productivity Score Focus Ring Card */}
          <div className="bg-surface border border-line rounded-xl2 p-6 shadow-sm flex flex-col items-center text-center">
            <span className="text-[10px] font-mono text-ink2 uppercase tracking-widest block mb-4 font-bold">productivity score</span>
            <FocusRing
              progress={sessions.length > 0 ? doneCount / sessions.length : 0}
              label={sessions.length > 0 ? `${Math.round((doneCount / sessions.length) * 100)}%` : "0%"}
              sublabel={`${doneCount} / ${sessions.length} done`}
              size={160}
              stroke={10}
            />
          </div>
          {/* AI Prioritizer Action Card */}
          <div className="bg-surface border border-line rounded-xl2 p-6 shadow-sm relative overflow-hidden">
            <span className="text-[10px] font-mono text-indigo-600 uppercase tracking-widest block mb-2 font-bold">prioritization engine</span>
            <h3 className="font-display text-lg text-ink font-semibold mb-3">Cirardian Urgency Alignment</h3>
            <p className="text-xs text-ink2 mb-5 leading-relaxed">
              Regenerate your daily study plan using AI. The system prioritizes topics by nearest exam deadlines (urgency) and your lowest mastery levels (weakness).
            </p>
            <button
              onClick={regeneratePlan}
              disabled={isOptimizing}
              className="w-full inline-flex items-center justify-center gap-2 bg-ink text-paper text-sm py-2.5 rounded-full font-bold hover:bg-opacity-80 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles size={14} className={isOptimizing ? "animate-spin" : ""} />
              {isOptimizing ? "Calibrating..." : "Regenerate AI Plan"}
            </button>
          </div>

          {/* Quick Add Custom Session form */}
          <div className="bg-surface border border-line rounded-xl2 p-6 shadow-sm">
            <span className="text-[10px] font-mono text-ink2 uppercase tracking-widest block mb-2 font-bold">manual scheduling</span>
            <h3 className="font-display text-base text-ink font-semibold mb-4">Add revision target</h3>
            
            <form onSubmit={handleManualAdd} className="space-y-4">
              <div>
                <label className="block text-[10px] text-ink2 uppercase tracking-wider mb-1 font-bold">Subject</label>
                <select
                  value={selectedSubj}
                  onChange={(e) => setSelectedSubj(e.target.value)}
                  className="w-full text-xs bg-paper border border-line rounded-lg px-3 py-2.5 text-ink focus:outline-none focus:border-ink font-medium cursor-pointer"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-ink2 uppercase tracking-wider mb-1 font-bold">Topic title</label>
                <input
                  type="text"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="e.g. Electromagnetism Formulas"
                  required
                  className="w-full text-xs bg-paper border border-line rounded-lg px-3 py-2.5 text-ink focus:outline-none focus:border-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-ink2 uppercase tracking-wider mb-1 font-bold">Mins</label>
                  <input
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(5, parseInt(e.target.value) || 5))}
                    min="5"
                    max="180"
                    className="w-full text-xs bg-paper border border-line rounded-lg px-3 py-2.5 text-ink focus:outline-none focus:border-ink font-mono"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-1 bg-ink text-paper text-xs py-2.5 rounded-lg font-bold hover:bg-opacity-80 transition-all h-[38px] shadow-sm"
                  >
                    <Plus size={14} /> Schedule
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Sessions List */}
        <div>
          <div className="flex items-center justify-between mb-4 font-mono text-xs text-ink2 font-semibold">
            <span>Priority Queue</span>
            <span>{doneCount} of {sessions.length} reviewed</span>
          </div>

          <div className="relative min-h-[300px]">
            {/* AI thinking state overlay */}
            {isOptimizing && (
              <div className="absolute inset-0 bg-paper/60 backdrop-blur-[1px] z-10 rounded-xl flex items-center justify-center transition-all duration-300">
                <div className="flex items-center gap-2 bg-surface border border-line px-5 py-3 rounded-full text-xs text-ink font-semibold shadow-md border-b-2 border-r-2 border-ink">
                  <Sparkles size={14} className="animate-spin text-indigo-500 shrink-0" />
                  <span>{optimizeStatus}</span>
                </div>
              </div>
            )}

            {sessions.length === 0 ? (
              <div className="bg-surface border border-line rounded-xl p-16 text-center text-ink2 font-serif italic">
                No active revision tasks scheduled for today. Run the AI Prioritization engine to populate your plan!
              </div>
            ) : allCompleted ? (
              /* Mindful Completed state card */
              <div className="bg-surface border border-line rounded-xl2 p-8 text-center shadow-sm animate-fade-in">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600 border border-green-150">
                  <CheckCircle size={22} />
                </div>
                <h3 className="font-display text-lg text-ink font-bold mb-1">Study block completed</h3>
                <p className="text-xs text-ink2 mb-4 max-w-sm mx-auto leading-relaxed">
                  Excellent work! You have finished every prioritized revision goal for today. Take a break to lock in the material, or queue up tomorrow's objectives.
                </p>
                <button
                  onClick={regeneratePlan}
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 border border-indigo-150 hover:bg-indigo-100 px-4 py-2 rounded-full font-bold transition-all shadow-sm"
                >
                  <Sparkles size={12} /> Prep tomorrow's plans
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {sessions.map((s) => (
                  <div key={s.id} className="relative group">
                    <SessionItem session={s} onToggle={completeSession} />
                    <button
                      onClick={() => deleteSession(s.id)}
                      className="absolute right-4 top-4 text-[10px] text-red-500 opacity-0 group-hover:opacity-100 hover:underline transition-opacity font-mono no-print"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
