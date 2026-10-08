// Mobile menu
const burger = document.querySelector('.burger');
const nav = document.getElementById('main-nav');
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

// Live price estimator
const service = document.getElementById('q-service');
const beds = document.getElementById('q-beds');
const baths = document.getElementById('q-baths');
const fridge = document.getElementById('q-fridge');
const total = document.getElementById('q-total');

function updateEstimate() {
  const base = 60;
  const bedCost = Number(beds.value) * 18;
  const bathCost = (Number(baths.value) - 1) * 15;
  const extra = fridge.checked ? 30 : 0;
  const price = (base + bedCost + bathCost) * Number(service.value) + extra;
  total.textContent = '$' + Math.round(price);
}
[service, beds, baths, fridge].forEach(el => el.addEventListener('change', updateEstimate));
updateEstimate();

// Quote form (demo: validates and shows a confirmation, nothing is sent)
const form = document.getElementById('quote');
const msg = form.querySelector('.form-msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const email = form.elements.email;
  const ok = email.value.trim() !== '' && email.checkValidity();
  email.classList.toggle('error', !ok);
  msg.className = 'form-msg ' + (ok ? 'ok' : 'err');
  msg.textContent = ok
    ? `Thanks! We sent your ${total.textContent} estimate to ${email.value}.`
    : 'Please enter a valid email address.';
  if (ok) email.value = '';
});

document.getElementById('year').textContent = new Date().getFullYear();
