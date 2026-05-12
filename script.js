// script.js
// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, {
  threshold: 0.1
});
reveals.forEach(el => observer.observe(el));

// Form submit — mailto fallback
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nom = document.getElementById('f-nom').value;
  const cog = document.getElementById('f-cog').value;
  const tel = document.getElementById('f-tel').value;
  const mail = document.getElementById('f-mail').value;
  const tipus = document.getElementById('f-tipus').value;
  const data = document.getElementById('f-data').value;
  const msg = document.getElementById('f-msg').value;

  const body = `Nom: ${nom} ${cog}\nTelèfon: ${tel}\nEmail: ${mail}\nTipus d'esdeveniment: ${tipus}\nData aproximada: ${data}\n\nMissatge:\n${msg}`;

  const mailtoLink = `mailto:lidia.papillon@pertots.com?subject=Consulta Sala Papillón – ${encodeURIComponent(nom)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;

  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
});