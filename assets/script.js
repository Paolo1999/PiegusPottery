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

// Slider galerii zdjęć (dla jednego zdjęcia obsługa przycisków jest nieaktywna)
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slider .slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
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
});

// Lista zdjęć do galerii (dodaj tu wszystkie pliki z assets/galeria lub assets)
const galleryImages = [
  "assets/galeria/photo_2025-07-22_17-45-27.jpg",
  "assets/galeria/photo_2025-07-22_17-45-30.jpg",
  "assets/galeria/photo_2025-07-22_17-45-33.jpg",
  "assets/galeria/photo_2025-07-22_17-45-36.jpg",
  "assets/galeria/photo_2025-07-22_17-45-37.jpg",
  "assets/galeria/photo_2025-07-22_17-45-39.jpg",
  "assets/galeria/photo_2025-07-22_17-45-40.jpg",
  "assets/galeria/photo_2025-07-22_17-45-42.jpg"
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
