import React from 'react';
import Link from '../helpers/Link';

import ToggleLang from './fragments/ToggleLang';
import Highlights from './fragments/Highlights';
import LogoSticky from './fragments/LogoSticky';
import {Icons} from '../helpers/Icons';

import RelatedProductions from './fragments/RelatedProductions';
import RelatedActivities from './fragments/RelatedActivities';
import RelatedNews from './fragments/RelatedNews';

import Nav from '../common/Nav';

import HtmlFallback from '../helpers/HtmlFallback';
import {templateMembership} from '../helpers/helpers';
import PageMeta from '../helpers/PageMeta';
import ImagePlaceholder from '../helpers/ImagePlaceholder';

import {I18N_MODEL} from '../../i18n';
import {translateAttachmentLabel} from '../../../specs/translations';

import LanguageFallback from '../helpers/LanguageFallback';

const i18n = {
  fr: {
    titleLinkTeam: 'Aller à la page de l‘équipe du médialab',
    backTop: 'Aller en haut de la page',
    toggleNav: 'Afficher ou masquer la navigation dans l‘article',
    openLink(data) {
      return 'Ouvrir cette page ' + data.value;
    },
    presentationAriaLabel(person) {
      return `Présentation de ${person.firstName} ${person.lastName}`;
    },
    profilePicture(person) {
      return `Photo de profil de ${person.firstName} ${person.lastName}`;
    },
    occupationAriaLabel: 'Occupation actuelle',
    roleAriaLabel: "Rôle au sein de l'equipe",
    membershipAriaLabel: 'Affiliation',
    formerMember: 'Ancien membre'
  },
  en: {
    titleLinkTeam: 'Go to the médialab team page',
    backTop: 'Go to the top of page',
    toggleNav: 'Show or hide the navigation in the article',
    openLink(data) {
      return 'Open this ' + data.value + ' page';
    },
    presentationAriaLabel(person) {
      return `${person.firstName} ${person.lastName}'s presentation`;
    },
    profilePicture(person) {
      return `${person.firstName} ${person.lastName} profile picture`;
    },
    occupationAriaLabel: 'Present activities',
    roleAriaLabel: 'Role within the team',
    membershipAriaLabel: 'Membership status',
    formerMember: 'Former member'
  }
};

const mainPermalink = {
  fr: '/equipe',
  en: '/en/people'
};

const TWITTER_LABEL_REGEX = /twitter/i,
  GITHUB_LABEL_REGEX = /github/i,
  TRAILING_SLASH_REGEX = /\/$/;

function extractHandle(value) {
  if (value.startsWith('http'))
    return value.replace(TRAILING_SLASH_REGEX, '').split('/').slice(-1)[0];

  if (value.startsWith('@')) return value.slice(1);

  return value;
}

const MAX_URL_LENGTH = 50;

// TODO: we should probably sort contacts...
function PeopleContactLabel({lang, data}) {
  data = Object.assign({}, data);

  if (!data.lang && lang === 'en')
    data.label = translateAttachmentLabel(data.label);

  if (data.label === 'Mail') {
    const email = data.value.replace('@', '●');
    return (
      <p proptype="email">
        {data.label}: {email}
      </p>
    );
  }

  if (TWITTER_LABEL_REGEX.test(data.label)) {
    const handle = extractHandle(data.value);
    const url = `https://twitter.com/${handle}`;

    return (
      <span>
        <span className="label-data">Twitter:</span>
        &nbsp;
        <a proptype="url" href={url} target="_blank" rel="noopener noreferrer">
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
        <a proptype="url" href={url} target="_blank" rel="noopener noreferrer">
          @{handle}
        </a>
      </span>
    );
  }

  if (data.type === 'url' && data.value.length <= MAX_URL_LENGTH) {
    return (
      <span>
        <span className="label-data">{data.label}:</span>
        &nbsp;
        <a
          proptype="url"
          href={data.value}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={i18n[lang].openLink(data)}>
          {data.value}
        </a>
      </span>
    );
  }

  if (data.type !== 'url' && data.type !== 'attachment')
    return (
      <span>
        <span className="label-data">{data.label}:</span>
        &nbsp;<span>{data.value}</span>
      </span>
    );

  return (
    <a
      proptype="url"
      href={data.value}
      target="_blank"
      rel="noopener noreferrer">
      {data.label}
    </a>
  );
}

export default function PeopleDetail({lang, person, siteUrl}) {
  const {titleLinkTeam, backTop, toggleNav} = i18n[lang];

  return (
    <>
      <PageMeta
        title={`${person.firstName} ${person.lastName} | médialab Sciences Po`}
        description={person.status && person.status[lang]}
        uri={`${siteUrl}${person.permalink[lang]}`}
        lang={lang}
      />
      <main
        id="main"
        itemScope
        itemType="http://schema.org/Person"
        itemProp="member"
        role="main"
        aria-label={i18n[lang].presentationAriaLabel}>
        <ol
          style={{display: 'none'}}
          itemScope
          itemType="https://schema.org/BreadcrumbList">
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem">
            <a
              itemType="https://schema.org/Organization"
              itemProp="item"
              href={siteUrl}>
              <span itemProp="name">médialab Sciences Po</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem">
            <a
              itemType="https://schema.org/Thing"
              href={`${siteUrl}${mainPermalink[lang]}`}
              itemProp="item">
              <span itemProp="name">{I18N_MODEL[lang].people}</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem">
            <a
              itemType="https://schema.org/Thing"
              href={`${siteUrl}${person.permalink[lang]}`}
              itemProp="item">
              <span itemProp="name">
                {person.firstName} {person.lastName}
              </span>
            </a>
            <meta itemProp="position" content="3" />
          </li>
        </ol>

        <input
          type="checkbox"
          id="toggle-nav"
          name="toggle-nav"
          value="toggle-nav"
          hidden
        />
        <label
          id="toggle-nav_label"
          htmlFor="toggle-nav"
          title={toggleNav}
          arial-label={toggleNav}>
          <span>
            <Icons icon="arrow" />
          </span>
        </label>

        <Nav
          lang={lang}
          data={person}
          order={['main', 'highlights', 'activities', 'productions', 'news']}
        />

        <header id="titre-sticky" aria-hidden="true">
          <div id="container-titre-sticky">
            <LogoSticky lang={lang} />
            <p>
              <Link
                to={mainPermalink[lang]}
                className="link-page-team"
                title={titleLinkTeam}>
                <span>{I18N_MODEL[lang].people} </span>
              </Link>
              <span className="personne">
                <a href="#topbar" title={backTop}>
                  <span itemProp="givenName">{person.firstName}</span>{' '}
                  <span itemProp="familyName">{person.lastName}</span>
                </a>
              </span>
            </p>
          </div>
        </header>

        <div className="main-container">
          <article id="biographie">
            <div id="container-biographie">
              <header>
                <figure>
                  {person.coverImage ? (
                    <img
                      itemProp="image"
                      src={person.coverImage.url}
                      alt={i18n[lang].profilePicture(person)}
                    />
                  ) : (
                    <ImagePlaceholder
                      type="people"
                      alt={i18n[lang].profilePicture(person)}
                    />
                  )}
                </figure>
                <hgroup>
                  <h1 data-level-1="name" data-type="name">
                    {person.firstName} {person.lastName}
                  </h1>
                  {!person.active && (
                    <div className="former-member">
                      {i18n[lang].formerMember}
                    </div>
                  )}
                  {person.status && (
                    <p
                      className={`status ${lang}`}
                      data-type="status"
                      aria-label={i18n[lang].occupationAriaLabel}>
                      <LanguageFallback
                        lang={lang}
                        translatedAttribute={person.status}
                      />
                    </p>
                  )}
                </hgroup>
                <div className="bandeau">
                  <p
                    className="role"
                    data-type="role"
                    aria-label={i18n[lang].roleAriaLabel}>
                    {person.role[lang]}
                  </p>
                  <p
                    data-type="membership"
                    aria-label={i18n[lang].membershipAriaLabel}>
                    {templateMembership(lang, person)}
                  </p>
                </div>

                {person.contacts && person.contacts.length > 0 && (
                  <div className="contact">
                    <ul>
                      {person.contacts
                        .filter(
                          contact => !contact.lang || contact.lang === lang
                        )
                        .map((contact, i) => (
                          <li key={i} data-type={contact.label}>
                            <PeopleContactLabel lang={lang} data={contact} />
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </header>

              <div
                itemProp="description"
                className={`biographie-content block-lang ${lang}`}
                lang={lang}
                aria-label="Biographie">
                <HtmlFallback lang={lang} content={person.bio} />
              </div>
              {/* Toggle Langue */}
              <ToggleLang
                lang={lang}
                content={person.bio}
                to={person.permalink}
              />
            </div>

            <Highlights people={person} lang={lang} />
          </article>

          <aside id="all-aside">
            <RelatedActivities activities={person.activities} lang={lang} />
            <RelatedProductions productions={person.productions} lang={lang} />
            <RelatedNews actu={person.news} lang={lang} />
          </aside>
        </div>
      </main>
    </>
  );
}
