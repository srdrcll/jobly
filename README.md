# 🧭 Kariyer Pusulası (Career Compass)

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-yellow)

> Modern, minimalist ve yüksek performanslı iş başvurusu, şirket ve mülakat takip SaaS platformu. Linear, Notion, Vercel ve Stripe panellerinden ilham alınarak tasarlanmıştır.

---

# 🚀 Release Notes: Kariyer Pusulası v0.4.0

The Applications module has reached production-ready quality.

This release introduces a complete Applicant Tracking System (ATS) workflow with authentication, advanced application management, search, filtering, bulk operations, and production hardening.

---

## ✨ Highlights

### 🔐 Authentication

- Secure Supabase Authentication
- Login / Register
- Password Reset
- Email Verification
- Protected Routes
- Session Persistence

---

### 📋 Application Management

- Create Application
- Edit Application
- Delete Application
- Application Detail Page

---

### 🔍 Search & Organization

- Real-time Search
- Advanced Filtering
- Sorting
- Bulk Actions
- Responsive Table & Card Views

---

### 🛡️ Security

- Supabase Row Level Security (RLS)
- User Data Isolation
- Secure API Access
- Input Validation with Zod

---

### ⚡ Performance

- TanStack Query
- Optimistic Updates
- Debounced Search
- Memoized Filtering
- Efficient Data Fetching

---

### 🎨 User Experience

- Dark Theme
- Glassmorphism UI
- Loading States
- Empty States
- Error States
- Toast Notifications
- Mobile Responsive Design

---

### 🧩 Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS
- React Router
- Supabase
- TanStack Query
- React Hook Form
- Zod

---

## 📈 Project Status

Current Progress:
- ✅ Foundation
- ✅ Authentication
- ✅ Database Architecture
- ✅ Applications Module (Production Ready)

---

## 🔜 Next Release

Dashboard & Analytics:
- KPI Dashboard
- Charts
- Interview Timeline
- Activity Feed
- Business Insights

---

## 🚀 Proje Yapısı

```
src/
├── components/          # Reusable UI Primitives ve Ortak Bileşenler
│   ├── applications/    # CreateApplicationModal, EditApplicationModal
│   ├── auth/            # ProtectedRoute, PublicRoute
│   ├── common/          # PageHeader, StatisticCard, EmptyState, PriorityBadge
│   └── ui/              # Button, Input, StatusBadge, Modal, Toast, Skeleton, Table
├── constants/           # Navigasyon rotaları, queryKeys ve durum renk tanımları
├── context/             # AuthContext, ToastContext
├── hooks/               # useAuth, useToast, useDebounce, useApplicationFilters, queries/
├── layouts/             # DashboardLayout, AuthLayout, RootLayout, Sidebar, TopNavbar
├── lib/                 # supabase, errors, queryClient, utils, validations/
├── pages/               # Dashboard, Applications, ApplicationDetail, Companies, Templates, Profile, Settings, Landing, Login, Register
├── repositories/        # applicationsRepository (Supabase Direct SQL)
├── services/            # applicationsService (Business Logic & Zod Validation)
└── types/               # Sıkı TypeScript arayüzleri & Database types
```

---

## ⚙️ Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Üretim derlemesi oluşturun
npm run build
```
