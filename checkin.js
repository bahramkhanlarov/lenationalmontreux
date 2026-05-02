// ---- Password gate ----
(function () {
  const CORRECT_CODE = '1820';

  function unlock() {
    document.getElementById('password-gate').style.display = 'none';
    document.getElementById('checkin-content').style.display = 'block';
    sessionStorage.setItem('ci_auth', '1');
  }

  function checkPassword() {
    const val = document.getElementById('gate-input').value;
    if (val === CORRECT_CODE) {
      unlock();
    } else {
      document.getElementById('gate-error').style.display = 'block';
      document.getElementById('gate-input').value = '';
      document.getElementById('gate-input').focus();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('ci_auth') === '1') {
      unlock();
      return;
    }

    document.getElementById('gate-submit').addEventListener('click', checkPassword);
    document.getElementById('gate-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkPassword();
    });
    document.getElementById('gate-input').focus();

    const input = document.getElementById('gate-input');
    input.addEventListener('focus', () => { input.style.borderColor = '#c9a84c'; });
    input.addEventListener('blur', () => { input.style.borderColor = '#333'; });
  });
})();

// ---- State ----
let currentStep = 1;
const totalSteps = 4;
const sigData = {};
const sigImages = {};
const sigContexts = {};
const sigDrawing = {};

// ---- Welcome screen → start check-in ----
function startCheckin() {
  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('progress-bar').style.display = 'flex';
  showStep(1);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => { if (sigDrawing[1]) sigDrawing[1].resize(); }, 50);
}

// ---- Checkbox toggle (prevents double-toggle) ----
function toggleCheck(event, id) {
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'LABEL') return;
  const cb = document.getElementById(id);
  cb.checked = !cb.checked;
}

// ---- Signature Pad Logic ----
function initSignaturePad(id) {
  const canvas = document.getElementById('sig-' + id);
  const wrapper = document.getElementById('sig-wrap-' + id);
  const ctx = canvas.getContext('2d');

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (sigImages[id]) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = sigImages[id];
    }
  }

  resize();
  window.addEventListener('resize', resize);

  let drawing = false;
  let lastX = 0, lastY = 0;

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  }

  function startDraw(e) {
    e.preventDefault();
    drawing = true;
    wrapper.classList.add('signing', 'has-sig');
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
    sigData[id] = true;
  }

  function draw(e) {
    if (!drawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastX = pos.x;
    lastY = pos.y;
  }

  function stopDraw(e) {
    if (e) e.preventDefault();
    drawing = false;
    wrapper.classList.remove('signing');
    if (sigData[id]) {
      sigImages[id] = canvas.toDataURL('image/png');
    }
  }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', stopDraw);

  sigContexts[id] = ctx;
  sigDrawing[id] = { canvas, wrapper, resize };
}

function clearSig(id) {
  const { canvas, wrapper, resize } = sigDrawing[id];
  delete sigImages[id];
  sigData[id] = false;
  resize();
  wrapper.classList.remove('has-sig');
}

// ---- Navigation ----
function showStep(n) {
  for (let i = 1; i <= totalSteps; i++) {
    document.getElementById('step-' + i).classList.toggle('visible', i === n);
    const ind = document.getElementById('step-ind-' + i);
    ind.classList.remove('active', 'done');
    if (i < n) ind.classList.add('done');
    else if (i === n) ind.classList.add('active');
  }
  currentStep = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  setTimeout(() => {
    if (n === 2 && sigDrawing[2]) sigDrawing[2].resize();
    if (n === 3 && sigDrawing[3]) sigDrawing[3].resize();
  }, 50);
}

function goToStep(n) {
  if (n <= currentStep) showStep(n);
}

function validateStep(n) {
  let valid = true;

  if (n === 1) {
    if (!sigData[1]) {
      document.getElementById('err-sig-1').classList.add('show');
      valid = false;
    } else {
      document.getElementById('err-sig-1').classList.remove('show');
    }
  }

  if (n === 2) {
    if (!document.getElementById('ack-building').checked) {
      document.getElementById('err-ack-building').classList.add('show');
      valid = false;
    } else {
      document.getElementById('err-ack-building').classList.remove('show');
    }
    if (!sigData[2]) {
      document.getElementById('err-sig-2').classList.add('show');
      valid = false;
    } else {
      document.getElementById('err-sig-2').classList.remove('show');
    }
  }

  if (n === 3) {
    if (!document.getElementById('ack-wellness').checked) {
      document.getElementById('err-ack-wellness').classList.add('show');
      valid = false;
    } else {
      document.getElementById('err-ack-wellness').classList.remove('show');
    }
    if (!sigData[3]) {
      document.getElementById('err-sig-3').classList.add('show');
      valid = false;
    } else {
      document.getElementById('err-sig-3').classList.remove('show');
    }
  }

  return valid;
}

function nextStep(n) {
  if (!validateStep(n)) return;
  showStep(n + 1);
  if (n + 1 === 4) setTimeout(submitCheckinEmail, 300);
}

function prevStep(n) {
  showStep(n - 1);
}

// ---- Collect form values ----
function collectFormData() {
  return {
    name: document.getElementById('reg-name').value || 'Guest',
    apt: document.getElementById('reg-apt').value || '',
    arrival: document.getElementById('reg-arrival').value || '',
    departure: document.getElementById('reg-departure').value || '',
    email: document.getElementById('reg-email').value || '',
    passport: document.getElementById('reg-passport').value || '',
    nationality: document.getElementById('reg-nationality').value || '',
    dob: document.getElementById('reg-dob').value || '',
    adults: document.getElementById('reg-adults').value || '1',
    kids: document.getElementById('reg-kids').value || '0',
    street: document.getElementById('reg-street').value || '',
    city: document.getElementById('reg-city').value || '',
    buildingDate: document.getElementById('building-date').value || '',
    wellnessDate: document.getElementById('wellness-date').value || '',
    sig1: sigImages[1] || document.getElementById('sig-1').toDataURL('image/png'),
    sig2: sigImages[2] || document.getElementById('sig-2').toDataURL('image/png'),
    sig3: sigImages[3] || document.getElementById('sig-3').toDataURL('image/png'),
  };
}

// ---- Build jsPDF document ----
function buildPDFDoc(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 50;
  let y = margin;

  function checkPage(space) {
    if (y + space > pageHeight - margin) { doc.addPage(); y = margin; }
  }

  function heading(text, size) {
    checkPage(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(size);
    doc.setTextColor(26, 26, 46);
    doc.text(text, margin, y);
    y += size * 0.4 + 10;
    doc.setDrawColor(184, 150, 12);
    doc.setLineWidth(1.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 15;
  }

  function field(label, value) {
    checkPage(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(label + ':', margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    doc.text(String(value || '—'), margin + 120, y);
    y += 18;
  }

  function paragraph(text) {
    checkPage(30);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
    doc.text(lines, margin, y);
    y += lines.length * 13 + 5;
  }

  function signature(imgData) {
    checkPage(100);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Signature:', margin, y);
    y += 6;
    try { doc.addImage(imgData, 'PNG', margin, y, 200, 70); } catch (e) { console.error('Signature image error:', e); }
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(margin, y, 200, 70);
    y += 85;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(26, 26, 46);
  doc.text('LE NATIONAL DE MONTREUX', pageWidth / 2, y, { align: 'center' });
  y += 22;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(184, 150, 12);
  doc.text('Guest Check-in Summary', pageWidth / 2, y, { align: 'center' });
  y += 20;
  doc.setDrawColor(184, 150, 12);
  doc.setLineWidth(2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 25;

  heading('1. Registration / Meldeschein', 13);
  field('Name', data.name);
  field('Apartment', data.apt);
  field('Arrival', data.arrival);
  field('Departure', data.departure);
  field('Address', `${data.street}, ${data.city}`);
  field('Passport Nr', data.passport);
  field('Date of Birth', data.dob);
  field('Nationality', data.nationality);
  field('Guests', `${data.adults} adults, ${data.kids} children`);
  field('Email', data.email);
  y += 8;
  signature(data.sig1);

  y += 10;
  heading('2. Building Rules — Acknowledged & Signed', 13);
  paragraph("The guest confirms having read and agreed to the Reglement d'administration et d'utilisation of Le National de Montreux.");
  field('Lieu et date', data.buildingDate);
  y += 4;
  signature(data.sig2);

  y += 10;
  heading('3. Wellness & SPA Rules — Acknowledged & Signed', 13);
  paragraph("The guest confirms having read and agreed to the Reglement d'utilisation de l'Espace Fitness/Piscine/Wellness.");
  field('Lieu et date', data.wellnessDate);
  y += 4;
  signature(data.sig3);

  y += 10;
  checkPage(20);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Generated: ' + new Date().toLocaleString(), pageWidth / 2, y, { align: 'center' });

  return doc;
}

function pdfFileName(name) {
  const safe = name.replace(/[^a-z0-9]/gi, '_');
  const date = new Date().toISOString().slice(0, 10);
  return `Check-in_${safe}_${date}.pdf`;
}

// ---- Download PDF ----
function downloadPDF() {
  const data = collectFormData();
  const doc = buildPDFDoc(data);
  doc.save(pdfFileName(data.name));
}

// ---- Submit PDF by email via Web3Forms ----
const WEB3FORMS_ACCESS_KEY = '6d5389a0-00de-4e97-aaa5-981cd222bd11';

async function submitCheckinEmail() {
  const statusEl = document.getElementById('email-status');

  function setStatus(html, className) {
    statusEl.innerHTML = html;
    statusEl.className = 'email-status ' + className;
    statusEl.style.display = 'block';
  }

  setStatus('Sending your documents to reception...', 'sending');

  let data, pdfBlob, fileName;
  try {
    data = collectFormData();
    const doc = buildPDFDoc(data);
    fileName = pdfFileName(data.name);
    pdfBlob = doc.output('blob');
  } catch (err) {
    console.error('PDF build failed:', { message: err.message });
    setStatus('Could not send documents automatically. Please download the PDF and email it to <strong>info@lenationalmontreux.ch</strong>.', 'error');
    return;
  }

  const form = new FormData();
  form.append('access_key', WEB3FORMS_ACCESS_KEY);
  form.append('subject', `New Check-in: ${data.name} — Apt ${data.apt || 'N/A'}`);
  form.append('from_name', 'Le National Check-in');
  form.append('name', data.name);
  form.append('email', data.email || 'noreply@lenationalmontreux.ch');
  form.append('message',
    `Guest: ${data.name}\n` +
    `Email: ${data.email || '—'}\n` +
    `Apartment: ${data.apt || '—'}\n` +
    `Arrival: ${data.arrival || '—'}\n` +
    `Departure: ${data.departure || '—'}\n` +
    `Nationality: ${data.nationality || '—'}\n` +
    `Guests: ${data.adults} adults, ${data.kids} children`
  );
  form.append('attachment', pdfBlob, fileName);

  try {
    const resp = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: form,
    });

    const result = await resp.json();
    if (!result.success) throw new Error(result.message || `HTTP ${resp.status}`);

    setStatus('Documents sent to reception. Thank you!', 'success');
  } catch (err) {
    console.error('Submit checkin failed:', { message: err.message });
    setStatus(
      'Could not send documents automatically. Please download the PDF and email it to <strong>info@lenationalmontreux.ch</strong>.',
      'error'
    );
  }
}

// ---- Print Summary ----
function showPrintSummary() {
  const name = document.getElementById('reg-name').value || 'Guest';
  const apt = document.getElementById('reg-apt').value || '';
  const arrival = document.getElementById('reg-arrival').value || '';
  const departure = document.getElementById('reg-departure').value || '';
  const email = document.getElementById('reg-email').value || '';
  const passport = document.getElementById('reg-passport').value || '';
  const nationality = document.getElementById('reg-nationality').value || '';
  const dob = document.getElementById('reg-dob').value || '';
  const adults = document.getElementById('reg-adults').value || '1';
  const kids = document.getElementById('reg-kids').value || '0';
  const street = document.getElementById('reg-street').value || '';
  const city = document.getElementById('reg-city').value || '';
  const buildingDate = document.getElementById('building-date').value || '';
  const wellnessDate = document.getElementById('wellness-date').value || '';

  const sig1 = sigImages[1] || document.getElementById('sig-1').toDataURL();
  const sig2 = sigImages[2] || document.getElementById('sig-2').toDataURL();
  const sig3 = sigImages[3] || document.getElementById('sig-3').toDataURL();

  const container = document.getElementById('print-summary');
  container.style.display = 'block';
  container.innerHTML = '';

  function sf(label, value) {
    const row = document.createElement('div');
    row.className = 'summary-field';
    const lbl = document.createElement('span');
    lbl.className = 'sf-label';
    lbl.textContent = label;
    const val = document.createElement('span');
    val.textContent = value;
    row.appendChild(lbl);
    row.appendChild(val);
    return row;
  }

  function sigRow(label, src) {
    const frag = document.createDocumentFragment();
    const row = document.createElement('div');
    row.className = 'summary-field';
    const lbl = document.createElement('span');
    lbl.className = 'sf-label';
    lbl.textContent = label;
    row.appendChild(lbl);
    frag.appendChild(row);
    const img = document.createElement('img');
    img.className = 'summary-sig-img';
    img.src = src;
    frag.appendChild(img);
    return frag;
  }

  const content = document.createElement('div');
  content.className = 'print-summary-content';

  const title = document.createElement('h2');
  title.textContent = 'Le National de Montreux';
  const sub = document.createElement('small');
  sub.textContent = 'Guest Check-in Summary';
  title.appendChild(sub);
  content.appendChild(title);

  const h1 = document.createElement('h3');
  h1.textContent = '1. Registration / Meldeschein';
  content.appendChild(h1);
  content.appendChild(sf('Name:', name));
  content.appendChild(sf('Apartment:', apt));
  content.appendChild(sf('Arrival:', arrival));
  content.appendChild(sf('Departure:', departure));
  content.appendChild(sf('Address:', `${street}, ${city}`));
  content.appendChild(sf('Passport Nr:', passport));
  content.appendChild(sf('Date of Birth:', dob));
  content.appendChild(sf('Nationality:', nationality));
  content.appendChild(sf('Guests:', `${adults} adults, ${kids} children`));
  content.appendChild(sf('Email:', email));
  content.appendChild(sigRow('Signature:', sig1));

  const h2 = document.createElement('h3');
  h2.textContent = '2. Building Rules — Acknowledged & Signed';
  content.appendChild(h2);
  const p2 = document.createElement('p');
  p2.textContent = "The guest confirms having read and agreed to the Règlement d'administration et d'utilisation of Le National de Montreux.";
  content.appendChild(p2);
  content.appendChild(sf('Lieu et date:', buildingDate));
  content.appendChild(sigRow('Signature:', sig2));

  const h3 = document.createElement('h3');
  h3.textContent = '3. Wellness & SPA Rules — Acknowledged & Signed';
  content.appendChild(h3);
  const p3 = document.createElement('p');
  p3.textContent = "The guest confirms having read and agreed to the Règlement d'utilisation de l'Espace Fitness/Piscine/Wellness.";
  content.appendChild(p3);
  content.appendChild(sf('Lieu et date:', wellnessDate));
  content.appendChild(sigRow('Signature:', sig3));

  const ts = document.createElement('div');
  ts.className = 'summary-timestamp';
  ts.textContent = `Generated: ${new Date().toLocaleString()}`;
  content.appendChild(ts);

  const btnRow = document.createElement('div');
  btnRow.className = 'print-btn-row';
  const btnPrint = document.createElement('button');
  btnPrint.className = 'btn btn-primary';
  btnPrint.textContent = 'Print / Save as PDF';
  btnPrint.addEventListener('click', () => window.print());
  const btnClose = document.createElement('button');
  btnClose.className = 'btn btn-secondary';
  btnClose.textContent = 'Close Summary';
  btnClose.addEventListener('click', () => { container.style.display = 'none'; });
  btnRow.appendChild(btnPrint);
  btnRow.appendChild(btnClose);

  container.appendChild(content);
  container.appendChild(btnRow);
  container.scrollIntoView({ behavior: 'smooth' });
}

function printDocuments() {
  window.print();
}

function viewSummary() {
  showPrintSummary();
}

// ---- Auto-fill dates ----
function initDates() {
  const today = new Date().toISOString().slice(0, 10);
  document.getElementById('reg-arrival').value = today;

  const todayFormatted = new Date().toLocaleDateString('fr-CH');
  document.getElementById('building-date').value = 'Montreux, le ' + todayFormatted;
  document.getElementById('wellness-date').value = 'Montreux, le ' + todayFormatted;
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initSignaturePad(1);
  initSignaturePad(2);
  initSignaturePad(3);
  initDates();

  // Start button
  document.querySelector('.btn-start').addEventListener('click', startCheckin);

  document.querySelectorAll('.ci-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang && typeof setLanguage === 'function') setLanguage(lang);
    });
  });

  // Progress step navigation
  [1, 2, 3, 4].forEach(n => {
    document.getElementById('step-ind-' + n).addEventListener('click', () => goToStep(n));
  });

  // Clear signature buttons
  document.getElementById('clear-sig-1').addEventListener('click', () => clearSig(1));
  document.getElementById('clear-sig-2').addEventListener('click', () => clearSig(2));
  document.getElementById('clear-sig-3').addEventListener('click', () => clearSig(3));

  // Step 1
  document.getElementById('next-step-1').addEventListener('click', () => nextStep(1));

  // Step 2
  document.getElementById('ack-box-building').addEventListener('click', (e) => toggleCheck(e, 'ack-building'));
  document.querySelector('label[for="ack-building"]').addEventListener('click', (e) => e.stopPropagation());
  document.getElementById('prev-step-2').addEventListener('click', () => prevStep(2));
  document.getElementById('next-step-2').addEventListener('click', () => nextStep(2));

  // Step 3
  document.getElementById('ack-box-wellness').addEventListener('click', (e) => toggleCheck(e, 'ack-wellness'));
  document.querySelector('label[for="ack-wellness"]').addEventListener('click', (e) => e.stopPropagation());
  document.getElementById('prev-step-3').addEventListener('click', () => prevStep(3));
  document.getElementById('next-step-3').addEventListener('click', () => nextStep(3));

  // Step 4 actions
  document.getElementById('btn-download-pdf').addEventListener('click', downloadPDF);
  document.getElementById('btn-print').addEventListener('click', printDocuments);
  document.getElementById('btn-view-summary').addEventListener('click', viewSummary);
});
