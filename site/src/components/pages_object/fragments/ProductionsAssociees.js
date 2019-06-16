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
              <Link to={p.permalink[lang]}>
                <div className="bandeau">
                  <p className="type-production" data-icon="production"> {p.groupLabel[lang]}</p> 
                  
                  {/* {p.typeLabel !== 'media' && 
                    <p className="subtype-production"> {lang === 'fr' ? <span>{p.typeLabel.fr}</span> : <span>{p.typeLabel.en}</span>}</p> 
                  } */}
                  {p.authors && <p className="authors">{p.authors}</p>}
                  
                </div>
                <hgroup>
                  <h1 data-level-1="title" >{lang === 'fr' ? p.title.fr : p.title.en}</h1>
                </hgroup>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
	);
};

export default ProductionsAssociees;
