import React from 'react';

export default function RawHtml({html}) {
  return <div dangerouslySetInnerHTML={{__html: html}} />;
}
