import React from 'react';
import {Link} from 'gatsby';
import {SECTIONS} from '../../helpers/sections';

import DateNews from '../../helpers/DateNews.js';
import TimeNews from '../../helpers/TimeNews.js';
import {IsModel} from '../../helpers/helpers.js';
import LanguageFallback from '../../helpers/LanguageFallback.js';
import ProcessedImage from '../../helpers/ProcessedImage.js';


const ActuAssociees = ({lang, actu, isSeminar}) => {

  const related = SECTIONS.news;

  // Si aucune actu liée, retourne null
  if (!actu || actu.length === 0)
    return null;

  let accroche;
  if (isSeminar) {
    accroche = lang === 'fr' ? 'Programme' : 'Program';
  } else
  if (lang === 'fr') {
    accroche = related.fr + String.fromCharCode(8239);
  }
  else {
    accroche = related.en;
  }

  const sorted = actu.slice().sort((a, b) => {
    return -a.startDate.localeCompare(b.startDate);
  });

  return (
    <aside className="container elements-associes-block" id="news" role="complementary" aria-label={ lang ==='fr' ? related.fr : related.en }>
      <h1><span data-icon="actualités" /> {accroche} </h1>

      <div className="contenu">
        <ul className={`liste_objet ${isSeminar ? 'liste_seminaire' : ''}`}>
          {sorted.map((n, i) => isSeminar ?
          (
            <React.Fragment key={n.permalink.fr}>
              <li data-item={i} data-type={n.type} className={`list-item ${n.type}`}>
                <Link to={n.permalink[lang]}>

                <div className="image-pre" aria-hidden="true">
                  <ProcessedImage
                    data={n}
                    size="medium"
                    image={n.coverImage && n.coverImage.processed.medium} />
                </div>
                <div className="bandeau">
                  <p data-icon="news" className="type-news">{IsModel(n.type, lang)}</p>
                  <p className="label-news"><LanguageFallback lang={lang} translatedAttribute={name.label} /></p>
                  <div>
                    <DateNews startDate={n.startDate} endDate={n.endDate} lang={lang} />
                    <TimeNews startDate={n.startDate} endDate={n.endDate} />
                    </div>
                </div>
                <hgroup>
                  <h1 data-level-1="baseline" >
                    <LanguageFallback lang={lang} translatedAttribute={n.title} />
                  </h1>
                </hgroup>
                <div className="accroche">
                  <p className="accroche-paragraphe">
                    <LanguageFallback lang={lang} translatedAttribute={n.description} />
                  </p>
                </div>
                </Link>
              </li>
            </React.Fragment>
          ) 
            :
          (
            <li key={n.permalink.fr} data-type="activite" className="item">
              <Link to={n.permalink[lang]} className="accroche">
                <div className="bandeau">
                  <p data-icon="news" className="type">{IsModel(n.type, lang)} <span>{n.label && (lang === 'fr' ? n.label.fr : n.label.en)}</span></p>
                  <DateNews startDate={n.startDate} endDate={n.endDate} lang={lang} />
                  <TimeNews startDate={n.startDate} endDate={n.endDate} />
                </div>
                <hgroup>
                  <h1 data-level-2="title">
                    <LanguageFallback lang={lang} translatedAttribute={n.title} />
                  </h1>
                </hgroup>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ActuAssociees;
