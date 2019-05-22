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
          <li><a href="mailto:contact@medialab.sciencespo.fr">Mail</a></li>
          <li><a href="https://twitter.com/medialab_scpo">Tweet</a></li>
          <li><a href="https://github.com/medialab">Git</a></li>
        </ul>
    </div>
  </footer>
  	);
};

export default Footer;
