import React from 'react';
import Link from '../helpers/Link';
import {Icons} from '../helpers/Icons.js';

const i18n = {
  fr: {
    ariaLabel: 'Pied de Page',
    address: 'Adresse du médialab',
    legal: 'Liens vers les mentions légales',
    mail: 'Ecrire au médialab',
    mastodon: 'Lien vers le compte Mastodon du médialab',
    bluesky: 'Lien vers le compte Bluesky du médialab',
    github: 'Lien vers le Github du médialab',
    search: 'Chercher dans le site',
    searchPlaceholder: 'Rechercher',
    searchAriaLabel: 'Rechercher dans la page'
  },
  en: {
    ariaLabel: 'Footer',
    address: "médialab's adress",
    legal: 'Link to legal notice',
    mail: 'Write to médialab',
    mastodon: "Link to médialab's Mastodon",
    bluesky: "Link to médialab's Bluesky",
    github: "Link to médialab's Github",
    search: 'Search the website',
    searchPlaceholder: 'Search',
    searchAriaLabel: 'Search through page content'
  }
};

const permalink = {
  fr: '/legal',
  en: '/en/legal'
};

export default function Footer({lang}) {
  return (
    <footer role="contentinfo" aria-label={i18n[lang].ariaLabel}>
      <div id="container-footer">
        <div className="logo" />
        <div className="mentions">
          <p aria-label={i18n[lang].address}>
            médialab Sciences Po
            <br />
            27 rue St Guillaume, Paris VII
          </p>
          <p>
            <Link to={permalink[lang]} aria-label={i18n[lang].legal}>
              Mentions legales
            </Link>
          </p>
        </div>
        <ul className="contact">
          <li>
            <a
              itemProp="email"
              href="mailto:medialab@sciencespo.fr"
              aria-label={i18n[lang].mail}
              target="_blank"
              rel="noopener noreferrer">
              {lang === 'fr' ? 'Courriel' : 'Email'}
            </a>
          </li>
          <li>
            <a
              itemProp="sameAs"
              href="https://mastodon.social/@medialab_scpo"
              aria-label={i18n[lang].mastodon}
              target="_blank"
              rel="noopener noreferrer">
              Mastodon
            </a>
          </li>
          <li>
            <a
              itemProp="sameAs"
              href="https://bsky.app/profile/medialab-scpo.bsky.social"
              aria-label={i18n[lang].bluesky}
              target="_blank"
              rel="noopener noreferrer">
              Bluesky
            </a>
          </li>
          <li>
            <a
              itemProp="sameAs"
              href="https://github.com/medialab"
              aria-label={i18n[lang].github}
              target="_blank"
              rel="noopener noreferrer">
              Github
            </a>
          </li>
          <li>
            <a
              itemProp="sameAs"
              href="/feed"
              aria-label="RSS"
              target="_blank"
              rel="noopener noreferrer">
              RSS
            </a>
          </li>
        </ul>
        <div className="internal-search-container">
          <div id="internal-search">
            <input
              type="search"
              id="internal-search-input"
              name="q"
              arial-label={i18n[lang].searchAriaLabel}
              placeholder={i18n[lang].searchPlaceholder}
            />
            <label htmlFor="internal-search-input">
              <Icons icon="search" />
            </label>
          </div>
          <div className="closed-placeholder">{i18n[lang].search}</div>
        </div>
        <div className="mentions">
          <p>
            <small>
              design par&nbsp;
              <a
                href="http://julie-blanc.fr/"
                target="_blank"
                rel="noopener noreferrer">
                Julie Blanc
              </a>
              &nbsp;et&nbsp;
              <a
                href="http://benjmng.eu/"
                target="_blank"
                rel="noopener noreferrer">
                Benjamin Gremillon
              </a>
              <br />
              développement par&nbsp;
              <a
                href="https://github.com/medialab/website/graphs/contributors"
                target="_blank"
                rel="noopener noreferrer">
                l'équipe du médialab
              </a>
            </small>
          </p>
        </div>
      </div>
    </footer>
  );
}
