import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';

const FiltreEquipe = () => {
	return (
		<>
			<h1 className="type_title">Productions</h1>

			{ /* Filtre for phone */ }
			<input type="checkbox" className="toggle-filtre-phone" id="toggle-filtre-phone" name="toggle-filtre-phone" value="visible"  hidden />
			<label className="toggle-filtre-phone filtre_title" for="toggle-filtre-phone" title="Découvrir les options de filtrage">
				<p>Filtre<span>⋀</span>	</p>
			</label>
			{ /* End Filtre for phone */ } 

			<div id="go-to-year">
				<h1>Aller à l'année</h1>
				<input type="checkbox" id="go-to-year-input" name="go-to-year-input" value="go-to-year-input" hidden />
				<label for="go-to-year-input"><span></span></label>
				<ul>
					<li><Link to="#year-2018">2019</Link></li>
					<li><Link to="#year-2018">2018</Link></li>
					<li><Link to="#year-2017">2017</Link></li>
					<li><Link to="#year-2016">2016</Link></li>
					<li><Link to="#year-2015">2015</Link></li>
					<li><Link to="#year-2014">2014</Link></li>
					<li><Link to="#year-2013">2013</Link></li>
				</ul>
			</div>

			{ /* Productions */ } 
			<input type="checkbox" id="filtre_publication" name="filtre_publication" value="publication" hidden checked />
			<label className="filtre_objet filtre_production" for="filtre_publication"><Link className="checkbox-medialab checkbox-medialab_link" to="linkPageProductionsPublications">Publications <span>〉</span></Link></label>

			<input type="checkbox" id="filtre_publication_article" name="filtre_publication_article" value="publication_article" hidden />
			<label className="filtre_objet_value filtre_production checkbox-medialab" for="filtre_publication_article">Articles</label>

			<input type="checkbox" id="filtre_publication_communication" name="filtre_publication_communication" value="publication_communication" hidden />
			<label className="filtre_objet_value filtre_production checkbox-medialab" for="filtre_publication_communication">Communications</label>

			<input type="checkbox" id="filtre_publication_book" name="filtre_publication_book" value="publication_book" hidden />
			<label className="filtre_objet_value filtre_production checkbox-medialab" for="filtre_publication_book">Books</label>

			<input type="checkbox" id="filtre_publication_thesis" name="filtre_publication_thesis" value="publication_thesis" hidden />
			<label className="filtre_objet_value filtre_production checkbox-medialab" for="filtre_publication_thesis">Thesis</label>

			<input type="checkbox" id="filtre_publication_grey" name="filtre_publication_grey" value="publication_grey" hidden />
			<label className="filtre_objet_value filtre_production checkbox-medialab" for="filtre_publication_grey">Grey</label> 

			{ /* Éditions web */ }
			<input type="checkbox" id="filtre_editionweb" name="filtre_editionweb" value="editionweb" hidden />
			<label className="filtre_objet filtre_production" for="filtre_editionweb"><Link className="checkbox-medialab checkbox-medialab_link" to="linkPageProductionsEditionsweb">Éditions web <span>〉</span></Link></label>
 
			{ /* Tools*/ }
			<input type="checkbox" id="filtre_tools" name="filtre_tools" value="tools" hidden />
			<label className="filtre_objet filtre_production" for="filtre_tools"><Link className="checkbox-medialab checkbox-medialab_link" to="linkPageTools">Tools <span>〉</span></Link></label>
			 
			{ /* Situations */ }
			<input type="checkbox" id="filtre_situations" name="filtre_situations" value="situations" hidden />
			<label className="filtre_objet filtre_production" for="filtre_situations"><Link className="checkbox-medialab checkbox-medialab_link" to="linkPageSituations">Situations <span>〉</span></Link></label>
			 
			{ /* Medias */ }
			<input type="checkbox" id="filtre_media" name="filtre_media" value="media" hidden />
			<label className="filtre_objet filtre_production" for="filtre_media"><Link className="checkbox-medialab checkbox-medialab_link" to="linkPageMedia">Média <span>〉</span></Link></label>
		</>
	);
}

export default FiltreEquipe;
