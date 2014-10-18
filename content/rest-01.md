

Günümüzde API geliştirmede tamamen kabul edilmiş bir standart olmasına rağmen çevremde birçok geliştiricinin halen REST konseptini tam olarak kavrayamadıklarnı fark ediyorum. Bu durum özellikle sunucu tarafında çalışan geliştirici ile önyüz tarafında çalışan geliştiriciler arasında gereksiz tartışmalara yol açıyor. 2014'ün sonuna yakşaltığımız şu günlerde eğer eli yüzü düzgün bir API yazılacaksa, bunun REST usülünde yazılması gerektiği zaten su götürmez bir gerçek. Bu yazıda herkes için bu formatı kolayca anlatmaya çalışacağım

Öncelikle önemle belirtmek istiyorum ki, REST bir standart değil, bir usüldür. Yani illa kullanmak zorunda değilsiniz. Ya da REST kılavuzlarında anlatılan her şeyi kelimesi kelimesine yapmak zorunda değilsiniz. Tıpkı Python PEP-8 gibi bu usülü de kendi  ihtiyaçlarınız / zevkiniz doğrultusunda esnetebilirsiniz. Tabii ki API içerisinde tutarlı olmak kaydıyla.

1 - Suret (Representation) mantığı

Farkındaysanız Türkçe karşılık kullacağım diye bi tarafımı parçalıyorum. Ama bence "suret" kelimesi anlatmak istediğimi çok iyi anlatıyor. Suret ne demek? Bazı kaynaklara göre "varlığın görünen yanı, beş duyu ile algılanan yönü" anlamını içeriyor. "İnsan suretinde şeytan" betimlemesindeki anlamı tam da bu.
Evet lafı uzattık ama tam anlamıyla bu. Bildiğimiz üzere API aslında bir bilgi deposu ve beş duyumuzla bu bilgiyi hissedemeyiz. Bu bilginin insan tarafından anlaşılabilir hale getirilmesi işlemine yabancılar representation, biz ise suret diyoruz.

API'ımızın düzgün bir suret sistemi olmalı.

Yani API'mizin içindeki bilgi, kolayca parse edilebilecek şekilde kullanıcıya verilmeli. İster JSON ister XML kullanılsın, fark etmez, doğru şekilde okunabilen bir formatta veri verilmeli.
Örnek JSON çıktısı

Örnek XML çıktısı

Birçok framework (DRF, Tastypie, etc..) birden fazla suret desteğine sahiptir. Bu sayede modern frameworkleri kullandığınız takdirde suretleme sizin için hiçbir sorun teşkil etmeyecektir. Bir API birden fazla çıktı tipi de destekleyebilir. Örnek olarak ?output=xml parametresi geçildiğinde XML çıktısı verilecek şekilde tasarlanılabilir. Hoş, JSON gibi güzel bir sistem varken bir insan neden XML çıktı verir? Bu kişi sadist midir yoksa mazoşist midir? gibi soruları ayrı bir yazıya bırakıyorum. Nacizane tavsiyem Allah rızası için JSON çıktı verin, herkesin kafası rahat olsun.

Mesaj alıp verme
================

Evet en çok tartışma yaşanan konuya geldik.

Aşağıda örnek bir HTTP isteğinin şemasını görebilirsiniz. Bu şemaya göre bir HTML isteği şu öğelere sahip
 - Eylem (VERB): GET, POST, PUT, PATCH, DELETE, OPTS gibi bir takım komutlardan bir tanesi. Bu saydıklarıma ek olarak siz kendi kendinize de VERB uydurablirsiniz. Örneğin bir poker aplikasyonu yapıyorsanız BET ve RAISE gibi eylemler üretebilirsiniz. Ancak unutmamak gerekir ki ne kadar standart dışına çıkar, kendi kafanızdan eylem uydurursanız, API'ınızın bakımı ve anlaşılması o kadar zor olacaktır. Temel aksiyonların çözdüğü durumlarda mutlaka onları kullanmalıyız.
 - Adres (URL): Kaynağın adresi.
 - Header: İsteğin tepesinde göndereceğimiz şeyler. Bunu bir dilekçe veya önyazı gibi düşünebiliriz. Kim olduğumuzu, ekte gönderdiğimiz isteğin ne türde kodlandığını vb... Burada anlatmalıyız.
 - Body: İstekte gerekli olan bilgileri burada gönderiyoruz. Örnek olarak bir kullanıcı yaratılacaksa kullanıcının adı-soyadı, yaşı, şifresi vb... burada gidiyor.


Mesaj Alma,

İstekler gibi, cevaplar da belli bir standartta geliyor.
 - Response Code: Cevabın Kodu (Uzat)
 - Header: Bu sefer sunucu istemciye dilekçe çakıyor. Diyor ki, ekte gönderdiğim veri şu formatta vb...
 - Body: Cevabın içindeki bilgi. Bazen HTML formatında olur, bazen JSON, bazen binary. Duruma göre.

 Şimdi burada internetteki diğer bloglardan farklılaşarak iki kelime laf etmek istiyorum.

 Eylem ve Response code meselesi REST'in en önemli konusudur arkadaşlar. Hem sunucu tarafında geliştirme yapanların, hem de istemci tarafında geliştirme yapanların bu konuyu iyice kavramaları önemli.

 1 - Her isteğin GET ile yapıldığı dönemler geçmişte kaldı. Örnek /users/14/?action=delete artık böyle bir istek yok.



-------------- Burada yazmaya ara verdim.

