import React from 'react';
import {Link} from 'gatsby';

import FilterProduction from './fragments/pageListe/FilterProduction.js';
import RawHTML from './RawHtml.js';

/* import {templateMembership} from './helpers.js';  */
import './scss/page_liste.scss';

export default function ProductionListing({lang, list, group}) {
  console.log(lang, list, group);

  	return (
    	<>
    		<FilterProduction />
        <section id="liste">
          <p className="accroche-titre-phone">Description en une phrase de la catégorie activité....</p>
          <ul className="liste_objet" id="liste-productions">

          <li id="year-2018" className="list-year">
              <span>2018</span>
              <pre>░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</pre>
          </li>
          {list.map((p, index) => (
            <>
            <li data-item={index} data-type={p.type} className={`list-item ${p.type}`}>
              {/* Dans les données Json "data-type" fait référence à "productionTypes" */}
                <Link to={`/productions/${p.slugs[p.slugs.length - 1]}`}>
                <h1 data-level-1="title">{lang === "fr" ? p.title.fr : p.title.en}</h1>
                  <h2 data-level-2="authors">
                    <span>{p.authors}</span>
                </h2>
              </Link>

              <p className="date">{p.lastUpdated}</p>
              <p className="type">{p.type}</p>
            </li>

            <li className="item_accroche description" data-item-accroche={index}>
                <Link to={`/productions/${p.slugs[p.slugs.length - 1]}`}>
                    <span className="item_accroche_texte">
                      <RawHTML html={lang === "fr" ? p.description.fr : p.description.en} />
                    </span>
                    <span className="image-pre"></span>
                </Link>
            </li>
            </>
          ))}
          <li className="item_accroche accroche-titre">Description en une phrase de la catégorie Production</li>
        </ul>
        </section>
      </>
	 );
}

