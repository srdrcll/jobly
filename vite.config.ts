import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Data fetching / state
          'vendor-query': ['@tanstack/react-query'],
          // Form handling & validation
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Supabase client
          'vendor-supabase': ['@supabase/supabase-js'],
          // Charts
          'vendor-charts': ['recharts'],
          // UI utilities
          'vendor-ui': ['clsx', 'tailwind-merge', 'lucide-react'],
        },
      },
    },
    // Raise warning threshold slightly — we track it manually
    chunkSizeWarningLimit: 1000,
  },
});
