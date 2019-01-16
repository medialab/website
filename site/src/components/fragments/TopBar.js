import React from 'react';
/*import {graphql} from 'gatsby';*/
/*
import RawHtml from './RawHtml';
 

export default function ActivityDetail({lang, data}) {
  console.log(lang, data);
*/
import Logo from './../assets/svg/logo_medialab.png';
export {
	Logo
}
						

const TopBar = () => {
	return (
		  	<header id="topbar">
			<input type="checkbox" id="toggle-menu" name="toggle-menu" value="visible" hidden/>
			<label for="toggle-menu">
				<span class="span-nochecked"><img src={require("./../assets/svg/menu-circle.svg")} alt="" /></span>
				<span class="span-checked"><img src={require("./../assets/svg/close-circle.svg")} alt="" /></span>
			</label>


			<div id="topbar-content">
				<div id="logo-medialab">
					<a href="index.php">
						<img src={Logo} alt="logo" />
					</a>
				</div>


				<nav id="nav-option">
					<ul id="nav-home">
						<li><a href="linkHome#now">En ce moment</a></li>
						<li><a href="linkHome#agenda">Les rendez-vous du labo</a></li>
						<li><a href="linkHome#flux">Flux</a></li>
					</ul>
					<ul id="nav-objet">

		              	<li data-type="actualite"><a href="page_liste.php?type=actualite">Actualités</a></li>

		              	<li data-type="production"><a href="page_liste.php?type=production">Productions</a></li>

		              	<li data-type="activite"><a href="page_liste.php?type=activite">Activités</a></li>

					</ul>
					<ul id="nav-institution">
						<li><a href="#">Le Médialab</a></li>
						<li><a href="page_personne.php">L'équipe</a></li>
					</ul>
					<ul id="nav-archive">
						<li><a href="#">Archives</a></li>
					</ul>
				</nav>

				<div id="langue" class="menu langue">
					<p><span>FR</span><span> | </span><span>EN</span></p>
				</div>
			</div>
		</header>
  	);
}

export default TopBar;