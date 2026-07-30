# 📜 Changelog

All notable changes to the **Kariyer Pusulası** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.0] - 2026-07-30

### 🚀 Added
- **Applications Module**: Complete Applicant Tracking System workflow with full CRUD capabilities.
- **Real-Time Search & Filtering**: Debounced live search across company names and job titles with multi-criteria filtering.
- **Bulk Operations**: Multi-select application management for batch updates and deletion.
- **Responsive Layout**: High-density desktop table layout auto-adapting to touch cards on mobile devices.
- **Zod Validation**: Strict schema validation across all application forms and API payloads.

### 🛡️ Security & Performance
- Enforced Supabase Row Level Security (RLS) policies for user data isolation.
- Integrated TanStack Query for optimistic UI updates and zero-latency state synchronization.

---

## [0.3.0] - 2026-07-25

### 🚀 Added
- PostgreSQL database schemas for `applications`, `profiles`, and `companies`.
- Supabase direct SQL repository layer (`src/repositories/`).
- Initial Row Level Security (RLS) policies.

---

## [0.2.0] - 2026-07-20

### 🚀 Added
- Supabase Authentication integration (Login, Registration, Password Reset).
- Protected & Public client-side route guards (`src/components/auth/`).
- Session persistence and `AuthContext` state provider.

---

## [0.1.0] - 2026-07-15

### 🚀 Added
- Initialized React 19 + TypeScript + Vite project foundation.
- Configured Tailwind CSS with custom glassmorphism design tokens.
- Standardized UI component primitives (`Button`, `Input`, `Modal`, `StatusBadge`).
