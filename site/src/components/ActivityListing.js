import React from 'react';
import {Link} from 'gatsby';

import FilterActivity from './fragments/pageListe/FilterActivity.js';
import RawHTML from './RawHtml.js';

/* import {templateMembership} from './helpers.js';  */
import './scss/page_liste.scss';

export default function ActivityListing({lang, list}) {
  console.log(lang, list);

  	return (
    	<>
    		<FilterActivity />
        <section id="liste">
	       	<ul className="liste_objet" id="liste-objet-activite">
		        <li id="year-2018" className="list-year">
		            2018
		        </li>
		        {list.map(p => (
					<>
					<li key={p.id} data-item={p.id} data-domaine={p.type} className={p.type}>

						<Link to={p.slugs[p.slugs.length - 1]}>
							<h1 data-level-1="title">{p.name}</h1>
              <h2 data-level-2="authors">
                {(p.people || []).map(person => <span>{person.firstName} {person.lastName}</span>)}
            	</h2>
            </Link>

            <p className="date">{p.lastUpdated}</p>
						<p className="type">{p.type}</p>
					</li>
					<li className="item_accroche description" data-item-accroche="0"><Link to={p.slugs[p.slugs.length - 1]}><RawHTML html={lang === "fr" ? p.description.fr : p.description.en} /></Link></li>
					</>
				))}

				<li className="item_accroche accroche-titre">Description en une phrase de la catégorie.</li>
			</ul>
      </section>
	    </>
	 );
}
