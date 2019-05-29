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
      <h1>Le médialab sur <span data-icon="tweet"><a href="https://twitter.com/medialab_scpo">Twitter</a></span></h1>
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
              <a href={`https://twitter.com/medialab_ScPo/status/${t.tweet}`} target="_blank" rel="noopener noreferrer">
                <p className="tweet-content" dangerouslySetInnerHTML={{__html: t.html}} />
              </a>
            }
            {t.originalTweet &&
              <div className="original-tweet">
                <aside className="divers">
                  <p className="label" data-icon="tweet">{originalTweetIntro[lang][t.type]}</p>
                  <p className="account"><a href={`https://twitter.com/${t.originalTweet.screenName}`} target="_blank" rel="noopener noreferrer">{t.originalTweet.name} @{t.originalTweet.screenName}</a></p>
                </aside>
                <a href={`https://twitter.com/medialab_ScPo/status/${t.originalTweet.tweet}`} target="_blank" rel="noopener noreferrer">
                  <p className="tweet-content" dangerouslySetInnerHTML={{__html: t.originalTweet.html}} />
                </a>
              </div>
            }
          </article>)
        )
      }
      {
      // <article className="tweet" data-type="tweet">			
      //   <aside className="divers">
      //     <p className="label" data-icon="tweet">Tweet</p>
      //     {/* PLACEHOLDER DATENEWS */}<p className="date-news">mercredi 6 mars 2019</p>					
      //   </aside>

      //   <p className="tweet-content">
      //     Faire vivre la #démocratie exige que nous ayons <span className="hashtag">#confiance</span> envers les <span className="hashtag">#medias</span>. Comment y parvenir dans un univers où <span className="hashtag">#trolls</span>, 
      //     <span className="hashtag">#FakeNews</span> et concurrence au nb de clics polluent le paysage ? Réponses le 16 avril lors du 1er rdv de <span className="mention">@ScPoResearch</span> ✍ <Link className="link-external-tweet" to="/">https://bit.ly/2UQmrZI</Link>
      //   </p>

      //   <aside className="details">
      //     <p className="account"><a href="link/to/tweet">@medialab_ScPo</a></p>
      //   </aside>
      // </article>
      }
    </section>
  </>
);
}
