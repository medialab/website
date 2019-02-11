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
					<Link to="/">
						<Logo />
					</Link>
				</div>

				<nav id="nav-option">
					<ul id="nav-home">
						<li><Link to="#now">En ce moment</Link></li>
						<li><Link to ="#agenda">Les rendez-vous du labo</Link></li>
						<li><Link to="#flux">Flux</Link></li>
					</ul>
					<ul id="nav-objet">

		              	<li data-type="actualite"><Link to="/news">Actualités</Link></li>

		              	<li data-type="production"><Link to="/productions">Productions</Link></li>

		              	<li data-type="activite"><Link to="/activities">Activités</Link></li>

					</ul>
					<ul id="nav-institution">
						<li><Link to="/about">Le Médialab</Link></li>
						<li><Link to="/people">L'équipe</Link></li>
					</ul>
					<ul id="nav-archive">
						<li><Link to="/outils">Outils</Link></li>
						<li><Link to="/archive">Archives</Link></li>
					</ul>
				</nav>

				<div id="langue" className="menu langue">
					<p><Link to="/">FR</Link><span> | </span><Link to="/en">EN</Link></p>
				</div>
			</div>
		</header>
  	);
}

export default TopBar;
