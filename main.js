// ─── PHOTO DATA ──────────────────────────────────────────────────────────────
const PHOTOS = [
  // Pool
  'photos/405948347.jpg',
  'photos/405948357.jpg',
  'photos/398317813.jpg',
  'photos/398317816.jpg',
  'photos/398317826.jpg',
  // Fitness
  'photos/398317849.jpg',
  'photos/405948360.jpg',
  'photos/398317839.jpg',
  'photos/398317848.jpg',
  // Spa & relaxation
  'photos/398317838.jpg',
  'photos/398317829.jpg',
  'photos/398317857.jpg',
  'photos/398317858.jpg',
  // Apartment interiors
  'photos/00766406-822d-4e20-a133-222af49cc3c7.avif',
  'photos/0fbb1958-9f34-4707-a727-d347a5c76b65.avif',
  'photos/1545e924-4c42-4928-a065-f825770b7fae.avif',
  'photos/2d333ca3-f2ea-488f-9586-9f5479396dfc.avif',
  'photos/5dad69d9-a89e-46be-ad50-143511b55c95.avif',
  'photos/5dc5f17a-ceb4-4367-9c2a-cb2fad30f588.avif',
  'photos/636e06fb-c2d6-4096-9778-a085c93ae9e0.avif',
  'photos/6d5efffb-c0ca-431e-adfb-1129b2b96f8c.avif',
  'photos/80141e05-7a7d-43eb-b1f2-b5edbedcf438.avif',
  'photos/87570276-90c0-43fd-8879-9bfa361cf3a2.avif',
  'photos/8c2336e2-4970-439f-949d-63ee645f5c9f.avif',
  'photos/8e79966c-5594-4d31-b084-762bd4c7e997.avif',
  'photos/a38a999d-639b-4759-9c83-3d17b485fa19.avif',
  'photos/a757883b-5493-4c6f-a4b6-4fbc25678d32.avif',
  'photos/aa25e6c3-ee8d-41bf-98d1-d7abedee125e.avif',
  'photos/ab63dcd0-d4c2-40a4-b178-51f2103160e2.avif',
  'photos/ac6535af-58b3-4b28-92d8-f8b07d72775d.avif',
  'photos/aef194ad-bcc7-4f3a-a235-9aa1026f83ee.avif',
  'photos/b8abd7c0-e247-4878-b593-8dd89c6a2ea2.webp',
  'photos/cf2f6edc-3836-456d-84c6-5b9d679cffb7.avif',
  'photos/cfcc53e9-7b25-41be-b340-0e5a2769c1d0.avif',
  'photos/d43316e3-8939-48af-bf3d-95b0e416e912.avif',
  'photos/d46ab383-be90-49c6-985a-f7af47f06923.avif',
  'photos/ddcf5019-f196-4ebd-b234-534494963283.avif',
  'photos/e614cccd-fd2e-480d-bac7-e26229f4b5cb.avif',
  'photos/ead8a423-669a-41e5-9002-208b96a1f304.avif',
  'photos/ebff1d62-ab46-4e25-b961-ad95607b5b86.avif',
  'photos/f6fe06b2-6234-4a94-bf56-b1dcdd593581.avif',
  'photos/IMG_9208.jpg',
  'photos/IMG_9209.jpg',
  'photos/IMG_9210.jpg',
  'photos/IMG_9211.jpg',
  'photos/IMG_9212.jpg',
  'photos/IMG_9213.jpg',
  'photos/IMG_9214.jpg',
  'photos/IMG_9215.jpg',
  'photos/IMG_9216.jpg',
  'photos/IMG_9217.jpg',
  'photos/IMG_9218.jpg',
  'photos/IMG_9219.jpg',
  'photos/IMG_9220.jpg',
];
const HERO_PHOTOS = [
  'photos/405948347.jpg',
  'photos/398317838.jpg',
  'photos/398317857.jpg',
  'photos/398317816.jpg',
  'photos/IMG_9208.jpg',
  'photos/IMG_9212.jpg',
];

const GALLERY_PREVIEW = 9;
let showingAll = false;

function renderGallery(all) {
  const grid = document.getElementById('galleryGrid');
  const photos = all ? PHOTOS : PHOTOS.slice(0, GALLERY_PREVIEW);
  grid.innerHTML = photos.map((url, i) =>
    `<div class="gallery-item"><img class="gallery-img reveal" src="${url}" alt="Apartment photo ${i + 1}" loading="lazy" data-lightbox-index="${i}"></div>`
  ).join('');
  document.getElementById('showMoreBtn').textContent = all ? 'Show Less' : `View All ${PHOTOS.length} Photos`;
  showingAll = all;
  if (window.__revealObserver) {
    grid.querySelectorAll('.reveal:not(.visible)').forEach(el => window.__revealObserver.observe(el));
  }
}
function showAllPhotos() { renderGallery(!showingAll); }

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
let lbIndex = 0;
function openLightbox(i) {
  lbIndex = i;
  document.getElementById('lbImg').src = PHOTOS[i];
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function lbNav(dir) {
  lbIndex = (lbIndex + dir + PHOTOS.length) % PHOTOS.length;
  document.getElementById('lbImg').src = PHOTOS[lbIndex];
}
document.getElementById('lightbox').addEventListener('click', function (e) {
  if (e.target === this) closeLightbox();
});
document.addEventListener('keydown', function (e) {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});

// ─── HERO SLIDESHOW ──────────────────────────────────────────────────────────
function initHeroSlideshow() {
  const container = document.getElementById('heroSlides');
  if (!container) return;
  const slides = HERO_PHOTOS.map(function (src, i) {
    const div = document.createElement('div');
    div.className = 'hero-slide' + (i === 0 ? ' active' : '');
    div.style.backgroundImage = 'url(' + src + ')';
    container.appendChild(div);
    return div;
  });
  let current = 0;
  setInterval(function () {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 6000);
}

// ─── HERO TOGGLE ─────────────────────────────────────────────────────────────
var _heroFull = true;
var MINIMIZE_ICON = '<polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="10" y1="14" x2="21" y2="3"></line><line x1="3" y1="21" x2="14" y2="10"></line>';
var MAXIMIZE_ICON = '<polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line>';
function toggleHeroBleed() {
  _heroFull = !_heroFull;
  document.getElementById('hero').classList.toggle('hero-fit', !_heroFull);
  document.getElementById('heroToggleIcon').innerHTML = _heroFull ? MINIMIZE_ICON : MAXIMIZE_ICON;
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
const RATES = {
  peak: 650,    // May 1 – September 30
  default: 480, // everything else
};
const CLEANING_FEE = 100;
const MIN_NIGHTS = 3;
const BOOKING_CUTOFF = new Date(2026, 11, 31); // Dec 31 2026

function getRateForDate(date) {
  const m = date.getMonth();
  if (m >= 4 && m <= 8) return RATES.peak;
  return RATES.default;
}

function calcTotal(checkIn, checkOut) {
  let total = 0;
  const nights = Math.round((checkOut - checkIn) / 86400000);
  const cur = new Date(checkIn);
  for (let i = 0; i < nights; i++) {
    total += getRateForDate(cur);
    cur.setDate(cur.getDate() + 1);
  }
  return { nights, nightly: total, total: total + CLEANING_FEE };
}

// ─── CALENDAR ────────────────────────────────────────────────────────────────
let calYear, calMonth;
let checkInDate = null, checkOutDate = null;
let blockedDates = new Set();
let calSelectStep = 'checkin';

function toYMD(d) {
  return d.toISOString().split('T')[0];
}
function fromYMD(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}
function today() {
  const t = new Date(); t.setHours(0, 0, 0, 0); return t;
}

function initCalendar() {
  const t = today();
  calYear = t.getFullYear();
  calMonth = t.getMonth();
  loadBlockedDates();
  renderCalendar();
}
function prevMonth() {
  calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
}
function nextMonth() {
  calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
}

function renderCalendar() {
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  document.getElementById('calMonthName').textContent = `${names[calMonth]} ${calYear}`;
  const grid = document.getElementById('calGrid');
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  let html = dayNames.map(n => `<div class="cal-day-name">${n}</div>`).join('');

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const t = today();

  for (let i = 0; i < firstDay; i++) html += `<div class="cal-day empty"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(calYear, calMonth, d);
    const ymd = toYMD(date);
    const isPast = date < t || date > BOOKING_CUTOFF;
    const isBlocked = blockedDates.has(ymd);
    const isToday = toYMD(date) === toYMD(t);
    const isCheckIn = checkInDate && toYMD(checkInDate) === ymd;
    const isCheckOut = checkOutDate && toYMD(checkOutDate) === ymd;
    const inRange = checkInDate && checkOutDate && date > checkInDate && date < checkOutDate;

    let cls = 'cal-day';
    if (isPast) cls += ' past';
    else if (isBlocked) cls += ' blocked';
    else {
      if (isCheckIn && checkOutDate) cls += ' check-in';
      else if (isCheckOut) cls += ' check-out';
      else if (isCheckIn) cls += ' selected';
      else if (inRange) cls += ' in-range';
      if (isToday && !isCheckIn && !isCheckOut && !inRange) cls += ' today';
    }

    const clickable = !isPast && !isBlocked;
    html += `<div class="${cls}" ${clickable ? `data-date="${ymd}"` : ''}>${d}</div>`;
  }
  grid.innerHTML = html;
}

function selectDay(ymd) {
  const date = fromYMD(ymd);
  if (calSelectStep === 'checkin') {
    checkInDate = date;
    checkOutDate = null;
    calSelectStep = 'checkout';
    document.getElementById('calStatus').textContent = 'Now select your check-out date';
    document.getElementById('inputCheckIn').value = toYMD(date);
    document.getElementById('inputCheckOut').value = '';
    document.getElementById('inputNights').value = '';
    document.getElementById('priceSummary').style.display = 'none';
  } else {
    if (date <= checkInDate) {
      checkInDate = date; checkOutDate = null; calSelectStep = 'checkout';
      document.getElementById('inputCheckIn').value = toYMD(date);
      document.getElementById('inputCheckOut').value = '';
      document.getElementById('calStatus').textContent = 'Now select your check-out date';
      renderCalendar(); return;
    }
    const cur = new Date(checkInDate); cur.setDate(cur.getDate() + 1);
    while (cur < date) {
      if (blockedDates.has(toYMD(cur))) {
        document.getElementById('calStatus').className = 'cal-status cal-error';
        document.getElementById('calStatus').textContent = 'Dates include unavailable nights — please choose a different range.';
        renderCalendar(); return;
      }
      cur.setDate(cur.getDate() + 1);
    }
    const nights = Math.round((date - checkInDate) / 86400000);
    if (nights < MIN_NIGHTS) {
      document.getElementById('calStatus').className = 'cal-status cal-error';
      document.getElementById('calStatus').textContent = `Minimum stay is ${MIN_NIGHTS} nights.`;
      renderCalendar(); return;
    }
    checkOutDate = date;
    calSelectStep = 'checkin';
    document.getElementById('calStatus').className = 'cal-status';
    document.getElementById('inputCheckOut').value = toYMD(date);
    updatePriceDisplay();
  }
  renderCalendar();
}

function updatePriceDisplay() {
  if (!checkInDate || !checkOutDate) return;
  const { nights, nightly, total } = calcTotal(checkInDate, checkOutDate);
  document.getElementById('inputNights').value = nights;
  document.getElementById('priceNightsLabel').textContent = `Accommodation (${nights} nights)`;
  document.getElementById('priceNightsTotal').textContent = `CHF ${nightly}`;
  document.getElementById('priceTotal').textContent = `CHF ${total}`;
  document.getElementById('priceSummary').style.display = 'block';
  document.getElementById('calStatus').textContent = `${nights} nights selected · CHF ${total} total`;
}

function formatDate(d) {
  return d.toLocaleDateString('en-CH', { day: '2-digit', month: 'short', year: 'numeric' });
}

document.getElementById('inputCheckIn').addEventListener('change', function () {
  const val = this.value;
  if (!val) { checkInDate = null; checkOutDate = null; renderCalendar(); return; }
  const [y, m, d] = val.split('-').map(Number);
  const parsed = new Date(y, m - 1, d);
  if (parsed > BOOKING_CUTOFF) { this.value = ''; return; }
  checkInDate = parsed;
  checkOutDate = null;
  calSelectStep = 'checkout';
  document.getElementById('inputCheckOut').value = '';
  document.getElementById('inputNights').value = '';
  document.getElementById('priceSummary').style.display = 'none';
  calYear = y; calMonth = m - 1;
  renderCalendar();
});

document.getElementById('inputCheckOut').addEventListener('change', function () {
  const val = this.value;
  if (!val || !checkInDate) { checkOutDate = null; renderCalendar(); return; }
  const [y, m, d] = val.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const nights = Math.round((date - checkInDate) / 86400000);
  if (date <= checkInDate || nights < MIN_NIGHTS) {
    this.value = '';
    document.getElementById('calStatus').className = 'cal-status cal-error';
    document.getElementById('calStatus').textContent = `Minimum stay is ${MIN_NIGHTS} nights.`;
    checkOutDate = null;
    renderCalendar();
    return;
  }
  checkOutDate = date;
  calSelectStep = 'checkin';
  document.getElementById('calStatus').className = 'cal-status';
  document.getElementById('calStatus').textContent = '';
  updatePriceDisplay();
  renderCalendar();
});

// ─── CONTACT FORM ────────────────────────────────────────────────────────────
async function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const btn = form.querySelector('.btn-submit');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  const data = Object.fromEntries(new FormData(form));
  try {
    const resp = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await resp.json();
    if (result.success) {
      form.style.display = 'none';
      document.getElementById('contactSuccess').style.display = 'block';
    } else {
      throw new Error(result.message);
    }
  } catch (err) {
    btn.disabled = false;
    btn.textContent = 'Send Message';
    alert('Something went wrong. Please email us directly at info@lenationalmontreux.ch');
  }
}

async function loadBlockedDates() {
  try {
    const resp = await fetch('/get-calendar');
    if (!resp.ok) return;
    const data = await resp.json();
    blockedDates = new Set(data.blockedDates || []);
    renderCalendar();
  } catch (e) {
    // Calendar works without blocked dates
  }
}

function setupEventHandlers() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid) {
    galleryGrid.addEventListener('click', function (event) {
      const img = event.target.closest('[data-lightbox-index]');
      if (!img) return;
      openLightbox(Number(img.dataset.lightboxIndex));
    });
  }

  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox || event.target.closest('.lb-close')) closeLightbox();
      if (event.target.closest('.lb-prev')) lbNav(-1);
      if (event.target.closest('.lb-next')) lbNav(1);
    });
  }

  const showMoreBtn = document.getElementById('showMoreBtn');
  if (showMoreBtn) showMoreBtn.addEventListener('click', showAllPhotos);

  initHeroSlideshow();

  const heroToggleBtn = document.getElementById('heroToggleBtn');
  if (heroToggleBtn) heroToggleBtn.addEventListener('click', toggleHeroBleed);

  const navBook = document.querySelector('.nav-book');
  if (navBook) {
    navBook.addEventListener('click', function () {
      document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
    });
  }

  document.querySelectorAll('a[href="#booking"], a[href="#about"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const calGrid = document.getElementById('calGrid');
  if (calGrid) {
    calGrid.addEventListener('click', function (event) {
      const day = event.target.closest('[data-date]');
      if (!day) return;
      selectDay(day.dataset.date);
    });
  }

  const calButtons = document.querySelectorAll('.cal-header .cal-nav');
  if (calButtons[0]) calButtons[0].addEventListener('click', prevMonth);
  if (calButtons[1]) calButtons[1].addEventListener('click', nextMonth);

  const bookButton = document.getElementById('btnBook');
  if (bookButton) bookButton.addEventListener('click', handleBooking);

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);
}

// ─── BOOKING HANDLER ─────────────────────────────────────────────────────────
async function handleBooking() {
  const firstName = document.getElementById('inputFirstName').value.trim();
  const lastName = document.getElementById('inputLastName').value.trim();
  const email = document.getElementById('inputEmail').value.trim();

  if (!checkInDate || !checkOutDate) {
    alert('Please select your check-in and check-out dates on the calendar.');
    return;
  }
  if (!firstName || !lastName) {
    alert('Please enter your name.');
    return;
  }
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }

  const btn = document.getElementById('btnBook');
  btn.disabled = true;
  btn.textContent = 'Redirecting to payment…';

  try {
    const resp = await fetch('/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        checkIn: toYMD(checkInDate),
        checkOut: toYMD(checkOutDate),
        guests: document.getElementById('inputGuests').value,
        guestName: `${firstName} ${lastName}`,
        guestEmail: email
      })
    });
    const data = await resp.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error(data.error || 'Unknown error');
    }
  } catch (err) {
    alert('Payment setup failed. Please try again or contact us directly.');
    btn.disabled = false;
    btn.textContent = 'Proceed to Payment';
  }
}

// ─── INIT ────────────────────────────────────────────────────────────────────
setupEventHandlers();
renderGallery(false);
initCalendar();

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
(function () {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  window.__revealObserver = observer;
  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();
