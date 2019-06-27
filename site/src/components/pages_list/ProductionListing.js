import React from 'react';
import {Link} from 'gatsby';

import FilterProduction from './fragments/FilterProduction.js';
import DateNews from '../helpers/DateNews.js';
import RawHTML from '../helpers/RawHtml.js';
import {format as formatDate, getYear, parseISO} from 'date-fns';

import LanguageFallback from './fragments/LanguageFallback.js';


const byYear = ([yearA], [yearB]) => yearB - yearA;

export default function ProductionListing({lang, list, group, types}) {
    const yearGroups = new Map();

    list.filter(p => p.date && !p.external).sort((a, b) => b.date.localeCompare(a.date)).forEach(production => {
      let year = getYear(parseISO(production.date));

      // TODO: this is a temporary workaround
      if (Number.isNaN(year)) {
        year = 2008;
      }

      if (!yearGroups.has(year)) {
        yearGroups.set(year, []);
      }

      yearGroups.get(year).push(production);
    });
    let nbItem = 0;

    return (
      <>
      <main role="main" aria-describedby="aria-accroche">
        <FilterProduction lang={lang} group={group} types={types} />
        <section className="main-filters">
        </section>

        <section id="liste" className="main-container">
        {/* <div className="accroche-titre"><p>{accroche}</p></div> */}
          <ul className="liste_objet" id="liste-productions">
            {
            Array.from(yearGroups.entries()).sort(byYear).map(([year, yearList]) => (
              <React.Fragment key={year}>
                <li id={year === 2008 ? 'years-before-2009' : `year-${year}`} className="list-year">
                  {/* <span>{year}</span>*/}
                </li>

                {yearList.map((p, i) => (
                  <React.Fragment key={i}>
                    <li data-item={nbItem} data-type={p.type} className={`list-item ${p.type}`}>
                      <Link to={p.permalink[lang]}>
                        <div className="bandeau">
                          <p className="type-production" data-icon="production"> {p.groupLabel[lang]}</p> 
                          <p className="subtype-production">{p.typeLabel !== 'media' && <span>{p.typeLabel[lang]}</span>}</p> 
                          <DateNews startDate={p.date} lang={lang} />
                          {/* the p surrounding the date used before DateNews integration className="date-production" */}
                        </div>
                        <hgroup>
                          <h1 data-level-1="title" >
                            <LanguageFallback lang={lang} translatedAttribute={p.title} />
                          </h1>
                        </hgroup> 
                        <div className="authors">
                          {p.authors && <p className="authors-paragraphe" dangerouslySetInnerHTML={{__html:p.authors.replace(/([^,$]+)(,)?( )?/g, '<nobr>$1$2</nobr>$3')}} />}
                          <p className="print publication-ref" dangerouslySetInnerHTML={{__html: p.description && (p.description[lang] || p.description[(lang === 'fr' ? 'en' : 'fr')])}} />
                        </div>
                      </Link>
                    </li>
                  
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </section>
      </main>
      </>
   );
}
