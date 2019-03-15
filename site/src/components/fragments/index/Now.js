import React from 'react';
import {Link} from 'gatsby';

import DateNews from '../DateNews.js';
import TimeNews from '../TimeNews.js';
import ProcessedImage from '../../ProcessedImage.js';
import {IsModel} from '../../helpers.js';


export default function Now({now, lang}) {

  	//const noww = now.map(({object}) => object);
	//console.log(noww);
	console.log(now)
	return (
		<>
		<section id="now">
			<h1>À la une</h1>
			<div className="contenu">

			{now.map((item, index) =>

				<React.Fragment key={index}>
				<article data-type={item.model}>
				<Link to={item.data.permalink[lang]}>
					<p className="type" data-type={item.model}>{IsModel(item.model, lang)}</p>
					<div className="image-pre">
							<ProcessedImage size="medium" image={item.data.coverImage && item.data.coverImage.processed.medium} />
					</div>
						<hgroup>

							{/* If Production*/}
							{item.model === "productions" &&

								(item.data.title &&
									<>
									{lang === "fr" ?
										<h1 data-level-1="title">{item.data.title.fr}</h1> :
										<h1 data-level-1="title">{item.data.title.en}</h1>
									}
									<h2 data-level-2="author" className="author">
										{(item.data.author || []).map(person => <span>{person.firstName} {person.lastName}</span>)}
									</h2>
									</>
								)
							}

							{/* If People*/}
							{item.model === "people" &&
								(lang === "fr" ?
									<>
									<h1 data-level-1="name">{item.data.name && item.data.name.fr}</h1>
									<h2 data-level-2="role">{item.data.title && item.data.title.en}</h2>
									</>
									:
									<>
									<h1 data-level-1="name">{item.data.name && item.data.name.en}</h1>
									<h2 data-level-2="role">{item.data.title && item.data.title.en}</h2>
									</>
								)
							}

							{/* If News */}
							{item.model === "news" &&
								(lang === "fr" ?
									<>
									<h1 data-level-1="title">{item.data.title && item.data.title.fr}</h1>
									{ item.data.date &&
										<>
										<DateNews startDate={item.data.startDate} endDate={item.data.endDate} />
										<TimeNews startDate={item.data.startDate} endDate={item.data.endDate} />
										</>
									}
									<h2 data-level-2="label">{item.data.label && item.data.label.fr}</h2>
									</>
									:
									<>
									<h1 data-level-1="title">{item.data.label && item.data.title.en}</h1>
									{ item.data.date &&
										<>
										<DateNews startDate={item.data.startDate && item.data.startDate} endDate={item.data.endDate} />
										<TimeNews startDate={item.data.startDate && item.data.startDate} endDate={item.data.endDate} />
										</>
									}
									<h2 data-level-2="label">{item.data.label.en}</h2>
									</>
								)
							}

							{/* If Activity */}
							{item.model === "activities" &&
								<>
								{lang === "fr" ?
									<h1 data-level-1="baseline">{item.data.baseline && item.data.baseline.fr}</h1> :
									<h1 data-level-1="baseline">{item.data.baseline && item.data.baseline.en}</h1>
								}
								<h2 data-level-2="name">{item.data.name}</h2>
								</>
							}

							<p className="more"><Link to={item.data.permalink[lang]}>{lang === "fr" ? "En savoir plus" : "Get more about it"}</Link></p>
						</hgroup>
				</Link>
				</article>
				</React.Fragment>

	        )}

			</div>
		</section>
		</>
	);
}

