import React from 'react';
import {graphql} from 'gatsby';
import {Link} from 'gatsby';

import ToggleLang from './fragments/ToggleLang.js';
import Highlights from './fragments/Highlights.js';
import Logo from '../assets/svg/logo_medialab.svg';
import {Icons} from '../helpers/Icons.js';


import ProductionsAssociees from './fragments/ProductionsAssociees.js';
import ActivitesAssociees from './fragments/ActivitesAssociees.js';
import ActuAssociees from './fragments/ActuAssociees.js';

import Nav from '../common/Nav.js';

import RawHtml from '../helpers/RawHtml';
import {templateMembership} from '../helpers/helpers.js';
import PageMeta from '../helpers/PageMeta.js';

//import './scss/page_personne.scss';

import peoplePlaceholder from '../assets/images/people-placeholder.png';

export const queryFragment = graphql`
  fragment PeopleDetail on PeopleJson {
    firstName
    lastName
    slugs
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
          small
          medium
        }
      }
      group
      external
      url
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
          small
          medium
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
      group
      permalink {
        en
        fr
      }
      description {
        en
        fr
      }
      external
      url
      date
    }
  }
`;

function extractHandle(value) {
  if (value.startsWith('http')) {
    return value.split('/').slice(-1)[0];
  }

  return value;
}

const TWITTER_LABEL_REGEX = /twitter/i,
      GITHUB_LABEL_REGEX = /github/i;

const MAX_URL_LENGTH = 50;

// TODO: we should probably sort contacts...
function PeopleContactLabel({lang, data}) {
  if (data.label === 'Mail') {
    const [identifer] = data.value.split('@');

    return <p proptype="email">{data.label}: {identifer}</p>;
  }

  if (TWITTER_LABEL_REGEX.test(data.label)) {
    const handle = extractHandle(data.value);
    const url = `https://twitter.com/${handle}`;

    return (
      <span>
        <span className="label-data">Twitter:</span>
        &nbsp;
        <a
          proptype="url"
          href={url}
          target="_blank"
          rel="noopener noreferrer">
          @{handle}
        </a>
      </span>
    );
  }

  if (GITHUB_LABEL_REGEX.test(data.label)) {
    const handle = extractHandle(data.value);
    const url = `https://github.com/${handle}`;

    return (
      <span>
        <span className="label-data">Github:</span>
        &nbsp;
        <a
          proptype="url"
          href={url}
          target="_blank"
          rel="noopener noreferrer">
          @{handle}
        </a>
      </span>
    );
  }

  if (
    data.type === 'url' &&
    data.label !== 'CV' &&
    data.value.length <= MAX_URL_LENGTH
  ) {
    return (
      <span>
        <span className="label-data">{data.label}:</span>
        &nbsp;<a
          proptype="url" href={data.value} target="_blank"
          rel="noopener noreferrer" aria-label={lang === 'fr' ? 'Ouvrir cette page ' + data.value : 'Open this ' + data.value + ' page'}>{data.value}</a>
      </span>
    );
  }

  return <a proptype="url" href={data.value}>{data.label}</a>;
}

const i18n = {
  fr: {
    titleLinkTeam: 'Aller à la page de l‘équipe du médialab',
    backTop: 'Aller en haut de la page',
    toggleNav: 'Afficher ou masquer la navigation dans l‘article'
  },
  en: {
    titleLinkTeam: 'Go to the médialab team page',
    backTop: 'Go to the top of page',
    toggleNav: 'Show or hide the navigation in the article'
  }
};

export default function PeopleDetail({lang, person}) {
  // console.log(lang, person);
  const {
    titleLinkTeam,
    backTop,
    toggleNav
  } = i18n[lang];

  return (
    <>
      <PageMeta
        title={`${person.firstName} ${person.lastName} | médialab Sciences Po`}
        description={person.status && person.status[lang]}
        uri={`https://medialab.sciencespo.fr/${lang === 'fr' ? 'equipe' : 'en/people'}/${person.slugs && person.slugs[0]}`}
        lang={lang} />
      <main
        itemScope
        itemType="http://schema.org/Person"
        itemProp="member"
        id="main" role="main" aria-label={lang === 'fr' ? 'Présentation de ' + person.firstName + person.lastName : person.firstName + person.lastName + "'s presentation"}>

        <ol style={{display: 'none'}} itemScope itemType="https://schema.org/BreadcrumbList">
          <li
            itemProp="itemListElement" itemScope
            itemType="https://schema.org/ListItem">
            <a
              itemType="https://schema.org/Organization"
              itemProp="item" href="https://medialab.sciencespo.fr">
              <span itemProp="name">médialab Sciences Po</span></a>
            <meta itemProp="position" content="1" />
          </li>
          <li
            itemProp="itemListElement" itemScope
            itemType="https://schema.org/ListItem">
            <a
              itemType="https://schema.org/Thing"
              href={`https://medialab.sciencespo.fr/${lang === 'fr' ? 'equipe' : 'en/people'}`}
              itemProp="item">
              <span itemProp="name">{lang === 'fr' ? 'L\'équipe' : 'The team'}</span></a>
            <meta itemProp="position" content="2" />
          </li>
          <li
            itemProp="itemListElement" itemScope
            itemType="https://schema.org/ListItem">
            <a
              itemType="https://schema.org/Thing"
              href={`https://medialab.sciencespo.fr/${lang === 'fr' ? 'equipe' : 'en/people'}/${person.slugs && person.slugs[0]}`}
              itemProp="item">
              <span itemProp="name">
                {person.firstName} {person.lastName}
              </span>
            </a>
            <meta itemProp="position" content="3" />
          </li>
        </ol>

        <input
          type="checkbox" id="toggle-nav" name="toggle-nav"
          value="toggle-nav" hidden />
        <label
          htmlFor="toggle-nav" id="toggle-nav_label" title={toggleNav}
          arial-label={toggleNav}><span><Icons icon="arrow" /></span></label>

        <Nav lang={lang} data={person} order={['main', 'highlights', 'activities', 'productions', 'news']} />

        <header id="titre-sticky" aria-hidden="true">
          <div id="container-titre-sticky">
            <div id="logo-sticky"><a href="/"><Logo /></a></div>
            <p>
              <Link to={lang === 'fr' ? '/equipe' : '/en/people'} className="link-page-team" title={titleLinkTeam}>
                <span>{lang === 'fr' ? "L'équipe du médialab" : 'médialab team'} </span>
              </Link>
              <span className="personne"><a href="#topbar" title={backTop}><span itemProp="givenName">{person.firstName}</span> <span itemProp="familyName">{person.lastName}</span></a></span>
            </p>
          </div>
        </header>

        <div className="main-container">

          <article id="biographie">
            <div id="container-biographie">
              <header>
                <figure>
                  <img
                    itemProp="image"
                    src={person.coverImage ? person.coverImage.url : peoplePlaceholder}
                    alt={lang === 'fr' ? 'Photo de profil de ' + person.firstName + person.lastName : person.firstName + person.lastName + ' profil picture'} />
                </figure>
                <hgroup>
                  <h1 data-level-1="name" data-type="name">{person.firstName} {person.lastName}</h1>
                  {person.status &&
                  <p className={`status ${lang}`} data-type="status" aria-label={lang === 'fr' ? 'Occupation actuelle ' : 'Present activitiies'}>
                    { lang === 'fr' ? person.status.fr : person.status.en}
                  </p>
                  }
                </hgroup>
                <div className="bandeau">
                  <p className="role" data-type="role" aria-label={lang === 'fr' ? "Rôle au sein de l'equipe" : 'Role within the team '}>{person.role[lang]}</p>
                  {/* <p data-type="domaine">{lang === "fr" ? "Domaine" + String.fromCharCode(8239) +":" : "Domain:"} {person.domain}</p> */}
                  <p data-type="membership" aria-label={lang === 'fr' ? 'Nature de la relation au médialab' : 'Nature of the relationship within médialab'}>{templateMembership(person)}</p>
                </div>

                { person.contacts && person.contacts.length > 0 &&
                  <div className="contact">
                    <ul>
                      { person.contacts.map((contact, i) => (
                        <li key={i} data-type={contact.label}>
                          <PeopleContactLabel lang={lang} data={contact} />
                        </li>
                    ))}
                    </ul>
                  </div>}
              </header>

              {/* Toggle Langue */}
              <ToggleLang lang={lang} content={person.bio} />

              {/* FR */}
              <div
                itemProp="description" className="biographie-content block-lang fr" lang="fr"
                aria-label="Biographie" >
                {person.bio && person.bio.fr ? <RawHtml html={person.bio.fr} /> : null}
              </div>

              {/* EN */}
              <div
                itemProp="description" className="biographie-content block-lang en" lang="en"
                aria-label="Biography" >
                {person.bio && person.bio.en ? <RawHtml html={person.bio.en} /> : null}
              </div>
            </div>


            <Highlights people={person} lang={lang} />
          </article>


          <aside id="all-aside">
            <ActivitesAssociees activities={person.activities} lang={lang} />
            <ProductionsAssociees productions={person.productions} lang={lang} />
            <ActuAssociees actu={person.news} lang={lang} />
          </aside>

        </div>


      </main>
    </>
  );
}
