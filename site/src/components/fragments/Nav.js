import React from 'react';
import {Link, withPrefix} from 'gatsby';

import Logo from '../assets/svg/logo_medialab.svg';

const getRelatedElements = (relatedElements, object) => {
	return relatedElements.filter(({exist}) => {
		return !(typeof exist === 'function') || exist(object);
	});
};


export default function Nav({lang, object = {}, related = []}) {
	//Je pense que nous n'avons pas assez de donnée dans le CMS pour mener à bien cette fonction
	// Néanmoins la logique serait :  Si et seulement si il existe une Image Générée créer cet élément
	// Cet élément est composé d'une image lambda et de son corrolaire Image Générée
	let coverImage = null;
	console.log(object.coverImage)
	if (object && object.coverImage) {
		coverImage = (
  <div>
    <img src={object.coverImage.url} alt={object.coverImage.url} />
    <div className="image-generator">{object.coverImage.processed ? object.coverImage.processed.small : null}</div>
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
      {coverImage}
    </div>
    {(getRelatedElements(related, object)).map(related => (
      <div key={related.id} className="nav-inside-item" data-type={related.id}>
        <p>
          <a href={`#${related.id}`}>{related[lang]}</a>
        </p>
      </div>)
    )}
  </nav>
	);
}
