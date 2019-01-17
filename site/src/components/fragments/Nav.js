import React from 'react';/*
import {graphql} from 'gatsby';
import RawHtml from './RawHtml';
 */

const Nav = () => {
	return (
	  	<nav id="nav-inside-article">
			<div className="nav-inside-item">
			<a href="#topbar">
				<img src={require("./../assets/svg/logo_medialab.png")}  alt="" />
			</a>
			</div>
			<div className="nav-inside-item" id="img-article">
				<div>
					<div className="image-generator">
					</div>
				</div>
			</div>
			<div className="nav-inside-item" >
				<a href="#main-objet"><p className="article-contenu">Article</p></a>
			</div>
			<div className="nav-inside-item" >
			<a href="#fichiers-associes"><p>Fichiers associés</p></a>
			</div>
			<div className="nav-inside-item">
				<a href="#elements-associes"><p>Éléments liées</p></a>
			</div>
		</nav>
	);
}

export default Nav;
