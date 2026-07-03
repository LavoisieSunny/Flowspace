import { useRef } from "react";
import { Circle, Play, ShieldAlert, Sparkles, TrendingUp, Zap, Compass, CheckCircle } from "lucide-react";

export default function Slides() {
  const slideRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const scrollToSlide = (index) => {
    slideRefs[index].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#1C1C1A] min-h-screen pb-20 print:pb-0 print:bg-white text-ink">
      {/* Action Banner (Hidden on Print) */}
      <div className="bg-surface/95 backdrop-blur border-b border-line sticky top-16 z-30 py-4 px-6 no-print shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-base text-ink font-bold flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-500 animate-pulse" />
              StudyOS Submission Slide Deck
            </h2>
            <p className="text-[11px] text-ink2 mt-0.5">
              Press <kbd className="bg-paper border border-line px-1.5 py-0.5 rounded font-mono text-[9px] font-bold">Ctrl + P</kbd> or click the button to save as a PDF.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Jump Navigation */}
            <div className="flex items-center gap-1.5 bg-paper p-1 rounded-lg border border-line">
              <span className="text-[9px] text-ink2 uppercase tracking-wider px-2 font-mono font-bold">Jump:</span>
              {[1, 2, 3, 4, 5, 6, 7].map((num, i) => (
                <button
                  key={num}
                  onClick={() => scrollToSlide(i)}
                  className="w-7 h-7 flex items-center justify-center rounded text-xs font-mono font-bold text-ink2 hover:bg-surface hover:text-ink border border-transparent hover:border-line transition-all"
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={() => window.print()}
              className="bg-ink hover:bg-opacity-80 text-paper text-xs px-4 py-2 rounded-full font-bold shadow-sm"
            >
              Print / Save PDF
            </button>
          </div>

          {/* Export Settings */}
          <div className="text-[10px] text-ink2 flex flex-col gap-0.5 border-l border-line pl-4 font-mono font-semibold">
            <div>• Layout: <strong className="text-ink">Landscape</strong></div>
            <div>• Graphics: <strong className="text-ink">Check "Background graphics"</strong></div>
            <div>• Chrome: <strong className="text-ink">Uncheck "Headers and footers"</strong></div>
          </div>
        </div>
      </div>

      {/* Slide Stack Container */}
      <div className="slides-deck flex flex-col items-center gap-8 py-8 print:py-0 print:gap-0">
        
        {/* Slide 1: Cover Title */}
        <div
          ref={slideRefs[0]}
          id="slide-1"
          className="slide bg-paper p-12 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold tracking-tight">StudyOS</span>
            <span className="font-mono text-[9px] text-ink2 uppercase tracking-widest bg-surface border border-line px-3 py-1 rounded-full font-bold">
              Frontend Battle 2026 Submission
            </span>
          </div>

          <div className="grid grid-cols-12 gap-8 items-center my-auto">
            <div className="col-span-8">
              <span className="text-[10px] font-mono text-indigo-600 uppercase tracking-widest mb-3 block font-bold">Category: Education & Learning</span>
              <h1 className="font-display text-4xl md:text-5xl leading-[1.05] text-ink font-bold mb-6">
                StudyOS — The AI-Powered Revision Copilot
              </h1>
              <p className="text-sm text-ink2 max-w-xl leading-relaxed">
                A tactile, highly personalized study companion that organizes fragmented subjects, exams, and weak points into one daily prioritized revision queue.
              </p>
            </div>
            <div className="col-span-4 flex justify-end">
              {/* Notebook Card Visual */}
              <div className="bg-surface border border-line rounded-xl2 p-6 w-full max-w-[240px] shadow-sm relative rotate-2">
                <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500"></div>
                <div className="font-mono text-[9px] text-indigo-600 uppercase font-bold mb-1">mitosis quiz</div>
                <div className="font-display text-base text-ink font-semibold mb-3 leading-snug">Metaphase alignment check</div>
                <div className="space-y-1.5 mb-2">
                  <div className="text-[10px] bg-green-50 border border-green-200 text-green-700 px-2 py-1 rounded flex justify-between items-center font-mono">
                    <span>Metaphase</span>
                    <CheckCircle size={10} />
                  </div>
                  <div className="text-[10px] border border-line text-ink2 px-2 py-1 rounded font-mono">
                    <span>Anaphase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-line pt-4 text-xs text-ink2 font-mono">
            <div>
              <span className="font-bold text-ink">Github:</span>{" "}
              <a
                href="https://github.com/LavoisieSunny/Flowspace"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline hover:text-indigo-800 transition-colors"
              >
                github.com/LavoisieSunny/Flowspace
              </a>
              <span className="mx-2">|</span>
              <span className="font-bold text-ink">Vercel:</span>{" "}
              <a
                href="https://flowspace-01.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline hover:text-indigo-800 transition-colors"
              >
                flowspace-01.vercel.app
              </a>
            </div>
            <div className="font-bold">01 / 07</div>
          </div>
        </div>

        {/* Slide 2: Problem Statement */}
        <div
          ref={slideRefs[1]}
          id="slide-2"
          className="slide bg-paper p-12 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-display text-xl text-ink font-bold">01. The Problem Statement</h2>
            <span className="font-mono text-[9px] text-ink2 uppercase tracking-widest font-bold">Cognitive Gridlock</span>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto items-center">
            <div className="col-span-7 space-y-4">
              <h3 className="font-display text-lg text-ink font-semibold leading-snug">
                Students spend more time selecting *what* to study than actually *revising*.
              </h3>
              <p className="text-xs text-ink2 leading-relaxed">
                Standard calendars and study lists treat all topics equally, ignoring the fact that exam proximity (urgency) and the student's personal weaknesses (mastery gap) change daily. When studying is unprioritized, effort is wasted on strong subjects, leading to exam-week panic.
              </p>
              <div className="bg-surface border border-line rounded-lg p-4 flex gap-3.5 notebook-margin">
                <ShieldAlert className="text-red-500 shrink-0" size={18} />
                <p className="text-[11px] text-ink2 leading-relaxed">
                  <strong>The Mastery Blindspot:</strong> Without immediate feedback or active self-testing loops, students fall victim to the "fluency illusion" — thinking they know a topic simply because they reread notes, only to fail in practice mock exams.
                </p>
              </div>
            </div>

            <div className="col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-surface border border-line p-4 rounded-xl shadow-sm">
                <div className="font-display text-2xl text-ink font-bold">64%</div>
                <div className="text-[9px] text-ink2 uppercase tracking-wider font-mono font-bold mt-1">Study time spent unprioritized</div>
              </div>
              <div className="bg-surface border border-line p-4 rounded-xl shadow-sm">
                <div className="font-display text-2xl text-ink font-bold">2.4 hrs</div>
                <div className="text-[9px] text-ink2 uppercase tracking-wider font-mono font-bold mt-1">Wasted daily on the fluency illusion</div>
              </div>
              <div className="bg-surface border border-line p-4 rounded-xl shadow-sm">
                <div className="font-display text-2xl text-ink font-bold">78%</div>
                <div className="text-[9px] text-ink2 uppercase tracking-wider font-mono font-bold mt-1">Students report exam prep anxiety</div>
              </div>
              <div className="bg-surface border border-line p-4 rounded-xl shadow-sm">
                <div className="font-display text-2xl text-ink font-bold">12h / wk</div>
                <div className="text-[9px] text-ink2 uppercase tracking-wider font-mono font-bold mt-1">Average revision time per subject</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-line pt-4 text-xs text-ink2 font-mono">
            <span>StudyOS — Calibrated Learning</span>
            <span className="font-bold">02 / 07</span>
          </div>
        </div>

        {/* Slide 3: Proposed Solution */}
        <div
          ref={slideRefs[2]}
          id="slide-3"
          className="slide bg-paper p-12 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-display text-xl text-ink font-bold">02. Proposed Solution</h2>
            <span className="font-mono text-[9px] text-ink2 uppercase tracking-widest font-bold">Plan • Study • Review</span>
          </div>

          <div className="my-auto">
            <p className="text-xs text-ink2 mb-6 max-w-xl">
              StudyOS replaces chaotic timetables with a structured, step-by-step learning sequence that aligns cognitive effort with actual exam demands.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-surface border border-line p-5 rounded-xl2 flex flex-col justify-between h-48 shadow-sm">
                <div>
                  <span className="font-mono text-xs text-indigo-600 block mb-2 font-bold">STEP 01 — PRIORITIZE</span>
                  <h4 className="font-display text-base text-ink font-semibold mb-1">Urgency & Mastery Planner</h4>
                </div>
                <p className="text-[11px] text-ink2 leading-relaxed">
                  Calculates a daily focus list by automatically ranking topics based on days-to-exam and current mastery scores.
                </p>
              </div>

              <div className="bg-surface border border-line p-5 rounded-xl2 flex flex-col justify-between h-48 shadow-sm">
                <div>
                  <span className="font-mono text-xs text-indigo-600 block mb-2 font-bold">STEP 02 — SYNTHESIZE</span>
                  <h4 className="font-display text-base text-ink font-semibold mb-1">AI Analogical Tutor</h4>
                </div>
                <p className="text-[11px] text-ink2 leading-relaxed">
                  Streams custom conceptual explanations using analogies (like comparing mitosis to cell packing) rather than dry textbook definitions.
                </p>
              </div>

              <div className="bg-surface border border-line p-5 rounded-xl2 flex flex-col justify-between h-48 shadow-sm">
                <div>
                  <span className="font-mono text-xs text-indigo-600 block mb-2 font-bold">STEP 03 — CALIBRATE</span>
                  <h4 className="font-display text-base text-ink font-semibold mb-1">Diagnostic Quiz Verification</h4>
                </div>
                <p className="text-[11px] text-ink2 leading-relaxed">
                  Runs multiple-choice checks with instant ticks, crosses, and explanations, applying a permanent mastery boost upon perfect completion.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-line pt-4 text-xs text-ink2 font-mono">
            <span>Numbered Core Process Framework</span>
            <span className="font-bold">03 / 07</span>
          </div>
        </div>

        {/* Slide 4: UI/UX Craftsmanship */}
        <div
          ref={slideRefs[3]}
          id="slide-4"
          className="slide bg-paper p-12 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-display text-xl text-ink font-bold">03. UI/UX Craftsmanship</h2>
            <span className="font-mono text-[9px] text-ink2 uppercase tracking-widest font-bold">Tactile Study System</span>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto items-center">
            <div className="col-span-6 space-y-4">
              <h3 className="font-display text-lg text-ink font-semibold leading-snug">
                Designed to mirror physical study materials — notebooks, index cards, and highlighters.
              </h3>
              <ul className="space-y-2 text-xs text-ink2">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold shrink-0">•</span>
                  <span><strong>Manila Notepad Card Base:</strong> Styled using background color `#FAF9F5` and ruler gridlines to invoke a physical writing pad feel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold shrink-0">•</span>
                  <span><strong>Academic Typography:</strong> *Space Grotesk* for structured timetable grids, *Outfit* for body paragraphs, and *JetBrains Mono* for exact counters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold shrink-0">•</span>
                  <span><strong>Highlighter Marker Accent:</strong> Integrates soft yellow highlights (`#FEF08A`) to emphasize active links and key learning blocks.</span>
                </li>
              </ul>
            </div>

            <div className="col-span-6 space-y-3.5">
              <div className="bg-surface border border-line rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div>
                  <div className="text-[9px] font-mono uppercase text-ink2 tracking-wider font-bold">Visual Design Tokens</div>
                  <div className="flex gap-2 mt-2">
                    <span className="w-6 h-6 rounded bg-[#FAF9F5] border border-line" title="Manila Paper BG"></span>
                    <span className="w-6 h-6 rounded bg-[#FEF08A] border border-line" title="Highlighter Yellow"></span>
                    <span className="w-6 h-6 rounded bg-[#1C1C1A] border border-line" title="Graphite Ink"></span>
                    <span className="w-6 h-6 rounded bg-[#3B82F6] border border-line" title="Math Blue"></span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-indigo-600 font-bold block">No standard templates</span>
                  <span className="text-[10px] text-ink2 font-medium">Bespoke study identity</span>
                </div>
              </div>

              <div className="bg-surface border border-line rounded-xl p-4 flex gap-4 items-center shadow-sm">
                <div className="flex-1">
                  <span className="text-xs font-semibold text-ink block">Celebratory Micro-Interactions</span>
                  <p className="text-[10px] text-ink2 mt-1 leading-snug">
                    Includes check-off scale pulses, card border flashes, and progress completions designed to reward task check-off.
                  </p>
                </div>
                <div className="w-10 h-10 rounded bg-[#FEF08A] flex items-center justify-center font-bold text-lg select-none border border-line">
                  ✏️
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-line pt-4 text-xs text-ink2 font-mono">
            <span>Visual Consistency & Accessibility Rubric</span>
            <span className="font-bold">04 / 07</span>
          </div>
        </div>

        {/* Slide 5: Tech Stack & Feasibility */}
        <div
          ref={slideRefs[4]}
          id="slide-5"
          className="slide bg-paper p-12 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-display text-xl text-ink font-bold">04. Tech Stack & Implementation</h2>
            <span className="font-mono text-[9px] text-ink2 uppercase tracking-widest font-bold">Zero-Backend SPA</span>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto items-center">
            <div className="col-span-5 space-y-4">
              <div className="bg-surface border border-line p-4 rounded-xl2 shadow-sm">
                <div className="font-mono text-[10px] text-indigo-600 font-bold uppercase tracking-wider mb-2">Framework & Routing</div>
                <h4 className="font-display text-sm text-ink font-bold">React 19, Vite & HashRouter</h4>
                <p className="text-[10px] text-ink2 mt-1 leading-relaxed">
                  Built on React 19 and client-side hash routing, letting the prototype deploy serverless on any hosting service.
                </p>
              </div>

              <div className="bg-surface border border-line p-4 rounded-xl2 shadow-sm">
                <div className="font-mono text-[10px] text-indigo-600 font-bold uppercase tracking-wider mb-2">State Engine</div>
                <h4 className="font-display text-sm text-ink font-bold">Shared React Context Provider</h4>
                <p className="text-[10px] text-ink2 mt-1 leading-relaxed">
                  Coordinates tasks, masteries, history logs, and quiz selections. State changes update Recharts graphs dynamically.
                </p>
              </div>
            </div>

            <div className="col-span-7 space-y-3.5">
              <div className="bg-surface border border-line p-5 rounded-xl2 shadow-sm">
                <h4 className="font-display text-sm text-ink font-bold mb-3">Live Interactive Engineering</h4>
                <div className="grid grid-cols-2 gap-4 text-[11px] text-ink2">
                  <div className="border-l-2 border-indigo-500 pl-3">
                    <strong className="text-ink">Recharts Analytics:</strong> Plots subject mastery sparklines and history curves in real-time.
                  </div>
                  <div className="border-l-2 border-indigo-500 pl-3">
                    <strong className="text-ink">Web Audio Synth:</strong> Browser synthesizers generate background audio without downloading assets.
                  </div>
                  <div className="border-l-2 border-indigo-500 pl-3">
                    <strong className="text-ink">Print CSS Profiles:</strong> Restructures screen layout to landscape slides during print mode.
                  </div>
                  <div className="border-l-2 border-indigo-500 pl-3">
                    <strong className="text-ink">Streaming Chat:</strong> Text reveals word-by-word with typing indicators.
                  </div>
                </div>

                {/* Real-world Callout */}
                <div className="mt-4 pt-3 border-t border-line text-[10px] text-indigo-700 flex items-center gap-1.5 font-mono font-bold">
                  <Sparkles size={12} className="text-indigo-600 shrink-0" />
                  <span>Interactive Prototype: The daily scheduler, streaming tutor, and MCQ tests are fully operational in the live build.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-line pt-4 text-xs text-ink2 font-mono">
            <span>React 19 / Recharts / Tailwind CSS</span>
            <span className="font-bold">05 / 07</span>
          </div>
        </div>

        {/* Slide 6: Expected Impact & Future Vision */}
        <div
          ref={slideRefs[5]}
          id="slide-6"
          className="slide bg-paper p-12 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-display text-xl text-ink font-bold">05. Expected Impact & Future Scope</h2>
            <span className="font-mono text-[9px] text-ink2 uppercase tracking-widest font-bold">Future Scope</span>
          </div>

          <div className="grid grid-cols-12 gap-8 my-auto items-center">
            <div className="col-span-6 space-y-4">
              <h3 className="font-display text-base text-ink font-bold">Anticipated Impact</h3>
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <Zap className="text-indigo-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <strong className="text-xs text-ink block">Cognitive Relief</strong>
                    <p className="text-[10px] text-ink2 mt-0.5 leading-relaxed">
                      Saves an average of 25 minutes of planning overhead daily, allowing users to shift focus directly to revision.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="text-indigo-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <strong className="text-xs text-ink block">Retention Performance Boost</strong>
                    <p className="text-[10px] text-ink2 mt-0.5 leading-relaxed">
                      Active recall quizzes and spaced repetition alerts are projected to yield a +22% score growth in mock exams.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-6">
              <div className="bg-surface border border-line p-5 rounded-xl2 shadow-sm">
                <h3 className="font-display text-sm text-ink font-bold mb-3">Future Feature Roadmap</h3>
                <ul className="space-y-3 text-[10px] text-ink2 font-medium leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-indigo-600 font-bold">1.</span>
                    <span><strong>Spaced Repetition Integration:</strong> Integrate flashcard decks with automatic spaced-repetition schedules.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-indigo-600 font-bold">2.</span>
                    <span><strong>LMS Calendar Integrations:</strong> Synchronize classroom schedules, exam timetables, and homework dates automatically.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-indigo-600 font-bold">3.</span>
                    <span><strong>Peer Study Rooms:</strong> Support virtual revision groups to benchmark mastery progress against peer averages.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-line pt-4 text-xs text-ink2 font-mono">
            <span>StudyOS Roadmap & Scalability Potential</span>
            <span className="font-bold">06 / 07</span>
          </div>
        </div>

        {/* Slide 7: Reference Links */}
        <div
          ref={slideRefs[6]}
          id="slide-7"
          className="slide bg-paper p-12 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-display text-xl text-ink font-bold">06. Prototype & Codebase Access</h2>
            <span className="font-mono text-[9px] text-ink2 uppercase tracking-widest font-bold">Access Links</span>
          </div>

          <div className="grid grid-cols-2 gap-8 my-auto">
            {/* Vercel Card */}
            <a
              href="https://flowspace-01.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface border border-line rounded-xl2 p-6 hover:border-indigo-500 transition-all flex flex-col justify-between h-44 shadow-sm group"
            >
              <div>
                <span className="text-[10px] font-mono text-indigo-600 uppercase tracking-widest block mb-2 font-bold">Live Demonstration</span>
                <h4 className="font-display text-lg text-ink font-bold group-hover:text-indigo-600 transition-colors">Deployed Web Application</h4>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-ink2 font-mono">flowspace-01.vercel.app</span>
                <span className="text-xs text-indigo-600 font-bold font-mono">Launch Prototype →</span>
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/LavoisieSunny/Flowspace"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface border border-line rounded-xl2 p-6 hover:border-indigo-500 transition-all flex flex-col justify-between h-44 shadow-sm group"
            >
              <div>
                <span className="text-[10px] font-mono text-indigo-600 uppercase tracking-widest block mb-2 font-bold">Open Source Repository</span>
                <h4 className="font-display text-lg text-ink font-bold group-hover:text-indigo-600 transition-colors">GitHub Source Code</h4>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-ink2 font-mono">github.com/LavoisieSunny/Flowspace</span>
                <span className="text-xs text-indigo-600 font-bold font-mono">View Codebase →</span>
              </div>
            </a>
          </div>

          <div className="flex justify-between items-center border-t border-line pt-4 text-xs text-ink2 font-mono">
            <span>StudyOS Deployed Prototype References</span>
            <span className="font-bold">07 / 07</span>
          </div>
        </div>

      </div>
    </div>
  );
}
