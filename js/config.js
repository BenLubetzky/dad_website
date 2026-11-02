// Business details — edit these in one place and the whole site updates.
// All values below are placeholders until the real details are provided.
window.SITE = {
  name: { he: '[שם העסק]', en: '[Business name]' },   // PLACEHOLDER
  logo: null,                                          // PLACEHOLDER — e.g. 'images/logo.svg'
  tagline: { he: 'נדל״ן בפורטוגל', en: 'Portugal Real Estate' },

  phone: '+351 900 000 000',      // shown on the site
  phoneHref: '+351900000000',     // used for tel: links (no spaces)
  whatsapp: '351900000000',       // international format, digits only
  email: 'info@example.com',

  // Map look — one of: gray, sand, natgeo, topo, soft, street, satellite, smooth, toner, terrain
  defaultMapStyle: 'satellite',

  // Price ranges — each one is its own listings page (listings.html?range=N)
  ranges: [
    { id: 1, min: 0,      max: 100000 },
    { id: 2, min: 100000, max: 150000 },
    { id: 3, min: 150000, max: 200000 },
    { id: 4, min: 200000, max: 250000 },
    { id: 5, min: 250000, max: 300000 },
    { id: 6, min: 300000, max: null }
  ]
};
