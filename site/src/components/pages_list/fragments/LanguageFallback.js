import React from 'react';

export default function LanguageFallback({translatedAttribute, lang}) {
  if (translatedAttribute && translatedAttribute[lang] && translatedAttribute[lang] !== '')
    return <span>{translatedAttribute[lang]}</span>;
  else
    if (translatedAttribute && translatedAttribute[lang === 'fr' ? 'en' : 'fr'] && translatedAttribute[lang === 'fr' ? 'en' : 'fr'] !== '')
      return <span className="opacity">{translatedAttribute[lang === 'fr' ? 'en' : 'fr']}</span>;
    else
      return '';
}
