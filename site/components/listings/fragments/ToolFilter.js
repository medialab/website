import React from 'react';

import {I18N_MODEL, I18N_TYPE_LABELS} from '../../../i18n.js';
import {Icons} from '../../helpers/Icons.js';
import {SearchInput} from '../../helpers/SearchInput.js';

const i18n = {
  fr: {
    accroche: 'Le médialab produit, mobilise et enseigne l\'usage de nombreux outils numériques libres dédiés à l\'enquête équipée numériquement. Retrouvez sur cette page un annuaire des outils qui pourraient vous être utiles. Chaque page d\'outil vous donne accès au code source, à la documentation et à des cas d\'usages quand ils sont disponibles.',
    filtersAlt: 'Afficher les filtres de la page',
    infosAlt: 'Informations à propos de l\'outils',
    closeAlt: 'Revenir à la liste des outils',
    filtresTitle: 'Filtres de l\'outils',
    usages: 'activité',
    audiences: 'public',
    status: 'statut'
  },
  en: {
    accroche: 'The medialab\'s produces, mobilizes and teaches the use of numerous free digital tools dedicated to digitally equipped investigation. Find on this page a directory of tools that may be useful to you. Each tool page gives you access to source code, documentation and use cases when available.',
    filtersAlt: 'Show page filters',
    infosAlt: 'Informations about the tool',
    closeAlt: 'Back to the tool list',
    filtresTitle: 'filter of the tools',
    usages: 'activity',
    audiences: 'public',
    status: 'status'
  }
};

const ToolFilter = ({lang}) => {

  const {
    accroche,
    filtersAlt,
    infosAlt,
    closeAlt,
    filtresTitle,
    usages,
    audiences,
    status
  } = i18n[lang];

	return (
  <>
    <h1 className="type_title" data-icon="production"><a href="#liste">{I18N_MODEL[lang].tools}</a></h1>


    <input
      type="radio" id="radio-phone-filters" name="radio-phone"
      value="filters" hidden />
    <label htmlFor="radio-phone-filters" title={filtersAlt} arial-label={filtersAlt}><Icons icon="search-filter" /></label>

    <input
      type="radio" id="radio-phone-infos" name="radio-phone"
      value="infos" hidden />
    <label htmlFor="radio-phone-infos" title={infosAlt} arial-label={infosAlt}><Icons icon="infos" /></label>

    <input
      type="radio" id="radio-phone-close" name="radio-phone"
      value="close" hidden />
    <label htmlFor="radio-phone-close" title={closeAlt} arial-label={closeAlt}>✕</label>


    <aside className="accroche-title-list">
      <h1 className="aside-title" data-icon="production">{I18N_MODEL[lang].tools}</h1>
      <p id="aria-accroche">{accroche}</p>
    </aside>

    {Object.keys(I18N_TYPE_LABELS.toolsUsages[lang]).map((usage) => {
      return (
        <input
          key={usage}
          type="checkbox" id={`filtre-tool_${usage}`} name={`filtre-tool_${usage}`}
          className={`input_${usage}`}
          value={usage} hidden />
        );
    })}

    {Object.keys(I18N_TYPE_LABELS.toolsAudiences[lang]).map((audience) => {
      return (
        <input
          key={audience}
          type="checkbox" id={`filtre-tool_${audience}`} name={`filtre-tool_${audience}`}
          className={`input_${audience}`}
          value={audience} hidden />
        );
    })}

    {Object.keys(I18N_TYPE_LABELS.toolsStatus[lang]).map((statu) => {
      return (
        <input
          key={statu}
          type="checkbox" id={`filtre-tool_${statu}`} name={`filtre-tool_${statu}`}
          className={`input_${statu}`}
          value={statu} hidden />
        );
    })}

    <aside className="aside-filters" role="navigation" aria-label={filtresTitle}>

      <h1 className="aside-title">{filtresTitle}</h1>

      <SearchInput lang={lang} />

      <ul>
        <li className="filter-group" aria-label={usages}>
          <h1>{ usages }</h1>
          {Object.keys(I18N_TYPE_LABELS.toolsUsages[lang]).map((usage) => {
            return (
              <label
                key={usage}
                id={`filtre-tool_${usage}_label`}
                className="checkbox-medialab" htmlFor={`filtre-tool_${usage}`}
                aria-label={usage}>{I18N_TYPE_LABELS.toolsUsages[lang][usage]}</label>
              );
          })}
        </li>
        <li className="filter-group" aria-label={audiences}>
          <h1>{ audiences }</h1>
          {Object.keys(I18N_TYPE_LABELS.toolsAudiences[lang]).map((audience) => {
            return (
              <label
                key={audience}
                id={`filtre-tool_${audience}_label`}
                className="checkbox-medialab" htmlFor={`filtre-tool_${audience}`}
                aria-label={audience}>{I18N_TYPE_LABELS.toolsAudiences[lang][audience]}</label>
              );
          })}
        </li>
        <li className="filter-group" aria-label={status}>
          <h1>{ status }</h1>
          {Object.keys(I18N_TYPE_LABELS.toolsStatus[lang]).map((statu) => {
            return (
              <label
                key={statu}
                id={`filtre-tool_${statu}_label`}
                className="checkbox-medialab" htmlFor={`filtre-tool_${statu}`}
                aria-label={statu}>{I18N_TYPE_LABELS.toolsStatus[lang][statu]}</label>
              );
          })}
        </li>
      </ul>
    </aside>


  </>
	);
};

export default ToolFilter;
