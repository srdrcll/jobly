# BA-11 — Gereksinim İzlenebilirlik Matrisi

## Doküman Bilgileri

| Alan | Bilgi |
| --- | --- |
| Proje | Kariyer Pusulası |
| Doküman adı | Gereksinim İzlenebilirlik Matrisi |
| Doküman kodu | BA-11 |
| Sürüm | 0.1 |
| Durum | Taslak |
| Yazar | Serdar Ç. |
| Tarih | 1 Ağustos 2026 |
| İlişkili dokümanlar | BA-1, BA-5, BA-6, BA-7, BA-8, BA-9 |

Bu matris; BA-1 İş Gereksinimleri, BA-5 Kullanıcı Hikâyesi Haritası, BA-6 Fonksiyonel Gereksinimler, BA-7 Fonksiyonel Olmayan Gereksinimler, BA-8 Kullanım Senaryoları ve BA-9 Kabul Kriterleri dokümanları incelenerek oluşturulmuştur. Yalnızca önceki dokümanlarda tanımlanmış ve kodda karşılığı olan gereksinimler matrise dahil edilmiştir.

## Amaç

Her iş gereksiniminin, fonksiyonel gereksinime; fonksiyonel gereksinimin kullanıcı hikâyesi, kullanım senaryosu ve kabul kriterlerine bağlandığını göstermektir. Bu sayede bir gereksinimde yapılacak değişikliğin hangi dokümanları ve hangi kriterleri etkileyeceği tek bir tabloda görülebilir.

## Kapsam

Matris; hesap ve oturum, başvuru yönetimi, şirket yönetimi, mülakat yönetimi, gösterge paneli ve ayarlar modüllerini kapsar. Fonksiyonel olmayan gereksinimler ve kullanıcıya kapalı modüller (AI Asistanı, Şablonlar) kapsam dışıdır.

## İçindekiler

1. Matris nasıl okunur?
2. İzlenebilirlik matrisi
3. Kapsam dışı bırakılan gereksinimler
4. Matris kullanım notları
5. Öğrenme notları
6. Mülakat soruları

---

## 1. Matris Nasıl Okunur?

Her satır bir **iş gereksinimi (BR)** ile başlar. Sağa doğru ilerledikçe o gereksinimin hangi fonksiyonel gereksinim, kullanıcı hikâyesi, kullanım senaryosu ve kabul kriterleriyle ilişkilendirildiği görülür.

| Sütun | Kaynak doküman | Anlamı |
| --- | --- | --- |
| **BR** | BA-1 | İş ihtiyacını tanımlayan üst düzey gereksinim |
| **FR** | BA-6 | Sistemin ne yapması gerektiğini anlatan fonksiyonel gereksinim |
| **US** | BA-5 | Kullanıcı hikâyesi — o işlevi kimin, ne için istediği |
| **UC** | BA-8 | Kullanım senaryosu — adım adım etkileşim akışı |
| **AC** | BA-9 | Kabul kriteri — gereksinimin ne zaman karşılanmış sayılacağı |

Bir BR birden fazla FR ile; bir FR birden fazla AC ile eşleşebilir. Bu durumda hücreye birden fazla ID virgülle yazılmıştır.

---

## 2. İzlenebilirlik Matrisi

### 2.1 Hesap ve Oturum Yönetimi

| İş Gereksinimi (BR) | Fonksiyonel Gereksinim (FR) | Kullanıcı Hikâyesi (US) | Kullanım Senaryosu (UC) | Kabul Kriteri (AC) |
| --- | --- | --- | --- | --- |
| BR-01 Kullanıcı hesap oluşturabilmeli | FR-01 | US-01 | UC-01 | AC-01, AC-02 |
| BR-01 Kullanıcı giriş yapabilmeli | FR-02 | US-02 | UC-02 | AC-03 |
| BR-01 Kullanıcı şifre sıfırlayabilmeli | FR-04, FR-05 | US-03 | UC-03 | AC-05, AC-06 |
| BR-02 Oturum açmadan veri erişimi engellenmeli | FR-03, FR-06 | US-04 | UC-02 | AC-04 |
| BR-16 Profil bilgisi görüntülenebilmeli | FR-07 | US-05 | — | — |

> **Not:** FR-07 (profil bilgisi görüntüleme) için BA-8'de ayrı bir kullanım senaryosu tanımlanmamıştır. Profil ekranı temel okuma işlevi olduğundan kullanım senaryosu oluşturma gerekliliği doğmamıştır.

---

### 2.2 Başvuru Yönetimi

| İş Gereksinimi (BR) | Fonksiyonel Gereksinim (FR) | Kullanıcı Hikâyesi (US) | Kullanım Senaryosu (UC) | Kabul Kriteri (AC) |
| --- | --- | --- | --- | --- |
| BR-03 Başvuru kaydedilebilmeli | FR-08, FR-09, FR-10 | US-06, US-07 | UC-04 | AC-07, AC-08, AC-09, AC-10 |
| BR-04 Başvuru bilgileri takip edilebilmeli | FR-11, FR-12 | US-08 | UC-04, UC-05 | AC-11 |
| BR-05 Başvuruya ek bilgi eklenebilmeli | FR-10 | US-07 | UC-04 | AC-09, AC-10 |
| BR-06 Başvurular aranabilir ve filtrelenebilmeli | FR-15, FR-16, FR-17 | US-09 | UC-05 | AC-12 |
| BR-07 Başvuru güncellenebilmeli ve silinebilmeli | FR-13, FR-14, FR-18, FR-19 | US-10, US-11, US-12 | UC-05, UC-06 | AC-13, AC-14, AC-15, AC-16, AC-17 |

---

### 2.3 Şirket Yönetimi

| İş Gereksinimi (BR) | Fonksiyonel Gereksinim (FR) | Kullanıcı Hikâyesi (US) | Kullanım Senaryosu (UC) | Kabul Kriteri (AC) |
| --- | --- | --- | --- | --- |
| BR-08 Şirket kaydedilebilmeli | FR-20, FR-21 | US-13 | UC-07 | AC-18, AC-19, AC-20 |
| BR-09 Şirket bilgileri yönetilebilmeli | FR-21, FR-22, FR-25 | US-14 | UC-07, UC-08 | AC-21, AC-24 |
| BR-10 Şirketler aranabilir, filtrelenebilir ve favorilenebilmeli | FR-23, FR-24 | US-15, US-16 | UC-08 | AC-22, AC-23 |

---

### 2.4 Mülakat Yönetimi

| İş Gereksinimi (BR) | Fonksiyonel Gereksinim (FR) | Kullanıcı Hikâyesi (US) | Kullanım Senaryosu (UC) | Kabul Kriteri (AC) |
| --- | --- | --- | --- | --- |
| BR-11 Mülakat planlanabilmeli | FR-26, FR-27 | US-17 | UC-09 | AC-25, AC-26, AC-28 |
| BR-12 Mülakat başvuruyla ilişkilendirilebilmeli | FR-28, FR-29, FR-30 | US-18 | UC-09 | AC-27, AC-29 |
| BR-13 Mülakatlar liste ve takvimde görüntülenebilmeli | FR-31, FR-32, FR-33 | US-19 | UC-10 | AC-30 |
| BR-14 Yaklaşan mülakat özeti görülebilmeli | FR-34, FR-35 | US-20 | UC-10 | AC-31, AC-32, AC-33 |

---

### 2.5 Gösterge Paneli ve Ayarlar

| İş Gereksinimi (BR) | Fonksiyonel Gereksinim (FR) | Kullanıcı Hikâyesi (US) | Kullanım Senaryosu (UC) | Kabul Kriteri (AC) |
| --- | --- | --- | --- | --- |
| BR-15 Başvuru grafikleri görüntülenebilmeli | FR-36, FR-37, FR-38, FR-39 | US-21 | UC-11 | AC-34, AC-35, AC-36 |
| BR-17 Tema ve tercihler kaydedilebilmeli | FR-40, FR-41 | US-22 | — | AC-37, AC-38 |
| BR-17 Veri dışa aktarılabilmeli | FR-42 | US-23 | UC-12 | AC-39, AC-40 |

---

### 2.6 Veri Güvenliği

| İş Gereksinimi (BR) | Fonksiyonel Gereksinim (FR) | Kullanıcı Hikâyesi (US) | Kullanım Senaryosu (UC) | Kabul Kriteri (AC) |
| --- | --- | --- | --- | --- |
| BR-18 Kullanıcı yalnızca kendi verilerini görebilmeli | FR-03 | US-04 | UC-02 | AC-04 |

> **Not:** BR-18, teknik olarak Supabase Row Level Security politikalarıyla karşılanmaktadır. Bu doğrudan test edilebilir bir kullanıcı arayüzü davranışı olmadığından tek bir kabul kriteri ile ilişkilendirilmiştir.

---

## 3. Kapsam Dışı Bırakılan Gereksinimler

Aşağıdaki konular mevcut uygulamada kullanıcıya açık olmadığı veya kodda karşılığı bulunmadığı için matrise dahil edilmemiştir:

| Konu | Neden kapsam dışı? |
| --- | --- |
| AI Kariyer Asistanı | Rota `/ai-assistant` gösterge paneline yönlendiriyor; kullanıcıya kapalı |
| Şablonlar | Rota `/templates` gösterge paneline yönlendiriyor; kullanıcıya kapalı |
| Gerçek e-posta bildirimi | Kod tabanında bildirim gönderen bir servis bulunmuyor |
| Haricî takvim/iş ilanı entegrasyonu | Mevcut sürümde uygulanmamış |
| İşveren / İK kullanıcısı | Tanımlanmamış; tek kullanıcı tipi mevcut |

---

## 4. Matris Kullanım Notları

- **Değişiklik etkisi:** Bir BR değiştirildiğinde matristeki karşılıklarından hangi FR, US, UC ve AC'lerin güncellenmesi gerektiği görülür.
- **Eksiklik tespiti:** Herhangi bir FR sütununda boş alan varsa o gereksinimin kullanıcı hikâyesine veya kabul kriterine bağlanmamış olduğu anlaşılır; bu bir boşluk sinyalidir.
- **Test kapsamı:** Kabul kriteri (AC) sütunu, hangi senaryoların test edilmesi gerektiğini planlamak için doğrudan kullanılabilir.
- **Bu matris statik bir belgedir.** Gereksinimler eklendikçe veya değiştikçe matris de güncellenmelidir.

---

## Öğrenme Notları

### Bu doküman nedir?

Gereksinim İzlenebilirlik Matrisi (Requirements Traceability Matrix — RTM), bir projedeki gereksinimlerin birbirleriyle nasıl bağlantılı olduğunu ve test senaryolarına kadar nasıl izlenebileceğini gösteren bir tablodur. "Bu gereksinim nerede karşılandı?" sorusunun cevabını verir.

### Neden hazırlanır?

Bir özellik değiştiğinde sadece ilgili maddeyi bulmak yeterli değildir; o maddeyle bağlantılı testlerin, kullanım senaryolarının ve kabul kriterlerinin de güncellenmesi gerekir. Matris bu bağlantıyı görünür kılar.

### Kim hazırlar?

Genellikle iş analisti hazırlar. Test ekibi ve proje sahibiyle birlikte gözden geçirilir. Büyük projelerde test yöneticisi de katkı sağlar.

### Kimler kullanır?

İş analisti, test yapan kişi, proje yöneticisi ve geliştirici kullanır. Kapsam değişikliklerinde ve etki analizinde temel başvuru kaynağıdır.

### Projenin hangi aşamasında hazırlanır?

Gereksinimlerin netleştirilmesinin ardından hazırlanır. Geliştirme boyunca canlı tutulur; proje kapanışında son hâliyle arşivlenir.

### Gerçek projelerde nasıl kullanılır?

Bir müşteri isteği değiştiğinde hangi test senaryolarının etkilendiğini belirlemek için kullanılır. Ayrıca "tüm gereksinimler test edildi mi?" sorusunu yanıtlamak için test kapsam değerlendirmesinde başvuru belgesidir.

### Junior İş Analisti için dikkat edilmesi gerekenler

- Her gereksinime en az bir kabul kriteri bağlamaya çalış.
- "Bağlantı yok" alanları bir problem işareti olabilir; neden boş kaldığını açıkla.
- Matristeki kimlikler önceki dokümanlarla tam uyumlu olmalıdır; kimlik tutarsızlığı güvenilirliği düşürür.
- Matris güncel tutulmazsa değersizleşir; değişiklik olduğunda güncellemeyi planla.

### En sık yapılan hatalar

- Gereksinimler arasında ilişki kurmak yerine yalnızca listelemek
- Kimlik tutarsızlığı: FR-08 yerine FR-8 gibi farklı yazımlar kullanmak
- Yalnızca pozitif akışları bağlamak, hata ve boş durum senaryolarını unutmak
- Matrisi bir kez hazırlayıp hiç güncellemeden arşivlemek
- Kapsam dışı alanları açıklamadan boş bırakmak

---

## Mülakat Soruları

1. Gereksinim İzlenebilirlik Matrisi nedir ve ne işe yarar?
2. Bu projede RTM hazırlamak neden faydalı oldu?
3. Bir BR ile birden fazla FR arasında neden bire-çok ilişki kurulabilir?
4. Matristeki boş bir AC alanı ne anlama gelir?
5. Bir gereksinim değiştiğinde matrisi nasıl kullanırsınız?
6. BR-18 veri güvenliği gereksinimini neden yalnızca bir kabul kriteri ile ilişkilendirdiniz?
7. Fonksiyonel olmayan gereksinimleri bu matrise dahil etmediniz; bunun nedeni nedir?
8. Gerçek bir projede RTM'yi kim günceller ve ne zaman güncellenir?
9. RTM ile test planı arasındaki fark nedir?
10. Kullanıcıya kapalı modülleri kapsam dışı bırakma kararınızı nasıl savunursunuz?

---

## Kalite Kontrolü

- [x] Tüm BR, FR, US, UC ve AC kimlikleri önceki dokümanlarla karşılaştırıldı.
- [x] Kodda veya kullanıcı arayüzünde karşılığı olmayan gereksinimler eklenmedi.
- [x] Kapsam dışı bırakılan konular gerekçesiyle birlikte belirtildi.
- [x] Boş alanlar açıklamayla desteklendi.
- [x] Doküman seviyesi ve dili portföy projesi ve Junior Business Analyst hedeflerine uygun tutuldu.
