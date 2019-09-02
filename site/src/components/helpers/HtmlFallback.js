import React from 'react';

import RawHtml from './RawHtml';

export default function HtmlFallback({
    content = {},
    lang = 'en',
    Tag = 'div',
    ...props
}) {
  let isAFallback;
  let actualContent;
  const otherLang = lang === 'fr' ? 'en' : 'fr';

  if (content && content[lang] && content[lang].length) {
    actualContent = content[lang];
  }
  else if (content && content[otherLang]) {
      isAFallback = true;
      actualContent = content[otherLang];
  }
  else return null;

  return (
    <Tag {...props} className={`${isAFallback ? 'html-fallback-active' : 'html-fallback'} ${props.className ? props.className : ''}`}>
        {actualContent && <RawHtml html={actualContent} />}
    </Tag>
  );
}
