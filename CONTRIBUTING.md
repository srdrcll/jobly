# 🤝 Contributing Guidelines

Thank you for your interest in contributing to **Kariyer Pusulası**!

---

## 🌿 Branch Naming Convention

Follow structured branch naming for clear git history:

- **Features**: `feature/dashboard-layout`, `feature/kpi-cards`
- **Bug Fixes**: `fix/session-persistence`
- **Documentation**: `docs/roadmap-update`
- **Refactoring**: `refactor/query-hooks`

---

## 💬 Commit Convention

We follow Conventional Commits standard format:

```text
feat(dashboard): add KPI cards
feat(applications): implement bulk actions
fix(auth): resolve session persistence issue
refactor(applications): optimize filtering logic
docs(readme): update roadmap
style(ui): improve dashboard spacing
chore(deps): update dependencies
```

---

## 🔀 Pull Request Process

1. Create a descriptive feature branch from `main`.
2. Ensure your changes compile without TypeScript or build errors (`npm run build`).
3. Push your branch to GitHub and submit a Pull Request targeting `main`.
4. Provide a short summary of introduced changes and manual verification steps.

---

## 🎨 Code Style Guidelines

- **TypeScript**: Strict typing enabled. Use explicit interfaces for props and state models.
- **Components**: Functional components utilizing custom React hooks and Tailwind CSS.
- **Formatting**: Clean code structure with consistent indentation and single quotes.
