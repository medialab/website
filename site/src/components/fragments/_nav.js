/*import React from 'react';
import {graphql} from 'gatsby';

import RawHtml from './RawHtml';
 

export default function ActivityDetail({lang, data}) {
  console.log(lang, data);*/

const _nav = () => {
	return (
	  	<nav id="nav-inside-article">
			<div class="nav-inside-item">
			<a href="#topbar">
				<img src={require("./assets/svg/Medialab_logo_black_RVB.svg")}/>
			</a>		
			</div>
			<div class="nav-inside-item" id="img-article">
				<div>
					<img src={require("./assets/images/sample/RICardo_2017_2016_versions_b.png")}/>
					<div class="image-generator">
						<img src={require("./assets/images/sample_txt/ricardo_100.html")}/>
					</div>
				</div>
			</div>
			<div class="nav-inside-item" >
				<a href="#main-objet"><p class="article-contenu">Article</p></a>
			</div>
			<div class="nav-inside-item" >
			<a href="#fichiers-associes"><p>Fichiers associés</p></a>
			</div>
			<div class="nav-inside-item">
				<a href="#elements-associes"><p>Éléments liées</p></a>
			</div>
		</nav>
	  );
}