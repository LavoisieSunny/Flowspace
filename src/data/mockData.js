export const todayTasks = [
  { id: 1, title: "Draft UI kit for onboarding flow", energy: "high", minutes: 50, done: true, tag: "Design" },
  { id: 2, title: "Review pull request from Priya", energy: "medium", minutes: 20, done: true, tag: "Dev" },
  { id: 3, title: "Write copy for pricing page", energy: "medium", minutes: 35, done: false, tag: "Writing" },
  { id: 4, title: "Prep slides for Thursday standup", energy: "low", minutes: 15, done: false, tag: "Admin" },
  { id: 5, title: "Deep work: checkout redesign", energy: "high", minutes: 90, done: false, tag: "Design" },
  { id: 6, title: "Reply to client feedback thread", energy: "low", minutes: 10, done: false, tag: "Admin" },
];

export const weekFocus = [
  { day: "Mon", minutes: 145, target: 180 },
  { day: "Tue", minutes: 210, target: 180 },
  { day: "Wed", minutes: 95, target: 180 },
  { day: "Thu", minutes: 175, target: 180 },
  { day: "Fri", minutes: 230, target: 180 },
  { day: "Sat", minutes: 60, target: 120 },
  { day: "Sun", minutes: 40, target: 120 },
];

export const energyByHour = [
  { hour: "7a", energy: 40 },
  { hour: "9a", energy: 78 },
  { hour: "11a", energy: 92 },
  { hour: "1p", energy: 55 },
  { hour: "3p", energy: 48 },
  { hour: "5p", energy: 65 },
  { hour: "7p", energy: 38 },
  { hour: "9p", energy: 22 },
];

export const tagBreakdown = [
  { tag: "Design", minutes: 420, color: "#2F6F5E" },
  { tag: "Dev", minutes: 260, color: "#7FAE9E" },
  { tag: "Writing", minutes: 150, color: "#D98A3D" },
  { tag: "Admin", minutes: 90, color: "#CFE3DC" },
];

export const insights = [
  {
    id: 1,
    title: "Your focus peaks between 9–11am",
    body: "Across the last 14 days, deep-work sessions started in this window ran 34% longer before the first interruption. Consider moving your hardest task here tomorrow.",
    kind: "pattern",
  },
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

export const streak = { current: 5, longest: 9 };
