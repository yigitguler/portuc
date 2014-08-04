Title: Mitmproxy ile kolayca hata yakalama
Date: 2014-06-09
Slug: mitmproxy
Category: Yazılım

API yazmak gerçekten çok keyifli bir iş. Özellikle aylar süren çalışmadan sonra uygulamanın ilk sürümünü yüklediğiniz telefonu elinize alıp
kurcalamanın keyfi bambaşka. Kafanızda soyut olarak kurduğunuz veri yapıları, endpointler, hepsi bir anda elinizde somut bir nesneye dönüşüyor...

Ancak...

*"Uygulama son güncellemeden sonra *bazen* mesaj göndermez oldu..."*

*"Kullanıcı resimleri gözükmüyor..."*

*"Kullanıcı ayarları ekranı değişiklikleri kayıt etmiyor..."*

gibi şikayetler kısa süre sonra kabus halini alıyor.
Çünkü lokalde yaratmak çok zor olduğu gibi, bazen sorunun API'dan mı yoksa istemci tarafından mı kaynaklandığı anlaşılamıyor.

Endpoint'i [Postman](http://www.getpostman.com/) ile test ettiğinizde her şey yolunda gözüküyor. Telefonu elinize alıp denediğinizde ise gerçekten çalışmıyor.

Haydi bakalım... Uygulamayı simülatörde açıp kendi lokal sunucunuza yönlendirip istekleri gözetleme olanağınız olsa da hem zahmetli,
hem de -gerçek kullanıcı verisi ile çalışmadığınızdan- bazı durumlarda çalışmıyor.

"Keşke iPhone ile sunucu arasında gidip gelen istekleri gözleyebilseydik" dediğim bitçok an olmuştu.
Sonunda bir gün [mitmproxy](http://mitmproxy.org/) ile kabus günlerim geride kaldı.

Mitmproxy ne yapıyor?

Mitmproxy *debugging proxy* adı verilen programlar ailesinin başarılı bir üyesi.
Çalışma mantığı kısaca şöyle **(Telefon ve bilgisayar aynı ağda olmak zorunda)**:

 - Bilgisayarımıza mitmproxy kuruyor ve çalıştırıyoruz::

    pip install mitmproxy
    mitmproxy


 - Telefonumuza proxy adresi olarak bilgisayarınızın ip adresini veriyoruz.

<img src="{filename}/images/mitmproxy/1.PNG" alt="Mitmproxy" style="height: 400px;"/>

 - Telefonumuzdan **mitm.it** adresine girerek güvenlik sertifikasını yüklüyoruz.

 <img src="{filename}/images/mitmproxy/2.PNG" alt="Mitmproxy" style="height: 400px;"/>

 - Telefonumuzun yaptığı tüm http request'lerini ve aldığı cevapları bilgisayarınızdan gözetleyebiliyoruz. İstek hakkında detaylı bilgiye ENTER ve TAB tuşlarıyla ulaşabiliyoruz.

 <img src="{filename}/images/mitmproxy/3.PNG" alt="Mitmproxy" style="width: 760px;"/>

Hepsi bu kadar!

Bundan sonra uygulama ne istiyor, sunucu ne yolluyor, hepsi elimizin altında.
