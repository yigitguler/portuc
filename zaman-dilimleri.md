Title: Zaman Dilimleri
Date: 2014-09-24
Slug: zaman-dilimleri
Category: Yazılım

Zaman dilimleri her yazılımcının hayatında zaman zaman karşısına çıkar ve zaman zaman sinir eder.

Zaman ile upraşmak başlı başına zor bir konu. Tek bir ülkede çalışacak bir API yapıldığı zaman işlemleri görece kolay olsa da,
birçok ülkede veya ABD gibi birden çok zaman dilimini barındıran ülkelerde çalışacak bir program yapıldığında işler zorlaşıyor.

Özellikle sunucu tarafından yapılan işlemlerde (toplantı tarihinden 15 dakika önce mail atmak gibi) zaman dilimleri büyük önem kazanıyor.

Zaman Dilimleri
===============

Bildiğimiz gibi Türkiye GMT +2 zaman diliminde.

3 Temel Kavram: GMT, UTC, DST
=============================

Konuya başlamadan önce bu üç kavramı iyice anlamamız gerekiyor. En kolayından, en zoruna doğru sırayla üzerlerinden geçelim:

DST (Daylight Saving Time):
+++++++++++++++++++++++++++

DST'ye Türkçe'de yaz saati diyoruz. Gün ışığından daha fazla faydalanabilmek için saatlerin bir saat ileri alınmasına deniyor.
İşe yarayıp yaramadığı tartışmalı olsa da, birçok ülke bu uygulamayı yürütüyor.

GMT (Greenwich Mean Time):
++++++++++++++++++++++++++

Greenwich'den geçen meridyene göre ayarlanmış saat. Yani güneş göz önüne alınarak yapılmış saat.

UTC (İnternet Saati)
++++++++++++++++++++
Güneşe göre değil, Atomik saate göre hazırlanmış internet saati. Güneş saatiyle çok küçük farklılıklar olabilir.

Unutmamamız gereken önemli gerçek: Zaman dilimleri ve ülkelerin saat uygulamaları fiziksel / coğrafi bir konu değil, politik bir konu.
Ülkeler kendi saat dilimlerini ve yaz saati uygulamasına katılıp katılmayacaklarını kendileri seçiyorlar.
Politik bir konu olduğu için de matematiksel olarak çözülmesi mümkün değil.

İpucu 1:
Asla zaman dilimini GMT veya UTC ye göreceli olarak tutmamalıyız.
Yani bir kullanıcının hangi zaman diliminde olduğunu tutmak için GMT+2 veya UTC+2 diye tutmamalıyız.
Çünkü bu kullanıcının yaşadığı ülke Yaz saati uygulamasından fayadalanıyorsa, ve yaz döneminde, UTC +3 e geçecektir.
Yanlış: GMT+2
Yanlış: UTC+2
Doğru: Eastern European Time / Turkey

Eğer GMT+2 olarak tutar isek, yaz geldiğinde ortada kalırız. Çünkü kullanıcı Türkiyede yaşıyorsa, yazın GMT+3 e geçecektir.
Halbuki Güney Afrika Cumhuriyeti de Kışları GMT +2 de olmasına rağmen yazları da GMT +2 de kalıyor.
Yani timezone bilgisini matematiksel olarak değil de politik ismiyle tutmak daha doğru.

Gelelim işin python kısmına.

Python zaman dilimleri problemlerini eksiksiz olarak çözüyor.
Bazı fonksiyonların kullanımı ve dökümantasyonu karmaşık olsa da işinizi ek bir pakte ihtiyaç duymadan bir şekilde çözebiliyorsunuz.
Django'nun da oldukça iyi bir zaman dilimi desteği var. Birçok güzel fonksion yardımınıza koşuyor.
Ancak yine de dikkat etmemiz gereken bazı şeyler var.

1 - USE_TZ = True
Settings'de zaten default olarak True gelen bu değişkenin kesinlikle true olduğundan emin oluyoruz

2 - API'de UTC kullanmak şart.
API'da tüm zamanları UTC olarak almak ve vermek önemli. Bizim hipo'da kullandığımız zaman formatı şu:
'%Y-%m-%dT%H:%M:%S%z'
2014-09-19T20:16:07+0200

Django Rest Framework'ün varsayılan zaman göstergesini bununla değiştiriyoruz.

3 - Postgres'in tribal yapısı
Postgres tüm zamanları UTC olarak saklıyor.
Yani Django istediği kadar zaman dilimleriyle boğuşsun, postgres veriyi UTC ye çevirip sakladığı için,
okurken zaman bilgisinden arındırılmış olarak geliyor.

Örnek:
start_date = "2014-09-19T20:16:07+0200"
Gördüğünüz gibi saat 4'ü yedi geçiyor. (GMT+2 ye göre)

Postgres bu zamanı GMT ye çeviriyor ve kaydediyor. Nesneye tekrar ulaştığınızda aşağıdaki gibi gözüküyor.

start_date = "2014-09-19T20:14:07+0000"

Şaşırmayınız. Dolayısıyla eğer email atmak gibi bir iş yapıyorsanız kullanıcının zaman dilimini tutmak önemli.


4 - Mimari önemli.
Zaman dilimini nerede tutacaksınız, neye ve kime göre hangi noktada çevireceğinizi daha tek satır kod yazmadan belirlemek çok önemli.
Bazı hatalardan geri dönmek çok zaman kaybettirebiliyor.
API yukarıdaki formatta veri alıp verdiği sürece zamanlar uygulamalarda gayet güzel gösteriliyorlar.

Ancak bir web tarafı da varsa, zaman dilimi bindirilmesi gerekiyor.


5 - Faydalı kütüphaneler

[Arrow](http://crsmithdev.com/arrow/)
[Django Timezone Field](https://github.com/mfogel/django-timezone-field)
