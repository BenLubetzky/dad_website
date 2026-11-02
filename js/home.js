(function () {
  const S = window.SITE;
  const props = window.PROPERTIES;

  // ---------- price buttons (one per price range page)
  const grid = document.getElementById('price-grid');
  const renderPrices = () => {
    grid.innerHTML = S.ranges.map((r) => {
      const n = props.filter((p) => S.inRange(p, r)).length;
      return `<a class="price-btn" href="listings.html?range=${r.id}">
        <strong>${S.rangeLabel(r)}</strong>
        <span>${n} ${S.t(n === 1 ? S.dict.property : S.dict.properties)}</span>
      </a>`;
    }).join('');
  };

  // ---------- hero slider (Engel & Völkers style, progress bars)
  const slides = [
    { img: '1513735492246-483525079686', he: 'פורטו, נהר הדורו', en: 'Porto, Douro River', tagHe: 'צפון פורטוגל', tagEn: 'Northern Portugal' },
    { img: '1536663815808-535e2280d2c2', he: 'ליסבון, אלפמה', en: 'Lisbon, Alfama', tagHe: 'אזור ליסבון', tagEn: 'Lisbon area' },
    { img: '1555881400-74d7acaacd8b', he: 'פורטו, ריבירה', en: 'Porto, Ribeira', tagHe: 'צפון פורטוגל', tagEn: 'Northern Portugal' },
    { img: '1585208798174-6cedd86e019a', he: 'ליסבון, מרכז העיר', en: 'Lisbon, city centre', tagHe: 'אזור ליסבון', tagEn: 'Lisbon area' }
  ];
  const slider = document.getElementById('slider');
  slider.innerHTML = slides.map((s, i) => `
    <div class="slide${i === 0 ? ' is-active' : ''}">
      <img src="https://images.unsplash.com/photo-${s.img}?auto=format&fit=crop&w=2000&q=75" alt="" ${i ? 'loading="lazy"' : ''}>
      <div class="slide__cap"><b>${S.L(s.he, s.en)}</b><span>${S.L(s.tagHe, s.tagEn)}</span></div>
    </div>`).join('') +
    `<div class="slider__bars">${slides.map((_, i) => `<button class="${i === 0 ? 'is-active' : ''}" aria-label="Slide ${i + 1}"><i></i></button>`).join('')}</div>`;

  const slideEls = slider.querySelectorAll('.slide');
  const bars = slider.querySelectorAll('.slider__bars button');
  let cur = 0, timer;
  const go = (n) => {
    slideEls[cur].classList.remove('is-active'); bars[cur].classList.remove('is-active');
    cur = (n + slides.length) % slides.length;
    slideEls[cur].classList.add('is-active');
    void bars[cur].offsetWidth; // restart progress animation
    bars[cur].classList.add('is-active');
    clearTimeout(timer); timer = setTimeout(() => go(cur + 1), 6000);
  };
  bars.forEach((b, i) => b.addEventListener('click', () => go(i)));
  timer = setTimeout(() => go(1), 6000);

  // ---------- featured: one property from four different budgets
  const featured = document.getElementById('featured');
  const renderFeatured = () => {
    const picks = [2, 3, 4, 5].map((id) => props.find((p) => S.inRange(p, S.rangeById(id)))).filter(Boolean);
    featured.innerHTML = picks.map(S.card).join('');
  };

  // ---------- team (placeholders until real photos + names arrive)
  // To use a real photo later: { photo: 'images/team/name.jpg', name: {...}, role: {...} }
  const team = [1, 2, 3, 4].map((n) => ({
    photo: null,
    name: { he: `[שם חבר צוות ${n}]`, en: `[Team member ${n} name]` },
    role: { he: '[תפקיד]', en: '[Role]' }
  }));
  const teamGrid = document.getElementById('team-grid');
  teamGrid.innerHTML = team.map((m) => `
    <div class="member">
      ${m.photo
        ? `<img class="member__photo" src="${m.photo}" alt="">`
        : `<div class="member__photo member__photo--ph">${S.icon('user')}<small>${S.L('תמונה', 'Photo')}</small></div>`}
      <div>
        <b class="member__name">${S.L(m.name.he, m.name.en)}</b>
        <span class="member__role">${S.L(m.role.he, m.role.en)}</span>
      </div>
    </div>`).join('');

  const render = () => { renderPrices(); renderFeatured(); };
  render();
  document.addEventListener('langchange', render);
})();
