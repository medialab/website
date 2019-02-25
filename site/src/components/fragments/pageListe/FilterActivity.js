import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';

const FilterActivity = () => {
	return (
		<>
			<h1 className="type_title" data-icon="activite">Activités</h1>

			<input type="checkbox" className="toggle-filtre-phone" id="toggle-filtre-phone" name="toggle-filtre-phone" value="visible" hidden/>
			<label for="toggle-filtre-phone" title="Découvrir les options de filtrage">
				<p>Filtres<span></span></p>
			</label>

			<div id="background-phone"></div>

			<ul className="link-activity-sort">
				{/* liens vers les pages triées par le builder: la class .pageProduction_current est à ajouter selon la page sur laquelle on se trouve, par defaut: "actives"*/}
				<li className="pageProduction_current"><a href="linkActivity/actives">Actives <span>〉</span></a></li>
				<li><a href="linkActivity/passees">Passées <span>〉</span></a></li>
			</ul>

		<input type="checkbox" id="filtre-activity_research" name="filtre-activity_research" className="input_filtre-activity" value="research" hidden  />
		<label className="filtre-activity checkbox-medialab" ifor="filtre-activity_research">research</label>
		<input type="checkbox" id="filtre-activity_teaching" name="filtre-activity_teaching" className="input_filtre-activity" value="teaching" hidden  />
		<label className="filtre-activity checkbox-medialab" for="filtre-activity_teaching">teaching</label>
		{/*  La classification methode a était retirée le 5 fevrier dernier 
		<input type="checkbox" id="filtre-activity_method" name="filtre-activity_method" className="input_filtre-activity" value="method" hidden />
		<label className="filtre-activity checkbox-medialab" for="filtre-activity_method">method</label>  */}


		</>
	);
}

export default FilterActivity;

