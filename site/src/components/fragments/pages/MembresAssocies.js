import React from 'react';
import {Link} from 'gatsby';
import Img from '../../assets/images/sample/D-Cardon-bis.jpg';

const MembresAssocies = ({lang, related, people}) => {

  // Si aucun fichier lié, retourne null
  //if (!people || people.length === 0) { return null; }

  // definissons une accroche
  let accroche;
  if (lang === "fr") {
      accroche =  related.fr + String.fromCharCode(8239) +":";
  } else {
      accroche = related.en + ":";
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
                  {/* TEST */}
                  <li key="99" data-type="people">
                    <Link to="">
                       <figure><img src={Img}   alt={lang === "fr" ? "Photo de profil de ": " profil picture"} /></figure>
                      <h2>Mireille Mathieu</h2>
                      <h3>Soliste</h3>
                    </Link>
                  </li> 
                  <li key="99" data-type="people">
                    <Link to="">
                       <figure><img src={Img}   alt={lang === "fr" ? "Photo de profil de ": " profil picture"} /></figure>
                      <h2>George Mathieu</h2>
                      <h3>Soliste</h3>
                    </Link>
                  </li>                     
                  {/* END TEST */}
        </ul>
      </div>
    </aside>
  )
}

export default MembresAssocies;
