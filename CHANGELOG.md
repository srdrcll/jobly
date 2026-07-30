# 📜 Changelog

All notable changes to the **Kariyer Pusulası** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v1.0.0] - 2026-07-30

### 🚀 Public Production Release (v1.0.0)
- **First Public Release**: Full production release of Kariyer Pusulası candidate-centric ATS & CRM SaaS platform.
- **Complete Module Coverage**:
  - 🔐 **Authentication & RLS**: Email/password auth, protected routes, session persistence, and Supabase Row Level Security data isolation.
  - 📊 **Dashboard & Analytics**: KPI summary cards, Recharts visualizations, active reminders, and next interview countdown.
  - 💼 **Application Management**: End-to-end lifecycle tracking across Applied, Interviewing, Offer, and Rejected stages.
  - 🏢 **Company Management & CRM**: Target company directory, recruiter contact management, interaction history logs, pinned rich text notes, and company tasks.
  - 📅 **Interview Management & Interactive Calendar**: Scheduled technical interviews, month grid calendar, preparation checklists, and 5-star self-evaluations.
  - 🤖 **AI Career Assistant & Review Suite**: Provider-agnostic LLM adapter architecture, AI chat, resume ATS review, cover letter evaluation, interview simulation coach, career conversion insights, and goal tracking.
- **Enterprise Hardening**: Complete accessibility (a11y), dark mode glassmorphism UI, responsive design across mobile/tablet/desktop, loading skeletons, and zero console errors.

---

## [v0.8.0] - 2026-07-30

### 🚀 Added
- **AI Career Assistant Module (`/ai-assistant`)**: Provider-agnostic AI chat assistant with model & persona configuration (Gemini 1.5 Pro, Gemini 1.5 Flash, Claude 3.5 Sonnet, GPT-4o), markdown export, and conversation archiving.
- **7 Suggested Prompt Categories**: Quick one-click execution cards for Resume Review, Cover Letter Review, Interview Prep, Career Advice, Application Strategy, Salary Negotiation, and LinkedIn Optimization.
- **AI Resume Review & ATS Engine**: Section-by-section analysis (Contact Info, Summary, Experience, Education, Skills, Projects, Certifications) with 0-100 overall ATS score.
- **AI Cover Letter Evaluation**: 6-dimension evaluation covering Grammar, Clarity, Tone, Personalization, ATS Compatibility, and Structure.
- **AI Interview Simulation Coach**: 6-category interview preparation sessions with candidate answer evaluations and STAR method feedback.
- **Career Insights & Goal Tracker**: Automated conversion metrics (Application-to-Interview, Interview-to-Offer) and goal tracking with progress bars.
- **Provider-Agnostic LLM Adapter Architecture**: Decoupled `ILlmProviderAdapter` interface and dependency injection registry ready for live AI APIs.

---

## [v0.7.0] - 2026-07-30

### 🚀 Added
- **Interview Management Module (`/interviews`)**: Full CRUD operations for scheduling interviews, stages, durations, interviewers, and direct meeting links.
- **Interactive Month Calendar**: Visual month calendar grid with day cells, today highlight, date navigation, and event click modals.
- **Interview Preparation Toolkit**: Interactive checklists with progress bars (%), company research notes, role research notes, technical topics, and questions to ask.
- **Post-Interview Evaluation**: 5-star ratings for Overall Performance, Technical, Communication, and Confidence; difficulty levels, strengths, weaknesses, lessons learned, and action plans.
- **Next Interview Countdown Banner**: Dynamic countdown banner calculating remaining days, hours, and minutes until the next scheduled interview.
- **View Switcher & Analytics**: Toggle between List View, Calendar View, and Analytics View featuring success rate %, offer rate %, and outcomes donut charts.

---

## [v0.6.0] - 2026-07-30

### 🚀 Added
- **Company Management & Dedicated Profiles (`/companies/:id`)**: Full CRUD operations for target tech companies, company size, ratings, websites, and career page links.
- **Candidate CRM & Recruiter Networking**: Directory for managing recruiter contacts, job titles, emails, phones, and LinkedIn links per company.
- **Interaction Log & Pinned Notes**: Track recruiter interactions and pin notes to top.

---

## [v0.5.0] - 2026-07-30

### 🚀 Added
- **KPI Summary Cards (6 Live Metrics)**: Total Applications, Active Applications, Interviews, Offers, Rejections, and Success Rate (%).
- **Interactive Analytics Visualizations**: Status Distribution Donut Chart, 6-Month Applications Bar Chart, 7-Day Activity Line Chart.
