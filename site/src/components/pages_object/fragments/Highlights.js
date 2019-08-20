import React from 'react';
import {Link} from 'gatsby';
import {IsModel} from '../../helpers/helpers.js';
import RawHTML from '../../helpers/RawHtml.js';

import DateNews from '../../helpers/DateNews.js';
import ProcessedImage from '../../helpers/ProcessedImage.js';
import LanguageFallback from '../../helpers/LanguageFallback.js';

import {SECTIONS} from '../../helpers/sections';


const ProductionCard = ({p, lang}) => {
  return (
    <>
      {/*<div className="image-pre">
                            <ProcessedImage size="small" image={p.coverImage && p.coverImage.processed.small} />
                        </div>*/}
      <div className="bandeau">
        <p className="type-production" data-icon="production"> {p.groupLabel[lang]}</p>
        {p.typeLabel !== 'media' &&
          <p className="subtype-production"> {lang === 'fr' ? <span>{p.typeLabel.fr}</span> : <span>{p.typeLabel.en}</span>}</p>
        }
        {p.authors && <p className="authors">{p.authors}</p>}
        { p.external && p.url && <p className="external" aria-label="production exterieure au médialab" title={lang === 'fr' ? 'Ce lien renvoi à une page exterieure au médialab' : 'This linked is external to médialab'} >⤤</p> }
      </div>
      <hgroup>
        <h1 data-level-1="title" >
          <LanguageFallback lang={lang} translatedAttribute={p.title} />
        </h1>
      </hgroup>

    </>);
};

export default function highlights({people, lang}) {

  let titleActivity, titleProduction;

  if (people.mainActivities && people.mainActivities.length > 0) {
    titleActivity = <h2 data-icon="activite">{lang === 'fr' ? 'Activité(s)' : 'Activity(ies)' }</h2>;
  }
else {
    titleActivity = '';
  }

  if (people.mainProductions && people.mainProductions.length > 0) {
    titleProduction = <h2 data-icon="production">Productions</h2>;
  }
else {
    titleProduction = '';
  }


  if ((people.mainActivities && people.mainActivities.length > 0) || (people.mainProductions && people.mainProductions.length > 0)) {


    return (

      <section id="highlights" aria-describedby="aria-title" >
        <>
          <h1 id="aria-title">{SECTIONS.highlights[lang]}</h1>
          <div className="contenu">
            { titleActivity }
            <ul id="highlights-list-activity" data-type="activities">
              { people.mainActivities &&
              people.mainActivities.map((a, index) => (
                <li data-type={a.type} className="list-item" key={index}>
                  <Link to={a.permalink[lang]} aria-label={lang === 'fr' ? 'Lien vers cette Activité' : 'Link to this activity'}>
                    <div className="image-pre" aria-hidden="true">
                      <ProcessedImage size="small" image={a.coverImage && a.coverImage.processed.small} data={a} />
                    </div>
                    <div className="bandeau">
                      <p className="type-activity" data-icon="activite">{IsModel(a.type, lang)}</p>
                      <p className="title" data-level-2="title">{a.name}</p>
                    </div>
                    <hgroup>
                      <h1 data-level-1="baseline" >
                        <LanguageFallback lang={lang} translatedAttribute={a.baseline} />
                      </h1>
                    </hgroup>

                  </Link>
                </li>
              ))
            }
            </ul>
            { titleProduction }
            <ul id="highlights-list-production" data-type="productions">
              { people.mainProductions &&
              people.mainProductions.map((p, index) => (
                <li data-type={p.type} className="list-item" key={index}>
                  {!p.external &&
                  <Link to={p.permalink[lang]} aria-label={lang === 'fr' ? 'Lien vers cette production' : 'Link to this production'}>
                    <ProductionCard p={p} lang={lang} />
                  </Link>}
                  {p.external && p.url &&
                  <a href={p.url} target="_blank" rel="noreferrer noopener">
                    <ProductionCard p={p} lang={lang} />
                  </a>}
                  {p.external && !p.url &&
                  <ProductionCard p={p} lang={lang} />
                    }
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
