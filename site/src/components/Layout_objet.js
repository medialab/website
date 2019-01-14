import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {StaticQuery, graphql} from 'gatsby';

import './scss/page_objet.scss';
import _topbar from './fragments/_topbar.js';

const Layout_objet = ({children, lang}) => {

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
          <_topbar></_topbar>
          {children}
        </>
      )} />
  );
};

Layout_objet.defaultProps = {
  lang: 'fr'
};

Layout_objet.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout_objet;
