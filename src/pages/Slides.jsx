import { useRef } from "react";
import { Circle, Play, ShieldAlert, Sparkles, TrendingUp, Zap, HelpCircle } from "lucide-react";
import FocusRing from "../components/FocusRing";

export default function Slides() {
  const slideRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const scrollToSlide = (index) => {
    slideRefs[index].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-ink min-h-screen pb-20 print:pb-0 print:bg-white">
      {/* Interactive Control Banner (Hidden on Print) */}
      <div className="bg-surface/95 backdrop-blur border-b border-line sticky top-16 z-30 py-4 px-6 no-print shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-lg text-ink flex items-center gap-2">
              <Sparkles size={16} className="text-focus-500 animate-pulse" />
              Flowspace Presentation Slide Deck
            </h2>
            <p className="text-xs text-ink2 mt-0.5">
              Press <kbd className="bg-paper border border-line px-1 rounded font-mono text-[10px] font-bold">Ctrl + P</kbd> to export this deck as a premium PDF.
            </p>
          </div>

          {/* Jump Navigation */}
          <div className="flex items-center gap-1.5 bg-paper p-1 rounded-lg border border-line">
            <span className="text-[10px] text-ink2 uppercase tracking-wider px-2 font-mono">Jump:</span>
            {[1, 2, 3, 4, 5, 6].map((num, i) => (
              <button
                key={num}
                onClick={() => scrollToSlide(i)}
                className="w-7 h-7 flex items-center justify-center rounded text-xs font-mono font-medium text-ink2 hover:bg-surface hover:text-ink border border-transparent hover:border-line transition-all"
              >
                {num}
              </button>
            ))}
          </div>

          {/* Print Guidelines */}
          <div className="text-xs text-ink2 flex flex-col gap-1 border-l border-line pl-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-focus-500"></span>
              <span>Layout: <strong className="text-ink">Landscape</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-focus-500"></span>
              <span>Options: <strong className="text-ink">Check "Background graphics"</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-focus-500"></span>
              <span>Headers/Footers: <strong className="text-ink">Uncheck "Headers and footers"</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Stack Container */}
      <div className="flex flex-col items-center gap-8 py-8 print:py-0 print:gap-0">
        
        {/* Slide 1: Cover Title */}
        <div
          ref={slideRefs[0]}
          id="slide-1"
          className="slide bg-paper text-ink p-12 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-display text-xl">
              <Circle size={18} strokeWidth={3} className="text-focus-500" />
              Flowspace
            </div>
            <span className="font-mono text-[10px] text-ink2 uppercase tracking-widest bg-surface border border-line px-3 py-1 rounded-full">
              Theme: Business & Productivity
            </span>
          </div>

          <div className="grid grid-cols-12 gap-8 items-center my-auto">
            <div className="col-span-7">
              <p className="text-xs font-mono text-focus-600 uppercase tracking-widest mb-4">
                Frontend Battle 2026 Submission
              </p>
              <h1 className="font-display text-5xl leading-[1.05] text-ink mb-6">
                Flowspace — An Energy-Centric Focus Copilot
              </h1>
              <p className="text-sm text-ink2 max-w-lg leading-relaxed">
                A design-forward task management and deep work assistant that aligns productivity goals with biological energy peak times rather than arbitrary, flat lists.
              </p>
            </div>
            <div className="col-span-5 flex justify-center">
              <div className="bg-surface border border-line rounded-xl2 p-6 shadow-sm">
                <FocusRing progress={0.68} label="34:12" sublabel="Deep work session" size={170} stroke={12} />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-line pt-4 text-xs text-ink2">
            <div>
              <span className="font-medium text-ink">Github:</span> github.com/user/flowspace
              <span className="mx-2">|</span>
              <span className="font-medium text-ink">Vercel:</span> flowspace-demo.vercel.app
            </div>
            <div className="font-mono text-[10px]">01 / 06</div>
          </div>
        </div>

        {/* Slide 2: Problem Statement */}
        <div
          ref={slideRefs[1]}
          id="slide-2"
          className="slide bg-paper text-ink p-12 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-display text-2xl text-ink">01. The Problem Statement</h2>
            <span className="font-mono text-[10px] text-ink2 uppercase tracking-widest">Circadian Paradox</span>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto items-center">
            <div className="col-span-7 space-y-4">
              <h3 className="font-display text-xl text-ink leading-snug">
                Traditional productivity lists ignore our natural human limitations.
              </h3>
              <p className="text-xs text-ink2 leading-relaxed">
                To-do lists treat our energy at 9:00 AM and 3:00 PM identically. This encourages users to schedule heavy cognitive tasks (like strategic planning or design) during inevitable slumps, leading to procrastination, rescheduling, and anxiety.
              </p>
              <div className="bg-surface border border-line rounded-lg p-4 flex gap-3.5">
                <ShieldAlert className="text-amber-500 shrink-0" size={18} />
                <p className="text-[11px] text-ink2 leading-relaxed">
                  <strong>The Interruptive Landscape:</strong> With instant-message communication constant, focus time is fragmented. Workers are forced to context-switch constantly without real-time boundaries or reflection loops.
                </p>
              </div>
            </div>

            <div className="col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-surface border border-line p-4 rounded-xl">
                <div className="font-display text-2xl text-ink">23</div>
                <div className="text-[10px] text-ink2 mt-1">Avg. workday interruptions</div>
              </div>
              <div className="bg-surface border border-line p-4 rounded-xl">
                <div className="font-display text-2xl text-ink">2.1×</div>
                <div className="text-[10px] text-ink2 mt-1">Tasks rescheduled before finish</div>
              </div>
              <div className="bg-surface border border-line p-4 rounded-xl">
                <div className="font-display text-2xl text-ink">11:00a</div>
                <div className="text-[10px] text-ink2 mt-1">Circadian focus energy peak</div>
              </div>
              <div className="bg-surface border border-line p-4 rounded-xl">
                <div className="font-display text-2xl text-ink">31%</div>
                <div className="text-[10px] text-ink2 mt-1">Deep work actually achieved</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-line pt-4 text-xs text-ink2">
            <span>Frontend Battle 2026</span>
            <span className="font-mono text-[10px]">02 / 06</span>
          </div>
        </div>

        {/* Slide 3: Proposed Solution */}
        <div
          ref={slideRefs[2]}
          id="slide-3"
          className="slide bg-paper text-ink p-12 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-display text-2xl text-ink">02. Proposed Solution</h2>
            <span className="font-mono text-[10px] text-ink2 uppercase tracking-widest">Mindful Rhythm</span>
          </div>

          <div className="my-auto">
            <p className="text-sm text-ink2 mb-6 max-w-xl">
              Flowspace replaces the infinite to-do list with a mindful <strong>three-part daily loop</strong> that shifts focus from volume to cognitive compatibility.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-surface border border-line p-5 rounded-xl2 flex flex-col justify-between h-48">
                <div>
                  <span className="font-mono text-xs text-focus-600 block mb-2">01 — PLAN</span>
                  <h4 className="font-display text-base text-ink mb-1">Circadian Matching</h4>
                </div>
                <p className="text-[11px] text-ink2 leading-relaxed">
                  Tasks are categorized by energy cost (High/Medium/Low). The application groups priority items into biological peak energy windows.
                </p>
              </div>

              <div className="bg-surface border border-line p-5 rounded-xl2 flex flex-col justify-between h-48">
                <div>
                  <span className="font-mono text-xs text-focus-600 block mb-2">02 — FOCUS</span>
                  <h4 className="font-display text-base text-ink mb-1">Single-Task Immersion</h4>
                </div>
                <p className="text-[11px] text-ink2 leading-relaxed">
                  Instead of displaying an overwhelming stack of tasks, the dashboard exposes exactly *one* task at a time paired with a physical focus timer.
                </p>
              </div>

              <div className="bg-surface border border-line p-5 rounded-xl2 flex flex-col justify-between h-48">
                <div>
                  <span className="font-mono text-xs text-focus-600 block mb-2">03 — REFLECT</span>
                  <h4 className="font-display text-base text-ink mb-1">Actionable Patterns</h4>
                </div>
                <p className="text-[11px] text-ink2 leading-relaxed">
                  At end-of-day, instead of rewriting items, users check logs indicating peak focus hours, distraction averages, and task velocity.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-line pt-4 text-xs text-ink2">
            <span>Flowspace — Plan, Focus, Reflect</span>
            <span className="font-mono text-[10px]">03 / 06</span>
          </div>
        </div>

        {/* Slide 4: UI/UX Craftsmanship */}
        <div
          ref={slideRefs[4]}
          id="slide-4"
          className="slide bg-paper text-ink p-12 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-display text-2xl text-ink">03. UI/UX Craftsmanship</h2>
            <span className="font-mono text-[10px] text-ink2 uppercase tracking-widest">Premium Aesthetics</span>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto items-center">
            <div className="col-span-6 space-y-4">
              <h3 className="font-display text-lg text-ink leading-snug">
                Designed for calm, tactile focus — escaping the generic cream/terracotta AI app mold.
              </h3>
              <ul className="space-y-2 text-xs text-ink2">
                <li className="flex items-start gap-2">
                  <span className="text-focus-500 font-bold shrink-0">·</span>
                  <span><strong>Warm Paper Base:</strong> Using `#F7F7F5` rather than high-contrast white to reduce fatigue during extended work sessions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-focus-500 font-bold shrink-0">·</span>
                  <span><strong>Circadian Typography:</strong> Serif headers (*Fraunces*) create an editorial, slower pacing; monospace digits (*IBM Plex Mono*) offer data precision.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-focus-500 font-bold shrink-0">·</span>
                  <span><strong>Intentional Animation:</strong> Easing curves on the Focus Ring (`stroke-dashoffset` transition) reflect visual weight and calm movement.</span>
                </li>
              </ul>
            </div>

            <div className="col-span-6 space-y-3.5">
              <div className="bg-surface border border-line rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-ink2 tracking-wider">Accent Palette</div>
                  <div className="flex gap-2 mt-2">
                    <span className="w-6 h-6 rounded bg-[#2F6F5E] border border-line" title="Teal Accent"></span>
                    <span className="w-6 h-6 rounded bg-[#14231F] border border-line" title="Ink Body"></span>
                    <span className="w-6 h-6 rounded bg-[#D98A3D] border border-line" title="Streak/Energy"></span>
                    <span className="w-6 h-6 rounded bg-[#F7F7F5] border border-line" title="Paper BG"></span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-focus-600 block">Low eye strain</span>
                  <span className="text-[10px] text-ink2">Curated HSL values</span>
                </div>
              </div>

              <div className="bg-surface border border-line rounded-xl p-4 flex gap-4 items-center">
                <div className="flex-1">
                  <span className="text-xs font-medium text-ink block">Unified Interface Primitive</span>
                  <p className="text-[10px] text-ink2 mt-1 leading-snug">
                    The SVG Radial Focus Ring transitions seamlessly between Landing Demo, Active Workspace Timer, and Analytics readouts.
                  </p>
                </div>
                <div className="bg-paper p-2 rounded-lg border border-line shrink-0">
                  <div className="w-10 h-10 rounded-full border-2 border-focus-500 border-t-transparent animate-spin"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-line pt-4 text-xs text-ink2">
            <span>Visual Design & Accessibility Rubric</span>
            <span className="font-mono text-[10px]">04 / 06</span>
          </div>
        </div>

        {/* Slide 5: Tech Stack & Implementation */}
        <div
          ref={slideRefs[3]}
          id="slide-5"
          className="slide bg-paper text-ink p-12 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-display text-2xl text-ink">04. Tech Stack & Implementation</h2>
            <span className="font-mono text-[10px] text-ink2 uppercase tracking-widest">Stack Architecture</span>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto items-center">
            <div className="col-span-5 space-y-4">
              <div className="bg-surface border border-line p-4 rounded-xl2">
                <div className="font-mono text-[11px] text-focus-600 font-bold uppercase tracking-wider mb-2">Core Framework</div>
                <h4 className="font-display text-base text-ink">React 19 & Vite</h4>
                <p className="text-[10px] text-ink2 mt-1 leading-relaxed">
                  Leveraging React 19 concurrent features and Vite's super-fast bundling to deliver sub-100ms interface rendering.
                </p>
              </div>

              <div className="bg-surface border border-line p-4 rounded-xl2">
                <div className="font-mono text-[11px] text-focus-600 font-bold uppercase tracking-wider mb-2">Routing Strategy</div>
                <h4 className="font-display text-base text-ink">HashRouter Protocol</h4>
                <p className="text-[10px] text-ink2 mt-1 leading-relaxed">
                  Configured with client-side hash routing, allowing the entire build to run serverless and deploy statically without route rewrites.
                </p>
              </div>
            </div>

            <div className="col-span-7 space-y-3.5">
              <div className="bg-surface border border-line p-5 rounded-xl2">
                <h4 className="font-display text-base text-ink mb-3">Interactive Technical Architecture</h4>
                <div className="grid grid-cols-2 gap-4 text-[11px] text-ink2">
                  <div className="border-l-2 border-focus-500 pl-3">
                    <strong className="text-ink">Tailwind CSS System:</strong> Custom config extensions mapping tokens (`paper`, `surface`, `ink`) to tailwind dynamic classes.
                  </div>
                  <div className="border-l-2 border-focus-500 pl-3">
                    <strong className="text-ink">Recharts Visuals:</strong> High performance SVG chart nodes that adjust fluidly to device size changes.
                  </div>
                  <div className="border-l-2 border-focus-500 pl-3">
                    <strong className="text-ink">Print CSS Core:</strong> Clean `@media print` rules setting static slide container sizing (`297mm x 167mm`) and isolating slide contents.
                  </div>
                  <div className="border-l-2 border-focus-500 pl-3">
                    <strong className="text-ink">State Consistency:</strong> Centralized mock schema models structured to adapt easily to backend JSON APIs.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-line pt-4 text-xs text-ink2">
            <span>React 19 / Vite / Tailwind / Recharts</span>
            <span className="font-mono text-[10px]">05 / 06</span>
          </div>
        </div>

        {/* Slide 6: Expected Impact & Future Roadmap */}
        <div
          ref={slideRefs[5]}
          id="slide-6"
          className="slide bg-paper text-ink p-12 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-display text-2xl text-ink">06. Expected Impact & Future Scope</h2>
            <span className="font-mono text-[10px] text-ink2 uppercase tracking-widest">Future Scope</span>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto items-center">
            <div className="col-span-6 space-y-4">
              <h3 className="font-display text-lg text-ink">Anticipated Impact</h3>
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <Zap className="text-[#D98A3D] shrink-0 mt-0.5" size={16} />
                  <div>
                    <strong className="text-xs text-ink block">Cognitive Relief</strong>
                    <p className="text-[10px] text-ink2 mt-0.5">
                      Lowers burnout risk by matching cognitive tasks to appropriate circadian windows.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="text-[#2F6F5E] shrink-0 mt-0.5" size={16} />
                  <div>
                    <strong className="text-xs text-ink block">Deep Work Expansion</strong>
                    <p className="text-[10px] text-ink2 mt-0.5">
                      Allows developers/designers to log 45+ min extra deep work daily via single-task UI.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-6">
              <div className="bg-surface border border-line p-5 rounded-xl2">
                <h3 className="font-display text-base text-ink mb-3.5">Future Feature Roadmap</h3>
                <ul className="space-y-3 text-[10px] text-ink2">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-focus-600 font-bold">1.</span>
                    <span><strong>Biometric Sync:</strong> Interface with Apple Health / Oura APIs to alter task prioritization based on HRV and recovery scores.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-focus-600 font-bold">2.</span>
                    <span><strong>Calendar Integration:</strong> Sync with Google/Outlook calendars to block deep slots automatically around circadian peaks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-focus-600 font-bold">3.</span>
                    <span><strong>Ambient Desktop Widget:</strong> Launch mini menu-bar widgets to keep focus timers accessible without browser clutter.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-line pt-4 text-xs text-ink2">
            <span>Flowspace Roadmap & Scale Potential</span>
            <span className="font-mono text-[10px]">06 / 06</span>
          </div>
        </div>

      </div>
    </div>
  );
}
