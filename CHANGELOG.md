# 📜 Changelog

All notable changes to the **Kariyer Pusulası** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [v0.4.0] - 2026-07-30

### Added
- **Authentication**: Secure Supabase Login, Register, and Password Reset flow.
- **Applications Module**: Full lifecycle Application CRUD management.
- **Search**: Debounced real-time search across company names and job titles.
- **Filters**: Advanced multi-criteria filtering and column sorting.
- **Bulk Actions**: Batch update and deletion for candidate workflows.

### Changed
- **Performance Improvements**: Intelligent TanStack Query caching and zero-latency optimistic UI updates.
- **UI Consistency**: Standardized dark mode glassmorphic primitives, modals, buttons, and toast notifications.

### Fixed
- **Responsive Issues**: Layout math across data-dense desktop tables and mobile touch cards.
- **Validation Bugs**: Form payload sanitization and Zod runtime schema validation.

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
