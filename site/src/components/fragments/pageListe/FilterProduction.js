import React from 'react';
import { templateMembership } from '../../helpers';
/*import {graphql} from 'gatsby';*/
/*import {Link} from 'gatsby';*/

const FilterProduction = () => {
	return (
		<>
			<aside id="filtres-productions" className="filtres-listing">

				<h1 className="type_title" data-icon="production">Productions</h1>

				<input type="radio" id="radio_filtre-production_group" name="radio_filtre-production" value="group" hidden/>
				<label htmlFor="radio_filtre-production_group">Group <span>〉</span></label>

				<ul className="link-productions-sort">
					{/* liens vers les pages triées par le builder: la class .pageProduction_current est à ajouter selon la page sur laquelle on se trouve (productionTypes/groups) et il n'y a pas de lien à l'intérieur*/}
					<li><a href="linkProductions">Toutes les productions <span>〉</span></a></li>
					<li className="pageProduction_current">publications <span>〉</span></li>
					<li><a href="linkProductions/editionsweb">webEditions <span>〉</span></a></li>
					<li><a href="linkProductions/tools">tools <span>〉</span></a></li>
					<li><a href="linkProductions/siautions">situations <span>〉</span></a></li>
					<li><a href="linkProductions/media">media <span>〉</span></a></li>
				</ul>



				<div id="go-to-year">
					<p>Aller à l'année...</p>
					<input type="radio" id="radio_filtre-production_year" name="radio_filtre-production" value="year" hidden/>
					<label htmlFor="radio_filtre-production_year"><span>〉</span></label>
					<input type="checkbox" id="go-to-year-input" name="go-to-year-input" value="go-to-year-input" hidden />
					<label htmlFor="go-to-year-input"><span>〉</span></label>
					<p class="current-year">2019</p>
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


			</aside>


			<input type="radio" id="radio_filtre-production_type" name="radio_filtre-production" value="type" hidden/>
			<label htmlFor="radio_filtre-production_type">Type de publications <span>〉</span></label>

			{/*  si productionTypes/groups = publications */}


			<input type="checkbox" id="filtre-production_article" name="filtre-production_article" className="input_filtre-production" value="article" hidden />
			<label className="filtre-production checkbox-medialab" for="filtre-production_article">article</label>

			<input type="checkbox" id="filtre-production_communication" name="filtre-production_communication" className="input_filtre-production" value="communication" hidden />
			<label className="filtre-production checkbox-medialab" for="filtre-production_communication">communication</label>

			<input type="checkbox" id="filtre-production_book" name="filtre-production_book" className="input_filtre-production" value="book" hidden />
			<label className="filtre-production checkbox-medialab" for="filtre-production_book">book</label>

			<input type="checkbox" id="filtre-production_thesis" name="filtre-production_thesis" className="input_filtre-production" value="thesis" hidden />
			<label className="filtre-production checkbox-medialab" for="filtre-production_thesis">thesis</label>

			<input type="checkbox" id="filtre-production_grey" name="filtre-production_grey" className="input_filtre-production" value="grey" hidden />
			<label className="filtre-production checkbox-medialab" for="filtre-production_grey">grey</label>


		</>
	);
}

export default FilterProduction;
