const DEFAULT_MAX_SLUG_TOKENS = 15;

const OPTIONS = {
  lower: true,
  symbols: false
};

function slugify(slug, str) {
  const s = slug(str, OPTIONS);

  return s.split('-').slice(0, DEFAULT_MAX_SLUG_TOKENS).join('-');
}

module.exports = slug => ({
  activity(a) {
    return slugify(slug, a.name);
  },
  news(n) {
    if (!n.title)
      return '';

    return slugify(slug, n.title.fr || n.title.en || '');
  },
  people(p) {
    return slugify(slug, p.firstName + ' ' + p.lastName);
  },
  production(p) {
    if (!p.title)
      return '';

    return slugify(slug, p.title.fr || p.title.en || '');
  }
});
