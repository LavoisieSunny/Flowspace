import { Check, Zap, BatteryMedium, BatteryLow, Trash2 } from "lucide-react";

const energyMeta = {
  high: { icon: Zap, label: "High energy", color: "text-amber-600" },
  medium: { icon: BatteryMedium, label: "Medium energy", color: "text-focus-500" },
  low: { icon: BatteryLow, label: "Low energy", color: "text-ink2" },
};

export default function TaskCard({ task, onToggle, onDelete }) {
  const meta = energyMeta[task.energy];
  const Icon = meta.icon;

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border border-line bg-surface transition-opacity ${
        task.done ? "opacity-50" : ""
      }`}
    >
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.done ? "Mark task as not done" : "Mark task as done"}
        className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
          task.done ? "bg-focus-500 border-focus-500 text-paper" : "border-line hover:border-focus-500"
        }`}
      >
        {task.done && <Check size={14} strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm text-ink ${task.done ? "line-through" : ""}`}>{task.title}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-ink2 bg-paper border border-line px-2 py-0.5 rounded-full">
            {task.tag}
          </span>
          <span className={`text-xs flex items-center gap-1 ${meta.color}`}>
            <Icon size={12} /> {meta.label}
          </span>
        </div>
      </div>

      <span className="font-mono text-xs text-ink2 shrink-0 mr-1">{task.minutes}m</span>

      {onDelete && (
        <button
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
          className="p-1.5 text-ink2 hover:text-red-500 rounded-full hover:bg-paper border border-transparent hover:border-line transition-colors shrink-0"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}
