// Hamburguesa
const hamburger = document.getElementById('navHamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Cierra el menú al hacer clic en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Inicialitza EmailJS amb la teva Public Key
emailjs.init("6G_XcLBlJOl_sngk5");

// Form submit amb EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const templateParams = {
    nom:      document.getElementById('f-nom').value,
    cognoms:  document.getElementById('f-cog').value,
    telefon:  document.getElementById('f-tel').value,
    email:    document.getElementById('f-mail').value,
    tipus:    document.getElementById('f-tipus').value,
    data:     document.getElementById('f-data').value,
    missatge: document.getElementById('f-msg').value,
  };

  emailjs.send("service_hzucp5s", "template_4wrhfkg", templateParams)
    .then(() => {
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    })
    .catch((error) => {
      console.error('Error enviant el correu:', error);
      alert('Hi ha hagut un error en enviar el formulari. Torna-ho a intentar.');
    });
});

// ─── GALLERY ───
const galleryImages = {
  interior: [
    'assets/images/interior/interior.png',
    'assets/images/interior/int-boda.png',
    'assets/images/interior/int-cumple.png',
    'assets/images/interior/int-tardeo.png',
    'assets/images/interior/recibidor.png',
    'assets/images/interior/cocina.png',
    'assets/images/interior/lavabos.png',
    'assets/images/interior/puerta.png',
  ],
  exterior: [
    'assets/images/exterior/exterior.png',
    'assets/images/exterior/ext-boda.png',
    'assets/images/exterior/ext-cumple.png',
    'assets/images/exterior/ext-tardeo.png',
  ]
};

function openGallery(zone) {
  const imgs = galleryImages[zone];
  lightboxImages = imgs;
  lightboxIndex = 0;
  showLightbox();
}

// ─── DYNAMIC GALLERY (bottom strip) ───
const totalSlides = 17;
const visibleSlides = window.innerWidth <= 768 ? 1 : 3;
let currentSlide = 0;

function updateGalleryTrack() {
  const track = document.getElementById('galleryTrack');
  const counter = document.getElementById('galleryCounter');
  if (!track) return;
  const slideWidth = 100 / visibleSlides;
  track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
  counter.textContent = `${currentSlide + 1} / ${totalSlides - visibleSlides + 1}`;
}

function galleryNext() {
  const max = totalSlides - (window.innerWidth <= 768 ? 1 : 3);
  currentSlide = currentSlide >= max ? 0 : currentSlide + 1;
  updateGalleryTrack();
}

function galleryPrev() {
  const max = totalSlides - (window.innerWidth <= 768 ? 1 : 3);
  currentSlide = currentSlide <= 0 ? max : currentSlide - 1;
  updateGalleryTrack();
}

// ─── LIGHTBOX ───
let lightboxImages = [];
let lightboxIndex = 0;

// Also open lightbox when clicking slides in the bottom gallery
document.addEventListener('DOMContentLoaded', () => {
  const allImages = [
    'assets/images/interior/interior.png',
    'assets/images/interior/int-boda.png',
    'assets/images/interior/int-cumple.png',
    'assets/images/interior/int-tardeo.png',
    'assets/images/interior/recibidor.png',
    'assets/images/exterior/exterior.png',
    'assets/images/exterior/ext-boda.png',
    'assets/images/exterior/ext-cumple.png',
    'assets/images/exterior/ext-tardeo.png',
    'assets/images/barra/barra.png',
    'assets/images/barra/barra-cena1.png',
    'assets/images/barra/barra-cena2.png',
    'assets/images/barra/bar-cumple.png',
    'assets/images/barra/zona-barra.png',
    'assets/images/interior/cocina.png',
    'assets/images/interior/lavabos.png',
    'assets/images/interior/puerta.png',
  ];

  document.querySelectorAll('.dyn-gallery-slide').forEach((slide, i) => {
    slide.addEventListener('click', () => {
      lightboxImages = allImages;
      lightboxIndex = i;
      showLightbox();
    });
  });
});

function showLightbox() {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = lightboxImages[lightboxIndex];
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  document.getElementById('lightboxImg').src = lightboxImages[lightboxIndex];
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  document.getElementById('lightboxImg').src = lightboxImages[lightboxIndex];
}

document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('active')) return;
  if (e.key === 'ArrowRight') lightboxNext();
  if (e.key === 'ArrowLeft') lightboxPrev();
  if (e.key === 'Escape') closeLightbox();
});