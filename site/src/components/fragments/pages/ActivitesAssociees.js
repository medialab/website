import React from 'react';
import {Link} from 'gatsby';


const ActivitesAssociees = ({lang, context, activities, person}) => {

  // Si aucune activitée liée, retourne null
  if (!activities || activities.length === 0)
    return null;

  // definissons une accroche
  let accroche;
  if (lang === "fr") {
    if (context && context === "people") {
    accroche = "Activités auxquelles " + person.firstName + " " + person.lastName + " a participé";
    }else{
      accroche =  "Activités liées à ce sujet"+ String.fromCharCode(8239) +":";
    }
  } else {
    if (context && context === "people") {
      accroche = "Activities in which " + person.firstName + " " + person.lastName + " participated";
    } else {
      accroche = "Activities linked to this subject:";
    }

  }

  return (
    <aside className="container elements-associes-block" id="activites-associees">
      <h1><span data-icon="activite"></span> {accroche}</h1>

      <div className="contenu">
        <ul className="liste_objet">
          {activities.map(a => (
            <li key={a.id} data-type="activite" className="item">
              <Link to={a.permalink[lang]}>
                <h1 data-level-="baseline">{lang === 'fr' ? a.baseline.fr : a.description.en}</h1>
                <h2 data-level-="name">{lang === 'fr' ? a.name : a.name}</h2>
                <p className="type">{a.type}</p>
              </Link>
            </li>
          ))}


            {/* <li data-type="activite" className="item">
              <a href="#">
                <h1 data-level-="baseline">Comment repenser conjointement le Monde et la Terre?</h1>
                <h2 data-level-="name">Politiques de la terre à l'épreuve de l'Anthropocène</h2>
                <p className="type">Enseignement</p>
              </a>
            </li>

            <li data-type="activite" className="item">
              <a href="#">
                <h1 data-level-="baseline">Quelle transformation de l’économie française entre 1716-1821?</h1>
                <h2 data-level-="name">TOFLIT18: Transformations de l'économie française analysées suivant le commerce international, 1716-1821</h2>
                <p class="type">Recherche</p>
              </a>
            </li> */}




        </ul>
      </div>
    </aside>
  )
}

export default ActivitesAssociees;
