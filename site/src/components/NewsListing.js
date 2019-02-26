import React from 'react';
import {Link} from 'gatsby';
 
import FilterNews from './fragments/pageListe/FilterNews.js';
import DateNews from './fragments/DateNews.js';
import RawHTML from './RawHtml.js';
//import './scss/page_liste.scss';

export default function NewsListing({lang, list}) {
  console.log(lang, list);

  	return (
    	<>
		<FilterNews/>
		<section id="liste">
       	 	<ul className="liste_objet" id="liste-news">
       	 	{list.map((news, index) => (
				<>
				<li data-item={index} data-type={news.type} className={`list-item ${news.type}`}>
					<Link to={`/news/${news.slugs[news.slugs.length - 1]}`}>					
						<p className="date-news"><DateNews startDate={news.startDate} endDate={news.endDate} /></p>
						<h1 data-level-1="baseline">{news.title && ( lang === "fr" ? news.title.fr : news.title.en)}</h1>
						{news.name && <h2 data-level-2="title"><span>{news.name}</span></h2>}
						<p className="type">{news.label && ( lang === "fr" ? news.label.fr : news.label.en)}</p>
						<p className="go-to-object"><span>〉</span></p>
					</Link>
				</li>
				<li className="item_accroche description" data-item-accroche={index}>
					<Link to={`/activities/${news.slugs[news.slugs.length - 1]}`}>
						<RawHTML html={lang === "fr" ? news.description.fr : news.description.en} />
					</Link>
				</li>
            	</>
          	))}
			<li className="item_accroche accroche-titre">Description en une phrase de la catégorie.</li>
		</ul>
		</section>
	    </>
	 );
}
