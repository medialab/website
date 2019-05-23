import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';

import FiltreEquipe from './fragments/FiltreEquipe.js';
import {IsModel} from '../helpers/helpers.js';


import Img from '../assets/images/sample/default-people.png';

export default function PeopleListing({lang, list}) {
  console.log(lang, list);



	return (
  <>
  <main>
    <FiltreEquipe lang={lang} />
    <section className="main-filters">
    </section>

    <section id="liste_equipe" className="main-container">

      <ul className="liste_equipe" id="liste_equipe_active">
        {list.map(p => (
         p.active ?
         <React.Fragment key={p.permalink.fr}>
          <li
            data-item={p.id} data-domain={p.domain}
            data-active={p.active ? 'yes' : 'no'} data-member={p.membership === 'member' ? 'yes' : 'no'}
            className={(p.active ? 'active' : 'past') + "-" + (p.membership === 'member' ? 'member' : 'associate') + "-" + p.domain}>

            <Link to={p.permalink[lang]}>
              <figure><img src={p.coverImage ? p.coverImage.url : Img} alt={lang === 'fr' ? 'Photo de profil de ' + p.firstName + p.lastName : p.firstName + p.lastName + ' profil picture'} /></figure>
              <div className="description">
                <hgroup>
                  <h1 data-level-1="name">{p.firstName} {p.lastName}</h1>
                  {p.status && (lang === "fr" ? <p className="status">{p.status.fr}</p> : <p className="status">{p.status.en}</p>)}
                </hgroup>
                <div className="details">
                  <p className="role">{lang === 'fr' ? p.role && p.role.fr : p.role && p.role.en}</p>
                  <p className="member">{p.membership === 'member' ? 'Membre' : 'Associé'}</p>
                  <p className="domaine">{IsModel(p.domain, lang)}</p>
                </div>
              </div>
            </Link>
          </li>
          </React.Fragment>
        : ''
          ))}
          <li data-type="" className="list-item hack-item-grid"></li>
      </ul>

      <input type="checkbox" id="display-people-past" name="display-people-past" value="display-people-past" hidden/>
      <label htmlFor="display-people-past">Afficher les anciens membres <span>〉</span></label>


      <ul className="liste_equipe" id="liste_equipe_past">
        {list.map(p => (
         p.active ? '' :
         <React.Fragment key={p.permalink.fr}>
          <li
            data-item={p.id} data-domain={p.domain}
            data-active={p.active ? 'yes' : 'no'} data-member={p.membership === 'member' ? 'yes' : 'no'}
            className={(p.active ? 'active' : 'past') + "-" + (p.membership === 'member' ? 'member' : 'associate') + "-" + p.domain}>

            <Link to={p.permalink[lang]}>
              <figure><img src={p.coverImage ? p.coverImage.url : Img} alt={lang === 'fr' ? 'Photo de profil de ' + p.firstName + p.lastName : p.firstName + p.lastName + ' profil picture'} /></figure>
              <div className="description">
                <hgroup>
                  <h1 data-level-1="name">{p.firstName} {p.lastName}</h1>
                  {p.status && (lang === "fr" ? <p className="status">{p.status.fr}</p> : <p className="status">{p.status.en}</p>)}
                </hgroup>
                <div className="details">
                  <p className="role">{lang === 'fr' ? p.role && p.role.fr : p.role && p.role.en}</p>
                  <p className="member">{p.membership === 'member' ? 'Membre' : 'Associé'}</p>
                  <p className="domaine">{IsModel(p.domain, lang)}</p>
                </div>
              </div>
            </Link>
          </li>
          </React.Fragment>
          ))}
          <li data-type="" className="list-item hack-item-grid"></li>
      </ul>



    </section>
  </main>
  </>

	);
}
