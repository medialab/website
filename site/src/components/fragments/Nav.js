import React from 'react';
import {Link} from 'gatsby';
/*

import {graphql} from 'gatsby';
import RawHtml from './RawHtml';
 */

import Logo from '../assets/svg/logo_medialab.svg';


function Nav({lang, object}) {


	//Je pense que nous n'avons pas assez de donnée dans le CMS pour mener à bien cette fonction
	// Néanmoins la logique serait :  Si et seulement si il existe une Image Générée créer cet élément
	// Cet élément est composé d'une image lambda et de son corrolaire Image Générée
	let img = null;
	if (object && object.cover) {
		img = (
			<div>
				<img src={object.cover.url} alt={object.cover.title} />
				<div class=".image-generator"></div>
			</div>
		);
	}


	return (<nav id="nav-inside-article">
			<div className="nav-inside-item">
				<Link to="#topbar">
					<Logo />
				</Link>
			</div>
			<div className="nav-inside-item" id="img-article">
				{img}
			</div>
			{(object.related || []).map(o => (
				<div className="nav-inside-item" >
					<Link to={`#${o.id}`}><p>{lang === "fr" ? o.fr : o.en }</p></Link>
				</div>)
			)}

		</nav>
	);
}
export default Nav;
