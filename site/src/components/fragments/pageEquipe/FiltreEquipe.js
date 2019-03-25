import React from 'react';
/*import {graphql} from 'gatsby';
import {Link} from 'gatsby';*/

const FiltreEquipe = () => {
	return (
  <>
    <h1 className="type_title" id="activite_title">Membres</h1>

    <input
      type="checkbox" className="toggle-filtre-phone" id="toggle-filtre-phone"
      name="toggle-filtre-phone" value="visible" hidden />
    <label className="toggle-filtre-phone filtre_title" htmlFor="toggle-filtre-phone" title="Découvrir les options de filtrage">
      <p>Filtre<span>⋀</span>	</p>
    </label>

    <input
      type="radio" id="filtre_statut_actif" name="filtre_statut" className="input_statut"
      value="statut_actif" hidden defaultChecked />
    <label className="filtre_equipe checkbox-medialab" htmlFor="filtre_statut_actif">Actives</label>

    <input
      type="checkbox" id="filtre_statut_past" name="filtre_statut" className="input_statut_past"
      value="statut_past" hidden />
    <label className="filtre_equipe checkbox-medialab" htmlFor="filtre_statut_past">Passées</label>

    <h2 className="filtre_membre_title">Filtrer par appartenance</h2>

<input
  type="checkbox" id="filtre_membre" name="filtre_membre" className="input_member"
  value="membre" hidden />
<label className="filtre_equipe checkbox-medialab" htmlFor="filtre_membre">Membres</label>

<input
  type="checkbox" id="filtre_non_membre" name="filtre_non_membre" className="input_member"
  value="non_membre" hidden />
<label className="filtre_equipe checkbox-medialab" htmlFor="filtre_non_membre">Associés</label>

    <h2 className="filtre_domaine_title">Filtrer par domaine</h2>

    <input
      type="checkbox" id="domaine_academique" name="domaine_academique" className="input_domaine"
      value="academique" hidden />
    <label className="filtre_equipe checkbox-medialab" htmlFor="domaine_academique">Académique</label>

    <input
      type="checkbox" id="domaine_technique" name="domaine_technique" className="input_domaine"
      value="technique" hidden />
    <label className="filtre_equipe checkbox-medialab" htmlFor="domaine_technique">Technique</label>

    <input
      type="checkbox" id="domaine_design" name="domaine_design" className="input_domaine"
      value="design" hidden />
    <label className="filtre_equipe checkbox-medialab" htmlFor="domaine_design">Design</label>

    <input
      type="checkbox" id="domaine_pedagogie" name="domaine_pedagogie" className="input_domaine"
      value="pedagogie" hidden />
    <label className="filtre_equipe checkbox-medialab" htmlFor="domaine_pedagogie">Pédagogie</label>

    <input
      type="checkbox" id="domaine_administratif" name="domaine_administratif" className="input_domaine"
      value="administratif" hidden />
    <label className="filtre_equipe checkbox-medialab" htmlFor="domaine_administratif">Administratif</label>

    
  </>
	);
};

export default FiltreEquipe;
