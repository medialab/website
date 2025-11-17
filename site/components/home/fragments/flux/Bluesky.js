import React from 'react';
import {Icons} from '../../../helpers/Icons.js';

import {format as formatDate, parseISO} from 'date-fns';
import enLocale from 'date-fns/locale/en-US';
import frLocale from 'date-fns/locale/fr';

const locales = {
  en: enLocale,
  fr: frLocale
};

const formatDateTime = (isoDate, lang) => {
  const date = parseISO(isoDate);
  const locale = locales[lang];
  return formatDate(date, 'EEEE d MMMM, H:mm', {locale});
};

const i18n = {
  fr: {
    on: 'Le médialab sur ',
    reply: 'en réponse à',
    quote: 'repost de',
    repost: 'repost de'
  },
  en: {
    on: 'médialab on ',
    reply: 'a response to',
    quote: 'repost of',
    repost: 'repost of'
  }
};

export default function Bluesky({lang, bskyposts}) {
  return (
    <>
      <section id="bluesky-post">
        <h1>
          {i18n[lang].on}
          <span data-icon="tweet">
            <a
              href="https://mastodon.social/@medialab_scpo"
              target="_blank"
              rel="noopener noreferrer">
              Mastodon
            </a>
          </span>
          {' '}&{' '}
          <span data-icon="tweet">
            <a
              href="https://bsky.app/profile/medialab-scpo.bsky.social"
              target="_blank"
              rel="noopener noreferrer">
              Bluesky
            </a>
          </span>
        </h1>
        <input
          type="checkbox"
          name="checkbox_flux"
          id="checkbox_tweet"
          hidden
        />
        <label className="responsive-flux" htmlFor="checkbox_tweet">
          <span>
            <Icons icon="arrow" />
          </span>
        </label>

        <div id="tweet-content">
          {bskyposts.map(p => (    // was tweets.map, to reuse when bluesky posts incorporated
            <article
              itemScope
              itemType="https://schema.org/SocialMediaPosting"
              className="bluesky-post"
              data-type="bluesky-post"
              key={p.post.toString()}
              aria-label="Bluesky post">
              <a
                itemProp="url"
                href={`https://bsky.app/profile/${p.author_handle}/post/${p.post_did}`}
                target="_blank"
                rel="noopener noreferrer">
                <aside className="divers">
                  {
                    //<p className="label" data-icon="bluesky-post">{p.type}</p>
                  }
                  <p itemProp="creator" className="account">
                    {'@'}{p.author_handle}
                  </p>
                  <time
                    itemProp="datePublished"
                    className="date"
                    dateTime={p.date}>
                    {formatDateTime(p.date, lang)}
                  </time>
                </aside>
              </a>
              {p.type !== 'quote' && (
                <p
                  itemProp="articleBody"
                  className="bluesky-post-content"
                  dangerouslySetInnerHTML={{__html: p.html}}
                />
              )}
              {p.originalPost && (
                <div className="original-bluesky-post">
                  <aside className="divers">
                    <p className="label" data-icon="tweet">
                      {i18n[lang][p.type]}
                    </p>
                    <p className="account">
                      {p.originalPost.name} (
                      <a
                        href={`https://bsky.app/profile/${p.originalPost.screenName}/post/${p.originalPost.post}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        @{p.originalPost.screenName}
                      </a>
                      )
                    </p>
                  </aside>
                  <p
                    className="bluesky-post-content"
                    dangerouslySetInnerHTML={{__html: p.originalPost.html}}
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
