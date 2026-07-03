import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import FocusRing from "../components/FocusRing";
import { useApp } from "../context/AppContext";

const tooltipStyle = {
  background: "#FFFFFF",
  border: "1px solid #E4E2DC",
  borderRadius: 8,
  fontSize: 12,
  color: "#14231F",
};

export default function Analytics() {
  const {
    chronotype,
    setChronotype,
    weekFocus,
    tagBreakdown,
    getEnergyData,
  } = useApp();

  const energyData = getEnergyData();
  const totalMinutes = tagBreakdown.reduce((s, t) => s + t.minutes, 0);

  return (
    <div className="container-page py-12 md:py-16">
      {/* Dynamic Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-focus-600 font-medium mb-2">Analytics</p>
          <h1 className="font-display text-3xl md:text-4xl text-ink">Your last 7 days.</h1>
        </div>
        
        {/* Circadian Chronotype Selector */}
        <div className="flex items-center gap-2 bg-surface border border-line rounded-full px-4 py-2 text-sm shadow-sm">
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

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Weekly focus bar chart */}
        <div className="md:col-span-2 bg-surface border border-line rounded-xl2 p-6 shadow-sm">
          <h2 className="font-display text-lg text-ink mb-1">Focus minutes vs. target</h2>
          <p className="text-xs text-ink2 mb-6">Wednesday and the weekend lag behind your target band.</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weekFocus} barGap={4}>
              <CartesianGrid vertical={false} stroke="#E4E2DC" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#5B655F" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#5B655F" }} width={32} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#EAF3F0" }} />
              <Bar dataKey="target" fill="#E4E2DC" radius={[4, 4, 0, 0]} />
              <Bar dataKey="minutes" fill="#2F6F5E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Completion ring */}
        <div className="bg-surface border border-line rounded-xl2 p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <FocusRing
            progress={Math.min(1, totalMinutes / 1200)}
            label={`${Math.round((totalMinutes / 1200) * 100)}%`}
            sublabel="of weekly focus goal"
            size={150}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Energy line chart */}
        <div className="md:col-span-2 bg-surface border border-line rounded-xl2 p-6 shadow-sm">
          <h2 className="font-display text-lg text-ink mb-1">Energy by hour</h2>
          <p className="text-xs text-ink2 mb-6">Self-reported energy, averaged over the last 14 days.</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={energyData}>
              <CartesianGrid vertical={false} stroke="#E4E2DC" />
              <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#5B655F" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#5B655F" }} width={32} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="energy" stroke="#D98A3D" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tag breakdown */}
        <div className="bg-surface border border-line rounded-xl2 p-6 shadow-sm">
          <h2 className="font-display text-lg text-ink mb-4">Where time went</h2>
          <div className="space-y-4">
            {tagBreakdown.map((t) => (
              <div key={t.tag}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-ink">{t.tag}</span>
                  <span className="font-mono text-ink2">{t.minutes}m</span>
                </div>
                <div className="h-2 rounded-full bg-paper overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${totalMinutes > 0 ? (t.minutes / totalMinutes) * 100 : 0}%`, backgroundColor: t.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
