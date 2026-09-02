const forecasts = [
  ['TODAY', '☼', '68°', '55°', '92'], ['WED 03', '☼', '71°', '57°', '88'], ['THU 04', '◒', '69°', '56°', '76'], ['FRI 05', '☁', '66°', '54°', '64'], ['SAT 06', '☼', '73°', '58°', '91'], ['SUN 07', '☼', '75°', '61°', '94'], ['MON 08', '☁', '70°', '59°', '72']
];
const table = document.querySelector('#forecast-table');
const toast = document.querySelector('#toast');
let toastTimer;

function renderForecast(days = 7) {
  table.innerHTML = forecasts.slice(0, days === 14 ? 7 : days).map(([day, icon, high, low, score]) => `
    <div class="forecast-day"><small>${day}</small><strong>${day === 'TODAY' ? 'Sep 02' : day.slice(4) + ' Sep'}</strong><span class="forecast-symbol">${icon}</span><div class="forecast-temp">${high}<span>${low}</span></div><div class="forecast-score ${Number(score) < 80 ? 'medium' : ''}">● ${score} activity</div></div>`).join('');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

renderForecast();
document.querySelectorAll('.forecast-tabs button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.forecast-tabs button').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  renderForecast(Number(button.dataset.days));
  showToast(`${button.dataset.days}-day forecast loaded`);
}));

document.querySelector('#save-spot').addEventListener('click', event => {
  event.currentTarget.textContent = event.currentTarget.textContent === '☆' ? '★' : '☆';
  showToast(event.currentTarget.textContent === '★' ? 'Montauk Point saved' : 'Spot removed from saved');
});

document.querySelector('#add-spot').addEventListener('click', () => showToast('Spot search is ready for your next destination'));
document.querySelector('#add-card').addEventListener('click', () => showToast('Spot search is ready for your next destination'));
document.querySelectorAll('.open-spot').forEach(button => button.addEventListener('click', event => {
  const name = event.target.closest('.spot-card').querySelector('h3').textContent;
  document.querySelector('#spot-selector').firstChild.textContent = `${name} `;
  document.querySelector('#dashboard').scrollIntoView({ behavior: 'smooth' });
  showToast(`${name} conditions loaded`);
}));

document.querySelector('#spot-selector').addEventListener('click', () => showToast('Spot picker opened'));