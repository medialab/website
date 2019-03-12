import React from 'react';
import {Link} from 'gatsby';


const ActuAssociees = ({ lang, related, actu }) => {

  // Si aucune activitée liée, retourne null
  if (!actu || actu.length === 0)
    return null;

  let accroche;
  if (lang === "fr") {
      accroche =  related.fr + String.fromCharCode(8239) +":";
  } else {
      accroche = related.en + ":";
  }

  return (
    <aside className="container elements-associes-block" id="activites-associees">
      <h1><span data-icon="actualités"></span> {accroche} </h1>

      <div className="contenu">
        <ul className="liste_objet">
          {actu.map(a => (
            <li key={a.id} data-type="activite" className="item">
              <Link to={a.permalink[lang]}>
                <h1 data-level-="baseline">{lang === 'fr' ? a.baseline.fr : a.baseline.en}</h1>
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

export default ActuAssociees;
