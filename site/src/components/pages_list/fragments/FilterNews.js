import React from 'react';
import {I18N_MODEL, I18N_TYPE_LABELS} from '../../../i18n.js';
import {Icons} from '../../helpers/Icons.js';
import {SearchInput} from '../../helpers/SearchInput.js';
import Years from './Years';

const i18n = {
  fr: {
    filterType: 'Filter par type',
    filtersAlt: 'Afficher les filtres de la page',
    filtresTitle: 'Filtres des actualités',
    closeAlt: 'Revenir aux actualités'
  },
  en: {
    filterType: 'Filter by type',
    filtersAlt: 'Show page filters',
    filtresTitle: 'Filters of news',
    closeAlt: 'Back to news'
  }
};

const FilterNews = ({lang, years}) => {

  let {
    filterType,
    filtersAlt,
    filtresTitle,
    closeAlt
  } = i18n[lang];

  return (
    <>
      <h1 className="type_title" data-icon="actualite"><a href="#liste">{I18N_MODEL[lang].news}</a></h1>

      <input
        type="radio" id="radio-phone-filters" name="radio-phone"
        value="filters" hidden />
      <label htmlFor="radio-phone-filters" title={filtersAlt} arial-label={filtersAlt}><Icons icon="search-filter" /></label>

      <input
        type="radio" id="radio-phone-close" name="radio-phone"
        value="close" hidden />
      <label htmlFor="radio-phone-close" title={closeAlt} arial-label={closeAlt}>✕</label>


      <input
        type="checkbox" id="filtre-actu_event" name="filtre-actu_event"
        className="input_filtre-actu" value="event" hidden />
      <input
        type="checkbox" id="filtre-actu_post" name="filtre-actu_post"
        className="input_filtre-actu" value="post" hidden />
      <input
        type="checkbox" id="filtre-actu_notice" name="filtre-actu_notice"
        className="input_filtre-actu" value="notice" hidden />

      <aside className="aside-filters" role="navigation" aria-label={filtresTitle}>

        <h1 className="aside-title">{filtresTitle}</h1>

        <SearchInput lang={lang} />
        <Years lang={lang} years={years} />

        <div className="filter-group" aria-label={filterType}>
          <h1>{filterType}</h1>
          <label
            id="filtre-actu_event_label" className="filtre-actu checkbox-medialab" htmlFor="filtre-actu_event"
            aria-label={I18N_TYPE_LABELS.news[lang].event}>{I18N_TYPE_LABELS.news[lang].event}</label>
          <label
            id="filtre-actu_post_label" className="filtre-actu checkbox-medialab" htmlFor="filtre-actu_post"
            aria-label={I18N_TYPE_LABELS.news[lang].post}>{I18N_TYPE_LABELS.news[lang].post}</label>
          <label
            id="filtre-actu_notice_label" className="filtre-actu checkbox-medialab" htmlFor="filtre-actu_notice"
            aria-label={I18N_TYPE_LABELS.news[lang].notice}>{I18N_TYPE_LABELS.news[lang].notice}</label>
        </div>

      </aside>

    </>
  );
};

export default FilterNews;

