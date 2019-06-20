import React from 'react';
/*import {graphql} from 'gatsby';
import {Link} from 'gatsby';*/
import {IsModel} from '../../helpers/helpers.js';
import { Icons } from '../../helpers/Icons.js';
import { SearchInput } from '../../helpers/SearchInput.js';

const FiltreEquipe = ({lang}) => {

  let title, member, associate, filterDomain, filterMember, accroche, filtersAlt, infosAlt, filtresTitle, closeAlt;

  if (lang === 'fr') {
	  member = 'Membres';
    associate = 'Associés';
    filterDomain = 'Filtrer par domaine';
    filterMember = 'Filtrer par appartenance';
    accroche = 'Composée d’hommes et de femmes aux compétences complémentaires, l’équipe du médialab est plurielle. Membres ou associés au laboratoire, ces profils académiques, techniques, en design, ou encore en pédagogie se combinent et travaillent ensemble pour aviver la force des activités du laboratoire.';
    filtersAlt = 'Afficher les filtres de la page';
    infosAlt = "Informations à propos de l'équipe";
    filtresTitle = "Filtres de l'équipe";
    closeAlt = "Revenir à la liste des membres";
  }
	else {
		member = 'Members'
    associate = 'Associates'
    filterDomain = 'Filter by domain';
    filterMember = 'Filter by membership';
    accroche = 'Composée d’hommes et de femmes aux compétences complémentaires, l’équipe du médialab est plurielle. Membres ou associés au laboratoire, ces profils académiques, techniques, en design, ou encore en pédagogie se combinent et travaillent ensemble pour aviver la force des activités du laboratoire.';
    filtersAlt = 'Show page filters';
    infosAlt = 'Informations about the team';
    filtresTitle = 'Filters of the team';
    closeAlt = "Back to the members list";
  }
  

	return (
  <>
    <h1 className="type_title"><a href="#liste_equipe">{IsModel('people', lang)}</a></h1>

    
      <input type="radio" id="radio-phone-filters" name="radio-phone" value="filters" hidden />
      <label htmlFor="radio-phone-filters" title={filtersAlt} arial-label={filtersAlt}><Icons icon='search-filter' /></label>

      <input type="radio" id="radio-phone-infos" name="radio-phone" value="infos" hidden />
      <label htmlFor="radio-phone-infos" title={infosAlt} arial-label={infosAlt}><Icons icon='infos' /></label>

      <input type="radio" id="radio-phone-close" name="radio-phone" value="close" hidden />
      <label htmlFor="radio-phone-close" title={closeAlt} arial-label={closeAlt}>✕</label>
      

      <aside className="accroche-title-list">
        <h1 className="aside-title" data-icon="activite">{IsModel('people', lang)}</h1>
        <p id="aria-accroche">{accroche}</p>
      </aside>



    <input
      type="checkbox" id="filtre_membre" name="filtre_membre" className="input_member"
      value="membre" hidden />
    <input
      type="checkbox" id="filtre_non_membre" name="filtre_non_membre" className="input_member"
      value="non_membre" hidden />
  
    <input
      type="checkbox" id="domaine_academique" name="domaine_academique" className="input_domaine"
      value="academique" hidden />
    <input
      type="checkbox" id="domaine_technique" name="domaine_technique" className="input_domaine"
      value="technique" hidden />
    <input
      type="checkbox" id="domaine_design" name="domaine_design" className="input_domaine"
      value="design" hidden />
    <input
      type="checkbox" id="domaine_pedagogie" name="domaine_pedagogie" className="input_domaine"
      value="pedagogie" hidden />
    <input
      type="checkbox" id="domaine_administratif" name="domaine_administratif" className="input_domaine"
      value="administratif" hidden />


    <aside className="aside-filters" role="navigation" aria-label={filtresTitle}>

    <h1 className="aside-title">{filtresTitle}</h1>

      <SearchInput lang={lang} type={title} />

      <div className="filter-group" aria-label={filterMember}>
        <h1>{ filterMember }</h1>
        <label id="filtre_membre_label" className="checkbox-medialab" htmlFor="filtre_membre" aria-label={member}>{member}</label>
        <label id="filtre_non_membre_label" className="checkbox-medialab" htmlFor="filtre_non_membre" aria-label={associate}>{associate}</label>
      </div>

      <div className="filter-group" aria-label={filterDomain}>
        <h1>{ filterDomain }</h1>
        <label id="domaine_academique_label" className="checkbox-medialab" htmlFor="domaine_academique" aria-label={IsModel('academic', lang)}>{IsModel('academic', lang)}</label>
        <label id="domaine_technique_label" className="checkbox-medialab" htmlFor="domaine_technique" aria-label={IsModel('tech', lang)}>{IsModel('tech', lang)}</label>
        <label id="domaine_design_label" className="checkbox-medialab" htmlFor="domaine_design" aria-label={IsModel('design', lang)}>{IsModel('design', lang)}</label>
        <label id="domaine_pedagogie_label" className="checkbox-medialab" htmlFor="domaine_pedagogie" aria-label={IsModel('pedagogy', lang)}>{IsModel('pedagogy', lang)}</label>
        <label id="domaine_administratif_label" className="checkbox-medialab" htmlFor="domaine_administratif" aria-label={IsModel('admin', lang)}>{IsModel('admin', lang)}</label>
      </div>

    </aside>

    
  </>
	);
};

export default FiltreEquipe;
