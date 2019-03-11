import React from 'react';
import {Link} from 'gatsby';


const MembresAssocies = ({lang, context, people}) => {

  // Si aucun fichier lié, retourne null
  if (!people || people.length === 0) { return null; }

  // definissons une accroche
  let accroche;
  if (lang === "fr") {
    // il n'y a jamais de liens entre personne, je commente mais faut supprimer je pense
    // if (context && context === "people") {
    // 	accroche = person && person.firstName + person && person.lastName + "a collaboré avec ces personnes"+ String.fromCharCode(8239) +":";
    // }
    accroche = "Certains membres du Medialab sont liés à ce sujet"+ String.fromCharCode(8239) +":";
  } else {
    // if (context && context === "people") {
    // 	accroche = person && person.firstName + person && person.lastName + " had collaborate with this people";
    // }
    accroche = "Medialab's member are linked to this subject:";
  }

  return (
    <aside className="container personnes-associees-block" id="membres-associes">
      <h1>{accroche}</h1>

      <div className="contenu">
        <ul className="liste_objet">
          {people.map(p => (
            <li key={p.id} data-type="people">
              <Link to={p.permalink[lang]}>
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
