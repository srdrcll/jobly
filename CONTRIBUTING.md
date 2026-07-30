# 🤝 Contributing to Kariyer Pusulası

Thank you for your interest in contributing to **Kariyer Pusulası**! We welcome bug fixes, documentation improvements, and feature contributions.

---

## 🛠️ Development Setup

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
   Copy `.env.example` to `.env.local` and set your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the local development server**:
   ```bash
   npm run dev
   ```

---

## 📐 Conventional Commit Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard for clean git history:

- `feat(scope): add new feature`
- `fix(scope): fix bug or issue`
- `docs(scope): update documentation`
- `style(scope): format code or adjust UI styles`
- `refactor(scope): refactor code without changing behavior`
- `test(scope): add or update unit/integration tests`

---

## 🏗️ Architecture Guidelines

- **Feature-Based Architecture**: Group components and utilities by feature domain (`/components/applications`, `/components/companies`, `/components/interviews`, `/components/ai`).
- **Layer Separation**:
  - `repositories/`: Data access & Supabase/localStorage queries.
  - `services/`: Business logic & Zod validations.
  - `hooks/queries/`: TanStack Query hooks.
  - `pages/` & `components/`: UI presentation layers.
- **Styling**: Use Vanilla CSS / TailwindCSS with custom design system variables in `index.css`.
- **Accessibility**: Ensure full keyboard navigation (`tabIndex`, `focus:ring-2`), semantic HTML tags (`<header>`, `<nav>`, `<aside>`, `<main>`), and descriptive `aria-label` attributes.

---

## 📜 Pull Request Process

1. Fork the repository and create a feature branch (`git checkout -b feature/amazing-feature`).
2. Ensure there are no TypeScript errors or broken imports.
3. Commit your changes following conventional commit syntax.
4. Open a Pull Request against the `main` branch with a clear summary of changes.
