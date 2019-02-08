import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';

const PublicationsAssocies = ({person}) => {
	return (
		<aside className="container elements-associes-block" id="publications_liees">
		    <h1>{person.firstName} {person.lastName} est à l'origine de plusieurs publications</h1>

		    <div className="contenu">
		        <ul className="liste_objet">
		        {	/*PublicationsAssocies.map(p => (
		            <li data-type="production">
		                <Link to="/production">
		                    <h1 data-level-="baseline">Baseline de la production</h1>
		                    <h2 data-level-="title">Nom de l'objet</h2>
		                    <p className="type">Production / Communication</p>
		                </Link>
		            </li>
		            ))	*/	}
		        	<li data-type="production">
		                <Link to="/production">
		                    <h1 data-level-="baseline">Baseline de la production</h1>
		                    <h2 data-level-="title">Nom de l'objet</h2>
		                    <p className="type">Production / Communication</p>
		                </Link>
		            </li>
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