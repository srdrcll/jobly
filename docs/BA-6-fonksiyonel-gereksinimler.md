# BA-6 — Fonksiyonel Gereksinimler

## Doküman Bilgileri

| Alan | Bilgi |
| --- | --- |
| Proje | Kariyer Pusulası |
| Doküman adı | Fonksiyonel Gereksinimler |
| Doküman kodu | BA-6 |
| Sürüm | 0.1 |
| Durum | Taslak |
| Yazar | Serdar Ç. |
| Tarih | 1 Ağustos 2026 |
| İlişkili dokümanlar | BA-1, BA-4, BA-5 |

Bu gereksinimler; uygulama rotaları, sayfa ve form bileşenleri, Zod doğrulama şemaları, servis/repository katmanları ve TypeScript veritabanı tipleri incelenerek hazırlanmıştır. Gereksinimler, mevcut uygulamanın yaptığı işi tarif eder; uygulamada olmayan işlevler eklenmemiştir.

## Amaç

Kariyer Pusulası'nın kullanıcıdan aldığı girdiye nasıl tepki vermesi gerektiğini açık ve takip edilebilir biçimde tanımlamaktır. Bu doküman, BA-1'deki iş ihtiyaçlarını daha somut sistem davranışlarına dönüştürür.

## Kapsam

Fonksiyonel gereksinimler; hesap erişimi, başvuru, şirket, mülakat, gösterge paneli, profil ve ayarlar modüllerini kapsar. AI Kariyer Asistanı ve Şablonlar menüde kullanıcıya kapalı olduğundan dahil edilmemiştir.

Performans, kullanılabilirlik, güvenlik seviyesi ve teknik kalite hedefleri bu dokümanın değil, BA-7 Fonksiyonel Olmayan Gereksinimler dokümanının konusudur. Burada yalnızca kullanıcının yapabildiği işlemler ve sistemin bu işlemlerde ürettiği davranışlar tanımlanır.

## İçindekiler

1. Yazım yaklaşımı
2. Fonksiyonel gereksinimler
3. Doğrulama ve iş kuralı özeti
4. Veri ve erişim davranışı
5. Kapsam dışı işlevler
6. Öğrenme notları
7. Mülakat soruları

## 1. Yazım yaklaşımı

Her gereksinim benzersiz bir kimlikle tanımlanmıştır. “Sistem … yapmalıdır” dili, beklenen davranışı anlatır. Öncelikler, mevcut portföy uygulamasında temel kullanıcı akışının çalışması açısından verilmiştir; resmî bir ürün onayı veya zaman planı değildir.

| Öncelik | Anlamı |
| --- | --- |
| Yüksek | Temel kullanıcı akışının tamamlanması için gereklidir. |
| Orta | Süreci zenginleştirir veya düzenlemeyi kolaylaştırır; ancak temel kayıt akışı olmadan tek başına değer üretmez. |

## 2. Fonksiyonel gereksinimler

### 2.1 Hesap ve oturum yönetimi

| ID | Gereksinim | Öncelik |
| --- | --- | --- |
| FR-01 | Sistem, kullanıcıya ad soyad, e-posta ve şifre bilgisiyle hesap oluşturma imkânı sunmalıdır. | Yüksek |
| FR-02 | Sistem, kullanıcının e-posta ve şifresiyle giriş yapmasına izin vermelidir. | Yüksek |
| FR-03 | Sistem, oturum açılmamışsa korunan uygulama sayfalarına erişim yerine kullanıcıyı giriş sayfasına yönlendirmelidir. | Yüksek |
| FR-04 | Sistem, kullanıcıya şifre sıfırlama bağlantısı talebi oluşturma imkânı sunmalıdır. | Yüksek |
| FR-05 | Sistem, kullanıcıya yeni şifreyi tekrar girerek şifresini güncelleme imkânı sunmalıdır. | Yüksek |
| FR-06 | Sistem, oturum açmış kullanıcının uygulamadan çıkış yapabilmesini sağlamalıdır. | Yüksek |
| FR-07 | Sistem, profil ekranında kullanıcının adını, e-posta bilgisini, kullanıcı kimliğini ve kayıt tarihini görüntülemelidir. | Orta |

### 2.2 Başvuru yönetimi

| ID | Gereksinim | Öncelik |
| --- | --- | --- |
| FR-08 | Sistem, kullanıcıya yeni başvuru kaydı oluşturma formu sunmalıdır. | Yüksek |
| FR-09 | Sistem, başvuru oluşturulurken şirket adı ve pozisyon bilgisi girilmesini istemelidir. | Yüksek |
| FR-10 | Sistem, başvuru için durum, hedef rol, konum, çalışma modeli, ücret bilgisi, başvuru tarihi, ilan bağlantısı, iletişim bilgisi, öncelik ve not alanlarını desteklemelidir. | Yüksek |
| FR-11 | Sistem, kullanıcının kendi başvuru kayıtlarını listelemelidir. | Yüksek |
| FR-12 | Sistem, kullanıcıya başvuru kaydının ayrıntılarını ayrı ekranda görüntüleme imkânı sunmalıdır. | Orta |
| FR-13 | Sistem, kullanıcının bir başvuru kaydını güncellemesine izin vermelidir. | Yüksek |
| FR-14 | Sistem, kullanıcının bir başvuru kaydını silmesine ve silme öncesinde onay vermesine imkân tanımalıdır. | Yüksek |
| FR-15 | Sistem, kullanıcıya şirket adı veya pozisyon bilgisi üzerinden başvuru araması yapma imkânı sunmalıdır. | Orta |
| FR-16 | Sistem, başvuruları durum, öncelik ve çalışma modeline göre filtreleme imkânı sunmalıdır. | Orta |
| FR-17 | Sistem, başvuruları tarih, şirket adı veya öncelik sırasına göre sıralama imkânı sunmalıdır. | Orta |
| FR-18 | Sistem, kullanıcının seçtiği birden fazla başvurunun durumunu toplu değiştirmesine izin vermelidir. | Orta |
| FR-19 | Sistem, kullanıcının seçtiği birden fazla başvuruyu silmesine ve silme öncesinde onay vermesine imkân tanımalıdır. | Orta |

### 2.3 Şirket yönetimi

| ID | Gereksinim | Öncelik |
| --- | --- | --- |
| FR-20 | Sistem, kullanıcıya hedef veya takip edilen şirket için ayrı kayıt oluşturma imkânı sunmalıdır. | Yüksek |
| FR-21 | Sistem, şirket kaydında ad, sektör, konum, web sitesi, şirket büyüklüğü, durum, puan, iletişim bilgileri, LinkedIn/kariyer sayfası bağlantıları ve not alanlarını desteklemelidir. | Yüksek |
| FR-22 | Sistem, kullanıcının şirket kaydının durumunu güncellemesine ve şirketi favori olarak işaretlemesine izin vermelidir. | Orta |
| FR-23 | Sistem, kullanıcının kendi şirket kayıtlarını listelemesine, aramasına, filtrelemesine ve sıralamasına imkân tanımalıdır. | Yüksek |
| FR-24 | Sistem, kullanıcının bir veya daha fazla şirketi arşivlemesine, arşivden hedef durumuna döndürmesine, favoriye eklemesine/çıkarmasına veya silmesine izin vermelidir. | Orta |
| FR-25 | Sistem, kullanıcıya şirket kaydını görüntüleme ve güncelleme imkânı sunmalıdır. | Orta |

### 2.4 Mülakat yönetimi

| ID | Gereksinim | Öncelik |
| --- | --- | --- |
| FR-26 | Sistem, kullanıcıya yeni mülakat kaydı oluşturma formu sunmalıdır. | Yüksek |
| FR-27 | Sistem, mülakat kaydında şirket adı, pozisyon, aşama, görüşme türü, tarih, saat ve süre bilgisini desteklemelidir. | Yüksek |
| FR-28 | Sistem, kullanıcıya mülakatı mevcut bir başvuru kaydıyla ilişkilendirme imkânı sunmalıdır. | Orta |
| FR-29 | Sistem, ilişkili başvuru seçildiğinde ilgili şirket ve pozisyon bilgisini mülakat formuna aktarmalıdır. | Orta |
| FR-30 | Sistem, mülakat kaydında görüşmeci adı/rolü, toplantı bağlantısı, konum, hazırlık notu, görüşme notu, sonuç ve takip tarihi alanlarını desteklemelidir. | Orta |
| FR-31 | Sistem, kullanıcının kendi mülakat kayıtlarını liste görünümünde görüntülemesine izin vermelidir. | Yüksek |
| FR-32 | Sistem, kullanıcının mülakat kayıtlarını aylık takvim görünümünde görüntülemesine izin vermelidir. | Orta |
| FR-33 | Sistem, kullanıcıya mülakatları şirket, pozisyon veya görüşmeci bilgisiyle arama; sonuç ve türle filtreleme; tarih veya şirkete göre sıralama imkânı sunmalıdır. | Orta |
| FR-34 | Sistem, yaklaşan mülakat bulunduğunda kayıtlı tarih ve saate göre geri sayım bilgisini göstermelidir. | Orta |
| FR-35 | Sistem, kullanıcının mülakat kaydını görüntülemesine, güncellemesine ve silmesine izin vermelidir. | Yüksek |

### 2.5 Gösterge paneli ve özetler

| ID | Gereksinim | Öncelik |
| --- | --- | --- |
| FR-36 | Sistem, kullanıcının başvuru kayıtlarından toplam, aktif, mülakat sürecindeki, teklif ve reddedilen başvuru sayılarını hesaplayıp göstermelidir. | Orta |
| FR-37 | Sistem, kullanıcının başvuru kayıtlarından durum dağılımı, son altı aya ait başvuru sayısı ve son yedi güne ait aktivite görünümü üretmelidir. | Orta |
| FR-38 | Sistem, kullanıcıya yaklaşan mülakatlar ve son aktiviteler için özet alanlar göstermelidir. | Orta |
| FR-39 | Sistem, veri yükleme veya veri alma hatası oluştuğunda kullanıcıya hata bilgisini ve tekrar deneme seçeneğini göstermelidir. | Orta |

### 2.6 Ayarlar ve veri dışa aktarma

| ID | Gereksinim | Öncelik |
| --- | --- | --- |
| FR-40 | Sistem, kullanıcıya açık, koyu veya sistem tema tercihini seçme imkânı sunmalıdır. | Orta |
| FR-41 | Sistem, kullanıcıya para birimi ile mülakat hatırlatması ve e-posta uyarısı tercihlerini tarayıcı yerel depolamasında kaydetme imkânı sunmalıdır. | Orta |
| FR-42 | Sistem, kullanıcının başvuru, şirket ve mülakat kayıtlarını JSON biçiminde dışa aktarmasına imkân tanımalıdır. | Orta |

## 3. Doğrulama ve iş kuralı özeti

Bu tablo, gereksinimlerde geçen mevcut form davranışlarının kısa özetidir. Ayrıntılı iş kuralları BA-1'de, kabul kriterleri ise BA-9'da ele alınacaktır.

| Alan / işlem | Mevcut kural |
| --- | --- |
| Kayıt şifresi | En az 6 karakter olmalıdır. |
| Başvuru şirket adı | Zorunludur ve en fazla 100 karakter olabilir. |
| Başvuru pozisyonu | Zorunludur ve en fazla 120 karakter olabilir. |
| Başvuru durumu | Kaydedildi, başvuruldu, iletişime geçildi, mülakat, vaka çalışması, teklif veya reddedildi seçeneklerinden biri olmalıdır. |
| Başvuru önceliği | Düşük, orta, yüksek veya kritik olmalıdır. |
| Çalışma modeli | Remote, Hybrid veya On-site olmalıdır. |
| Başvuru notu | En fazla 1000 karakter olabilir. |
| Şirket adı | En az 2 karakter olmalıdır. |
| Şirket puanı | Girildiyse 1 ile 5 arasında olmalıdır. |
| Mülakat şirketi ve pozisyonu | En az 2 karakter olmalıdır. |
| Mülakat tarihi ve saati | Zorunludur. |
| Mülakat süresi | En az 15 dakika olmalıdır. |
| Mülakat türü | Online, On-site, Phone veya Hybrid olmalıdır. |
| URL ve e-posta alanları | Doldurulursa uygun URL veya e-posta biçiminde olmalıdır. |

## 4. Veri ve erişim davranışı

- Başvuru, şirket ve mülakat kayıtları kullanıcı kimliğiyle ilişkilidir.
- Uygulama, uzaktaki Supabase verisine erişmeyi dener. İlgili veri işlemi başarısız olduğunda bazı başvuru, şirket ve mülakat kayıtları için tarayıcı yerel depolama yedek yolu bulunur.
- Yerel depolama anahtarları mevcut oturumdaki kullanıcı kimliğiyle adlandırılır.
- Başvuru, şirket ve mülakat ekranlarındaki liste sorguları oturum açmış kullanıcı olduğunda çalıştırılır.
- Ayarlar ekranındaki tercih verileri, veritabanı yerine tarayıcı yerel depolamasında tutulur.

Bu maddeler işlevsel davranışı açıklar. Yedek yolun cihazlar arasında eşitleme yaptığı veya kesintisiz veri saklama garantisi verdiği anlamı çıkarılmamalıdır.

## 5. Kapsam dışı işlevler

Aşağıdaki işlevler mevcut kullanıcı akışında bulunmadığı için fonksiyonel gereksinim olarak yazılmamıştır:

- İş ilanı arama, ilan çekme veya uygulama içinden başvuru gönderme
- İşveren/İK kullanıcısı için giriş ve yönetim ekranı
- Gerçek e-posta, push bildirimi veya takvim daveti gönderimi
- Haricî takvim, e-posta veya iş ilanı platformu entegrasyonu
- Kullanıcıya açık AI özgeçmiş inceleme, kariyer koçluğu veya şablon kullanımı
- Ödeme, abonelik veya rol bazlı kurumsal yönetim

## Öğrenme Notları

### Bu doküman nedir?

Fonksiyonel Gereksinimler Dokümanı, sistemin kullanıcı veya başka bir sistem tarafından tetiklenen durumda ne yapması gerektiğini tanımlar. “Ne yapılmalı?” sorusuna cevap verir.

### Neden hazırlanır?

Geliştirici, test yapan kişi ve proje sahibi için ortak bir davranış tanımı oluşturur. Gereksinimlerin kullanıcı hikâyesinden uygulanabilir işlevlere geçmesine yardım eder.

### Kim hazırlar?

Genellikle iş analisti hazırlar; ürün sahibi, geliştirici ve test ekibi ile gözden geçirilir. Küçük projelerde proje sahibi/geliştirici de bu çalışmayı yapabilir.

### Kimler kullanır?

Geliştirici, test yapan kişi, tasarımcı, iş analisti ve proje sahibi kullanır. Test senaryosu ve kabul kriteri hazırlarken temel kaynaklardan biridir.

### Projenin hangi aşamasında hazırlanır?

Gereksinim analizi ve çözüm tasarımı aşamasında hazırlanır. Geliştirme sırasında kapsam değişirse güncellenmelidir.

### Gerçek projelerde nasıl kullanılır?

Fonksiyonel gereksinimler geliştirme görevlerine, kullanıcı hikâyelerine, kabul kriterlerine ve izlenebilirlik matrisine bağlanır. Bir değişiklikte hangi işlevlerin etkileneceği bu kimlikler üzerinden takip edilebilir.

### Junior İş Analisti için dikkat edilmesi gerekenler

- Her gereksinime benzersiz bir kimlik ver.
- Bir gereksinimde mümkün olduğunca tek davranışı anlat.
- “Sistem … yapmalıdır” ifadesinden sonra gözlemlenebilir bir davranış yaz.
- Fonksiyonel gereksinim ile kalite hedefini ayır.
- Kodda olmayan bir özelliği gereksinim olarak eklememeye dikkat et.

### En sık yapılan hatalar

- Gereksinim yerine ekran tasarımı veya teknik çözüm yazmak
- Bir maddeye birden çok bağımsız zorunluluk eklemek
- Belirsiz fiiller kullanmak: “kolay olmalı”, “iyi çalışmalı” gibi
- Doğrulama kurallarını hiç belirtmemek
- Mevcut olmayan entegrasyonları veya bildirimleri varmış gibi göstermek

## Mülakat Soruları

1. Fonksiyonel gereksinim nedir?
2. İş gereksinimi ile fonksiyonel gereksinim arasındaki ilişki nedir?
3. Bir fonksiyonel gereksinimin iyi yazıldığını nasıl anlarsınız?
4. Bu dokümanda neden gereksinim kimlikleri kullandınız?
5. Başvuru oluşturma için hangi alanları zorunlu kabul ettiniz ve neden?
6. Doğrulama kuralı ile kabul kriteri arasındaki fark nedir?
7. Fonksiyonel olmayan bir gereksinime örnek verir misiniz?
8. Yerel depolama yedek yolunu neden bu dokümanda belirttiniz?
9. Kullanıcıya kapalı AI modüllerini neden fonksiyonel gereksinimlere eklemediniz?
10. Bir gereksinim değiştiğinde hangi diğer dokümanları gözden geçirirsiniz?

---

## Kalite Kontrolü

- [x] Gereksinimler aktif rotalar, ekranlar, formlar ve doğrulama şemalarıyla karşılaştırıldı.
- [x] Fonksiyonel davranışlar ile kalite hedefleri ayrıldı.
- [x] Kullanıcıya açık olmayan AI Asistanı ve Şablonlar modülleri dışarıda bırakıldı.
- [x] Gerçek bildirim veya haricî entegrasyon varmış gibi yazılmadı.
- [x] Gereksinimler benzersiz kimliklerle ve öğrenci seviyesinde izlenebilir biçimde yazıldı.
