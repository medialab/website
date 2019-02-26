import React from 'react';
import {Link} from 'gatsby';

import FilterProduction from './fragments/pageListe/FilterProduction.js';
import RawHTML from './RawHtml.js';
import {format as formatDate, getYear, parseISO} from 'date-fns'
import {en, fr} from 'date-fns/locale'

/* import {templateMembership} from './helpers.js';  */
import './scss/page_liste.scss';

const byYear = ([yearA], [yearB]) => yearB - yearA;

export default function ProductionListing({lang, list, group, types}) {
    const yearGroups = new Map();

    list.forEach(production => {
      const year = getYear(parseISO(production.date));
      if (Number.isNaN(year)) {
        return;
      }

      if (!yearGroups.has(year)) {
        yearGroups.set(year, []);
      }

      yearGroups.get(year).push(production);
    });

  	return (
    	<>
    		<FilterProduction />

        <section id="liste">
          <p className="accroche-titre-phone">Description en une phrase de la catégorie production....</p>
          <ul className="liste_objet" id="liste-productions">

          {Array.from(yearGroups.entries()).sort(byYear).map(([year, list]) => (
            <>
            <li id={year === 2008 ? 'years-before-2009' : `year-${year}`} className="list-year">
                <span>{year}</span>
                <pre>░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</pre>
            </li>

            {list.map((p, index) => (
                <>
                <li data-item={index} data-type={p.type} className={`list-item ${p.type}`}>
                <Link to={`/productions/${p.slugs[p.slugs.length - 1]}`}>
                    <h1 data-level-1="title">{lang === "fr" ? p.title.fr : p.title.en}</h1>
                    {p.authors && <h2 data-level-2="authors"><span>{p.authors}</span></h2>}
                    {p.date && <p className="date">{p.date}</p>}
                    <p className="type">
                    {lang === "fr" ? p.groupLabel.fr : p.groupLabel.en} - {lang === "fr" ? p.typeLabel.fr : p.typeLabel.en}
                    </p>
                    <p className="go-to-object"><span>〉</span></p>
                  </Link>
                </li>
                <li className="item_accroche description" data-item-accroche={index}>
                  <Link to={`/productions/${p.slugs[p.slugs.length - 1]}`}>
                        <RawHTML html={lang === "fr" ? p.description.fr : p.description.en} />
                  </Link>
                </li>
              	</>
            ))}
            </>
          ))}

          <li className="item_accroche accroche-titre">Description en une phrase de la catégorie Production</li>
        </ul>
        </section>
      </>
	 );
}
