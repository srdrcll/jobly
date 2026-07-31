# 🧪 Kariyer Pusulası - Test & Kalite Rehberi

Bu belge, Kariyer Pusulası (ATS SaaS) projesindeki test mimarisi, çalıştırma komutları ve kalite standartlarını özetler.

---

## 📐 Test Seviyeleri ve Araçları

Projede 3 temel test katmanı bulunmaktadır:

1. **Birim Testler (Unit Tests)**:
   - **Araçlar**: Vitest, React Testing Library, JSDOM
   - **Kapsam**: UI bileşenleri, yardımcı fonksiyonlar, form doğrulamaları ve modül mantığı.
   - **Komut**: `npm run test` (İzleme modu) veya `npm run test:run` (Tek seferlik çalıştırma)

2. **Entegrasyon Testleri (Integration Tests)**:
   - **Araçlar**: Vitest, TanStack Query, MemoryRouter
   - **Kapsam**: Modüller arası veri senkronizasyonu, Oturum/Auth akışları, Dashboard KPI metrikleri.
   - **Konum**: `src/test/integration/`

3. **Uçtan Uca Testler (End-to-End / E2E Tests)**:
   - **Araçlar**: Playwright (Chromium, Firefox, WebKit, Mobile Viewports)
   - **Kapsam**: Uçtan uca kullanıcı yolculukları, korumalı rota yönlendirmeleri.
   - **Komut**: `npm run test:e2e` veya `npm run test:e2e:ui`

---

## ⚡ Çalıştırma Komutları

```bash
# Tip kontrolü & Linting
npm run lint

# Birim ve Entegrasyon Testlerini Çalıştırma
npm run test:run

# Test Kapsam (Coverage) Raporu
npm run test:coverage

# Playwright E2E Testleri
npm run test:e2e

# Playwright UI Modunda Test Çalıştırma
npm run test:e2e:ui

# Üretim Yapısı (Production Build) Doğrulama
npm run build
```

---

## 🛡️ CI/CD & Kalite Kapıları (Quality Gates)

GitHub Actions üzerinde çalışan CI hattı şu durumlarda PR birleştirmelerini (merge) engeller:
- TypeScript derleme veya lint hataları (`tsc --noEmit`).
- Herhangi bir Birim veya Entegrasyon testinin başarısız olması.
- Playwright E2E testlerinin hata vermesi.
- Üretim derlemesinin (`npm run build`) hata alması.
