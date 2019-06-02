import React from 'react';
import {Link} from 'gatsby';


import DateNews from '../../helpers/DateNews.js';
import TimeNews from '../../helpers/TimeNews.js';
import ProcessedImage from '../../helpers/ProcessedImage.js';
import {IsModel} from '../../helpers/helpers.js';
import RawHTML from '../../helpers/RawHtml.js';


export default function Now({now, lang}) {

  	//const noww = now.map(({object}) => object);
	//console.log(noww);
	// console.log(now);
	return (
  <>
    <section id="now">
      <h1>{ lang === "fr" ? "À la une" : "Headlines"}</h1>
     
      <ul className="contenu">
      {now.map((item, index) =>

        (<React.Fragment key={index}>
        <li data-type={item.model} className="now-item" key={index}>
          <Link to={item.data.permalink[lang]}>
            <div className="image-pre">
                <ProcessedImage size="small" image={item.data.coverImage && item.data.coverImage.processed.small} />
            </div>
              {/* If Production*/}
              {item.model === 'productions' &&
								<>
                <div className="bandeau">
                  <p className="type-production" data-icon="production">{IsModel(item.data.type, lang)}</p>
                  <p className="subtype-production">{item.data.typeLabel !== 'media' && lang === 'fr' ? <span>{item.data.typeLabel.fr}</span> : <span>{item.data.typeLabel.en}</span>}</p>
                  <p className="authors">{item.data.authors}</p>
                </div>
                <hgroup>
                (item.data.title &&
                  {lang === 'fr' ?
                    <h1 data-level-1="title">{item.data.title.fr}</h1> :
                    <h1 data-level-1="title">{item.data.title.en}</h1>
                	}
                  <h2 data-level-2="author" className="author">
                    {(item.data.author || []).map(person => <span>{person.firstName} {person.lastName}</span>)}
                  </h2>
                  )
                </hgroup>
							  </>
              }





              {/* If People*/}
              {item.model === 'people' &&
                <>
                <div className="bandeau">
                  <p className="type-people" data-icon="people">{ lang === 'fr' ? "Membre du labo" : "Labo member"}</p>
                </div>
                <hgroup>
							  (lang === 'fr' ?
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
                </hgroup>
                </>
							}

              {/* If News */}
              {item.model === 'news' &&
                <>
                <div className="bandeau">
                    <p data-icon="news" className="type-news">{IsModel(item.data.type, lang)}{item.data.label && (lang === 'fr' ? <span>, {item.data.label.fr}</span> : <span>, {item.data.label.en}</span>)}</p>
                    <DateNews startDate={item.data.startDate} endDate={item.data.endDate} lang={lang} />
                    <TimeNews startDate={item.data.startDate} endDate={item.data.endDate} />
                </div>
                <hgroup>
						    {lang === 'fr' ? <h1 data-level-1="title">{item.data.title && item.data.title.fr}</h1> : <h1 data-level-1="title">{item.data.label && item.data.title.en}</h1>}
                </hgroup>
                </>
							}

              {/* If Activity */}
              {item.model === 'activities' &&
                <>
                  <div className="bandeau">
                    <p className="type-activity" data-icon="activite">{IsModel(item.data.type, lang)}</p>
                    <p className="title" data-level-2="title">{item.data.name}</p>
                  </div>
                  <hgroup>
                    {lang === 'fr' ?
                      <h1 data-level-1="baseline">{item.data.baseline && item.data.baseline.fr}</h1> :
                      <h1 data-level-1="baseline">{item.data.baseline && item.data.baseline.en}</h1>
                      }
                  </hgroup>
                </>
							}






              {/* <p className="more"><Link to={item.data.permalink[lang]}>{lang === 'fr' ? 'En savoir plus' : 'Get more about it'}</Link></p> */}

            </Link>
          </li>
        </React.Fragment>)

        )}
      </ul>
    </section>
  </>
	);
}

