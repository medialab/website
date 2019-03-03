import React from 'react';
import {Link} from 'gatsby';


import FilterActivity from './fragments/pageListe/FilterActivity.js';
import RawHTML from './RawHtml.js';

/* import {templateMembership} from './helpers.js';  */
//import './scss/page_liste.scss';

export default function ActivityListing({lang, list}) {
  console.log(lang, list);

	let accroche

	if (lang === 'fr') {
		accroche = "Description en une phrase de la catégorie activité";
	}
	else {
		accroche = "Description in english en une phrase de la catégorie activité";
	}

  	return (
    	<>
		<FilterActivity lang={lang}/>
		<section id="liste">
			<p className="accroche-titre-phone">{accroche}</p>
       	 	<ul className="liste_objet" id="liste-activity">
       	 	{list.map((a, index) => (
				<>
				<li data-item={index} data-type={a.type} className={`list-item ${a.type}`}>
					<Link to={`/activities/${a.slugs[a.slugs.length - 1]}`}>
						<h1 data-level-1="baseline">{a.baseline && ( lang === "fr" ? a.baseline.fr : a.baseline.en)}</h1>
						<h2 data-level-2="title">{a.name}</h2>
						<p className="type">{a.type}</p>
						<p className="go-to-object"><span>〉</span></p>
					</Link>
				</li>
				<li className="item_accroche description" data-item-accroche={index}>
					<Link to={`/activities/${a.slugs[a.slugs.length - 1]}`}>
						<RawHTML html={lang === "fr" ? a.description.fr : a.description.en} />
					</Link>
				</li>
            	</>
          	))}
			<li className="item_accroche accroche-titre">Description en une phrase de la catégorie.</li>
		</ul>
		</section>
	    </>
	 );
}

/* Keep the code
<h2 data-level-2="authors">
	{(p.people || []).map(person => <span>{person.firstName} {person.lastName}</span>)}
</h2>
*/