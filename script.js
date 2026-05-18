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