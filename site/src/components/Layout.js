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
              siteUrl
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
          <div itemScope itemType="https://schema.org/Organization" className={className}>
            <link itemProp="url" href={data.site.siteMetadata.siteUrl}/>
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
