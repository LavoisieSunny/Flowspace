import { Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ToastContainer() {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none no-print">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto bg-surface border border-ink text-xs font-mono font-semibold px-4 py-3 rounded-lg shadow-md flex items-center gap-2 animate-text-reveal border-b-2 border-r-2"
          style={{ borderColor: "#1C1C1A" }}
        >
          <Sparkles size={13} className="text-indigo-500 shrink-0 animate-pulse" />
          <span className="flex-1 text-ink">{t.text}</span>
        </div>
      ))}
    </div>
  );
}
