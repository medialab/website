import React from 'react';
import {Link} from 'gatsby';

import Nav from './common/Nav.js';

import RawHtml from './helpers/RawHtml';
import {IsModel} from './helpers/helpers.js';
import {templateMembership} from './helpers/helpers.js';

import DateNews from './helpers/DateNews.js';
import TimeNews from './helpers/TimeNews.js';
import {format as formatDate, getYear, parseISO} from 'date-fns';

export default function Archive({lang, activities, news, productions}) {

    return (
      <>
      <main role="main">
        <section id="archive" className="main-container">
        	<p className="introduction">
        		Cette page est une archive...
        	</p>
        	<section id="archive_news" className="type">
        		<h1>{ lang === 'fr' ? "Actualités" : "News"}</h1>
         		<ul className="list">
	            {news.map((n, index) => (
		            <li key={n.permalink.fr} data-type="actualite" className="item">
		              <Link to={n.permalink[lang]}>
		                <div className="bandeau">
							<p data-icon="news" className="type-news">{IsModel(n.type, lang)}</p>
							<p className="label-news">{n.label && (lang === 'fr' ? <span>{n.label.fr}</span> : <span>{n.label.en}</span>)}</p>
							
							<DateNews startDate={n.startDate} endDate={n.endDate} lang={lang} />
							{/*<TimeNews startDate={n.startDate} endDate={n.endDate} />*/}


		                </div>
		                <hgroup>
		                	<h1 data-level-1="baseline" >{n.title && (lang === 'fr' ? n.title.fr : n.title.en)}</h1>
		                </hgroup>                   
		              </Link>
		            </li>
	            ))}
          		</ul>
          	</section> 


        	<section id="archive_productions" className="type">
        		<h1>Productions</h1>
         		<ul className="list">
	            {productions.map((p, index) => (
		            <li key={p.permalink.fr} data-type="production" className="item">
		              <Link to={p.permalink[lang]}>
		                <div className="bandeau">
		                  <p className="type-production" data-icon="production"> {p.groupLabel[lang]}</p>
		                  {p.authors && <p className="authors">{p.authors}</p>}
		                </div>
		                <hgroup>
		                  <h1 data-level-1="title" >{lang === 'fr' ? p.title.fr : p.title.en}</h1>
		                </hgroup>                   
		              </Link>
		            </li>
	            ))}
          		</ul>
          	</section>



        	<section id="archive_activities" className="type">
        		<h1>{ lang === 'fr' ? "Activités" : "Activities"}</h1>
         		<ul className="list">
	            {activities.map((a, index) => (
		            <li key={a.permalink.fr} data-type="activite" className="item">
		              <Link to={a.permalink[lang]}>
		                <div className="bandeau">
		                  <p className="type-activity" data-icon="activite">{IsModel(a.type, lang)}</p>
		                  <p className="title" data-level-2="title">{a.name}</p>
		                </div>
		                <hgroup>
		                  <h1 data-level-1="baseline" >{a.baseline && (lang === 'fr' ? a.baseline.fr : a.baseline.en)}</h1>
		                </hgroup>                   
		              </Link>
		            </li>
	            ))}
          		</ul>
          	</section>


        </section>
      </main>
      </>
   );
}

