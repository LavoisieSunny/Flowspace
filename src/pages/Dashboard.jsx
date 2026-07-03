import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Flame, Sparkles, Plus, Headphones } from "lucide-react";
import FocusRing from "../components/FocusRing";
import TaskCard from "../components/TaskCard";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const {
    chronotype,
    setChronotype,
    tasks,
    streak,
    isOptimizing,
    optimizeStatus,
    recentlyMovedTasks,
    hasOnboarded,
    setHasOnboarded,
    toggleTask,
    addTask,
    deleteTask,
    optimizeTasks,
  } = useApp();

  const [running, setRunning] = useState(false);
  
  // Onboarding local states
  const [onboardStep, setOnboardStep] = useState(1);
  const [selectedChronotype, setSelectedChronotype] = useState(chronotype);

  // Add task inputs
  const [taskTitle, setTaskTitle] = useState("");
  const [taskEnergy, setTaskEnergy] = useState("medium");
  const [taskMinutes, setTaskMinutes] = useState(25);
  const [taskTag, setTaskTag] = useState("Design");

  // Web Audio Synthesizer States
  const [humActive, setHumActive] = useState(false);
  const audioCtxRef = useRef(null);
  const noiseSourceRef = useRef(null);

  // Onboarding action
  const handleOnboardNext = () => {
    if (onboardStep === 1) {
      setChronotype(selectedChronotype);
      setOnboardStep(2);
    } else if (onboardStep === 2) {
      setOnboardStep(3);
    } else {
      setHasOnboarded(true);
    }
  };

  const getChronotypeFact = () => {
    switch (selectedChronotype) {
      case "early-bird":
        return "Early birds lose up to 35% of their peak focus if they occupy their early morning hours with low-cognitive admin work or emails.";
      case "night-owl":
        return "Night owls lose ~40% of their planned deep work if it is scheduled before noon, when their cognitive alertness is at its lowest.";
      case "balanced":
      default:
        return "Even balanced profiles experience a severe 30% drop in focus and alertness between 1:00 PM and 3:00 PM (the post-lunch circadian slump).";
    }
  };

  // Toggle synthesized brown noise focus hum
  const toggleHum = () => {
    if (humActive) {
      cleanupAudio();
    } else {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Generate Brown Noise buffer (10 seconds loops)
        const bufferSize = 10 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5; 
        }

        const source = ctx.createBufferSource();
        source.buffer = noiseBuffer;
        source.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 350;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.35;

        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(0);

        noiseSourceRef.current = source;
        setHumActive(true);
      } catch (err) {
        console.error("Failed to play synthesized hum", err);
      }
    }
  };

  const cleanupAudio = () => {
    if (noiseSourceRef.current) {
      try {
        noiseSourceRef.current.stop();
      } catch (e) {}
      noiseSourceRef.current.disconnect();
      noiseSourceRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    setHumActive(false);
  };

  useEffect(() => {
    return () => cleanupAudio();
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    addTask(taskTitle, taskEnergy, taskMinutes, taskTag);
    setTaskTitle("");
    setTaskMinutes(25);
  };

  const doneTasksCount = tasks.filter((t) => t.done).length;
  const totalMinutes = tasks.reduce((s, t) => s + t.minutes, 0);
  const doneMinutes = tasks.filter((t) => t.done).reduce((s, t) => s + t.minutes, 0);
  const activeTask = tasks.find((t) => !t.done);
  
  // Empty states
  const allTasksDone = tasks.length > 0 && tasks.every((t) => t.done);

  return (
    <div className="container-page py-12 md:py-16">
      {/* Onboarding Overlay Modal */}
      {!hasOnboarded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/75 backdrop-blur-sm p-4">
          <div className="bg-paper border border-line rounded-xl2 p-8 max-w-md w-full shadow-lg relative animate-fade-in text-ink">
            {onboardStep === 1 && (
              <div>
                <span className="text-[10px] font-mono text-focus-600 uppercase tracking-widest block mb-2">Step 1 of 3</span>
                <h3 className="font-display text-2xl mb-4 leading-tight">Pick your chronotype rhythm</h3>
                <p className="text-sm text-ink2 mb-6 leading-relaxed">
                  Flowspace organizes your task list around your actual biological peak focus hours rather than flat calendar deadlines. Which sounds most like you?
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    { val: "balanced", label: "Balanced circadian", desc: "Energy peaks mid-day with a light afternoon slump" },
                    { val: "early-bird", label: "Early Bird", desc: "Most alert in the morning, energy fades after 3pm" },
                    { val: "night-owl", label: "Night Owl", desc: "Hit peak focus late afternoon & late evening" }
                  ].map(({ val, label, desc }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSelectedChronotype(val)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedChronotype === val
                          ? "bg-focus-50 border-focus-500 ring-1 ring-focus-500 font-semibold"
                          : "bg-surface border-line hover:border-focus-300"
                      }`}
                    >
                      <div className="text-sm text-ink">{label}</div>
                      <div className="text-xs text-ink2 mt-0.5 font-normal">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {onboardStep === 2 && (
              <div>
                <span className="text-[10px] font-mono text-focus-600 uppercase tracking-widest block mb-2">Step 2 of 3</span>
                <h3 className="font-display text-2xl mb-4 leading-tight">Why chronotype optimization matters</h3>
                <div className="bg-surface border border-line rounded-xl p-5 mb-6 my-4">
                  <p className="text-sm text-ink font-medium leading-relaxed italic">
                    "{getChronotypeFact()}"
                  </p>
                </div>
                <p className="text-sm text-ink2 mb-8 leading-relaxed">
                  Traditional to-do apps encourage multitasking when you have the least energy. Flowspace dynamically reorders tasks to protect your focus peaks.
                </p>
              </div>
            )}

            {onboardStep === 3 && (
              <div className="text-center py-4">
                <span className="text-[10px] font-mono text-focus-600 uppercase tracking-widest block mb-2">Step 3 of 3</span>
                <div className="w-16 h-16 bg-focus-50 border border-focus-100 rounded-full flex items-center justify-center mx-auto mb-4 text-focus-600">
                  <Sparkles size={28} />
                </div>
                <h3 className="font-display text-2xl mb-2">Calibration complete</h3>
                <p className="text-sm text-ink2 mb-8 max-w-sm mx-auto leading-relaxed">
                  We've successfully customized your day's schedule. Your analytics curves and focus insights are now tailored to your circadian profile.
                </p>
              </div>
            )}

            <button
              onClick={handleOnboardNext}
              className="w-full inline-flex items-center justify-center bg-ink text-paper text-sm py-3 rounded-full hover:bg-focus-700 transition-colors font-medium"
            >
              {onboardStep === 3 ? "Enter my Dashboard" : "Continue"}
            </button>
          </div>
        </div>
      )}

      {/* Top Header Section */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-focus-600 font-medium mb-2">Today</p>
          <h1 className="font-display text-3xl md:text-4xl text-ink">
            Tuesday, {tasks.filter(t => !t.done).length} plans ahead
          </h1>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto">
          {/* Circadian Chronotype Selector */}
          <div className="flex items-center gap-2 bg-surface border border-line rounded-full px-3 py-1.5 text-xs sm:text-sm shadow-sm">
            <span className="text-ink2 font-medium">Profile:</span>
            <select
              value={chronotype}
              onChange={(e) => setChronotype(e.target.value)}
              className="bg-transparent text-ink font-semibold focus:outline-none cursor-pointer border-none p-0 pr-1 hover:text-focus-600"
            >
              <option value="balanced">Balanced</option>
              <option value="early-bird">Early Bird</option>
              <option value="night-owl">Night Owl</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-surface border border-line rounded-full px-3 py-1.5 text-xs sm:text-sm shadow-sm shrink-0">
            <Flame size={14} className="text-amber-500 sm:w-4 sm:h-4" />
            <span className="text-ink font-medium">{streak.current}d streak</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
        {/* Left Side: Focus Timer Panel */}
        <div className="bg-surface border border-line rounded-xl2 p-8 h-fit shadow-sm">
          <FocusRing
            progress={tasks.length > 0 ? doneTasksCount / tasks.length : 0}
            label={`${doneTasksCount}/${tasks.length}`}
            sublabel="tasks complete"
            size={200}
          />
          <div className="mt-6 space-y-1 text-sm">
            <div className="flex justify-between text-ink2">
              <span>Focus minutes today</span>
              <span className="font-mono text-ink">{doneMinutes}m / {totalMinutes}m</span>
            </div>
          </div>

          {activeTask && (
            <div className="mt-6 pt-6 border-t border-line">
              <p className="text-xs text-ink2 mb-2">Up next</p>
              <p className="text-sm text-ink mb-4 line-clamp-2 min-h-10 leading-snug">{activeTask.title}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRunning((r) => !r)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-ink text-paper text-sm py-2.5 rounded-full hover:bg-focus-700 transition-colors shadow-sm"
                >
                  {running ? <Pause size={14} /> : <Play size={14} />}
                  {running ? "Pause" : "Start focus"}
                </button>
                <button
                  onClick={() => setRunning(false)}
                  aria-label="Reset timer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-line text-ink2 hover:text-ink hover:border-ink transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Web Audio Ambient Panel */}
          <div className="mt-6 pt-6 border-t border-line">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-ink2 font-medium">Ambient Noise</span>
              {humActive && (
                <div className="flex items-end gap-0.5 h-3 shrink-0">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <span
                      key={val}
                      className="w-0.5 bg-focus-500 rounded-full animate-soundwave"
                      style={{
                        height: `${[40, 90, 60, 100, 50][val - 1]}%`,
                        animationDelay: `${val * 0.15}s`,
                        animationDuration: "0.8s",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={toggleHum}
              className={`w-full inline-flex items-center justify-center gap-2 text-xs py-2 px-3 rounded-full border transition-all ${
                humActive
                  ? "bg-focus-50 border-focus-300 text-focus-700 font-medium"
                  : "bg-surface border-line text-ink2 hover:text-ink hover:border-ink"
              }`}
            >
              <Headphones size={13} />
              {humActive ? "Stop Focus Hum" : "Synthesize Deep Hum"}
            </button>
          </div>
        </div>

        {/* Right Side: Task Manager */}
        <div>
          {/* Quick Add Task Form */}
          <form
            onSubmit={handleAddTask}
            className="bg-surface border border-line p-5 rounded-xl2 mb-6 grid grid-cols-12 gap-3 items-end shadow-sm"
          >
            <div className="col-span-12 md:col-span-5">
              <label className="block text-[10px] text-ink2 uppercase tracking-wider mb-1.5 font-bold">New Plan</label>
              <input
                id="new-task-input"
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="e.g. Draft landing hero copy..."
                required
                className="w-full text-sm bg-paper border border-line rounded-lg px-3 py-2 text-ink focus:outline-none focus:border-focus-300 transition-colors"
              />
            </div>
            
            <div className="col-span-6 md:col-span-3">
              <label className="block text-[10px] text-ink2 uppercase tracking-wider mb-1.5 font-bold">Energy Cost</label>
              <select
                value={taskEnergy}
                onChange={(e) => setTaskEnergy(e.target.value)}
                className="w-full text-sm bg-paper border border-line rounded-lg px-3 py-2 text-ink focus:outline-none focus:border-focus-300 cursor-pointer"
              >
                <option value="high">⚡ High energy</option>
                <option value="medium">🔋 Medium energy</option>
                <option value="low">🪫 Low energy</option>
              </select>
            </div>

            <div className="col-span-6 md:col-span-2">
              <label className="block text-[10px] text-ink2 uppercase tracking-wider mb-1.5 font-bold">Mins</label>
              <input
                type="number"
                value={taskMinutes}
                onChange={(e) => setTaskMinutes(Math.max(5, parseInt(e.target.value) || 5))}
                min="5"
                max="240"
                className="w-full text-sm bg-paper border border-line rounded-lg px-3 py-2 text-ink focus:outline-none focus:border-focus-300 font-mono"
              />
            </div>

            <div className="col-span-12 md:col-span-2 flex gap-2">
              <div className="flex-1">
                <label className="block text-[10px] text-ink2 uppercase tracking-wider mb-1.5 font-bold">Tag</label>
                <select
                  value={taskTag}
                  onChange={(e) => setTaskTag(e.target.value)}
                  className="w-full text-sm bg-paper border border-line rounded-lg px-3 py-2 text-ink focus:outline-none focus:border-focus-300 cursor-pointer"
                >
                  <option value="Design">Design</option>
                  <option value="Dev">Dev</option>
                  <option value="Writing">Writing</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-ink hover:bg-focus-600 text-paper px-3 py-2 rounded-lg transition-colors flex items-center justify-center shrink-0 h-[38px] w-[38px] shadow-sm animate-fade-in"
                aria-label="Add Task"
              >
                <Plus size={18} />
              </button>
            </div>
          </form>

          {/* Task List Header and Optimizer */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-xl text-ink">Task list</h2>
              <span className="text-xs text-ink2 font-mono">
                {doneTasksCount} of {tasks.length} done
              </span>
            </div>

            <button
              onClick={optimizeTasks}
              disabled={isOptimizing || tasks.length === 0}
              className="inline-flex items-center gap-2 bg-focus-50 border border-focus-100 hover:border-focus-300 text-focus-700 text-xs px-3.5 py-1.5 rounded-full font-medium transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles size={12} className={isOptimizing ? "animate-spin" : ""} />
              {isOptimizing ? "Optimizing..." : "AI Optimize Schedule"}
            </button>
          </div>

          {/* Shuffling Loading State Overlay */}
          <div className="relative min-h-[150px]">
            {isOptimizing && (
              <div className="absolute inset-0 bg-paper/60 backdrop-blur-[1px] z-10 rounded-xl flex items-center justify-center transition-all duration-300">
                <div className="flex items-center gap-2 bg-surface border border-line px-4 py-2.5 rounded-full text-xs text-focus-700 shadow-md">
                  <Sparkles size={14} className="animate-spin text-focus-600 shrink-0" />
                  {optimizeStatus}
                </div>
              </div>
            )}

            {tasks.length === 0 ? (
              <div className="bg-surface border border-line rounded-xl p-12 text-center text-ink2">
                No tasks planned for today. Add a plan using the form above!
              </div>
            ) : allTasksDone ? (
              /* Mindful Complete Empty State */
              <div className="bg-surface border border-line rounded-xl2 p-8 text-center shadow-sm animate-fade-in">
                <div className="w-12 h-12 bg-focus-50 rounded-full flex items-center justify-center mx-auto mb-3 text-focus-600">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-display text-lg text-ink mb-1">Circadian cycle complete</h3>
                <p className="text-xs text-ink2 mb-5 max-w-sm mx-auto leading-relaxed">
                  You've checked off every focus item planned for today. Take a breath and reflect — or prepare tomorrow's first goal below.
                </p>
                <button
                  type="button"
                  onClick={() => document.getElementById("new-task-input")?.focus()}
                  className="inline-flex items-center gap-1.5 text-xs text-focus-750 bg-focus-50 border border-focus-100 hover:border-focus-200 px-4 py-2 rounded-full font-medium transition-colors"
                >
                  <Plus size={12} /> Prep tomorrow's first plan
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((t) => (
                  <TaskCard
                    key={t.id}
                    task={t}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    isMoved={recentlyMovedTasks.includes(t.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
