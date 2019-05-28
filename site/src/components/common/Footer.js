import React from 'react';
import {Link} from 'gatsby';

const Footer = ({lang}) => {

  const relLang = lang === 'en' ? '/en' : '';

	return (
  <footer>
    <div id="container-footer">
      <div className="logo" />
      <div className="mentions">
        <p>Medialab Science Po<br />
          27 rue St Guillaume, Paris VII<br />
          <Link to={`${relLang}/legal`}>Mentions legales</Link></p>
      </div>
        <ul className="contact">
          <li><a href="mailto:contact@medialab.sciencespo.fr" title={ lang === 'fr' ? "Ecrire au Medialab" : "Write to Medialab"} target="_blank" rel="noopener" >Mail</a></li>
          <li><a href="https://twitter.com/medialab_scpo" title={ lang === 'fr' ? "Lien vers le compte Twitter du Medialab" : "Link to Medialab's Twitter"} target="_blank" rel="noopener" >Tweet</a></li>
          <li><a href="https://github.com/medialab" title={ lang === 'fr' ? "Lien vers le Github du Medialab" : "Link to Medialab's Github"} target="_blank" rel="noopener" >Git</a></li>
        </ul>
    </div>
  </footer>
  	);
};

export default Footer;
