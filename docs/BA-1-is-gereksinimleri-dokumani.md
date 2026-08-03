# BA-1 — İş Gereksinimleri Dokümanı

## Doküman Bilgileri

| Alan | Bilgi |
| --- | --- |
| Proje | Kariyer Pusulası |
| Doküman adı | İş Gereksinimleri Dokümanı |
| Doküman kodu | BA-1 |
| Sürüm | 0.1 |
| Durum | Taslak |
| Yazar | Serdar Ç. |
| Tarih | 1 Ağustos 2026 |
| Proje türü | Portföy projesi / web uygulaması |

Bu doküman, Kariyer Pusulası'nın mevcut kod tabanı üzerinden hazırlanmıştır. Kaynak olarak `README.md`, uygulama rotaları, ekran bileşenleri, doğrulama kuralları ve Supabase şeması incelenmiştir. Buradaki gereksinimler, mevcut sürümde bulunan veya kullanıcı arayüzünde erişilebilen işlevleri tarif eder.

## Amaç

Kariyer Pusulası; iş arayan bir kullanıcının başvuru, şirket ve mülakat bilgilerini tek bir web uygulamasında düzenli biçimde takip etmesine yardımcı olmayı amaçlar. Bu dokümanın amacı, uygulamanın hangi ihtiyacı karşıladığını, kim için geliştirildiğini ve mevcut sürümde hangi iş ihtiyaçlarını desteklediğini açıkça tanımlamaktır.

## Kapsam

### Kapsam dahilinde

- Kullanıcı hesabı oluşturma, giriş yapma, şifre sıfırlama ve şifre değiştirme
- İş başvurusu kaydetme, görüntüleme, düzenleme, silme, arama, filtreleme ve sıralama
- Hedef şirket kaydetme ve şirket bilgilerini yönetme
- Mülakat planlama, liste ve takvim görünümünde takip etme
- Başvuru verilerinden gösterge paneli ve grafik üretme
- Profil, tema, tercih ve veri dışa aktarma işlemleri
- Kullanıcının kendi verilerine erişmesini sağlayan veri izolasyonu

### Kapsam dışında

- İş ilanı yayınlama veya iş ilanı platformlarından otomatik veri çekme
- İşveren, insan kaynakları uzmanı veya yönetici için ayrı kullanıcı rolleri
- Başvuru gönderme işleminin uygulama içinden yapılması
- Gerçek e-posta, takvim veya anlık bildirim gönderimi
- Ödeme, abonelik ve ticari kullanım süreçleri
- Yapay zekâ kariyer asistanı ve şablon kütüphanesinin kullanıcıya açık kullanımı

Son iki modüle ilişkin kaynak dosyaları bulunmasına rağmen, mevcut navigasyonda “Yakında” olarak işaretlenmişler ve ilgili rotalar gösterge paneline yönlendirilmektedir. Bu nedenle bu dokümanda aktif bir gereksinim olarak ele alınmamıştır.

## İçindekiler

1. İş problemi ve çözüm yaklaşımı
2. Hedef kullanıcı ve paydaşlar
3. Mevcut çözümün sınırları
4. İş gereksinimleri
5. İş kuralları ve veri ihtiyaçları
6. Varsayımlar, bağımlılıklar ve gelecek çalışmalar
7. Öğrenme notları
8. Mülakat soruları

## 1. İş problemi ve çözüm yaklaşımı

İş arama sürecinde bir kişi birden fazla şirkete, pozisyona ve mülakat aşamasına ait bilgiyi takip eder. Şirket adı, pozisyon, başvuru tarihi, görüşme saati ve süreç sonucu farklı yerlerde tutulduğunda bilgi dağınık hâle gelebilir. Bu durum, başvurunun hangi aşamada olduğunu hatırlamayı ve yaklaşan mülakatları planlamayı zorlaştırır.

Kariyer Pusulası bu ihtiyaca; başvuru, şirket ve mülakat kayıtlarını tek kullanıcı hesabına bağlı olarak saklayan bir takip alanı sunarak cevap verir. Gösterge panelindeki sayı ve grafikler de kullanıcının kendi kayıtlarından türetilir; haricî bir başarı ölçümü veya tahmin niteliği taşımaz.

## 2. Hedef kullanıcı ve paydaşlar

### Birincil kullanıcı

**İş arayan kullanıcı:** Başvurularını, ilgilendiği şirketleri ve planladığı mülakatları kişisel olarak takip etmek isteyen kişidir. Mevcut uygulamada temel kullanıcı rolü budur.

### Paydaşlar

| Paydaş | İhtiyaç / beklenti |
| --- | --- |
| İş arayan kullanıcı | Kendi kariyer süreciyle ilgili kayıtları kolayca oluşturmak, güncellemek ve görmek |
| Proje sahibi / geliştirici | Uygulamanın kullanıcı akışlarını geliştirmek, hata durumlarını incelemek ve portföy projesini sürdürülebilir tutmak |
| Supabase hizmeti | Kimlik doğrulama ve kullanıcıya ait verilerin saklanması için teknik bağımlılık |

Bu portföy projesinde müşteri, sponsor, yatırımcı veya kurumsal onay makamı tanımlanmamıştır.

## 3. Mevcut çözümün sınırları

Uygulama bir kişisel başvuru takip aracıdır. Başvuru ve şirket bilgileri kullanıcı tarafından manuel girilir. Örneğin uygulama, bir iş ilanına başvuruyu dış sistemde gerçekleştirmez; kullanıcının gerçekleştirdiği başvuruya ait kaydı saklar. Benzer şekilde, ayarlar ekranında bildirime ilişkin tercihler kaydedilir; ancak kaynak kodunda e-posta veya cihaz bildirimi gönderen bir servis bulunmamaktadır.

## 4. İş gereksinimleri

Gereksinimler, iş ihtiyacını anlatacak düzeyde yazılmıştır. Ekran alanları, doğrulama mesajları ve teknik ayrıntılar sonraki analiz dokümanlarında daha ayrıntılı ele alınabilir.

| ID | İş gereksinimi | Öncelik | Mevcut karşılığı |
| --- | --- | --- | --- |
| BR-01 | Kullanıcı, kendisine ait bir hesap oluşturarak uygulamaya giriş yapabilmelidir. | Yüksek | Kayıt, giriş, şifre unutma ve şifre sıfırlama sayfaları |
| BR-02 | Kullanıcı, oturum açmadan kişisel başvuru, şirket ve mülakat verilerine erişememelidir. | Yüksek | Korunan rotalar ve Supabase kimlik doğrulama |
| BR-03 | Kullanıcı, yeni bir iş başvurusu kaydedebilmelidir. | Yüksek | Başvuru oluşturma penceresi |
| BR-04 | Kullanıcı, başvurunun şirketi, pozisyonu, durumu ve başvuru tarihi gibi bilgilerini takip edebilmelidir. | Yüksek | Başvuru listesi ve başvuru detay ekranı |
| BR-05 | Kullanıcı, bir başvuru için konum, çalışma modeli, ücret bilgisi, ilan bağlantısı, iletişim bilgisi, öncelik ve not ekleyebilmelidir. | Orta | Başvuru oluşturma/düzenleme alanları |
| BR-06 | Kullanıcı, başvurularını arayabilmeli; durum, öncelik ve çalışma modeline göre filtreleyip sıralayabilmelidir. | Yüksek | Başvurular ekranı filtre ve sıralama seçenekleri |
| BR-07 | Kullanıcı, bir veya birden fazla başvurunun durumunu değiştirebilmeli ya da başvuru kaydını silebilmelidir. | Yüksek | Tekli ve toplu işlemler |
| BR-08 | Kullanıcı, ilgilendiği şirketleri başvurudan bağımsız olarak kaydedebilmelidir. | Yüksek | Şirket yönetimi ekranı |
| BR-09 | Kullanıcı, şirketin sektör, konum, web sitesi, büyüklük, iletişim kişisi, iletişim kanalları, durum, not ve değerlendirme bilgisini yönetebilmelidir. | Orta | Şirket oluşturma/düzenleme alanları |
| BR-10 | Kullanıcı, şirketleri arayabilmeli, filtreleyebilmeli, sıralayabilmeli ve favori olarak işaretleyebilmelidir. | Orta | Şirket listesi ve toplu işlemler |
| BR-11 | Kullanıcı, bir mülakatı şirket, pozisyon, aşama, tür, tarih ve saat bilgileriyle planlayabilmelidir. | Yüksek | Mülakat oluşturma penceresi |
| BR-12 | Kullanıcı, mülakatı bir başvuru ile ilişkilendirebilmeli; görüşmeci, toplantı bağlantısı, hazırlık notu, görüşme notu, takip tarihi ve sonuç bilgilerini kaydedebilmelidir. | Orta | Mülakat oluşturma/düzenleme alanları |
| BR-13 | Kullanıcı, mülakatlarını liste ve aylık takvim görünümünde görüntüleyebilmelidir. | Yüksek | Mülakat ekranı görünüm seçenekleri |
| BR-14 | Kullanıcı, yaklaşan mülakatını ve kendi kayıtlarından hesaplanan mülakat özetlerini görebilmelidir. | Orta | Geri sayım ve mülakat özet kartları |
| BR-15 | Kullanıcı, başvurularına ait durum dağılımını, son altı aydaki ekleme sayısını ve son yedi gündeki aktiviteyi grafiklerle inceleyebilmelidir. | Orta | Gösterge paneli analiz bölümü |
| BR-16 | Kullanıcı, profil bilgilerini görebilmeli ve hesabının şifresini değiştirebilmelidir. | Yüksek | Profil ekranı |
| BR-17 | Kullanıcı, tema ve tercihlerini kaydedebilmeli; başvuru, şirket ve mülakat verilerini JSON dosyası olarak dışa aktarabilmelidir. | Orta | Ayarlar ekranı |
| BR-18 | Kullanıcı yalnızca kendi başvuru, şirket, mülakat ve ilişkili kayıtlarını görüntüleyip yönetebilmelidir. | Yüksek | Tablolardaki kullanıcı kimliği ve Row Level Security politikaları |

## 5. İş kuralları ve veri ihtiyaçları

### 5.1 İş kuralları

- Bir başvuruda şirket adı ve pozisyon bilgisi zorunludur.
- Başvuru durumu; taslak, başvuruldu, iletişime geçildi, mülakat, vaka çalışması, teklif veya reddedildi seçeneklerinden biri olmalıdır.
- Başvuru önceliği düşük, orta, yüksek veya kritik olarak seçilebilir.
- Başvurudaki çalışma modeli uzaktan, hibrit veya ofisten seçenekleriyle sınırlıdır.
- Şirket adı en az iki karakter olmalıdır. Şirket durumu hedef, araştırılıyor, başvuruldu, iletişime geçildi, mülakat yapıldı, teklif veya arşivlendi olabilir.
- Şirket puanı girilirse 1–5 aralığında olmalıdır.
- Mülakatta şirket adı, pozisyon, aşama, tarih ve saat gereklidir. Mülakat süresi en az 15 dakika olmalıdır.
- Mülakat sonucu beklemede, başarılı, başarısız veya teklif olarak kaydedilebilir.
- URL veya e-posta alanına veri girildiğinde, ilgili biçim doğrulamasından geçmelidir.
- Silme işlemi kullanıcı arayüzünde onay gerektirir. Veritabanında kullanıcı silindiğinde, kullanıcıya ait ilgili kayıtların silinmesi planlanan ilişki kuralıdır.

### 5.2 Temel veri ihtiyaçları

| İş alanı | Saklanan temel bilgiler |
| --- | --- |
| Kullanıcı hesabı | Kimlik doğrulama sağlayıcısındaki kullanıcı kimliği, e-posta ve kullanıcı metaverisi |
| Başvuru | Şirket, pozisyon, durum, tarih, konum, çalışma modeli, ücret, iletişim ve notlar |
| Şirket | Ad, sektör, konum, web sitesi, büyüklük, iletişim bilgileri, durum, puan ve favori bilgisi |
| Mülakat | İlişkili başvuru, şirket, pozisyon, aşama, tür, tarih-saat, görüşmeci, notlar ve sonuç |
| Ayarlar | Tema, para birimi ve bildirim tercihleri; tarayıcı yerel depolamasında tutulur |

### 5.3 Veri güvenliği ve sahiplik

Uygulamadaki ana veri tablolarında kullanıcı kimliği bulunur. Supabase Row Level Security politikaları, kullanıcının yalnızca kendi şirket, başvuru, şablon, hatırlatıcı, doküman ve mülakat kayıtlarına erişmesi amacıyla tanımlanmıştır. Bu ifade, uygulamanın ölçülmüş bir güvenlik sertifikasına sahip olduğu anlamına gelmez; mevcut veritabanı kuralını açıklar.

## 6. Varsayımlar, bağımlılıklar ve gelecek çalışmalar

### Varsayımlar

- Kullanıcı, kendi iş arama sürecindeki bilgileri doğru ve güncel biçimde girer.
- Kullanıcı hesabı ve oturum yönetimi için Supabase yapılandırması kullanılabilir durumdadır.
- Grafikler, kullanıcının girdiği başvuru kayıtları üzerinden oluşturulur; veri yoksa anlamlı bir analiz üretmesi beklenmez.

### Bağımlılıklar

- Supabase Auth ve Supabase veritabanı
- Web tarayıcısında JavaScript ve yerel depolama kullanılabilmesi
- Dışa aktarılan JSON dosyasını kullanıcının kendi cihazında saklaması

### Gelecek çalışmalar

- Kullanıcı arayüzünde henüz etkin olmayan AI Kariyer Asistanı ve Şablonlar modüllerinin kapsamının netleştirilmesi ve erişime açılması
- Gerçek e-posta veya takvim bildirimi ihtiyacı varsa, tercih kaydından ayrı olarak bildirim gönderim sürecinin tasarlanması
- Haricî iş ilanı kaynakları veya takvim sağlayıcılarıyla entegrasyon ihtiyacının ayrıca analiz edilmesi
- Başvurular, şirketler ve mülakatlar arasındaki ilişki ekranlarının kullanıcı geri bildirimiyle geliştirilmesi

## 7. Öğrenme Notları

### Bu doküman nedir?

İş Gereksinimleri Dokümanı, projenin hangi iş problemini çözmek istediğini ve çözümün kullanıcı açısından ne yapması gerektiğini anlatan başlangıç dokümanıdır. Ekran tasarımı veya kod ayrıntısı yerine iş ihtiyacına odaklanır.

### Neden hazırlanır?

Ekipteki herkesin aynı problemi çözmeye çalışmasını sağlar. Ayrıca isteklerin “iyi olur” seviyesinden çıkarılıp takip edilebilir gereksinimlere dönüşmesine yardım eder.

### Kim hazırlar?

Genellikle iş analisti; ürün sahibi, kullanıcı temsilcileri ve teknik ekipten aldığı bilgilerle hazırlar. Bu projede Serdar Ç., hem proje sahibi hem de Junior Business Analyst adayı olarak mevcut uygulamayı inceleyerek hazırlamaktadır.

### Kimler kullanır?

Geliştirici, test yapan kişi, tasarımcı ve proje sahibi bu dokümandan yararlanabilir. Mülakatta ise aday, proje ihtiyacını nasıl yapılandırdığını anlatmak için kullanabilir.

### Projenin hangi aşamasında hazırlanır?

Normalde keşif ve planlama aşamasında hazırlanır; geliştirme boyunca değişen ihtiyaçlara göre güncellenebilir. Bu doküman mevcut bir portföy projesi incelenerek geriye dönük hazırlanmıştır; bu durum doküman bilgilerinde açıkça belirtilmiştir.

### Gerçek projelerde nasıl kullanılır?

İş gereksinimleri, daha ayrıntılı fonksiyonel gereksinimlere, kullanıcı hikâyelerine, kullanım senaryolarına ve test kabul kriterlerine kaynak olur. Değişiklik taleplerinde hangi ihtiyacın etkilendiği de bu doküman üzerinden değerlendirilir.

### Junior İş Analisti için dikkat edilmesi gerekenler

- İş ihtiyacını çözümden ayırmaya çalış: “Kullanıcı mülakatını takip etmeli” bir ihtiyaçtır; hangi butonun nerede olacağı tasarım kararıdır.
- Kesin olmayan ölçü veya başarı iddiası yazma.
- Mevcut özellik ile gelecek fikrini aynı başlık altında karıştırma.
- Gereksinimleri kısa, test edilebilir ve mümkün olduğunda benzersiz kimliklerle yaz.

### En sık yapılan hatalar

- Kodda olmayan özellikleri dokümana eklemek
- “Sistem hızlı olmalı” gibi ölçülemeyen ve bağlamsız ifadeler yazmak
- Kullanıcı rolü, kapsam dışı konu ve varsayımları belirtmemek
- Gereksinim yerine ekran tasarımını anlatmak
- Bir başlık altında birden fazla bağımsız ihtiyacı birleştirmek

## 8. Mülakat Soruları

1. İş gereksinimi ile fonksiyonel gereksinim arasındaki fark nedir?
2. Bu projede iş problemini nasıl tanımladınız?
3. Dokümanı hazırlarken hangi kaynakları incelediniz ve neden?
4. Kodda bulunan fakat kullanıcıya açık olmayan bir özelliği neden kapsam dışı bıraktınız?
5. Bir gereksinimin önceliğini hangi yaklaşımla belirlersiniz?
6. Varsayım, bağımlılık ve risk arasındaki fark nedir?
7. Kullanıcının yalnızca kendi verisini görmesi neden bir iş gereksinimi olarak ele alınabilir?
8. Mevcut uygulamada gerçek e-posta bildirimi olmadığını nasıl doğrular ve dokümana nasıl yansıtırsınız?
9. Bu dokümandan sonra hangi analiz dokümanını hazırlamak size en çok bilgi sağlar?
10. İş gereksinimindeki belirsiz bir ifadeyi netleştirmek için hangi soruları sorarsınız?

---

## Kalite Kontrolü

- [x] README, uygulama rotaları, doğrulama kuralları ve veritabanı şemasıyla karşılaştırıldı.
- [x] Aktif olmayan AI Asistanı ve Şablonlar modülleri kapsam dışı bırakıldı.
- [x] Doğrulanamayan KPI, başarı oranı veya kurumsal onay bilgisi kullanılmadı.
- [x] Metin, portföy projesi ve Junior Business Analyst seviyesine uygun tutuldu.
- [x] Gelecek fikirleri mevcut özelliklerden ayrıldı.
