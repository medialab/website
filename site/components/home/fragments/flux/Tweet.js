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
    quote: 'retweet de',
    retweet: 'retweet de'
  },
  en: {
    on: 'médialab on ',
    reply: 'a response to',
    quote: 'retweet of',
    retweet: 'retweet of'
  },

};

export default function tweet({lang, tweets}) {
return (
  <>
    <section id="tweet">
      <h1>{i18n[lang].on}<span data-icon="tweet"><a href="https://twitter.com/medialab_scpo" target="_blank" rel="noopener noreferrer">Twitter</a></span></h1>
      <input
        type="checkbox" name="checkbox_flux" id="checkbox_tweet"
        hidden />
      <label className="responsive-flux" htmlFor="checkbox_tweet">
        <span><Icons icon="arrow" /></span>
      </label>

      <div id="tweet-content">
        { tweets.map(t =>
            (<article
              itemScope itemType="https://schema.org/SocialMediaPosting" className="tweet"
              data-type="tweet" key={t.tweet.toString()} aria-label="Tweet" >
              <a
                itemProp="url" href={`https://twitter.com/medialab_scpo/status/${t.tweet}`} target="_blank"
                rel="noopener noreferrer">
                <aside className="divers">
                  {
                    //<p className="label" data-icon="tweet">{t.type}</p>
                  }
                  <p itemProp="creator" className="account">@medialab_ScPo</p>
                  <time itemProp="datePublished" className="date" dateTime={t.date}>{formatDateTime(t.date, lang)}</time>
                </aside>
                {t.type !== 'retweet' &&
                  <p itemProp="articleBody" className="tweet-content" dangerouslySetInnerHTML={{__html: t.html}} />
                }
                {t.originalTweet &&
                  <div className="original-tweet">
                    <aside className="divers">
                      <p className="label" data-icon="tweet">{i18n[lang][t.type]}</p>
                      <p className="account">{t.originalTweet.name} (<a href={`https://twitter.com/${t.originalTweet.screenName}`} target="_blank" rel="noopener noreferrer">@{t.originalTweet.screenName}</a>)</p>
                    </aside>
                    <p className="tweet-content" dangerouslySetInnerHTML={{__html: t.originalTweet.html}} />
                  </div>
                }
              </a>
            </article>)
          )
        }
      </div>
    </section>
  </>
);
}
