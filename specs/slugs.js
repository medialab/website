const slug = require('slug');

const DEFAULT_MAX_SLUG_TOKENS = 15;

function slugify(str) {
  const s = slug(str, {lower: true});

  return s.split('-').slice(0, DEFAULT_MAX_SLUG_TOKENS).join('-');
}

module.exports = {
  activity(a) {
    return slugify(a.name);
  },
  news(n) {
    return slugify(n.title ? (n.title.fr || '') : '');
  },
  people(p) {
    return slugify(p.firstName + ' ' + p.lastName);
  },
  production(p) {
    return slugify(p.title ? (p.title.fr || '') : '');
  }
};
