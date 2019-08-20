import React from 'react';
import {Link} from 'gatsby';
import cls from 'classnames';

import {I18N_TYPE_LABELS} from '../../../i18n.js';
import {Icons} from '../../helpers/Icons.js';
import {SearchInput} from '../../helpers/SearchInput.js';

// TODO: abstract some values into generic i18n.
const i18n = {
  fr: {
    accroche: 'Issues des dynamiques de recherche du laboratoire combinant méthode, analyse et théorie, les productions du médialab constituent un panorama hétéroclite. Aux traditionnelles publications académiques s’ajoute un ensemble de réalisations techniques qui répondent à des problèmes de recherche récurrents. Récemment, les sites web et réalisations en situation se sont développés comme de nouvelles formes pour rendre compte des activités du laboratoire.',
    infosAlt: 'Informations à propos des productions',
    closeAlt: 'Revenir aux productions',
    filtresTitle: 'Filtre des productions',
    filtresLabel: 'Filtrer par sous-type',
    filtersAlt: 'Afficher les filtres de la page',
    gotoyear: 'Aller à l\'année…'
  },
  en: {
    accroche: 'Description in english en une phrase de la catégorie production',
    infosAlt: 'Informations about the productions',
    closeAlt: 'Back to productions',
    filtresTitle: 'Filters of productions',
    filtresLabel: 'Filter by subtypes',
    filtersAlt: 'Show page filters',
    gotoyear: 'Go to year…'
  }
};

const FilterProduction = ({lang, group, types}) => {
  let {
    accroche,
    infosAlt,
    closeAlt,
    filtresTitle,
    filtersAlt,
    gotoyear
  } = i18n[lang];

	return (
  <>
    <h1 className="type_title" data-icon="production" ><a href="#liste">Productions</a></h1>

    <input
      type="radio" id="radio-phone-filters" name="radio-phone"
      value="filters" hidden />
    <label
      htmlFor="radio-phone-filters" id="radio-phone-filters_label" title={filtersAlt}
      arial-label={filtersAlt}><Icons icon="search-filter" /></label>

    <input
      type="radio" id="radio-phone-infos" name="radio-phone"
      value="infos" hidden />
    <label htmlFor="radio-phone-infos" title={infosAlt} arial-label={infosAlt}><Icons icon="infos" /></label>

    <input
      type="radio" id="radio-phone-close" name="radio-phone"
      value="close" hidden />
    <label
      htmlFor="radio-phone-close" id="radio-phone-close_label" title={closeAlt}
      arial-label={closeAlt}>✕</label>


    <aside className="accroche-title-list" role="navigation">
      <h1 className="aside-title" data-icon="production">Productions</h1>
      <p id="aria-accroche">{accroche}</p>
    </aside>

    <InputFiltresType />

    <aside className="aside-filters" aria-label={filtresTitle}>

      <h1 className="aside-title">{filtresTitle}</h1>

      <SearchInput lang={lang} />

      <div className="go-to-year">
        <input
          type="checkbox" id="checkbox_filtre_year" name="radio_filtre-actu"
          value="year" hidden />
        <label htmlFor="checkbox_filtre_year" aria-label={gotoyear}><span><Icons icon="arrow" /></span></label>
        <p>{gotoyear}</p>
        <ul id="list-years">
          <li><a href="#year-2019" data-year="#year-2019" aria-label={lang === 'fr' ? "Aller à l'année 2019" : 'Go to year 2019'}>2019</a></li>
          <li><a href="#year-2018" data-year="#year-2018" aria-label={lang === 'fr' ? "Aller à l'année 2018" : 'Go to year 2018'}>2018</a></li>
          <li><a href="#year-2017" data-year="#year-2017" aria-label={lang === 'fr' ? "Aller à l'année 2017" : 'Go to year 2017'}>2017</a></li>
          <li><a href="#year-2016" data-year="#year-2016" aria-label={lang === 'fr' ? "Aller à l'année 2016" : 'Go to year 2016'}>2016</a></li>
          <li><a href="#year-2015" data-year="#year-2015" aria-label={lang === 'fr' ? "Aller à l'année 2015" : 'Go to year 2015'}>2015</a></li>
          <li><a href="#year-2014" data-year="#year-2014" aria-label={lang === 'fr' ? "Aller à l'année 2014" : 'Go to year 2014'}>2014</a></li>
          <li><a href="#year-2013" data-year="#year-2013" aria-label={lang === 'fr' ? "Aller à l'année 2013" : 'Go to year 2013'}>2013</a></li>
          <li><a href="#year-2012" data-year="#year-2012" aria-label={lang === 'fr' ? "Aller à l'année 2012" : 'Go to year 2012'}>2012</a></li>
          <li><a href="#year-2011" data-year="#year-2011" aria-label={lang === 'fr' ? "Aller à l'année 2011" : 'Go to year 2011'}>2011</a></li>
          <li><a href="#year-2010" data-year="#year-2010" aria-label={lang === 'fr' ? "Aller à l'année 2010" : 'Go to year 2010'}>2010</a></li>
          <li><a href="#year-2009" data-year="#year-2009" aria-label={lang === 'fr' ? "Aller à l'année 2009" : 'Go to year 2009'}>2009</a></li>
          <li><a href="#years-before-2009" aria-label={lang === 'fr' ? 'Aller aux années précédant 2009' : 'Go to years before 2009'}>&lt; 2009</a></li>
        </ul>
      </div>


      <ul
        id="list-filter-type" data-list-open={group} className="link-productions-sort"
        aria-label={lang === 'fr' ? 'Filtrer les production par ...' : 'Filter productions by ...'}>
        <li>
          <Link to={lang === 'fr' ? '/productions' : '/en/productions'}>{lang === 'fr' ? 'Toutes les productions' : 'All productions'}</Link>
        </li>
        {types.map(g => {
                return (
                  <li key={g.id} id={'li-filter-' + g.id} className={cls(g.id === group && 'pageProduction_current')}>
                    <Link to={g.permalink[lang]} aria-label={g.label[lang]} data-link={g.id}>
                      {g.label[lang]}
                      <span><Icons icon="arrow" /></span>
                    </Link>
                    <LabelFiltresType lang={lang} group={g.id} />
                  </li>
                );
              })}
      </ul>

    </aside>
  </>
	);
};

export default FilterProduction;


function InputFiltresType() {

  return (
    <>
      {Object.keys(I18N_TYPE_LABELS.productions.fr).map(k => {
        return (
          <input
            key={k}
            type="checkbox"
            id={`filtre-production_${k}`}
            name={`filtre-production_${k}`}
            className="input_filtre-production"
            value="article"
            hidden />
        );
      })}
    </>
  );
}

function LabelFiltresType({lang, group}) {

  if (group === 'media')
    return null;

  const typeLabels = I18N_TYPE_LABELS.productions[lang];

  return (
    <div className="filter-group" data-filter-group={group} aria-label={i18n[lang].filtresLabel}>
      {Object.keys(typeLabels).map(k => {
        const label = typeLabels[k];

        return (
          <label
            key={k}
            id={`filtre-production_${k}_label`}
            className="filtre-production checkbox-medialab"
            htmlFor={`filtre-production_${k}`}
            aria-label={label}>{label}</label>
        );
      })}
    </div>
  );
}

