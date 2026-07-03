import { Link } from "react-router-dom";
import { Calendar, Sparkles, BookOpen, GraduationCap } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, YAxis } from "recharts";

export default function SubjectCard({ subject, onStartQuiz }) {
  const today = new Date("2026-07-04");
  const exam = new Date(subject.examDate);
  const daysToExam = Math.max(0, Math.ceil((exam - today) / (1000 * 60 * 60 * 24)));

  const averageMastery = Math.round(
    (subject.topics.reduce((sum, t) => sum + t.mastery, 0) / subject.topics.length) * 100
  );

  return (
    <div className="bg-surface border border-line rounded-xl2 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
      {/* Subject Top Color Bar margin */}
      <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: subject.color }}></div>

      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display text-xl text-ink font-semibold">{subject.name}</h3>
            <span className="text-xs text-ink2 flex items-center gap-1 mt-1 font-mono">
              <Calendar size={12} /> {subject.examDate} ({daysToExam}d remaining)
            </span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-display font-bold" style={{ color: subject.color }}>
              {averageMastery}%
            </span>
            <span className="text-[10px] text-ink2 block uppercase tracking-wider font-mono">mastery</span>
          </div>
        </div>

        {/* Recharts Mastery Trend Sparkline */}
        <div className="bg-paper rounded-lg p-3 border border-line mb-5">
          <div className="flex justify-between items-center text-[10px] text-ink2 uppercase font-mono mb-2">
            <span>Mastery Trend</span>
            <span>Last 5 sessions</span>
          </div>
          <div className="h-[50px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={subject.history}>
                <Line
                  type="monotone"
                  dataKey="mastery"
                  stroke={subject.color}
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
                <YAxis domain={[0, 100]} hide />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Topic List */}
        <div className="space-y-4">
          <div className="text-[10px] text-ink2 uppercase tracking-wider font-bold">Topics & Mastery</div>
          {subject.topics.map((t) => (
            <div key={t.id} className="text-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-ink flex items-center gap-1">
                  <BookOpen size={10} style={{ color: subject.color }} />
                  {t.name}
                </span>
                <span className="font-mono text-ink2 font-semibold">
                  {Math.round(t.mastery * 100)}%
                </span>
              </div>
              
              {/* Mastery bar */}
              <div className="h-2 rounded-full bg-paper border border-line overflow-hidden flex justify-between items-center relative">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${t.mastery * 100}%`,
                    backgroundColor: subject.color,
                  }}
                />
              </div>

              {/* Action buttons per topic */}
              <div className="flex items-center gap-2.5 mt-1.5 justify-end">
                <Link
                  to={`/tutor?subject=${subject.id}&topic=${t.id}`}
                  className="text-[10px] text-ink2 hover:text-ink underline hover:no-underline font-mono"
                >
                  Ask Tutor
                </Link>
                <span className="text-line text-[9px] font-mono">·</span>
                <button
                  onClick={() => onStartQuiz(subject.id, t.id)}
                  className="text-[10px] text-focus-700 hover:text-ink flex items-center gap-0.5 font-mono"
                  style={{ color: subject.color }}
                >
                  <GraduationCap size={11} /> Test me
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
