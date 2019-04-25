import React from 'react';
import ProcessedImage from '../helpers/ProcessedImage.js';
import {SECTIONS} from '../helpers/sections';


import Logo from '../assets/svg/logo_medialab.svg';

const getRelatedElements = (order, data) => {
  return order.filter(id => {
    const spec = SECTIONS[id];

    return spec.exists(data);
  }).map(id => SECTIONS[id]);
};


export default function Nav({lang, data = {}, order = []}) {
  let coverImage = null;

  if (data && data.coverImage) {
    coverImage = (
  <div>
    {/*<p className="caption"><span>Je suis une légende</span> <span> 2019 — Image Créative Common.</span></p>*/}
    <img src={data.coverImage.url} alt={data.coverImage.url} />
     <ProcessedImage size="large" image={data.coverImage.processed ? data.coverImage.processed.large : null} />

  </div>
    );
  }

  return (
  <nav id="nav-inside-article">
    <div className="nav-inside-item" data-type="main-article">
      <a href="/">
        <Logo />
      </a>
    </div>

    <div className="nav-inside-item" id="img-container">
      <div id="activator">
      </div>
      <div id="img-article">
        <div className="container">
          { coverImage && coverImage}
        </div>
      </div>

    </div>
    {(getRelatedElements(order, data)).map(related => (
      <div key={related.id} className="nav-inside-item" data-type={related.id}>
        <p>
          <a href={`#${related.id}`}>{related[lang]}</a>
        </p>
      </div>)
    )}
  </nav>
  );
}
