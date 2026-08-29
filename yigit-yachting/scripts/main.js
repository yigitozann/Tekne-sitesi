/* =========================================================
   Yiğit Ozan Yılmazer Yachting — main.js
   Modüler, bağımlılıksız (vanilla) JavaScript
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     Ayarlar — WhatsApp numarasını buradan yönetin
     Numarayı ülke kodu ile birlikte, boşluksuz girin.
     Örnek: "905XXXXXXXXX"
  --------------------------------------------------------- */
  const CONFIG = {
    whatsappNumber: '905XXXXXXXXX', // <-- Kendi telefon numaranızla değiştirin
    defaultMessage: 'Merhaba, tekne kiralama hakkında bilgi almak istiyorum.'
  };

  /* =========================================================
     Modül: Header — scroll durumuna göre stil değişimi
  ========================================================= */
  const HeaderModule = (() => {
    const header = document.getElementById('siteHeader');
    if (!header) return { init() {} };

    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };

    return {
      init() {
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
      }
    };
  })();

  /* =========================================================
     Modül: Mobil Menü (Hamburger)
  ========================================================= */
  const MobileNavModule = (() => {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('mainNav');
    if (!hamburger || !nav) return { init() {} };

    const closeMenu = () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    const toggleMenu = () => {
      const isOpen = nav.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    return {
      init() {
        hamburger.addEventListener('click', toggleMenu);
        nav.querySelectorAll('.nav-link, .btn-nav-cta').forEach((link) => {
          link.addEventListener('click', closeMenu);
        });
      }
    };
  })();

  /* =========================================================
     Modül: Yumuşak Kaydırma (Smooth Scroll)
  ========================================================= */
  const SmoothScrollModule = (() => {
    const HEADER_OFFSET = 84;

    const scrollToTarget = (targetId) => {
      const target = document.querySelector(targetId);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    return {
      init() {
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
          link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            scrollToTarget(href);
          });
        });
      }
    };
  })();

  /* =========================================================
     Modül: Galeri Filtreleme
  ========================================================= */
  const GalleryModule = (() => {
    const tabs = document.querySelectorAll('.gallery-tab');
    const items = document.querySelectorAll('.gallery-item');
    if (!tabs.length || !items.length) return { init() {} };

    const applyFilter = (filter) => {
      items.forEach((item) => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !match);
      });
    };

    return {
      init() {
        tabs.forEach((tab) => {
          tab.addEventListener('click', () => {
            tabs.forEach((t) => {
              t.classList.remove('active');
              t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            applyFilter(tab.dataset.filter);
          });
        });
      }
    };
  })();

  /* =========================================================
     Modül: WhatsApp Yönlendirme
  ========================================================= */
  const WhatsAppModule = (() => {
    const buildLink = (message) => {
      const text = encodeURIComponent(message || CONFIG.defaultMessage);
      return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
    };

    return {
      init() {
        const whatsappBtn = document.getElementById('whatsappBtn');
        if (whatsappBtn) {
          whatsappBtn.setAttribute('href', buildLink());
        }
      },
      buildLink
    };
  })();

  /* =========================================================
     Modül: Hızlı İletişim Formu — WhatsApp'a yönlendirme
  ========================================================= */
  const ContactFormModule = (() => {
    const form = document.getElementById('contactForm');
    if (!form) return { init() {} };

    const handleSubmit = (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const date = form.date.value;
      const message = form.message.value.trim();

      if (!name || !phone) {
        form.reportValidity();
        return;
      }

      const lines = [
        `Merhaba, tekne kiralama talebim hakkında bilgi almak istiyorum.`,
        `Ad Soyad: ${name}`,
        `Telefon: ${phone}`
      ];
      if (date) lines.push(`Tarih: ${date}`);
      if (message) lines.push(`Mesaj: ${message}`);

      const link = WhatsAppModule.buildLink(lines.join('\n'));
      window.open(link, '_blank', 'noopener');
    };

    return {
      init() {
        form.addEventListener('submit', handleSubmit);
      }
    };
  })();

  /* =========================================================
     Modül: Yukarı Çık Butonu
  ========================================================= */
  const BackToTopModule = (() => {
    const btn = document.getElementById('backToTop');
    if (!btn) return { init() {} };

    const onScroll = () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    };

    return {
      init() {
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        btn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    };
  })();

  /* =========================================================
     Modül: Scroll Reveal Animasyonları
  ========================================================= */
  const RevealModule = (() => {
    const selectors = [
      '.gallery-item',
      '.price-card',
      '.feature-card',
      '.section-header',
      '.contact-panel'
    ];

    return {
      init() {
        const elements = document.querySelectorAll(selectors.join(','));
        if (!elements.length) return;

        elements.forEach((el) => el.classList.add('reveal'));

        if (!('IntersectionObserver' in window)) {
          elements.forEach((el) => el.classList.add('in-view'));
          return;
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
      }
    };
  })();

  /* =========================================================
     Başlat
  ========================================================= */
  document.addEventListener('DOMContentLoaded', () => {
    HeaderModule.init();
    MobileNavModule.init();
    SmoothScrollModule.init();
    GalleryModule.init();
    WhatsAppModule.init();
    ContactFormModule.init();
    BackToTopModule.init();
    RevealModule.init();
  });
})();
