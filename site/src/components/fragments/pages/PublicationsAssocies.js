import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';

const PublicationsAssocies = ({lang, person, publications}) => {
	return (
		<aside className="container elements-associes-block" id="publications_liees">
		    <h1>{person && person.firstName} {person && person.lastName} est à l'origine de plusieurs publications</h1>

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
