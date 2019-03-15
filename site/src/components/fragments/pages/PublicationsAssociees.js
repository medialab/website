import React from 'react';
import {Link} from 'gatsby';

const PublicationsAssociees = ({lang, related, productions}) => {

	if (!productions || productions.length === 0)
    return null;

	let accroche;
	if (lang === 'fr') {
    accroche = related.fr + String.fromCharCode(8239) + ':';
  }
  else {
    accroche = related.en + ':';
	}

	return (
    <aside className="container elements-associes-block" id="productions-associes">
      <h1><span data-icon="production" /> {accroche}</h1>
      <div className="contenu">
        <ul className="liste_objet">
          {productions.map(p => (
            <li key={p.permalink.fr} data-type="production" className="item">
              <Link to={p.permalink[lang]}>
                <h1 data-level-2="title">{p.title[lang] || p.title.fr || p.title.en}</h1>
                <h2 data-level-2="title">{p.authors}</h2>
                <p className="type">{p.groupLabel[lang]}</p>
              </Link>
              <a href="" className="complement">
                <h2 data-level-2="description">{p.description[lang] || p.description.fr || p.description.en}</h2>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
	);
};

export default PublicationsAssociees;
