# BA-3 — Kullanıcı Personaları

## Doküman Bilgileri

| Alan | Bilgi |
| --- | --- |
| Proje | Kariyer Pusulası |
| Doküman adı | Kullanıcı Personaları |
| Doküman kodu | BA-3 |
| Sürüm | 0.1 |
| Durum | Taslak / varsayıma dayalı |
| Yazar | Serdar Ç. |
| Tarih | 1 Ağustos 2026 |
| İlişkili dokümanlar | BA-1 İş Gereksinimleri Dokümanı, BA-2 Paydaş Analizi |

Bu dokümandaki personalar gerçek kullanıcı görüşmesi, anketi veya kullanım verisi sonucu oluşturulmamıştır. Mevcut ekranların, form alanlarının ve kullanıcı akışlarının desteklediği ihtiyaçlardan türetilmiş temsilî kullanıcı modelleridir. Bu nedenle yaş, gelir, başvuru sayısı, başarı oranı veya belirli bir kişinin deneyimi gibi doğrulanmamış bilgi içermez.

## Amaç

Kariyer Pusulası geliştirilirken “kullanıcı” ifadesini soyut bırakmamak; hangi kullanım ihtiyacına göre ekran ve akışların değerlendirileceğini görünür hâle getirmektir. Personalar, geliştirme kararlarında kullanıcı odaklı düşünmeye yardımcı olur; gerçek kullanıcıların yerine geçen kesin kanıtlar değildir.

## Kapsam

Bu çalışma yalnızca mevcut uygulamada hesabı olan iş arayan kullanıcıyı ele alır. İşveren, işe alım uzmanı, yönetici veya uygulama destek personeli için kullanıcı rolü bulunmadığından onlar için persona oluşturulmamıştır.

Personalar; başvuru takibi, şirket araştırma kaydı, mülakat planlaması ve kişisel özetleri görme ihtiyaçları üzerinden hazırlanmıştır. Kullanıcıya açık olmayan AI Asistanı ve Şablonlar modülleri persona senaryolarına dahil edilmemiştir.

## İçindekiler

1. Persona yaklaşımı ve kanıt sınırı
2. Persona özeti
3. P-01: Başvuru sürecini düzenlemek isteyen kullanıcı
4. P-02: Mülakat takibini öne çıkaran kullanıcı
5. Persona kullanım notları
6. Gelecek doğrulama çalışmaları
7. Öğrenme notları
8. Mülakat soruları

## 1. Persona yaklaşımı ve kanıt sınırı

Persona, aynı kullanım amacı ve davranış örüntüsünü temsil eden kurgusal ama araştırmaya dayandırılması hedeflenen kullanıcı tanımıdır. Bu projede doğrudan araştırma verisi olmadığı için iki persona, **hipotez persona** olarak değerlendirilmelidir.

Bu iki profil iki farklı insan olduğunu ispatlamaz. Aynı iş arayan kişi, başvuru yoğunlaştığında P-01'e; mülakat tarihi yaklaştığında P-02'ye benzer ihtiyaçlar gösterebilir. Ayrım, uygulamadaki öncelikli kullanım bağlamlarını anlamak içindir.

### Kullanılan kaynaklar

- Başvuru oluşturma formu: şirket, pozisyon, durum, tarih, iletişim, öncelik ve not alanları
- Şirket oluşturma formu: araştırma bilgileri, iletişim kanalları, durum, puan ve favori alanı
- Mülakat oluşturma formu: ilişkili başvuru, tarih-saat, görüşme türü, hazırlık notu ve sonuç alanları
- Başvuru listesi, şirket listesi, mülakat takvimi ve gösterge paneli

## 2. Persona özeti

| ID | Temsil ettiği ihtiyaç | Birincil kullandığı alanlar | Öncelik |
| --- | --- | --- | --- |
| P-01 | Birden fazla başvuru ve hedef şirket bilgisini düzenlemek | Başvurular, Şirketler, Gösterge Paneli | Yüksek |
| P-02 | Yaklaşan mülakatı planlamak ve görüşme notlarını saklamak | Mülakatlar, Başvurular, Gösterge Paneli | Yüksek |

## 3. P-01 — Başvuru sürecini düzenlemek isteyen kullanıcı

### Tanım

P-01, iş arama sürecindeki bilgileri tek bir yerde görmek isteyen iş arayan kullanıcıyı temsil eder. Temel ihtiyacı, başvurunun hangi şirkete ve pozisyona ait olduğunu; sürecin hangi durumda bulunduğunu kaybetmeden takip etmektir.

### Hedefler

- Yeni başvuruyu temel bilgileriyle kaydetmek
- Başvuruları durumuna, önceliğine veya çalışma modeline göre ayırmak
- Hedef şirket hakkında araştırma ve iletişim bilgisini saklamak
- Başvuru kaydını gerektiğinde bulmak, güncellemek veya silmek
- Kendi kayıtlarından oluşan başvuru özetini ve dağılımını görmek

### İhtiyaçlar

| İhtiyaç | Uygulamadaki mevcut destek |
| --- | --- |
| Başvuruyu hızlı kaydetme | Şirket adı, pozisyon ve durum alanlarıyla başvuru oluşturma |
| Ek bağlam saklama | Tarih, çalışma modeli, maaş beklentisi, ilan bağlantısı, iletişim bilgisi, öncelik ve not alanları |
| Yoğun listeyi yönetme | Arama, filtreleme, sıralama ve toplu durum güncelleme/silme |
| Şirket araştırmasını ayırma | Şirket kaydı, durum, puan, favori ve not alanları |
| Genel görünüm alma | Başvuru istatistik kartları ve grafikler |

### Karşılaşabileceği sorunlar

- Başvuru bilgileri farklı notlarda veya bağlantılarda tutulduğunda eski kayda ulaşmak zorlaşabilir.
- Birden fazla başvuruda hangi sürecin takip gerektirdiği anlaşılmayabilir.
- Şirketle ilgili iletişim veya araştırma notu başvuru bilgisinden kopabilir.

Bu sorunlar, gerçek kullanıcıdan alınmış şikâyetler değildir; uygulamadaki form ve liste işlevlerinin çözmeyi hedeflediği durumların analitik ifadesidir.

### Temsilî kullanım senaryosu

Kullanıcı, dışarıda yaptığı bir iş başvurusundan sonra Kariyer Pusulası'na giriş yapar. Başvurunun şirket adı, pozisyonu, başvuru tarihi ve durumunu ekler. Gerekli görürse ilan bağlantısını, iletişim kişisini ve notunu kaydeder. Daha sonra Başvurular ekranında arama, filtreleme veya sıralama kullanarak kaydı bulur ve durumunu günceller. Ayrıca şirketi hedef şirket olarak ayrı bir kayda ekleyebilir.

### Tasarım ve analiz çıkarımları

- Zorunlu alanlar, kayıt oluşturmayı gereksiz yere zorlaştırmamalıdır.
- Liste görünümünde durum ve öncelik kolay ayırt edilmelidir.
- Arama, filtre ve sıralama birlikte çalışırken kullanıcı seçimi veya görünür kayıtlar yanlış anlaşılmamalıdır.
- Başvuru ile şirket bilgisinin ayrı tutulduğu kullanıcıya açık biçimde anlatılmalıdır.

## 4. P-02 — Mülakat takibini öne çıkaran kullanıcı

### Tanım

P-02, başvuru sürecinde mülakat tarihini, görüşme ayrıntılarını ve hazırlık notlarını düzenlemek isteyen iş arayan kullanıcıyı temsil eder. Bu profil için zaman bilgisi ve bağlam, başvuru kaydının kendisi kadar önemlidir.

### Hedefler

- Mülakat tarihini, saatini ve görüşme türünü kayıt altına almak
- Mülakatı var olan bir başvuruyla ilişkilendirmek veya bilgileri manuel girmek
- Görüşmeci, toplantı bağlantısı, konum ve hazırlık notlarına tekrar erişmek
- Yaklaşan mülakatları liste veya takvim görünümünde görmek
- Görüşme sonucunu ve takip tarihini sonradan güncellemek

### İhtiyaçlar

| İhtiyaç | Uygulamadaki mevcut destek |
| --- | --- |
| Planlı görüşmeyi saklama | Şirket, pozisyon, aşama, tür, tarih, saat ve süre alanları |
| Başvuru bilgisini yeniden yazmama | İlişkili başvuru seçildiğinde şirket ve pozisyonun formda doldurulması |
| Hazırlık ayrıntılarına erişme | Hazırlık notu, mülakatçı, rol, toplantı bağlantısı ve konum alanları |
| Tarihe göre takip | Liste, aylık takvim ve yaklaşan mülakat geri sayımı |
| Sonucu kaydetme | Beklemede, başarılı, başarısız veya teklif sonucu; takip tarihi |

### Karşılaşabileceği sorunlar

- Tarih, saat veya toplantı bağlantısı başka bir araçta kaldığında görüşme öncesi hazırlık eksik olabilir.
- Birden fazla aşamalı süreçte hangi mülakatın hangi başvuruyla ilgili olduğu karışabilir.
- Görüşme sonrasında not ve sonucun güncellenmesi unutulabilir.

Bu maddeler, kişisel performans veya başarı iddiası değildir. Mevcut mülakat alanlarının hangi kullanım ihtiyacını desteklediğini açıklamak için yazılmıştır.

### Temsilî kullanım senaryosu

Kullanıcı, planlanan görüşme için Mülakatlar ekranından yeni kayıt oluşturur. Varsa ilgili başvuruyu seçerek şirket ve pozisyon alanlarının gelmesini sağlar; görüşme tarihini, saatini ve bağlantısını ekler. Hazırlık notunu kaydeder. Görüşme yaklaştığında kaydını takvimden veya geri sayım alanından kontrol eder. Görüşme sonrası sonucu ve notlarını düzenler.

### Tasarım ve analiz çıkarımları

- Tarih, saat ve aşama alanlarındaki doğrulama mesajları anlaşılır olmalıdır.
- Başvurudan mülakata bilgi aktarımı, yanlış kaydı değiştirmeden kullanıcıya görünür olmalıdır.
- Takvim ve liste aynı mülakat verisini tutarlı göstermelidir.
- Geri sayım, yalnızca kullanıcının kaydettiği tarih ve saate dayanır; bildirim gönderildiği anlamına gelmez.

## 5. Persona kullanım notları

Bu personalar aşağıdaki kararları kontrol etmek için kullanılabilir:

- Yeni bir alan eklendiğinde, P-01 veya P-02 için hangi ihtiyacı desteklediği sorgulanır.
- Bir form uzadığında, alanın zorunlu olup olmadığı persona hedefleriyle değerlendirilir.
- Liste, takvim ve gösterge paneli tasarımında kullanıcının kayıt bulma veya yaklaşan görüşmeyi görme ihtiyacı önceliklendirilir.
- Kullanıcı hikâyesi yazılırken “P-01 olarak…” yerine daha doğal biçimde “iş arayan kullanıcı olarak…” denebilir; persona, hikâyenin arkasındaki ihtiyacı hatırlatır.

Persona tek başına gereksinim, tasarım kararı ya da kullanıcı kabulü kanıtı değildir. Bu nedenle BA-1'deki gereksinimlerin yerine kullanılmamalıdır.

## 6. Gelecek doğrulama çalışmaları

Personaları varsayımdan kanıta yaklaştırmak için ileride aşağıdaki çalışmalar planlanabilir:

- İş arayan kişilerle kısa görüşmeler yaparak hangi bilgileri takip ettiklerini sormak
- Başvuru, şirket ve mülakat ekranlarındaki zorunlu alanların yeterliliğini gözlemlemek
- Bir kullanıcının başvuru kaydından mülakat kaydına geçerken zorlanıp zorlanmadığını görmek
- Geri bildirimlere göre persona sayısını azaltmak, birleştirmek veya değiştirmek

Bu çalışmalar henüz gerçekleştirilmiş değildir; bu nedenle doküman kullanıcı araştırması yapılmış gibi yorumlanmamalıdır.

## Öğrenme Notları

### Bu doküman nedir?

Kullanıcı personası, belirli bir kullanım amacı ve davranış biçimini temsil eden, kısa ve odaklı kullanıcı modelidir. Kullanıcıyı tek bir “ortalama kişi” olarak düşünmemeye yardımcı olur.

### Neden hazırlanır?

Ekran ve gereksinim kararlarında “bu özellik kimin hangi sorununu çözüyor?” sorusunu görünür kılar. Özellikle farklı kullanım bağlamları varsa önceliklendirmeyi kolaylaştırır.

### Kim hazırlar?

Genellikle iş analisti, UX araştırmacısı veya ürün ekibi hazırlar. İyi bir persona; görüşme, anket, gözlem veya kullanım verisi gibi araştırmalardan beslenir.

### Kimler kullanır?

İş analisti, tasarımcı, geliştirici ve test yapan kişi kullanabilir. Proje sahibi için de gereksinimlerin arkasındaki kullanıcı ihtiyacını özetler.

### Projenin hangi aşamasında hazırlanır?

Keşif ve gereksinim analizi aşamasında hazırlanması idealdir. Yeni kullanıcı araştırması veya yeni bir kullanıcı rolü ortaya çıktığında güncellenir.

### Gerçek projelerde nasıl kullanılır?

Persona; kullanıcı hikâyeleri, kullanıcı yolculukları, ekran tasarımı ve kullanılabilirlik testi senaryoları için referans olur. Ancak gerçek araştırma verisinin yerine geçmez; düzenli olarak doğrulanır.

### Junior İş Analisti için dikkat edilmesi gerekenler

- Personayı demografik bilgi yığınına dönüştürme; hedef, ihtiyaç ve soruna odaklan.
- Araştırma yoksa bunu açıkça yaz ve personayı hipotez olarak adlandır.
- Bir persona için uydurma isim, gelir, şehir veya nicel davranış verisi kullanmak zorunda değilsin.
- Persona ile kullanıcı rolünü karıştırma: aynı rolün farklı kullanım ihtiyaçları olabilir.
- Kodda olmayan özelliği personanın ihtiyacı diye aktif kapsamda sunma.

### En sık yapılan hatalar

- Araştırma yapılmadığı hâlde kesin kullanıcı davranışı varmış gibi yazmak
- Çok fazla ve birbirinden ayrışmayan persona üretmek
- Kurgusal ayrıntıları gerçeğin yerine koymak
- Personayı gereksinim veya kabul kriteri gibi kullanmak
- Kullanıcıya açık olmayan modüller üzerine persona senaryosu kurmak

## Mülakat Soruları

1. Persona nedir, kullanıcı rolünden farkı nedir?
2. Bu projedeki personaları hangi kaynaklara dayanarak oluşturdunuz?
3. Neden bu dokümanda kişisel demografik bilgiler kullanmadınız?
4. Araştırma verisi olmayan bir projede persona hazırlamak doğru mudur?
5. Persona ile kullanıcı hikâyesi arasında nasıl bir ilişki vardır?
6. Aynı kullanıcı neden birden fazla persona davranışı gösterebilir?
7. Persona oluştururken hangi bilgilerin varsayım olduğunu nasıl belirtirsiniz?
8. Persona sayısını artırmak ne zaman faydalı, ne zaman zararlı olur?
9. Bu personaları doğrulamak için hangi araştırma yöntemini seçerdiniz?
10. Persona çıktısı bir ekran tasarım kararını nasıl etkileyebilir?

---

## Kalite Kontrolü

- [x] Persona içerikleri gerçek kullanıcı araştırması sonucu gibi sunulmadı.
- [x] Yaş, gelir, başarı oranı veya doğrulanamayan kullanıcı verisi eklenmedi.
- [x] Mevcut başvuru, şirket, mülakat ve gösterge paneli işlevleriyle uyum kontrol edildi.
- [x] Kullanıcıya kapalı AI Asistanı ve Şablonlar modülleri senaryolara alınmadı.
- [x] Doküman öğrenci seviyesi ve mülakatta açıklanabilirlik gözetilerek yazıldı.
