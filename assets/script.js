// Animacja nagłówka przy starcie strony
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (header) header.classList.add('slide-down');
});

// Animacja fade-in sekcji przy scrollu
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Pulsujący CTA (opcjonalnie)
const ctas = document.querySelectorAll('.cta');

ctas.forEach(cta => {
  cta.addEventListener('mouseenter', () => {
    cta.classList.add('pulse');
  });
  cta.addEventListener('mouseleave', () => {
    cta.classList.remove('pulse');
  });
});

// Slider na początku strony
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero-slider');
  if (!hero) return;

  const slides = hero.querySelectorAll('.hero-slide');
  const dotsContainer = hero.querySelector('.hero-dots');
  const AUTOPLAY_MS = 3000;
  let current = 0;
  let timer = null;

  const dots = Array.from(slides, (_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot';
    dot.setAttribute('aria-label', 'Slajd ' + (i + 1));
    dot.addEventListener('click', () => {
      showSlide(i);
      restart();
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function showSlide(idx) {
    current = (idx + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('active', active);
      slide.inert = !active;
    });
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  function start() {
    stop();
    timer = setInterval(() => showSlide(current + 1), AUTOPLAY_MS);
  }

  function stop() {
    clearInterval(timer);
  }

  function restart() {
    if (!hero.matches(':hover, :focus-within')) start();
  }

  hero.querySelector('.hero-arrow.prev').addEventListener('click', () => {
    showSlide(current - 1);
    restart();
  });
  hero.querySelector('.hero-arrow.next').addEventListener('click', () => {
    showSlide(current + 1);
    restart();
  });

  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
  hero.addEventListener('focusin', stop);
  hero.addEventListener('focusout', restart);

  hero.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showSlide(current - 1);
    if (e.key === 'ArrowRight') showSlide(current + 1);
  });

  let touchStartX = null;
  hero.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stop();
  }, { passive: true });
  hero.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) showSlide(dx < 0 ? current + 1 : current - 1);
    touchStartX = null;
    start();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else restart();
  });

  showSlide(0);
  start();
});

// Lista zdjęć do galerii (dodaj tu wszystkie pliki z assets/galeria lub assets)
const galleryImages = [
  "assets/galeria/slider-siedem.jpg",
  "assets/galeria/photo_2025-07-22_17-45-30.jpg",
  "assets/galeria/photo_2025-07-22_17-45-33.jpg",
  "assets/galeria/photo_2025-07-22_17-45-36.jpg",
  "assets/galeria/photo_2025-07-22_17-45-37.jpg",
  "assets/galeria/photo_2025-07-22_17-45-39.jpg",
  "assets/galeria/photo_2025-07-22_17-45-40.jpg",
  "assets/galeria/photo_2025-07-22_17-45-42.jpg",
  "assets/galeria/photo_2025-12-28_18-47-37.jpg",
  "assets/galeria/photo_2025-12-28_18-47-40.jpg",
  "assets/galeria/photo_2025-12-28_18-47-43.jpg",
  "assets/galeria/photo_2025-12-28_18-47-44.jpg",
  "assets/galeria/photo_2025-12-28_18-47-46.jpg",
  "assets/galeria/photo_2025-12-28_18-47-49.jpg",
];

document.addEventListener('DOMContentLoaded', () => {
  // Slider galerii zdjęć - dynamiczne dodawanie zdjęć
  const slider = document.getElementById('gallery-slider');
  if (slider) {
    galleryImages.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'slide' + (idx === 0 ? ' active' : '');
      img.alt = 'Galeria zdjęć ' + (idx + 1);
      slider.insertBefore(img, slider.querySelector('.slider-btn.prev'));
    });

    // Slider obsługa
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    let current = 0;

    function showSlide(idx) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
      });
    }

    if (slides.length) {
      showSlide(current);

      prevBtn.addEventListener('click', () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
      });

      nextBtn.addEventListener('click', () => {
        current = (current + 1) % slides.length;
        showSlide(current);
      });
    }
  }
});

// Hamburger menu obsługa
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger-btn');
  const nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
      });
    });
  }
});
