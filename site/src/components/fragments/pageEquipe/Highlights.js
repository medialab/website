import React from 'react';
import {Link} from 'gatsby';

import DateNews from '../DateNews.js';
import ProcessedImage from '../../ProcessedImage.js';


export default function highlights({people, lang}) {
  if ((people.mainActivities && people.mainActivities.length > 0) || (people.mainProductions && people.mainProductions.length > 0)) {
    return (
      <section id="highlights">
        <div className="contenu">
          { people.mainActivities &&
            <>
              <h1 className="type">{lang === 'fr' ? 'Activités principales' : 'Main activities' }</h1>
              <ul className="Hprod" data-type="activities">
                { people.mainActivities.map((item, index) => (
                  <li key={index} data-item={index}>
                    <div className="texte">
                      <p className="numero">{index + 1}</p>
                      <div className="type" />
                      <Link to={item.permalink[lang]}><h2>{item.baseline[lang]}</h2></Link>
                      <h3>{item.name}</h3>
                    </div>
                    <div className="image-pre">
                      <ProcessedImage size="large" image={item.coverImage && item.coverImage.processed.large} />
                    </div>
                    <div className="complement">
                      <p data-type="description">{item.description[lang]}</p>
                      <p data-type="time"><DateNews startDate={item.startDate} endDate={item.endDate} lang={lang} /></p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          }
          { people.mainProductions &&
            <>
              <h1 className="type">{lang === 'fr' ? 'Productions majeures' : 'Main productions' }</h1>
              <ul className="Hprod" data-type="productions">
                { people.mainProductions.map((item, index) => (
                  <li key={index} data-item={index}>
                    <div className="texte">
                      <p className="numero">{index + 1}</p>
                      <div className="type" />
                      <Link to={item.permalink[lang]}><h2>{item.title[lang]}</h2></Link>
                      <h3>{item.authors}</h3>
                    </div>
                    <div className="image-pre">
                      <ProcessedImage size="large" image={item.coverImage && item.coverImage.processed.large} />
                    </div>
                    <div className="complement">
                      <p data-type="description">{item.description[lang]}</p>
                      <p data-type="time">{item.date}</p>
                    </div>
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
