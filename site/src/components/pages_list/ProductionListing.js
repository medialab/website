import React from 'react';
import {Link} from 'gatsby';

import FilterProduction from './fragments/FilterProduction.js';
import RawHTML from '../helpers/RawHtml.js';
import {format as formatDate, getYear, parseISO} from 'date-fns';


const byYear = ([yearA], [yearB]) => yearB - yearA;

export default function ProductionListing({lang, list, group, types}) {
    const yearGroups = new Map();

    let accroche;

    if (lang === 'fr') {
      accroche = 'Issues des dynamiques de recherche du laboratoire combinant méthode, analyse et théorie, les productions du médialab constituent un panorama hétéroclite. Aux traditionnelles publications académiques s’ajoute un ensemble de réalisations techniques qui répondent à des problèmes de recherche récurrents. Récemment, les sites web et réalisations en situation se sont développés comme de nouvelles formes pour rendre compte des activités du laboratoire.';
    }
    else {
      accroche = 'Description in english en une phrase de la catégorie production';
    }


    list.filter(p => p.date).sort((a, b) => b.date.localeCompare(a.date)).forEach(production => {
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
        <FilterProduction lang={lang} group={group} types={types} />
        <section id="liste">
        <div className="accroche-titre"><p>{accroche}</p></div>
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
                        <div className="title-group">
                          <h1 data-level-1="title" >{lang === 'fr' ? p.title.fr : p.title.en}</h1>
                        </div>
                        <div className="details">
                          <p className="type-production" data-icon="production"> {lang === 'fr' ? p.groupLabel.fr : p.groupLabel.en}</p> 
                          <p className="subtype-production">{p.typeLabel !== 'media' && lang === 'fr' ? <span>{p.typeLabel.fr}</span> : <span>{p.typeLabel.en}</span>}</p>
                          <p className="date-production">{p.date}</p>
                        </div>
                        <div className="authors">
                          <p className="authors-paragraphe">
                          {p.authors}
                          </p>
                        </div>
                      </Link>
                    </li>
                  
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </ul>
        </section>
      </>
   );
}
