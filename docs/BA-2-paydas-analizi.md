# BA-2 — Paydaş Analizi

## Doküman Bilgileri

| Alan | Bilgi |
| --- | --- |
| Proje | Kariyer Pusulası |
| Doküman adı | Paydaş Analizi |
| Doküman kodu | BA-2 |
| Sürüm | 0.1 |
| Durum | Taslak |
| Yazar | Serdar Ç. |
| Tarih | 1 Ağustos 2026 |
| İlişkili doküman | BA-1 İş Gereksinimleri Dokümanı |

Bu analiz, `README.md`, kullanıcı kimlik doğrulama akışı, korunan rotalar, veri erişim katmanı ve Supabase şeması incelenerek hazırlanmıştır. Kariyer Pusulası bir portföy projesi olduğu için kurumsal müşteri, sponsor, yatırımcı veya çok rollü operasyon ekibi varsayılmamıştır.

## Amaç

Bu dokümanın amacı, Kariyer Pusulası'nı etkileyen ya da uygulamadan etkilenen kişi ve teknik tarafları belirlemektir. Paydaşların ihtiyaçlarını, projedeki etkilerini ve onlarla nasıl iletişim kurulacağını açıklar.

## Kapsam

Analiz; mevcut sürümdeki tekil iş arayan kullanıcı, proje sahibi/geliştirici ve uygulamanın çalışması için kullanılan Supabase hizmetiyle sınırlıdır. Uygulama içinde işveren, işe alım uzmanı, yönetici veya destek ekibi için tanımlı bir hesap, ekran ya da yetki rolü bulunmadığından bu kişiler aktif sistem paydaşı olarak tanımlanmamıştır.

## İçindekiler

1. Paydaş tanımı ve yaklaşım
2. Paydaş listesi
3. Paydaş ihtiyaçları ve etkileri
4. Etki–ilgi değerlendirmesi
5. İletişim yaklaşımı
6. Paydaşlarla ilgili riskler ve sınırlar
7. Öğrenme notları
8. Mülakat soruları

## 1. Paydaş tanımı ve yaklaşım

Paydaş, projeyi etkileyebilen veya projenin sonucundan etkilenebilen kişi, grup ya da kurumdur. Bu projede analiz yapılırken iki ayrım kullanılmıştır:

- **İnsan paydaşlar:** Uygulamayı kullanan veya geliştiren kişiler.
- **Teknik dış taraflar:** Uygulamanın kimlik doğrulama ve veri saklama işlevinde bağımlı olduğu hizmetler.

Paydaş listesi gereğinden fazla genişletilmemiştir. Örneğin başvurulan şirketlerin iletişim kişileri kullanıcı tarafından kayıt altına alınabilir; fakat bu kişiler sisteme giriş yapmaz, kayıtları görüntülemez ve uygulamanın işleyişini yönlendirmez. Bu nedenle ayrı bir sistem paydaşı olarak değerlendirilmemiştir.

## 2. Paydaş listesi

| ID | Paydaş | Türü | Projedeki rolü | Sisteme erişimi |
| --- | --- | --- | --- | --- |
| SH-01 | İş arayan kullanıcı | Birincil kullanıcı | Başvuru, şirket ve mülakat kayıtlarını oluşturur ve takip eder | Kendi hesabıyla uygulamanın korunan ekranları |
| SH-02 | Serdar Ç. | Proje sahibi / geliştirici | Portföy projesinin kapsamını belirler, geliştirir ve dokümante eder | Geliştirme ortamı ve proje kaynak kodu |
| SH-03 | Supabase | Teknik hizmet sağlayıcı | Kimlik doğrulama ve veritabanı altyapısını sağlar | Uygulamanın yapılandırılmış istemci bağlantısı üzerinden |

## 3. Paydaş ihtiyaçları ve etkileri

### SH-01 — İş arayan kullanıcı

Bu, uygulamanın ana paydaşıdır. Başvurular, şirketler ve mülakatlar bu kişinin kendi iş arama süreciyle ilgilidir.

| Başlık | Açıklama |
| --- | --- |
| Temel ihtiyaç | Dağınık başvuru ve mülakat bilgisini tek yerde düzenli biçimde takip etmek |
| Beklenti | Kayıt oluşturma, güncelleme, arama, filtreleme, takvimde görüntüleme ve kendi verilerinden oluşan özetleri görme |
| Hassasiyet | Kişisel başvuru, iletişim ve not bilgilerinin başka kullanıcılar tarafından görülmemesi |
| Proje üzerindeki etkisi | Yüksek; uygulamanın işlevsel kapsamını doğrudan belirler |
| Başarı işareti | Kullanıcının kendi verisini kaydedip daha sonra bulabilmesi ve iş arama sürecini takip edebilmesi |

Kullanıcının uygulamadaki erişimi oturum açma ile başlar. Korunan rotalar, geçerli bir oturumu olmayan kullanıcıyı giriş ekranına yönlendirir. Veritabanı tarafında da kayıtlar kullanıcı kimliğiyle ilişkilidir.

### SH-02 — Serdar Ç.

Serdar Ç., bu portföy projesinde proje sahibi, geliştirici ve doküman yazarı rollerini üstlenir. Bu durum küçük ölçekli öğrenci projelerinde yaygındır; ancak dokümanda bu rollerin ayrı kurumsal ekipler gibi gösterilmemesi önemlidir.

| Başlık | Açıklama |
| --- | --- |
| Temel ihtiyaç | İş Analizi bilgisini gerçek bir proje üzerinden uygulamak ve sürdürülebilir bir portföy çıktısı oluşturmak |
| Beklenti | Kapsamın yönetilebilir kalması, kod ile dokümanların çelişmemesi ve kullanıcı akışlarının anlaşılır olması |
| Proje üzerindeki etkisi | Yüksek; geliştirme ve öncelik kararlarını verir |
| Sorumluluk | Kod değişikliklerini, doküman güncellemelerini ve gelecekteki geliştirme kararlarını birlikte değerlendirmek |

### SH-03 — Supabase

Supabase, insan paydaş değil; dış teknik hizmet sağlayıcıdır. Buna rağmen uygulamanın oturum ve veri işlemleri bu hizmete bağımlı olduğu için analizde yer alır.

| Başlık | Açıklama |
| --- | --- |
| Sağladığı işlev | E-posta/şifre ile kimlik doğrulama, oturum yönetimi ve uygulama verilerinin saklanması |
| Uygulama beklentisi | Ortam değişkenleriyle doğru yapılandırılmış bağlantı ve ilgili tabloların bulunması |
| Proje üzerindeki etkisi | Yüksek; hizmet veya yapılandırma sorunu olduğunda uzaktaki veri işlemleri etkilenir |
| Sınır | Bu doküman, hizmet seviyesi veya kesintisizlik taahhüdü içermez |

Uygulama, uzaktaki veri işlemi başarısız olursa bazı başvuru, şirket ve mülakat işlemleri için tarayıcı yerel depolamasını yedek yol olarak kullanır. Bu teknik davranış, kullanıcı açısından veri sürekliliği ihtiyacını destekler; ancak yerel verinin bir başka cihazda otomatik görünmesi anlamına gelmez.

## 4. Etki–ilgi değerlendirmesi

Etki, paydaşın proje kararlarını veya uygulamanın işleyişini değiştirebilme düzeyini; ilgi ise projeden etkilenme ve projeyi takip etme düzeyini ifade eder. Değerlendirme, ölçülmüş bir skor değil, bu küçük ölçekli proje için yapılan nitel bir sınıflandırmadır.

| Paydaş | Etki | İlgi | Yönetim yaklaşımı |
| --- | --- | --- | --- |
| İş arayan kullanıcı | Yüksek | Yüksek | İhtiyaçları önceliklendir, kullanıcı akışlarını anlaşılır tut, geri bildirimleri not al |
| Serdar Ç. | Yüksek | Yüksek | Kapsam, kod ve doküman arasındaki uyumu düzenli kontrol et |
| Supabase | Yüksek | Orta | Yapılandırmayı, tablo şemasını ve erişim kurallarını teknik olarak doğrula |

Bu değerlendirme, klasik etki–ilgi matrisinin metin ve tablo ile ifade edilmiş sade bir versiyonudur. Paydaş sayısı üç olduğu için ayrı bir grafik kullanılması gerekli görülmemiştir.

## 5. İletişim yaklaşımı

| Paydaş | İletişim konusu | Yöntem | Zamanlama |
| --- | --- | --- | --- |
| İş arayan kullanıcı | Kullanım zorluğu, eksik bilgi alanları, anlaşılmayan akışlar | Uygulama kullanımı sırasında alınabilecek kişisel notlar veya doğrudan geri bildirim | Yeni ekran ya da önemli akış değişikliğinden sonra, planlanan şekilde |
| Serdar Ç. | Kapsam değişikliği, geliştirme önceliği, doküman güncellemesi | GitHub kayıtları, görev notları ve BA dokümanları | Değişiklik yapıldığında |
| Supabase | Kimlik doğrulama, veritabanı veya erişim kuralı sorunu | Supabase yapılandırması, hata mesajları ve teknik dokümantasyon | Sorun veya yapılandırma değişikliği olduğunda |

Gerçekte düzenli toplantı, sprint seremonisi ya da onay komitesi olduğu iddia edilmemektedir. Bunlar, tek geliştiricili portföy projesinin mevcut çalışma biçiminde bulunmayan kurumsal süreçlerdir.

## 6. Paydaşlarla ilgili riskler ve sınırlar

| Konu | Olası etki | Ele alma yaklaşımı |
| --- | --- | --- |
| Kullanıcı ihtiyacının yalnızca proje sahibinin varsayımına dayanması | Bazı ekranlar gerçek kullanım beklentisini tam karşılamayabilir | Varsayımları dokümante etmek ve uygun olduğunda kullanıcı geri bildirimi toplamak |
| Supabase yapılandırması veya erişim sorunu | Giriş ve uzaktaki veri işlemleri başarısız olabilir | Ortam değişkenlerini, şemayı ve RLS kurallarını kontrol etmek; mevcut yerel saklama davranışının sınırını bilmek |
| Yerel depolama kullanımının yanlış anlaşılması | Kullanıcı, verilerinin her cihazda otomatik eşitleneceğini düşünebilir | Bu davranışın yedek yol olduğunu ve tarayıcıya bağlı çalıştığını açıkça belirtmek |
| Rollerin tek kişide toplanması | Öncelik, geliştirme ve analiz kararlarında farklı bakış açısı eksik kalabilir | Gereksinimleri koddan bağımsız düşünmek, dokümanları gözden geçirmek ve gelecekte geri bildirim almaya açık olmak |

## Öğrenme Notları

### Bu doküman nedir?

Paydaş Analizi, projeyle ilişkisi olan tarafları, onların ihtiyaçlarını ve projeyi ne ölçüde etkilediklerini belirleyen analiz dokümanıdır.

### Neden hazırlanır?

Bir çözümün kimin ihtiyacını karşıladığını netleştirir. Böylece gereksinim toplanırken yalnızca en yüksek sesi duyulan kişiye göre karar verme riski azalır.

### Kim hazırlar?

Genellikle iş analisti hazırlar. Proje yöneticisi, ürün sahibi veya geliştirici de bilgi sağlar. Bu projede Serdar Ç. mevcut uygulama ve teknik bağımlılıkları inceleyerek hazırlamıştır.

### Kimler kullanır?

Proje sahibi, geliştirici, iş analisti ve ileride projeye katkı sağlayacak kişiler kullanabilir. Doküman, kiminle hangi konuda konuşulması gerektiği için kısa bir rehberdir.

### Projenin hangi aşamasında hazırlanır?

Genellikle proje başlangıcında ve gereksinim toplama sırasında hazırlanır. Yeni kullanıcı rolü, entegrasyon veya kapsam değişikliği ortaya çıkarsa güncellenir.

### Gerçek projelerde nasıl kullanılır?

Paydaş Analizi; görüşme planı oluşturmak, iletişim sıklığını belirlemek, gereksinim kaynaklarını tanımak ve değişikliklerden kimlerin etkileneceğini görmek için kullanılır.

### Junior İş Analisti için dikkat edilmesi gerekenler

- Her kişi veya sistemi paydaş diye ekleme; projeyle gerçek bir ilişkisi olmalı.
- Kullanıcı, karar verici ve teknik sağlayıcı rollerini birbirinden ayır.
- İnsan olmayan teknik bağımlılıkları insan paydaşı gibi yazma; rolünü açıkça belirt.
- Paydaşın ihtiyaçları ile teknik çözüm ayrıntılarını karıştırma.
- Küçük projelerde olmayan komite, sponsor veya yönetici rolleri uydurma.

### En sık yapılan hatalar

- Sadece son kullanıcıyı paydaş saymak
- İşveren veya müşteri rolünü kanıt olmadan eklemek
- Etki ve ilgi seviyelerini gerekçesiz vermek
- İletişim planını hiç olmayan toplantı ve onay süreçleriyle doldurmak
- Dış teknik servisin projeye bağımlılığını göz ardı etmek

## Mülakat Soruları

1. Paydaş Analizi nedir ve neden önemlidir?
2. Kullanıcı ile paydaş arasında fark var mıdır?
3. Bu projede neden işveren veya işe alım uzmanını aktif sistem paydaşı olarak tanımlamadınız?
4. Teknik bir servis paydaş analizinde nasıl ele alınmalıdır?
5. Etki–ilgi matrisi hangi amaçla kullanılır?
6. Tek geliştiricili bir projede paydaş analizi yapmak yine de gerekli midir?
7. Paydaş ihtiyaçları çelişirse nasıl ilerlersiniz?
8. Paydaş analizi güncellenmesi gereken bir doküman mıdır? Hangi durumda güncellersiniz?
9. Kullanıcı geri bildirimi olmadığında hangi varsayımlar risk oluşturur?
10. Bu analiz, İş Gereksinimleri Dokümanı'nı nasıl destekler?

---

## Kalite Kontrolü

- [x] Kimlik doğrulama, veri erişim katmanı ve Supabase bağımlılığı incelendi.
- [x] Kodda bulunmayan kullanıcı rolleri veya kurumsal paydaşlar eklenmedi.
- [x] Yerel depolama davranışı teknik sınırlarıyla birlikte belirtildi.
- [x] Ölçülmemiş metrik ve kurumsal onay ifadesi kullanılmadı.
- [x] Doküman öğrenci seviyesi ve mülakat anlatımına uygun tutuldu.
