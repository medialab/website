import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';
import cls from 'classnames';
import { Icons } from '../../helpers/Icons.js';
import { SearchInput } from '../../helpers/SearchInput.js';


const FilterProduction = ({lang, group, types}) => {


  let title, filters, all,  yearTitle, accroche, filtersAlt, infosAlt, closeAlt, filtresTitle;

	if (lang === 'fr') {
		title = 'Productions';
		filters = 'Filtres';
		all = 'Toutes les productions';
    yearTitle = "Aller à l'année…";
    accroche = 'Issues des dynamiques de recherche du laboratoire combinant méthode, analyse et théorie, les productions du médialab constituent un panorama hétéroclite. Aux traditionnelles publications académiques s’ajoute un ensemble de réalisations techniques qui répondent à des problèmes de recherche récurrents. Récemment, les sites web et réalisations en situation se sont développés comme de nouvelles formes pour rendre compte des activités du laboratoire.';
    filtersAlt = 'Afficher les filtres de la page';
    infosAlt = 'Informations à propos des productions';
    closeAlt = "Revenir aux productions";
    filtresTitle = 'Filtre des productions'

	}
	else {
		title = 'Productions';
		filters = 'Filters';
		all = 'All productions';
    yearTitle = 'Go to year…';
    accroche = 'Description in english en une phrase de la catégorie production';
    filtersAlt = 'Show page filters';
    infosAlt = 'Informations about the productions';
    closeAlt = "Back to productions";
    filtresTitle = 'Filters of productions';
  }



	return (
  <>
    <h1 className="type_title" data-icon="production" ><a href="#year-2019">{title}</a></h1>
    
    <input type="radio" id="radio-phone-filters" name="radio-phone" value="filters" hidden />
    <label htmlFor="radio-phone-filters" title={filtersAlt} arial-label={filtersAlt}><Icons icon='search-filter' /></label>

    <input type="radio" id="radio-phone-infos" name="radio-phone" value="infos" hidden />
    <label htmlFor="radio-phone-infos" title={infosAlt} arial-label={infosAlt}><Icons icon='infos' /></label>

    <input type="radio" id="radio-phone-close" name="radio-phone" value="close" hidden />
    <label htmlFor="radio-phone-close" title={closeAlt} arial-label={closeAlt}>✕</label>
    

    <aside className="accroche-title-list">
      <h1 class="aside-title" data-icon="production">Productions</h1>
      <p>{accroche}</p>
    </aside>

    <InputFiltresType lang={lang} group={group} />

    

    {/* <input type="checkbox" className="toggle-filtre-phone" id="toggle-filtre-phone" name="toggle-filtre-phone" value="visible" hidden />
    <label id="toggle-filtre-phone-label" htmlFor="toggle-filtre-phone" title="Découvrir les options de filtrage"><p>{ filters }<span /></p></label> */}

    <aside className="aside-filters">

        <h1 class="aside-title">{filtresTitle}</h1>

        <SearchInput lang={lang}/>

        <div className="go-to-year">
        <input type="checkbox" id="checkbox_filtre_year" name="radio_filtre-actu" value="year" hidden />
        <label htmlFor="checkbox_filtre_year"><span>〉</span></label>
          <p>{ yearTitle } <span className="current-year">2019</span></p>          
          <ul>
            <li><a href="#year-2019">2019</a></li>
            <li><a href="#year-2018">2018</a></li>
            <li><a href="#year-2017">2017</a></li>
            <li><a href="#year-2016">2016</a></li>
            <li><a href="#year-2015">2015</a></li>
            <li><a href="#year-2014">2014</a></li>
            <li><a href="#year-2013">2013</a></li>
            <li><a href="#year-2012">2012</a></li>
            <li><a href="#year-2011">2011</a></li>
            <li><a href="#year-2010">2010</a></li>
            <li><a href="#year-2009">2009</a></li>
            <li><a href="#years-before-2009">&lt; 2009</a></li>
          </ul>
        </div>  


        <ul id={'list-' + group + '_current'} className="link-productions-sort">
        <li>
          <Link to="/productions">{lang === 'fr' ? 'Toutes les productions' : 'All productions'}</Link>
        </li>
          {types.map(g => {
                return (
              <li key={g.id} id={ 'li-filter-' + g.id} className={cls(g.id === group && 'pageProduction_current')}>
                <Link to={g.permalink[lang]}>
                  {g.label[lang]}
                  <span>〉</span>
                </Link>
                {(g.id === group && 
                <>
                  <input type="checkbox" id="checkbox_groupFilter" name="checkbox_groupFilter" value={group} hidden defaultChecked/>
                  <label  id="checkbox_groupFilter_label" htmlFor="checkbox_groupFilter"><span>〉</span></label>
                  <LabelFiltresType lang={lang} group={group} />
                </>
                )}

              </li>
                );
              })}
        </ul>

      </aside>

  </>
	);
};

export default FilterProduction;








function InputFiltresType(values){

  const lang = values.lang;
  const group = values.group;


  if(group === 'publications'){
    return (
      <>
      <input type="checkbox" id="filtre-production_article" name="filtre-production_article" className="input_filtre-production" value="article" hidden />
      <input type="checkbox" id="filtre-production_communication" name="filtre-production_communication" className="input_filtre-production" value="communication" hidden />
      <input  type="checkbox" id="filtre-production_book" name="filtre-production_book" className="input_filtre-production" value="book" hidden />
      <input type="checkbox" id="filtre-production_thesis" name="filtre-production_thesis" className="input_filtre-production" value="thesis" hidden />
      <input type="checkbox" id="filtre-production_grey" name="filtre-production_grey" className="input_filtre-production" value="grey" hidden />
      </>
    );
  }else if(group === 'tools'){
    return (
      <>
      <input type="checkbox" id="filtre-production_software" name="filtre-production_software" className="input_filtre-production" value="software" hidden />
      <input type="checkbox" id="filtre-production_code" name="filtre-production_code" className="input_filtre-production" value="code" hidden />
      </>
    );
  }else if(group === 'webEditions'){
    return (
      <>
      <input type="checkbox" id="filtre-production_datascape" name="filtre-production_datascape" className="input_filtre-production" value="datascape" hidden />
      <input type="checkbox" id="filtre-production_website" name="filtre-production_website" className="input_filtre-production" value="website" hidden />
      </>
    );
  }else if(group === 'situations'){
    return (
      <>
      <input type="checkbox" id="filtre-production_exhibition" name="filtre-production_exhibition" className="input_filtre-production" value="exhibition" hidden />
      <input type="checkbox" id="filtre-production_workshop" name="filtre-production_workshop" className="input_filtre-production" value="workshop" hidden />
      <input type="checkbox" id="filtre-production_simulation" name="filtre-production_simulation" className="input_filtre-production" value="simulation" hidden />
      <input type="checkbox" id="filtre-production_conference" name="filtre-production_conference" className="input_filtre-production" value="conference" hidden />
      </>
    );
  }else{
    return ( <> </>)
  }

}




function LabelFiltresType(values){

  const lang = values.lang;
  const group = values.group;

  let  typePublications, typeWebEditions, typeTools, typeSituations, article, communication, book, thesis, grey, software, website, exhibition, conference;

  if (lang === 'fr') {
    typePublications = 'Type de publications';
    typeWebEditions = 'Type d‘éditions web' ;
    typeTools = 'Type d‘outils' ;
    typeSituations = 'Type de situations';

    article = 'Articles';
    communication = 'Communications';
    book = 'Livres';
    thesis = 'Thèses';
    grey = 'Littérature grise';
    software = 'Logiciels';
    website = 'Sites web';
    exhibition = 'Expositions';
    conference = 'Conférences';
  }
  else {
    typePublications = "Publications‘ type";
    typeWebEditions = "Web Editions‘ type";
    typeTools = 'Tools‘ type' ;
    typeSituations = 'Situations‘ type' ;
   
    article = 'Articles';
    communication = 'Communications';
    book = 'Books';
    thesis = 'Thesis';
    grey = 'Grey literature';
    software = 'Software';
    website = 'Websites';
    exhibition = 'Exhibitions';
    conference = 'Conferences';
  }


  if(group === 'publications'){
    return (
      <div className="filter-group">
        <label id="filtre-production_article_label" className="filtre-production checkbox-medialab" htmlFor="filtre-production_article">{article}</label>
        <label id="filtre-production_communication_label" className="filtre-production checkbox-medialab" htmlFor="filtre-production_communication">{communication}</label>
        <label id="filtre-production_book_label" className="filtre-production checkbox-medialab" htmlFor="filtre-production_book">{book}</label>
        <label id="filtre-production_thesis_label" className="filtre-production checkbox-medialab" htmlFor="filtre-production_thesis">{thesis}</label>
        <label id="filtre-production_grey_label" className="filtre-production checkbox-medialab" htmlFor="filtre-production_grey">{grey}</label>
      </div>
    );
  }else if(group === 'tools'){
    return (
      <div className="filter-group">
        <label id="filtre-production_software_label" className="filtre-production checkbox-medialab"  htmlFor="filtre-production_software">{software}</label>
        <label id="filtre-production_code_label" className="filtre-production checkbox-medialab"  htmlFor="filtre-production_code">Code</label>
      </div>
    );
  }else if(group === 'webEditions'){
    return (
      <div className="filter-group">
        <label id="filtre-production_datascape_label" className="filtre-production checkbox-medialab"  htmlFor="filtre-production_datascape">Datascape</label>
        <label id="filtre-production_website_label" className="filtre-production checkbox-medialab"  htmlFor="filtre-production_website">{website}</label>
      </div>
    );
  }else if(group === 'situations'){
    return (
      <div className="filter-group">
        <label id="filtre-production_exhibition_label" className="filtre-production checkbox-medialab" htmlFor="filtre-production_exhibition">{exhibition}</label>
        <label id="filtre-production_workshop_label" className="filtre-production checkbox-medialab" htmlFor="filtre-production_workshop">Workshops</label>
        <label id="filtre-production_simulation_label" className="filtre-production checkbox-medialab" htmlFor="filtre-production_simulation">Simulations</label>
        <label id="filtre-production_conference_label" className="filtre-production checkbox-medialab" htmlFor="filtre-production_conference">{conference}</label>
      </div>
    );
  }else{
    return ( <> </>)
  }

}


