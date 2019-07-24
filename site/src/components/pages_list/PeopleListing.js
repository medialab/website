import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';

import FiltreEquipe from './fragments/FiltreEquipe.js';
import {IsModel} from '../helpers/helpers.js';
import LanguageFallback from '../helpers/LanguageFallback.js';
import RawHtml from '../helpers/RawHtml';

import Img from '../assets/images/sample/default-people.png';

import PageMeta from '../helpers/PageMeta.js';

const messagesMeta = {
  title: {
    fr: 'L\'équipe – médialab Sciences Po',
    en: 'The team – médialab Sciences Po',
  },
  description: {
    fr: 'Composée d’hommes et de femmes aux compétences complémentaires, l’équipe du médialab est plurielle. Membres ou associés au laboratoire, ces profils académiques, techniques, en design, ou encore en pédagogie se combinent et travaillent ensemble pour développer une recherche se nourrissant de cette diversité.',
    en: 'The Médialab is a diverse research team, comprised of men and women with complementary skills. As members or partners of the laboratory, these academic, technical, design and teaching experts join forces and work together to develop research that draws on this diversity.'
  }
};


export default function PeopleListing({lang, list}) {
  // console.log(lang, list);

  const noImg = "<pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░▒▒▒▓▓▓▓▓▓▓▒▒▒░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░▒▒▓█████████████████▓▓▒▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒▓▓██████████████████████▓▒▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒▓██████████████████████████▓▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒██████▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓██████▓▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒▓████▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓████▓░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▓████▓▒▒▒▒░░░░░░░░░░░░░░░░▒▒▓███▓▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▓███▓▒▒▒▒░░░░░░░░░░░░░░░░░░▒▓███▓▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▓███▓▒▒░░░░░░░░░░░░░░░░░░░░░▒▓███▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;         &nbsp;&nbsp;░▓██▓▒▒▒▒▒░░░░░░░░░░░░░░░░░░░▒▓███▒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▓██▒▒▒▒▒▒▒▒▒▒░░░░░░░▒▒▒▒▒▒▒▒░▒██▓▒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒██▒▒░░░░░░░░░░░░░░░░░░░░░░░░▒▓█▓░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;░▒▓▓▒░░░▒▓▓█▒▒░░░░░░░▒▒██▓▓░░░▒▓█▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒▓▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▓▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░░░░▒▒░░░▒░░░░░░░░░░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░░░░░░░░░░░░░░░░░░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░░░░░░░░░░░░░░░░░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░▒▒▒▒▒▒▒▒▒▒▒░░░░░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░░░░░░░▒▒▒▒▒▒▒░░░░░░▒░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░▒▒▒▒░░░░░░░░░░░░░░░▒▒▒▒▒░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░▒▒▒▒▒▒▒░░░░░░░░░░░▒▒▒▒▒▓▒▒░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;░░░▒▒▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▒▒░░░&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;&nbsp;&nbsp;░░░░▒▒▒▓▓██▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓██▓▒▒▒░░░░&nbsp;&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;░░░░░░▒▒▒▒▓▓█████▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓████▓▓▓▒▒▒▒░&nbsp;&nbsp;&nbsp;</pre><pre>&nbsp;▒░▒▒▓▓▓████████▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓███████▓▓▓▓▒░&nbsp;&nbsp;</pre><pre>░▓▓▓▓███████████▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓███████████▓▒&nbsp;░</pre><pre>░▓██████████████▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓▓▓████████████▒░░</pre><pre>░▓▓▓██████████▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓█▓█▓▓▓▓███▒░░</pre><pre>░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░</pre>"

  const peopleFragment = (p) => (
    <React.Fragment key={p.permalink.fr}>
      <li
        data-item={p.id} data-domain={p.domain}
        data-active={p.active ? 'yes' : 'no'} data-member={p.membership === 'member' ? 'yes' : 'no'}
        className={(p.active ? 'active' : 'past') + "-" + (p.membership === 'member' ? 'member' : 'associate') + "-" + p.domain}>

        <Link to={p.permalink[lang]}>

          <figure className={p.coverImage ? "" : "noImg"}>
            {p.coverImage ?
            <img src={p.coverImage ? p.coverImage.url : Img} alt={lang === 'fr' ? 'Photo de profil de ' + p.firstName + p.lastName : p.firstName + p.lastName + ' profil picture'} />
            : <RawHtml html={noImg}/> }
          </figure>

          <div className="description">
            <hgroup>
              <h1 data-level-1="name">{p.firstName} {p.lastName}</h1>
              <p className={`status ${lang}`}>
                <LanguageFallback lang={lang} translatedAttribute={p.status} />
              </p>
            </hgroup>
            <div className="details">
              <p className="role">{lang === 'fr' ? p.role && p.role.fr : p.role && p.role.en}</p>
              <p className="details-statut">{p.membership === 'member' ? 'Membre' : 'Associé'}</p>
              <p className="domaine">{IsModel(p.domain, lang)}</p>
            </div>
          </div>
        </Link>
      </li>
    </React.Fragment>)

	return (
  <>
  <PageMeta
    title={messagesMeta.title[lang]}
    description={messagesMeta.description[lang]}
  />
  <main role="main" aria-describedby="aria-accroche">
    <FiltreEquipe lang={lang} />
    <section className="main-filters" />
    <section id="liste_equipe" className="main-container">

      <ul className="liste_equipe" id="liste_equipe_active">
        {list.filter(p => p.active).map(p => peopleFragment(p))}
        <li data-type="" className="list-item hack-item-grid" />
      </ul>

      <input type="checkbox" id="display-people-past" name="display-people-past" value="display-people-past" hidden/>
      <label htmlFor="display-people-past">Afficher les anciens membres <span>〉</span></label>

      <ul className="liste_equipe" id="liste_equipe_past">
        {list.filter(p => !p.active).map(p => peopleFragment(p))}
        <li data-type="" className="list-item hack-item-grid" />
      </ul>
    </section>
  </main>
  </>

	);
}
