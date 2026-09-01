<div align="center">

  <h1>💼 Jobly</h1>
  <h3><i>Personal Applicant Tracking System (ATS) & Candidate CRM for Ambitious Job Seekers</i></h3>

  <p>
    <b>Take complete command of your job search, interviews, and networking with an intuitive, data-driven SaaS workspace.</b>
  </p>

  <p>
    <a href="#"><img src="https://img.shields.io/badge/Build-Passing-success?style=for-the-badge&logo=github-actions&logoColor=white" alt="Build" /></a>
    <a href="#"><img src="https://img.shields.io/badge/Current_Release-v2.0.0_Public_Release-blue?style=for-the-badge&logo=git&logoColor=white" alt="Current Release" /></a>
    <a href="#"><img src="https://img.shields.io/badge/Production_Readiness-100%2F100-emerald?style=for-the-badge&logo=target&logoColor=white" alt="Production Readiness" /></a>
    <a href="#"><img src="https://img.shields.io/badge/License-MIT-amber?style=for-the-badge" alt="License" /></a>
    <a href="#"><img src="https://img.shields.io/badge/PRs-Welcome-emerald?style=for-the-badge&logo=github&logoColor=white" alt="PRs Welcome" /></a>
  </p>

</div>

---

### 📌 Purpose

**Jobly** is a modern, candidate-centric Applicant Tracking System (ATS) and Candidate CRM built for job seekers. It replaces messy spreadsheets and lost emails with a structured SaaS workspace to track applications, target companies, recruiter contacts, and interview timelines. Inspired by tools like Linear and Notion, it brings clarity and speed to your career journey.

---

### ✨ Key Modules & Features

- 🤖 **AI Career Assistant & LLM Adapter Architecture (`/ai-assistant`)** — Provider-agnostic AI assistant supporting model & persona selection (Gemini, Claude, GPT-4o), prompt history, conversation archiving, and Markdown export (`.md`).
- 📄 **AI Resume Review & ATS Scoring** — Section-by-section ATS evaluation (Contact Info, Summary, Experience, Education, Skills, Projects, Certifications) with 0-100 overall score.
- ✉️ **AI Cover Letter Evaluation** — 6-dimension quality evaluation covering Grammar, Clarity, Tone, Personalization, ATS Compatibility, and Structure.
- 🎯 **AI Interview Simulation Coach** — 6-category interview preparation sessions with candidate answer evaluations and STAR method feedback.
- 📊 **Real-Time Conversion Insights & Goals** — Application-to-interview and interview-to-offer conversion metrics with automated career goal progress tracking.
- 📅 **Interview Management & Interactive Month Calendar (`/interviews`)** — Technical interview scheduling, interactive month grid calendar, prep checklists, and 5-star self-evaluations.
- 🏢 **Company Management & Candidate CRM (`/companies`)** — Directory of target tech companies, recruiter contact networking, interaction logs, pinned rich text notes, and company-specific follow-up tasks.
- 📊 **Real-Time KPI Dashboard & Analytics (`/dashboard`)** — Instant visual Recharts for application status distribution, 6-month trends, interview success rates, and active reminders.
- 🔐 **Enterprise Security & Row Level Security** — Supabase Auth and Row Level Security (RLS) policies guaranteeing complete data isolation per candidate.
- 🎨 **Modern Minimalist UI/UX** — Ultra-responsive dark mode glassmorphism built with React 19, TypeScript, Vite, Tailwind CSS, and Lucide Icons.

---

### 🛠️ Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
</p>

---

## ⚙️ Environment Setup & Local Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/srdrcll/kariyer-pusulasi.git
   cd kariyer-pusulasi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## ☁️ Deployment Guide (Vercel)

1. **Import Repository to Vercel**: Connect your GitHub repository `srdrcll/kariyer-pusulasi`.
2. **Framework Preset**: Select **Vite**.
3. **Environment Variables**:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key
4. **Deploy**: Click **Deploy**. Vercel will automatically build and publish your SPA with client-side routing configured via `vercel.json`.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for details.
