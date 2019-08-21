import React from 'react';
import {Link} from 'gatsby';

import NewsFilter from './fragments/NewsFilter.js';
import DateNews from '../helpers/DateNews.js';
import TimeNews from '../helpers/TimeNews.js';
import ProcessedImage from '../helpers/ProcessedImage.js';
import {I18N_TYPE_LABELS} from '../../i18n.js';
import {getYear, parseISO} from 'date-fns';

import LanguageFallback from '../helpers/LanguageFallback.js';

import PageMeta from '../helpers/PageMeta.js';

const messagesMeta = {
  title: {
    fr: 'Actualités | médialab Sciences Po',
    en: 'News | médialab Sciences Po',
  },
  description: {
    fr: 'rendez-vous, chroniques et annonces du médialab',
    en: 'events, posts and notices from the médialab'
  }
};

const byYear = ([yearA], [yearB]) => yearB - yearA;
const byYearKey = (yearA, yearB) => yearB - yearA;

export default function NewsListing({lang, list}) {
	// console.log(lang, list);
	const yearGroups = new Map();

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
  const nbNews = 0;
  return (
    <>
      <PageMeta
        title={messagesMeta.title[lang]}
        description={messagesMeta.description[lang]}
        lang={lang} />
      <main role="main" aria-describedby="aria-accroche">
        <NewsFilter lang={lang} years={Array.from(yearGroups.keys()).sort(byYearKey)} />
        <section className="main-filters" />

        <section id="liste" className="main-container">

          <ul className="liste_objet" id="liste-news">
            {Array.from(yearGroups.entries()).sort(byYear).map(([year, yearNews], index) => (
              <React.Fragment key={index}>
                <li id={`year-${year}`} className="list-year">
                  {/* <span>{year}</span> */}
                </li>
                {yearNews.map((news, i) => (
                  <li
                    key={i}
                    itemScope itemProp={news.type !== 'post' ? 'event' : 'subjectOf'} itemType={news.type !== 'post' ? 'https://schema.org/Event' : 'https://schema.org/CreativeWork'}
                    data-item={nbNews} data-type={news.type} className={`list-item ${news.type}`}>
                    <Link to={news.permalink[lang]}>
                      <div className="image-pre" aria-hidden="true">
                        <ProcessedImage
                          data={news}
                          size="medium"
                          image={news.coverImage && news.coverImage.processed.medium} />
                      </div>
                      <div className="bandeau">
                        <p data-icon="news" className="type-news">{I18N_TYPE_LABELS.news[lang][news.type]}</p>
                        <p className="label-news"><LanguageFallback lang={lang} translatedAttribute={news.label} /></p>
                        <div>
                          <DateNews startDate={news.startDate} endDate={news.endDate} lang={lang} />
                          <TimeNews startDate={news.startDate} endDate={news.endDate} />
                        </div>
                      </div>
                      <hgroup>
                        <h1 itemProp="name" data-level-1="baseline" >
                          <LanguageFallback lang={lang} translatedAttribute={news.title} />
                        </h1>
                      </hgroup>
                      <div className="accroche">
                        <p itemProp="description" className="accroche-paragraphe">
                          <LanguageFallback lang={lang} translatedAttribute={news.description} />
                        </p>
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
