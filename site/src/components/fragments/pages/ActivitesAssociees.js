import React from 'react';
import {Link} from 'gatsby';


const ActivitesAssociees = ({lang, related, activities}) => {

  // Si aucune activitée liée, retourne null
  if (!activities || activities.length === 0)
    return null;

  let accroche;
  if (lang === 'fr') {
      accroche = related.fr + String.fromCharCode(8239) + ':';
  }
 else {
      accroche = related.en + ':';
  }

  // Placeholder


  return (
    <aside className="container elements-associes-block" id="activites-associees">
      <h1><span data-icon="activite" /> {accroche} </h1>

      <div className="contenu">
        <ul className="liste_objet">
          {/*activities.map(a => (
            <li key={a.id} data-type="activite" className="item">
              <Link to={a.permalink[lang]}>
                <h1 data-level-="baseline">{lang === 'fr' ? a.baseline.fr : a.baseline.en}</h1>
                <h2 data-level-="name">{lang === 'fr' ? a.name : a.name}</h2>
                <p className="type">{a.type}</p>
              </Link>
            </li>
          ))*/}
          {/* // POUR LES TESTS */}

          <li key="" data-type="activite" className="item">
            <Link to="">
              <h1 data-level-="baseline">Qui anime les conversations sur la Russie soviétique et post-soviétique en France ?</h1>
              <h2 data-level-="name">Russia, made in France</h2>
              <p className="type">Research</p>
              <p className="period">[2008 - 2015]</p>
            </Link>
            <Link to="" className="complement">
              <h2 data-level-="description"><span>[2008 - 2015 ]</span>Cette activitée était un revival de Mars attack. Les aliens y étaient présentés comme gentils</h2>
            </Link>
          </li>

          <li key="" data-type="activite" className="item">
            <Link to="">
              <h1 data-level-="baseline">Les parlementaires font-ils la loi ?</h1>
              <h2 data-level-="name">The Law Factory</h2>
              <p className="type">Research</p>
              <p className="period">[2008 - 2015]</p>
            </Link>
            <Link to="" className="complement">
              <h2 data-level-="description"><span>[2008 - 2015 ]</span>Cette activitée était un revival de Mars attack. Les aliens y étaient présentés comme gentils</h2>
            </Link>
          </li>

          <li key="" data-type="activite" className="item">
            <Link to="">
              <h1 data-level-="baseline">Qui anime les conversations sur la Russie soviétique et post-soviétique en France ?</h1>
              <h2 data-level-="name">Politiques de la terre à l'épreuve de l'Anthropocène</h2>
              <p className="type">Research</p>
            </Link>
            <Link to="" className="complement">
              <h2 data-level-="description"><span />Cette activitée est un revival de Mars attack. Les aliens y sont présentés comme gentils</h2>
            </Link>
          </li>

          {/* // END  LES TESTS */}

        </ul>
      </div>
    </aside>
  );
};

export default ActivitesAssociees;
