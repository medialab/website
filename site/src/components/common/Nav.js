import React from 'react';
import {SECTIONS} from '../helpers/sections';

const getRelatedElements = (order, data) => {
  return order.filter(id => {
    const spec = SECTIONS[id];

    return spec.exists(data);
  }).map(id => SECTIONS[id]);
};

export default function Nav({lang, data = {}, order = []}) {

  const ariaLabel = lang === 'fr' ?
    'Aller à ' + related.fr :
    'Go to ' + related.en;

  return (
    <nav className="main-nav" id="nav-inside-article" role="navigation">
      <ul>
        {(getRelatedElements(order, data)).map(related => (
          <li key={related.id} className="nav-inside-item" data-type={related.id}>
            <a href={`#${related.id}`} aria-label={ariaLabel}>{related[lang]}</a>
          </li>)
        )}
      </ul>
    </nav>
  );
}
