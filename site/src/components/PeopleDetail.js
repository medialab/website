import React from 'react';
import {graphql} from 'gatsby';
import {Link} from 'gatsby';

import Highlights from './fragments/pageEquipe/Highlights.js';


import ProductionsAssociees from './fragments/pages/ProductionsAssociees.js';
import ActivitesAssociees from './fragments/pages/ActivitesAssociees.js';
import ActuAssociees from './fragments/pages/ActuAssociees.js';

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
      processed {
        small
      }
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
      description {
        en
        fr
      }
      title {
        en
        fr
      }
      permalink {
        en
        fr
      }
      type
      authors
      coverImage {
        url
        processed {
          large
        }
      }
    }
    mainActivities {
      description {
        en
        fr
      }
      baseline {
        en
        fr
      }
      permalink {
        en
        fr
      }
      startDate
      endDate
      name
      type
      coverImage {
        url
        processed {
          large
        }
      }
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

export default function PeopleDetail({lang, person}) {
  console.log(lang, person);

  const productions = person.mainProductions; // Sync mainProd
  const activities = person.mainActivities; // Sync mainActivities

  let domaine;

  if (person.domain === 'tech' ) {
    if (lang === 'fr') {
      domaine = 'Technique';
    } else {
      domaine = 'Technical';
    }
  }
  if (person.domain === 'admin' ) {
    if (lang === 'fr') {
      domaine = 'Administratif';
    } else {
      domaine = 'Administration';
    }
  }
  if (person.domain === 'academic' ) {
    if (lang === 'fr') {
      domaine = 'Académique';
    } else {
      domaine = 'Academic';
    }
  }
  if (person.domain === 'Design' ) {
    domaine = "Design";
  }
  if (person.domain === 'pedagogy' ) {
    if (lang === 'fr') {
      domaine = 'Pédagogie';
    } else {
      domaine = 'Pedagogy';
    }
  }
  else {
    domaine = 'Domaine';
  }

  return (
    <>
      <Nav lang={lang} data={person} order={['main', 'productions', 'activities', 'news']} />
      <main id="main">
        <p className="titre-sticky">
          <Link to="/people">
            <span>{lang === 'fr' ? "L'équipe du Medialab" : 'Medialab team'} </span>
          </Link>
          <span className="personne">{person.firstName} {person.lastName}</span>
        </p>
        <article id="biographie">
          <figure>
            <img src={person.coverImage ? person.coverImage.url : Img} alt={lang === 'fr' ? 'Photo de profil de ' + person.firstName + person.lastName : person.firstName + person.lastName + ' profil picture'} />
          </figure>
          <header>

            <h1 data-level-1="name" data-type="name">{person.firstName} {person.lastName}</h1>
            <h2 data-level-2="role" data-type="role">{person.role[lang]}</h2>
            <div className="situation">
              <div className="container">
                <span className="slash">&nbsp;</span>
                <p data-type="domaine">{ domaine }</p>
                <p data-type="membership">{templateMembership(person)}</p>
              </div>
            </div>

            {/*<p data-type="status">{person.status && (lang === "fr" ? person.status.fr : person.status.en)}</p>*/}
            {person.status && <p data-type="status">{person.status[lang] || ''}</p>}

            <div className="contact">
              <h3 className="toContact">{lang === 'fr' ? 'Contact' : 'Get in touch '}</h3>
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
            {person.bio && person.bio[lang] ? <RawHtml html={person.bio[lang]} /> : null}
          </div>
        </article>
        <Highlights people={person} lang={lang} />

        <ProductionsAssociees productions={person.productions} lang={lang} />
        <ActivitesAssociees activities={person.activities} lang={lang} />
        <ActuAssociees actu={person.news} lang={lang} />
      </main>
    </>
  );
}
