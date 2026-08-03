# BA-7 — Fonksiyonel Olmayan Gereksinimler

## Doküman Bilgileri

| Alan | Bilgi |
| --- | --- |
| Proje | Kariyer Pusulası |
| Doküman adı | Fonksiyonel Olmayan Gereksinimler |
| Doküman kodu | BA-7 |
| Sürüm | 0.1 |
| Durum | Taslak |
| Yazar | Serdar Ç. |
| Tarih | 1 Ağustos 2026 |
| İlişkili dokümanlar | BA-1, BA-6 |

Bu doküman, kod tabanındaki mevcut teknik yaklaşımlar incelenerek hazırlanmıştır. Bir gereksinimin kaynak kodunda karşılığı olması, onun üretim ortamında ölçülmüş veya bağımsız olarak test edilmiş olduğu anlamına gelmez. Bu nedenle uptime, yanıt süresi, güvenlik sertifikası veya başarı yüzdesi gibi doğrulanamayan iddialar kullanılmamıştır.

## Amaç

Kariyer Pusulası'nın yalnızca ne yapacağını değil, bunu yaparken hangi kalite özelliklerini gözetmesi gerektiğini tanımlamaktır. Bu gereksinimler; kullanım kolaylığı, veri erişimi, hata yönetimi, güvenlik yaklaşımı ve sürdürülebilirlik gibi alanları kapsar.

## Kapsam

Doküman; mevcut web uygulaması, Supabase ile kimlik doğrulama/veri erişimi, tarayıcı yerel depolaması, form doğrulamaları ve arayüz davranışlarıyla sınırlıdır. Ölçülmüş performans hedefleri, hizmet seviyesi anlaşmaları, yasal uyumluluk sertifikaları veya bağımsız güvenlik testi sonuçları kapsamda değildir.

## İçindekiler

1. Fonksiyonel olmayan gereksinim yaklaşımı
2. Kullanılabilirlik ve erişilebilirlik
3. Güvenlik ve veri gizliliği
4. Güvenilirlik ve hata yönetimi
5. Performans ve kaynak kullanımı
6. Bakım yapılabilirlik
7. Uyumluluk ve görünüm
8. Doğrulama sınırları ve gelecek çalışmalar
9. Öğrenme notları
10. Mülakat soruları

## 1. Fonksiyonel olmayan gereksinim yaklaşımı

Fonksiyonel gereksinim, sistemin yaptığı işi anlatır: örneğin “kullanıcı başvuru kaydı oluşturabilmelidir.” Fonksiyonel olmayan gereksinim ise bu işin hangi kalite beklentileriyle sunulacağını anlatır: örneğin “geçersiz alanlarda kullanıcıya anlaşılır hata mesajı gösterilmelidir.”

Bu projede ölçülebilir eşik gerektiren konularda gerçek veri olmadığı için kesin sayı tanımlamak yerine doğrulanabilir davranış veya tasarım yaklaşımı kullanılmıştır. İleride test verisi oluşursa ilgili maddelere ölçüm yöntemi ve hedef eklenebilir.

## 2. Kullanılabilirlik ve erişilebilirlik

| ID | Gereksinim | Kod tabanındaki gözlem |
| --- | --- | --- |
| NFR-01 | Uygulama, kullanıcıya işlem sonucu ve hata durumu için Türkçe geri bildirim göstermelidir. | Toast mesajları ve form hata mesajları kullanılıyor. |
| NFR-02 | Kullanıcı, zorunlu veya geçersiz form alanını ayırt edebilmelidir. | Zod doğrulaması ve alan bazlı hata mesajları bulunuyor. |
| NFR-03 | Kullanıcı, kaydedilmemiş başvuru formunu kapatmak istediğinde veri kaybı riski hakkında uyarılmalıdır. | Başvuru oluşturma penceresinde kaydedilmemiş değişiklik uyarısı bulunuyor. |
| NFR-04 | Uygulama, ana işlevlere küçük ve büyük ekranlarda gezinme imkânı sunmalıdır. | Masaüstü yan menüsü ve mobil çekmece menüsü bulunuyor. |
| NFR-05 | Arayüz bileşenleri, etiket, düğme türü ve erişilebilir isim gibi anlamlı HTML/ARIA bilgilerinden yararlanmalıdır. | Form etiketleri, `aria-label`, `role=alert` ve düğme bileşenleri birçok ekranda kullanılıyor. |
| NFR-06 | Klavye ile yapılan işlemlerde kullanıcı, açık filtre/pencere benzeri alanları kapatabilmelidir. | Başvurular ekranında Escape tuşu ile açık menüler kapatılıyor. |
| NFR-07 | Kullanıcı tema tercihini değiştirebilmeli ve tercih tekrar ziyaretlerde kullanılmalıdır. | Tema seçimi `localStorage` üzerinden saklanıyor. |

NFR-04 ve NFR-05, kaynak kodundaki duyarlı sınıflar ve erişilebilirlik işaretlerinden türetilmiştir. Bu maddeler tüm cihaz ve yardımcı teknoloji kombinasyonlarında test edilmiştir iddiası taşımaz.

## 3. Güvenlik ve veri gizliliği

| ID | Gereksinim | Kod tabanındaki gözlem |
| --- | --- | --- |
| NFR-08 | Kullanıcının kişisel uygulama ekranlarına erişimi geçerli oturumla sınırlandırılmalıdır. | Korunan rota bileşeni, geçerli oturumu olmayan kullanıcıyı giriş sayfasına yönlendiriyor. |
| NFR-09 | Başvuru, şirket ve mülakat kayıtları kullanıcı kimliğiyle ilişkilendirilmelidir. | İlgili veri tiplerinde `user_id` alanı bulunuyor. |
| NFR-10 | Veritabanı düzeyinde kullanıcının yalnızca kendi kayıtlarına erişmesini amaçlayan kurallar tanımlanmalıdır. | Supabase şemasında ilgili tablolar için Row Level Security ve kullanıcı kimliğine dayalı politikalar bulunuyor. |
| NFR-11 | E-posta, URL ve parola gibi kullanıcı girdileri işlem öncesinde doğrulanmalıdır. | Form doğrulama şemaları ve parola uzunluk kontrolü bulunuyor. |
| NFR-12 | Supabase bağlantı bilgileri kaynak koda sabit yazılmamalı; ortam değişkenlerinden alınmalıdır. | İstemci yapılandırması `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` kullanıyor. |
| NFR-13 | Kullanıcıya ait tarayıcı yedek kayıtları, mümkün olduğunda aktif kullanıcı kimliğiyle ayrıştırılmalıdır. | Yerel depolama anahtarları kullanıcı kimliğini içeren adlarla oluşturuluyor. |

Bu maddeler güvenlik tasarım yaklaşımını anlatır. Penetrasyon testi, şifreleme incelemesi veya resmî güvenlik sertifikası yapıldığı anlamına gelmez.

## 4. Güvenilirlik ve hata yönetimi

| ID | Gereksinim | Kod tabanındaki gözlem |
| --- | --- | --- |
| NFR-14 | Veri yüklenirken kullanıcıya yüklenme durumu gösterilmelidir. | Sayfa ve kartlarda skeleton/loading bileşenleri kullanılıyor. |
| NFR-15 | Veri sorgusu hata verdiğinde kullanıcıya anlaşılır hata bilgisi ve yeniden deneme seçeneği sunulmalıdır. | Başvuru, gösterge paneli ve ilgili ekranlarda hata/yeniden dene durumları bulunuyor. |
| NFR-16 | Bazı veri işlemlerinde uzak veri kaynağı kullanılamazsa, mevcut uygulama davranışı olarak tarayıcı yerel depolamasındaki yedek kayıtlar kullanılabilmelidir. | Başvuru, şirket ve mülakat repository'lerinde yerel depolama yedek yolu bulunuyor. |
| NFR-17 | Başarısız veri işlemi, ekranda mevcut geçici veriyi kalıcıymış gibi bırakmamalıdır. | Başvuru oluşturma işleminde iyimser güncelleme hata halinde önceki önbelleğe geri döndürülüyor. |
| NFR-18 | Sorgular, izin hatası veya bulunamayan kayıt gibi tekrar denenmemesi gereken durumlarda gereksiz tekrar yapmamalıdır. | Sorgu istemcisi bu hata türlerinde tekrar denemeyi kapatıyor. |

Yerel depolama yedek yolu, uzaktaki verinin yerine geçen tam eşitleme mekanizması değildir. Aynı verinin başka cihazda görünmesi, yedekleme sıklığı veya veri kaybı olmaması bu dokümanla garanti edilmez.

## 5. Performans ve kaynak kullanımı

| ID | Gereksinim | Kod tabanındaki gözlem |
| --- | --- | --- |
| NFR-19 | Uygulama sayfaları, başlangıçta tüm sayfaları zorunlu yüklemek yerine gerektiğinde yüklenebilmelidir. | Rota sayfaları `lazy` ve `Suspense` ile ayrıştırılmış. |
| NFR-20 | Kullanıcının başvuru araması, her karakter girişinde anında filtreleme yerine kısa bir bekleme süresiyle çalışmalıdır. | Başvuru aramasında 300 ms debounce kullanılıyor. |
| NFR-21 | Tekrar kullanılan sorgu sonuçları, gereksiz veri çağrılarını azaltmak için istemci önbelleğinden yararlanmalıdır. | TanStack Query, stale time ve cache süresi yapılandırması kullanılıyor. |
| NFR-22 | Sık kullanılan hesaplamalar, ilgili veri değişmediğinde gereksiz yeniden hesaplanmamalıdır. | Gösterge paneli ve liste ekranlarında `useMemo` kullanımı bulunuyor. |

Bu maddeler sayısal hız hedefi içermez. Sayfa açılış süresi, ağ gecikmesi ve eşzamanlı kullanıcı kapasitesi için henüz ölçüm yapılmış değildir.

## 6. Bakım yapılabilirlik

| ID | Gereksinim | Kod tabanındaki gözlem |
| --- | --- | --- |
| NFR-23 | Uygulama kodu, görünüm, iş mantığı ve veri erişimi sorumluluklarını mümkün olduğunca ayırmalıdır. | Sayfa/bileşen, hook, service ve repository katmanları bulunuyor. |
| NFR-24 | Form girdileri ve veri kayıtları tip güvenli olacak biçimde tanımlanmalıdır. | TypeScript türleri ve Supabase tablo tipleri kullanılıyor. |
| NFR-25 | Tekrarlanan arayüz davranışları ortak bileşenlerde toplanmalıdır. | Button, Input, Modal, Table, StatusBadge gibi ortak bileşenler bulunuyor. |
| NFR-26 | İş kuralları ve girdi doğrulama kuralları merkezi şemalarda tutulmalıdır. | Başvuru, şirket ve mülakat için ayrı doğrulama şemaları bulunuyor. |
| NFR-27 | Temel kullanıcı akışları için otomatik test altyapısı bulunmalıdır. | Birim, entegrasyon ve E2E test dosyaları ile Vitest/Playwright yapılandırmaları bulunuyor. |

NFR-27, test dosyalarının ve test araçlarının bulunduğunu gösterir; tüm testlerin her ortamda başarılı olduğu veya belirli bir test kapsama oranına ulaşıldığı iddiası değildir.

## 7. Uyumluluk ve görünüm

| ID | Gereksinim | Kod tabanındaki gözlem |
| --- | --- | --- |
| NFR-28 | Uygulama, modern web tarayıcısında çalışacak tek sayfa uygulaması olarak paketlenebilmelidir. | React, Vite ve istemci tarafı yönlendirme yapısı kullanılıyor. |
| NFR-29 | Uygulama, açık, koyu ve sistem teması seçenekleri için renk değişkenleri kullanmalıdır. | CSS değişkenleri ve tema hook'u bulunuyor. |
| NFR-30 | Tarih ve gün adları gibi kullanıcıya gösterilen bazı yerelleştirilmiş bilgiler Türkçe bölge ayarıyla üretilebilmelidir. | Tarih biçimlendirmelerinde `tr-TR` kullanımı bulunuyor. |

Belirli tarayıcı sürümlerinde resmi uyumluluk testi yapılmadığından, desteklenen tarayıcı listesi bu aşamada tanımlanmamıştır.

## 8. Doğrulama sınırları ve gelecek çalışmalar

Bu dokümandaki gereksinimlerin bir bölümü kaynak kodu incelemesiyle doğrulanabilir; ancak aşağıdaki konular için ek çalışma gerekir:

- Farklı ekran boyutları ve klavye/ekran okuyucu kullanımıyla kullanılabilirlik testi
- Yetkisiz erişim senaryoları ve RLS politikaları için güvenlik testi
- Yavaş ağ, bağlantı kesintisi ve yedek kayıtların tekrar uzaktaki veriyle ilişkisi için hata senaryosu testi
- Sayfa yüklenme süresi ve sorgu davranışı için ölçüm yöntemi belirleme
- Otomatik testlerin çalıştırılması, sonuçların incelenmesi ve gerekirse eksik senaryoların eklenmesi

## Öğrenme Notları

### Bu doküman nedir?

Fonksiyonel Olmayan Gereksinimler Dokümanı, sistemin kalite beklentilerini tanımlar. Sistem davranışının hız, güvenlik, erişilebilirlik, hata yönetimi ve bakım kolaylığı gibi yönlerini ele alır.

### Neden hazırlanır?

Sadece özelliklerin var olması yeterli değildir; kullanıcı deneyimi, veri gizliliği ve sürdürülebilirlik de önemlidir. Bu doküman bu konuların sonradan unutulmasını azaltır.

### Kim hazırlar?

İş analisti, ürün sahibi, geliştirici, test ve güvenlik alanındaki kişiler birlikte katkı sağlayabilir. Gereksinimin türüne göre teknik ekipten doğrulama almak önemlidir.

### Kimler kullanır?

Geliştirici, test yapan kişi, iş analisti ve proje sahibi kullanır. Teknik tasarım, test planı ve risk değerlendirmesine girdi sağlar.

### Projenin hangi aşamasında hazırlanır?

Gereksinim analizi sırasında fonksiyonel gereksinimlerle birlikte düşünülmelidir. Geliştirme veya canlı kullanım sırasında ortaya çıkan ölçümlerle güncellenebilir.

### Gerçek projelerde nasıl kullanılır?

Kalite hedefleri test planına, mimari kararlara ve güvenlik incelemesine bağlanır. Ölçülebilen alanlarda hedef, ölçüm yöntemi ve sorumlu kişi ayrıca tanımlanır.

### Junior İş Analisti için dikkat edilmesi gerekenler

- Fonksiyonel gereksinimle kalite beklentisini ayır.
- Ölçmediğin performans veya güvenlik iddiasını gerçekmiş gibi yazma.
- “Güvenli olmalı” gibi çok genel ifadeyi hangi kontrolün beklendiğiyle somutlaştır.
- Teknik ekipten doğrulama almadan mimari veya güvenlik sonucu çıkarma.
- Yerel depolama gibi teknik davranışların kullanıcı etkisini düşün.

### En sık yapılan hatalar

- Her kalite maddesine rastgele yüzde veya süre eklemek
- Ölçüm yöntemi olmadan “hızlı” ya da “çok güvenli” demek
- Kullanılabilirlik ve erişilebilirliği hiç ele almamak
- Hata ve bağlantı kesintisi senaryolarını unutmak
- Test araçlarının bulunmasını testin tamamlandığı şeklinde yorumlamak

## Mülakat Soruları

1. Fonksiyonel ve fonksiyonel olmayan gereksinim arasındaki fark nedir?
2. Bu projede performans için neden sayısal hedef yazmadınız?
3. RLS politikasını neden güvenlik gereksinimi olarak ele aldınız?
4. Yerel depolama yedek yolunun kullanıcı açısından faydası ve riski nedir?
5. Kullanılabilirlik gereksinimine bu projeden bir örnek verin.
6. Erişilebilirlik gereksinimlerini nasıl doğrularsınız?
7. Bir NFR'nin test edilebilir olması neden önemlidir?
8. Hata yönetimi fonksiyonel mi, fonksiyonel olmayan mı olabilir?
9. Test dosyalarının varlığı size neyi kanıtlar, neyi kanıtlamaz?
10. Bu dokümandaki hangi maddeler için teknik ekipten destek almanız gerekir?

---

## Kalite Kontrolü

- [x] Sayısal performans, uptime, güvenlik sertifikası veya kapsama oranı iddiası kullanılmadı.
- [x] Maddeler mevcut kodda görülen yaklaşım ve davranışlarla ilişkilendirildi.
- [x] Kaynak kodu gözlemi ile bağımsız test sonucu ayrıştırıldı.
- [x] Erişilebilirlik, hata yönetimi, veri gizliliği ve bakım yapılabilirlik ele alındı.
- [x] Kullanıcıya açık olmayan modüller gereksinim kapsamına alınmadı.
