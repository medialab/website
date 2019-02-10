import React from 'react';
import {Link} from 'gatsby';

import FilterProduction from './fragments/pageListe/FilterProduction.js';
import RawHTML from './RawHtml.js';

/* import {templateMembership} from './helpers.js';  */
import './scss/page_liste.scss';

export default function ProductionListing({lang, list}) {
  console.log(lang, list);

  	return (
    	<>
    		<FilterProduction />
        <section id="liste">
          <p class="accroche-titre-phone">Description en une phrase de la catégorie activité....</p>
          <ul class="liste_objet" id="liste-productions">

          <li id="year-2018" class="list-year">
              <span>2018</span>
              <pre>░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</pre>
          </li>
          {list.map(p => (
              <>
              <li data-item={p.id} data-type={p.type} class={`list-item ${p.type}`}>
                {/* Dans les données Json "data-type" fait référence à "productionTypes" */}
                  <Link to={p.slugs[p.slugs.length - 1]}>
                  <h1 data-level-1="title">{lang === "fr" ? p.title.fr : p.title.en}</h1>
                    <h2 data-level-2="authors">
                      <span>{p.authors}</span>
                  </h2>
                </Link>
                      
                <p class="date">{p.lastUpdated}</p>
                <p class="type">{p.type}</p>
              </li>

              <li class="item_accroche description" data-item-accroche={p.id}>
                  <Link to={p.slugs[p.slugs.length - 1]}>
                      <span class="item_accroche_texte">
                        {lang === "fr" ? p.description.fr : p.description.en}
                      </span>
                      <span class="image-pre"></span>
                  </Link>
              </li>
            </>
          ))}
          <li class="item_accroche accroche-titre">Description en une phrase de la catégorie Production</li>
        </ul>
        </section>
      </>
	 );
}
