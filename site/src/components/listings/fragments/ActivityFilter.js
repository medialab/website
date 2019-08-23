import React from 'react';
import {I18N_MODEL, I18N_TYPE_LABELS} from '../../../i18n.js';
import {Icons} from '../../helpers/Icons.js';
import {SearchInput} from '../../helpers/SearchInput.js';

const i18n = {
  fr: {
    filterType: 'Filter par type',
    filterStatus: 'Filtrer par état',
    activeActivity: 'En cours',
    pastActivity: 'Terminée',
    accroche: 'Les activités du médialab s’articulent entre recherche et enseignement. Elles approfondissent notamment l’usage des méthodes numériques pour répondre aux enjeux contemporains en sociologie et STS. Également mobilisées au coeur d’activités pédagogiques, par exemple en mettant les étudiants en situation d’enquête, elles bénéficient d’une réflexivité très enrichissante sur nos processus de recherche.',
    filtersAlt: 'Afficher les filtres de la page',
    infosAlt: 'Informations à propos des activités',
    filtersTitle: 'Filtres des activités',
    closeAlt: 'Revenir aux activités'
  },
  en: {
    filterType: 'Filter by type',
    filterStatus: 'Filter by status',
    activeActivity: 'Current',
    pastActivity: 'Closed',
    accroche: 'The médialab’s activities articulate both research and teaching. In particular, they explore the use of digital methods to address contemporary issues in sociology and STS. These methods are also central to the laboratory’s teaching, for example by putting students in research situations. This fosters highly enriching reflection on our research processes.',
    filtersAlt: 'Show page filters',
    infosAlt: 'Informations about the activities',
    filtersTitle: 'Filters of activities',
    closeAlt: 'Back to activities'
  }
};

const ActivityFilter = ({lang}) => {

  const {
    filterType,
    filterStatus,
    activeActivity,
    pastActivity,
    accroche,
    filtersAlt,
    infosAlt,
    closeAlt,
    filtersTitle
  } = i18n[lang];

  return (
    <>

      <h1 className="type_title" data-icon="activite"><a href="#liste">{I18N_MODEL[lang].activities}</a></h1>

      <input
        type="radio" id="radio-phone-filters" name="radio-phone"
        value="filters" hidden />
      <label htmlFor="radio-phone-filters" title={filtersAlt} arial-label={filtersAlt}><Icons icon="search-filter" /></label>

      <input
        type="radio" id="radio-phone-infos" name="radio-phone"
        value="infos" hidden />
      <label htmlFor="radio-phone-infos" title={infosAlt} arial-label={filtersAlt}><Icons icon="infos" /></label>

      <input
        type="radio" id="radio-phone-close" name="radio-phone"
        value="close" hidden />
      <label htmlFor="radio-phone-close" title={closeAlt} arial-label={closeAlt}>✕</label>


      <aside className="accroche-title-list" id="accroche-title-list">
        <h1 className="aside-title" data-icon="activite" >{I18N_MODEL[lang].activities}</h1>
        <p id="aria-accroche">{accroche}</p>
      </aside>


      <input
        type="checkbox" id="filtre-activity_active" name="filtre-activity_active"
        className="input_filtre-activity filtre-activity_statut" value="active" defaultChecked
        hidden />
      <input
        type="checkbox" id="filtre-activity_past" name="filtre-activity_past"
        className="input_filtre-activity filtre-activity_statut" value="past" hidden />
      <input
        type="checkbox" id="filtre-activity_research" name="filtre-activity_research"
        className="input_filtre-activity filtre-activity_type" value="research" hidden />
      <input
        type="checkbox" id="filtre-activity_teaching" name="filtre-activity_teaching"
        className="input_filtre-activity filtre-activity_type" value="teaching" hidden />


      <aside className="aside-filters" aria-label={filtersTitle}>

        <h1 className="aside-title">{filtersTitle}</h1>

        <SearchInput lang={lang} />

        <div className="filter-group"aria-label={filterStatus}>
          <h1 aria-hidden="true">{filterStatus}</h1>
          <label
            id="filtre-activity_active_label" className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_active"
            aria-label={activeActivity}>{activeActivity}</label>
          <label
            id="filtre-activity_past_label" className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_past"
            aria-label={pastActivity}>{pastActivity}</label>
        </div>

        <div className="filter-group"aria-label={filterType}>
          <h1 aria-hidden="true">{filterType}</h1>
          <label
            id="filtre-activity_research_label" className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_research"
            aria-label={I18N_TYPE_LABELS.activities[lang].research}>{I18N_TYPE_LABELS.activities[lang].research}</label>
          <label
            id="filtre-activity_teaching_label" className="filtre-activity checkbox-medialab" htmlFor="filtre-activity_teaching"
            aria-label={I18N_TYPE_LABELS.activities[lang].teaching}>{I18N_TYPE_LABELS.activities[lang].teaching}</label>
        </div>

      </aside>
    </>
  );
};

export default ActivityFilter;

