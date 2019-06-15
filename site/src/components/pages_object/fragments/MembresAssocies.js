import React from 'react';
import {Link} from 'gatsby';
import {SECTIONS} from '../../helpers/sections';
import RawHtml from '../../helpers/RawHtml';

//import Img from '../../assets/images/sample/default-people.png';


const MembresAssocies = ({lang, people}) => {

  const related = SECTIONS.people;

  const noImg = "<pre>░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▓█▓▓▓▓▓█░░░░░░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓███░░░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░░▓██▓▓██▓▓▓▓██▓▓▒█▒░░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░▒███████▓▓████▓▓▒░░▓░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░████▓▓▓██████▓▓▒░░░▒▓░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░████▓▒▒▒▒░▒▓▓▒▒░░░░▒█░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░▒████▓▒░░░▒▒░░░░░▒░░░▓░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░████▓███████▓░░█████▒░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░█▒██▓▓█▓▒▒▒▒▒▒▒▒▒▒▒▒█░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░▒▓▓▓▓▒▒▒░░░░█░░▓░░░▒░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░▒▒▒▓▓▓▒▒▒▒▒▓░░░▒░░▒▒░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░░▒░▓▓▓▒▒▒▒░▒█▓▒▒▒▒▒░░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░░█▓▓▓▓▒▒▒▒▒▒▒▒▒░░░▒░░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░░░░███▒▒░▒▒████▓▓░▒░░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░░▒█▓███▓▒▒░░▓▓▓▓░░▒░░░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░░▓▓▓▒▒▓██▓▓▒░░░░░░▒░░░░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░░░▓▓▓▒▒▒▒▓██▓█▓▒▓▒▒▓▒░░░░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░░░░▓▓▒▓▓▒▒░▒▒▒▓█▓▓▓▓▓▓▓▒▓▓▒░░░░░░░░░░</pre><pre>░░░░░░░░░░░░░▓▓▓▒▒▒▓▓▓▒░▒▒▒▒▒▓▓▓▓▓█░░▓▓▒▒▒▒▒░░░░░░</pre>";

  // Si aucun fichier lié, retourne null
  if (!people || people.length === 0)
    return null;

  // definissons une accroche
  let accroche;

  if (lang === 'fr') {
    accroche = related.fr + String.fromCharCode(8239);
  }
  else {
    accroche = related.en;
  }

  return (
    <aside className="container personnes-associees-block" id="people">
      <h1><span data-icon="people" />{accroche}</h1>

      <div className="contenu">
        <ul className="liste_personne">
          {people.map(p => (
            <li key={p.permalink.fr} data-type="people">
              <Link to={p.permalink[lang]}>
                <figure>
                  {p.coverImage ?
                  <img src={p.coverImage.url} alt={lang === 'fr' ? 'Photo de profil de ' + p.firstName + p.lastName : p.firstName + p.lastName + ' profil picture'} />
                  : <RawHtml html={noImg}/> }
                </figure>
                <div className="description">
                  <hgroup>
                    <h1>{p.firstName} {p.lastName}</h1>
                  </hgroup>
                  <div className="details">
                    <p className="role" data-level-2="role" data-type="role">{p.role && (p.role[lang] || p.role.fr || p.role.en)}</p>              
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default MembresAssocies;
