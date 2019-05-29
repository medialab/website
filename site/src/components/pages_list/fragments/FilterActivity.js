import React from 'react';
import { Link } from 'gatsby';
import cls from 'classnames';
import { IsModel } from '../../helpers/helpers.js';

const FilterActivity = ({ lang, status, statuses }) => {

  let filterType, filterStatus, activeActivity, pastActivity, accroche;

  if (lang === 'fr') {
    filterType = 'Filter par type';
    filterStatus = 'Filtrer par état';
    activeActivity = 'En cours';
    pastActivity = 'Terminée';
    accroche = 'A la fois objet de recherche et outils au service des projets, les méthodes numériques sont au coeur des activités du médialab et contribuent à nourrir la réflexion sur les enjeux contemporains tant en sociologie qu’en STS. Organisées entre recherche, enseignement et méthodes, ces activités étudient notamment la montée des populismes, les futurs écologiques ou encore de l’histoire de l’art numérique.';

  }
  else {
    filterType = 'Filter by type';
    filterStatus = 'Filter by status';
    activeActivity = 'Current';
    pastActivity = 'Closed';
    accroche = 'Description in english en une phrase de la catégorie activité';

  }

  return (
    <>

      <h1 className="type_title" data-icon="activite">{IsModel('activities', lang)}</h1>
      <p className="accroche-title-list">{accroche}</p> 

     
      <input
        type="checkbox" id="filtre-activity_active" name="filtre-activity_active"
        className="input_filtre-activity filtre-activity_statut" value="active" defaultChecked hidden />
      <input
        type="checkbox" id="filtre-activity_past" name="filtre-activity_past"
        className="input_filtre-activity filtre-activity_statut" value="past" hidden />
      <input
        type="checkbox" id="filtre-activity_research" name="filtre-activity_research"
        className="input_filtre-activity filtre-activity_type" value="research" hidden />
      <input
        type="checkbox" id="filtre-activity_teaching" name="filtre-activity_teaching"
        className="input_filtre-activity filtre-activity_type" value="teaching" hidden />

      

      <aside className="aside-filters">

        <input type="checkbox" className="toggle-filtre-phone" id="toggle-filtre-phone" name="toggle-filtre-phone" value="visible" hidden />
        <label id="toggle-filtre-phone-label" htmlFor="toggle-filtre-phone" title="Découvrir les options de filtrage"><p>{IsModel('filters', lang)}<span /></p></label>

        <div className="filter-group">
          <h1>{filterStatus}</h1>
          <label id="filtre-activity_active_label" className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_active">{activeActivity}</label>
          <label id="filtre-activity_past_label" className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_past">{pastActivity}</label>
        </div>

        <div className="filter-group">
          <h1>{filterType}</h1>
          <label id="filtre-activity_research_label" className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_research">{IsModel('research', lang)}{(lang === 'fr' ? 's' : '')}</label>
          <label id="filtre-activity_teaching_label" className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_teaching">{IsModel('teaching', lang)}{(lang === 'fr' ? 's' : '')}</label>
        </div>

      </aside>
    </>
  );
};

export default FilterActivity;

