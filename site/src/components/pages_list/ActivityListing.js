import React from 'react';
import {Link} from 'gatsby';


import FilterActivity from './fragments/FilterActivity.js';
import RawHTML from '../helpers/RawHtml.js';
import {IsModel} from '../helpers/helpers.js';
import ProcessedImage from '../helpers/ProcessedImage.js';
import {templateMembership} from '../helpers/helpers.js';

export default function ActivityListing({lang, list, status, statuses}) {
  console.log(lang, list);

  let accroche;

  if (lang === 'fr') {
    accroche = 'A la fois objet de recherche et outils au service des projets, les méthodes numériques sont au coeur des activités du médialab et contribuent à nourrir la réflexion sur les enjeux contemporains tant en sociologie qu’en STS. Organisées entre recherche, enseignement et méthodes, ces activités étudient notamment la montée des populismes, les futurs écologiques ou encore de l’histoire de l’art numérique.';
  }
  else {
    accroche = 'Description in english en une phrase de la catégorie activité';
  }
  
    return (
      <>
        <FilterActivity lang={lang} status={status} statuses={statuses} />
       
        <section id="liste">
          <p className="accroche-titre">{accroche}</p>
          <p className="accroche-titre-phone">{accroche}</p>
          <ul className="liste_objet" id="liste-activity">
            {list.map((a, index) => (
              <React.Fragment key={index}>
                <li data-item={index} data-type={a.type} className={`list-item ${a.type}-${a.active ? 'active' : 'past'}`}>
                  <Link to={a.permalink[lang]}>
                    <div className="title-group">
                      <h1 data-icon="activite" data-level-1="baseline" >{a.baseline && (lang === 'fr' ? a.baseline.fr : a.baseline.en)}</h1>
                    </div>
                    <div className="details">
                      <p className="type-activity">{IsModel(a.type, lang)}</p>
                      <p className="title" data-level-2="title">{a.name}</p>
                    </div>
                    <div className="accroche">
                      <p className="accroche-paragraphe">
                        {a.description && <RawHTML html={lang === 'fr' ? a.description.fr : a.description.en} />}
                      </p>
                      <div className="image-pre">
                        <ProcessedImage size="medium" image={a.coverImage && a.coverImage.processed.medium} />
                      </div>
                    </div>
                  </Link>
                </li>
              </React.Fragment>
            ))}        
          </ul>
        </section>
      </>
   );
}




