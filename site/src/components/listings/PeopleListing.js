import React from 'react';
import Link from './helpers/Link';

import PeopleFilter from './fragments/PeopleFilter.js';
import {I18N_TYPE_LABELS} from '../../i18n.js';
import LanguageFallback from '../helpers/LanguageFallback.js';

// import peoplePlaceholder from '../../assets/images/people-placeholder.png';

import PageMeta from '../helpers/PageMeta.js';

const i18n = {
  fr: {
    title: 'L\'équipe | médialab Sciences Po',
    description: 'Composée d’hommes et de femmes aux compétences complémentaires, l’équipe du médialab est plurielle. Membres ou associés au laboratoire, ces profils spécialisés en sciences sociales, en méthodes numériques ou encore en design se combinent et travaillent ensemble pour développer une recherche se nourrissant de cette diversité.',
    showPastMembers: 'Afficher les anciens membres',
    profilePicture(p) {
      return `Photo de profil de ${p.firstName} ${p.lastName}`;
    },
    membership(p) {
      return p.membership === 'member' ? 'Membre' : 'Associé·e';
    }
  },
  en: {
    title: 'The team | médialab Sciences Po',
    description: 'The médialab is a diverse research team, comprised of men and women with complementary skills. As members or partners of the laboratory, these social sciences, digital methods and design experts join forces and work together to develop research that draws on this diversity.',
    showPastMembers: 'Show past members',
    profilePicture(p) {
      return `${p.firstName} ${p.lastName} profile picture`;
    },
    membership(p) {
      return p.membership === 'member' ? 'Member' : 'Associate';
    }
  }
};

function getPeopleClassName(people) {
  return (
    (people.active ? 'active' : 'past') + '-' +
    (people.membership === 'member' ? 'member' : 'associate') + '-' +
    people.domain
  );
}

function PeopleListingItem({lang, people}) {
  return (
    <li
      itemScope
      itemType="http://schema.org/Person"
      itemProp="member"
      data-item={people.id}
      data-domain={people.domain}
      data-active={people.active ? 'yes' : 'no'}
      data-member={people.membership === 'member' ? 'yes' : 'no'}
      className={getPeopleClassName(people)}>

      <Link to={people.permalink[lang]}>

        <figure>
          <img
            src={people.coverImage ? people.coverImage.url : 'alt'}
            alt={i18n[lang].profilePicture(people)} />
        </figure>

        <div className="description">
          <hgroup>
            <h1 data-level-1="name"><span itemProp="givenName">{people.firstName}</span> <span itemProp="familyName">{people.lastName}</span></h1>
            <p itemProp="description" className={`status ${lang}`}>
              <LanguageFallback lang={lang} translatedAttribute={people.status} />
            </p>
          </hgroup>
          <div className="details">
            <p className="role">{people.role[lang] || people.role.fr || people.role.en}</p>
            <p className="details-statut">{i18n[lang].membership(people)}</p>
            <p className="domaine">{I18N_TYPE_LABELS.people[lang][people.domain]}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}


export default function PeopleListing({lang, list}) {
  const activePeople = list.filter(p => p.active),
        pastPeople = list.filter(p => !p.active);

	return (
    <>
      <PageMeta
        title={i18n[lang].title}
        description={i18n[lang].description}
        lang={lang} />
      <main role="main" aria-describedby="aria-accroche">
        <PeopleFilter lang={lang} />
        <section className="main-filters" />
        <section id="liste_equipe" className="main-container">

          <ul className="liste_equipe" id="liste_equipe_active">
            {activePeople.map(p => <PeopleListingItem key={p.permalink.fr} lang={lang} people={p} />)}
            <li data-type="" className="list-item hack-item-grid" />
          </ul>

          <input
            type="checkbox" id="display-people-past" name="display-people-past"
            value="display-people-past" hidden />
          <label htmlFor="display-people-past">{i18n[lang].showPastMembers} <span>〉</span></label>

          <ul className="liste_equipe" id="liste_equipe_past">
            {pastPeople.map(p => <PeopleListingItem key={p.permalink.fr} lang={lang} people={p} />)}
            <li data-type="" className="list-item hack-item-grid" />
          </ul>
        </section>
      </main>
    </>
	);
}
