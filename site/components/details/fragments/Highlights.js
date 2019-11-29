import React from 'react';
import Link from '../../helpers/Link';

import {I18N_MODEL, I18N_TYPE_LABELS, I18N_GROUP_LABELS} from '../../../i18n.js';

import ProcessedImage from '../../helpers/ProcessedImage.js';
import LanguageFallback from '../../helpers/LanguageFallback.js';

import {SECTIONS} from '../../helpers/sections';

const i18n = {
  fr: {
    externalProduction: 'Ce lien renvoi à une page exterieure au médialab',
    activityLink: 'Lien vers cette Activité',
    productionLink: 'Lien vers cette production'
  },
  en: {
    externalProduction: 'This linked is external to médialab',
    activityLink: 'Link to this activity',
    productionLink: 'Link to this production'
  }
};

const ProductionCard = ({p, lang}) => {
  return (
    <>
      <div className="bandeau">
        <p className="type-production" data-icon="production"> {I18N_GROUP_LABELS.productions[lang][p.group]}</p>
        {p.type !== 'media' &&
          <p className="subtype-production"> <span>{I18N_TYPE_LABELS.productions[lang][p.type]}</span></p>
        }
        {p.authors && <p className="authors">{p.authors}</p>}
        {p.external && p.url && (
          <p
            className="external"
            aria-label="production exterieure au médialab"
            title={i18n[lang].externalProduction}>
            ⤤
          </p>
        )}
      </div>
      <hgroup>
        <h1 data-level-1="title" >
          <LanguageFallback lang={lang} translatedAttribute={p.title} />
        </h1>
      </hgroup>
    </>
  );
};

export default function Highlights({people, lang}) {

  let titleActivity, titleProduction;

  if (people.mainActivities && people.mainActivities.length > 0) {
    titleActivity = <h2 data-icon="activite">{I18N_MODEL[lang].activities}</h2>;
  }
  else {
    titleActivity = '';
  }

  if (people.mainProductions && people.mainProductions.length > 0) {
    titleProduction = <h2 data-icon="production">Productions</h2>;
  }
  else {
    titleProduction = '';
  }

  if (
    (people.mainActivities && people.mainActivities.length > 0) ||
    (people.mainProductions && people.mainProductions.length > 0)
  ) {

    return (
      <section id="highlights" aria-describedby="aria-title" >
        <h1 id="aria-title">{SECTIONS.highlights[lang]}</h1>
        <div className="contenu">
          { titleActivity }
          <ul id="highlights-list-activity" data-type="activities">
            { people.mainActivities &&
            people.mainActivities.map((a, index) => (
              <li data-type={a.type} className="list-item" key={index}>
                <Link to={a.permalink[lang]} aria-label={i18n[lang].activityLink}>
                  <div className="image-pre" aria-hidden="true">
                    <ProcessedImage size="small" image={a.coverImage && a.coverImage.processed.small} data={a} />
                  </div>
                  <div className="bandeau">
                    <p className="type-activity" data-icon="activite">{I18N_TYPE_LABELS.activities[lang][a.type]}</p>
                    <p className="title" data-level-2="title">{a.name}</p>
                  </div>
                  <hgroup>
                    <h1 data-level-1="baseline" >
                      <LanguageFallback lang={lang} translatedAttribute={a.baseline} />
                    </h1>
                  </hgroup>
                </Link>
              </li>
            ))
          }
          </ul>
          {titleProduction}
          <ul id="highlights-list-production" data-type="productions">
            {people.mainProductions &&
            people.mainProductions.map((p, index) => (
              <li data-type={p.type} className="list-item" key={index}>
                {!p.external && (
                  <Link to={p.permalink[lang]} aria-label={i18n[lang].productionLink}>
                    <ProductionCard p={p} lang={lang} />
                  </Link>
                )}
                {p.external && p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer noopener">
                    <ProductionCard p={p} lang={lang} />
                  </a>
                )}
                {p.external && !p.url && (
                  <ProductionCard p={p} lang={lang} />
                )}
              </li>
            ))
          }
          </ul>
        </div>
      </section>
    );
  }

  return null;
}
