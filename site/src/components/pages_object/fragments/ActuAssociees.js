import React from 'react';
import {Link} from 'gatsby';
import {SECTIONS} from '../../helpers/sections';

import DateNews from '../../helpers/DateNews.js';
import TimeNews from '../../helpers/TimeNews.js';
import {IsModel} from '../../helpers/helpers.js';


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

  return (
    <aside className="container elements-associes-block" id="news" role="complementary" aria-label={ lang ==='fr' ? related.fr : related.en }>
      <h1><span data-icon="actualités" /> {accroche} </h1>

      <div className="contenu">
        <ul className="liste_objet">
          {actu.map(n => (
            <li key={n.permalink.fr} data-type="activite" className="item">
              <Link to={n.permalink[lang]} className="accroche">
                <div className="bandeau">
                  <p data-icon="news" className="type">{IsModel(n.type, lang)} <span>{n.label && (lang === 'fr' ? n.label.fr : n.label.en)}</span></p>         
                  <DateNews startDate={n.startDate} endDate={n.endDate} lang={lang} />
                  <TimeNews startDate={n.startDate} endDate={n.endDate} />
                </div>
                <hgroup>
                  <h1 data-level-2="title">{n.title[lang] || n.title.fr || n.title.en}</h1>
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
