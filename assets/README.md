# assets/

Bu proje şu an görselleri doğrudan Unsplash bağlantıları üzerinden kullanıyor (bkz. `index.html` içindeki `<img src="https://images.unsplash.com/...">` etiketleri), bu yüzden bu klasör boş.

Kendi fotoğraflarınızı kullanmak isterseniz:

1. Görsellerinizi bu klasöre (örn. `assets/images/`) kopyalayın.
2. `index.html` içindeki ilgili Unsplash URL'lerini yerel dosya yoluyla değiştirin, örneğin:
   ```html
   <img src="assets/images/dis-mekan-guverte.jpg" alt="Yat güvertesi">
   ```
3. Hero arka plan görseli için `.hero-bg img` etiketini, logo için ihtiyaç duyarsanız `assets/logo.png` gibi bir dosya ekleyip `<img>` ya da CSS `background-image` ile bağlayabilirsiniz.

Önerilen alt klasörler:
- `assets/images/exterior/` — Dış mekan görselleri (güverte, flybridge, güneşlenme alanı)
- `assets/images/interior/` — İç mekan görselleri (VIP kamara, salon, mutfak, banyo)
- `assets/icons/` — Özel ikon/logo dosyaları (favicon dahil)
