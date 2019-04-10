import React from 'react';
import {Link} from 'gatsby';
import {IsModel} from '../../helpers/helpers.js';
import RawHTML from '../../helpers/RawHtml.js';

import DateNews from '../helpers/DateNews.js';
import ProcessedImage from '../../helpers/ProcessedImage.js';


export default function highlights({people, lang}) {
  if ((people.mainActivities && people.mainActivities.length > 0) || (people.mainProductions && people.mainProductions.length > 0)) {
    return (

      <section id="highlights">
        <h1>{lang === 'fr' ? 'Activité(s) et production(s) principale(s)' : 'Main activities and productions' }</h1>
        <div className="contenu">
          { people.mainActivities &&
            <>
              
              <ul id="highlights-list-activity" data-type="activities">
                { people.mainActivities.map((item, index) => (
                  <li key={index} data-item={index}>
                    <Link to={item.permalink[lang]}>
                      <div className="title-group">
                        <h1 data-icon="activite" data-level-1="baseline" >{item.baseline && (lang === 'fr' ? item.baseline.fr : item.baseline.en)}</h1>
                      </div>
                      <div className="details">
                        <p className="type-activity">{IsModel(item.type, lang)}</p>
                        <p className="title" data-level-2="title">{item.name}</p>
                      </div>
                      <div className="accroche">
                        <p className="accroche-paragraphe">
                          {item.description && <RawHTML html={lang === 'fr' ? item.description.fr : item.description.en} />}
                        </p>
                        <div className="image-pre">
                          <ProcessedImage size="medium" image={item.coverImage && item.coverImage.processed.medium} />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          }
          { people.mainProductions &&
            <>
              {/* <h1 className="type">{lang === 'fr' ? 'Production(s) majeure(s)' : 'Main productions' }</h1> */}
              <ul id="highlights-list-production" data-type="productions">
                { people.mainProductions.map((item, index) => (



                  <li key={index} data-item={index}>
                    <Link to={item.permalink[lang]}>
                      <div className="title-group">
                        <h1 data-icon="production" data-level-1="title" >{lang === 'fr' ? item.title.fr : item.title.en}</h1>
                      </div>
                      <div className="details">
                        {/* <p className="type-production"> <span>{lang === 'fr' ? item.groupLabel.fr : item.groupLabel.en}</span> {item.typeLabel !== 'media' && lang === 'fr' ? <span>{item.typeLabel.fr}</span> : <span>{item.typeLabel.en}</span>}</p> */}
                        <p className="date-production">{item.date}</p>
                      </div>
                      <div className="authors">
                        <p className="authors-paragraphe">
                        {item.authors}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          }
        </div>
      </section>
    );
  }
  else {
    return null;
  }

}
