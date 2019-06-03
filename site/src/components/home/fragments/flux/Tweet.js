import React from 'react';
import {Link} from 'gatsby';

import {format as formatDate, parseISO} from 'date-fns';
import * as locales from 'date-fns/locale';

const formatDateTime = (isoDate, lang) => {
  const date = parseISO(isoDate);
  const locale = locales[lang];
  return formatDate(date, 'EEEE d MMMM, H:mm', {locale}); 
};

const originalTweetIntro = {
  fr: {
    reply: 'en réponse à',
    quote: 'retweet de',
    retweet: 'retweet de'
  },
  en: {
    reply: 'a response to',
    quote: 'retweet of',
    retweet: 'retweet of'
  },

}

export default function tweet({lang, tweets}) {
return (
  <>
    <section id="tweet">
      <h1>{lang ==="fr" ? "Le médialab sur " : "Medialab on" }<span data-icon="tweet"><a href="https://twitter.com/medialab_scpo">Twitter</a></span></h1>
      <input
      type="radio" name="radio_flux" id="radio_tweet"
      hidden />
      <label className="responsive-flux" htmlFor="radio_tweet">
        {lang ==="fr" ? "Le médialab sur " : "Medialab on" }<span data-icon="tweet"><a href="https://twitter.com/medialab_scpo">Twitter</a></span>
      </label>

          
      { tweets.map(t =>
          (<article className="tweet" data-type="tweet" key={t.tweet.toString()} >	
            <aside className="divers">
              {
                //<p className="label" data-icon="tweet">{t.type}</p>
              }
              <p className="account"><a href="https://twitter.com/medialab_ScPo" target="blank">@medialab_ScPo</a></p>
              <p className="date">{formatDateTime(t.date, lang)}</p>
            </aside>
            {t.type !== 'retweet' &&
                <p className="tweet-content" dangerouslySetInnerHTML={{__html: t.html}} />
            }
            {t.originalTweet &&
              <div className="original-tweet">
                <aside className="divers">
                  <p className="label" data-icon="tweet">{originalTweetIntro[lang][t.type]}</p>
                  <p className="account">{t.originalTweet.name} (<a href={`https://twitter.com/${t.originalTweet.screenName}`} target="_blank" rel="noopener noreferrer">@{t.originalTweet.screenName}</a>)</p>
                </aside>
                  <p className="tweet-content" dangerouslySetInnerHTML={{__html: t.originalTweet.html}} />
              </div>
            }
          </article>)
        )
      }
    </section>
  </>
);
}
