import React from 'react';
import {Link} from 'gatsby';


const ActuAssociees = ({lang, related, actu}) => {

  // Si aucune actu liée, retourne null
  if (!actu || actu.length === 0)
    return null;

  let accroche;
  if (lang === 'fr') {
    accroche = related.fr + String.fromCharCode(8239) + ':';
  }
  else {
    accroche = related.en + ':';
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
            </li>
          ))}
          {/*actu.map(a => (
            <li key={a.id} data-type="activite" className="item">
              <Link to={a.permalink[lang]} className="accroche">
                <h1 data-level-="title">{lang === 'fr' ? a.title.fr : a.title.en}</h1>
                <h2 data-level-="description">{lang === 'fr' ? a.description.fr : a.description.en}</h2>
                <p className="type">{a.type}</p>
              </Link>
            </li>
          ))*/}
          {/* Test */}

          <li data-type="activite" className="item">
            <Link to="" className="accroche">
              <h1 data-level-="title">Title</h1>
              <h2 data-level-="description">description</h2>
              <p className="type">News</p>
              <p className="date-news">22 janvier 2019</p>
            </Link>
            <Link to="" className="complement">
              <h2 data-level-="description"><span />Nuit de Folie</h2>
            </Link>
          </li>

          <li data-type="activite" className="item">
            <Link to="" className="accroche">
              <h1 data-level-="title">Title</h1>
              <h2 data-level-="description">description</h2>
              <p className="type">News</p>
              <p className="date-news differentMonth">29 ⇥ 30 janvier 2019</p>
            </Link>
            <Link to="" className="complement">
              <h2 data-level-="description"><span />Nuit de Folie</h2>
            </Link>
          </li>

          <li data-type="activite" className="item">
            <Link to="" className="accroche">
              <h1 data-level-="title">Title</h1>
              <h2 data-level-="description">description</h2>
              <p className="type">News</p>
              <p className="date-news">16 Mars 2019</p>
            </Link>
            <Link to="" className="complement">
              <h2 data-level-="description"><span />Nuit de Folie</h2>
            </Link>
          </li>

        </ul>
      </div>
    </aside>
  );
};

export default ActuAssociees;
