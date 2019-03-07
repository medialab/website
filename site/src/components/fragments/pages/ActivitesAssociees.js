import React from 'react';
import {Link} from 'gatsby';
 

const ActivitesAssociees = ({lang, context, activities, person}) => {
  
  // Si aucun fichier lié, retourne null
  if (!activities || activities.length === 0)
    return null;

  // definissons une accroche
  let accroche;
  if (lang === "fr") { 
    if (context && context === "people") {
      accroche = person && person.firstName + person && person.lastName + "est en lien avec ces activité"+ String.fromCharCode(8239) +":";
    }
    accroche = "Il existe des activités associés à ce sujet"+ String.fromCharCode(8239) +":";
  } else {
    if (context && context === "people") {
      accroche = person && person.firstName + person && person.lastName + " is linked to this activities";
    }		
    accroche = "There is activities linked to this subject:";
  }

  return (
    <aside className="container fichiers-associes-block" id="activites-associees">
      <h1>{accroche}</h1>

      <div className="contenu">
        <ul className="liste_objet">
          {activities.map(a => (
            <li key={a.id} data-type="activities" className="item">
              <Link to={`/activities/${a.slugs[a.slugs.length - 1]}`}>
                <h1 data-level-="baseline">{lang === 'fr' ? a.baseline.fr : a.description.en}</h1>
                <h2 data-level-="name">{lang === 'fr' ? a.name : a.name}</h2>
                <p className="type">{a.type}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default ActivitesAssociees;