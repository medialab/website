import React from 'react';
import {Link} from 'gatsby';
import Logo from '../assets/svg/logo_medialab.svg';
import MenuCircle from '../assets/svg/menu-circle.svg';
import CloseCircle from '../assets/svg/close-circle.svg';

const TopBar = ({permalinks, lang}) => {

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
    now = 'En ce moment';
    agenda = 'Les rendez-vous du labo';
    flux = 'Flux';
    news = 'Actualités';
    prod = 'Productions';
    activite = 'Activités';
    medialab = 'Le Médialab';
    team = "L'équipe";
    tool = 'Outils';
    archive = 'Archives';
  }
  else {
    now = 'The news';
    agenda = "Lab's appointment";
    flux = 'Flux';
    news = 'News';
    prod = 'Productions';
    activite = 'Activities';
    medialab = 'The Medialab';
    team = 'The team';
    tool = 'Tools';
    archive = 'Archives';
  }
  let relLang;
  if (lang === 'en') {
  relLang = '/en';
  }
  else {
  relLang = '';
  }

	return (
    <header id="topbar">
      <input
        type="checkbox" id="toggle-menu" name="toggle-menu"
        value="visible" hidden />
      <label htmlFor="toggle-menu">
        <span className="span-nochecked"><MenuCircle /></span>
        <span className="span-checked"><CloseCircle /></span>
      </label>

      <div id="topbar-content">
        <div id="logo-medialab">
          <Link to="/" title={lang = 'fr' ? "Retour à l'acceuil" : 'Back to Homepage'}>
            <Logo />
          </Link>
        </div>

        <nav id="nav-option">
          <ul id="nav-home">
            <li><a href="#now">{now}</a></li>
            <li><a href="#agenda">{agenda}</a></li>
            <li><a href="#flux">{flux}</a></li>
          </ul>
          <ul id="nav-objet">

            <li data-type="actualite"><Link to={`${relLang}/news`}>{news}</Link></li>

            <li data-type="production"><Link to={`${relLang}/productions`}>{prod}</Link></li>

            <li data-type="activite"><Link to={`${relLang}/activities`}>{activite}</Link></li>

          </ul>
          <ul id="nav-institution">
            <li><Link to={`${relLang}/about`}>{medialab}</Link></li>
            <li><Link to={`${relLang}/people`}>{team}</Link></li>
          </ul>
          <ul id="nav-archive">
            {/*<li><Link to={`${relLang}/outils`}>{tool}</Link></li>*/}
            <li><a href="http://tools.medialab.sciences-po.fr" target="_blank" rel="noopener">{tool}</a></li>
            <li><Link to={`${relLang}/archive`}>{archive}</Link></li>
          </ul>
        </nav>

        <div id="langue" className="menu langue">
          <p><Link activeClassName="active" to={permalinks.fr}>FR</Link><span> | </span><Link activeClassName="active" to={permalinks.en}>EN</Link></p>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
