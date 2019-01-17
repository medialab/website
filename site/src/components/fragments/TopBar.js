import React from 'react';
import {Link} from 'gatsby';
/*
import RawHtml from './RawHtml';


export default function ActivityDetail({lang, data}) {
  console.log(lang, data);
*/
import Logo from '../assets/svg/logo_medialab.svg';
import MenuCircle from '../assets/svg/menu-circle.svg';
import CloseCircle from '../assets/svg/close-circle.svg';

const TopBar = () => {
	return (
		  	<header id="topbar">
			<input type="checkbox" id="toggle-menu" name="toggle-menu" value="visible" hidden/>
			<label htmlFor="toggle-menu">
				<span className="span-nochecked"><MenuCircle /></span>
				<span className="span-checked"><CloseCircle /></span>
			</label>


			<div id="topbar-content">
				<div id="logo-medialab">
					<a href="index.php">
						<Logo />
					</a>
				</div>


				<nav id="nav-option">
					<ul id="nav-home">
						<li><a href="linkHome#now">En ce moment</a></li>
						<li><a href="linkHome#agenda">Les rendez-vous du labo</a></li>
						<li><a href="linkHome#flux">Flux</a></li>
					</ul>
					<ul id="nav-objet">

		              	<li data-type="actualite"><Link to="/news">Actualités</Link></li>

		              	<li data-type="production"><Link to="/productions">Productions</Link></li>

		              	<li data-type="activite"><Link to="/activities">Activités</Link></li>

					</ul>
					<ul id="nav-institution">
						<li><a href="#">Le Médialab</a></li>
						<li><a href="page_personne.php">L'équipe</a></li>
					</ul>
					<ul id="nav-archive">
						<li><a href="#">Archives</a></li>
					</ul>
				</nav>

				<div id="langue" className="menu langue">
					<p><span>FR</span><span> | </span><span>EN</span></p>
				</div>
			</div>
		</header>
  	);
}

export default TopBar;
