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
	//Je pense que nous n'avons pas assez de donnée dans le CMS pour mener à bien cette fonction
	// Néanmoins la logique serait :  Si et seulement si il existe une Image Générée créer cet élément
	// Cet élément est composé d'une image lambda et de son corrolaire Image Générée
	let coverImage = null;

	if (data && data.coverImage) {
		coverImage = (
  <div>
    <img src={data.coverImage.url} alt={data.coverImage.url} />
     <ProcessedImage size="large" image={data.coverImage.processed ? data.coverImage.processed.large : null} />

  </div>
		);
	}

	return (
  <nav id="nav-inside-article">
    <div className="nav-inside-item" data-type="main-article">
      <a href="#topbar">
        <Logo />
      </a>
    </div>
    
    <div className="nav-inside-item" id="img-article">
    { coverImage && coverImage}
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