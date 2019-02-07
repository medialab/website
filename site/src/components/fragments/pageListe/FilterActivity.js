import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';

const FilterActivity = () => {
	return (
		<>
		{ /* Filtre for phone */ }
		<input type="checkbox" className="toggle-filtre-phone" id="toggle-filtre-phone" name="toggle-filtre-phone" value="visible"  hidden />
		<label className="toggle-filtre-phone filtre_title" for="toggle-filtre-phone" title="Découvrir les options de filtrage">
			<p>Filtre<span>⋀</span>	</p>
		</label>

		{/* Active (par défaut) */ }
		<input type="checkbox" id="filtre_activite_passe" name="filtre_activite_active" value="activite_active" hidden checked />
		<label className="filtre_objet filtre_activite" for="filtre_activite_active"><a className="checkbox-medialab checkbox-medialab_link" href="linkPageActivitesActives">Actives</a></label>

		<input type="checkbox" id="filtre_activite_passe" name="filtre_activite_passe" value="activite_passe" hidden />
		<label className="filtre_objet filtre_activite" for="filtre_activite_passe"><a className="checkbox-medialab checkbox-medialab_link" href="linkPageActivitesActives+Passees">Passées</a></label>
		<h2 className="filtre_objet filtre_activite_title">Filtrer par type</h2>

		<input type="checkbox" id="filtre_recherche" name="filtre_recherche" value="recherche" hidden />
		<label className="filtre_objet filtre_activite checkbox-medialab" for="filtre_recherche">Recherche</label>


		<input type="checkbox" id="filtre_enseignement" name="filtre_enseignement" value="enseignement" hidden />
		<label className="filtre_objet filtre_activite checkbox-medialab" for="filtre_enseignement">Enseignement</label>

		<input type="checkbox" id="filtre_methode" name="filtre_methode" value="methode" hidden />
		<label className="filtre_objet filtre_activite checkbox-medialab" for="filtre_methode">Méthode</label>
		</>
	);
}

export default FilterActivity;
