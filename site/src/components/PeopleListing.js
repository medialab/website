import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';

import FiltreEquipe from './fragments/pageEquipe/FiltreEquipe.js';

/*import RawHtml from './RawHtml';*/
import {templateMembership} from './helpers.js';
//import './scss/page_equipe.scss';

import Img from './assets/images/sample/D-Cardon-bis.jpg';

export default function PeopleListing({lang, list}) {
	console.log(lang, list);

	return (
		<>
		<FiltreEquipe lang={lang} />
		<section id="liste_equipe">
		    <ul className="liste_equipe">
			{list.map(p => (
	          	<li key={p.id} data-item={p.id} data-domain={p.domain} data-active={p.active ? "yes" : "no"} data-member={p.membership === "member" ? "yes" : "no"}>
				    <Link to={`/people/${p.slugs[p.slugs.length - 1]}`}>
		                <figure><img src={p.coverImage ? p.coverImage.url : Img} alt={lang === "fr" ? "Photo de profil de " + p.firstName + p.lastName : p.firstName + p.lastName + " profil picture"} /></figure>
		                <hgroup>
						    <h1 data-level-1="name">{p.firstName} {p.lastName}</h1>
		                    <h2 data-level-2="role" data-type="role">{lang === "fr" ? p.role.fr : p.role.en}</h2>
		                </hgroup>
		            </Link>
				</li>
	        ))}
			</ul>
		</section>
		</>
	);
}
