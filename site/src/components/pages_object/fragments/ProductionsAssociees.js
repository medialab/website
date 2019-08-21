import React from 'react';
import {Link} from 'gatsby';
import {I18N_GROUP_LABELS} from '../../../i18n.js';
import {SECTIONS} from '../../helpers/sections';
import DateNews from '../../helpers/DateNews.js';
import {compare, productionTypeToSchemaURL} from '../../helpers/helpers.js';

import LanguageFallback from '../../helpers/LanguageFallback.js';

const i18n = {
  fr: {
    externalAriaLabel: 'Production exterieure au médialab',
    externalProduction: 'Ce lien renvoi à une page exterieure au médialab',
    linkAriaLabel: 'Lien vers cette production'
  },
  en: {
    externalAriaLabel: 'external production',
    externalProduction: 'This linked is external to médialab',
    linkAriaLabel: 'Link to this production'
  }
}

const ProductionCard = ({p, lang}) => (
  <>
    <div className="bandeau" >
      <p className="type-production" data-icon="production"> {I18N_GROUP_LABELS.productions[lang][p.group]}</p>
      {p.authors && <p className="authors">{p.authors}</p>}
      <DateNews startDateSchemaProp="datePublished" startDate={p.date} lang={lang} />
      {p.external && p.url && (
        <p
          className="external"
          aria-label={i18n[lang].externalAriaLabel}
          title={i18n[lang].externalProduction} >
          ⤤
        </p>
      )}
    </div>
    <hgroup>
      <h1 itemProp="name" data-level-1="title" >
        <LanguageFallback lang={lang} translatedAttribute={p.title} />
      </h1>
    </hgroup>
  </>
);

export default function ProductionsAssociees({lang, productions}) {

  const related = SECTIONS.productions;

	if (!productions || productions.length === 0)
    return null;

  // sort
  const productionsSorted = productions.slice().sort((a, b) => {
    return -compare(a.date || '0', b.date || '0');
  });

	let accroche;
	if (lang === 'fr') {
    accroche = related.fr + String.fromCharCode(8239);
  }
  else {
    accroche = related.en;
  }

	return (
    <aside
      id="productions"
      className="container elements-associes-block"
      role="complementary"
      aria-label={related[lang]}>
      <h1><span data-icon="production" /> {accroche}</h1>
      <div className="contenu">
        <ul className="liste_objet">
          {productionsSorted.map(p => (
            <li
              key={p.permalink.fr}
              itemScope
              itemType={productionTypeToSchemaURL(p.type)}
              data-type="production"
              className="item">
              {!p.external && (
                <Link to={p.permalink[lang]} aria-label={i18n[lang].linkAriaLabel}>
                  <ProductionCard p={p} lang={lang} />
                </Link>
              )}
              {p.external && p.url && (
                <a href={p.url} target="_blank" rel="noreferrer noopener">
                  <ProductionCard p={p} lang={lang} />
                </a>
              )}
              {p.external && !p.url && (
                <ProductionCard p={p} lang={lang} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
	);
}
