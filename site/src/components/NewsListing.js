import React from 'react';
import { Link } from 'gatsby';

import FilterNews from './fragments/pageListe/FilterNews.js';
import DateNews from './fragments/DateNews.js';
import TimeNews from './fragments/TimeNews.js';
import RawHTML from './RawHtml.js';
//import './scss/page_liste.scss';
import { format as formatDate, getYear, parseISO } from 'date-fns';
// import { en, fr } from 'date-fns/locale'

const byYear = ([yearA], [yearB]) => yearB - yearA;

export default function NewsListing({lang, list}) {
	console.log(lang, list);
	const yearGroups = new Map();


	let accroche;

	if (lang === 'fr') {
		accroche = 'Description en une phrase de la catégorie actualité';
	}
	else {
		accroche = 'Description in english en une phrase de la catégorie actualité';
	}

	list.forEach(news => {
    const year = getYear(parseISO(news.startDate));
		if (Number.isNaN(year)) {
			return;
		}

		if (!yearGroups.has(year)) {
			yearGroups.set(year, []);
		}

		yearGroups.get(year).push(news);
  });
  let nbNews = 0;
  return (
  <>
    <FilterNews lang={lang} years={Array.from(yearGroups.keys()).sort(byYear)} />
    <section id="liste">
      <p className="accroche-titre-phone">{accroche}</p>
      <ul className="liste_objet" id="liste-news">
        {Array.from(yearGroups.entries()).sort(byYear).map(([year, yearNews], index) => (
          <>
            <li id={`year-${year}`} className="list-year">
              <span>{year}</span>
              <pre>░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</pre>
            </li>
            {yearNews.map((news) => (
              <>
                <li data-item={nbNews} data-type={news.type} className={`list-item ${news.type}`}>
                  <Link to={news.permalink[lang]}>
                    <DateNews startDate={news.startDate} endDate={news.endDate} lang={lang} />
                    {/* <p className="date-news differentYear"><span className="startDate" >10 décembre</span><span className="endDate" >⇥ 10 novembre 2019</span></p>		 */}
                    <TimeNews startDate={news.startDate} endDate={news.endDate} />
                    <h1 data-level-1="baseline">{news.title && (lang === 'fr' ? news.title.fr : news.title.en)}</h1>
                    {news.name && <h2 data-level-2="title"><span>{news.name}</span></h2>}
                    <p className="type">{news.label && (lang === 'fr' ? news.label.fr : news.label.en)}</p>
                    <p className="go-to-object"><span>〉</span></p>
                  </Link>
                </li>
                <li className="item_accroche description" data-item-accroche={nbNews++}>
                  <Link to={news.permalink[lang]}>
                    <RawHTML html={lang === 'fr' ? news.description.fr : news.description.en} />
                  </Link>
                </li>
              </>
            ))}
          </>
        ))}
        <li className="item_accroche accroche-titre">Description en une phrase de la catégorie.</li>
      </ul>
    </section>
	</>
	);
}
