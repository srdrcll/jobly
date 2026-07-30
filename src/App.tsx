import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PublicRoute } from '@/components/auth/PublicRoute';
import { CardSkeleton } from '@/components/ui/Skeleton';

// Code-Split Route Pages
const DashboardPage = lazy(() => import('@/pages/Dashboard').then(m => ({ default: m.DashboardPage })));
const ApplicationsPage = lazy(() => import('@/pages/Applications').then(m => ({ default: m.ApplicationsPage })));
const CompaniesPage = lazy(() => import('@/pages/Companies').then(m => ({ default: m.CompaniesPage })));
const TemplatesPage = lazy(() => import('@/pages/Templates').then(m => ({ default: m.TemplatesPage })));
const ProfilePage = lazy(() => import('@/pages/Profile').then(m => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('@/pages/Settings').then(m => ({ default: m.SettingsPage })));
const LandingPage = lazy(() => import('@/pages/Landing').then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('@/pages/Login').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@/pages/Register').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPassword').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('@/pages/ResetPassword').then(m => ({ default: m.ResetPasswordPage })));

const LoadingFallback = () => (
  <div className="p-8 max-w-5xl mx-auto space-y-4 animate-fadeIn">
    <div className="h-8 w-48 bg-slate-800 rounded-xl animate-pulse" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<RootLayout />}>
            {/* Protected SaaS App Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/companies" element={<CompaniesPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>

            {/* Public Only Auth Routes (Redirects to /dashboard if logged in) */}
            <Route element={<PublicRoute />}>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              </Route>
            </Route>

            {/* Password Reset Route (Accessible in any auth state for recovery flows) */}
            <Route element={<AuthLayout />}>
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            {/* Public Marketing Landing Page */}
            <Route path="/landing" element={<LandingPage />} />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
