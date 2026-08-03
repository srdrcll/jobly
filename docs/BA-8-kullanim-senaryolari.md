# BA-8 — Kullanım Senaryoları

## Doküman Bilgileri

| Alan | Bilgi |
| --- | --- |
| Proje | Kariyer Pusulası |
| Doküman adı | Kullanım Senaryoları |
| Doküman kodu | BA-8 |
| Sürüm | 0.1 |
| Durum | Taslak |
| Yazar | Serdar Ç. |
| Tarih | 1 Ağustos 2026 |
| İlişkili dokümanlar | BA-4, BA-5, BA-6 |

Bu senaryolar; mevcut sayfalar, formlar, doğrulama şemaları, korunan rotalar ve veri işlemleri incelenerek hazırlanmıştır. Senaryolar sistemde aktif olarak bulunan ana kullanıcı akışlarını tarif eder. Kullanıcıya kapalı AI Asistanı ve Şablonlar modülleri ile işlevsel olmayan yer tutucu içerikler kapsam dışındadır.

## Amaç

Kariyer Pusulası'nda kullanıcının belirli bir hedefe ulaşırken sistemle nasıl etkileşime geçtiğini adım adım tanımlamaktır. Kullanım senaryoları, fonksiyonel gereksinimleri kullanıcı gözüyle somutlaştırır ve daha sonra kabul kriterleri ile test senaryolarına temel oluşturur.

## Kapsam

Bu doküman aşağıdaki aktif akışları kapsar:

- Hesap oluşturma ve giriş yapma
- Başvuru oluşturma ve güncelleme
- Başvuru listesinde arama, filtreleme ve toplu durum güncelleme
- Şirket kaydı oluşturma ve yönetme
- Mülakat planlama ve takvimde görüntüleme
- Veri dışa aktarma

İş ilanına dışarıdan başvurma, gerçek bildirim gönderimi, haricî takvim entegrasyonu ve işveren kullanıcısına yönelik işlemler kapsam dışıdır.

## İçindekiler

1. Kullanım senaryosu yazım yaklaşımı
2. Aktörler
3. UC-01 Hesap oluşturma ve giriş yapma
4. UC-02 Başvuru oluşturma
5. UC-03 Başvuruyu bulma ve güncelleme
6. UC-04 Şirket kaydı oluşturma ve yönetme
7. UC-05 Mülakat planlama ve takvimde görüntüleme
8. UC-06 Veriyi JSON olarak dışa aktarma
9. Kapsam dışı akışlar
10. Öğrenme notları
11. Mülakat soruları

## 1. Kullanım senaryosu yazım yaklaşımı

Her senaryo; kullanıcı hedefini, başlangıç koşulunu, normal akışı, istisna veya alternatif akışları ve beklenen sonucu içerir. Adımlar, ekran tasarımından çok kullanıcı ile sistem arasındaki işlevsel etkileşimi anlatır.

Kullanım senaryolarındaki “sistem” ifadesi, Kariyer Pusulası web uygulamasını ifade eder. Dış iş ilanı siteleri veya e-posta sağlayıcıları bu senaryolarda aktör değildir; uygulama bu dış süreçleri yönetmez.

## 2. Aktörler

| Aktör | Açıklama |
| --- | --- |
| İş arayan kullanıcı | Hesap açan, giriş yapan ve kendi başvuru/şirket/mülakat kayıtlarını yöneten birincil aktör |
| Supabase Auth ve veritabanı | Kimlik doğrulama ve uzaktaki veri işlemlerini sağlayan destekleyici teknik sistem |
| Tarayıcı | Kullanıcı arayüzünü çalıştıran, tema/ayarlar ve bazı yedek kayıtlar için yerel depolama sunan ortam |

## 3. UC-01 — Hesap oluşturma ve giriş yapma

| Alan | Açıklama |
| --- | --- |
| Kullanım senaryosu ID | UC-01 |
| Ana aktör | İş arayan kullanıcı |
| Amaç | Kişisel kariyer kayıtlarına erişmek için hesap oluşturmak veya mevcut hesapla giriş yapmak |
| Tetikleyici | Kullanıcının tanıtım sayfasından kayıt veya giriş seçeneğini seçmesi |
| Ön koşul | Kullanıcının uygulamanın herkese açık tanıtım, kayıt veya giriş ekranına ulaşabilmesi |
| Son koşul | Başarılı girişte kullanıcı korunan uygulama alanına erişir; başarısız işlemde hata mesajı görür |

### Ana akış

1. Kullanıcı kayıt ol ekranını açar.
2. Sistem ad soyad, e-posta ve şifre alanlarını gösterir.
3. Kullanıcı bilgileri girer ve kayıt işlemini başlatır.
4. Sistem şifre uzunluğunu kontrol eder ve kimlik doğrulama hizmetine kayıt isteği iletir.
5. Kayıt işlemi oturum oluşturursa sistem kullanıcıyı gösterge paneline yönlendirir.
6. E-posta doğrulaması gerekiyorsa sistem kullanıcıyı bilgilendirir ve giriş ekranına yönlendirir.
7. Mevcut hesabı olan kullanıcı, giriş ekranında e-posta ve şifresini girer.
8. Sistem geçerli oturum oluşturursa kullanıcıyı gösterge paneline veya erişmek istediği korunan sayfaya yönlendirir.

### Alternatif / istisna akışlar

- 4a. Şifre altı karakterden kısaysa sistem kayıt işlemini başlatmaz ve hata mesajı gösterir.
- 4b. Kayıt veya giriş bilgileri geçersizse sistem Türkçe hata mesajı gösterir.
- 7a. Kullanıcı şifresini hatırlamıyorsa “Şifremi Unuttum?” akışından sıfırlama bağlantısı talep edebilir.
- 8a. Kullanıcı korunan bir sayfaya oturum açmadan erişmeye çalışırsa sistem giriş ekranına yönlendirir.

## 4. UC-02 — Başvuru oluşturma

| Alan | Açıklama |
| --- | --- |
| Kullanım senaryosu ID | UC-02 |
| Ana aktör | İş arayan kullanıcı |
| Amaç | Yapılmış veya takip edilmek istenen bir iş başvurusunu kaydetmek |
| Tetikleyici | Kullanıcının Başvurular ekranından veya hızlı işlem alanından yeni başvuru eklemeyi seçmesi |
| Ön koşul | Kullanıcının oturum açmış olması |
| Son koşul | Geçerli bilgilerle yeni başvuru kaydı oluşturulur ve liste/gösterge paneli verisi güncellenir |

### Ana akış

1. Kullanıcı yeni başvuru ekleme işlemini açar.
2. Sistem başvuru formunu gösterir.
3. Kullanıcı şirket adı, pozisyon ve başvuru durumunu girer.
4. Kullanıcı uygun olduğunda çalışma modeli, başvuru tarihi, ücret bilgisi, ilan bağlantısı, iletişim bilgisi, öncelik ve not ekler.
5. Kullanıcı “Başvuruyu Kaydet” işlemini seçer.
6. Sistem form alanlarını doğrular.
7. Sistem kaydı kullanıcının başvuru listesine ekler ve işlem sonucunu bildirir.
8. Kullanıcı başvuru kaydını listede görür ve daha sonra detay ekranından inceleyebilir.

### Alternatif / istisna akışlar

- 3a. Şirket adı veya pozisyon boşsa sistem alan bazlı hata mesajı gösterir; kayıt oluşturulmaz.
- 4a. Kullanıcı URL ya da e-posta alanına geçersiz biçimde bilgi girerse sistem ilgili hata mesajını gösterir.
- 5a. Kullanıcı formda değişiklik yaptıktan sonra kapatmak isterse sistem kaydedilmemiş değişiklik uyarısı gösterir. Kullanıcı düzenlemeye devam edebilir veya değişiklikleri silip çıkabilir.
- 7a. Uzak veri işlemi başarısız olursa mevcut repository davranışında başvuru için tarayıcı yerel depolama yedek yolu denenir. Bu, başka cihazlarda otomatik eşitlenme anlamına gelmez.

## 5. UC-03 — Başvuruyu bulma ve güncelleme

| Alan | Açıklama |
| --- | --- |
| Kullanım senaryosu ID | UC-03 |
| Ana aktör | İş arayan kullanıcı |
| Amaç | Mevcut başvuru kaydını bulmak ve güncel durumunu veya ayrıntılarını değiştirmek |
| Tetikleyici | Kullanıcının Başvurular ekranını açması |
| Ön koşul | Kullanıcının oturum açmış olması ve erişilebilir en az bir başvuru kaydının bulunması |
| Son koşul | Kullanıcı seçtiği kaydı günceller, toplu durum değiştirir veya siler; liste buna göre yenilenir |

### Ana akış

1. Kullanıcı Başvurular ekranını açar.
2. Sistem kullanıcının başvuru kayıtlarını gösterir.
3. Kullanıcı, gerekirse şirket/pozisyon metniyle arama yapar; durum, öncelik veya çalışma modeli filtresi uygular ve sıralama seçer.
4. Kullanıcı istediği başvuru kaydını seçer ve ayrıntılarını görüntüler.
5. Kullanıcı düzenleme işlemini başlatır.
6. Sistem mevcut başvuru bilgilerini düzenleme formuna getirir.
7. Kullanıcı değişiklik yapar ve kaydetme işlemini seçer.
8. Sistem değişiklikleri doğrular, kaydı günceller ve kullanıcıya sonuç bildirimi gösterir.

### Alternatif / istisna akışlar

- 3a. Arama veya filtre sonucunda kayıt yoksa sistem boş durum görünümü gösterir.
- 5a. Kullanıcı birden fazla kaydı seçerse toplu durum güncelleme işlemini kullanabilir.
- 5b. Kullanıcı tekli veya toplu silme işlemini başlatırsa sistem onay ister; onay verilirse ilgili kayıtlar silinir.
- 7a. Kullanıcı düzenleme formunda değişiklik yaptıktan sonra kapatmak isterse sistem kaydedilmemiş değişiklik uyarısı gösterir.
- 8a. Güncelleme doğrulaması başarısızsa sistem kaydı değiştirmez ve hata mesajını gösterir.

## 6. UC-04 — Şirket kaydı oluşturma ve yönetme

| Alan | Açıklama |
| --- | --- |
| Kullanım senaryosu ID | UC-04 |
| Ana aktör | İş arayan kullanıcı |
| Amaç | Hedef şirket hakkındaki araştırma ve iletişim bilgisini ayrı bir kayıtta tutmak |
| Tetikleyici | Kullanıcının Şirketler ekranında yeni şirket eklemeyi seçmesi |
| Ön koşul | Kullanıcının oturum açmış olması |
| Son koşul | Şirket kaydı oluşturulur veya güncellenir; kullanıcı kayıtları filtreleyebilir, favori yapabilir, arşivleyebilir ya da silebilir |

### Ana akış

1. Kullanıcı Şirketler ekranını açar ve yeni şirket ekleme işlemini seçer.
2. Sistem şirket formunu gösterir.
3. Kullanıcı şirket adını girer; uygun olduğunda sektör, konum, web sitesi, büyüklük, iletişim bilgileri, bağlantılar, durum, puan ve not ekler.
4. Kullanıcı kaydetme işlemini seçer.
5. Sistem şirket bilgilerini doğrular ve kaydı kullanıcının şirket listesine ekler.
6. Kullanıcı şirket listesinden kaydı arayabilir, filtreleyebilir ve sıralayabilir.
7. Kullanıcı şirketi favori olarak işaretleyebilir veya ayrıntı ekranından düzenleyebilir.

### Alternatif / istisna akışlar

- 3a. Şirket adı iki karakterden kısa ise sistem hata mesajı gösterir.
- 3b. Puan, URL veya e-posta biçimi geçersizse sistem ilgili alanı doğrulamaz.
- 6a. Kullanıcı birden fazla şirketi seçerse seçili şirketleri arşivleyebilir, hedef durumuna döndürebilir veya favori durumunu değiştirebilir.
- 7a. Kullanıcı şirketi silmek isterse sistem onay ister; onay sonrası kayıt kaldırılır.

## 7. UC-05 — Mülakat planlama ve takvimde görüntüleme

| Alan | Açıklama |
| --- | --- |
| Kullanım senaryosu ID | UC-05 |
| Ana aktör | İş arayan kullanıcı |
| Amaç | Mülakatın ayrıntılarını kaydetmek, hazırlık notlarına erişmek ve tarih bazında takip etmek |
| Tetikleyici | Kullanıcının Mülakatlar ekranından yeni mülakat planlamayı seçmesi |
| Ön koşul | Kullanıcının oturum açmış olması |
| Son koşul | Geçerli mülakat kaydı liste ve takvim görünümünde yer alır; kullanıcı daha sonra sonuç veya notları güncelleyebilir |

### Ana akış

1. Kullanıcı Mülakatlar ekranında yeni mülakat planlama işlemini seçer.
2. Sistem mülakat formunu gösterir.
3. Kullanıcı, varsa ilişkili başvuru kaydını seçer.
4. Sistem seçilen başvurudaki şirket ve pozisyon bilgisini forma aktarır.
5. Kullanıcı mülakat aşaması, türü, tarih, saat ve süre bilgisini girer.
6. Kullanıcı gerekirse görüşmeci, toplantı bağlantısı, konum, hazırlık notu ve diğer ayrıntıları ekler.
7. Kullanıcı kaydetme işlemini seçer.
8. Sistem alanları doğrular ve mülakat kaydını oluşturur.
9. Kullanıcı mülakatı liste görünümünde veya aylık takvimde görüntüler.
10. Kullanıcı mülakat ayrıntısını açarak sonuç, not veya takip tarihi gibi bilgileri düzenleyebilir.

### Alternatif / istisna akışlar

- 3a. İlişkili başvuru yoksa kullanıcı şirket ve pozisyon bilgisini manuel girebilir.
- 5a. Tarih, saat, şirket adı veya pozisyon bilgisi geçerli değilse sistem hata mesajı gösterir ve kaydı oluşturmaz.
- 6a. Toplantı bağlantısı girilmişse geçerli URL biçiminde olmalıdır.
- 9a. Yaklaşan mülakat varsa sistem kayıtlı tarih ve saate göre geri sayım bilgisi gösterir.
- 10a. Kullanıcı mülakatı silmek isterse silme işlemi sonrası kayıt liste ve takvimden kaldırılır.

## 8. UC-06 — Veriyi JSON olarak dışa aktarma

| Alan | Açıklama |
| --- | --- |
| Kullanım senaryosu ID | UC-06 |
| Ana aktör | İş arayan kullanıcı |
| Amaç | Başvuru, şirket ve mülakat kayıtlarının JSON çıktısını almak |
| Tetikleyici | Kullanıcının Ayarlar ekranındaki “Dışa Aktar” işlemini seçmesi |
| Ön koşul | Kullanıcının oturum açmış olması |
| Son koşul | Başvuru, şirket ve mülakat verilerini içeren JSON dosyası tarayıcı üzerinden indirilmeye çalışılır |

### Ana akış

1. Kullanıcı Ayarlar ekranını açar ve Veri Dışa Aktarma bölümüne gider.
2. Kullanıcı dışa aktarma işlemini seçer.
3. Sistem başvuru, şirket ve mülakat kayıtlarını getirir.
4. Sistem kayıtları dışa aktarma tarihiyle birlikte JSON biçiminde hazırlar.
5. Sistem tarayıcı üzerinden indirilebilir bir JSON dosyası oluşturur.
6. Kullanıcı işlem sonucuna ilişkin bildirim görür.

### Alternatif / istisna akışlar

- 3a. Veriler alınırken hata oluşursa sistem dışa aktarma işleminin başarısız olduğunu bildirir.
- 5a. İndirme işleminin kullanıcının cihazında saklanması tarayıcı davranışına bağlıdır; uygulama dışa aktarılan dosyanın daha sonra nerede tutulduğunu takip etmez.

## 9. Kapsam dışı akışlar

Bu kullanım senaryoları aşağıdaki akışları içermez:

- İş ilanı bulma veya ilanın dış platformda başvurusunu yapma
- İşverenin başvuruyu incelemesi, adayla iletişime geçmesi veya karar vermesi
- Kullanıcıya gerçek e-posta/push bildirimi gönderme
- Google Calendar, Outlook veya benzeri haricî takvimlerle iki yönlü eşitleme
- AI Asistanı, özgeçmiş inceleme veya şablon kütüphanesi kullanımı

## Öğrenme Notları

### Bu doküman nedir?

Kullanım Senaryosu, bir aktörün belirli bir hedefe ulaşmak için sistemle nasıl etkileşim kurduğunu anlatan yapısal dokümandır. Ana akış ve alternatif akışları birlikte gösterir.

### Neden hazırlanır?

Fonksiyonel gereksinimlerin kullanıcı açısından nasıl çalışacağını netleştirir. Geliştirme, test ve kabul kriteri yazımında belirsizliği azaltır.

### Kim hazırlar?

Genellikle iş analisti hazırlar; kullanıcı temsilcileri, geliştiriciler ve test ekibi senaryoyu gözden geçirir. Bu projede mevcut kod akışları referans alınmıştır.

### Kimler kullanır?

İş analisti, geliştirici, test yapan kişi ve proje sahibi kullanır. Tasarımcı için de ekrandaki kullanıcı hedefini anlamaya yardımcı olur.

### Projenin hangi aşamasında hazırlanır?

Gereksinim analizi ve çözüm tasarımı sırasında hazırlanır. Özellikle kritik iş akışları geliştirilmeden veya test edilmeden önce faydalıdır.

### Gerçek projelerde nasıl kullanılır?

Kullanım senaryoları test senaryolarına ve kabul kriterlerine dönüştürülür. Alternatif akışlar hata mesajı, yetki kontrolü ve boş durum tasarımlarını belirlemeye yardım eder.

### Junior İş Analisti için dikkat edilmesi gerekenler

- Senaryoyu tek bir kullanıcı hedefi etrafında tut.
- Ön koşul, tetikleyici ve son koşulu açık yaz.
- Normal akış kadar hata ve alternatif akışları da düşün.
- Aktörün yapacağı adımlarla sistemin vereceği tepkiyi ayır.
- Kodda olmayan dış sistem davranışını senaryoya ekleme.

### En sık yapılan hatalar

- Bir kullanım senaryosuna birden fazla bağımsız hedef koymak
- Sistem yanıtlarını belirtmeden yalnızca kullanıcının tıklamalarını yazmak
- İstisna durumlarını atlamak
- Ekran görselini kullanım senaryosu yerine koymak
- Uygulamanın yapmadığı e-posta, bildirim veya entegrasyon adımlarını eklemek

## Mülakat Soruları

1. Kullanım senaryosu nedir ve kullanıcı hikâyesinden farkı nedir?
2. Kullanım senaryosunda ön koşul neden belirtilir?
3. Ana akış ve alternatif akış arasındaki fark nedir?
4. UC-02'de neden kaydedilmemiş değişiklik uyarısını alternatif akış olarak yazdınız?
5. Bir kullanım senaryosu test senaryosuna nasıl dönüştürülür?
6. Bu projede dış iş ilanı platformlarını neden aktör olarak eklemediniz?
7. İlişkili başvurusu olmayan bir mülakat hangi akışla oluşturulabilir?
8. Kullanım senaryosunda teknik ayrıntı ne kadar yer almalıdır?
9. Başarısız veri işlemi senaryoda nasıl ele alınmalıdır?
10. Kullanım senaryosu ile kabul kriteri arasında nasıl bağlantı kurarsınız?

---

## Kalite Kontrolü

- [x] Senaryolar mevcut kullanıcı arayüzü, doğrulama ve veri işlemleriyle karşılaştırıldı.
- [x] Her senaryoda aktör, ön koşul, ana akış, alternatif akış ve son koşul yer aldı.
- [x] Kullanıcıya kapalı modüller ve işlevsel olmayan yer tutucu içerikler kullanılmadı.
- [x] Haricî başvuru, bildirim ve takvim entegrasyonu kapsam dışı bırakıldı.
- [x] Doğrulanamayan metrik, süre veya başarı iddiası eklenmedi.
