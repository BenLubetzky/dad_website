(function () {
  const S = window.SITE;
  const props = window.PROPERTIES;
  const id = new URLSearchParams(location.search).get('id');
  const p = props.find((x) => x.id === id) || props[0];
  const range = S.rangeOf(p.price);
  const root = document.getElementById('property');
  let map;

  const fact = (icon, label, value) => `<div class="fact"><span>${S.icon(icon)}${S.t(label)}</span><b>${value}</b></div>`;
  const m2 = (n) => `${n.toLocaleString('en-US')} ${S.t(S.dict.sqm)}`;

  const render = () => {
    const he = S.lang() === 'he';
    document.title = `${S.t(p.title)} | ${S.t(S.name)}`;
    const waText = `${S.t(S.dict.waAbout)} ${p.id} – ${S.t(p.title)} (${S.fmt(p.price)})\n${location.href}`;

    const facts = [
      fact('home', S.dict.type, S.t(S.dict.types[p.type])),
      p.beds ? fact('bed', S.dict.beds, p.beds) : '',
      p.baths ? fact('bath', S.dict.baths, p.baths) : '',
      p.area ? fact('area', S.dict.area, m2(p.area)) : '',
      p.plot ? fact('plot', S.dict.plot, m2(p.plot)) : ''
    ].join('');

    const thumbs = p.images.slice(0, 5).map((src, i) =>
      `<button type="button" data-open="${i}" aria-label="Photo ${i + 1}"><img src="${src}" alt="" ${i ? 'loading="lazy"' : ''}></button>`).join('');

    root.innerHTML = `
      <nav class="crumbs">
        <a href="index.html">${he ? 'דף הבית' : 'Home'}</a><span>/</span>
        <a href="listings.html?range=${range.id}">${S.rangeLabel(range)}</a><span>/</span>
        <span>${S.t(p.title)}</span>
      </nav>

      <div class="prop-head">
        <div>
          <h1>${S.t(p.title)}</h1>
          <div class="prop-head__loc">${S.icon('pin')}${S.t(p.city)}, ${S.t(p.region)}</div>
        </div>
        <div>
          <div class="prop-head__price">${S.money(p.price)}</div>
          <div class="prop-head__ref">${he ? 'מספר נכס' : 'Ref.'} <bdi>${p.id}</bdi></div>
        </div>
      </div>

      <div class="pgal">
        ${thumbs}
        <button type="button" class="btn btn--sm pgal__all" data-open="0">${S.icon('eye')} ${he ? `כל התמונות (${p.images.length})` : `All photos (${p.images.length})`}</button>
      </div>

      <div class="prop-body">
        <div>
          <div class="facts">${facts}</div>
          <h2>${he ? 'על הנכס' : 'About this property'}</h2>
          <p class="prop-desc">${S.t(p.description)}</p>
          <h2>${he ? 'מיקום' : 'Location'}</h2>
          <div class="prop-map" id="pmap" dir="ltr"></div>
        </div>

        <aside>
          <div class="aside-card">
            <h3>${he ? 'מתעניינים בנכס?' : 'Interested?'}</h3>
            <p>${he ? 'שלחו הודעה ונחזור אליכם עם כל הפרטים, תמונות נוספות ותיאום סיור.' : "Send us a message and we'll come back with all the details, more photos and a viewing."}</p>
            <div class="aside-card__btns">
              <a class="btn btn--wa btn--block" href="${S.wa(waText)}" target="_blank" rel="noopener">${S.icon('whatsapp')} ${he ? 'שלחו וואטסאפ על הנכס' : 'WhatsApp about this property'}</a>
              <a class="btn btn--outline btn--block" href="tel:${S.phoneHref}">${S.icon('phone')} <bdi dir="ltr">${S.phone}</bdi></a>
            </div>
            <div class="divider">${he ? 'או השאירו פרטים' : 'or leave your details'}</div>
            <form class="form" id="prop-form" novalidate>
              <div class="form__fields">
                <div class="field"><label for="pf-name">${he ? 'שם' : 'Name'}</label><input id="pf-name" required autocomplete="name"></div>
                <div class="field"><label for="pf-email">${he ? 'מייל' : 'Email'}</label><input id="pf-email" type="email" required dir="ltr" autocomplete="email"></div>
                <div class="field"><label for="pf-msg">${he ? 'הודעה' : 'Message'}</label><textarea id="pf-msg" style="min-height:80px">${he ? `אשמח לפרטים על נכס ${p.id}` : `I'd like details about ${p.id}`}</textarea></div>
                <button class="btn btn--dark btn--block" type="submit">${he ? 'שליחה' : 'Send'}</button>
              </div>
              <div class="form__done"><b>${he ? 'תודה! נחזור אליכם בהקדם.' : "Thank you! We'll be in touch soon."}</b></div>
            </form>
          </div>
        </aside>
      </div>`;

    S.bindForm(document.getElementById('prop-form'));

    if (map) map.remove();
    // on phones one-finger drag stays as page scrolling; zoom with the +/- buttons or pinch
    map = L.map('pmap', { scrollWheelZoom: false, dragging: !L.Browser.mobile, tap: false }).setView([p.lat, p.lng], 12);
    S.tiles(map);
    L.marker([p.lat, p.lng], {
      icon: L.divIcon({ className: 'pin-wrap', html: `<div class="pin is-active">${S.short(p.price)}</div>`, iconSize: [0, 0] })
    }).addTo(map);

    // similar properties in the same range
    const similar = props.filter((x) => x.id !== p.id && S.inRange(x, range)).slice(0, 4);
    document.getElementById('similar-wrap').style.display = similar.length ? '' : 'none';
    document.getElementById('similar').innerHTML = similar.map(S.card).join('');
    document.getElementById('similar-all').href = `listings.html?range=${range.id}`;
  };

  // ---------- lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  const lbCount = lb.querySelector('.lightbox__count');
  lb.querySelector('[data-lb="close"]').innerHTML = S.icon('close');
  lb.querySelector('[data-lb="-1"]').innerHTML = S.icon('chevL', 'flip');
  lb.querySelector('[data-lb="1"]').innerHTML = S.icon('chevR', 'flip');
  let idx = 0;
  const show = (i) => {
    idx = (i + p.images.length) % p.images.length;
    lbImg.src = p.images[idx];
    lbCount.textContent = `${idx + 1} / ${p.images.length}`;
  };
  const open = (i) => { show(i); lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; };
  const close = () => { lb.classList.remove('is-open'); document.body.style.overflow = ''; };

  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-open]');
    if (b) open(+b.dataset.open);
  });
  lb.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lb]');
    if (!b) { if (e.target === lb) close(); return; }
    b.dataset.lb === 'close' ? close() : show(idx + +b.dataset.lb);
  });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    const rtl = document.documentElement.dir === 'rtl';
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(idx + (rtl ? -1 : 1));
    if (e.key === 'ArrowLeft') show(idx + (rtl ? 1 : -1));
  });

  render();
  document.addEventListener('langchange', render);
})();
