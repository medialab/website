import React from 'react';
import {Link} from 'gatsby';

const MembresAssocies = ({lang, related, people}) => {

  // Si aucun fichier lié, retourne null
  if (!people || people.length === 0)
    return null;

  // definissons une accroche
  let accroche;

  if (lang === 'fr') {
    accroche = related.fr + String.fromCharCode(8239) + ':';
  }
  else {
    accroche = related.en + ':';
  }

  return (
    <aside className="container personnes-associees-block" id="membres-associes">
      <h1>{accroche}</h1>

      <div className="contenu">
        <ul className="liste_personne">
          {people.map(p => (
            <li key={p.permalink.fr} data-type="people">
              <Link to={p.permalink[lang]}>
                <figure><img src={p.coverImage && p.coverImage.url} /></figure>
                <h2>{p.firstName} {p.lastName}</h2>
                <h3 data-level-2="role" data-type="role">{p.role && (p.role[lang] || p.role.fr || p.role.en)}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default MembresAssocies;
