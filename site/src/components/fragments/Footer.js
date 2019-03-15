import React from 'react';
import {Link} from 'gatsby';

const Footer = () => {
	return (
  <footer>
    <div className="logo" />
    <div className="mentions">
      <p>Medialab Science Po<br />
				27 rue St Guillaume, Paris VII<br />
        <Link to="/">Mentions legales</Link></p>
    </div>
    <div className="contact">
      <ul>
        <li><Link to="mailto:contact@medialab.sciencespo.fr">Mail</Link></li>
        <li><Link to="https://twitter.com/medialab_scpo">Tweet</Link></li>
        <li><Link to="https://github.com/medialab">Git</Link></li>
      </ul>
    </div>
  </footer>
  	);
};

export default Footer;
