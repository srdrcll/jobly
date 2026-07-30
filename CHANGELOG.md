# 📜 Changelog

All notable changes to the **Kariyer Pusulası** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v0.5.0] - 2026-07-30

### 🚀 Added
- **KPI Summary Cards (6 Live Metrics)**: Total Applications, Active Applications, Interviews, Offers, Rejections, and Success Rate (%).
- **Interactive Analytics Visualizations**:
  - Status Distribution Donut Chart with percentages and legend
  - 6-Month Applications Bar Chart
  - 7-Day Activity Line Chart with day labels
- **Recent Activity Feed**: Chronological activity stream tracking creations, status transitions, and interview schedules.
- **Upcoming Interviews Widget**: Nearest interview list with 24-hour urgency highlights and empty states.
- **Dynamic AI Career Insights**: Automatic recommendations engine generating up to 3 actionable career tips.
- **Quick Action Cards**: 4 interactive shortcuts (Add Application, View Applications, View Analytics, Manage Profile) with keyboard accessibility.

### ⚡ Performance & Quality
- Configured TanStack Query cache policies (`staleTime: 2m`, `gcTime: 10m`).
- Wrapped expensive data aggregations inside `useMemo` hooks.
- Added comprehensive ARIA tags, keyboard navigation handlers, and focus rings.

---

## [v0.4.0] - 2026-07-30

### Added
- **Authentication**: Secure Supabase Login, Register, and Password Reset flow.
- **Applications Module**: Full lifecycle Application CRUD management.
- **Search**: Debounced real-time search across company names and job titles.
- **Filters**: Advanced multi-criteria filtering and column sorting.
- **Bulk Actions**: Batch update and deletion for candidate workflows.

---

## [v0.3.0] - 2026-07-25

### Added
- Database Architecture & PostgreSQL schemas for `applications`, `profiles`, and `companies`.
- Supabase direct SQL Repository layer pattern (`src/repositories/`).
- Supabase Row Level Security (RLS) policies for user data isolation.

---

## [v0.2.0] - 2026-07-20

### Added
- Supabase Auth integration and Protected/Public route guards.
- User session persistence and `AuthContext` state provider.

---

## [v0.1.0] - 2026-07-15

### Added
- React 19 + TypeScript + Vite project foundation.
- Tailwind CSS styling and glassmorphic UI design tokens.
