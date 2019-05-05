import React from 'react';
/*import {graphql} from 'gatsby';
import {Link} from 'gatsby';*/
import {IsModel} from '../../helpers/helpers.js';

const FiltreEquipe = ({lang}) => {

  let title, member, associate, filterDomain, filterMember;

  if (lang === 'fr') {
    title = 'L‘équipe';
	  member = 'Membres';
    associate = 'Associés';
    filterDomain = 'Filtrer par domaine';
    filterMember = 'Filtrer par appartenance';
	
	}
	else {
    title = "The Team"
		member = 'Members'
    associate = 'Associates'
    filterDomain = 'Filter by domain';
    filterMember = 'Filter by membership';
  }
  

	return (
  <>
    <h1 className="type_title" id="activite_title">{title}</h1>

    <input
      type="checkbox" className="toggle-filtre-phone" id="toggle-filtre-phone"
      name="toggle-filtre-phone" value="visible" hidden />
    <label className="toggle-filtre-phone filtre_title" htmlFor="toggle-filtre-phone" title="Découvrir les options de filtrage">
      <p>Filtre<span>⋀</span>	</p>
    </label>


    <h2 className="filtre_membre_title h2_filtre">{ filterMember }</h2>

    <input
      type="checkbox" id="filtre_membre" name="filtre_membre" className="input_member"
      value="membre" hidden />
    <label className="filtre_equipe checkbox-medialab" htmlFor="filtre_membre">{member}</label>

    <input
      type="checkbox" id="filtre_non_membre" name="filtre_non_membre" className="input_member"
      value="non_membre" hidden />
    <label className="filtre_equipe checkbox-medialab" htmlFor="filtre_non_membre">{associate}</label>

    <h2 className="filtre_domaine_title h2_filtre">{ filterDomain }</h2>

    <input
      type="checkbox" id="domaine_academique" name="domaine_academique" className="input_domaine"
      value="academique" hidden />
    <label className="filtre_equipe checkbox-medialab" htmlFor="domaine_academique">{IsModel('academic', lang)}</label>

    <input
      type="checkbox" id="domaine_technique" name="domaine_technique" className="input_domaine"
      value="technique" hidden />
    <label className="filtre_equipe checkbox-medialab" htmlFor="domaine_technique">{IsModel('tech', lang)}</label>

    <input
      type="checkbox" id="domaine_design" name="domaine_design" className="input_domaine"
      value="design" hidden />
    <label className="filtre_equipe checkbox-medialab" htmlFor="domaine_design">{IsModel('design', lang)}</label>

    <input
      type="checkbox" id="domaine_pedagogie" name="domaine_pedagogie" className="input_domaine"
      value="pedagogie" hidden />
    <label className="filtre_equipe checkbox-medialab" htmlFor="domaine_pedagogie">{IsModel('pedagogy', lang)}</label>

    <input
      type="checkbox" id="domaine_administratif" name="domaine_administratif" className="input_domaine"
      value="administratif" hidden />
    <label className="filtre_equipe checkbox-medialab" htmlFor="domaine_administratif">{IsModel('admin', lang)}</label>

    
  </>
	);
};

export default FiltreEquipe;
