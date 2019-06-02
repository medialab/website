import React from 'react';
/*import {graphql} from 'gatsby';
import {Link} from 'gatsby';*/
import {IsModel} from '../../helpers/helpers.js';
import { SearchInput } from '../../helpers/SearchInput.js';

const FiltreEquipe = ({lang}) => {

  let title, member, associate, filterDomain, filterMember, accroche;

  if (lang === 'fr') {
    title = 'L‘équipe';
	  member = 'Membres';
    associate = 'Associés';
    filterDomain = 'Filtrer par domaine';
    filterMember = 'Filtrer par appartenance';
    accroche = 'Composée d’hommes et de femmes aux compétences complémentaires, l’équipe du médialab est plurielle. Membres ou associés au laboratoire, ces profils académiques, techniques, en design, ou encore en pédagogie se combinent et travaillent ensemble pour aviver la force des activités du laboratoire.';
	}
	else {
    title = "The Team"
		member = 'Members'
    associate = 'Associates'
    filterDomain = 'Filter by domain';
    filterMember = 'Filter by membership';
    accroche = 'Composée d’hommes et de femmes aux compétences complémentaires, l’équipe du médialab est plurielle. Membres ou associés au laboratoire, ces profils académiques, techniques, en design, ou encore en pédagogie se combinent et travaillent ensemble pour aviver la force des activités du laboratoire.';
  }
  

	return (
  <>
    <h1 className="type_title" id="activite_title">{title}</h1>
    <p className="accroche-title-list">{accroche}</p>

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


    <aside className="aside-filters">

    <h1 class="aside-title">{filtresTitle}</h1>

      <SearchInput lang={lang} type={title} />


      <input type="checkbox" className="toggle-filtre-phone" id="toggle-filtre-phone" name="toggle-filtre-phone" value="visible" hidden />
      <label id="toggle-filtre-phone-label" htmlFor="toggle-filtre-phone" title="Découvrir les options de filtrage"><p>{IsModel('filters', lang)}<span /></p></label>

      <div className="filter-group">
        <h1>{ filterMember }</h1>
        <label id="filtre_membre_label" className="checkbox-medialab" htmlFor="filtre_membre">{member}</label>
        <label id="filtre_non_membre_label" className="checkbox-medialab" htmlFor="filtre_non_membre">{associate}</label>
      </div>

      <div className="filter-group">
        <h1>{ filterDomain }</h1>
        <label id="domaine_academique_label" className="checkbox-medialab" htmlFor="domaine_academique">{IsModel('academic', lang)}</label>
        <label id="domaine_technique_label" className="checkbox-medialab" htmlFor="domaine_technique">{IsModel('tech', lang)}</label>
        <label id="domaine_design_label" className="checkbox-medialab" htmlFor="domaine_design">{IsModel('design', lang)}</label>
        <label id="domaine_pedagogie_label" className="checkbox-medialab" htmlFor="domaine_pedagogie">{IsModel('pedagogy', lang)}</label>
        <label id="domaine_administratif_label" className="checkbox-medialab" htmlFor="domaine_administratif">{IsModel('admin', lang)}</label>
      </div>

    </aside>

    
  </>
	);
};

export default FiltreEquipe;
