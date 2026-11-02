// Shared helpers + header, footer and floating WhatsApp button for every page.
(function () {
  const S = window.SITE;

  // ---------- helpers
  S.lang = () => (document.documentElement.lang === 'en' ? 'en' : 'he');
  S.t = (o) => (o == null ? '' : typeof o === 'string' ? o : (o[S.lang()] ?? o.he));
  S.fmt = (n) => '€' + n.toLocaleString('en-US');
  S.money = (n) => `<bdi dir="ltr">${S.fmt(n)}</bdi>`;
  S.short = (n) => (n >= 1e6 ? '€' + +(n / 1e6).toFixed(2) + 'M' : '€' + Math.round(n / 1000) + 'K');
  S.wa = (text) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(text || '')}`;
  S.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  S.rangeById = (id) => S.ranges.find((r) => r.id === +id);
  S.rangeOf = (price) => S.ranges.find((r) => price > r.min && (r.max == null || price <= r.max)) || S.ranges[0];
  S.inRange = (p, r) => !r || S.rangeOf(p.price).id === r.id;
  S.rangeLabel = (r) => {
    const he = S.lang() === 'he';
    if (r.min === 0) return (he ? 'עד ' : 'Up to ') + S.money(r.max);
    if (r.max == null) return (he ? 'מעל ' : 'Over ') + S.money(r.min);
    return `${S.money(r.min)} – ${S.money(r.max)}`;
  };

  S.dict = {
    types: {
      apartment: { he: 'דירה', en: 'Apartment' },
      house: { he: 'בית', en: 'House' },
      townhouse: { he: 'בית עירוני', en: 'Townhouse' },
      villa: { he: 'וילה', en: 'Villa' },
      land: { he: 'קרקע', en: 'Land' },
      farm: { he: 'קינטה (חווה)', en: 'Quinta (farm)' },
      penthouse: { he: 'פנטהאוז', en: 'Penthouse' }
    },
    properties: { he: 'נכסים', en: 'properties' },
    property: { he: 'נכס', en: 'property' },
    beds: { he: 'חדרי שינה', en: 'Bedrooms' },
    baths: { he: 'חדרי רחצה', en: 'Bathrooms' },
    area: { he: 'שטח בנוי', en: 'Living area' },
    plot: { he: 'שטח מגרש', en: 'Plot' },
    type: { he: 'סוג נכס', en: 'Type' },
    sqm: { he: 'מ״ר', en: 'm²' },
    all: { he: 'כל הנכסים', en: 'All properties' },
    view: { he: 'לפרטים', en: 'View details' },
    map: { he: 'מפה', en: 'Map' },
    list: { he: 'רשימה', en: 'List' },
    waHello: { he: 'שלום, אשמח לשמוע פרטים על נכסים בפורטוגל.', en: 'Hi, I would like to hear about properties in Portugal.' },
    waAbout: { he: 'שלום, אני מתעניין/ת בנכס', en: "Hi, I'm interested in property" }
  };

  // ---------- icons (inline SVG, stroke-based)
  const P = {
    whatsapp: '<path fill="currentColor" stroke="none" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    bed: '<path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>',
    bath: '<path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.7 3 4 3.7 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M2 12h20M7 19v2M17 19v2"/>',
    area: '<path d="M3 3h18v18H3zM3 9h18M9 21V9"/>',
    plot: '<path d="M3 7l6-4 6 4 6-4v14l-6 4-6-4-6 4z"/><path d="M9 3v14M15 7v14"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUp: '<path d="M7 17 17 7M8 7h9v9"/>',
    chevL: '<path d="m15 18-6-6 6-6"/>',
    chevR: '<path d="m9 18 6-6-6-6"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    scale: '<path d="M12 3v18M5 21h14M3 7h18M6 7l-3 7a3 3 0 0 0 6 0Zm12 0-3 7a3 3 0 0 0 6 0Z"/>',
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    bank: '<path d="M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M12 3l9 5H3Z"/>',
    video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4Z"/>',
    tool: '<path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.1 2.1 0 0 1-3-3Z"/><path d="M14.7 6.3 18 3l3 3-3.3 3.3"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.8 7L3 21l2-6.2A8 8 0 1 1 21 12Z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    euro: '<path d="M4 10h12M4 14h9M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-5"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>'
  };
  S.icon = (name, cls = '') =>
    `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ''}</svg>`;

  // ---------- map styles (SITE.defaultMapStyle in config.js picks one)
  const ESRI = (s) => `https://server.arcgisonline.com/ArcGIS/rest/services/${s}/MapServer/tile/{z}/{y}/{x}`;
  const STADIA = (s) => `https://tiles.stadiamaps.com/tiles/${s}/{z}/{x}/{y}{r}.png`;
  const esriAttr = 'Tiles &copy; Esri';
  const osmAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  const stadiaAttr = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> ' + osmAttr;
  S.mapStyles = {
    gray:     { he: 'אפור בהיר', en: 'Light gray', free: true, layers: [ESRI('Canvas/World_Light_Gray_Base'), ESRI('Canvas/World_Light_Gray_Reference')], attr: esriAttr, max: 16 },
    sand:     { he: 'חול חמים', en: 'Warm sand', free: true, layers: [ESRI('Canvas/World_Light_Gray_Base'), ESRI('Canvas/World_Light_Gray_Reference')], attr: esriAttr, max: 16, cls: 'tiles--sand' },
    natgeo:   { he: 'קלאסי (נשיונל ג׳יאוגרפיק)', en: 'Classic atlas', free: true, layers: [ESRI('NatGeo_World_Map')], attr: esriAttr + ' &mdash; National Geographic', max: 16 },
    topo:     { he: 'טופוגרפי עדין', en: 'Soft topographic', free: true, layers: [ESRI('World_Topo_Map')], attr: esriAttr, max: 19 },
    soft:     { he: 'רחובות מעומעם', en: 'Muted streets', free: true, layers: [ESRI('World_Street_Map')], attr: esriAttr, max: 19, cls: 'tiles--muted' },
    street:   { he: 'רחובות צבעוני (הנוכחי)', en: 'Colourful streets (current)', free: true, layers: [ESRI('World_Street_Map')], attr: esriAttr, max: 19 },
    satellite:{ he: 'לוויין', en: 'Satellite', free: true, layers: [ESRI('World_Imagery'), ESRI('Reference/World_Boundaries_and_Places')], attr: esriAttr + ', Maxar, Earthstar Geographics', max: 19 },
    smooth:   { he: 'פסטל חלק', en: 'Smooth pastel', free: false, layers: [STADIA('alidade_smooth')], attr: stadiaAttr, max: 20 },
    toner:    { he: 'שחור-לבן מינימלי', en: 'Minimal black & white', free: false, layers: [STADIA('stamen_toner_lite')], attr: '&copy; Stadia Maps &copy; Stamen Design ' + osmAttr, max: 20 },
    terrain:  { he: 'טבע ושטח', en: 'Natural terrain', free: false, layers: [STADIA('stamen_terrain')], attr: '&copy; Stadia Maps &copy; Stamen Design ' + osmAttr, max: 18 }
  };
  S.mapStyle = () => (S.mapStyles[S.defaultMapStyle] ? S.defaultMapStyle : 'satellite');
  S.tiles = (map, key = S.mapStyle()) => {
    const st = S.mapStyles[key];
    map.getContainer().classList.remove(...Object.values(S.mapStyles).map((s) => s.cls).filter(Boolean));
    if (st.cls) map.getContainer().classList.add(st.cls);
    map.setMaxZoom(st.max);
    return st.layers.map((url, i) => L.tileLayer(url, { attribution: i ? '' : st.attr, maxZoom: st.max }).addTo(map));
  };

  // Bilingual inline text: S.L('שלום','Hello')
  S.L = (he, en) => `<span data-lang="he">${he}</span><span data-lang="en">${en}</span>`;

  // Logo: shows a clearly marked placeholder until SITE.logo / SITE.name are filled in
  S.logoHTML = () => `
    <a class="logo" href="index.html">
      ${S.logo
        ? `<img class="logo__img" src="${S.logo}" alt="">`
        : `<span class="logo__ph" title="Logo goes here">${S.icon('image')}<small>LOGO</small></span>`}
      <span class="logo__text"><b class="is-ph">${S.L(S.name.he, S.name.en)}</b><small>${S.L(S.tagline.he, S.tagline.en)}</small></span>
    </a>`;

  // ---------- property card (used on home + listings)
  S.card = (p) => {
    const imgs = p.images.map((src, i) => `<img src="${src}" alt="" loading="lazy" class="${i === 0 ? 'is-active' : ''}">`).join('');
    const dots = p.images.map((_, i) => `<i class="${i === 0 ? 'is-active' : ''}"></i>`).join('');
    const facts = [
      p.beds ? `<span>${S.icon('bed')}${p.beds}</span>` : '',
      p.baths ? `<span>${S.icon('bath')}${p.baths}</span>` : '',
      p.area ? `<span>${S.icon('area')}${p.area.toLocaleString('en-US')} ${S.t(S.dict.sqm)}</span>` : '',
      p.plot ? `<span>${S.icon('plot')}${p.plot.toLocaleString('en-US')} ${S.t(S.dict.sqm)}</span>` : ''
    ].join('');
    return `
      <article class="card" data-id="${p.id}">
        <a href="property.html?id=${p.id}">
          <div class="gal" data-gal>
            <span class="gal__tag">${S.t(S.dict.types[p.type])}</span>
            ${imgs}
            <button class="gal__btn gal__btn--prev" data-step="-1" aria-label="Previous photo">${S.icon('chevL', 'flip')}</button>
            <button class="gal__btn gal__btn--next" data-step="1" aria-label="Next photo">${S.icon('chevR', 'flip')}</button>
            <div class="gal__dots">${dots}</div>
          </div>
          <div class="card__body">
            <div class="card__price">${S.money(p.price)}</div>
            <h3 class="card__title">${S.t(p.title)}</h3>
            <div class="card__loc">${S.icon('pin')}${S.t(p.city)}, ${S.t(p.region)}</div>
            <div class="card__facts">${facts}</div>
          </div>
        </a>
      </article>`;
  };

  // Mini-gallery arrows inside cards (delegated, works for any card rendered later)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.gal__btn');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const gal = btn.closest('[data-gal]');
    const imgs = [...gal.querySelectorAll('img')];
    const dots = [...gal.querySelectorAll('.gal__dots i')];
    const cur = imgs.findIndex((i) => i.classList.contains('is-active'));
    const next = (cur + +btn.dataset.step + imgs.length) % imgs.length;
    imgs[cur].classList.remove('is-active'); dots[cur].classList.remove('is-active');
    imgs[next].classList.add('is-active'); dots[next].classList.add('is-active');
  });

  // ---------- contact forms (no backend yet — shows a thank-you message)
  S.bindForm = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      // TODO: connect to a form service (e.g. Formspree / email) once details are ready
      form.classList.add('is-sent');
    });
  };

  // ---------- header / footer
  const page = document.body.dataset.page;
  const cur = (name) => (page === name ? ' aria-current="page"' : '');

  const header = document.getElementById('site-header');
  if (header) {
    header.outerHTML = `
      <div class="topbar">
        <div class="container topbar__in">
          <div class="topbar__contact">
            <a href="${S.wa(S.t(S.dict.waHello))}" target="_blank" rel="noopener" data-wa-hello>${S.icon('whatsapp')}WhatsApp</a>
            <a href="tel:${S.phoneHref}" class="hide-xs">${S.icon('phone')}<bdi dir="ltr">${S.phone}</bdi></a>
            <a href="mailto:${S.email}" class="hide-sm">${S.icon('mail')}${S.email}</a>
          </div>
          <div class="lang-switch" role="group" aria-label="Language">
            <button type="button" data-set-lang="he">עברית</button>
            <button type="button" data-set-lang="en">English</button>
          </div>
        </div>
      </div>
      <header class="header">
        <div class="container nav">
          ${S.logoHTML()}
          <nav class="nav__links" id="nav-links">
            <a href="listings.html"${cur('listings')}>${S.L('נכסים למכירה', 'Properties')}</a>
            <a href="services.html"${cur('services')}>${S.L('השירותים שלנו', 'Our services')}</a>
            <a href="why-portugal.html"${cur('why')}>${S.L('למה פורטוגל', 'Why Portugal')}</a>
            <a href="contact.html"${cur('contact')}>${S.L('צרו קשר', 'Contact')}</a>
          </nav>
          <a class="btn btn--dark nav__cta" href="contact.html">${S.L('דברו איתנו', 'Talk to us')}</a>
          <button class="nav__burger" aria-label="Menu" aria-controls="nav-links" aria-expanded="false">${S.icon('menu')}</button>
        </div>
      </header>`;
  }

  const footer = document.getElementById('site-footer');
  if (footer) {
    const rangeLinks = S.ranges.map((r) => `<li><a href="listings.html?range=${r.id}" data-range-label="${r.id}"></a></li>`).join('');
    footer.outerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer__grid">
            <div>
              ${S.logoHTML()}
              <p>${S.L('ליווי אישי בעברית לקניית דירות, בתים וקרקעות בפורטוגל — מהחיפוש הראשון ועד קבלת המפתח.', 'Personal guidance for buying apartments, houses and land in Portugal — from the first search to the keys.')}</p>
            </div>
            <div>
              <h4>${S.L('נכסים לפי תקציב', 'Properties by budget')}</h4>
              <ul>${rangeLinks}</ul>
            </div>
            <div>
              <h4>${S.L('ניווט', 'Explore')}</h4>
              <ul>
                <li><a href="services.html">${S.L('השירותים שלנו', 'Our services')}</a></li>
                <li><a href="why-portugal.html">${S.L('למה פורטוגל', 'Why Portugal')}</a></li>
                <li><a href="listings.html">${S.L('כל הנכסים', 'All properties')}</a></li>
                <li><a href="contact.html">${S.L('צרו קשר', 'Contact')}</a></li>
              </ul>
            </div>
            <div>
              <h4>${S.L('דברו איתנו', 'Get in touch')}</h4>
              <ul>
                <li><a href="${S.wa(S.t(S.dict.waHello))}" target="_blank" rel="noopener" data-wa-hello>WhatsApp</a></li>
                <li><a href="tel:${S.phoneHref}"><bdi dir="ltr">${S.phone}</bdi></a></li>
                <li><a href="mailto:${S.email}">${S.email}</a></li>
              </ul>
            </div>
          </div>
          <div class="footer__bottom">
            <span>© ${new Date().getFullYear()} ${S.L(S.name.he, S.name.en)}</span>
            <span>${S.L('התמונות והנכסים באתר זה הם דוגמאות בלבד', 'Photos and listings on this site are samples only')}</span>
          </div>
        </div>
      </footer>
      <a class="wa-float" href="${S.wa(S.t(S.dict.waHello))}" target="_blank" rel="noopener" aria-label="WhatsApp" data-wa-hello>${S.icon('whatsapp')}</a>`;
  }

  // Burger menu
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.nav__burger');
    if (!b) return;
    const links = document.getElementById('nav-links');
    const open = links.classList.toggle('is-open');
    b.setAttribute('aria-expanded', open);
  });

  // ---------- language
  const applyLang = () => {
    const l = S.lang();
    document.querySelectorAll('[data-set-lang]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.setLang === l));
    document.querySelectorAll('[data-range-label]').forEach((el) => (el.innerHTML = S.rangeLabel(S.rangeById(el.dataset.rangeLabel))));
    document.querySelectorAll('[data-wa-hello]').forEach((a) => (a.href = S.wa(S.t(S.dict.waHello))));
    const t = document.body.dataset['title' + (l === 'he' ? 'He' : 'En')];
    document.title = (t ? t + ' | ' : '') + S.t(S.name);
  };

  S.setLang = (l) => {
    try { localStorage.setItem('lang', l); } catch (e) {}
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'he' ? 'rtl' : 'ltr';
    applyLang();
    document.dispatchEvent(new Event('langchange'));
  };

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-set-lang]');
    if (b) S.setLang(b.dataset.setLang);
  });

  // <span data-icon="phone"></span> placeholders in static HTML
  document.querySelectorAll('[data-icon]').forEach((el) => (el.innerHTML = S.icon(el.dataset.icon, el.dataset.iconClass || '')));

  applyLang();
  document.querySelectorAll('form[data-contact]').forEach(S.bindForm);
})();
