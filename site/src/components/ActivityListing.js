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
       	 	<ul className="liste_objet" id="liste-activity">
       	 	{list.map(a => (
				<>
				<li data-item={a.id} data-type={a.type} className={`list-item ${a.type}`}>
					<Link to={a.slugs[a.slugs.length - 1]}>
						<h1 data-level-1="baseline">{a.baseline && ( lang === "fr" ? a.baseline.fr : a.baseline.en)}</h1>
						<h2 data-level-2="title">{a.name}</h2>
						<p className="type">{a.type}</p>
					</Link>
				</li>
				<li className="item_accroche description" data-item-accroche={a.id}>
					<Link to={a.slugs[a.slugs.length - 1]}>
						{lang === "fr" ? a.description.fr : a.description.en}
					</Link>
				</li>
            	</>
          	))}
			</ul>
		</section>
	    </>
	 );
}
