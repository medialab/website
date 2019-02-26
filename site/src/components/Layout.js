import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {StaticQuery, graphql} from 'gatsby';
import TopBar from './fragments/TopBar.js';
import Footer from './fragments/Footer.js';
import './scss/global.scss';

const Layout = ({children, lang, className, permalink}) => {

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
            <body className={className} />
          </Helmet>
          <TopBar lang={lang} permalink={permalink} />
          {children}
          <Footer />
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
