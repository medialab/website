import React from 'react';
import Link from '../../helpers/Link';
import {SECTIONS} from '../../helpers/sections';

import DateNews from '../../helpers/DateNews.js';
import TimeNews from '../../helpers/TimeNews.js';
import {I18N_TYPE_LABELS} from '../../../i18n.js';
import {compare} from '../../helpers/helpers.js';
import LanguageFallback from '../../helpers/LanguageFallback.js';
import ProcessedImage from '../../helpers/ProcessedImage.js';

const RelatedNews = ({lang, actu, isSeminar, filter, titles}) => {
  const related = SECTIONS.news;

  // Si aucune actu liée, retourne null
  if (!actu || actu.length === 0) return null;

  let sorted = actu.slice().sort((a, b) => {
    return -compare(a.startDate, b.startDate);
  });
  if (filter) {
    const now = new Date().getTime();
    if (filter === 'future') {
      sorted = sorted
        .filter(a => new Date(a.startDate).getTime() > now)
        .reverse();
    } else if (filter === 'past') {
      sorted = sorted.filter(a => new Date(a.startDate).getTime() < now);
    }
  }

  let accroche;
  if (titles) {
    accroche = titles[lang];
  } else if (lang === 'fr') {
    accroche = related.fr + String.fromCharCode(8239);
  } else {
    accroche = related.en;
  }

  return (
    <aside
      className="container elements-associes-block"
      id="news"
      role="complementary"
      aria-label={related[lang]}>
      <h1>
        <span data-icon="actualités" /> {accroche}{' '}
      </h1>

      <div className="contenu">
        <ul
          className={`liste_objet ${isSeminar ? 'liste_seminaire' : ''} ${
            filter ? filter : ''
          }`}>
          {sorted.map((n, i) =>
            isSeminar ? (
              <li
                key={n.permalink.fr}
                itemProp="event"
                itemScope
                itemType="https://schema.org/Event"
                data-item={i}
                data-type={n.type}
                className={`list-item ${n.type}`}>
                <Link to={n.permalink[lang]}>
                  <div className="image-pre" aria-hidden="true">
                    <ProcessedImage
                      data={n}
                      size="medium"
                      image={n.coverImage && n.coverImage.processed.medium}
                    />
                  </div>
                  <div className="bandeau">
                    <p data-icon="news" className="type-news">
                      {I18N_TYPE_LABELS.news[lang][n.type]}
                    </p>
                    <p className="label-news">
                      <LanguageFallback
                        lang={lang}
                        translatedAttribute={n.label}
                      />
                    </p>
                    <div>
                      <DateNews
                        startDate={n.startDate}
                        endDate={n.endDate}
                        lang={lang}
                      />
                      <TimeNews startDate={n.startDate} endDate={n.endDate} />
                    </div>
                  </div>
                  <hgroup>
                    <h1 itemProp="name" data-level-1="baseline">
                      <LanguageFallback
                        lang={lang}
                        translatedAttribute={n.title}
                      />
                    </h1>
                  </hgroup>
                  <div className="accroche">
                    <p className="accroche-paragraphe">
                      <LanguageFallback
                        lang={lang}
                        translatedAttribute={n.description}
                      />
                    </p>
                  </div>
                  <div
                    style={{display: 'none'}}
                    itemProp="location"
                    itemScope
                    itemType="https://schema.org/Place">
                    <span itemProp="address">{n.place}</span>
                  </div>
                </Link>
              </li>
            ) : (
              <li key={n.permalink.fr} data-type="activite" className="item">
                <Link to={n.permalink[lang]} className="accroche">
                  <div className="bandeau">
                    <p data-icon="news" className="type">
                      {I18N_TYPE_LABELS.news[lang][n.type]}{' '}
                      <span>
                        {n.label && (n.label[lang] || n.label.fr || n.label.en)}
                      </span>
                    </p>
                    <DateNews
                      startDate={n.startDate}
                      endDate={n.endDate}
                      lang={lang}
                    />
                    <TimeNews startDate={n.startDate} endDate={n.endDate} />
                  </div>
                  <hgroup>
                    <h1 data-level-2="title">
                      <LanguageFallback
                        lang={lang}
                        translatedAttribute={n.title}
                      />
                    </h1>
                  </hgroup>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </aside>
  );
};

export default RelatedNews;
