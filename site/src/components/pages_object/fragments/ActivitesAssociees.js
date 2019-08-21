import React from 'react';
import {Link} from 'gatsby';
import {SECTIONS} from '../../helpers/sections';
import {I18N_TYPE_LABELS} from '../../../i18n.js';

import LanguageFallback from '../../helpers/LanguageFallback.js';

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
    <aside
      className="container elements-associes-block" id="activities" role="complementary"
      aria-label={related[lang]}>
      <h1><span data-icon="activite" /> {accroche} </h1>

      <div className="contenu">
        <ul className="liste_objet">
          {activities.map(a => (
            <li
              itemProp="memberOf" itemScope itemType={a.type === 'research' ? 'https://schema.org/ResearchProject' : 'https://schema.org/Project'}
              key={a.permalink.fr} data-type="activite" className="item">
              <Link to={a.permalink[lang]}>
                <div className="bandeau">
                  <p className="type-activity" data-icon="activite">{I18N_TYPE_LABELS.activities[lang][a.type]}</p>
                  <p className="title" data-level-2="title" itemProp="name">{a.name}</p>
                </div>
                <hgroup>
                  <h1 data-level-1="baseline" itemProp="description" >
                    <LanguageFallback lang={lang} translatedAttribute={a.baseline} />
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

export default ActivitesAssociees;
