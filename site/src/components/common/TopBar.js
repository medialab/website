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
    medialab = 'Le médialab';
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
    medialab = 'The médialab';
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
    <header id="topbar" role="banner" aria-label={lang === 'fr' ? "Navigation globale du site" : "Website global navigation" }>
      <input
        type="checkbox" id="toggle-menu" name="toggle-menu"
        value="visible" hidden />
      <label htmlFor="toggle-menu">
        <span className="span-nochecked" aria-label={lang === 'fr' ? "Ouvrir le menu principal" : 'Open the main menu'}>
          <MenuCircle />
        </span>
        <span className="span-checked" aria-label={lang === 'fr' ? "fermer le menu principal" : 'close the main menu'}>
          <CloseCircle />
        </span>
      </label>

      <div id="topbar-content">
        <div id="logo-medialab">
          <Link to="/"
            id="back_button" title={lang === 'fr' ? "Retour à l'acceuil" : 'Back to Homepage'}
            aria-label={lang === 'fr' ? "Retour à l'acceuil" : 'Back to Homepage'}>
            <Logo />
          </Link>
        </div>

        <nav id="nav-option" role="navigation" aria-owns="langue back_button fr-to-en en-to-fr">

          <ul id="nav-objet" >

            <li data-type="actualite">
              <Link to={`${relLang}/news`}
                    aria-label={lang === 'fr' ? "Aller à la liste complètes des Actualités" : "Go to the complete list of médialab news" }>{news}</Link>
            </li>

            <li data-type="production">
              <Link to={`${relLang}/productions`}
                    aria-label={lang === 'fr' ? "Aller à la liste complètes des Productions" : "Go to the complete list of médialab productions" }>{prod}</Link>
            </li>

            <li data-type="activite">
              <Link to={`${relLang}/activities`}
                    aria-label={lang === 'fr' ? "Aller à la liste complètes des Activités" : "Go to the complete list of médialab activities" }>{activite}</Link>
            </li>

          </ul>
          <ul id="nav-institution">
            <li><Link to={`${relLang}/about`} aria-label={lang === 'fr' ? "Aller à la page de présentation du médialab" : "Go to médialab presentation page" }>{medialab}</Link></li>
            <li><Link to={`${relLang}/people`} aria-label={lang === 'fr' ? "Découvrir les membres du médialab" : "Discover médialab members " }>{team}</Link></li>
          </ul>
          <ul id="nav-archive">
            {/*<li><Link to={`${relLang}/outils`}>{tool}</Link></li>*/}
            <li>
            <a href="http://tools.medialab.sciences-po.fr"
              target="_blank" rel="noopener"
              aria-label={lang === 'fr' ? "Aller à la liste des outils numériques créés ou utilisé par le médialab " : "Go to a listing of digital tools created or used by médialab" }>{tool}</a>
            </li>
            {/* <li><Link to={`${relLang}/archive`}>{archive}</Link></li> */}
          </ul>
        </nav>

        <div id="langue" className="menu langue" aria-label={lang === "fr" ? "Choix de la langue" : "Language selection" }>
          <p><Link activeClassName="active" to={permalinks.fr} aria-label={lang === "fr" ? "Contenu en langue française" : "French version content" }>FR</Link><span> | </span><Link activeClassName="active" to={permalinks.en} aria-label={lang === "fr" ? "Contenu en langue anglaise" : "English version content" }>EN</Link></p>
        </div>
      </div>
      <div className="print"><p>medialab.sciencespo.fr</p></div>
    </header>
  );
};

export default TopBar;
