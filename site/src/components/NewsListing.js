import React from 'react';
import {Link} from 'gatsby';
 
/*import FilterNews from './fragments/pageListe/FilterNews.js';*/
import RawHTML from './RawHtml.js';
import './scss/page_liste.scss';

export default function NewsListing({lang, list}) {
  console.log(lang, list);

  	return (
    	<>
		{/*<FilterNews />*/}
		<section id="liste">
       	 	<ul className="liste_objet" id="liste-activity">
       	 	{list.map((news, index) => (
				<>
				<li data-item={index} data-type={news.type} className={`list-item ${news.type}`}>
					<Link to={`/news/${news.slugs[news.slugs.length - 1]}`}>
						<h1 data-level-1="baseline">{news.title && ( lang === "fr" ? news.title.fr : news.title.en)}</h1>
						<h2 data-level-2="title">{news.name}</h2>
						<p className="type">{news.label && ( lang === "fr" ? news.label.fr : news.label.en)}</p>
						<p className="date">{news.startDate && news.startDate}{news.endDate && news.endDate}</p>
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
