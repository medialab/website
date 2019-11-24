import React from 'react';

import RawHtml from './RawHtml';

export default function HtmlFallback({content = {}, lang = 'en', wrapper = 'div', ...props}) {
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
  else {
    return null;
  }

  // TODO: this is frankly no ideal...
  if (wrapper === 'h3') {
    return (
      <h3 {...props} className={`${isAFallback ? 'html-fallback-active' : 'html-fallback'} ${props.className ? props.className : ''}`}>
        {actualContent && <RawHtml html={actualContent} wrapper="span" />}
      </h3>
    );
  }

  if (wrapper === 'h2') {
    return (
      <h2 {...props} className={`${isAFallback ? 'html-fallback-active' : 'html-fallback'} ${props.className ? props.className : ''}`}>
        {actualContent && <RawHtml html={actualContent} wrapper="span" />}
      </h2>
    );
  }

  return (
    <div {...props} className={`${isAFallback ? 'html-fallback-active' : 'html-fallback'} ${props.className ? props.className : ''}`}>
      {actualContent && <RawHtml html={actualContent} />}
    </div>
  );
}
