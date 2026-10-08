// Mobile menu
const burger = document.querySelector('.burger');
const nav = document.getElementById('menu-nav');
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

// Menu tabs
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');
tabs.forEach(tab =>
  tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.dataset.target).classList.add('active');
  })
);

// Booking form (demo: validates and shows a confirmation, nothing is sent)
const form = document.getElementById('booking-form');
const msg = form.querySelector('.form-msg');
const dateInput = form.elements.date;
dateInput.min = new Date().toISOString().split('T')[0];

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
    ? `Thank you, ${form.elements.name.value.split(' ')[0]}! We will confirm your booking by email shortly.`
    : 'Please fill in all required fields.';
  if (valid) form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
