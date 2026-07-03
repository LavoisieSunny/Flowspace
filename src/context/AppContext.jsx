import { createContext, useContext, useState } from "react";
import { todayTasks as initialTasks, streak as initialStreak, weekFocus as initialWeekFocus, tagBreakdown as initialTagBreakdown } from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [chronotype, setChronotype] = useState("balanced"); // balanced, early-bird, night-owl
  const [tasks, setTasks] = useState(initialTasks);
  const [streak, setStreak] = useState(initialStreak);
  const [weekFocus, setWeekFocus] = useState(initialWeekFocus);
  const [tagBreakdown, setTagBreakdown] = useState(initialTagBreakdown);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Dynamic Energy Data based on Chronotype
  const getEnergyData = () => {
    switch (chronotype) {
      case "early-bird":
        return [
          { hour: "7a", energy: 75 },
          { hour: "9a", energy: 96 },
          { hour: "11a", energy: 88 },
          { hour: "1p", energy: 45 },
          { hour: "3p", energy: 30 },
          { hour: "5p", energy: 40 },
          { hour: "7p", energy: 20 },
          { hour: "9p", energy: 10 },
        ];
      case "night-owl":
        return [
          { hour: "7a", energy: 15 },
          { hour: "9a", energy: 28 },
          { hour: "11a", energy: 42 },
          { hour: "1p", energy: 58 },
          { hour: "3p", energy: 50 },
          { hour: "5p", energy: 72 },
          { hour: "7p", energy: 91 },
          { hour: "9p", energy: 97 },
        ];
      case "balanced":
      default:
        return [
          { hour: "7a", energy: 40 },
          { hour: "9a", energy: 78 },
          { hour: "11a", energy: 92 },
          { hour: "1p", energy: 55 },
          { hour: "3p", energy: 48 },
          { hour: "5p", energy: 65 },
          { hour: "7p", text: "38", energy: 38 },
          { hour: "9p", energy: 22 },
        ];
    }
  };

  // Dynamic Insights based on Chronotype
  const getInsights = () => {
    let peakInsight = {
      id: 1,
      title: "Your focus peaks between 9–11am",
      body: "Across the last 14 days, deep-work sessions started in this window ran 34% longer before the first interruption. Consider moving your hardest task here tomorrow.",
      kind: "pattern",
    };

    if (chronotype === "early-bird") {
      peakInsight = {
        id: 1,
        title: "Morning alertness verified (7–10am)",
        body: "Your focus peaks extremely early. Deep work initiated before 9:00 AM runs 45% longer before the first interruption. Shield your mornings from meetings.",
        kind: "pattern",
      };
    } else if (chronotype === "night-owl") {
      peakInsight = {
        id: 1,
        title: "Evening peak focus logged (7–10pm)",
        body: "Circadian diagnostics show your peak performance occurs in the late evening. Save high-cognitive design and code tasks for after dinner.",
        kind: "pattern",
      };
    }

    return [
      peakInsight,
      {
        id: 2,
        title: "Wednesdays are consistently light",
        body: "Focus time drops by almost half compared to your weekly average. If Wednesday standup runs long, it may be worth protecting the hour right after.",
        kind: "pattern",
      },
      {
        id: 3,
        title: "3 tasks have been rescheduled twice",
        body: "\"Write copy for pricing page\" and two others keep slipping. Breaking them into 20-minute steps tends to help you actually start.",
        kind: "nudge",
      },
      {
        id: 4,
        title: "You're on a 5-day focus streak",
        body: "Nice consistency. Your longest streak this quarter is 9 days — two more and you'll match it.",
        kind: "encouragement",
      },
    ];
  };

  // Task Actions
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextDone = !t.done;
          // Update analytics dynamically
          const timeDiff = t.minutes * (nextDone ? 1 : -1);
          setTagBreakdown((prevTags) =>
            prevTags.map((tagObj) =>
              tagObj.tag === t.tag ? { ...tagObj, minutes: Math.max(0, tagObj.minutes + timeDiff) } : tagObj
            )
          );
          return { ...t, done: nextDone };
        }
        return t;
      })
    );
  };

  const addTask = (title, energy, minutes, tag) => {
    const newTask = {
      id: Date.now(),
      title,
      energy,
      minutes: parseInt(minutes) || 20,
      done: false,
      tag,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => {
      const taskToDelete = prev.find((t) => t.id === id);
      if (taskToDelete && taskToDelete.done) {
        // adjust tag breakdown if done
        setTagBreakdown((prevTags) =>
          prevTags.map((tagObj) =>
            tagObj.tag === taskToDelete.tag
              ? { ...tagObj, minutes: Math.max(0, tagObj.minutes - taskToDelete.minutes) }
              : tagObj
          )
        );
      }
      return prev.filter((t) => t.id !== id);
    });
  };

  // Circadian Sort Task Optimizer
  const optimizeTasks = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setTasks((prev) => {
        const undone = prev.filter((t) => !t.done);
        const done = prev.filter((t) => t.done);

        // Sorting weights by chronotype
        const energyWeight = { high: 3, medium: 2, low: 1 };

        let sortedUndone = [];
        if (chronotype === "early-bird") {
          // High energy first
          sortedUndone = [...undone].sort((a, b) => energyWeight[b.energy] - energyWeight[a.energy]);
        } else if (chronotype === "night-owl") {
          // Low/medium energy first to clear slumps, high energy saved for later
          sortedUndone = [...undone].sort((a, b) => energyWeight[a.energy] - energyWeight[b.energy]);
        } else {
          // Balanced: Medium energy first, then High, then Low
          const balancedWeight = { medium: 3, high: 2, low: 1 };
          sortedUndone = [...undone].sort((a, b) => balancedWeight[b.energy] - balancedWeight[a.energy]);
        }

        return [...sortedUndone, ...done];
      });
      setIsOptimizing(false);
    }, 800);
  };

  return (
    <AppContext.Provider
      value={{
        chronotype,
        setChronotype,
        tasks,
        streak,
        weekFocus,
        tagBreakdown,
        isOptimizing,
        getEnergyData,
        getInsights,
        toggleTask,
        addTask,
        deleteTask,
        optimizeTasks,
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
