(function () {
  const S = window.SITE;
  const props = window.PROPERTIES;

  let range = S.rangeById(new URLSearchParams(location.search).get('range')) || null;

  const els = {
    title: document.getElementById('listings-title'),
    chips: document.getElementById('chips'),
    count: document.getElementById('count'),
    list: document.getElementById('list'),
    toggle: document.getElementById('map-toggle')
  };

  // ---------- map
  const map = L.map('map', { zoomControl: true, scrollWheelZoom: true }).setView([39.6, -8.2], 7);
  S.tiles(map);

  // Far away: nearby homes merge into one numbered bubble. Zoom in (or click it): individual price pins.
  const layer = L.markerClusterGroup({
    maxClusterRadius: 60,
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    iconCreateFunction: (c) => {
      const n = c.getChildCount();
      const size = n < 10 ? 44 : n < 50 ? 52 : 60;
      return L.divIcon({
        className: 'cluster-wrap',
        html: `<div class="cluster" style="width:${size}px;height:${size}px"><b>${n}</b></div>`,
        iconSize: [size, size]
      });
    }
  }).addTo(map);
  const markers = {};

  const pinIcon = (p, active) => L.divIcon({
    className: 'pin-wrap',
    html: `<div class="pin${active ? ' is-active' : ''}">${S.short(p.price)}</div>`,
    iconSize: [0, 0]
  });

  const setActive = (id, on) => {
    const m = markers[id];
    // highlight the pin, or the group bubble it's currently hidden inside
    const shown = m && layer.getVisibleParent(m);
    const el = shown && shown.getElement() && shown.getElement().querySelector('.pin, .cluster');
    if (el) { el.classList.toggle('is-active', on); if (shown === m) m.setZIndexOffset(on ? 1000 : 0); }
    const card = els.list.querySelector(`.card[data-id="${id}"]`);
    if (card) card.classList.toggle('is-hover', on);
  };

  const popup = (p) => `
    <a class="popup" href="property.html?id=${p.id}">
      <img src="${p.images[0]}" alt="">
      <div dir="${document.documentElement.dir}">
        <b>${S.money(p.price)}</b>
        <span>${S.t(p.title)} · ${S.t(p.city)}</span>
        <span style="color:var(--gold-d);font-weight:600;margin:0">${S.t(S.dict.view)} ${S.lang() === 'he' ? '←' : '→'}</span>
      </div>
    </a>`;

  // ---------- render
  const filtered = () => props.filter((p) => S.inRange(p, range)).sort((a, b) => a.price - b.price);

  const render = (fit) => {
    const he = S.lang() === 'he';
    const items = filtered();

    els.title.innerHTML = range
      ? (he ? 'נכסים למכירה ' : 'Properties ') + S.rangeLabel(range)
      : (he ? 'נכסים למכירה בפורטוגל' : 'Properties for sale in Portugal');
    const t = (range ? S.rangeLabel(range).replace(/<[^>]+>/g, '') + ' · ' : '') + S.t({ he: 'נכסים למכירה', en: 'Properties' });
    document.title = t + ' | ' + S.t(S.name);

    els.chips.innerHTML =
      `<button class="chip" data-range="" aria-pressed="${!range}">${S.t(S.dict.all)}</button>` +
      S.ranges.map((r) => `<button class="chip" data-range="${r.id}" aria-pressed="${range && range.id === r.id}">${S.rangeLabel(r)}</button>`).join('');

    els.count.textContent = `${items.length} ${S.t(items.length === 1 ? S.dict.property : S.dict.properties)}`;

    els.list.innerHTML = items.length
      ? items.map(S.card).join('')
      : `<div class="empty"><h3>${S.t({ he: 'אין כרגע נכסים בטווח הזה', en: 'No properties in this range right now' })}</h3>
           <p class="muted">${S.t({ he: 'ספרו לנו מה אתם מחפשים ונמצא בשבילכם.', en: "Tell us what you're looking for and we'll find it for you." })}</p>
           <a class="btn btn--wa" href="${S.wa(S.t(S.dict.waHello))}" target="_blank" rel="noopener">${S.icon('whatsapp')} WhatsApp</a></div>`;

    updateToggle();

    layer.clearLayers();
    Object.keys(markers).forEach((k) => delete markers[k]);
    items.forEach((p) => {
      const m = L.marker([p.lat, p.lng], { icon: pinIcon(p, false), riseOnHover: true })
        .bindPopup(popup(p), { closeButton: false, offset: [0, -28], minWidth: 240 });
      m.prop = p;
      m.on('mouseover', () => setActive(p.id, true));
      m.on('mouseout', () => setActive(p.id, false));
      m.on('click', () => {
        const card = els.list.querySelector(`.card[data-id="${p.id}"]`);
        if (card && getComputedStyle(els.list).display !== 'none') card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      m.addTo(layer);
      markers[p.id] = m;
    });

    if (fit && items.length) {
      map.fitBounds(L.latLngBounds(items.map((p) => [p.lat, p.lng])), { padding: [60, 60], maxZoom: 11 });
    }
  };

  // card ↔ pin hover sync
  els.list.addEventListener('mouseover', (e) => {
    const c = e.target.closest('.card');
    if (c && !c.contains(e.relatedTarget)) setActive(c.dataset.id, true);
  });
  els.list.addEventListener('mouseout', (e) => {
    const c = e.target.closest('.card');
    if (c && !c.contains(e.relatedTarget)) setActive(c.dataset.id, false);
  });

  // range chips — switch without reloading
  els.chips.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b) return;
    range = S.rangeById(b.dataset.range) || null;
    const url = new URL(location.href);
    range ? url.searchParams.set('range', range.id) : url.searchParams.delete('range');
    history.replaceState(null, '', url);
    render(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // mobile: list / map toggle
  function updateToggle() {
    const showing = document.body.classList.contains('show-map');
    els.toggle.innerHTML = showing ? `${S.icon('menu')} ${S.t(S.dict.list)}` : `${S.icon('pin')} ${S.t(S.dict.map)}`;
  }
  els.toggle.addEventListener('click', () => {
    const showing = document.body.classList.toggle('show-map');
    updateToggle();
    // line the map up right under the sticky header + filter bar
    window.scrollTo({ top: showing ? document.querySelector('.topbar').offsetHeight : 0 });
    if (showing) {
      map.invalidateSize();
      const items = filtered();
      if (items.length) map.fitBounds(L.latLngBounds(items.map((p) => [p.lat, p.lng])), { paddingTopLeft: [40, 40], paddingBottomRight: [40, 100], maxZoom: 11 });
    }
  });

  // map height on phones = screen minus the sticky filter bar
  const bar = document.querySelector('.listings-bar');
  new ResizeObserver(() => document.documentElement.style.setProperty('--bar-h', bar.offsetHeight + 'px')).observe(bar);

  render(true);
  document.addEventListener('langchange', () => render(false));
})();
