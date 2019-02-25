import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';

const FilterNews = ({lang}) => {

	let title, year, filters; 

	if (lang === 'fr') {
		title = "Actualités";
		year = "Aller à l'année…";
		filters = "Filtres"
	}
	else {
		title = "News";
		year = "Go to year…";
		filters = "Filters";
	}


	return (
		<>
			<h1 className="type_title" data-icon="actualites">{ title }</h1>

			<input type="checkbox" className="toggle-filtre-phone" id="toggle-filtre-phone" name="toggle-filtre-phone" value="visible" hidden/>
			<label for="toggle-filtre-phone" title="Découvrir les options de filtrage">
				<p>{ filters }<span></span></p>
			</label>

			<div id="background-phone"></div>

			<div class="go-to-year" id="go-to-year_news">
				<p>{ year }</p>
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

		</>
	);
}

export default FilterNews;

