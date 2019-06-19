  import React from 'react';
import { Link } from 'gatsby';
import cls from 'classnames';
import { IsModel } from '../../helpers/helpers.js';
import { Icons } from '../../helpers/Icons.js';
import { SearchInput } from '../../helpers/SearchInput.js';


const FilterActivity = ({ lang, status, statuses }) => {

  let filterType, filterStatus, activeActivity, pastActivity, accroche, filtersAlt, infosAlt,  closeAlt, filtresTitle;

  if (lang === 'fr') {
    filterType = 'Filter par type';
    filterStatus = 'Filtrer par état';
    activeActivity = 'En cours';
    pastActivity = 'Terminée';
    accroche = 'A la fois objet de recherche et outils au service des projets, les méthodes numériques sont au coeur des activités du médialab et contribuent à nourrir la réflexion sur les enjeux contemporains tant en sociologie qu’en STS. Organisées entre recherche, enseignement et méthodes, ces activités étudient notamment la montée des populismes, les futurs écologiques ou encore de l’histoire de l’art numérique.';
    filtersAlt = 'Afficher les filtres de la page';
    infosAlt = 'Informations à propos des activités';
    filtresTitle = 'Filtres des activités';
    closeAlt = "Revenir aux activités";
  }
  else {
    filterType = 'Filter by type';
    filterStatus = 'Filter by status';
    activeActivity = 'Current';
    pastActivity = 'Closed';
    accroche = 'Description in english en une phrase de la catégorie activité';
    filtersAlt = 'Show page filters';
    infosAlt = 'Informations about the activities';
    filtresTitle = 'Filters of activities';
    closeAlt = "Back to activities";

  }

  return (
    <>

      <h1 className="type_title" data-icon="activite"><a href="#liste">{IsModel('activities', lang)}</a></h1>

      <input type="radio" id="radio-phone-filters" name="radio-phone" value="filters" hidden />
      <label htmlFor="radio-phone-filters" title={IsModel('filtersAlt', lang)} arial-label={filtersAlt}><Icons icon='search-filter' /></label>

      <input type="radio" id="radio-phone-infos" name="radio-phone" value="infos" hidden />
      <label htmlFor="radio-phone-infos" title={infosAlt} arial-label={IsModel('filtersAlt', lang)}><Icons icon='infos' /></label>

      <input type="radio" id="radio-phone-close" name="radio-phone" value="close" hidden />
      <label htmlFor="radio-phone-close" title={closeAlt} arial-label={closeAlt}>✕</label>
      

      <aside className="accroche-title-list" id="accroche-title-list">
        <h1 className="aside-title" data-icon="activite" >{IsModel('activities', lang)}</h1>
        <p id="aria-accroche">{accroche}</p>
      </aside>


     
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

      

      <aside className="aside-filters" aria-label={filtresTitle}>

      <h1 className="aside-title">{filtresTitle}</h1>

      <SearchInput lang={lang} />

        <div className="filter-group"aria-label={filterStatus}>
          <h1 aria-hidden="true">{filterStatus}</h1>
          <label id="filtre-activity_active_label" className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_active" aria-label={activeActivity}>{activeActivity}</label>
          <label id="filtre-activity_past_label" className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_past" aria-label={pastActivity}>{pastActivity}</label>
        </div>

        <div className="filter-group"aria-label={filterType}>
          <h1 aria-hidden="true">{filterType}</h1>
          <label id="filtre-activity_research_label" className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_research" aria-label={IsModel('research', lang)}>{IsModel('research', lang)}{(lang === 'fr' ? 's' : '')}</label>
          <label id="filtre-activity_teaching_label" className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_teaching" aria-label={IsModel('teaching', lang)}>{IsModel('teaching', lang)}{(lang === 'fr' ? 's' : '')}</label>
        </div>

      </aside>
    </>
  );
};

export default FilterActivity;

