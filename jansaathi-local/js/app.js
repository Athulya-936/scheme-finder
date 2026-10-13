// JanSaathi (local edition): no server, no npm. Open index.html in Chrome or Edge.
(function () {
  const D = window.DATA;
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const S = { view: 'home', f: { search: '', category: '', level: '', mine: false }, sel: null, tab: 'Overview', newsTag: 'Latest', pack: new Set(), applyId: null };
  let P = Store.get('profile', null);

  const STATES = 'Andhra Pradesh,Arunachal Pradesh,Assam,Bihar,Chhattisgarh,Goa,Gujarat,Haryana,Himachal Pradesh,Jharkhand,Karnataka,Kerala,Madhya Pradesh,Maharashtra,Manipur,Meghalaya,Mizoram,Nagaland,Odisha,Punjab,Rajasthan,Sikkim,Tamil Nadu,Telangana,Tripura,Uttar Pradesh,Uttarakhand,West Bengal,Delhi,Jammu & Kashmir,Ladakh,Puducherry,Chandigarh'.split(',');
  const OCC = { farmer: 'Farmer', student: 'Student', worker: 'Daily wage / unorganised worker', vendor: 'Street vendor', artisan: 'Artisan', business: 'Small business', homemaker: 'Homemaker', salaried: 'Salaried', retired: 'Retired', unemployed: 'Looking for work' };
  const INC = [[50000, 'Below ₹1 lakh'], [175000, '₹1 to 2.5 lakh'], [375000, '₹2.5 to 5 lakh'], [800000, 'Above ₹5 lakh']];
  const LANG = [['en', 'English'], ['hi', 'हिन्दी'], ['ta', 'தமிழ்'], ['te', 'తెలుగు'], ['ml', 'മലയാളം'], ['kn', 'ಕನ್ನಡ'], ['bn', 'বাংলা']];
  const GREET = { en: 'Namaskar!', hi: 'नमस्कार!', ta: 'வணக்கம்!', te: 'నమస్కారం!', ml: 'നമസ്കാരം!', kn: 'ನಮಸ್ಕಾರ!', bn: 'নমস্কার!' };
  const NAV = [['home', '🏠', 'Home'], ['schemes', '📋', 'Schemes'], ['documents', '🗂️', 'My Documents'], ['apply', '📝', 'Apply Now'], ['alerts', '🔔', 'Alerts'], ['news', '📰', 'News & Updates'], ['csc', '🏢', 'CSC Visit Pack'], ['family', '👪', 'Family Planner'], ['profile', '👤', 'Profile']];
  const ICON = { Education: '🎓', Health: '❤️', Agriculture: '🌾', Housing: '🏠', 'Women & Child': '👩‍👧', 'Senior Citizens': '🧓', Disability: '♿', Employment: '💼', 'Social Welfare': '🤝' };
  const opt = (arr, v) => arr.map(([a, b]) => `<option value="${esc(a)}"${String(a) === String(v) ? ' selected' : ''}>${esc(b)}</option>`).join('');
  const badge = m => m == 2 ? '<span class="badge b2">Likely eligible</span>' : m == 1 ? '<span class="badge b1">Check eligibility</span>' : '';
  const dayDiff = d => Math.ceil((new Date(d) - Date.now()) / 864e5);

  // ---------- logic (same rules as the server version)
  function check(s, p) {
    if (s.state && s.state !== p.state) return 0;
    if (s.min_age != null && p.age < s.min_age) return 0;
    if (s.max_age != null && p.age > s.max_age) return 0;
    if (s.gender && s.gender !== p.gender) return 0;
    if (s.needs_disability && !p.disability) return 0;
    if (s.occupation && !s.occupation.split(',').includes(p.occupation)) return 0;
    if (s.categories && !s.categories.split(',').includes(p.category)) return 0;
    if (s.max_income != null && Number(p.income) > s.max_income) return 0;
    return s.soft ? 1 : 2;
  }
  const myDocs = () => Store.get('docs', {});
  const dtype = c => D.docTypes.find(d => d.code === c);
  const docsOf = s => s.documents.map(x => ({ ...dtype(x.code), mandatory: x.mandatory, copies: x.copies }));
  const matched = (p, min = 1) => D.schemes.map(s => ({ ...s, match: check(s, p) })).filter(s => s.match >= min);
  function readiness() {
    const h = myDocs(), need = new Map(); let blocked = 0; const likely = matched(P, 2);
    likely.forEach(s => { const req = docsOf(s).filter(d => d.mandatory); if (req.some(d => !h[d.code])) blocked++; req.forEach(d => need.set(d.code, d.name)); });
    const got = [...need.keys()].filter(c => h[c]).length;
    return { percent: need.size ? Math.round(got / need.size * 100) : 0, likely: likely.length, blocked, missing: [...need].filter(([c]) => !h[c]) };
  }
  function alertsList() {
    const reads = Store.get('reads', {}), out = [];
    D.alerts.forEach(a => { const s = D.schemes.find(x => x.slug === a.slug); if (s && check(s, P) > 0) out.push({ ...a, scheme: s.name }); });
    const h = myDocs();
    Object.keys(h).forEach(c => { const e = h[c].expires_on; if (!e) return; const d = dayDiff(e); if (d <= 30) out.push({ id: 'd' + c, type: 'expiry', title: `${dtype(c).name} ${d < 0 ? 'has expired' : 'expires in ' + d + ' days'}`, detail: 'Renew it before you apply.', date: e }); });
    return out.map(a => ({ ...a, read: !!reads[a.id] })).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }

  // ---------- screens: onboarding, lock
  function profileFields(u = {}) {
    return `<label>State<select name="state">${opt(STATES.map(s => [s, s]), u.state || 'Kerala')}</select></label>
    <label>Age<input name="age" type="number" min="1" max="120" required value="${u.age || ''}"></label>
    <label>Gender<select name="gender">${opt([['F', 'Woman'], ['M', 'Man'], ['O', 'Other']], u.gender)}</select></label>
    <label>Family income per year<select name="income">${opt(INC, u.income)}</select></label>
    <label>What do you do?<select name="occupation">${opt(Object.entries(OCC), u.occupation)}</select></label>
    <label>Category<select name="category">${opt(['General', 'OBC', 'SC', 'ST'].map(c => [c, c]), u.category)}</select></label>
    <label class="ck"><input type="checkbox" name="disability"${u.disability ? ' checked' : ''}> Disability of 80% or more</label>
    <label>Language<select name="language">${opt(LANG, u.language)}</select></label>`;
  }
  function readProfile(f) { const b = Object.fromEntries(new FormData(f)); return { name: (b.name || '').trim(), state: b.state, age: +b.age, gender: b.gender, income: +b.income, occupation: b.occupation, category: b.category, disability: !!f.elements.disability.checked, language: b.language }; }

  function onboarding() {
    $('#shell').hidden = true; $('#auth').hidden = false;
    $('#auth').innerHTML = `<div class="card"><h1 class="script">Namaskar!</h1><h2>Welcome to JanSaathi</h2>
    <p class="safe">🔒 Everything stays on this device. No account, no server. Your certificates are never uploaded.</p>
    <form id="ob"><label>Your name<input name="name" required autocomplete="name"></label>${profileFields()}
    <label>Set a PIN to lock the app (4 to 6 digits, optional)<input name="pin" inputmode="numeric" pattern="[0-9]{4,6}" maxlength="6" autocomplete="new-password"></label>
    <p id="oerr" class="err" role="alert"></p><button class="btn">Start</button></form></div>`;
    $('#ob').onsubmit = async e => {
      e.preventDefault(); P = readProfile(e.target); Store.set('profile', P);
      const pin = e.target.elements.pin.value; if (pin) { const salt = Math.random().toString(36).slice(2); Store.set('pin', { salt, hash: await hashPin(pin, salt) }); }
      start();
    };
  }
  function lockScreen() {
    $('#shell').hidden = true; $('#auth').hidden = false;
    $('#auth').innerHTML = `<div class="card lockbox"><h1 class="script">Namaskar${P && P.name ? ', ' + esc(P.name) : ''}!</h1><p>Enter your PIN to open JanSaathi.</p>
    <form id="lk"><input class="pin" name="pin" type="password" inputmode="numeric" maxlength="6" autofocus aria-label="PIN"><p id="lerr" class="err" role="alert"></p><button class="btn">Unlock</button></form></div>`;
    $('#lk').onsubmit = async e => {
      e.preventDefault(); const p = Store.get('pin'), h = await hashPin(e.target.elements.pin.value, p.salt);
      if (h === p.hash) start(); else { $('#lerr').textContent = 'Wrong PIN'; e.target.elements.pin.value = ''; }
    };
  }
  function start() { $('#auth').hidden = true; $('#shell').hidden = false; go(S.view); resetIdle(); }
  let idle; function resetIdle() { clearTimeout(idle); if (Store.get('pin')) idle = setTimeout(lockScreen, 5 * 60 * 1000); }
  ['click', 'keydown', 'touchstart'].forEach(ev => document.addEventListener(ev, resetIdle, true));

  function go(v, extra) {
    S.view = v; if (extra) Object.assign(S, extra);
    $('#side').innerHTML = `<h1 class="brand">Jan<b>Saathi</b></h1><p class="sub">Government Benefits Companion</p>` + NAV.map(([k, i, t]) => `<button data-v="${k}" aria-current="${k === v}"><span aria-hidden="true">${i}</span>${t}</button>`).join('') + (Store.get('pin') ? `<button id="lockNow"><span aria-hidden="true">🔒</span>Lock now</button>` : '');
    const unread = alertsList().filter(a => !a.read).length;
    $('#top').innerHTML = `<input id="gs" type="search" placeholder="Search schemes, keywords..." aria-label="Search schemes" value="${esc(S.f.search)}"><span class="sp"></span><button class="bell" data-v="alerts" aria-label="Alerts">🔔${unread ? `<span class="dot">${unread}</span>` : ''}</button><strong>${esc(P.name)}</strong>`;
    try { $('#main').innerHTML = V[v](); } catch (e) { console.error(e); $('#main').innerHTML = `<p class="err">Something went wrong: ${esc(e.message)}</p>`; }
    window.scrollTo(0, 0);
  }

  // ---------- views
  const V = {};
  V.home = () => {
    const rd = readiness(), al = alertsList(), h = new Date().getHours(), g = h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
    const tiles = [['schemes', '📋', 'Schemes', 'Explore all'], ['documents', '🗂️', 'Documents', 'View & manage'], ['apply', '📝', 'Apply Now', 'Start application'], ['alerts', '🔔', 'Alerts', `${al.filter(a => !a.read).length} new`], ['news', '📰', 'News', 'Latest updates'], ['family', '👪', 'Family Planner', 'Manage benefits'], ['csc', '🏢', 'CSC Visit Pack', 'Get your checklist'], ['profile', '👤', 'Profile', 'Manage info']];
    return `<section class="hero"><h1 class="script">${GREET[P.language] || GREET.en}</h1><h2>Welcome to JanSaathi</h2><p>Your personal guide to government schemes, certificates and services, all in one place.</p><button class="btn" data-v="schemes">Let's Explore</button></section>
    <div class="split"><section class="card"><h2>${g}, ${esc(P.name)}!</h2><div class="row"><div class="donut" style="--p:${rd.percent}"><span>${rd.percent}%</span></div>
    <div><h3>Your Benefit Readiness</h3><p>${rd.likely} schemes likely match you. ${rd.missing.length ? `${rd.missing.length} documents are missing, blocking ${rd.blocked} schemes.` : 'You have every document you need.'}</p><button class="btn sm" data-v="documents">View details</button></div></div></section>
    <section class="grid" style="align-content:start">${tiles.map(([k, i, t, s]) => `<div class="tile" role="button" tabindex="0" data-v="${k}"><i>${i}</i>${t}<small>${s}</small></div>`).join('')}</section></div>`;
  };

  V.schemes = () => {
    if (S.sel) return schemeDetail(S.sel);
    const f = S.f, q = f.search.toLowerCase(), saved = Store.get('saved', []);
    let rows = D.schemes.map(s => ({ ...s, match: check(s, P) }));
    if (q) rows = rows.filter(s => (s.name + s.benefit + s.category + (s.state || '')).toLowerCase().includes(q));
    if (f.category) rows = rows.filter(s => s.category === f.category);
    if (f.level) rows = rows.filter(s => s.level === f.level);
    if (f.mine) rows = rows.filter(s => s.match > 0);
    rows.sort((a, b) => b.match - a.match);
    const cats = {}; D.schemes.forEach(s => cats[s.category] = (cats[s.category] || 0) + 1);
    return `<h2>Find Schemes for You</h2><div class="chips">${['', 'Central', 'State'].map(l => `<button class="chip" data-level="${l}" aria-pressed="${f.level === l}">${l || 'All'}</button>`).join('')}
    <label class="ck" style="margin:0 0 0 8px"><input type="checkbox" id="mine"${f.mine ? ' checked' : ''}> Only schemes that match me</label></div>
    <div class="grid">${Object.keys(cats).map(c => `<div class="tile" role="button" tabindex="0" data-cat="${esc(c)}" style="${f.category === c ? 'border-color:var(--saffron)' : ''}"><i>${ICON[c] || '📌'}</i>${esc(c)}<small>${cats[c]} schemes</small></div>`).join('')}</div><br>
    ${rows.map(s => `<article class="card"><div class="row between"><div>${badge(s.match)}<span class="badge">${s.state || 'All India'}</span><span class="badge">${esc(s.category)}</span>${saved.includes(s.id) ? '<span class="badge">★ Saved</span>' : ''}<h3>${esc(s.name)}</h3><p class="mute" style="margin:0">${esc(s.benefit)}</p></div><button class="btn sm" data-scheme="${s.id}">View details</button></div></article>`).join('') || '<p class="mute">No schemes found.</p>'}`;
  };
  function schemeDetail(id) {
    const s = D.schemes.find(x => x.id == id), h = myDocs(), saved = Store.get('saved', []).includes(s.id), T = ['Overview', 'Eligibility', 'Documents', 'How to Apply'];
    const body = {
      Overview: `<p>${esc(s.description)}</p><p><b>Benefit:</b> ${esc(s.benefit)}</p>`,
      Eligibility: `<ul>${s.eligibility.map(e => `<li>${esc(e)}</li>`).join('')}</ul><p class="mute">Screening only. The scheme office decides final eligibility.</p>`,
      Documents: docsOf(s).map(d => `<div class="item"><span class="${h[d.code] ? 'ok' : 'miss'}">${h[d.code] ? '✔' : '✖'}</span><div><b>${esc(d.name)}</b> ${d.mandatory ? '' : '(if available)'}<br><span class="mute">${esc(d.where_to_get)}</span></div></div>`).join(''),
      'How to Apply': `<ol>${s.how.map(e => `<li>${esc(e)}</li>`).join('')}</ol>`
    }[S.tab];
    return `<button class="btn alt sm" data-back="1">← Back</button><div class="card" style="margin-top:12px">${badge(check(s, P))}<h2>${esc(s.name)}</h2><div class="row"><a class="btn" href="${esc(s.website)}" target="_blank" rel="noopener">Apply Now</a><button class="btn alt" data-save="${s.id}">${saved ? '★ Saved' : '☆ Save Scheme'}</button></div>
    <div class="tabs" role="tablist">${T.map(t => `<button role="tab" aria-selected="${t === S.tab}" data-tab="${t}">${t}</button>`).join('')}</div>${body}</div>`;
  }

  V.documents = () => {
    const h = myDocs(), rd = readiness();
    return `<div class="row between"><h2>My Document Vault</h2><span class="mute">Readiness ${rd.percent}%</span></div>
    <p class="safe">🔒 Files are saved only inside this browser on this device. They are never uploaded. Lock your computer when you step away.</p>
    <div class="grid">${D.docTypes.map(d => { const x = h[d.code];
      return `<div class="doc ${x ? 'have' : ''}"><b>${esc(d.name)}</b><span class="mute" style="font-size:12px">${esc(d.issued_by)}</span>
      ${x ? `<span class="ok">✔ Added</span>${x.file ? `<button class="btn sm" data-view="${d.code}">View file</button>` : '<span class="mute" style="font-size:12px">No file attached</span>'}
        <label class="btn sm alt" style="cursor:pointer">${x.file ? 'Replace file' : 'Attach file'}<input type="file" accept="image/*,application/pdf" data-up="${d.code}" hidden></label>
        <label style="font-size:12px;margin:0">Expiry<input type="date" data-exp="${d.code}" value="${x.expires_on || ''}"></label><button class="btn sm alt" data-rm="${d.code}">Remove</button>`
      : `<label class="btn sm" style="cursor:pointer">Upload file<input type="file" accept="image/*,application/pdf" data-up="${d.code}" hidden></label><button class="btn sm alt" data-mark="${d.code}">I have it (no file)</button><span class="mute" style="font-size:12px">${esc(d.where_to_get)}</span>`}</div>`; }).join('')}</div>`;
  };

  V.apply = () => {
    const all = matched(P, 1); if (!all.length) return '<p>No schemes match yet. Update your profile.</p>';
    const s = all.find(x => x.id == S.applyId) || all[0], h = myDocs();
    return `<h2>Apply & Documents Guide</h2><label>Choose a scheme<select id="applySel">${opt(all.map(x => [x.id, x.name]), s.id)}</select></label>
    <div class="split"><section class="card"><h3>1. Required documents</h3>${docsOf(s).map(d => `<div class="item"><span class="${h[d.code] ? 'ok' : 'miss'}">${h[d.code] ? '✔' : '✖'}</span><div><b>${esc(d.name)}</b><br><span class="mute">${esc(d.issued_by)}: ${esc(d.where_to_get)}</span></div></div>`).join('')}</section>
    <section class="card"><h3>2. Apply</h3><ol>${s.how.map(e => `<li>${esc(e)}</li>`).join('')}</ol><a class="btn" href="${esc(s.website)}" target="_blank" rel="noopener">Official website</a>
    <h3 style="margin-top:16px">3. Track</h3><p class="mute">Keep your receipt and application number. Check status on the official website.</p></section></div>
    <section class="card"><h3>Visit nearest CSC</h3><p class="mute">${esc(D.csc.hours)}</p><a class="btn alt" href="${D.csc.url}" target="_blank" rel="noopener">Find CSC</a></section>`;
  };

  V.alerts = () => {
    const a = alertsList();
    return `<h2>Alerts</h2>${a.map(x => `<div class="card row between" style="${x.read ? 'opacity:.6' : ''}"><div><b>${esc(x.title)}</b><br><span class="mute">${esc(x.scheme || '')} ${x.date ? '· ' + esc(x.date) : ''}</span><br>${esc(x.detail)}</div>${x.read ? '' : `<button class="btn sm alt" data-read="${esc(x.id)}">Mark read</button>`}</div>`).join('') || '<p class="mute">No alerts right now.</p>'}
    <p class="mute">Sample alerts. Real alerts need live data from the official portals.</p>`;
  };

  V.news = () => {
    const tags = ['Latest', 'Central', 'State', 'Education', 'Health', 'Agriculture'], t = S.newsTag;
    const n = D.news.filter(x => t === 'Latest' || x.category === t || x.level === t);
    return `<h2>News & Updates</h2><div class="chips">${tags.map(x => `<button class="chip" data-tag="${x}" aria-pressed="${t === x}">${x}</button>`).join('')}</div>
    ${n.map(x => `<a class="card" style="display:block;color:inherit;text-decoration:none" href="${esc(x.url)}" target="_blank" rel="noopener"><b>${esc(x.title)}</b><br><span class="mute">${esc(x.source)} · ${esc(x.date)}</span></a>`).join('') || '<p class="mute">Nothing here yet.</p>'}
    <p class="mute">Sample headlines. For real news visit <a href="https://pib.gov.in" target="_blank" rel="noopener">pib.gov.in</a>.</p>`;
  };

  V.csc = () => {
    const all = matched(P, 1), h = myDocs(), items = new Map(), names = [];
    all.filter(s => S.pack.has(s.id)).forEach(s => { names.push(s.name); docsOf(s).forEach(d => { const o = items.get(d.code); items.set(d.code, { ...d, mandatory: d.mandatory || (o ? o.mandatory : 0), copies: Math.max(d.copies, o ? o.copies : 0) }); }); });
    return `<h2>CSC Visit Pack</h2><section class="card noprint"><h3>Pick the schemes you want to apply for</h3>${all.map(s => `<label class="ck"><input type="checkbox" data-pk="${s.id}"${S.pack.has(s.id) ? ' checked' : ''}> ${esc(s.name)}</label>`).join('')}</section>
    ${items.size ? `<section class="card"><h3>Your checklist</h3><p class="mute">For: ${names.map(esc).join(', ')}</p>${[...items.values()].map(i => `<div class="item"><span class="${h[i.code] ? 'ok' : 'miss'}">${h[i.code] ? '✔' : '☐'}</span><div><b>${esc(i.name)}</b> (original + ${i.copies} photocopy)${i.mandatory ? '' : ' if available'}</div></div>`).join('')}
    <p class="mute">Also carry your phone linked to Aadhaar for OTP.</p><button class="btn noprint" onclick="print()">Print or save as PDF</button> <a class="btn alt noprint" href="${D.csc.url}" target="_blank" rel="noopener">Find CSC</a></section>` : '<p class="mute">Select at least one scheme.</p>'}`;
  };

  V.family = () => {
    const f = Store.get('family', []);
    return `<h2>Family Benefits Planner</h2><div class="split"><section>${f.map(m => { const ms = matched({ ...m, state: P.state }, 2); return `<div class="card"><div class="row between"><div><b>${esc(m.name)}</b> <span class="mute">${esc(m.relation)}, ${m.age}</span></div><button class="btn sm alt" data-delf="${m.id}">Remove</button></div>${ms.length ? `<p>Likely schemes: ${ms.map(s => esc(s.name)).join(', ')}</p>` : '<p class="mute">No likely schemes.</p>'}</div>`; }).join('') || '<p class="mute">Add family members to see their schemes.</p>'}</section>
    <form class="card" id="ff"><h3>Add member</h3><label>Name<input name="name" required></label><label>Relation<input name="relation" placeholder="Father, Mother, Sister"></label><label>Age<input name="age" type="number" min="0" max="120" required></label>
    <label>Gender<select name="gender">${opt([['F', 'Woman'], ['M', 'Man']])}</select></label><label>What do they do?<select name="occupation">${opt(Object.entries(OCC))}</select></label><label>Family income<select name="income">${opt(INC)}</select></label><p></p><button class="btn">Add</button></form></div>`;
  };

  V.profile = () => {
    const hasPin = !!Store.get('pin');
    return `<h2>Profile & Settings</h2><form class="card" id="pf" style="max-width:520px"><label>Name<input name="name" value="${esc(P.name)}" required></label>${profileFields(P)}<p></p>
    <button class="btn">Save changes</button><p id="pmsg" class="ok"></p></form>
    <section class="card" style="max-width:520px"><h3>Privacy lock</h3><p class="mute">${hasPin ? 'A PIN is set. The app locks after 5 minutes of no use.' : 'No PIN set. Anyone who opens this browser can see your data.'}</p>
    <form id="pinf"><label>${hasPin ? 'New PIN' : 'Set a PIN'} (4 to 6 digits)<input name="pin" inputmode="numeric" pattern="[0-9]{4,6}" maxlength="6" required autocomplete="new-password"></label><p></p><button class="btn alt">${hasPin ? 'Change PIN' : 'Set PIN'}</button>${hasPin ? ' <button type="button" class="btn alt" id="rmPin">Remove PIN</button>' : ''}</form></section>
    <section class="card" style="max-width:520px"><h3>Delete everything</h3><p class="mute">Removes your profile, documents and files from this browser. This cannot be undone.</p><button class="btn bad" id="wipe">Delete all my data</button></section>`;
  };

  // ---------- file helpers
  async function attach(code, file) {
    if (file.size > 10 * 1024 * 1024) return alert('This file is over 10 MB. Please use a smaller photo or PDF.');
    try { await FileDB.put(code, file); } catch (e) { return alert(e.message); }
    const d = myDocs(); d[code] = { ...(d[code] || {}), file: true, fileName: file.name, added: Date.now() }; Store.set('docs', d); go('documents');
  }
  async function viewFile(code) {
    let blob; try { blob = await FileDB.get(code); } catch (e) { return alert(e.message); }
    if (!blob) return alert('File not found.');
    const url = URL.createObjectURL(blob), isPdf = blob.type === 'application/pdf';
    $('#dlgBody').innerHTML = `<h3>${esc(dtype(code).name)}</h3>${isPdf ? `<iframe src="${url}" title="Document"></iframe>` : `<img src="${url}" alt="${esc(dtype(code).name)}">`}<a class="btn sm" href="${url}" download="${esc((myDocs()[code] || {}).fileName || code)}">Download</a>`;
    $('#dlg').showModal(); $('#dlg').onclose = () => URL.revokeObjectURL(url);
  }

  // ---------- events
  document.addEventListener('click', async e => {
    if (e.target.id === 'dlgClose') return $('#dlg').close();
    const t = e.target.closest('[data-v],[data-scheme],[data-back],[data-tab],[data-level],[data-cat],[data-save],[data-mark],[data-rm],[data-view],[data-read],[data-tag],[data-delf],#lockNow,#wipe,#rmPin');
    if (!t) return; const d = t.dataset;
    if (d.v) return go(d.v, d.v === 'schemes' ? { sel: null } : {});
    if (d.scheme) return go('schemes', { sel: d.scheme, tab: 'Overview' });
    if (d.back) return go('schemes', { sel: null });
    if (d.tab) { S.tab = d.tab; return go('schemes'); }
    if (d.level !== undefined) { S.f.level = d.level; return go('schemes'); }
    if (d.cat !== undefined) { S.f.category = S.f.category === d.cat ? '' : d.cat; return go('schemes'); }
    if (d.save) { let s = Store.get('saved', []); const id = +d.save; s = s.includes(id) ? s.filter(x => x !== id) : [...s, id]; Store.set('saved', s); return go('schemes'); }
    if (d.mark) { const x = myDocs(); x[d.mark] = { added: Date.now() }; Store.set('docs', x); return go('documents'); }
    if (d.rm) { const x = myDocs(); delete x[d.rm]; Store.set('docs', x); try { await FileDB.del(d.rm); } catch (e) {} return go('documents'); }
    if (d.view) return viewFile(d.view);
    if (d.read) { const r = Store.get('reads', {}); r[d.read] = 1; Store.set('reads', r); return go('alerts'); }
    if (d.tag) { S.newsTag = d.tag; return go('news'); }
    if (d.delf) { Store.set('family', Store.get('family', []).filter(m => m.id != d.delf)); return go('family'); }
    if (t.id === 'lockNow') return lockScreen();
    if (t.id === 'rmPin') { localStorage.removeItem('js_pin'); return go('profile'); }
    if (t.id === 'wipe') { if (confirm('Delete your profile, documents and files from this browser?')) { await Store.clearAll(); P = null; S.view = 'home'; onboarding(); } }
  });
  document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.tile[role=button]')) { e.preventDefault(); e.target.click(); } });
  document.addEventListener('change', e => {
    const t = e.target, d = t.dataset;
    if (t.id === 'mine') { S.f.mine = t.checked; go('schemes'); }
    if (t.id === 'applySel') { S.applyId = t.value; go('apply'); }
    if (d.pk) { t.checked ? S.pack.add(+d.pk) : S.pack.delete(+d.pk); go('csc'); }
    if (d.exp) { const x = myDocs(); if (x[d.exp]) { x[d.exp].expires_on = t.value || null; Store.set('docs', x); } }
    if (d.up && t.files[0]) attach(d.up, t.files[0]);
  });
  document.addEventListener('input', e => {
    if (e.target.id !== 'gs') return; S.f.search = e.target.value; clearTimeout(S.st);
    S.st = setTimeout(() => { go('schemes', { sel: null }); const g = $('#gs'); g.focus(); g.setSelectionRange(g.value.length, g.value.length); }, 350);
  });
  document.addEventListener('submit', async e => {
    const f = e.target; if (f.id === 'ob' || f.id === 'lk') return; e.preventDefault();
    if (f.id === 'ff') { const b = Object.fromEntries(new FormData(f)), m = Store.get('family', []); m.push({ id: Date.now(), name: b.name.trim(), relation: b.relation, age: +b.age, gender: b.gender, occupation: b.occupation, income: +b.income, category: P.category, disability: false }); Store.set('family', m); return go('family'); }
    if (f.id === 'pf') { P = readProfile(f); Store.set('profile', P); go('profile'); $('#pmsg').textContent = 'Saved'; return; }
    if (f.id === 'pinf') { const salt = Math.random().toString(36).slice(2); Store.set('pin', { salt, hash: await hashPin(f.elements.pin.value, salt) }); resetIdle(); return go('profile'); }
  });

  // ---------- boot
  if (Store.get('pin') && P) lockScreen(); else if (!P) onboarding(); else start();
})();
