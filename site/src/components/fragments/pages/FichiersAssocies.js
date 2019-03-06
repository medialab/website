import React from 'react';
import {Link} from 'gatsby';
 

const FichiersAssocies = ({lang, attachments, context, person}) => {
	
	// Si aucun fichier lié, retourne null
	if (attachments && attachments.length === 0) { return null; }

	// definissons une accroche
	let accroche; 
	if (lang === "fr") { 
		if (context && context === "people") {
			accroche = person && person.firstName + person && person.lastName + "est en lien avec plusieurs fichiers"+ String.fromCharCode(8239) +":";
		}
		accroche = "Il existe des fichiers associés à ce sujet"+ String.fromCharCode(8239) +":";
	} else {
		if (context && context === "people") {
			accroche = person && person.firstName + person && person.lastName + " is linked to this files";
		}		
		accroche = "There is files linked to this subject:";
	}

	return (
		<aside className="container fichiers-associes-block" id="fichiers-associes">
		    <h1>{accroche}</h1>

		    <div className="contenu">
		        <ul className="liste_objet">
		        {(attachments || []).map(file => (
		            <li data-type="files" key={file.id} className="item">
		                <Link to={file.value}>
							<p class="icon">⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚⦚<span>&nbsp;</span><span>{file.type}</span></p>
							<p class="name">{file.label}</p>
		                </Link>
					</li>		            
		            ))}
		        </ul>
		    </div>
		</aside>
	)
}

export default FichiersAssocies;