// Runs in <head> before paint so the page never flashes in the wrong language/direction.
(function () {
  var lang = new URLSearchParams(location.search).get('lang');
  if (!lang) { try { lang = localStorage.getItem('lang'); } catch (e) {} }
  if (lang !== 'en') lang = 'he';
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
})();
