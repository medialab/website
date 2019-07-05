import React from 'react';
import {Link} from 'gatsby';
import {SECTIONS} from '../../helpers/sections';

import DateNews from '../../helpers/DateNews.js';
import TimeNews from '../../helpers/TimeNews.js';
import {IsModel} from '../../helpers/helpers.js';
import LanguageFallback from '../../helpers/LanguageFallback.js';


const ActuAssociees = ({lang, actu}) => {

  const related = SECTIONS.news;

  // Si aucune actu liée, retourne null
  if (!actu || actu.length === 0)
    return null;

  let accroche;
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
        <ul className="liste_objet">
          {sorted.map(n => (
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
