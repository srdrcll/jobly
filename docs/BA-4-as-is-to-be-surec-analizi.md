# BA-4 — AS-IS / TO-BE Süreç Analizi

## Doküman Bilgileri

| Alan | Bilgi |
| --- | --- |
| Proje | Kariyer Pusulası |
| Doküman adı | AS-IS / TO-BE Süreç Analizi |
| Doküman kodu | BA-4 |
| Sürüm | 0.1 |
| Durum | Taslak |
| Yazar | Serdar Ç. |
| Tarih | 1 Ağustos 2026 |
| İlişkili dokümanlar | BA-1, BA-2, BA-3 |

Bu doküman; uygulama rotaları, başvuru/şirket/mülakat formları, veri erişim katmanı, doğrulama kuralları ve gösterge paneli hesaplamaları incelenerek hazırlanmıştır. AS-IS süreçleri için gerçek kullanıcı gözlemi veya zaman ölçümü yapılmamıştır. AS-IS tanımları, projenin çözmeyi hedeflediği manuel takip ihtiyacını açıklayan çalışma varsayımlarıdır. TO-BE süreçleri ise mevcut kod tabanında erişilebilen akışlara dayanır.

## Amaç

İş arama sürecindeki bilgi takibinin uygulama öncesinde nasıl dağınık olabileceğini (AS-IS) ve Kariyer Pusulası'nın mevcut sürümde bu takibi nasıl yapılandırdığını (TO-BE) karşılaştırmaktır. Amaç, yalnızca ekranları sıralamak değil; kullanıcı adımlarındaki değişimi ve süreç sınırlarını görünür kılmaktır.

## Kapsam

Bu analiz aşağıdaki üç ana süreci kapsar:

- İş başvurusu kaydı ve durum takibi
- Hedef şirket bilgisi ve araştırma notu takibi
- Mülakat planlama ve sonuç takibi

Gösterge paneli, bu üç sürecin kayıtlarından üretilen özet görünüm olarak ele alınmıştır. İş ilanına uygulama içinden başvurma, işverenin karar verme süreci, gerçek e-posta bildirimi, haricî takvim senkronizasyonu ve AI modülleri kapsam dışındadır.

## İçindekiler

1. Kavramlar ve analiz sınırı
2. Süreç özeti
3. Başvuru takibi: AS-IS ve TO-BE
4. Şirket takibi: AS-IS ve TO-BE
5. Mülakat takibi: AS-IS ve TO-BE
6. Gösterge paneli ve veri görünürlüğü
7. Süreç değişiminin özeti
8. Gelecek çalışmalar
9. Öğrenme notları
10. Mülakat soruları

## 1. Kavramlar ve analiz sınırı

**AS-IS**, çözüm uygulanmadan önceki veya mevcut iş yapış biçimini tanımlar. Bu projede gerçek kullanıcı araştırması yapılmadığı için AS-IS; “iş arayan kullanıcı bilgileri ayrı notlar, e-postalar veya bağlantılarda tutabilir” biçiminde ihtiyatlı bir varsayımdır.

**TO-BE**, hedeflenen veya tasarlanan süreçtir. Bu dokümanda TO-BE, gelecekte önerilen hayalî bir akış değil; Kariyer Pusulası'nın mevcut sürümünde kullanıcı arayüzü üzerinden gerçekleştirilebilen akıştır.

## 2. Süreç özeti

| Süreç | AS-IS'te varsayılan durum | TO-BE'de mevcut destek |
| --- | --- | --- |
| Başvuru takibi | Bilgiler farklı notlarda, e-postalarda veya bağlantılarda dağınık tutulabilir | Başvuru formu, liste, detay, arama, filtre, sıralama ve durum güncelleme |
| Şirket takibi | Şirket araştırması başvuru kaydından bağımsız kalabilir | Ayrı şirket kaydı, durum, favori, iletişim ve not alanları |
| Mülakat takibi | Tarih-saat, bağlantı ve hazırlık notları farklı yerlerde bulunabilir | Mülakat kaydı, ilişkili başvuru, takvim/listeler ve sonuç alanları |
| Genel görünüm | Süreç özeti için kayıtların tek tek incelenmesi gerekebilir | Başvuru ve mülakat kayıtlarından hesaplanan kartlar ve grafikler |

## 3. Başvuru takibi: AS-IS ve TO-BE

### 3.1 AS-IS: Manuel başvuru takibi varsayımı

1. İş arayan kişi bir ilan bulur ve başvuruyu ilgili dış platform veya şirket kanalı üzerinden yapar.
2. Şirket, pozisyon, ilan bağlantısı ve başvuru tarihi gibi bilgileri hatırlamak için farklı bir not, e-posta veya kişisel liste kullanabilir.
3. Süreçteki değişikliği öğrendiğinde kaydını bulup manuel olarak güncellemesi gerekir.
4. Birden fazla başvuru varsa hangi kaydın mülakat veya takip aşamasında olduğunu tek tek kontrol etmek gerekebilir.
5. Kişi, geçmiş başvuruları veya öncelikli kayıtları yeniden bulmak için kendi notlarında arama yapar.

Bu adımların herhangi bir kullanıcıda mutlaka bu şekilde gerçekleştiği iddia edilmemektedir. Bunlar, Kariyer Pusulası'nın başvuru formu, filtreleri ve durum alanlarının çözmek üzere tasarlandığı bilgi düzenleme ihtiyacını açıklar.

### 3.2 TO-BE: Kariyer Pusulası ile başvuru takibi

1. Kullanıcı hesabıyla giriş yapar; korunan Başvurular ekranına erişir.
2. “Yeni İş Başvurusu Ekle” işlemini başlatır.
3. Şirket adı ve pozisyonu girer; durum, çalışma modeli, tarih, öncelik ve diğer uygun alanları doldurur.
4. Form doğrulaması başarılıysa kayıt kullanıcının verilerine eklenir. Kullanıcı kaydı istemci arayüzünde görür.
5. Kullanıcı başvuru listesini arama, durum, öncelik ve çalışma modeli filtreleriyle daraltabilir; tarih, şirket adı veya önceliğe göre sıralayabilir.
6. Kullanıcı kayıt detayını açarak bilgileri inceleyebilir, düzenleyebilir veya silebilir.
7. Gerekli olduğunda birden fazla görünür kaydın durumunu toplu değiştirebilir ya da seçili kayıtları silebilir.
8. Başvuru kayıtları gösterge panelindeki sayı ve grafiklerin hesaplanmasında kullanılır.

### 3.3 Başvuru süreci karar noktaları

| Karar / kontrol | Süreçteki davranış |
| --- | --- |
| Kullanıcı oturum açmış mı? | Hayırsa korunan ekrana erişim yerine giriş ekranına yönlendirilir. |
| Şirket adı ve pozisyon girilmiş mi? | Bu alanlar zorunludur; doğrulama başarısızsa kayıt oluşturulmaz. |
| URL veya e-posta girildi mi? | Girildiyse biçim doğrulamasından geçmelidir. |
| Kayıt bulunmak isteniyor mu? | Kullanıcı arama, filtreleme ve sıralama araçlarını kullanabilir. |
| Birden fazla kayıt değiştirilecek mi? | Kullanıcı seçili kayıtlar için toplu durum güncelleme veya silme işlemini kullanabilir. |

### 3.4 Süreçteki değişim

TO-BE akışı, başvuru bilgisini yapılandırılmış alanlarda tutmayı ve liste üzerinde bulunabilir hâle getirmeyi hedefler. Uygulama iş ilanına başvuru yapmaz; başvuru yapıldıktan veya taslak olarak kaydedildikten sonra sürecin takibini destekler.

## 4. Şirket takibi: AS-IS ve TO-BE

### 4.1 AS-IS: Şirket araştırmasının dağınık tutulması varsayımı

1. Kullanıcı ilgilendiği şirketin web sitesi, kariyer sayfası ve iletişim bilgisini farklı kaynaklarda inceler.
2. Araştırma notu, açık pozisyon bağlantısı veya iletişim kişisi başvuru kayıtlarından ayrı yerde kalabilir.
3. Kullanıcı, hangi şirketin hedef, araştırma veya başvuru aşamasında olduğunu kendi yöntemleriyle ayırmak zorunda kalabilir.
4. Öncelikli şirketler için kişisel bir işaretleme yöntemi kullanabilir.

Bu AS-IS akışı, uygulamanın şirket modülündeki alanlardan türetilen bir çalışma varsayımıdır; gözlemlenmiş kullanıcı verisi değildir.

### 4.2 TO-BE: Kariyer Pusulası ile şirket takibi

1. Kullanıcı Şirketler ekranından yeni şirket kaydı başlatır.
2. Şirket adı, sektör, konum, web sitesi, büyüklük, durum, puan, iletişim bilgileri ve notlardan uygun olanları ekler.
3. Kullanıcı şirketi hedef, araştırılıyor, başvuruldu, iletişime geçildi, mülakat yapıldı, teklif veya arşivlendi olarak işaretleyebilir.
4. Gerekli görürse şirketi favoriye alabilir.
5. Kullanıcı şirket listesini ad, durum, puan veya tarihe göre sıralar; metin, sektör, büyüklük, durum ve favori durumuna göre filtreler.
6. Kullanıcı şirket kaydını güncelleyebilir, arşivleyebilir, geri yükleyebilir veya silebilir.
7. Şirket listesi üzerinden kullanıcı, kendi hedef şirketleriyle ilgili özet kartları ve isteğe bağlı analiz bölümünü görüntüler.

### 4.3 Süreçteki değişim

TO-BE akışı, şirket araştırması için başvurudan bağımsız bir kayıt alanı sağlar. Başvuru formunda şirket adı serbest metinle girilebildiğinden, şirket ve başvuru kaydının her zaman otomatik ve zorunlu olarak birbirine bağlanması mevcut sürümde garanti edilmez. Bu, analizde korunması gereken mevcut süreç sınırıdır.

## 5. Mülakat takibi: AS-IS ve TO-BE

### 5.1 AS-IS: Manuel mülakat planlaması varsayımı

1. Kullanıcı mülakat davetini genellikle dış iletişim kanalı üzerinden alır.
2. Tarih, saat, görüşme bağlantısı ve görüşmeci bilgisi e-posta veya kişisel notta kalabilir.
3. Hazırlık başlıkları ve görüşme sonrası notlar farklı yerlerde tutulabilir.
4. Birden fazla mülakat varsa yaklaşan görüşmeleri tarihe göre kontrol etmek daha fazla dikkat gerektirebilir.
5. Görüşme sonrasında sonuç veya takip tarihi ayrı olarak hatırlanmak zorunda kalabilir.

Bu akış, sistem öncesi sürecin kesin tasviri değil; mevcut mülakat modülünün desteklemeyi amaçladığı çalışma bağlamıdır.

### 5.2 TO-BE: Kariyer Pusulası ile mülakat takibi

1. Kullanıcı Mülakatlar ekranından yeni mülakat planlama işlemini başlatır.
2. Varsa ilişkili başvuru kaydını seçer. Seçim yapıldığında şirket ve pozisyon bilgisi forma aktarılır; kullanıcı ayrıca bu alanları manuel de girebilir.
3. Kullanıcı aşama, görüşme türü, tarih, saat ve süre bilgilerini girer.
4. İsterse görüşmeci adı/rolü, toplantı bağlantısı, konum ve hazırlık notunu kaydeder.
5. Zorunlu alanlar ve biçim doğrulaması tamamlanınca mülakat kaydı oluşturulur.
6. Kullanıcı mülakatlarını liste veya aylık takvim görünümünde inceler; arama, sonuç ve tür filtrelerini kullanır.
7. Yaklaşan kayıt varsa uygulama kayıtlı tarih ve saate göre geri sayım bilgisini gösterir.
8. Kullanıcı görüşme sonrasında mülakat notu, sonuç ve takip tarihi gibi bilgileri günceller veya kaydı siler.

### 5.3 Mülakat süreci karar noktaları

| Karar / kontrol | Süreçteki davranış |
| --- | --- |
| İlişkili başvuru var mı? | Varsa seçilebilir; yoksa şirket ve pozisyon manuel girilerek kayıt açılabilir. |
| Tarih ve saat girilmiş mi? | Bu alanlar zorunludur. |
| Toplantı bağlantısı girilmiş mi? | Girildiyse geçerli URL biçiminde olmalıdır. |
| Kullanıcı takvim mi liste mi görmek istiyor? | Aynı kayıtlar, seçilen görünüm biçiminde gösterilir. |
| Mülakat gerçekleşti mi? | Kullanıcı sonuç, not ve takip tarihini daha sonra güncelleyebilir. |

### 5.4 Süreçteki değişim

TO-BE akışı, mülakat ayrıntılarını başvuru sürecinin yakınında ve tarih bazlı görünür tutar. Uygulamadaki geri sayım bir hatırlatma ekran öğesidir; gerçek bildirim, davet gönderimi veya haricî takvim senkronizasyonu değildir.

## 6. Gösterge paneli ve veri görünürlüğü

Gösterge paneli ayrı bir veri giriş süreci değildir. Başvuru ve mülakat süreçlerinde girilmiş kayıtlardan aşağıdaki görünümleri üretir:

- Başvuruların toplamı, aktif durumdaki kayıtlar, mülakat/vaka/iletişim sürecindeki kayıtlar, teklifler ve reddedilen kayıtlar
- Başvuru durumlarının dağılımı
- Son altı ayda eklenen başvuru kayıtları
- Son yedi gündeki kayıt oluşturma, güncelleme veya başvuru tarihiyle eşleşen aktivite
- Yaklaşan mülakatlar ve mülakatlara ilişkin ekran özetleri

Buradaki değerler kullanıcının kendi kayıtlarından hesaplanır. “Başarı oranı” başlıklı kartın mevcut kodda bir hesaplama karşılığı vardır; dış dünyadaki iş bulma başarısını ölçen doğrulanmış bir KPI olarak yorumlanmamalıdır.

## 7. Süreç değişiminin özeti

| Değişim alanı | AS-IS varsayımı | TO-BE karşılığı | Sınır |
| --- | --- | --- | --- |
| Bilgi saklama | Serbest biçimli ve dağınık olabilir | Form alanlarında yapılandırılmış kayıt | Kullanıcı bilgiyi yine manuel girer |
| Kayıt bulma | Notlar veya e-postalarda arama gerekebilir | Liste, arama, filtre ve sıralama | Yalnızca kullanıcı tarafından girilen kayıtlar görünür |
| Mülakat planlama | Takvim/e-posta/not arasında ayrışabilir | Liste ve aylık takvim görünümü | Haricî takvimle senkronizasyon yoktur |
| Süreç özeti | Tek tek kayıtları incelemek gerekebilir | Kartlar ve grafikler | Sonuçlar yalnızca uygulama verisine dayanır |
| Veri erişimi | Kişinin kendi kişisel kayıt yöntemi | Oturum ve kullanıcı kimliğiyle ayrılmış kayıtlar | Yerel saklama yedek yolu tarayıcıya bağlıdır |

## 8. Gelecek çalışmalar

- Gerçek kullanıcı görüşmesi veya gözlem yapılarak AS-IS varsayımlarının doğrulanması
- Başvuru ile şirket kaydı arasındaki ilişki ihtiyacının kullanıcı geri bildirimiyle netleştirilmesi
- Gerçek bildirim veya takvim entegrasyonu ihtiyaçları için ayrı süreç ve kapsam analizi yapılması
- AI Asistanı ve Şablonlar modülleri kullanıcıya açılırsa, bu modüller için bağımsız AS-IS / TO-BE süreci hazırlanması

## Öğrenme Notları

### Bu doküman nedir?

AS-IS / TO-BE Süreç Analizi, bir işin mevcut veya çözüm öncesi hâlini hedeflenen süreçle karşılaştıran analiz dokümanıdır. Süreçteki adımları, karar noktalarını, bilgi akışını ve sınırları gösterir.

### Neden hazırlanır?

Önerilen çözümün gerçekten hangi adımı değiştirdiğini anlamaya yardım eder. Böylece yalnızca özellik listesi değil, kullanıcı iş akışı üzerinden düşünülür.

### Kim hazırlar?

Genellikle iş analisti hazırlar. Gerçek projelerde süreci yapan kullanıcılar, operasyon ekipleri ve teknik ekip bilgi sağlar. Bu projede AS-IS tarafı araştırma verisiyle doğrulanmadığı için varsayım olarak işaretlenmiştir.

### Kimler kullanır?

İş analisti, ürün sahibi, geliştirici, tasarımcı ve test yapan kişi kullanabilir. Sürecin başlangıç/bitiş noktası ve kapsam dışı alanlar için ortak referans olur.

### Projenin hangi aşamasında hazırlanır?

Genellikle keşif, gereksinim analizi ve çözüm tasarımı öncesinde hazırlanır. Mevcut sistem iyileştiriliyorsa önce AS-IS anlaşılır, ardından TO-BE üzerinde uzlaşılır.

### Gerçek projelerde nasıl kullanılır?

Süreç sorunlarını, tekrar eden işleri, manuel kontrolleri ve entegrasyon noktalarını görmek için kullanılır. Daha ayrıntılı BPMN diyagramları, kullanıcı hikâyeleri ve kabul kriterleri için girdi oluşturur.

### Junior İş Analisti için dikkat edilmesi gerekenler

- AS-IS'i istediğin çözüm gibi yazma; mevcut durumu veya doğrulanmış varsayımı ayır.
- Sürecin başladığı ve bittiği noktayı açıkça belirt.
- İnsanların gerçekte ne yaptığını bilmiyorsan bunu araştırma sonucu gibi sunma.
- TO-BE'de kodda olmayan entegrasyon, bildirim veya otomasyonu varmış gibi gösterme.
- İstisna ve karar noktalarını unutma; süreç her zaman düz bir çizgi değildir.

### En sık yapılan hatalar

- AS-IS bölümünü gereksiz şekilde kötüleyerek yazmak
- Mevcut ve hedef süreci aynı cümlede karıştırmak
- Süreçteki aktörleri, girdileri ve çıktıları belirtmemek
- Ekran başlıklarını süreç adımı sanmak
- Veri kaynağı ya da kapsam sınırını açıklamamak

## Mülakat Soruları

1. AS-IS ve TO-BE analizi arasındaki temel fark nedir?
2. Bu projede AS-IS süreçlerini neden varsayım olarak işaretlediniz?
3. Bir sürecin başlangıç ve bitiş sınırını nasıl belirlersiniz?
4. Başvuru takip sürecindeki ana karar noktaları nelerdir?
5. TO-BE süreçleri hazırlanırken kod tabanı neden incelenmelidir?
6. Süreç analizi ile kullanıcı hikâyesi arasındaki fark nedir?
7. Bir iş sürecinde istisna akışını nasıl belirlersiniz?
8. Başvuru ve şirket kaydının otomatik bağlı olmadığını dokümana neden yazdınız?
9. Gösterge paneli neden ayrı bir iş süreci olarak değerlendirilmemiştir?
10. Gerçek kullanıcı araştırması yapabilseydiniz AS-IS'i doğrulamak için ne yapardınız?

---

## Kalite Kontrolü

- [x] AS-IS bölümleri gözlem sonucu gibi değil, çalışma varsayımı olarak açıkça belirtildi.
- [x] TO-BE adımları mevcut kullanıcı arayüzü, form doğrulamaları ve veri akışlarıyla karşılaştırıldı.
- [x] Haricî başvuru, bildirim ve takvim entegrasyonu kapsam dışı tutuldu.
- [x] Başvuru–şirket ilişkisinin mevcut sınırı dokümana yansıtıldı.
- [x] Doğrulanamayan zaman tasarrufu, başarı oranı veya KPI iddiası kullanılmadı.
