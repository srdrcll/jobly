# 🤝 Contributing to Kariyer Pusulası

Thank you for your interest in contributing to **Kariyer Pusulası**! We welcome bug reports, feature suggestions, and code contributions.

---

## 🛠️ Development Setup

1. **Fork & Clone**:
   ```bash
   git clone https://github.com/your-username/kariyer-pusulasi.git
   cd kariyer-pusulasi
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Copy `.env.example` to `.env` and fill in your local Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

---

## 📌 Commit Guidelines

We follow Conventional Commits standard format:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Code style / formatting changes (no functional changes)
- `refactor:` Code refactoring without adding features or fixing bugs
- `perf:` Performance improvements
- `test:` Adding or updating tests

*Example*: `feat: add export applications to CSV functionality`

---

## 🔀 Pull Request Process

1. Create a descriptive branch: `git checkout -b feature/dashboard-kpi-cards`
2. Commit your changes following conventional commit syntax.
3. Ensure the project builds without TypeScript or linter errors (`npm run build`).
4. Push your branch and open a Pull Request against the `main` branch.
