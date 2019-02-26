import React from 'react';
import {Link} from 'gatsby';

import FilterProduction from './fragments/pageListe/FilterProduction.js';
import RawHTML from './RawHtml.js';
import {format as formatDate} from 'date-fns'
import {en, fr} from 'date-fns/locale'

/* import {templateMembership} from './helpers.js';  */
import './scss/page_liste.scss';

export default function ProductionListing({lang, list, group, types}) {
  console.log(lang, list, group, types);

  	return (
    	<>
    		<FilterProduction />

        <section id="liste">
          <p className="accroche-titre-phone">Description en une phrase de la catégorie production....</p>
          <ul className="liste_objet" id="liste-productions">

          <li id="year-2018" className="list-year">
              <span>2018</span>
              <pre>░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</pre>
          </li>

          {list.map((p, index) => (
              <>
              <li data-item={index} data-type={p.type} className={`list-item ${p.type}`}>
              <Link to={`/productions/${p.slugs[p.slugs.length - 1]}`}>
                  <h1 data-level-1="title">{lang === "fr" ? p.title.fr : p.title.en}</h1>
                  {p.authors && <h2 data-level-2="authors"><span>{p.authors}</span></h2>}
                  {p.date && <p className="date">{p.date}</p>}
                  <p className="type" data-icon="production">
                  {lang === "fr" ? p.groupLabel.fr : p.groupLabel.en} -  {lang === "fr" ? p.typeLabel.fr : p.typeLabel.en}
                  </p>
                  <p className="go-to-object"><span>〉</span></p>
                </Link>
              </li>
              <li className="item_accroche description" data-item-accroche={index}>
                <Link to={`/productions/${p.slugs[p.slugs.length - 1]}`}>
                      <RawHTML html={lang === "fr" ? p.description.fr : p.description.en} />
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
