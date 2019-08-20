import React from 'react';
import {Link} from 'gatsby';
import {I18N_GROUP_LABELS} from '../../../i18n.js';
import {SECTIONS} from '../../helpers/sections';
import DateNews from '../../helpers/DateNews.js';
import {compare, productionTypeToSchemaURL} from '../../helpers/helpers.js';

import LanguageFallback from '../../helpers/LanguageFallback.js';

const ProductionCard = ({p, lang}) => (
  <>
    <div className="bandeau" >
      <p className="type-production" data-icon="production"> {I18N_GROUP_LABELS.productions[lang][p.group]}</p>
      {p.authors && <p className="authors">{p.authors}</p>}
      <DateNews startDateSchemaProp="datePublished" startDate={p.date} lang={lang} />
      { p.external && p.url && <p className="external" aria-label="production exterieure au médialab" title={lang === 'fr' ? 'Ce lien renvoi à une page exterieure au médialab' : 'This linked is external to médialab'} >⤤</p> }
    </div>
    <hgroup>
      <h1 itemProp="name" data-level-1="title" >
        <LanguageFallback lang={lang} translatedAttribute={p.title} />
      </h1>
    </hgroup>
  </>
);

const ProductionsAssociees = ({lang, productions}) => {

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
      className="container elements-associes-block" id="productions" role="complementary"
      aria-label={related[lang]}>
      <h1><span data-icon="production" /> {accroche}</h1>
      <div className="contenu">
        <ul className="liste_objet">
          {productionsSorted.map(p => (
            <li
              itemScope itemType={productionTypeToSchemaURL(p.type)} key={p.permalink.fr}
              data-type="production" className="item">
              {!p.external && (
                <Link to={p.permalink[lang]} aria-label={lang === 'fr' ? 'Lien vers cette production' : 'Link to this production'}>
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
};

export default ProductionsAssociees;
