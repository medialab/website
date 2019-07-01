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
    const title = (p.title && (p.title.fr || p.title.en)) || (p.spire && p.spire.generatedFields && p.spire.generatedFields.title && (p.spire.generatedFields.title.fr || p.spire.generatedFields.title.en))
    const date = (p.date || p.spire && p.spire.generatedFields && p.spire.generatedFields.date);
    const authors = (p.authors || (p.spire && p.spire.generatedFields && p.spire.generatedFields.authors))
    if (!title)
      return '';

    return slugify(slug, (date ? date + ' ' : '') + (title || '') + (authors ? ' ' + authors : ''));
  }
});
