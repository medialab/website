import React from 'react';
import Link from '../../helpers/Link';

import {I18N_TYPE_LABELS} from '../../../i18n.js';

import DateNews from '../../helpers/DateNews.js';
import TimeNews from '../../helpers/TimeNews.js';
import ProcessedImage from '../../helpers/ProcessedImage.js';
import LanguageFallback from '../../helpers/LanguageFallback.js';

const i18n = {
  fr: {
    ariaLabel: 'Dernières actualités du médialab',
    title: 'À la une',
    member: 'Membre du labo'
  },
  en: {
    ariaLabel: 'Lastest news from médialab',
    title: 'Headlines',
    member: 'Labo member'
  }
};

export default function Now({now, lang}) {
	return (
    <section id="now" aria-label={i18n[lang].ariaLabel}>
      <h1>{i18n[lang].title}</h1>
      <ul className="contenu">
        {now.map((item, index) => (
          <li
            key={index}
            itemScope itemType="https://schema.org/Thing" data-type={item.model}
            className="now-item">
            <Link to={item.permalink[lang]}>
              {item.model !== 'productions' && (
                <div className="image-pre" aria-hidden="true">
                  <ProcessedImage size="small" image={item.coverImage && item.coverImage.processed.small} data={item} />
                </div>
              )}
              {/* If Production*/}
              {item.model === 'productions' &&
              <>
                <div className="bandeau">
                  <p className="type-production" data-icon="production">{I18N_TYPE_LABELS.productions[lang][item.type]}</p>
                  <p className="subtype-production">
                    <span>{I18N_TYPE_LABELS.productions[lang][item.type]}</span>
                  </p>
                  <p className="authors">{item.authors}</p>
                </div>
                <hgroup>
                  { item.title &&
                  <h1 data-level-1="title"><LanguageFallback translatedAttribute={item.title} lang={lang} /></h1>
                  }
                </hgroup>
              </>
              }
              {/* If People*/}
              {item.model === 'people' &&
                <>
                  <div className="bandeau">
                    <p className="type-people" data-icon="people">{i18n[lang].member}</p>
                  </div>
                  <hgroup>
                    <h1 data-level-1="name">{item.firstName} {item.lastName}</h1>
                    <h2 data-level-2="role">{item.role && item.role[lang]}</h2>
                  </hgroup>
                </>
              }
              {/* If News */}
              {item.model === 'news' &&
              <>
                <div className="bandeau">
                  <p data-icon="news" className="type-news">
                    {I18N_TYPE_LABELS.news[lang][item.type]}
                    <span>, {item.label[lang]}</span>
                  </p>
                  <DateNews startDate={item.startDate} endDate={item.endDate} lang={lang} />
                  <TimeNews startDate={item.startDate} endDate={item.endDate} />
                </div>
                <hgroup>
                  {
                    item.title && <h1 data-level-1="title"><LanguageFallback translatedAttribute={item.title} lang={lang} /></h1>
                  }
                </hgroup>
              </>
              }

              {/* If Activity */}
              {item.model === 'activities' &&
                <>
                  <div className="bandeau">
                    <p className="type-activity" data-icon="activite">{I18N_TYPE_LABELS.activities[lang][item.type]}</p>
                    <p className="title" data-level-2="title">{item.name}</p>
                  </div>
                  <hgroup>
                    {item.baseline && <h1 data-level-1="baseline"><LanguageFallback translatedAttribute={item.baseline} lang={lang} /></h1>}
                  </hgroup>
                </>
              }
            </Link>
          </li>
        ))}
      </ul>
    </section>
	);
}

