import React from 'react';
import Link from '../../helpers/Link';
import cls from 'classnames';
import enums from '../../../../specs/enums.json';

import Years from './Years';
import {I18N_TYPE_LABELS} from '../../../i18n.js';
import {Icons} from '../../helpers/Icons.js';
import {SearchInput} from '../../helpers/SearchInput.js';

// TODO: abstract some values into generic i18n.
const i18n = {
  fr: {
    accroche: 'Aux traditionnelles publications académiques s’ajoutent les “éditions web” qui projettent les activités du laboratoire dans un média interactif et ouvrent de nouveaux moyens de représentation et d’exploration visuelle des résultats. Les mises en situation -expositions, workshops, simulations, etc.- permettent d’engager des publics dans le processus de recherche et de confronter les hypothèses à la réalité du terrain.',
    infosAlt: 'Informations à propos des productions',
    closeAlt: 'Revenir aux productions',
    filtresTitle: 'Filtre des productions',
    filtresLabel: 'Filtrer par sous-type',
    filtersAlt: 'Afficher les filtres de la page',
    gotoyear: 'Aller à l\'année…',
    filterBy: 'Filtrer les production par…',
    all: 'Toutes les productions'
  },
  en: {
    accroche: 'In addition to traditional academic publications, "Web publications" also disseminate the laboratory\'s activities through an interactive medium that opens up new ways of representing and visually exploring findings. Situations – exhibitions, workshops, simulations, etc. – allow for the public’s involvement in the research process and the testing of hypotheses against the reality on the ground.',
    infosAlt: 'Informations about the productions',
    closeAlt: 'Back to productions',
    filtresTitle: 'Filters of productions',
    filtresLabel: 'Filter by subtypes',
    filtersAlt: 'Show page filters',
    gotoyear: 'Go to year…',
    filterBy: 'Filter productions by…',
    all: 'All productions'
  }
};

const mainPermalink = {
  fr: '/productions',
  en: '/en/productions'
};

function TypeFilterInputs() {

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
  const allowed = new Set(enums.productionTypes.groups[group].values);

  if (allowed.size < 2)
    return null;

  const typeLabels = I18N_TYPE_LABELS.productions[lang];

  return (
    <div className="filter-group" data-filter-group={group} aria-label={i18n[lang].filtresLabel}>
      {Object.keys(typeLabels).filter(k => allowed.has(k)).map(k => {
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

export default function ProductionFilter({lang, group, types, years}) {
  const {
    accroche,
    infosAlt,
    closeAlt,
    filtresTitle,
    filtersAlt
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

      <TypeFilterInputs />

      <aside className="aside-filters" aria-label={filtresTitle}>

        <h1 className="aside-title">{filtresTitle}</h1>

        <SearchInput lang={lang} />
        <Years lang={lang} years={years} />

        <ul
          id="list-filter-type" data-list-open={group} className="link-productions-sort"
          aria-label={i18n[lang].filterBy}>
          <li>
            <Link to={mainPermalink[lang]}>{i18n[lang].all}</Link>
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
}
