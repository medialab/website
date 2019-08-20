import React from 'react';

export default function LanguageFallback({translatedAttribute, lang}) {
  if (
    translatedAttribute &&
    translatedAttribute[lang]
  )
    return <span>{translatedAttribute[lang]}</span>;

  const otherLang = lang === 'fr' ? 'en' : 'fr';

  if (
    translatedAttribute &&
    translatedAttribute[otherLang]
  )
    return <span>{translatedAttribute[otherLang]}</span>;

  return '';
}
