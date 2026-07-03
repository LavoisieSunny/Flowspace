# StudyOS — AI-Powered Study Copilot

Built for **Frontend Battle 2026** (Theme: Education & Learning, with an AI-powered angle).

StudyOS is a tactile, zero-friction academic companion that automatically balances your subjects by exam urgency and personal topic weaknesses, keeping your study hours aligned.

---

## 🎯 The Problem

Traditional study planners cause cognitive gridlock. Students spend more time selecting *what* to study than actually *revising*. When study sessions are unprioritized, effort is wasted on strong subjects, leading to exam-week panic and performance anxiety.

StudyOS reframes learning into a structured, three-step loop: **Prioritize, Synthesize, and Calibrate**, ensuring study time is aligned with exam proximity and mastery gaps.

---

## 💻 Visual Showcase & Screenshots

### 1. Landing Page Overview
- Features a before/after narrative on study efficiency.
- Includes an interactive **Priority Simulator** that shuffles and sorts items in the hero.
- Scroll-triggered card reveals introduce the Plan, Focus, and Review sequences.

### 2. Daily Study Planner (`/planner`)
- Displays prioritized daily revision blocks.
- **Productivity Score:** Renders a circular `FocusRing` tracking progress percentages.
- **Canvas Confetti:** Mounts and triggers a particle shower the moment the user checks the final revision task (reaching 100%).
- Includes toast notifications and manual target scheduling.

### 3. AI Analogical Tutor (`/tutor`)
- **Streaming Chat:** Reveals conceptual explanations word-by-word with typing indicators.
- **Diagnostic Quizzes:** Runs active-recall MCQ tests on cards. Correct answers get green checks ✅ and incorrect ones get red crosses ❌, awarding a permanent topic mastery boost on a perfect score.

### 4. Tracker & Trend Analytics (`/subjects`)
- Shows subject profiles, exam countdown indicators, and topic progress sliders.
- Renders **Recharts sparkline graphs** to plot historical composite mastery trends over the last 5 study sessions.

### 5. AI Insights Desk (`/insights`)
- Recalculates dynamic advisory alerts, exam notifications, and velocity forecasts.
- Pulse screen loader skeletons animate during updates.

---

## 🎨 Visual Identity & Design Tokens

StudyOS avoids dry SaaS dashboard motifs in favor of elements inspired by physical study materials:
- **Palette:** Manila Notepad Card background (`#FAF9F5`), graphite pencil ink (`#1C1C1A`), margins (`#E5E3D8`), and neon highlighter accents (`#FEF08A`).
- **Layouts:** Lined paper grids (`.ruled-paper`), notebook margins (`.notebook-margin`), and handwriting styles.
- **Fonts:** Space Grotesk (display headings), Outfit (body paragraphs), and JetBrains Mono (timers and counters).

---

## ⌨️ Global Keyboard Navigation

Navigate the application hands-free using Alt-key shortcuts (automatically ignored when typing in input boxes):
*   `Alt + P` ── Daily Planner
*   `Alt + T` ── AI Tutor & Quizzes
*   `Alt + S` ── Subjects tracker
*   `Alt + I` ── AI Insights
*   `Alt + O` ── Trigger AI Prioritizer Re-plan

---

## 🛠️ Tech Stack

- **Core:** React 19 + Vite
- **Styling:** Tailwind CSS (Custom color and font configuration tokens)
- **Routing:** React Router v7 (`HashRouter` for client-side static page serving)
- **Graphics:** Recharts SVG graphs
- **Icons:** lucide-react

---

## 🚀 Run Locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Build the static site bundle:

```bash
npm run build
npm run preview
```

Outputs compile to `dist/` and can be hosted serverless on Vercel, Netlify, or GitHub Pages.

---

## 📋 Slide Presentation & PDF Export

StudyOS includes a 6-slide landscape presentation deck styled like physical study cards. To export your submission:

1. Open the hosted project or local server.
2. Go to the slides path (e.g. `http://localhost:5173/#/slides` or click the link in the footer).
3. Open the browser print console (`Ctrl + P` or `Cmd + P`).
4. Apply these settings:
   - **Destination:** Save as PDF
   - **Layout:** Landscape
   - **Margins:** None (or Default)
   - **Headers and Footers:** Uncheck (removes URL and page stamps)
   - **Background Graphics:** Check (keeps colors, lines, and custom SVGs)
5. Save the generated PDF file.
