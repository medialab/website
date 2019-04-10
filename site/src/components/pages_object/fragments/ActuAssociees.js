import React from 'react';
import {Link} from 'gatsby';
import {SECTIONS} from '../../helpers/sections';


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
    <aside className="container elements-associes-block" id="news">
      <h1><span data-icon="actualités" /> {accroche} </h1>

      <div className="contenu">
        <ul className="liste_objet">
          {actu.map(n => (
            <li key={n.permalink.fr} data-type="activite" className="item">
              <Link to={n.permalink[lang]} className="accroche">
                <h1 data-level-2="title">{n.title[lang] || n.title.fr || n.title.en}</h1>
                <h2 data-level-2="description">{n.description && (n.description[lang] || n.description.fr || n.description.en)}</h2>
                <p className="date-news">{n.startDate}</p>
                <p className="type">{n.type}</p>
              </Link>
              <Link to={n.permalink[lang]} className="complement">              
                <p>{n.description && (n.description[lang] || n.description.fr || n.description.en)}</p>
                {/* <p className="go-to-object"><span>〉</span></p> */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ActuAssociees;
