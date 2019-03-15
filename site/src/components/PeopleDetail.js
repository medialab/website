import React from 'react';
import {graphql} from 'gatsby';
import {Link} from 'gatsby';

import Highlight from './fragments/pageEquipe/Highlight.js';
import Highlight2 from './fragments/pageEquipe/Highlight2.js';
import Highlight3 from './fragments/pageEquipe/Highlight3.js';


import ProductionsAssociees from './fragments/pages/ProductionsAssociees.js';
import ActivitesAssociees from './fragments/pages/ActivitesAssociees.js';
import ActuAssociees from './fragments/pages/ActuAssociees.js';

import RelatedElements from './fragments/pages/RelatedElements.js';
import Nav from './fragments/Nav.js';

import RawHtml from './RawHtml';
import {templateMembership} from './helpers.js';
//import './scss/page_personne.scss';

import Img from './assets/images/sample/D-Cardon-bis.jpg';

export const queryFragment = graphql`
  fragment PeopleDetail on PeopleJson {
    firstName
    lastName
    role {
      en
      fr
    }
    bio {
      fr
      en
    }
    coverImage {
      url
    }
    membership
    active
    draft
    lastUpdated
    domain
    role {
      en
      fr
    }
    contacts {
      type
      label
      value
    }
    status {
      en
      fr
    }
    mainProductions {
      id
      description {
        en
        fr
      }
      title {
        en
        fr
      }
      type
    }
    mainActivities {
      id
      description {
        en
        fr
      }
      name
      type
    }
    activities {
      name
      baseline {
        en
        fr
      }
      description {
        en
        fr
      }
      permalink {
        en
        fr
      }
      startDate
      endDate
      type
    }
    news {
      title {
        en
        fr
      }
      type
      description {
        en
        fr
      }
      permalink {
        en
        fr
      }
      startDate
    }
    productions {
      title {
        en
        fr
      }
      authors
      groupLabel {
        en
        fr
      }
      permalink {
        en
        fr
      }
      description {
        en
        fr
      }
    }
  }
`;

  const relatedElements = [
    {
      id: 'main-objet',
      en: 'Main article',
      fr: 'Article principal',
    },
    {
      id: 'productions-associes',
      exist: ({productions}) => Boolean(productions) && productions.length > 0,
      en: 'Related poductions',
      fr: 'Productions en liens'
    },
    {
      id: 'activites-associees',
      exist: ({activities}) => Boolean(activities) && activities.length > 0,
      en: 'Related Activities',
      fr: 'Activités en lien',
    },
    {
      id: 'actu-associees',
      exist: ({news}) => Boolean(news) && news.length > 0,
      en: 'Related news',
      fr: 'Actualités associées'
    }
  ];


export default function PeopleDetail({lang, person}) {
  console.log(lang, person);

  const bio = person.bio;
  const productions = person.mainProductions; // Sync mainProd
  const activities = person.mainActivities; // Sync mainActivities

  return (
    <>
      <Nav lang={lang} object={person} related={relatedElements} />
      <main id="main-personne">
        <p className="titre-sticky">
          <Link to="/people">
            <span>{lang === 'fr' ? "L'équipe du Medialab" : 'Medialab team'} </span>
          </Link>
          <span className="personne">{person.firstName} {person.lastName}</span>
        </p>
        <article id="biographie">
          <figure>
            <div className="cache"><span>▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br />▓▒░<br /></span></div>
            <img src={person.coverImage ? person.coverImage.url : Img} alt={lang === 'fr' ? 'Photo de profil de ' + person.firstName + person.lastName : person.firstName + person.lastName + ' profil picture'} />
          </figure>
          <header>

            <h1 data-level-1="name" data-type="name">{person.firstName} {person.lastName}</h1>
            <h2 data-level-2="role" data-type="role">{person.role[lang]}</h2>
            <p data-type="domaine">{person.domain}</p>
            <p data-type="membership">{templateMembership(person)}</p>
            {/*<p data-type="status">{person.status && (lang === "fr" ? person.status.fr : person.status.en)}</p>*/}
            {person.status && <p data-type="status">{person.status[lang] || ''}</p>}

            <div className="contact">
              <p className="toContact">{lang === 'fr' ? 'Contact' : 'Get in touch '}</p>
              <ul>
                {person.contacts && person.contacts.map((contact, i) => (
                  <li key={i} data-type={contact.label}>
                    {contact.type === 'url' ?
                      <a href={contact.value}>{contact.label}</a> :
                      contact.label
                    }
                  </li>
                ))}
              </ul>
            </div>
          </header>

          <div className="biographie-contenu">
            {person.bio && (lang === 'fr' ? person.bio.fr && <RawHtml html={bio.fr} /> : person.bio.en && <RawHtml html={bio.en} />)}
          </div>
        </article>
        {/*<Highlight highlight={person.mainProductions} lang={lang}/>*/}
        <Highlight2 highlight={person.mainProductions} lang={lang} />
        <p style={{color: 'pink'}} >Alternative Highlight ↓ </p>
        <Highlight3 highlight={person.mainProductions} lang={lang} />

        <ProductionsAssociees productions={person.productions} related={relatedElements[1]} lang={lang} />
        <ActivitesAssociees activities={person.activities} related={relatedElements[2]} lang={lang} />
        <ActuAssociees actu={person.news} related={relatedElements[3]} lang={lang} />
      </main>
    </>
  );
}
