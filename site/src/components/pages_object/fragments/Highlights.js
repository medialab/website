import React from 'react';
import {Link} from 'gatsby';
import {IsModel} from '../../helpers/helpers.js';
import RawHTML from '../../helpers/RawHtml.js';

import DateNews from '../../helpers/DateNews.js';
import ProcessedImage from '../../helpers/ProcessedImage.js';


export default function highlights({people, lang}) {
  if ((people.mainActivities && people.mainActivities.length > 0) || (people.mainProductions && people.mainProductions.length > 0)) {
    return (

      <section id="highlights">
        <>
        <h1>{lang === 'fr' ? 'Activité(s) et production(s) principale(s)' : 'Main activities and productions' }</h1>
        <div className="contenu">
          <ul id="highlights-list-activity" data-type="activities">
            { people.mainActivities &&
              people.mainActivities.map((a, index) => (
                <li data-type={a.type} className="list-item" key={index}>
                  <Link to={a.permalink[lang]}>
                    <div className="image-pre">
                        <ProcessedImage size="small" image={a.coverImage && a.coverImage.processed.small} />
                    </div>
                    <div className="bandeau">
                      <p className="type-activity" data-icon="activite">{IsModel(a.type, lang)}</p>
                      <p className="title" data-level-2="title">{a.name}</p>
                    </div>
                    <hgroup>
                      <h1 data-level-1="baseline" >{a.baseline && (lang === 'fr' ? a.baseline.fr : a.baseline.en)}</h1>
                    </hgroup>                   
      
                  </Link>
                </li>              
              ))          
            }
          </ul>
          <ul id="highlights-list-production" data-type="productions">
            { people.mainProductions && 
              people.mainProductions.map((p, index) => (
                  <li data-type={p.type} className="list-item" key={index}>
                    <Link to={p.permalink[lang]}>
                      <div className="image-pre">
                          <ProcessedImage size="small" image={p.coverImage && p.coverImage.processed.small} />
                      </div>
                      <div className="bandeau">
                        <p className="type-production" data-icon="production"> {p.groupLabel[lang]}</p> 
                        {p.typeLabel !== 'media' && 
                          <p className="subtype-production"> {lang === 'fr' ? <span>{p.typeLabel.fr}</span> : <span>{p.typeLabel.en}</span>}</p> 
                        }
                        {/* { p.date && <p className="date-production">{p.date}</p> } */}
                        <p className="authors">{p.authors}</p>
                      </div>
                      <hgroup>
                        <h1 data-level-1="title" >{lang === 'fr' ? p.title.fr : p.title.en}</h1>
                      </hgroup>
  
                    </Link>
                  </li>
              ))
            }
          </ul>
        </div>
        </>
      </section>
    );
  }
  else {
    return null;
  }

}
