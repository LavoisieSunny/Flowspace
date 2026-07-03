import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import SubjectCard from "../components/SubjectCard";
import { BookOpen, Sparkles, TrendingUp } from "lucide-react";

export default function Subjects() {
  const { subjects, startTopicQuiz } = useApp();
  const navigate = useNavigate();

  const handleStartQuiz = (subjectId, topicId) => {
    startTopicQuiz(subjectId, topicId);
    navigate(`/tutor?subject=${subjectId}&topic=${topicId}`);
  };

  const getLowestMasteryTopic = () => {
    let lowest = { name: "N/A", value: 1.0, subjectName: "" };
    subjects.forEach((subj) => {
      subj.topics.forEach((topic) => {
        if (topic.mastery < lowest.value) {
          lowest = { name: topic.name, value: topic.mastery, subjectName: subj.name };
        }
      });
    });
    return lowest;
  };

  const weakest = getLowestMasteryTopic();

  return (
    <div className="container-page py-12 md:py-16">
      {/* Top Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-ink2 font-mono block mb-1">academic index</span>
          <h1 className="font-display text-3xl md:text-4xl text-ink font-bold">Study Tracker</h1>
        </div>

        {/* Dynamic Focus Callout */}
        {weakest.value < 1.0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-xs text-amber-800 max-w-sm flex items-start gap-2.5">
            <TrendingUp size={16} className="shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Action Item</span>
              <span>Your lowest topic is <strong>{weakest.name}</strong> ({weakest.subjectName}) at {Math.round(weakest.value * 100)}% mastery. Try a quiz to bump it up.</span>
            </div>
          </div>
        )}
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subj) => (
          <SubjectCard key={subj.id} subject={subj} onStartQuiz={handleStartQuiz} />
        ))}
      </div>
    </div>
  );
}
