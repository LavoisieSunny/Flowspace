import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const initialSubjects = [
  {
    id: "math",
    name: "Mathematics",
    color: "#3B82F6", // Graphite Blue
    examDate: "2026-07-16",
    history: [
      { session: "S1", mastery: 48 },
      { session: "S2", mastery: 50 },
      { session: "S3", mastery: 52 },
      { session: "S4", mastery: 55 },
      { session: "S5", mastery: 57 },
    ],
    topics: [
      { id: "calc", name: "Calculus & Derivatives", mastery: 0.4 },
      { id: "trig", name: "Trigonometric Identities", mastery: 0.75 },
      { id: "prob", name: "Probability Distribution", mastery: 0.55 },
    ],
  },
  {
    id: "chem",
    name: "Chemistry",
    color: "#EC4899", // Crimson Pink
    examDate: "2026-07-22",
    history: [
      { session: "S1", mastery: 35 },
      { session: "S2", mastery: 40 },
      { session: "S3", mastery: 42 },
      { session: "S4", mastery: 45 },
      { session: "S5", mastery: 48 },
    ],
    topics: [
      { id: "org", name: "Organic Synthesis", mastery: 0.35 },
      { id: "acid", name: "Acid-Base Equilibria", mastery: 0.6 },
      { id: "thermo", name: "Thermodynamics", mastery: 0.8 },
    ],
  },
  {
    id: "bio",
    name: "Biology",
    color: "#10B981", // Mint Green
    examDate: "2026-07-18",
    history: [
      { session: "S1", mastery: 65 },
      { session: "S2", mastery: 67 },
      { session: "S3", mastery: 70 },
      { session: "S4", mastery: 72 },
      { session: "S5", mastery: 75 },
    ],
    topics: [
      { id: "cell", name: "Mitosis & Cell Division", mastery: 0.85 },
      { id: "gene", name: "Genetics & Inheritance", mastery: 0.5 },
      { id: "sys", name: "Human Nervous System", mastery: 0.45 },
    ],
  },
  {
    id: "phys",
    name: "Physics",
    color: "#8B5CF6", // Violet Purple
    examDate: "2026-07-12",
    history: [
      { session: "S1", mastery: 40 },
      { session: "S2", mastery: 45 },
      { session: "S3", mastery: 43 },
      { session: "S4", mastery: 48 },
      { session: "S5", mastery: 53 },
    ],
    topics: [
      { id: "mech", name: "Classical Mechanics", mastery: 0.9 },
      { id: "elec", name: "Electromagnetism", mastery: 0.3 },
      { id: "quantum", name: "Quantum Phenomena", mastery: 0.4 },
    ],
  },
];

// Canned AI Tutor responses
const tutorKnowledgeBase = {
  calc: {
    explanation: "Think of a **derivative** as a car's instantaneous speedometer. It doesn't tell you how far you've traveled (that's integration), but exactly how fast your position is changing at that precise microsecond. In calculus, we calculate this rate of change by taking the limit of average velocity as the time interval approaches zero.",
    quiz: [
      {
        question: "What is the derivative of f(x) = x^2 with respect to x?",
        options: ["x", "2x", "x^2", "2"],
        answer: 1,
        rationale: "Using the power rule: d/dx [x^n] = n * x^(n-1). For x^2, it becomes 2 * x^1, which is 2x.",
      },
      {
        question: "What does a negative second derivative represent about a graph?",
        options: ["The graph is increasing", "The graph is concave down", "The graph is concave up", "The graph has a local minimum"],
        answer: 1,
        rationale: "The second derivative measures concavity. If it is negative, the rate of change is decreasing, meaning the curve bends downwards (concave down).",
      },
    ],
  },
  org: {
    explanation: "Organic synthesis is essentially structural Lego. We build complex carbon molecules by reacting electron-rich sources (**nucleophiles**, like lone pairs or double bonds) with electron-deficient targets (**electrophiles**, like carbonyl carbons). The secret is mapping polarities to predict exactly where bonds will form.",
    quiz: [
      {
        question: "Which functional group is characterized by a carbon-oxygen double bond?",
        options: ["Alcohol", "Carbonyl", "Ether", "Alkane"],
        answer: 1,
        rationale: "A carbonyl group (C=O) is the structural cornerstone of aldehydes, ketones, carboxylic acids, and esters.",
      },
      {
        question: "What is the main nucleophile in an addition reaction to a carbonyl?",
        options: ["An electron-deficient group", "An electron-rich group", "A neutral alkane", "A proton donor"],
        answer: 1,
        rationale: "Nucleophiles are electron-pair donors ('nucleus lovers') that seek out positive or partially positive centers.",
      },
    ],
  },
  cell: {
    explanation: "Mitosis is how somatic cells clone themselves. Think of it as a tightly choreographed cell division dance in 4 phases: **Prophase** (packing the genetic suitcases), **Metaphase** (lining up neatly in the middle), **Anaphase** (pulling chromosome pairs apart), and **Telophase** (unboxing and rebuilding two new nuclei).",
    quiz: [
      {
        question: "During which phase of mitosis do sister chromatids separate and move towards opposite poles?",
        options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
        answer: 2,
        rationale: "During Anaphase, proteins binding sister chromatids are cleaved, allowing spindle fibers to pull them to opposite sides.",
      },
      {
        question: "What is the role of spindle fibers in cell division?",
        options: ["To synthesize proteins", "To replicate DNA", "To align and pull chromosomes", "To dissolve the nuclear envelope"],
        answer: 2,
        rationale: "Spindle fibers are microtubules that attach to chromosome kinetochores to physically relocate DNA.",
      },
    ],
  },
  elec: {
    explanation: "Electromagnetism ties current and fields together. A moving electrical charge produces a magnetic field (Ampere's Law). Conversely, a changing magnetic flux induces an electromotive force and electrical current (Faraday's Law of Induction). It proves electricity and magnetism are two sides of the same coin.",
    quiz: [
      {
        question: "What physical law relates a changing magnetic field to an induced voltage?",
        options: ["Coulomb's Law", "Faraday's Law", "Ohm's Law", "Ampere's Law"],
        answer: 1,
        rationale: "Faraday's Law states the induced electromotive force in a closed circuit is equal to the negative rate of change of magnetic flux.",
      },
      {
        question: "What does Lenz's Law determine about induced current?",
        options: ["Its magnitude", "Its resistance", "Its direction of magnetic opposition", "Its thermal dissipation"],
        answer: 2,
        rationale: "Lenz's Law states the direction of an induced current is always such that its magnetic field opposes the change in flux that created it.",
      },
    ],
  },
};

export function AppProvider({ children }) {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [sessions, setSessions] = useState([]);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizeStatus, setOptimizeStatus] = useState("");
  const [chatHistory, setChatHistory] = useState({});
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (text) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Re-prioritize today's study plan
  const regeneratePlan = () => {
    setIsOptimizing(true);
    setOptimizeStatus("Scanning exam timetables...");

    setTimeout(() => {
      setOptimizeStatus("Analyzing mastery weaknesses...");
    }, 400);

    setTimeout(() => {
      // Prioritize: nearest exam first, then lowest mastery topic
      const allTopics = [];
      subjects.forEach((subj) => {
        const today = new Date("2026-07-04");
        const exam = new Date(subj.examDate);
        const daysToExam = Math.max(0, Math.ceil((exam - today) / (1000 * 60 * 60 * 24)));

        subj.topics.forEach((topic) => {
          allTopics.push({
            id: `${subj.id}-${topic.id}`,
            subjectId: subj.id,
            subjectName: subj.name,
            color: subj.color,
            daysToExam,
            topicId: topic.id,
            topicName: topic.name,
            mastery: topic.mastery,
          });
        });
      });

      // Sort by urgency, then weak mastery
      allTopics.sort((a, b) => {
        if (a.daysToExam !== b.daysToExam) {
          return a.daysToExam - b.daysToExam;
        }
        return a.mastery - b.mastery;
      });

      // Package top 5 as today's plan
      const topFive = allTopics.slice(0, 5).map((t, idx) => ({
        id: idx + 1,
        subjectId: t.subjectId,
        subjectName: t.subjectName,
        color: t.color,
        topicId: t.topicId,
        topicName: t.topicName,
        minutes: t.mastery < 0.5 ? 45 : 30, // 45m for weak topics, 30m for moderate
        urgency: t.daysToExam <= 7 ? "Urgent" : t.daysToExam <= 14 ? "Medium" : "Planned",
        daysToExam: t.daysToExam,
        done: false,
      }));

      setSessions(topFive);
      setIsOptimizing(false);
      setOptimizeStatus("");
      addToast("AI Plan regenerated: 5 prioritized targets aligned.");
    }, 900);
  };

  // Complete session and increment mastery
  const completeSession = (id) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextDone = !s.done;
          if (nextDone) {
            addToast(`${s.topicName} marked complete! +5% mastery.`);
          } else {
            addToast(`${s.topicName} unchecked.`);
          }
          // Increment mastery on subject
          setSubjects((prevSubjects) =>
            prevSubjects.map((subj) => {
              if (subj.id === s.subjectId) {
                const nextTopics = subj.topics.map((t) => {
                  if (t.id === s.topicId) {
                    const newMastery = Math.min(1.0, t.mastery + 0.05);
                    return { ...t, mastery: newMastery };
                  }
                  return t;
                });

                // Calculate updated average mastery for Recharts trend
                const avgMastery = Math.round(
                  (nextTopics.reduce((sum, t) => sum + t.mastery, 0) / nextTopics.length) * 100
                );

                const nextHistory = [...subj.history];
                nextHistory.push({
                  session: `S${nextHistory.length + 1}`,
                  mastery: avgMastery,
                });

                return { ...subj, topics: nextTopics, history: nextHistory };
              }
              return subj;
            })
          );
          return { ...s, done: nextDone };
        }
        return s;
      })
    );
  };

  // Manual Session add
  const addSession = (subjectId, topicName, minutes) => {
    const subj = subjects.find((s) => s.id === subjectId);
    if (!subj) return;
    const newSession = {
      id: Date.now(),
      subjectId,
      subjectName: subj.name,
      color: subj.color,
      topicId: "custom",
      topicName,
      minutes: parseInt(minutes) || 30,
      urgency: "Planned",
      daysToExam: 10,
      done: false,
    };
    setSessions((prev) => [newSession, ...prev]);
    addToast(`Scheduled target: ${topicName}`);
  };

  // Delete manual/prioritized session
  const deleteSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    addToast("Revision target removed.");
  };

  // Handle Tutor Chat Queries
  const sendTutorMessage = (subjectId, topicId, text) => {
    const key = `${subjectId}-${topicId}`;
    const userMsg = { id: Date.now(), sender: "student", text };
    
    setChatHistory((prev) => {
      const hist = prev[key] || [];
      return { ...prev, [key]: [...hist, userMsg] };
    });

    // Simulate AI thinking & streaming response
    const topicData = tutorKnowledgeBase[topicId] || {
      explanation: `That's an interesting question about ${topicId}. Let's examine the foundational concepts. First, we define its core mechanics, followed by how it interacts with secondary variables in this subject. Let's practice.`,
    };

    setTimeout(() => {
      const fullText = topicData.explanation;
      const placeholderId = Date.now() + 1;
      
      // Add empty message for streaming
      setChatHistory((prev) => {
        const hist = prev[key] || [];
        return {
          ...prev,
          [key]: [...hist, { id: placeholderId, sender: "ai", text: "", isStreaming: true }],
        };
      });

      // Stream words
      const words = fullText.split(" ");
      let currentWordIndex = 0;
      let streamedText = "";

      const interval = setInterval(() => {
        if (currentWordIndex < words.length) {
          streamedText += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
          setChatHistory((prev) => {
            const hist = prev[key] || [];
            return {
              ...prev,
              [key]: hist.map((m) =>
                m.id === placeholderId ? { ...m, text: streamedText } : m
              ),
            };
          });
          currentWordIndex++;
        } else {
          clearInterval(interval);
          setChatHistory((prev) => {
            const hist = prev[key] || [];
            return {
              ...prev,
              [key]: hist.map((m) =>
                m.id === placeholderId ? { ...m, isStreaming: false } : m
              ),
            };
          });
        }
      }, 50); // Speed of streaming
    }, 600);
  };

  // Start Quiz
  const startTopicQuiz = (subjectId, topicId) => {
    const topicData = tutorKnowledgeBase[topicId];
    if (!topicData || !topicData.quiz) return;
    
    // Choose first question
    setActiveQuiz({
      subjectId,
      topicId,
      questionIndex: 0,
      selectedChoice: null,
      score: 0,
      questions: topicData.quiz,
      completed: false,
    });
  };

  // Answer Quiz Option
  const selectQuizChoice = (index) => {
    if (!activeQuiz || activeQuiz.selectedChoice !== null) return;
    
    const isCorrect = index === activeQuiz.questions[activeQuiz.questionIndex].answer;
    const nextScore = activeQuiz.score + (isCorrect ? 1 : 0);

    setActiveQuiz((prev) => ({
      ...prev,
      selectedChoice: index,
      score: nextScore,
    }));
  };

  // Go to Next Quiz Question
  const advanceQuiz = () => {
    if (!activeQuiz) return;
    const nextIndex = activeQuiz.questionIndex + 1;
    if (nextIndex < activeQuiz.questions.length) {
      setActiveQuiz((prev) => ({
        ...prev,
        questionIndex: nextIndex,
        selectedChoice: null,
      }));
    } else {
      // Completed, reward mastery if perfect score
      const finalScore = activeQuiz.score;
      const totalQuestions = activeQuiz.questions.length;
      addToast(`Quiz finished: Score ${finalScore}/${totalQuestions}`);
      if (finalScore === totalQuestions) {
        addToast("Perfect score! Mastery reward +8% applied.");
        setSubjects((prevSubjects) =>
          prevSubjects.map((subj) => {
            if (subj.id === activeQuiz.subjectId) {
              const nextTopics = subj.topics.map((t) => {
                if (t.id === activeQuiz.topicId) {
                  return { ...t, mastery: Math.min(1.0, t.mastery + 0.08) }; // High reward for quiz
                }
                return t;
              });
              return { ...subj, topics: nextTopics };
            }
            return subj;
          })
        );
      }

      setActiveQuiz((prev) => ({
        ...prev,
        completed: true,
      }));
    }
  };

  const closeQuiz = () => {
    setActiveQuiz(null);
  };

  // Initialize plan on startup if empty
  if (sessions.length === 0 && !isOptimizing) {
    const defaultPlan = [];
    initialSubjects.forEach((subj) => {
      subj.topics.forEach((topic) => {
        if (topic.mastery < 0.6 && defaultPlan.length < 5) {
          defaultPlan.push({
            id: defaultPlan.length + 1,
            subjectId: subj.id,
            subjectName: subj.name,
            color: subj.color,
            topicId: topic.id,
            topicName: topic.name,
            minutes: 30,
            urgency: "Planned",
            daysToExam: 10,
            done: false,
          });
        }
      });
    });
    setSessions(defaultPlan);
  }

  // Derive dynamic insights from active state
  const getDerivedInsights = () => {
    const list = [];
    
    // Insight 1: Near exams
    subjects.forEach((subj) => {
      const today = new Date("2026-07-04");
      const exam = new Date(subj.examDate);
      const days = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
      
      const weakTopics = subj.topics.filter(t => t.mastery < 0.5);
      if (days <= 10 && weakTopics.length > 0) {
        list.push({
          id: `insight-exam-${subj.id}`,
          title: `Exam in ${days} days: ${subj.name}`,
          body: `You have ${weakTopics.length} topics below 50% mastery (e.g. ${weakTopics[0].name}). Prioritize these in your next study cycle.`,
          kind: "nudge",
        });
      }
    });

    // Insight 2: Forecast completion
    const doneCount = sessions.filter(s => s.done).length;
    const percent = sessions.length > 0 ? (doneCount / sessions.length) * 100 : 0;
    
    let forecastText = "At this rate, you'll finish today's AI revision block by 6:00 PM.";
    if (percent === 100) {
      forecastText = "Fantastic! You've achieved 100% of today's study goal. You are ahead of schedule.";
    } else if (percent > 50) {
      forecastText = "Excellent progress. You're on track to wrap up your planned reviews early this evening.";
    }

    list.push({
      id: "insight-forecast",
      title: "Revision Velocity Forecast",
      body: forecastText,
      kind: "forecast",
    });

    // Insight 3: Mastery spikes
    subjects.forEach((subj) => {
      const currentAvg = Math.round(
        (subj.topics.reduce((sum, t) => sum + t.mastery, 0) / subj.topics.length) * 100
      );
      const startAvg = subj.history[0].mastery;
      if (currentAvg > startAvg) {
        list.push({
          id: `insight-spike-${subj.id}`,
          title: `${subj.name} Mastery is rising`,
          body: `Your composite mastery has grown from ${startAvg}% to ${currentAvg}% across revision sessions. Mitosis & Cell Division is your strongest topic.`,
          kind: "encouragement",
        });
      }
    });

    // Fallback if empty
    if (list.length < 2) {
      list.push({
        id: "insight-basic",
        title: "Copilot Calibrated",
        body: "All subjects are locked in. Flow analytics will populate here as you check off items in your Daily Planner.",
        kind: "pattern",
      });
    }

    return list;
  };

  return (
    <AppContext.Provider
      value={{
        subjects,
        sessions,
        hasOnboarded,
        setHasOnboarded,
        isOptimizing,
        optimizeStatus,
        chatHistory,
        activeQuiz,
        regeneratePlan,
        completeSession,
        addSession,
        deleteSession,
        toasts,
        addToast,
        sendTutorMessage,
        startTopicQuiz,
        selectQuizChoice,
        advanceQuiz,
        closeQuiz,
        getDerivedInsights,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
