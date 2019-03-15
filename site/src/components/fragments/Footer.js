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
        <li><a href="mailto:contact@medialab.sciencespo.fr">Mail</a></li>
        <li><a href="https://twitter.com/medialab_scpo">Tweet</a></li>
        <li><a href="https://github.com/medialab">Git</a></li>
      </ul>
    </div>
  </footer>
  	);
};

export default Footer;
