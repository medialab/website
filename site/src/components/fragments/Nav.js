import React from 'react';
import {Link} from 'gatsby';
/*

import {graphql} from 'gatsby';
import RawHtml from './RawHtml';
 */

import Logo from '../assets/svg/logo_medialab.svg';


function Nav(props) {

	let img = null;
	let imgGen = null;
	
	if (props.image) {
		img = (
			<div className="image-original">
				<img src={props.image} alt={props.image.caption} />
			</div>
		);

		imgGen = (
		  	<div className="image-generator">
		    	<img src={props.image_gen} alt={props.image_gen.caption} />
		  	</div>
		);
	}
	return (
	  	<nav id="nav-inside-article">
			<div className="nav-inside-item">
			<Link to="#topbar">
				<Logo />
			</Link>
			</div>
			<div className="nav-inside-item" id="img-article">
				{img}
				{imgGen}
			</div>
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
