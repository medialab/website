import React from 'react';
import {Link} from 'gatsby';
import {SECTIONS} from '../../helpers/sections';

const ProductionsAssociees = ({lang, productions}) => {

  const related = SECTIONS.productions;

	if (!productions || productions.length === 0)
    return null;

	let accroche;
	if (lang === 'fr') {
    accroche = related.fr + String.fromCharCode(8239);
  }
  else {
    accroche = related.en;
	}

	return (
    <aside className="container elements-associes-block" id="productions">
      <h1><span data-icon="production" /> {accroche}</h1>
      <div className="contenu">
        <ul className="liste_objet">
          {productions.map(p => (
            <li key={p.permalink.fr} data-type="production" className="item">
              <Link to={p.permalink[lang]} className="accroche">
                <h1 data-level-2="title">{p.title[lang] || p.title.fr || p.title.en}</h1>
                <h2 data-level-2="title">{p.authors}</h2>
                <p className="type">{p.groupLabel[lang]}</p>
              </Link>
              {/* <Link to={p.permalink[lang]} className="complement">
                <h2 data-level-2="description">{p.description[lang] || p.description.fr || p.description.en}</h2>
              </Link> */}
            </li>
          ))}
        </ul>
      </div>
    </aside>
	);
};

export default ProductionsAssociees;
