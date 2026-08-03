# BA-9 — Kabul Kriterleri

## Doküman Bilgileri

| Alan | Bilgi |
| --- | --- |
| Proje | Kariyer Pusulası |
| Doküman adı | Kabul Kriterleri |
| Doküman kodu | BA-9 |
| Sürüm | 0.1 |
| Durum | Taslak |
| Yazar | Serdar Ç. |
| Tarih | 1 Ağustos 2026 |
| İlişkili dokümanlar | BA-6 Fonksiyonel Gereksinimler, BA-8 Kullanım Senaryoları |

Bu doküman, mevcut form doğrulamaları, sayfa akışları ve mevcut otomatik test dosyaları incelenerek hazırlanmıştır. Kabul kriterleri, bir davranışın beklenen sonucu tanımlar; testlerin tümünün çalıştırıldığı veya her kriterin test edilerek geçtiği anlamına gelmez.

## Amaç

Fonksiyonel gereksinimlerin ne zaman karşılanmış sayılacağını açık, gözlemlenebilir ve test edilebilir ifadelerle tanımlamaktır. Kabul kriterleri, geliştirici ile test yapan kişinin aynı beklenen davranışı anlamasına yardımcı olur.

## Kapsam

Kriterler; hesap erişimi, başvuru, şirket, mülakat, gösterge paneli ve veri dışa aktarma akışlarını kapsar. Yalnızca kullanıcıya açık ve kodda karşılığı olan işlevler ele alınmıştır.

AI Asistanı, Şablonlar, haricî takvim entegrasyonu, gerçek e-posta/push bildirimi ve iş ilanına uygulama içinden başvuru kapsam dışıdır.

## İçindekiler

1. Kabul kriteri yaklaşımı
2. Hesap ve erişim kriterleri
3. Başvuru yönetimi kriterleri
4. Şirket yönetimi kriterleri
5. Mülakat yönetimi kriterleri
6. Gösterge paneli ve ayarlar kriterleri
7. Doğrulama notları
8. Öğrenme notları
9. Mülakat soruları

## 1. Kabul kriteri yaklaşımı

Kriterler **Verildiğinde / Yapıldığında / Beklenen sonuç** biçiminde yazılmıştır. Bu yapı, Gherkin'in sade Türkçe kullanımına benzer.

- **Verildiğinde:** Başlangıç durumu veya ön koşul
- **Yapıldığında:** Kullanıcı eylemi veya sistem olayı
- **Beklenen sonuç:** Gözlemlenebilir sistem davranışı

Bir kriter mümkün olduğunca tek bir sonucu doğrular. Birden çok kontrol gerekiyorsa ayrı maddeler kullanılır.

## 2. Hesap ve erişim kriterleri

| ID | İlişkili gereksinim | Kabul kriteri |
| --- | --- | --- |
| AC-01 | FR-01 | Verildiğinde kullanıcı kayıt ekranındadır, ad soyad, geçerli e-posta ve en az altı karakterlik şifre girdiğinde kayıt işlemi başlatılmalıdır. |
| AC-02 | FR-01 | Verildiğinde kullanıcı kayıt ekranındadır, şifre altı karakter olduğunda kayıt işlemi başlatılmamalı ve kullanıcıya şifre uzunluğunu belirten hata mesajı gösterilmelidir. |
| AC-03 | FR-02 | Verildiğinde kullanıcı geçerli e-posta ve şifreyle giriş ekranındadır, giriş işlemini seçtiğinde geçerli oturum oluşursa kullanıcı gösterge paneline veya gelmek istediği korunan sayfaya yönlendirilmelidir. |
| AC-04 | FR-03 | Verildiğinde kullanıcı geçerli oturum olmadan korunan bir uygulama adresine erişmeye çalışır, sistem kullanıcıyı giriş ekranına yönlendirmelidir. |
| AC-05 | FR-04 | Verildiğinde kullanıcı şifre unutma ekranında geçerli e-posta adresini girer, sıfırlama bağlantısı talebi başarılı olduğunda sistem kullanıcıya bilgilendirme göstermelidir. |
| AC-06 | FR-05 | Verildiğinde kullanıcı yeni şifre belirleme ekranındadır, iki şifre alanı eşleşmediğinde sistem şifre güncellemesini gerçekleştirmemeli ve hata mesajı göstermelidir. |

## 3. Başvuru yönetimi kriterleri

| ID | İlişkili gereksinim | Kabul kriteri |
| --- | --- | --- |
| AC-07 | FR-08 | Verildiğinde oturum açmış kullanıcı yeni başvuru ekleme işlemini seçer, sistem başvuru oluşturma formunu göstermelidir. |
| AC-08 | FR-09 | Verildiğinde başvuru formunda şirket adı ve pozisyon boş bırakılır, kullanıcı kaydetme işlemini seçtiğinde sistem her iki zorunlu alan için hata mesajı göstermeli ve kayıt oluşturmamalıdır. |
| AC-09 | FR-10 | Verildiğinde kullanıcı başvuru formuna geçerli şirket adı ve pozisyon bilgisi girer, opsiyonel alanları boş bıraksa bile kaydetme işlemi başarılı olduğunda başvuru kaydı oluşturulmalıdır. |
| AC-10 | FR-10 | Verildiğinde kullanıcı başvuru formunda ilan bağlantısı veya iletişim e-postası alanını doldurur, değer geçerli URL/e-posta biçiminde değilse sistem kaydetme öncesinde ilgili hata mesajını göstermelidir. |
| AC-11 | FR-11 | Verildiğinde kullanıcının başvuru kaydı bulunur, kullanıcı Başvurular ekranını açtığında kendi kayıtlarını liste içinde görebilmelidir. |
| AC-12 | FR-15, FR-16, FR-17 | Verildiğinde başvuru listesinde birden fazla kayıt vardır, kullanıcı arama metni, filtre veya sıralama seçtiğinde sistem yalnızca seçime uyan kayıtları ve seçilen sıralamayı göstermelidir. |
| AC-13 | FR-13 | Verildiğinde kullanıcı mevcut bir başvuruyu düzenleme formunda açar ve geçerli değişiklikleri kaydeder, sistem güncel bilgileri başvuru detayında ve listede göstermelidir. |
| AC-14 | FR-13 | Verildiğinde kullanıcı başvuru düzenleme formunda değişiklik yapar, kaydetmeden kapatmayı seçtiğinde sistem kaydedilmemiş değişiklik uyarısını göstermelidir. |
| AC-15 | FR-14 | Verildiğinde kullanıcı bir başvuru için silme işlemini başlatır, silme onayını verdiğinde sistem kaydı listeden kaldırmalıdır. |
| AC-16 | FR-18 | Verildiğinde kullanıcı listeden birden fazla başvuru seçer ve geçerli bir durum seçer, toplu güncelleme sonrasında seçilen kayıtların durumu bu değer olmalıdır. |
| AC-17 | FR-19 | Verildiğinde kullanıcı birden fazla başvuruyu silmek için seçer, silme onayını verdiğinde yalnızca seçili kayıtlar listeden kaldırılmalıdır. |

## 4. Şirket yönetimi kriterleri

| ID | İlişkili gereksinim | Kabul kriteri |
| --- | --- | --- |
| AC-18 | FR-20 | Verildiğinde oturum açmış kullanıcı yeni şirket ekleme işlemini seçer, sistem şirket oluşturma formunu göstermelidir. |
| AC-19 | FR-21 | Verildiğinde kullanıcı şirket adını boş bırakır veya iki karakterden kısa girer, kaydetme işleminde sistem hata mesajı göstermeli ve şirket kaydı oluşturmamalıdır. |
| AC-20 | FR-21 | Verildiğinde kullanıcı geçerli şirket adı girer, opsiyonel alanları boş bıraksa bile kaydetme işlemi başarılı olduğunda şirket kaydı listede görünmelidir. |
| AC-21 | FR-22 | Verildiğinde kullanıcı şirket kaydını favori olarak işaretler, sistem şirketi favori durumu etkin biçimde göstermelidir. |
| AC-22 | FR-23 | Verildiğinde şirket listesinde kayıtlar vardır, kullanıcı arama, durum/sektör/büyüklük/favori filtresi veya sıralama seçtiğinde sistem seçime uyan kayıtları göstermelidir. |
| AC-23 | FR-24 | Verildiğinde kullanıcı seçili şirketleri arşivleme işlemini başlatır, işlem tamamlandığında bu kayıtların durumu `Archived` olmalıdır. |
| AC-24 | FR-25 | Verildiğinde kullanıcı mevcut şirket kaydında geçerli alanları günceller, kaydetme işlemi sonrası sistem güncel değerleri şirket detayında göstermelidir. |

## 5. Mülakat yönetimi kriterleri

| ID | İlişkili gereksinim | Kabul kriteri |
| --- | --- | --- |
| AC-25 | FR-26 | Verildiğinde oturum açmış kullanıcı yeni mülakat planlama işlemini seçer, sistem mülakat oluşturma formunu göstermelidir. |
| AC-26 | FR-27 | Verildiğinde kullanıcı mülakat formunda şirket adı veya pozisyon bilgisini boş bırakır, kaydetme işlemini seçtiğinde sistem hata mesajı göstermeli ve kayıt oluşturmamalıdır. |
| AC-27 | FR-28, FR-29 | Verildiğinde kullanıcı ilişkili bir başvuru seçer, sistem o başvurunun şirket ve pozisyon bilgisini mülakat formuna aktarmalıdır. |
| AC-28 | FR-27 | Verildiğinde kullanıcı geçerli şirket, pozisyon, aşama, tür, tarih ve saat bilgileriyle kaydetme işlemi yapar, sistem mülakat kaydını oluşturmalıdır. |
| AC-29 | FR-30 | Verildiğinde kullanıcı toplantı bağlantısı alanını geçersiz URL ile doldurur, sistem kaydetme öncesinde alanla ilgili doğrulama mesajı göstermelidir. |
| AC-30 | FR-31, FR-32 | Verildiğinde kullanıcının mülakat kaydı vardır, kullanıcı liste veya takvim görünümünü seçtiğinde ilgili kayıt seçilen görünümde gösterilmelidir. |
| AC-31 | FR-34 | Verildiğinde gelecekte tarih ve saati olan en az bir mülakat kaydı bulunur, sistem sıradaki mülakat için geri sayım bilgisini göstermelidir. |
| AC-32 | FR-35 | Verildiğinde kullanıcı mülakatın sonuç veya not bilgisini günceller ve kaydeder, sistem güncel bilgiyi mülakat ayrıntısında göstermelidir. |
| AC-33 | FR-35 | Verildiğinde kullanıcı bir mülakat kaydını siler, işlem tamamlandığında kayıt hem listede hem takvimde gösterilmemelidir. |

## 6. Gösterge paneli ve ayarlar kriterleri

| ID | İlişkili gereksinim | Kabul kriteri |
| --- | --- | --- |
| AC-34 | FR-36 | Verildiğinde kullanıcının başvuru kayıtları vardır, gösterge paneli açıldığında toplam, aktif, mülakat sürecindeki, teklif ve reddedilen kayıt sayıları bu verilerden hesaplanmalıdır. |
| AC-35 | FR-37 | Verildiğinde kullanıcının başvuru kayıtları vardır, gösterge paneli durum dağılımı, son altı ay ve son yedi gün görünümünü mevcut kayıt verilerinden üretmelidir. |
| AC-36 | FR-39 | Verildiğinde gösterge paneli veya liste verisi yüklenirken hata oluşur, sistem kullanıcıya hata mesajı ve tekrar deneme seçeneği göstermelidir. |
| AC-37 | FR-40 | Verildiğinde kullanıcı tema tercihini değiştirir, sistem seçilen temayı uygulamalı ve tercih sonraki kullanımda okunabilmelidir. |
| AC-38 | FR-41 | Verildiğinde kullanıcı para birimi veya bildirim tercihlerini değiştirip kaydeder, sistem bu tercihleri tarayıcı yerel depolamasına yazmalıdır. |
| AC-39 | FR-42 | Verildiğinde kullanıcı veri dışa aktarma işlemini seçer, sistem başvuru, şirket ve mülakat kayıtlarını dışa aktarma tarihiyle birlikte JSON dosyası için hazırlamalıdır. |
| AC-40 | FR-42 | Verildiğinde dışa aktarma sırasında veri alınamaz, sistem kullanıcıya dışa aktarmanın başarısız olduğunu bildirmelidir. |

AC-38, yalnızca tercihlerin kaydedilmesini kapsar. Bu kriter, gerçek e-posta raporu veya cihaz bildirimi gönderilmesini kapsamaz.

## 7. Doğrulama notları

- Kabul kriterleri test senaryosuna dönüştürülebilir; ancak bu doküman test çalıştırma raporu değildir.
- Kullanıcı arayüzü test dosyaları; boş zorunlu alanlar, form açılması ve geçerli veriyle kayıt isteğinin tetiklenmesi gibi bazı davranışları içerir.
- Kriterlerin tamamı için otomatik test bulunması zorunlu değildir. Kritik akışlar otomatik veya manuel testle doğrulanabilir.
- Kriterler değişirse ilişkili fonksiyonel gereksinim, kullanım senaryosu ve izlenebilirlik matrisi de gözden geçirilmelidir.

## Öğrenme Notları

### Bu doküman nedir?

Kabul kriterleri, bir gereksinim veya kullanıcı hikâyesinin tamamlanmış sayılması için sağlanması gereken koşullardır. Beklenen davranışı netleştirir.

### Neden hazırlanır?

“Bu özellik bitti mi?” sorusuna ortak ve gözlemlenebilir bir cevap verir. Geliştirici, test yapan kişi ve proje sahibi arasında yorum farkını azaltır.

### Kim hazırlar?

Genellikle iş analisti veya ürün sahibi hazırlar; geliştirici ve test yapan kişiyle gözden geçirilir. Teknik ayrıntı gerektiğinde ekipten destek alınır.

### Kimler kullanır?

Geliştirici, test yapan kişi, iş analisti ve proje sahibi kullanır. Kabul testi, kullanıcı kabul testi ve otomasyon senaryolarının temel girdilerinden biridir.

### Projenin hangi aşamasında hazırlanır?

Kullanıcı hikâyesi veya gereksinim netleştirilirken hazırlanması idealdir. Geliştirmeden önce anlaşmayı sağlar; geliştirme sonunda doğrulama için kullanılır.

### Gerçek projelerde nasıl kullanılır?

Kabul kriterleri backlog öğelerine bağlanır, test senaryolarına dönüştürülür ve tamamlanma tanımına katkı sağlar. Kriter geçmiyorsa işlevin tamamlandığı kabul edilmez.

### Junior İş Analisti için dikkat edilmesi gerekenler

- Kriteri gözlemlenebilir sonuçla yaz.
- “Sistem hızlı olmalı” gibi belirsiz ifadelerden kaçın.
- Başlangıç durumunu ve kullanıcı eylemini belirt.
- Pozitif akışın yanında geçersiz giriş ve boş durumları da düşün.
- Kabul kriterini test sonucu ile karıştırma; kriter beklentidir, test sonucu kanıttır.

### En sık yapılan hatalar

- Kriter yerine görev listesi yazmak
- Bir kriterde birden çok bağımsız sonucu birleştirmek
- Hata senaryolarını atlamak
- Kodda bulunmayan davranış için kabul kriteri yazmak
- “Başarılı çalışmalı” gibi test edilemeyen ifade kullanmak

## Mülakat Soruları

1. Kabul kriteri nedir ve kullanıcı hikâyesinden farkı nedir?
2. Neden Verildiğinde/Yapıldığında/Beklenen sonuç yapısını kullandınız?
3. Kabul kriteri ile test senaryosu arasındaki fark nedir?
4. Negatif senaryoları kabul kriterlerine neden eklersiniz?
5. Bir kriterin test edilebilir olduğunu nasıl değerlendirirsiniz?
6. Bu projede başvuru oluşturma için en kritik kabul kriterleri hangileridir?
7. Kabul kriteri değişirse hangi dokümanlar etkilenir?
8. Otomatik test dosyasının bulunması, kabul kriterinin geçtiğini kanıtlar mı?
9. Birden fazla kullanıcı hikâyesi aynı kabul kriterini kullanabilir mi?
10. Gerçek bildirim özelliği olmadığında ayarlar için kriteri nasıl sınırlandırırsınız?

---

## Kalite Kontrolü

- [x] Kriterler mevcut form davranışları, doğrulama şemaları ve kullanıcı akışlarıyla karşılaştırıldı.
- [x] Kriterler test sonucu veya tamamlanmış test raporu gibi sunulmadı.
- [x] Pozitif, geçersiz giriş, silme onayı ve hata durumu senaryoları eklendi.
- [x] Gerçek bildirim ve haricî entegrasyon kriterleri kapsam dışı bırakıldı.
- [x] Maddeler gereksinim kimlikleriyle ilişkilendirildi.
