import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';

const PublicationsAssocies = ({lang, person, publications}) => {
	/*if (publications && publications.length === 0) { return null; }*/
	
	/*
	let accroche;
	accroche = {lang === "fr" ? "Il existe des publications liée à ce sujet&thinsp;:" : "There is pulblication linked to this subject:" }
	
	{ publications && publications.length > 0 ? ( 
		// Si contexte = page publication
	    accroche = {lang === "fr" ? "Cette publication est liée à plusieurs autres&thinsp;:" : "This publication is linked to others:" }
	)}
	
	{ personne && personne.length > 0 ? ( 
		// Si contexte = page personne
		accroche = {lang === "fr" ? `${person && person.firstName} ${person && person.lastName} est à l'origine de plusieurs publications&thinsp;:` : `${person && person.firstName} ${person && person.lastName} has collaborate on many publications` }
	)}
	*/
	
	//else{
		return (
			<aside className="container elements-associes-block" id="publications_liees">
			    <h1>{/*accroche*/} Il existe des publications liée à ce sujet&thinsp;:</h1>

			    <div className="contenu">
			        <ul className="liste_objet">
			        {(publications || []).map(p => (
			            <li data-type="production">
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
	//}
}

export default PublicationsAssocies;


/*
<div>
  Related people:
  <ul>
    {(news.people || []).map(p => <li key={p.id}>{p.firstName} {p.lastName}</li>)}
  </ul>
</div>
*/
