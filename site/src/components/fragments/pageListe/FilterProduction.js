import React from 'react';
/*import {graphql} from 'gatsby';*/
/*import {Link} from 'gatsby';*/

const FilterProduction = () => {
	return (
		<> 
			<aside id="filtres-productions" className="filtres-listing">

				<h1 className="type_title">Productions</h1>

				<ul className="link-productions-sort">
					{/* liens vers les pages triées par le builder: la class .pageProduction_current est à ajouter selon la page sur laquelle on se trouve (productionTypes/groups)*/}
					<li><a href="linkProductions">Toutes les productions <span>〉</span></a></li>
					<li className="pageProduction_current"><a href="linkProductions/publications">publications <span>〉</span></a></li>
					<li><a href="linkProductions/editionsweb">webEditions <span>〉</span></a></li>
					<li><a href="linkProductions/tools">tools <span>〉</span></a></li>
					<li><a href="linkProductions/siautions">situations <span>〉</span></a></li>
					<li><a href="linkProductions/media">media <span>〉</span></a></li>
				</ul>


				<div id="go-to-year">
					<p>Aller à l'année...</p>
					<input type="checkbox" id="go-to-year-input" name="go-to-year-input" value="go-to-year-input" hidden />
					<label for="go-to-year-input"><span></span></label>
					<ul>
						<li><a href="#year-2018">2018</a></li>
						<li><a href="#year-2017">2017</a></li>
						<li><a href="#year-2016">2016</a></li>
						<li><a href="#year-2015">2015</a></li>
						<li><a href="#year-2014">2014</a></li>
						<li><a href="#year-2013">2013</a></li>
					</ul>
				</div>

				
			</aside>



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
