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

const TopBar = ({permalink, lang}) => {

let now = null;
let agenda = null;
let flux = null;
let news = null;
let prod = null;
let activite = null;
let medialab = null;
let team = null;
let tool = null;
let archive = null;

if (lang === 'fr') {
	now = "En ce moment";
	agenda = "Les rendez-vous du labo";
	flux = "Flux";
	news = "Actualités";
	prod = "Productions";
	activite = "Activités";
	medialab = "Le Médialab";
	team = "L'équipe";
	tool = "Outils";
	archive = "Archives";
}
else {
	now = "The news";
	agenda = "Lab's appointment";
	flux = "Flux";
	news = "News";
	prod = "Productions";
	activite = "Activities";
	medialab = "The Medialab";
	team = "The team";
	tool = "Tools";
	archive = "Archives";
}



	return (
		  	<header id="topbar">
			<input type="checkbox" id="toggle-menu" name="toggle-menu" value="visible" hidden/>
			<label htmlFor="toggle-menu">
				<span className="span-nochecked"><MenuCircle /></span>
				<span className="span-checked"><CloseCircle /></span>
			</label>

			<div id="topbar-content">
				<div id="logo-medialab">
					<Link to="/" title={ lang="fr" ? "Retour à l'acceuil" : "Back to Homepage"}>
						<Logo />
					</Link>
				</div>

				<nav id="nav-option">
					<ul id="nav-home">
						<li><Link to="#now">{ now }</Link></li>
						<li><Link to ="#agenda">{ agenda }</Link></li>
						<li><Link to="#flux">{ flux }</Link></li>
					</ul>
					<ul id="nav-objet">

		              	<li data-type="actualite"><Link to="/news">{ news }</Link></li>

		              	<li data-type="production"><Link to="/productions">{ prod }</Link></li>

		              	<li data-type="activite"><Link to="/activities">{ activite }</Link></li>

					</ul>
					<ul id="nav-institution">
						<li><Link to="/about">{ medialab }</Link></li>
						<li><Link to="/people">{ team }</Link></li>
					</ul>
					<ul id="nav-archive">
						<li><Link to="/outils">{ tool }</Link></li>
						<li><Link to="/archive">{ archive }</Link></li>
					</ul>
				</nav>

				<div id="langue" className="menu langue">
					<p><Link activeClassName="active" to={`/${permalink}`}>FR</Link><span> | </span><Link activeClassName="active" to={`/en/${permalink}`}>EN</Link></p>
				</div>
			</div>
		</header>
  	);
}

export default TopBar;
