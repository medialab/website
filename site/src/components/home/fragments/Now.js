import React from 'react';
import {Link} from 'gatsby';

import {I18N_TYPE_LABELS} from '../../../i18n.js';

import DateNews from '../../helpers/DateNews.js';
import TimeNews from '../../helpers/TimeNews.js';
import ProcessedImage from '../../helpers/ProcessedImage.js';
import LanguageFallback from '../../helpers/LanguageFallback.js';

const i18n = {
  fr: {
    ariaLabel: 'Dernières actualités du médialab',
    title: 'À la une'
  },
  en: {
    ariaLabel: 'Lastest news from médialab',
    title: 'Headlines'
  }
};

export default function Now({now, lang}) {
	return (
    <section id="now" aria-label={i18n[lang].ariaLabel}>
      <h1>{i18n[lang].title}</h1>
      <ul className="contenu">
        {now.map((item, index) =>
          <li
            key={index}
            itemScope itemType="https://schema.org/Thing" data-type={item.model}
            className="now-item" key={index}>
            <Link to={item.data.permalink[lang]}>
              {item.model !== 'productions' && (
                <div className="image-pre" aria-hidden="true">
                  <ProcessedImage size="small" image={item.data.coverImage && item.data.coverImage.processed.small} data={item.data} />
                </div>
              )}
              {/* If Production*/}
              {item.model === 'productions' &&
              <>
                <div className="bandeau">
                  <p className="type-production" data-icon="production">{I18N_TYPE_LABELS.productions[lang][item.data.type]}</p>
                  <p className="subtype-production">
                    <span>{I18N_TYPE_LABELS.productions[lang][item.data.type]}</span>
                  </p>
                  <p className="authors">{item.data.authors}</p>
                </div>
                <hgroup>
                  { item.data.title &&
                  <h1 data-level-1="title"><LanguageFallback translatedAttribute={item.data.title} lang={lang} /></h1>
                  }
                </hgroup>
              </>
              }
              {/* If People*/}
              {item.model === 'people' &&
                <>
                  <div className="bandeau">
                    <p className="type-people" data-icon="people">{ lang === 'fr' ? 'Membre du labo' : 'Labo member'}</p>
                  </div>
                  <hgroup>
                    <h1 data-level-1="name">{item.data.firstName} {item.data.lastName}</h1>
                    <h2 data-level-2="role">{item.data.role && item.data.role[lang]}</h2>
                  </hgroup>
                </>
              }
              {/* If News */}
              {item.model === 'news' &&
              <>
                <div className="bandeau">
                  <p data-icon="news" className="type-news">
                    {I18N_TYPE_LABELS.news[lang][item.data.type]}
                    <span>, {item.data.label[lang]}</span>
                  </p>
                  <DateNews startDate={item.data.startDate} endDate={item.data.endDate} lang={lang} />
                  <TimeNews startDate={item.data.startDate} endDate={item.data.endDate} />
                </div>
                <hgroup>
                  {
                    item.data.title && <h1 data-level-1="title"><LanguageFallback translatedAttribute={item.data.title} lang={lang} /></h1>
                  }
                </hgroup>
              </>
              }

              {/* If Activity */}
              {item.model === 'activities' &&
                <>
                  <div className="bandeau">
                    <p className="type-activity" data-icon="activite">{I18N_TYPE_LABELS.activities[lang][item.data.type]}</p>
                    <p className="title" data-level-2="title">{item.data.name}</p>
                  </div>
                  <hgroup>
                    {item.data.baseline && <h1 data-level-1="baseline"><LanguageFallback translatedAttribute={item.data.baseline} lang={lang} /></h1>}
                  </hgroup>
                </>
              }
            </Link>
          </li>
        )}
      </ul>
    </section>
	);
}

