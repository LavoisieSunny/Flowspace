import { Sparkles, TrendingUp, Bell, PartyPopper } from "lucide-react";
import { useApp } from "../context/AppContext";

const kindMeta = {
  pattern: { icon: TrendingUp, label: "Pattern spotted" },
  nudge: { icon: Bell, label: "Worth a nudge" },
  encouragement: { icon: PartyPopper, label: "Keep going" },
};

export default function Insights() {
  const { chronotype, setChronotype, getInsights } = useApp();
  const insightsList = getInsights();

  return (
    <div className="container-page py-12 md:py-16">
      {/* Dynamic Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.2em] uppercase text-focus-600 font-medium mb-2 flex items-center gap-2">
            <Sparkles size={14} /> AI Insights
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-ink">
            What your last two weeks are telling you.
          </h1>
          <p className="mt-4 text-ink2 text-sm leading-relaxed">
            Flowspace looks for patterns across your focus sessions, task history, and
            energy check-ins — then surfaces the ones worth acting on. No dashboards to
            dig through, just the two or three things that matter this week.
          </p>
        </div>

        {/* Circadian Chronotype Selector */}
        <div className="flex items-center gap-2 bg-surface border border-line rounded-full px-4 py-2 text-sm shadow-sm shrink-0">
          <span className="text-ink2 font-medium">Chronotype:</span>
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
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {insightsList.map(({ id, title, body, kind }) => {
          const { icon: Icon, label } = kindMeta[kind];
          return (
            <div key={id} className="bg-surface border border-line rounded-xl2 p-6 flex flex-col shadow-sm">
              <div className="flex items-center gap-2 text-xs text-focus-600 font-medium mb-4">
                <Icon size={14} />
                {label}
              </div>
              <h3 className="font-display text-lg text-ink mb-2">{title}</h3>
              <p className="text-sm text-ink2 leading-relaxed">{body}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 bg-focus-50 border border-focus-100 rounded-xl2 p-6 flex items-start gap-4">
        <Sparkles size={18} className="text-focus-600 shrink-0 mt-0.5" />
        <p className="text-sm text-focus-700">
          Insights update automatically as you complete focus sessions and tasks —
          this panel is a live read of your Dashboard and Analytics activity, not a
          separate report to check.
        </p>
      </div>
    </div>
  );
}
