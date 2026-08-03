# BA-5 — Kullanıcı Hikâyesi Haritası

## Doküman Bilgileri

| Alan | Bilgi |
| --- | --- |
| Proje | Kariyer Pusulası |
| Doküman adı | Kullanıcı Hikâyesi Haritası |
| Doküman kodu | BA-5 |
| Sürüm | 0.1 |
| Durum | Taslak |
| Yazar | Serdar Ç. |
| Tarih | 1 Ağustos 2026 |
| İlişkili dokümanlar | BA-1, BA-3, BA-4 |

Bu kullanıcı hikâyesi haritası, mevcut uygulama rotaları, formlar, liste işlemleri, doğrulama kuralları ve ayarlar ekranı incelenerek oluşturulmuştur. Hikâyeler aktif kullanıcı akışlarını anlatır; henüz kullanıcıya açık olmayan AI Kariyer Asistanı ve Şablonlar modülleri haritaya dahil edilmemiştir.

## Amaç

Kariyer Pusulası'ndaki kullanıcı işlerini büyük faaliyetlerden küçük kullanıcı hikâyelerine doğru düzenlemektir. Bu düzen, özellikleri ekran adına göre değil, iş arayan kullanıcının ulaşmak istediği sonuca göre değerlendirmeyi sağlar.

## Kapsam

Harita, oturum yönetimi, başvuru takibi, şirket takibi, mülakat takibi, genel görünüm ve ayarlar faaliyetlerini kapsar. Kullanıcı hikâyeleri, mevcut sürümde çalışması hedeflenen veya kullanıcı arayüzünde erişilebilen davranışlara dayanır.

İş ilanı arama, uygulama içinden başvuru gönderme, işveren kullanıcısı, gerçek bildirim gönderimi, haricî takvim senkronizasyonu ve AI modülleri kapsam dışındadır.

## İçindekiler

1. Kullanıcı hikâyesi haritası nedir?
2. Haritanın üst seviye yapısı
3. Kullanıcı hikâyeleri
4. Mevcut sürüm dilimi
5. Haritadan çıkan gözlemler
6. Gelecek çalışmalar
7. Öğrenme notları
8. Mülakat soruları

## 1. Kullanıcı hikâyesi haritası nedir?

Kullanıcı hikâyesi haritası, kullanıcının yaptığı büyük işleri yatay eksende; bu işleri tamamlayan görev ve hikâyeleri altında gösteren bir planlama aracıdır. Bir backlog listesi “ne yapılacak?” sorusuna cevap verirken, hikâye haritası “kullanıcı bunu hangi yolculuk içinde yapacak?” sorusuna cevap verir.

Bu dokümanda kullanılan hikâye kalıbı şöyledir:

> İş arayan kullanıcı olarak, **[ihtiyacım]** için **[işlevi]** yapmak istiyorum; böylece **[beklediğim sonucu]** elde edebilirim.

## 2. Haritanın üst seviye yapısı

| Kullanıcı faaliyeti | Kullanıcının ulaşmak istediği sonuç |
| --- | --- |
| Hesaba erişmek | Kişisel kariyer kayıtlarına güvenli biçimde ulaşmak |
| Başvuruları yönetmek | Başvuruları kaydetmek, bulmak ve süreç durumunu takip etmek |
| Şirketleri yönetmek | Hedef şirketlere ait araştırma ve iletişim bilgisini düzenlemek |
| Mülakatları yönetmek | Görüşme ayrıntılarını planlamak, takip etmek ve güncellemek |
| Sürece genel bakmak | Kendi kayıtlarından oluşan özetleri görmek |
| Tercihleri yönetmek | Hesap ve uygulama tercihlerini kişiselleştirmek, veriyi dışa aktarmak |

## 3. Kullanıcı hikâyeleri

### 3.1 Hesaba erişmek

| Görev | ID | Kullanıcı hikâyesi | Mevcut durum |
| --- | --- | --- | --- |
| Hesap oluşturmak | US-01 | İş arayan kullanıcı olarak, kendi hesabımı oluşturmak istiyorum; böylece kişisel kariyer kayıtlarımı uygulamada tutabilirim. | Aktif |
| Giriş yapmak | US-02 | İş arayan kullanıcı olarak, e-posta ve şifremle giriş yapmak istiyorum; böylece bana ait alanlara erişebilirim. | Aktif |
| Şifreyi sıfırlamak | US-03 | İş arayan kullanıcı olarak, şifremi unuttuğumda sıfırlama sürecini başlatmak istiyorum; böylece hesabıma yeniden erişebilirim. | Aktif |
| Oturumu korumak | US-04 | İş arayan kullanıcı olarak, oturum açmadan kişisel verilerime erişilememesini istiyorum; böylece kayıtlarım korunur. | Aktif |
| Şifre değiştirmek | US-05 | İş arayan kullanıcı olarak, profilimden şifremi değiştirmek istiyorum; böylece hesap erişimimi güncelleyebilirim. | Aktif |

### 3.2 Başvuruları yönetmek

| Görev | ID | Kullanıcı hikâyesi | Mevcut durum |
| --- | --- | --- | --- |
| Başvuru kaydetmek | US-06 | İş arayan kullanıcı olarak, şirket adı ve pozisyon bilgisiyle başvuru kaydı oluşturmak istiyorum; böylece başvurumu unutmayabilirim. | Aktif |
| Başvuruya ayrıntı eklemek | US-07 | İş arayan kullanıcı olarak, başvuruya tarih, çalışma modeli, ilan bağlantısı, iletişim bilgisi, öncelik ve not eklemek istiyorum; böylece süreç bağlamını saklayabilirim. | Aktif |
| Kayıtları listelemek | US-08 | İş arayan kullanıcı olarak, tüm başvurularımı listede görmek istiyorum; böylece süreçlerimi tek yerden inceleyebilirim. | Aktif |
| Kayıt bulmak | US-09 | İş arayan kullanıcı olarak, başvuruları aramak, filtrelemek ve sıralamak istiyorum; böylece ihtiyacım olan kayda hızlıca ulaşabilirim. | Aktif |
| Başvuruyu güncellemek | US-10 | İş arayan kullanıcı olarak, başvuru durumunu ve ayrıntılarını düzenlemek istiyorum; böylece kayıt güncel kalır. | Aktif |
| Toplu işlem yapmak | US-11 | İş arayan kullanıcı olarak, seçtiğim başvuruların durumunu birlikte değiştirmek veya onları silmek istiyorum; böylece tekrar eden işlemleri tek tek yapmam. | Aktif |
| Başvuruyu silmek | US-12 | İş arayan kullanıcı olarak, artık gerekli olmayan bir başvuru kaydını silmek istiyorum; böylece listemi düzenli tutabilirim. | Aktif |

### 3.3 Şirketleri yönetmek

| Görev | ID | Kullanıcı hikâyesi | Mevcut durum |
| --- | --- | --- | --- |
| Şirket kaydetmek | US-13 | İş arayan kullanıcı olarak, ilgilendiğim şirketi ayrı bir kayda eklemek istiyorum; böylece başvuru yapmadan önce de takip edebilirim. | Aktif |
| Araştırma bilgisi tutmak | US-14 | İş arayan kullanıcı olarak, şirketin sektör, web sitesi, kariyer sayfası, iletişim bilgisi ve notlarını kaydetmek istiyorum; böylece araştırma bilgilerim bir arada olur. | Aktif |
| Şirket durumunu belirtmek | US-15 | İş arayan kullanıcı olarak, şirketin takip durumunu ve değerlendirme puanını güncellemek istiyorum; böylece hangi şirketlere odaklanacağımı ayırt edebilirim. | Aktif |
| Favori şirketi işaretlemek | US-16 | İş arayan kullanıcı olarak, öncelikli şirketleri favori olarak işaretlemek istiyorum; böylece onları kolayca ayırabilirim. | Aktif |
| Şirket kaydını yönetmek | US-17 | İş arayan kullanıcı olarak, şirket kayıtlarını aramak, filtrelemek, sıralamak, düzenlemek veya silmek istiyorum; böylece şirket listemi yönetebilirim. | Aktif |

### 3.4 Mülakatları yönetmek

| Görev | ID | Kullanıcı hikâyesi | Mevcut durum |
| --- | --- | --- | --- |
| Mülakat planlamak | US-18 | İş arayan kullanıcı olarak, şirket, pozisyon, aşama, tür, tarih ve saat bilgileriyle mülakat planlamak istiyorum; böylece görüşme ayrıntılarını takip edebilirim. | Aktif |
| Başvuruyla ilişkilendirmek | US-19 | İş arayan kullanıcı olarak, mülakatı var olan bir başvuruyla ilişkilendirmek istiyorum; böylece şirket ve pozisyon bilgilerini tekrar girmek zorunda kalmayabilirim. | Aktif |
| Hazırlık ayrıntısı saklamak | US-20 | İş arayan kullanıcı olarak, görüşmeci, toplantı bağlantısı, konum ve hazırlık notu eklemek istiyorum; böylece görüşme öncesinde gerekli bilgilere erişebilirim. | Aktif |
| Takvimde görmek | US-21 | İş arayan kullanıcı olarak, mülakatları liste veya aylık takvimde görmek istiyorum; böylece yaklaşan görüşmelerimi takip edebilirim. | Aktif |
| Sonucu güncellemek | US-22 | İş arayan kullanıcı olarak, görüşme sonucunu, görüşme notunu ve takip tarihini güncellemek istiyorum; böylece sürecin son durumunu kaydedebilirim. | Aktif |
| Mülakatı kaldırmak | US-23 | İş arayan kullanıcı olarak, iptal edilen veya artık gerekli olmayan mülakat kaydını silmek istiyorum; böylece takvimim güncel kalır. | Aktif |

### 3.5 Sürece genel bakmak

| Görev | ID | Kullanıcı hikâyesi | Mevcut durum |
| --- | --- | --- | --- |
| Başvuru özetini görmek | US-24 | İş arayan kullanıcı olarak, başvuru durumlarıma ait sayısal özeti görmek istiyorum; böylece kayıtları tek tek açmadan genel görünüm elde edebilirim. | Aktif |
| Başvuru dağılımını incelemek | US-25 | İş arayan kullanıcı olarak, başvuru durum dağılımını ve dönemsel kayıt yoğunluğunu grafiklerde görmek istiyorum; böylece kendi kayıtlarımdaki görünümü inceleyebilirim. | Aktif |
| Yaklaşan mülakatı görmek | US-26 | İş arayan kullanıcı olarak, kayıtlı sıradaki mülakatı ve zaman bilgisini görmek istiyorum; böylece yaklaşan görüşmeyi fark edebilirim. | Aktif |

Gösterge panelinde görünen değerler, kullanıcının girdiği kayıtlardan hesaplanır. Bu hikâyeler, iş bulma sonucunu tahmin etme veya ölçülmüş bir performans vaadi içermez.

### 3.6 Tercihleri ve veriyi yönetmek

| Görev | ID | Kullanıcı hikâyesi | Mevcut durum |
| --- | --- | --- | --- |
| Temayı seçmek | US-27 | İş arayan kullanıcı olarak, uygulama temasını seçmek istiyorum; böylece görünümü tercihime göre kullanabilirim. | Aktif |
| Tercihleri kaydetmek | US-28 | İş arayan kullanıcı olarak, para birimi ve bildirim tercihlerini kaydetmek istiyorum; böylece uygulama tercihleri tarayıcımda saklanır. | Aktif |
| Veriyi dışa aktarmak | US-29 | İş arayan kullanıcı olarak, başvuru, şirket ve mülakat verilerimi JSON dosyası olarak indirmek istiyorum; böylece kendi verimin bir çıktısını alabilirim. | Aktif |

US-28'deki bildirim tercihi, mevcut kodda tarayıcı yerel depolamasına kaydedilir. Gerçek e-posta veya cihaz bildirimi gönderimi bu hikâyenin kapsamı değildir.

## 4. Mevcut sürüm dilimi

Kullanıcı hikâyesi haritalarında “sürüm dilimi”, kullanıcının baştan sona anlamlı bir işi yapabilmesi için birlikte gereken hikâyeleri belirtir. Bu projede aşağıdaki dilim, mevcut kullanıcı arayüzünde karşılığı bulunan işlevleri özetler.

| Dilim | İçerdiği hikâyeler | Kullanıcının tamamlayabildiği iş |
| --- | --- | --- |
| Hesaba erişim | US-01 – US-05 | Hesap oluşturma, giriş ve erişim yönetimi |
| Temel başvuru takibi | US-06, US-08, US-10, US-12 | Başvuru oluşturma, görme, güncelleme ve silme |
| Düzenli başvuru yönetimi | US-07, US-09, US-11 | Ayrıntı, arama/filtre/sıralama ve toplu işlem |
| Şirket takibi | US-13 – US-17 | Hedef şirketi kaydetme ve yönetme |
| Mülakat takibi | US-18 – US-23 | Mülakatı planlama, görme, güncelleme ve silme |
| Genel görünüm ve tercihler | US-24 – US-29 | Kayıt özetini inceleme, tercihleri yönetme ve veriyi dışa aktarma |

Bu tablo resmi bir sürüm planı veya onaylanmış yol haritası değildir. Mevcut kapsamın, kullanıcı açısından anlamlı faaliyet gruplarına ayrılmış görünümüdür.

## 5. Haritadan çıkan gözlemler

- Başvuru takibi, uygulamanın en geniş kullanıcı faaliyetidir; oluşturma, bulma, güncelleme ve toplu işlem adımlarını içerir.
- Şirket ve başvuru alanları birbirini destekler, ancak mevcut uygulamada her başvuru için şirket kaydı oluşturmak zorunlu değildir.
- Mülakat kaydı başvuruyla ilişkilendirilebilir ama manuel oluşturulması da mümkündür. Bu esneklik, eksik başvuru kaydında mülakat planlamayı engellemez.
- Gösterge paneli yeni veri oluşturmaktan çok mevcut başvuru ve mülakat kayıtlarını görünür kılar.
- Bildirim tercihi ile bildirim gönderimi aynı kullanıcı hikâyesi değildir; mevcut sürümde yalnızca tercih kaydı bulunur.

## 6. Gelecek çalışmalar

Gelecekte yeni işlevler geliştirilirse ayrı hikâyeler oluşturulabilir. Örnek olarak gerçek takvim entegrasyonu, gerçek bildirim gönderimi veya kullanıcıya açık AI modülleri; mevcut haritaya eklenmeden önce ihtiyaç, kapsam ve veri etkisi açısından ayrıca analiz edilmelidir.

## Öğrenme Notları

### Bu doküman nedir?

Kullanıcı Hikâyesi Haritası, kullanıcının ana faaliyetlerini ve bunları tamamlayan kullanıcı hikâyelerini bir bütün olarak gösteren ürün analiz aracıdır.

### Neden hazırlanır?

Özellikleri rastgele bir liste yerine kullanıcı yolculuğu içinde görmeyi sağlar. Önceliklendirme, sürüm kapsamı ve eksik akışları fark etme açısından faydalıdır.

### Kim hazırlar?

Genellikle iş analisti, ürün sahibi ve geliştirme ekibi birlikte hazırlar. Kullanıcı araştırması veya geri bildirimi varsa haritanın doğruluğunu güçlendirir.

### Kimler kullanır?

İş analisti, ürün sahibi, tasarımcı, geliştirici ve test yapan kişi kullanabilir. Her rol, kullanıcıya sunulan değerin hangi parçaya bağlı olduğunu görebilir.

### Projenin hangi aşamasında hazırlanır?

Keşif ve gereksinim analizi döneminde hazırlanabilir; geliştirme planlanırken veya kapsam değiştiğinde güncellenir. Kullanıcı hikâyeleri ayrıntılandırılmadan önce büyük resmi korumaya yardım eder.

### Gerçek projelerde nasıl kullanılır?

Hikâyeler backlog'a aktarılabilir, sürüm dilimleri belirlenebilir ve test senaryoları oluşturulabilir. Harita, bir özelliğin tek başına mı yoksa başka hikâyelerle birlikte mi anlamlı olduğunun değerlendirilmesini sağlar.

### Junior İş Analisti için dikkat edilmesi gerekenler

- Hikâyeyi kullanıcı, ihtiyaç ve fayda içerecek biçimde yaz.
- Ekran veya teknik çözüm yerine kullanıcının yapmak istediği işe odaklan.
- Haritadaki ana faaliyet ile alt görevleri karıştırma.
- Mevcut sürümde olmayan bir özelliği “aktif” diye işaretleme.
- Sürüm dilimini gerçek bir onay veya takvim planı gibi göstermemeye dikkat et.

### En sık yapılan hatalar

- Her teknik görevi kullanıcı hikâyesi olarak yazmak
- Hikâyelerde kullanıcı faydasını belirtmemek
- Tek bir hikâyeye çok sayıda bağımsız davranış sığdırmak
- Haritayı sadece ekran menüsünün kopyası hâline getirmek
- Kapsam dışı veya erişime kapalı modülleri mevcut kullanıcı yolculuğuna eklemek

## Mülakat Soruları

1. Kullanıcı Hikâyesi Haritası nedir ve backlog listesinden farkı nedir?
2. Bu haritada kullanıcı faaliyetlerini nasıl belirlediniz?
3. İyi bir kullanıcı hikâyesinde hangi üç temel unsur bulunur?
4. Başvuru ve şirket takibini neden ayrı faaliyetler olarak ele aldınız?
5. Hikâyeleri mevcut sürüm dilimlerine ayırmak ne işe yarar?
6. Bir kullanıcı hikâyesinin çok büyük olduğunu nasıl anlarsınız?
7. Teknik görevler kullanıcı hikâyesi haritasında nerede yer almalıdır?
8. Kullanıcıya kapalı bir modülü bu haritaya neden eklemediniz?
9. Bu harita kabul kriterleri yazımına nasıl katkı sağlar?
10. Yeni bir bildirim özelliği gelirse hangi hikâyelerin etkilenebileceğini nasıl belirlersiniz?

---

## Kalite Kontrolü

- [x] Hikâyeler aktif kullanıcı akışları ve mevcut form/liste davranışlarıyla karşılaştırıldı.
- [x] AI Asistanı ve Şablonlar modülleri kapsam dışı bırakıldı.
- [x] Gerçek bildirim gönderimi ile tercih kaydı ayrıştırıldı.
- [x] Sürüm dilimleri onaylanmış plan gibi değil, mevcut kapsam özeti olarak ifade edildi.
- [x] Doğrulanamayan metrik, kullanıcı sayısı veya başarı iddiası kullanılmadı.
