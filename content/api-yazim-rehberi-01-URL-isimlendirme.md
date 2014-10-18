Slug: URL-isimlendirme

Merhabalar,

There are only two hard things in Computer Science: cache invalidation and naming things.

-- Phil Karlton

Çok doğru bir cümle. Gerçekten de herhangi bir kod yazarken en çok özeni fonksiyona / değişkene isim ararken gösteriyorum.
Mesela bir fonksiyona düzgün isim verilmişse çoğu zaman docstring yazmaya bile lüzum kalmıyor.

## Hiyerarşi önemli

Örnek olarak iki URL'ye bakalım.

http://www.nytimes.com/2014/10/09/technology/personaltech/oneplus-one-review-high-hopes-for-low-price-phone.html
http://www.hurriyet.com.tr/gundem/27358517.asp

Birinci örnek, yabancı bir haber sitesinden. Sadece URL'ye bakarak ne anlıyoruz?
1 - Bu bir haber. Blogpost vb. değil
2 - Teknolojiyle ilgili bir konu
3 - Kişisel teknololojiyle ilgili bir konu
4 - One Plus'ın düşük fiyat aralığında başarı ümidi olduğundan bahseden bir yazı.

İkinci örnek hürriyet.com'dan. Url'ye bakarak ne anlıyoruz?
1 - Gündemle ilgili bir makale olduğunu.
2 - Sitenin düz asp ile kodlandığını.

Başka bir bilgimiz yok. İşte iyi URL ile kötü URL arasındaki fark bu. Konu API yazmak olunca aradaki fark daha da önem kazanıyor.
Çünkü normal web sayfalarında sayfayı çağırıp ne olduğuna bakabiliyoruz.
Halbuki POST bekleyen bir API'ı çağırıp ne döndürdüğüne bakma şansımız yok. Halbuki hiyerarşiyi doğru şekilde verebilseydi, ya da en azından bir bilgi verme arzusu olsaydı daha iyi fikir sahibi olabilirdik.

Her bir taksim işareti (/) bir hiyerarşi belirtmeli.

Sözün özü:
İyi bir URL, kendi kendini ifade etmeli. Kullanıcı dokümantasyona ne kadar az bakıyorsa o kadar iyi.

## URL Okunur Olmalı
URL okunur olmalı. Dipdibeyazılmışyazılardan oluşmamalı. Gerekiyorsa kelime aralarında kısa tire kullanımından çekinilmemeli (alt tire (_) değil).
Büyük harf kullanılmaması gerektiğini söylemeye gerek yok herhalde.

## Sonunda format uzantısı olmasın
Çok şükür ki sonunda .json veya .xml uzantılı API URL'lerini git gide daha az görür olduk. Sebebi neydi bilmiyorum ama her şeyden önce kolpa bir yaklaşımdı. Çünkü ortada bir json dosyası olmadığını biliyorduk.
1 - Kolpadan bir durumdu. Ortada sabit bir json dosyası yok ama varmış gibi yapılıyor. Özellikle parametre gönderdiğinizde iş daha da saçmalaşıyor. Örnek:

http://sunucu.com/api/listings.json?limit=20&offset=4&show_only_premium_items=1

2 - Verinin ifade şeklinin ne olacağının belirtilmesi gereken yer URL değil. Bu iş için yapılmış [Accept](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html) header'i var. Oraya kullanıcı Json istiyorsa  Json geçer. XML istiyorsa XML geçer. Sunucunun desteği varsa, o formatta verir.
3 - Haydi diyelim ki Request Header'a bulaşılmak istenmiyor; ?format=json diye parametre geçmek bile daha mantıklı.

