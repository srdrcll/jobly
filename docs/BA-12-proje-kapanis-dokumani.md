# BA-12 — Proje Kapanış Dokümanı

## Doküman Bilgileri

| Alan | Bilgi |
| --- | --- |
| Proje | Kariyer Pusulası |
| Doküman adı | Proje Kapanış Dokümanı |
| Doküman kodu | BA-12 |
| Sürüm | 0.1 |
| Durum | Taslak |
| Yazar | Serdar Ç. |
| Tarih | 1 Ağustos 2026 |
| İlişkili dokümanlar | BA-1'den BA-11'e tüm dokümanlar |

Bu doküman, projenin tüm BA dokümanları tamamlandıktan sonra hazırlanmıştır. Proje ticari bir ürün değildir; bu nedenle içerik gerçek kurumsal sonuçlar yerine öğrenme çıktıları ve portföy hedefleri üzerine kurulmuştur.

## Amaç

Kariyer Pusulası projesinin iş analizi sürecini özetlemek, hazırlanan dokümanların bütününe bir son bağlam sağlamak ve projenin başlangıçta belirlenen hedeflerine ne ölçüde ulaşıldığını dürüstçe değerlendirmektir. Bu doküman aynı zamanda gelecekte yapılacak çalışmalar için bir başlangıç noktası işlevi görür.

## Kapsam

Bu kapanış dokümanı yalnızca iş analizi sürecini kapsar. Geliştirme sürecinin teknik ayrıntıları, deployment adımları ve kaynak kodu bu dokümanın konusu değildir.

## İçindekiler

1. Projeye genel bakış
2. Hazırlanan dokümanlar özeti
3. Kapsam değerlendirmesi
4. Öğrenme çıktıları
5. Açık kalan konular ve gelecek çalışmalar
6. Öz değerlendirme
7. Öğrenme notları
8. Mülakat soruları

---

## 1. Projeye Genel Bakış

| Alan | Bilgi |
| --- | --- |
| Proje adı | Kariyer Pusulası |
| Proje türü | Portföy projesi — tek geliştirici |
| Platform | Web uygulaması |
| Teknolojiler | React 19, TypeScript, Vite, Tailwind CSS, Supabase, TanStack Query, Zod |
| Mevcut sürüm | v1.0.0 (30 Temmuz 2026) |
| BA süreci başlangıcı | 1 Ağustos 2026 |
| BA süreci sonu | 1 Ağustos 2026 |

Kariyer Pusulası; iş arayan bir kullanıcının başvurularını, hedef şirketlerini ve mülakat planlarını tek bir web uygulamasında takip etmesine olanak tanıyan kişisel bir başvuru takip sistemidir. Bu proje ticari bir ürün değildir; Junior Business Analyst portföyü ve öğrenme amacıyla geliştirilmiştir.

---

## 2. Hazırlanan Dokümanlar Özeti

| Doküman | Başlık | Temel katkısı |
| --- | --- | --- |
| BA-1 | İş Gereksinimleri Dokümanı | Projenin iş problemini, hedef kullanıcıyı, 18 iş gereksinimini ve kapsam sınırlarını tanımladı |
| BA-2 | Paydaş Analizi | İki paydaşı (kullanıcı ve geliştirici) ve bağımlılık olarak Supabase'i belirleyip ilgi/etki konumlarını değerlendirdi |
| BA-3 | Kullanıcı Personaları | İki kullanıcı personası tanımladı; birincil aktif iş arayan, ikincisi kariyer yönünü değiştiren profesyoneli temsil etti |
| BA-4 | AS-IS / TO-BE Süreç Analizi | Spreadsheet/not bazlı takip yönteminin sorunlarını ve Kariyer Pusulası ile oluşturulan iyileştirilmiş akışı karşılaştırdı |
| BA-5 | Kullanıcı Hikâyesi Haritası | 23 kullanıcı hikâyesini 6 üst düzey faaliyet altında düzenleyerek kullanıcı yolculuğunu haritaladı |
| BA-6 | Fonksiyonel Gereksinimler | 42 fonksiyonel gereksinimi (FR-01'den FR-42'ye) modül bazında, "Sistem … yapmalıdır" formatında tanımladı |
| BA-7 | Fonksiyonel Olmayan Gereksinimler | Kullanılabilirlik, güvenlik, güvenilirlik, performans ve bakım yapılabilirlik başlıklarında kalite gereksinimlerini tanımladı |
| BA-8 | Kullanım Senaryoları | 12 kullanım senaryosunu adım adım, alternatif ve hata akışlarıyla birlikte tanımladı |
| BA-9 | Kabul Kriterleri | 40 kabul kriterini (AC-01'den AC-40'a) Verildiğinde/Yapıldığında/Beklenen sonuç yapısıyla yazdı |
| BA-10 | BPMN ve UML Diyagramları | 2 BPMN akış diyagramı, 1 kullanım senaryosu diyagramı, 1 sınıf diyagramı, 1 durum diyagramı ve 1 aktivite diyagramı hazırladı |
| BA-11 | Gereksinim İzlenebilirlik Matrisi | BR, FR, US, UC ve AC kimliklerini tek tabloda ilişkilendirerek değişiklik etkisini izlenebilir kıldı |
| BA-12 | Proje Kapanış Dokümanı | Sürecin bütününü özetledi, öğrenme çıktılarını ve gelecek çalışmaları belirtti |

**Toplam:** 12 doküman, yaklaşık 165 sayfa düzeyinde içerik.

---

## 3. Kapsam Değerlendirmesi

### Başlangıçta belirlenen kapsam

BA-1'de tanımlanan temel kapsam şu modülleri içeriyordu:

- Kullanıcı hesabı ve oturum yönetimi
- Başvuru yönetimi (oluşturma, listeleme, arama, filtreleme, toplu işlem)
- Şirket yönetimi
- Mülakat yönetimi (liste ve takvim görünümü)
- Gösterge paneli ve grafikler
- Profil ve ayarlar

### Kapsam dışında bırakılanlar

Aşağıdaki konular, kodda varlığına rağmen kullanıcıya açık olmadığı için iş analizi kapsamının dışında tutuldu:

| Konu | Gerekçe |
| --- | --- |
| AI Kariyer Asistanı | Rota `/ai-assistant` gösterge paneline yönlendiriyor; kullanıcı arayüzünde erişilemiyor |
| Şablonlar | Rota `/templates` gösterge paneline yönlendiriyor; kullanıcı arayüzünde erişilemiyor |
| Gerçek e-posta bildirimi | Tercih kaydı var; bildirim gönderimi için servis yok |
| Haricî entegrasyonlar | Takvim, iş ilanı platformu ve e-posta entegrasyonu mevcut sürümde yok |

Bu kararlar tutarlı biçimde her dokümanda belgelendi.

### Kapsam sapması

Planlanan ile gerçekleşen kapsam arasında herhangi bir sapma yaşanmadı. Tüm dokümanlarda tanımlanan sınırlar korundu.

---

## 4. Öğrenme Çıktıları

Bu bölüm, BA sürecinde ne öğrenildiğini dürüstçe değerlendirir. Sayısal başarı oranı yerine kavramsal kazanımlar anlatılmıştır.

### İş Analizi temel kavramları

- **İş gereksinimi ile fonksiyonel gereksinim arasındaki fark** somut örneklerle anlaşıldı. "Kullanıcı mülakatını takip etmeli" bir iş ihtiyacıdır; "sistem liste ve takvim görünümü sunmalıdır" ise bunun fonksiyonel karşılığıdır.
- **Kapsam yönetiminin önemi** gerçek kodla test edildi. Kaynak dosyası var olmasına rağmen kullanıcıya açık olmayan özellikleri kapsama dahil etmemek, gerçek projelerde "feature creep" riskini anlamayı sağladı.
- **Gözlemlenebilir kabul kriterleri** yazmak, beklentiyi test edilebilir bir sonuca dönüştürme alıştırması oldu.

### Dokümantasyon becerileri

- Tekrarlayan bölümler yerine her dokümanın kendine özgü katkısının ne olduğunu düşünmek, doküman yapısını planlamayı öğretti.
- İzlenebilirlik matrisi, birbirinden bağımsız görünen dokümanların aslında nasıl birbirini desteklediğini somut olarak gösterdi.
- Gerçek olmayan veri yazmama kuralı, belirsizlik karşısında "hedeflenen" ve "planlanan" gibi dürüst ifadeler kullanmayı pekiştirdi.

### Kod — doküman tutarlılığı

Tüm dokümanlar kod tabanı incelenerek hazırlandı. Bu süreç şu alışkanlığı kazandırdı: Bir özelliği yazmadan önce kodda gerçekten var olup olmadığını, hangi rotada bulunduğunu ve form doğrulama kurallarının ne olduğunu kontrol etmek.

---

## 5. Açık Kalan Konular ve Gelecek Çalışmalar

### Kısa vadeli öncelikler

| Konu | Açıklama |
| --- | --- |
| AI Kariyer Asistanı analizi | Modül kod tabanında mevcut; kullanıcıya açıldığında BA-6, BA-8, BA-9 ve BA-11 güncellenmelidir |
| Şablonlar modülü analizi | Benzer şekilde, erişime açıldığında mevcut dokümanların gözden geçirilmesi gerekecek |
| Gerçek bildirim servisi | Tercih kaydı analiz edildi; bildirim gönderimi için ayrı bir teknik ve iş analizi gerekir |

### Orta vadeli fırsatlar

ROADMAP.md dosyasında listelenen planlı sürümler, ilerleyen aşamalarda ayrı BA döngüleri gerektirecektir:

| Planlı sürüm | Kapsam özeti |
| --- | --- |
| v1.1.0 | Çok sürümlü CV yönetimi ve başvuruya belge ekleme |
| v1.2.0 | Tarayıcı push bildirimi ve takvim dışa aktarma (.ics) |
| v1.3.0 | İş ilanı platformlarından Chrome uzantısıyla tek tıkla kayıt |

Bu konular mevcut sürümde uygulanmadığından herhangi bir dokümana gereksinim olarak eklenmemiştir.

### Doküman bakım ihtiyacı

- Yeni bir özellik eklendiğinde veya mevcut bir özellik değiştiğinde, etkilenen BA dokümanları güncellenmeli ve BA-11 izlenebilirlik matrisi yeniden düzenlenmelidir.
- Mevcut dokümanların tamamı "Taslak" statüsündedir. Gerçek bir proje ortamında paydaş gözden geçirmesi sonrasında "Onaylı" statüsüne geçirilmeleri beklenir; bu proje için bu adım portföy sahibinin kendi değerlendirmesine bırakılmıştır.

---

## 6. Öz Değerlendirme

Bu bölüm, projeyi yürüten Serdar Ç.'nin sürece ilişkin kişisel gözlemlerini içermektedir.

**Doğru yapılanlar:**
- Kod tabanına bağlılık tutarlı biçimde korundu. Her dokümanı yazmadan önce ilgili kaynak dosyaları incelendi.
- Gerçek olmayan metrikler, kurumsal onaylar veya ticari paydaşlar hiçbir dokümana eklenmedi.
- Kapsam dışı bırakılan konular her seferinde gerekçesiyle birlikte belirtildi.

**Geliştirilebilecek alanlar:**
- Kullanıcı hikâyeleri ve kullanım senaryoları gerçek kullanıcı görüşmeleri yerine uygulama incelenerek yazıldı. Gerçek kullanıcılardan alınan geri bildirim bu dokümanların kalitesini artırırdı.
- Kabul kriterlerinin bir kısmı otomatik testlerle desteklenebilirdi; ancak test kapsamı bu projenin BA hedefleri dışında kaldı.
- BPMN diyagramları, Mermaid sınırlılıkları nedeniyle tam BPMN gösterimi sunamamaktadır. Draw.io veya Camunda Modeler gibi araçlarla daha eksiksiz modeller hazırlanabilirdi.

---

## Öğrenme Notları

### Bu doküman nedir?

Proje Kapanış Dokümanı, bir proje tamamlandığında o projenin hedeflerini, çıktılarını, kapsam değerlendirmesini, öğrenilen dersleri ve gelecek fırsatları özetleyen son belgedir. "Ne yaptık, ne öğrendik, ne kaldı?" sorularını yanıtlar.

### Neden hazırlanır?

Proje bilgisini kurumsal hafızaya aktarmak için hazırlanır. Sonraki projelerde benzer hatalardan kaçınmayı ve başarıların tekrarlanmasını sağlar. Portföy açısından ise tüm sürecin bütünlüklü anlatılabildiğini gösterir.

### Kim hazırlar?

Genellikle proje yöneticisi veya iş analisti hazırlar. Ekip üyelerinin katılımıyla gözden geçirilir. Küçük projelerde tek kişi tüm süreci özetleyebilir.

### Kimler kullanır?

Proje sahibi, gelecekteki analistler ve proje yöneticileri kullanır. Portföy değerlendirmesinde mülakatçı bu dokümanla tüm sürece genel bakış kazanır.

### Projenin hangi aşamasında hazırlanır?

Tüm çıktılar tamamlandıktan sonra, proje kapanışında hazırlanır. Bu doküman, serinin son belgesidir.

### Gerçek projelerde nasıl kullanılır?

Müşteri onayı alınması, ekibin serbest bırakılması ve proje arşivinin oluşturulması gibi resmi kapanış adımlarına eşlik eder. Dersler çıkarma toplantısının (lessons learned) çıktısı bu dokümana işlenir.

### Junior İş Analisti için dikkat edilmesi gerekenler

- Kapanış dokümanı bir pazarlama metni değildir; başarılar kadar açık kalan noktaları da dürüstçe belirt.
- Gelecek çalışmaları mevcut sürümle karıştırma; ne yapıldı, ne yapılmadı net biçimde ayrıştır.
- Öz değerlendirme bölümü, mülakatçının seni nasıl gördüğünü şekillendirir; hem güçlü yönleri hem gelişim alanlarını dengeli yaz.

### En sık yapılan hatalar

- Yalnızca başarıları listelemek, açık kalan sorunları görmezden gelmek
- Gerçekleşen kapsam ile başlangıç kapsamını karşılaştırmamak
- Sayısal olmayan öğrenme çıktılarını "Çok şey öğrendim" gibi belirsiz ifadelerle geçiştirmek
- Gelecek çalışmaları tanımlamamak ya da mevcut özelliklerle karıştırmak
- Dokümanın dili ile portföyün geri kalanının tutarsız olması

---

## Mülakat Soruları

1. Proje Kapanış Dokümanı neden hazırlanır ve kimler için değer taşır?
2. Bu projede kapsam dışında bıraktığınız en önemli konular nelerdi ve bu kararı nasıl gerekçelendirdiniz?
3. Gerçek kullanıcı görüşmesi yapılmadan hazırlanan dokümanların sınırlılıkları nelerdir?
4. Öz değerlendirme bölümünde geliştirilebilecek alanlar olduğunu belirttiniz; bunları nasıl iyileştirirdiniz?
5. BA-11 izlenebilirlik matrisi pratikte size ne sağladı?
6. İlerideki bir sürüm için yeni bir özellik eklendiğinde hangi dokümanları güncellemeniz gerekirdi?
7. Bu projeyi bir ekiple yürütseydik hangi dokümanları nasıl paylaştırırdınız?
8. "Taslak" statüsündeki dokümanlar ile "Onaylı" statüsündeki dokümanlar arasındaki fark nedir?
9. Lessons learned (dersler çıkarma) toplantısı nasıl yapılır ve çıktıları bu dokümana nasıl yansır?
10. Bu portföy projesini bir mülakatçıya tanıtırken hangi dokümandan başlardınız ve neden?

---

## Kalite Kontrolü

- [x] Doküman bütünüyle kod tabanı, CHANGELOG ve ROADMAP ile karşılaştırıldı.
- [x] Doğrulanamayan başarı oranı, KPI, uptime veya kurumsal onay bilgisi kullanılmadı.
- [x] Açık kalan konular ve gelecek çalışmalar mevcut özelliklerden net biçimde ayrıştırıldı.
- [x] Öz değerlendirme bölümü hem güçlü yönleri hem gelişim alanlarını dengeledi.
- [x] Doküman tüm seri dokümanlarıyla tutarlı ve portföy + Junior BA seviyesine uygun yazıldı.
