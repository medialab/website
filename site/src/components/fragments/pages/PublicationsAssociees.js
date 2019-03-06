import React from 'react';
import {Link} from 'gatsby';
 
const PublicationsAssociees = ({lang, person, context, productions}) => {

	if (productions && productions.length === 0) { return null; }

	// definissons une accroche
	let accroche; 
	if (lang === "fr") { 
		if (context && context === "people") {
			accroche = person && person.firstName + person && person.lastName + "est à l'origine de plusieurs productions"+ String.fromCharCode(8239) +":";
		}
		accroche = "Il existe des productions liée à ce sujet"+ String.fromCharCode(8239) +":";
	} else {
		if (context && context === "people") {
			accroche = person && person.firstName + person && person.lastName + " has collaborate on many productions";
		}		
		accroche = "There is publication linked to this subject:";
	}
console.log(productions);
	return (
		<aside className="container elements-associes-block" id="productions-associes">
		    <h1>{accroche}</h1>

		    <div className="contenu">
		        <ul className="liste_objet">
		        {(productions || []).map(p => (
		            <li data-type="production" className="item">
		                <Link to={`/productions/${p.slugs[p.slugs.length - 1]}`}>
		                    <h1 data-level-="baseline">{lang === "fr" ? p.description.fr : p.description.en}</h1>
		                    <h2 data-level-="title">{lang === "fr" ? p.title.fr : p.title.en}</h2>
		                    <p className="type">{p.type}</p>
		                </Link>
		            </li>
		            ))}
		        </ul>
		    </div>
		</aside>
	)
}

export default PublicationsAssociees;
 