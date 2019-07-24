import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {StaticQuery, graphql} from 'gatsby';
import TopBar from './common/TopBar.js';
import Footer from './common/Footer.js';

import './assets/font/Bel2/stylesheet.css';
import './assets/font/Symbol/stylesheet.css';
import './assets/scss/global.scss';

const Layout = ({children, lang, className, permalinks}) => {

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}>
            <html lang={lang} />
          </Helmet>
          <div className={className}>
            <TopBar lang={lang} permalinks={permalinks} />
            {children}
            <Footer lang={lang} />
          </div>
        </>
      )} />
  );
};

Layout.defaultProps = {
  lang: 'fr'
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
