import React from 'react';
import {Link} from 'gatsby';
 

const MembresAssocies = ({lang, context, person}) => {
	
	// Si aucun fichier lié, retourne null
	if (person && person.length === 0) { return null; }

	// definissons une accroche
	let accroche; 
	if (lang === "fr") { 
		if (context && context === "people") {
			accroche = person && person.firstName + person && person.lastName + "a collaboré avec ces personnes"+ String.fromCharCode(8239) +":";
		}
		accroche = "Certains membres du Medialab sont liés à ce sujet"+ String.fromCharCode(8239) +":";
	} else {
		if (context && context === "people") {
			accroche = person && person.firstName + person && person.lastName + " had collaborate with this people";
		}		
		accroche = "Medialab's member are linked to this subject:";
	}

	return (
		<aside className="container personnes-associees-block" id="membres-associes">
		    <h1>{accroche}</h1>

		    <div className="contenu">
		        <ul className="liste_objet">
	            {(person || []).map(p => (
	            	<li data-type="people" key={p.id}>
	            		<Link to={`/people/${p.slugs[p.slugs.length - 1]}`}>
	            			{p.firstName} {p.lastName}
	            		</Link>
	            	</li>
	            ))}
	          	</ul>
	        </div>
		</aside>
	)
}

export default MembresAssocies;