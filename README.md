# 🧭 Kariyer Pusulası (Career Compass)

> Modern, minimalist ve yüksek performanslı iş başvurusu, şirket ve mülakat takip SaaS platformu. Linear, Notion, Vercel ve Stripe panellerinden ilham alınarak tasarlanmıştır.

![Kariyer Pusulası Banner](https://img.shields.io/badge/Status-Production--Ready%20UI-indigo?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.0-purple?style=for-the-badge&logo=vite)

---

## 🛠️ Teknolojiler & Mimari

- **Framework**: React 18 (Vite)
- **Dil**: Strict TypeScript
- **Stil & Tasarım**: Tailwind CSS (Koyu Tema İlkeler, Cam Efekti / Glassmorphic UI)
- **İkonlar**: Lucide Icons
- **Yönlendirme**: React Router v6
- **Modüller**: Custom Hooks (`useTheme`, `useSidebar`, `useToast`), Reusable Primitives (`Button`, `Input`, `StatusBadge`, `SearchInput`, `Modal`, `ConfirmationDialog`, `Skeleton`, `Breadcrumb`)

---

## 🚀 Proje Yapısı

```
src/
├── components/          # Reusable UI Primitives ve Ortak Bileşenler
│   ├── common/          # PageHeader, StatisticCard, EmptyState
│   └── ui/              # Button, Input, StatusBadge, Modal, Toast, Skeleton, ThemeSwitch
├── constants/           # Navigasyon rotaları ve 6 durum renk tanımları
├── hooks/               # useTheme, useSidebar, useToast
├── layouts/             # DashboardLayout, AuthLayout, RootLayout, Sidebar, TopNavbar
├── lib/                 # Tailwind clsx/twMerge (cn) yardımcıları
├── pages/               # Dashboard, Applications, Companies, Templates, Profile, Settings, Landing, Login, Register
├── types/               # Sıkı TypeScript arayüzleri
├── App.tsx              # React.lazy() rotalama ağacı
└── main.tsx             # Giriş noktası
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

---

## 🐙 GitHub'a Yükleme Adımları

Sisteminizde **Git** kurulu olduğunda aşağıdaki komutları sırasıyla çalıştırabilirsiniz:

```bash
git init
git add .
git commit -m "feat: initial release for Kariyer Pusulası UI foundation"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADI/kariyer-pusulasi.git
git push -u origin main
```
