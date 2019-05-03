import React from 'react';
import {Link} from 'gatsby';
import {SECTIONS} from '../../helpers/sections';
import {IsModel} from '../../helpers/helpers.js';

const ActivitesAssociees = ({lang, activities}) => {

  const related = SECTIONS.activities;

  // Si aucune activitée liée, retourne null
  if (!activities || activities.length === 0)
    return null;

  let accroche;
  if (lang === 'fr') {
    accroche = related.fr + String.fromCharCode(8239);
  }
  else {
    accroche = related.en;
  }

  // Placeholder
  return (
    <aside className="container elements-associes-block" id="activities">
      <h1><span data-icon="activite" /> {accroche} </h1>

      <div className="contenu">
        <ul className="liste_objet">
          {activities.map(a => (
            <li key={a.permalink.fr} data-type="activite" className="item">
              <Link to={a.permalink[lang]}>
                <h1 data-level-2="baseline">{a.baseline && (a.baseline[lang] || a.baseline.fr || a.baseline.en)}</h1>
                <h2 data-level-2="name">{a.name}</h2>
                {/* <p className="period">[{a.startDate} - {a.endDate}]</p> */}
                <p className="type">
                {IsModel(a.type, lang)}
                {/* {a.label && (lang === 'fr' ? <span>{a.label.fr}</span> : <span>{a.label.en}</span>)} */}
                </p>
              </Link>
          
          
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ActivitesAssociees;
