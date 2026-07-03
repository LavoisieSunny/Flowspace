import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Sparkles, MessageCircle, Send, Play, Check, X, ArrowRight, GraduationCap } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Tutor() {
  const {
    subjects,
    chatHistory,
    activeQuiz,
    sendTutorMessage,
    startTopicQuiz,
    selectQuizChoice,
    advanceQuiz,
    closeQuiz,
  } = useApp();

  const [searchParams, setSearchParams] = useSearchParams();
  const subjectParam = searchParams.get("subject") || subjects[0]?.id;
  const topicParam = searchParams.get("topic") || subjects[0]?.topics[0]?.id;

  const [activeSubjId, setActiveSubjId] = useState(subjectParam);
  const [activeTopicId, setActiveTopicId] = useState(topicParam);
  const [inputText, setInputText] = useState("");

  const chatEndRef = useRef(null);

  // Sync state from query parameters on navigation
  useEffect(() => {
    if (searchParams.get("subject")) setActiveSubjId(searchParams.get("subject"));
    if (searchParams.get("topic")) setActiveTopicId(searchParams.get("topic"));
  }, [searchParams]);

  // Scroll to bottom of chat when messages change
  const currentChatKey = `${activeSubjId}-${activeTopicId}`;
  const messages = chatHistory[currentChatKey] || [];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const activeSubj = subjects.find((s) => s.id === activeSubjId) || subjects[0];
  const activeTopic = activeSubj?.topics.find((t) => t.id === activeTopicId) || activeSubj?.topics[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendTutorMessage(activeSubjId, activeTopicId, inputText);
    setInputText("");
  };

  const triggerPrompt = (promptText) => {
    sendTutorMessage(activeSubjId, activeTopicId, promptText);
  };

  // Update query params when changing dropdowns
  const handleSubjectChange = (id) => {
    setActiveSubjId(id);
    const firstTopic = subjects.find((s) => s.id === id)?.topics[0]?.id || "";
    setActiveTopicId(firstTopic);
    setSearchParams({ subject: id, topic: firstTopic });
    closeQuiz();
  };

  const handleTopicChange = (id) => {
    setActiveTopicId(id);
    setSearchParams({ subject: activeSubjId, topic: id });
    closeQuiz();
  };

  return (
    <div className="container-page py-12 md:py-16">
      {/* Top Header Selector */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-line pb-6 mb-8">
        <div className="flex items-center gap-3">
          <GraduationCap size={28} className="text-ink shrink-0" />
          <div>
            <h1 className="font-display text-2xl text-ink font-bold leading-none">AI Study Tutor</h1>
            <span className="text-[10px] text-ink2 font-mono uppercase tracking-wider mt-1 block">active topic desk</span>
          </div>
        </div>

        {/* Dropdown Calibrators */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={activeSubjId}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="text-xs bg-surface border border-line rounded-full px-4 py-2 font-semibold text-ink focus:outline-none focus:border-ink cursor-pointer"
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            value={activeTopicId}
            onChange={(e) => handleTopicChange(e.target.value)}
            className="text-xs bg-surface border border-line rounded-full px-4 py-2 font-semibold text-ink focus:outline-none focus:border-ink cursor-pointer"
          >
            {activeSubj?.topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Left Side: Dynamic Chat Workspace */}
        <div className="bg-surface border border-line rounded-xl2 flex flex-col justify-between min-h-[500px] shadow-sm relative">
          
          {/* Active Banner */}
          <div className="border-b border-line px-6 py-4 flex items-center justify-between bg-paper/50 rounded-t-xl2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: activeSubj?.color }} />
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-ink">
                {activeSubj?.name} &gt; {activeTopic?.name}
              </span>
            </div>
            {!activeQuiz && (
              <button
                onClick={() => startTopicQuiz(activeSubjId, activeTopicId)}
                className="inline-flex items-center gap-1.5 bg-ink text-paper text-[10px] px-3.5 py-1.5 rounded-full font-bold hover:bg-opacity-80 transition-all font-mono uppercase shadow-sm"
              >
                <Play size={10} /> Quiz Me
              </button>
            )}
          </div>

          {/* Messages Board */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[400px] ruled-paper">
            {messages.length === 0 ? (
              <div className="text-center py-16 text-ink2 font-serif italic max-w-sm mx-auto">
                No session log yet. Select a prompt chip below or type a query to ask the AI Tutor for explanations.
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "student" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-md p-4 rounded-xl text-xs leading-relaxed border ${
                      m.sender === "student"
                        ? "bg-highlighter/60 border-amber-300 rounded-tr-none text-ink font-medium notebook-margin"
                        : "bg-paper border-line rounded-tl-none text-ink font-mono"
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-wider font-bold block mb-1 opacity-60">
                      {m.sender === "student" ? "Student Query" : "AI Copilot"}
                    </span>
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    {m.isStreaming && (
                      <span className="inline-block w-1.5 h-3 bg-indigo-500 animate-pulse ml-0.5" />
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Prompt Suggestion Chips */}
          <div className="px-6 py-3 border-t border-line flex flex-wrap gap-2 bg-paper/20">
            {[
              "Explain this topic with a simple analogy",
              "Give me a bullet-point study summary",
              "What are common mistakes on this topic?",
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => triggerPrompt(chip)}
                className="text-[10px] bg-surface border border-line text-ink2 hover:text-ink hover:border-ink px-3 py-1.5 rounded-full transition-colors font-medium shadow-sm"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Form Submit */}
          <form onSubmit={handleSend} className="p-4 border-t border-line flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Ask about ${activeTopic?.name}...`}
              required
              className="flex-1 text-xs bg-paper border border-line rounded-lg px-3 py-2.5 text-ink focus:outline-none focus:border-ink"
            />
            <button
              type="submit"
              className="bg-ink hover:bg-opacity-80 text-paper px-4 py-2 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
              aria-label="Send query"
            >
              <Send size={14} />
            </button>
          </form>
        </div>

        {/* Right Side: Quiz Board Overlay */}
        <div className="bg-surface border border-line rounded-xl2 p-6 shadow-sm flex flex-col min-h-[500px]">
          <span className="text-[10px] font-mono text-ink2 uppercase tracking-widest block mb-2 font-bold">concept verification</span>
          <h3 className="font-display text-base text-ink font-semibold mb-4 flex items-center gap-1.5">
            <Sparkles size={16} className="text-indigo-500" />
            AI Knowledge Test
          </h3>

          {!activeQuiz ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-line rounded-xl bg-paper/30">
              <GraduationCap size={36} className="text-ink2 mb-3" />
              <p className="text-xs text-ink font-medium mb-4">
                Ready to verify your understanding?
              </p>
              <button
                onClick={() => startTopicQuiz(activeSubjId, activeTopicId)}
                className="inline-flex items-center gap-1 bg-ink text-paper text-xs px-4 py-2 rounded-full font-bold hover:bg-opacity-85 transition-all shadow-sm"
              >
                Start Topic Quiz
              </button>
            </div>
          ) : activeQuiz.completed ? (
            /* Quiz Score Card */
            <div className="flex-1 flex flex-col justify-between">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center my-auto">
                <div className="text-3xl font-display font-bold text-green-700 mb-2">
                  {activeQuiz.score} / {activeQuiz.questions.length}
                </div>
                <h4 className="text-sm font-semibold text-ink mb-1">Knowledge Test Complete</h4>
                <p className="text-xs text-ink2 leading-relaxed">
                  {activeQuiz.score === activeQuiz.questions.length
                    ? "Perfect score! A +8% mastery boost has been applied to this topic."
                    : "Good effort. Review the explanations on the left to perfect your understanding."}
                </p>
              </div>
              <button
                onClick={closeQuiz}
                className="w-full inline-flex items-center justify-center bg-ink text-paper text-xs py-2.5 rounded-full font-bold hover:bg-opacity-80 transition-all shadow-sm mt-4"
              >
                Close Quiz
              </button>
            </div>
          ) : (
            /* Quiz Active Question Index Card */
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-[10px] font-mono text-ink2 uppercase mb-4">
                  <span>Question {activeQuiz.questionIndex + 1} of {activeQuiz.questions.length}</span>
                  <span className="font-bold">Score: {activeQuiz.score}</span>
                </div>

                <div className="bg-paper border border-line rounded-xl p-4 mb-4">
                  <p className="text-xs font-serif italic text-ink leading-relaxed">
                    "{activeQuiz.questions[activeQuiz.questionIndex].question}"
                  </p>
                </div>

                {/* Multiple Choices */}
                <div className="space-y-2 mb-4">
                  {activeQuiz.questions[activeQuiz.questionIndex].options.map((option, idx) => {
                    const isAnswered = activeQuiz.selectedChoice !== null;
                    const isCorrect = idx === activeQuiz.questions[activeQuiz.questionIndex].answer;
                    const isSelected = idx === activeQuiz.selectedChoice;

                    let btnStyle = "border-line bg-surface hover:border-ink text-ink";
                    if (isAnswered) {
                      if (isCorrect) btnStyle = "bg-green-50 border-green-400 text-green-800 font-medium";
                      else if (isSelected) btnStyle = "bg-red-50 border-red-400 text-red-800 font-medium";
                      else btnStyle = "bg-surface border-line text-ink2 opacity-60";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => selectQuizChoice(idx)}
                        disabled={isAnswered}
                        className={`w-full text-left text-xs p-3 rounded-lg border transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {isAnswered && isCorrect && <Check size={14} className="text-green-600 shrink-0" />}
                        {isAnswered && isSelected && !isCorrect && <X size={14} className="text-red-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Question Rationale explanation */}
                {activeQuiz.selectedChoice !== null && (
                  <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-3.5 text-[11px] text-ink leading-relaxed animate-text-reveal font-mono">
                    <span className="font-bold block text-blue-700 mb-0.5">Explanation</span>
                    {activeQuiz.questions[activeQuiz.questionIndex].rationale}
                  </div>
                )}
              </div>

              {activeQuiz.selectedChoice !== null && (
                <button
                  onClick={advanceQuiz}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-ink text-paper text-xs py-2.5 rounded-full font-bold hover:bg-opacity-80 transition-all shadow-sm mt-4"
                >
                  <span>Next Question</span>
                  <ArrowRight size={12} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
