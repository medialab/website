import React from 'react';

import {I18N_MODEL, I18N_TYPE_LABELS} from '../../../i18n.js';
import {Icons} from '../../helpers/Icons.js';
import {SearchInput} from '../../helpers/SearchInput.js';

const i18n = {
  fr: {
    accroche: 'Le médialab produit, mobilise et enseigne l\'usage de nombreux outils numériques libres dédiés à l\'enquête. Chaque outil listé sur cette page donne accès au code source, à la documentation et à des cas d\'usages quand ils sont disponibles.',
    filtersAlt: 'Afficher les filtres de la page',
    infosAlt: 'Informations à propos de l\'outil',
    closeAlt: 'Revenir à la liste des outils',
    filtresTitle: 'Filtres des outils',
    usages: 'pratiques',
    audience: 'public',
    status: 'statut'
  },
  en: {
    accroche: 'The medialab produces, mobilizes and teaches the use of numerous free digital tools dedicated to research. Each tool listed in this page gives access to its source code, documentation and use cases when available.',
    filtersAlt: 'Show page filters',
    infosAlt: 'Informations about the tool',
    closeAlt: 'Back to the tool list',
    filtresTitle: 'Filters of the tools',
    usages: 'usages',
    audience: 'audience',
    status: 'status'
  }
};

const ToolFilter = ({lang}) => {

  const {
    accroche,
    filtersAlt,
    infosAlt,
    closeAlt,
    filtresTitle
  } = i18n[lang];

  const filterGroups = [
    {
      key: 'usages',
      typeKey: 'toolsUsages'
    },
    {
      key: 'audience',
      typeKey: 'toolsAudience'
    },
    {
      key: 'status',
      typeKey: 'toolsStatus'
    }
  ];

	return (
  <>
    <h1 className="type_title"><a href="#liste">{I18N_MODEL[lang].tools}</a></h1>


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
          className="input_usages"
          value={usage} hidden />
        );
    })}

    {Object.keys(I18N_TYPE_LABELS.toolsAudience[lang]).map((audience) => {
      return (
        <input
          key={audience}
          type="checkbox" id={`filtre-tool_${audience}`} name={`filtre-tool_${audience}`}
          className="input_audience"
          value={audience} hidden />
        );
    })}

    {Object.keys(I18N_TYPE_LABELS.toolsStatus[lang]).map((statu) => {
      return (
        <input
          key={statu}
          type="checkbox" id={`filtre-tool_${statu}`} name={`filtre-tool_${statu}`}
          className="input_status"
          value={statu} hidden />
        );
    })}

    <aside className="aside-filters" role="navigation" aria-label={filtresTitle}>

      <h1 className="aside-title">{filtresTitle}</h1>

      <SearchInput lang={lang} />

      <ul>
        {filterGroups.map((group, index) => {
          return (
            <li key={index} className="filter-container" aria-label={group.key}>
              <input
                className="filter-group-checkbox"
                type="checkbox" id={`checkbox_filtre_${group.key}`}
                hidden checked />
              <label className="filter-group-label" htmlFor={`checkbox_filtre_${group.key}`}><span><Icons icon="arrow" /></span></label>
              <p className="filter-group-title" aria-hidden="true">{i18n[lang][group.key]}</p>
              <div className="filter-group">
                {Object.keys(I18N_TYPE_LABELS[group.typeKey][lang]).map((usage) => {
                  return (
                    <label
                      key={usage}
                      id={`filtre-tool_${usage}_label`}
                      className="checkbox-medialab" htmlFor={`filtre-tool_${usage}`}
                      aria-label={usage}>{I18N_TYPE_LABELS[group.typeKey][lang][usage]}</label>
                    );
                })}
              </div>
            </li>);
        })}
      </ul>
    </aside>


  </>
	);
};

export default ToolFilter;
