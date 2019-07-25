import React from 'react';
import {Link} from 'gatsby';
import {SECTIONS} from '../../helpers/sections';
import RawHtml from '../../helpers/RawHtml';

//import Img from '../../assets/images/sample/default-people.png';


const MembresAssocies = ({lang, people, schemaRelationProp = 'member'}) => {

  const related = SECTIONS.people;

  const noImg = "<pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░▒▒▒▓▓▓▓▓▓▓▒▒▒░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░▒▒▓█████████████████▓▓▒▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒▓▓██████████████████████▓▒▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒▓██████████████████████████▓▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒██████▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓██████▓▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒▓████▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓████▓░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▓████▓▒▒▒▒░░░░░░░░░░░░░░░░▒▒▓███▓▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▓███▓▒▒▒▒░░░░░░░░░░░░░░░░░░▒▓███▓▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▓███▓▒▒░░░░░░░░░░░░░░░░░░░░░▒▓███▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;         &nbsp;&nbsp;░▓██▓▒▒▒▒▒░░░░░░░░░░░░░░░░░░░▒▓███▒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▓██▒▒▒▒▒▒▒▒▒▒░░░░░░░▒▒▒▒▒▒▒▒░▒██▓▒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒██▒▒░░░░░░░░░░░░░░░░░░░░░░░░▒▓█▓░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;░▒▓▓▒░░░▒▓▓█▒▒░░░░░░░▒▒██▓▓░░░▒▓█▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒▓▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░░░░▒▒░░░▒░░░░░░░░░░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░░░░░░░░░░░░░░░░░░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░░░░░░░░░░░░░░░░░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░▒▒▒▒▒▒▒▒▒▒▒░░░░░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░░▒▒▒▒▒▒▒░░░░░░▒░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░▒▒▒▒░░░░░░░░░░░░░░░▒▒▒▒▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░▒▒▒▒▒▒▒░░░░░░░░░░░▒▒▒▒▒▓▒▒░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░▒▒▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▒▒░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;░░░░▒▒▒▓▓██▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓██▓▒▒▒░░░░&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;░░░░░░▒▒▒▒▓▓█████▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓████▓▓▓▒▒▒▒░&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;▒░▒▒▓▓▓████████▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓███████▓▓▓▓▒░&nbsp;&nbsp;</pre><pre>░▓▓▓▓███████████▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓███████████▓▒&nbsp;░</pre><pre>░▓██████████████▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓▓▓████████████▒░░</pre><pre>░▓▓▓██████████▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓█▓█▓▓▓▓███▒░░</pre><pre>░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░</pre>"


  // Si aucun fichier lié, retourne null
  if (!people || people.length === 0)
    return null;

  // sort active first
  const peopleSorted = people.filter(p => p.active && p.membership === 'member').concat(people.filter(p => p.active && p.membership === 'associate')).concat(people.filter(p => !p.active))

  // definissons une accroche
  let accroche;

  if (lang === 'fr') {
    accroche = related.fr + String.fromCharCode(8239);
  }
  else {
    accroche = related.en;
  }

  return (
    <aside className="container personnes-associees-block" id="people" role="complementary" aria-label={ lang ==='fr' ? related.fr : related.en }>
      <h1><span data-icon="people" />{accroche}</h1>

      <div className="contenu">
        <ul className="liste_personne">
          {peopleSorted.map(p => (
            <li itemProp={schemaRelationProp} itemScope itemType="https://schema.org/Person" key={p.permalink.fr} data-type="people">
              <Link to={p.permalink[lang]}>
                <figure className={p.coverImage ? "" : "noImg"}>
                  {p.coverImage ?
                  <img itemProp="image" src={p.coverImage.url} alt={lang === 'fr' ? 'Photo de profil de ' + p.firstName + p.lastName : p.firstName + p.lastName + ' profil picture'} />
                  : <RawHtml html={noImg}/> }
                </figure>
                <div className="description">
                  <hgroup>
                    <h1><span itemProp="givenName">{p.firstName}</span> <span itemProp="familyName">{p.lastName}</span></h1>
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
