import React from 'react';
import {Link} from 'gatsby';
/*

import {graphql} from 'gatsby';
import RawHtml from './RawHtml';
 */

import Logo from '../assets/svg/logo_medialab.svg';


function Nav(lang, /*object */) {

	//console.log(object);
	
	 
	//Je pense que nous n'avons pas assez de donnée dans le CMS pour mener à bien cette fonction
	// Néanmoins la logique serait :  Si et seulement si il existe une Image Générée créer cet élément
	// Cet élément est composé d'une image lambda et de son corrolaire Image Générée
	let img = null;
	/*if (object.image) {
		img = (
			<div>
				<img src={object.coverImage.url} alt={object.coverImage.title} />
				<div class=".image-generator">

				</div>
			</div>
		);
	}*/







	return (
	  	<nav id="nav-inside-article">
			<div className="nav-inside-item">
			<Link to="#topbar">
				<Logo />
			</Link>
			</div>
			<div className="nav-inside-item" id="img-article">
				{img}
			</div>
			{/*
			//Definir le contenu de la Nav en fonction du contexte
			//Pour chaque valeur object.related non null, retourner une div 
			
			{(object.related || []).map(o => (
					
				if(o.exist === true ){
					<div className="nav-inside-item" >
						<Link to={`#${o.id}`}><p>{lang === "fr" ? o.fr : o.en }</p></Link>
					</div>
				}
				)
			)}

			// Effacer les 3 divs suivantes
			*/}


			<div className="nav-inside-item" >
				<Link to="#main-objet"><p className="article-contenu">Article</p></Link>
			</div>
			<div className="nav-inside-item" >
			<Link to="#fichiers-associes"><p>Fichiers associés</p></Link>
			</div>
			<div className="nav-inside-item">
				<Link to="#elements-associes"><p>Éléments liées</p></Link>
			</div>

		</nav>
	);
}
export default Nav;
