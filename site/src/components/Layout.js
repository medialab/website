import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {StaticQuery, graphql} from 'gatsby';

import './Layout.scss';

const Layout = ({children, lang}) => {

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
          <div
            style={{
              margin: '0 auto',
              maxWidth: 960,
              padding: '0px 1.0875rem 1.45rem',
              paddingTop: 0
            }}>
            {children}
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
