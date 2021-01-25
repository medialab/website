import React from 'react';
import Link from '../helpers/Link';

import {I18N_TYPE_LABELS, I18N_GROUP_LABELS} from '../../i18n.js';

import ProductionFilter from './fragments/ProductionFilter.js';
import DateNews from '../helpers/DateNews.js';
import {compare, productionTypeToSchemaURL} from '../helpers/helpers.js';
import {getYear, parseISO, format} from 'date-fns';

import PageMeta from '../helpers/PageMeta.js';

const messagesMeta = {
  title: {
    fr: 'Productions | médialab Sciences Po',
    en: 'Productions | médialab Sciences Po'
  },
  description: {
    fr:
      'Aux traditionnelles publications académiques s’ajoutent les “éditions web” qui projettent les activités du laboratoire dans un média interactif et ouvrent de nouveaux moyens de représentation et d’exploration visuelle des résultats. Les mises en situation -expositions, workshops, simulations, etc.- permettent d’engager des publics dans le processus de recherche et de confronter les hypothèses à la réalité du terrain.',
    en:
      'In addition to traditional academic publications, "Web publications" also disseminate the laboratory\'s activities through an interactive medium that opens up new ways of representing and visually exploring findings. Situations – exhibitions, workshops, simulations, etc. – allow for the public’s involvement in the research process and the testing of hypotheses against the reality on the ground'
  }
};

const byYear = ([yearA], [yearB]) => yearB - yearA;

export default function ProductionListing({lang, list, group, types}) {
  const yearGroups = new Map();

  list
    .map(p => {
      if (!p.date) {
        // if no date take the last modification one as a proxy
        p.date = format(new Date(p.lastUpdated), 'yyyy-MM');
      }
      return p;
    })
    .sort((a, b) => compare(b.date, a.date))
    .forEach(production => {
      let year = getYear(parseISO(production.date));

      if (!yearGroups.has(year)) {
        yearGroups.set(year, []);
      }

      yearGroups.get(year).push(production);
    });

  const nbItem = 0;
  const otherLang = lang === 'fr' ? 'en' : 'fr';

  return (
    <>
      <PageMeta
        title={messagesMeta.title[lang]}
        description={messagesMeta.description[lang]}
        lang={lang}
      />
      <main role="main" aria-describedby="aria-accroche">
        <ProductionFilter
          lang={lang}
          group={group}
          types={types}
          years={Array.from(yearGroups.keys())}
        />
        <section className="main-filters" />

        <section id="liste" className="main-container">
          {/* <div className="accroche-titre"><p>{accroche}</p></div> */}
          <ul className="liste_objet" id="liste-productions">
            {Array.from(yearGroups.entries())
              .sort(byYear)
              .map(([year, yearList]) => (
                <React.Fragment key={year}>
                  <li id={`year-${year}`} className="list-year">
                    {/* <span>{year}</span>*/}
                  </li>

                  {yearList.map((p, i) => (
                    <li
                      key={i}
                      itemScope
                      itemType={productionTypeToSchemaURL(p.type)}
                      data-item={nbItem}
                      data-type={p.type}
                      className={`list-item ${p.type}`}>
                      <Link to={p.permalink[lang]}>
                        <div className="bandeau">
                          <p className="type-production" data-icon="production">
                            {' '}
                            {I18N_GROUP_LABELS.productions[lang][p.group]}
                          </p>
                          <p className="subtype-production">
                            <span>
                              {I18N_TYPE_LABELS.productions[lang][p.type]}
                            </span>
                          </p>
                          <DateNews
                            startDateSchemaProp={
                              p.type === 'exhibition'
                                ? 'startDate'
                                : 'datePublished'
                            }
                            startDate={p.date}
                            lang={lang}
                          />
                          {/* the p surrounding the date used before DateNews integration className="date-production" */}
                        </div>
                        <hgroup>
                          <h1 itemProp="name" data-level-1="title">
                            {p.title[lang] || p.title[otherLang]}
                          </h1>
                        </hgroup>
                        <div className="authors">
                          {p.authors && (
                            <p
                              itemProp={
                                p.type !== 'exhibition' ? 'author' : undefined
                              }
                              className="authors-paragraphe"
                              dangerouslySetInnerHTML={{
                                __html: p.authors.replace(
                                  /([^,$]+)(,)?( )?/g,
                                  '<nobr>$1$2</nobr>$3'
                                )
                              }}
                            />
                          )}
                          <p
                            className="print publication-ref"
                            dangerouslySetInnerHTML={{
                              __html:
                                p.description &&
                                (p.description[lang] ||
                                  p.description[otherLang])
                            }}
                          />
                        </div>
                        {/* microdata-related invisible elements */}
                        <div style={{display: 'none'}}>
                          {p.type === 'software' && (
                            <>
                              <div itemProp="applicationCategory">
                                Scientific
                              </div>
                              <div itemProp="operatingSystem">*</div>
                            </>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </React.Fragment>
              ))}
          </ul>
        </section>
      </main>
    </>
  );
}
