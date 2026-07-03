import { useState, useEffect, useRef } from "react";

export default function FocusRing({
  size = 220,
  stroke = 14,
  progress = 0.68,
  label,
  sublabel,
  accent = "#2F6F5E",
  track = "#E4E2DC",
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  const [justCompleted, setJustCompleted] = useState(false);
  const prevProgress = useRef(progress);

  useEffect(() => {
    if (progress >= 1 && prevProgress.current < 1) {
      setJustCompleted(true);
      const timer = setTimeout(() => setJustCompleted(false), 1200);
      return () => clearTimeout(timer);
    }
    prevProgress.current = progress;
  }, [progress]);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        justCompleted ? "motion-safe:animate-ring-pulse" : ""
      }`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={accent}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {label && <span className="font-mono text-2xl md:text-3xl text-ink tracking-tight">{label}</span>}
        {sublabel && <span className="text-xs text-ink2 mt-1">{sublabel}</span>}
      </div>
    </div>
  );
}
