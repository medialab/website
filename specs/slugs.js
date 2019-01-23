const slug = require('slug');

const DEFAULT_MAX_SLUG_TOKENS = 15;

const OPTIONS = {
  lower: true,
  symbols: false
};

function slugify(str) {
  const s = slug(str, OPTIONS);

  return s.split('-').slice(0, DEFAULT_MAX_SLUG_TOKENS).join('-');
}

module.exports = {
  activity(a) {
    return slugify(a.name);
  },
  news(n) {
    if (!n.title)
      return '';

    return slugify(n.title.fr || n.title.en || '');
  },
  people(p) {
    return slugify(p.firstName + ' ' + p.lastName);
  },
  production(p) {
    if (!p.title)
      return '';

    return slugify(p.title.fr || p.title.en || '');
  }
};
