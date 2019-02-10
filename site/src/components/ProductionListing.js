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
	      <ul className="liste_objet" id="liste-objet-activite">
		        <li id="year-2018" className="list-year">
		            2018
		        </li>
		        {list.map(p => (
            <>
              <li key={p.id} data-item={p.id} data-domaine={p.type} className={p.type}>
  						<Link to={`/productions/${p.slugs[p.slugs.length - 1]}`}>
  							<h1 data-level-1="title">{lang === "fr" ? p.title.fr : p.title.en}</h1>
                <h2 data-level-2="authors">
                  <span>{p.authors}</span>
	            	</h2>
              </Link>

  			      <p className="date">{p.lastUpdated}</p>
  						<p className="type">{p.type}</p>
  					</li>
  					<li className="item_accroche description" data-item-accroche="0"><Link to={`/productions/${p.slugs[p.slugs.length - 1]}`}><RawHTML html={lang === "fr" ? p.description.fr : p.description.en} /></Link></li>
            </>
				 ))}
		     </ul>
         </section>
	    </>
	 );
}
