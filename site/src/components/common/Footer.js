import React from 'react';
import {Link} from 'gatsby';

const Footer = ({lang}) => {

  const relLang = lang === 'en' ? '/en' : '';

	return (
  <footer role="contentinfo" aria-label={lang === "fr" ? "Pied de Page" : "Footer" }
>
    <div id="container-footer" >
      <div className="logo" />
      <div className="mentions" >
        <p aria-label={ lang === 'fr' ? "Adresse du Medialab" : "Medialab adress"}>
          Medialab Science Po<br />
          27 rue St Guillaume, Paris VII
        </p>
        <p><Link to={`${relLang}/legal`} aria-label={ lang ==='fr' ? "Liens vers les mentions légales" : "Link to legal notice"}>Mentions legales</Link></p>
      </div>
        <ul className="contact">
          <li><a href="mailto:contact@medialab.sciencespo.fr" aria-label={ lang === 'fr' ? "Ecrire au Medialab" : "Write to Medialab"} target="_blank" rel="noopener" >Mail</a></li>
          <li><a href="https://twitter.com/medialab_scpo" aria-label={ lang === 'fr' ? "Lien vers le compte Twitter du Medialab" : "Link to Medialab's Twitter"} target="_blank" rel="noopener" >Twitter</a></li>
          <li><a href="https://github.com/medialab" aria-label={ lang === 'fr' ? "Lien vers le Github du Medialab" : "Link to Medialab's Github"} target="_blank" rel="noopener" >Github</a></li>
        </ul>
    </div>
  </footer>
  	);
};

export default Footer;
