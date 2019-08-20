import React from 'react';
import {Link} from 'gatsby';

const i18n = {
  fr: {
    ariaLabel: 'Pied de Page',
    address: 'Adresse du médialab',
    legal: 'Liens vers les mentions légales',
    mail: 'Ecrire au médialab',
    twitter: 'Lien vers le compte Twitter du médialab',
    github: 'Lien vers le Github du médialab'
  },
  en: {
    ariaLabel: 'Footer',
    address: 'médialab\'s adress',
    legal: 'Link to legal notice',
    mail: 'Write to médialab',
    twitter: 'Link to médialab\'s Twitter',
    github: 'Link to médialab\'s Github'
  }
};

const Footer = ({lang}) => {

  const relLang = lang === 'en' ? '/en' : '';

	return (
    <footer
      role="contentinfo" aria-label={i18n[lang].ariaLabel}>
      <div id="container-footer" >
        <div className="logo" />
        <div className="mentions" >
          <p aria-label={i18n[lang].address}>
            médialab Science Po<br />
            27 rue St Guillaume, Paris VII
          </p>
          <p><Link to={`${relLang}/legal`} aria-label={i18n[lang].legal}>Mentions legales</Link></p>
        </div>
        <ul className="contact">
          <li><a
            itemProp="email" href="mailto:contact@medialab.sciencespo.fr" aria-label={i18n[lang].mail}
            target="_blank" rel="noopener" >Mail</a></li>
          <li><a
            itemProp="sameAs" href="https://twitter.com/medialab_scpo" aria-label={i18n[lang].twitter}
            target="_blank" rel="noopener" >Twitter</a></li>
          <li><a
            itemProp="sameAs" href="https://github.com/medialab" aria-label={i18n[lang].github}
            target="_blank" rel="noopener" >Github</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
