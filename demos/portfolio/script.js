// Theme toggle (remembers choice, falls back to system preference)
const root = document.documentElement;
function storedTheme() {
  try { return localStorage.getItem('theme'); } catch (_) { return null; }
}
const initial = storedTheme() || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
root.dataset.theme = initial;
document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (_) {}
});

// Mobile menu
const burger = document.querySelector('.burger');
const nav = document.getElementById('site-nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// Scroll reveal
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
    io.observe(el);
  });
} else {
  items.forEach(el => el.classList.add('in'));
}

// Contact form (demo: validates and shows a confirmation, nothing is sent)
const form = document.getElementById('contact-form');
const msg = form.querySelector('.form-msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    const ok = field.value.trim() !== '' && field.checkValidity();
    field.classList.toggle('error', !ok);
    if (!ok) valid = false;
  });
  msg.className = 'form-msg ' + (valid ? 'ok' : 'err');
  msg.textContent = valid
    ? `Thanks ${form.elements.name.value.split(' ')[0]}, I'll get back to you within 24 hours!`
    : 'Please fill in all fields with valid information.';
  if (valid) form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
