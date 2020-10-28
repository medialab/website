import React from 'react';

export default function RawHtml({html, wrapper = 'div'}) {
  if (wrapper === 'div')
    return <div dangerouslySetInnerHTML={{__html: html}} />;

  if (wrapper === 'span')
    return <span dangerouslySetInnerHTML={{__html: html}} />;

  throw new Error('RawHtml: expecting `div` or `span` wrapper.');
}
