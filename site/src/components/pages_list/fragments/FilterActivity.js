import React from 'react';
import {Link} from 'gatsby';
import cls from 'classnames';
import {IsModel} from '../../helpers/helpers.js';

const FilterActivity = ({lang, status, statuses}) => {

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

    <p class="accroche-title-list">{accroche}</p>

    <input
      type="checkbox" className="toggle-filtre-phone" id="toggle-filtre-phone"
      name="toggle-filtre-phone" value="visible" hidden />
    <label htmlFor="toggle-filtre-phone" title="Découvrir les options de filtrage">
      <p>{IsModel('filters', lang)}<span /></p>
    </label>

    <div id="background-phone" />

    <h2 className="h2_filtre">{ filterStatus }</h2>

    <input
      type="checkbox" id="filtre-activity_active" name="filtre-activity_active"
      className="input_filtre-activity filtre-activity_statut" value="active" defaultChecked hidden />
    <label className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_active">{ activeActivity }</label>

    <input
      type="checkbox" id="filtre-activity_past" name="filtre-activity_past"
      className="input_filtre-activity filtre-activity_statut" value="past" hidden />
    <label className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_past">{ pastActivity }</label>

    <h2 className="h2_filtre">{ filterType }</h2>

    <input
      type="checkbox" id="filtre-activity_research" name="filtre-activity_research"
      className="input_filtre-activity filtre-activity_type" value="research" hidden />
    <label className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_research">{IsModel('research', lang)}{(lang === 'fr' ? 's': '')}</label>
    <input
      type="checkbox" id="filtre-activity_teaching" name="filtre-activity_teaching"
      className="input_filtre-activity filtre-activity_type" value="teaching" hidden />
    <label className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_teaching">{IsModel('teaching', lang)}{(lang === 'fr' ? 's': '')}</label>

  </>
	);
};

export default FilterActivity;

