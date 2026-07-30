<div align="center">

  <h1>🧭 Kariyer Pusulası</h1>
  <h3><i>Personal Applicant Tracking System (ATS) for Ambitious Job Seekers</i></h3>

  <p>
    <b>Take complete command of your job search with an intuitive, data-driven SaaS workspace.</b>
  </p>

  <p>
    <a href="#"><img src="https://img.shields.io/badge/Status-Active_Development-brightgreen?style=for-the-badge&logo=rocket&logoColor=white" alt="Status" /></a>
    <a href="#"><img src="https://img.shields.io/badge/Version-v0.4.0-blue?style=for-the-badge&logo=git&logoColor=white" alt="Version" /></a>
    <a href="#"><img src="https://img.shields.io/badge/License-MIT-amber?style=for-the-badge" alt="License" /></a>
    <a href="#"><img src="https://img.shields.io/badge/PRs-Welcome-emerald?style=for-the-badge&logo=github&logoColor=white" alt="PRs Welcome" /></a>
  </p>

</div>

---

### 📌 Purpose

**Kariyer Pusulası** is a modern, candidate-centric Applicant Tracking System (ATS) engineered specifically for job seekers, not recruiters. Traditional job hunting relies on scattered spreadsheets and lost email threads; Kariyer Pusulası centralizes application tracking, interview timelines, company research, and analytics into a cohesive, high-performance SaaS workspace inspired by top-tier tools like Linear and Notion.

---

### ✨ Key Features

- 🎯 **End-to-End Application Pipeline** — Track job applications seamlessly across structured lifecycle stages (Applied, Screening, Interviewing, Offer, Rejected).
- ⚡ **Real-Time Search & Smart Filters** — Instantly locate and filter applications by company, position, priority, or remote status with debounced live search.
- 🔐 **Enterprise-Grade Security** — Powered by Supabase Row Level Security (RLS) to ensure absolute data isolation and privacy for every job seeker.
- 🎨 **Modern Minimalist UI/UX** — Ultra-responsive dark mode aesthetics built with glassmorphism, clean typography, and fluid micro-interactions.
- 🚀 **Optimistic Data Operations** — High-speed interactivity driven by TanStack Query for zero-latency state updates and robust caching.

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

## 🚀 Features

### 🔐 Authentication

- ✅ **Secure Login & Registration** — Email and password authentication powered by Supabase Auth with encrypted tokens.
- ✅ **Password Reset Flow** — Self-serve password recovery via automated verification emails.
- ✅ **Protected Route Architecture** — Client-side route guards preventing unauthorized navigation to dashboard routes.
- ✅ **Session Persistence** — Long-lived, secure session management maintaining state across browser refreshes.

### 📋 Application Management

- ✅ **Create & Edit Applications** — Modal-driven entry forms for tracking salary, pipeline stage, notes, and job links.
- ✅ **Delete & Archive Records** — Safe application deletion with immediate workspace state synchronization.
- ✅ **Detailed Application View** — Comprehensive breakdown of interview stages, notes, and activity timeline per job.
- ✅ **Bulk Operations** — Select and update or remove multiple application records simultaneously.

### 🔍 Search & Organization

- ✅ **Real-Time Search** — Debounced live search querying company names, job titles, and locations instantly.
- ✅ **Advanced Filters** — Filter applications by pipeline stage, priority level, or remote work preference.
- ✅ **Multi-Column Sorting** — Dynamic sorting by application date, salary range, or status.
- ✅ **Responsive Table & Mobile Cards** — Data-dense table layout for desktop, auto-adapting to touch-friendly cards on mobile.

### 📊 User Experience

- ✅ **Modern Dark Theme** — Sleek dark UI designed for reduced eye strain during extended job hunting sessions.
- ✅ **Glassmorphism UI** — Translucent panels, smooth hover effects, and crisp, modern typography.
- ✅ **Comprehensive UI States** — Skeleton loaders, informative empty states, and structured error banners.
- ✅ **Toast Notification System** — Real-time feedback for async operations, errors, and success triggers.

### ⚡ Performance

- ✅ **TanStack Query Caching** — Background data fetching, automatic revalidation, and intelligent garbage collection.
- ✅ **Optimistic UI Updates** — Instant UI mutations before server response with automatic rollback on error.
- ✅ **Debounced Search Inputs** — Reduced API requests and minimal network overhead during rapid typing.
- ✅ **Memoized List Filtering** — High-performance client-side sorting and filtering without re-render lag.

### 🛡️ Security

- ✅ **Supabase Auth & RLS** — Database-level Row Level Security ensuring candidates access only their own records.
- ✅ **Zod Schema Validation** — Runtime type checking and input sanitization for all forms and request payloads.
- ✅ **End-to-End Type Safety** — Full TypeScript integration from PostgreSQL database schemas to React components.

---

## 📸 Screenshots

### Dashboard
![Dashboard](docs/screenshots/dashboard.png)
*High-level overview displaying application status counts, upcoming interview schedules, conversion metrics, and recent activity logs.*

### Applications
![Applications](docs/screenshots/applications.png)
*Central application management interface featuring live search, custom filters, status tags, and bulk management capabilities.*

### Create Application
![Create Application](docs/screenshots/create-application.png)
*Streamlined modal dialog for adding new job applications with salary inputs, company details, tags, and job posting URLs.*

### Application Detail
![Application Detail](docs/screenshots/application-detail.png)
*In-depth view of a specific application including interview stages, custom notes, contact persons, and offer tracking.*

### Authentication
![Authentication](docs/screenshots/authentication.png)
*Secure login and registration interface featuring form validation, error handling, and password recovery workflows.*

### Mobile Experience
![Mobile Experience](docs/screenshots/mobile-experience.png)
*Responsive touch-optimized view showcasing card layouts, mobile navigation drawer, and quick-action toolbars.*

---

## 🏗️ Architecture

### High-Level Architecture

```mermaid
flowchart TD
    User(["User / Client Browser"]) --> ReactUI["React UI"]
    ReactUI --> FeatureModules["Feature Modules"]
    FeatureModules --> Services["Services"]
    Services --> RepositoryLayer["Repository Layer"]
    RepositoryLayer --> Supabase["Supabase"]
    Supabase --> PostgreSQL[("PostgreSQL")]
```

### Data Flow Architecture

```mermaid
flowchart TD
    RC["React Component"] --> TQ["TanStack Query"]
    TQ --> Service["Service Layer"]
    Service --> Repository["Repository Layer"]
    Repository --> Supabase["Supabase Backend"]
```

### Core Architectural Principles

- **Separation of Concerns**: Each architectural layer maintains a single responsibility. UI components handle rendering and user interactions, services govern business logic and data validation, while repositories isolate direct database operations.
- **Feature-Based Architecture**: Code is structured around domain modules (Applications, Authentication, Companies), keeping components, hooks, and utilities co-located for high maintainability.
- **Repository Pattern**: Decouples business services from direct database SDK calls, enabling consistent data querying, simplified mock testing, and seamless backend refactoring.
- **TanStack Query Responsibilities**: Orchestrates asynchronous server state, handles optimistic UI updates, manages background re-validation, and caches data to reduce unnecessary network traffic.
- **Supabase Responsibilities**: Manages secure user authentication, real-time database subscriptions, PostgreSQL data storage, and Row Level Security (RLS) enforcement per user.
