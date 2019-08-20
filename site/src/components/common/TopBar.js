import React from 'react';
import {Link as BasicLink} from 'gatsby';
import Logo from '../assets/svg/logo_medialab.svg';
import MenuCircle from '../assets/svg/menu-circle.svg';
import CloseCircle from '../assets/svg/close-circle.svg';

const mainPermalinks = {
  en: {
    home: '/en',
    about: '/en/about',
    seminar: '/en/activities/seminaire-du-medialab',
    activities: '/en/activities',
    news: '/en/news',
    people: '/en/people',
    productions: '/en/productions'
  },
  fr: {
    home: '/',
    about: '/a-propos',
    seminar: '/activites/seminaire-du-medialab',
    activities: '/activites',
    news: '/actu',
    people: '/equipe',
    productions: '/productions'
  }
};

const i18n = {
  fr: {
    news: 'Actualités',
    prod: 'Productions',
    activite: 'Activités',
    medialab: 'Le médialab',
    team: 'L\'équipe',
    seminar: 'Séminaire',
    tool: 'Outils'
  },
  en: {
    news: 'News',
    prod: 'Productions',
    activite: 'Activities',
    medialab: 'The médialab',
    team: 'Team',
    seminar: 'Seminar',
    tool: 'Tools'
  }
};

const ariaLabelI18n = {
  fr: {
    header: 'Navigation globale du site',
    openMenu: 'Ouvrir le openMenu principal',
    closeMenu: 'Fermer le menu principal',
    backToHome: 'Retour à l\'accueil',
    news: 'Aller à la liste complètes des Actualités',
    productions: 'Aller à la liste complètes des Productions',
    activities: 'Aller à la liste complètes des Activités',
    people: 'Découvrir les membres du médialab',
    presentation: 'Aller à la page de présentation du médialab',
    tools: 'Aller à la liste des outils numériques créés ou utilisé par le médialab',
    seminar: 'Assister à notre séminaire',
    lang: 'Choix de la langue',
    fr: 'Contenu en langue française',
    en: 'Contenu en langue anglaise'
  },
  en: {
    header: 'Website global navigation',
    openMenu: 'Open the main menu',
    closeMenu: 'Close the main menu',
    backToHome: 'Back to homepage',
    news: 'Go to the complete list of news',
    productions: 'Go to the complete list of productions',
    activities: 'Go to the complete list of activities',
    people: 'Discover médialab members',
    presentation: 'Go to médialab presentation page',
    tools: 'Go to a listing of digital tools created or used by médialab',
    seminar: 'Join us for our seminar',
    lang: 'Language selection',
    fr: 'French version content',
    en: 'English version content'
  }
};

const Link = (props) => <BasicLink partiallyActive activeClassName={'active'} {...props} />;

const TopBar = ({permalinks, lang}) => {

  const {
    news,
    prod,
    activite,
    medialab,
    team,
    seminar,
    tool
  } = i18n[lang];

	return (
    <header id="topbar" role="banner" aria-label={ariaLabelI18n[lang].header}>
      <input
        type="checkbox" id="toggle-menu" name="toggle-menu"
        value="visible" hidden />
      <label htmlFor="toggle-menu">
        <span className="span-nochecked" aria-label={ariaLabelI18n[lang].openMenu}>
          <MenuCircle />
        </span>
        <span className="span-checked" aria-label={ariaLabelI18n[lang].closeMenu}>
          <CloseCircle />
        </span>
      </label>

      <div id="topbar-content">
        <div id="logo-medialab">
          <Link
            to={mainPermalinks[lang].home}
            id="back_button"
            title={ariaLabelI18n[lang].title}
            aria-label={ariaLabelI18n[lang].title}>
            <Logo />
            <span itemProp="name" style={{display: 'none'}}>médialab Sciences Po</span>
          </Link>
        </div>

        <nav id="nav-option" role="navigation" aria-owns="langue back_button fr-to-en en-to-fr">

          <ul id="nav-objet" >

            <li data-type="actualite">
              <Link
                to={mainPermalinks[lang].news}
                aria-label={ariaLabelI18n[lang].news}>{news}</Link>
            </li>

            <li data-type="production">
              <Link
                to={mainPermalinks[lang].productions}
                aria-label={ariaLabelI18n[lang].productions}>{prod}</Link>
            </li>

            <li data-type="activite">
              <Link
                to={mainPermalinks[lang].activities}
                aria-label={ariaLabelI18n[lang].activities}>{activite}</Link>
            </li>

          </ul>
          <ul id="nav-institution">
            <li><Link to={mainPermalinks[lang].people} aria-label={ariaLabelI18n[lang].people}>{team}</Link></li>
            <li><Link to={mainPermalinks[lang].about} aria-label={ariaLabelI18n[lang].presentation}>{medialab}</Link></li>
          </ul>
          <ul id="nav-archive">
            {/*<li><Link to={`${relLang}/outils`}>{tool}</Link></li>*/}
            <li>
              <a
                href="http://tools.medialab.sciences-po.fr"
                target="_blank" rel="noopener"
                aria-label={ariaLabelI18n[lang].tools}>{tool}</a>
            </li>
            <li><Link to={mainPermalinks[lang].seminar} aria-label={ariaLabelI18n[lang].seminar}>{seminar}</Link></li>
            {/* <li><Link to={`${relLang}/archive`}>{archive}</Link></li> */}
          </ul>
        </nav>

        <div id="langue" className="menu langue" aria-label={ariaLabelI18n[lang].lang}>
          <p>
            <BasicLink
              activeClassName="active"
              to={permalinks.fr}
              aria-label={ariaLabelI18n[lang].fr}>
              FR
            </BasicLink>
            <span> | </span>
            <BasicLink
              activeClassName="active"
              to={permalinks.en}
              aria-label={ariaLabelI18n[lang].en}>
              EN
            </BasicLink>
          </p>
        </div>
      </div>
      <div className="print"><p itemProp="url">medialab.sciencespo.fr</p></div>
    </header>
  );
};

export default TopBar;
