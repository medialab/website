import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {StaticQuery, graphql} from 'gatsby';
import TopBar from './common/TopBar.js';
import Footer from './common/Footer.js';

import './assets/font/Bel2/stylesheet.css';
import './assets/font/Symbol/stylesheet.css';
import './assets/scss/global.scss';

import androidIcon36 from './assets/images/icons/android-icon-36x36.png';
import androidIcon48 from './assets/images/icons/android-icon-48x48.png';
import androidIcon72 from './assets/images/icons/android-icon-72x72.png';
import androidIcon192 from './assets/images/icons/android-icon-192x192.png';

import appleIcon57 from './assets/images/icons/apple-icon-57x57.png';
import appleIcon60 from './assets/images/icons/apple-icon-60x60.png';
import appleIcon72 from './assets/images/icons/apple-icon-72x72.png';
import appleIcon76 from './assets/images/icons/apple-icon-76x76.png';
import appleIcon114 from './assets/images/icons/apple-icon-114x114.png';
import appleIcon120 from './assets/images/icons/apple-icon-120x120.png';
import appleIcon144 from './assets/images/icons/apple-icon-144x144.png';
import appleIcon152 from './assets/images/icons/apple-icon-152x152.png';
import appleIcon180 from './assets/images/icons/apple-icon-180x180.png';

import msIcon144 from './assets/images/icons/ms-icon-144x144.png';

import Favicon16 from './assets/images/icons/favicon-16x16.png';
import Favicon32 from './assets/images/icons/favicon-32x32.png';
import Favicon96 from './assets/images/icons/favicon-96x96.png';

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
            <link rel="apple-touch-icon" sizes="57x57" href={appleIcon57} />
            <link rel="apple-touch-icon" sizes="60x60" href={appleIcon60} />
            <link rel="apple-touch-icon" sizes="72x72" href={appleIcon72} />
            <link rel="apple-touch-icon" sizes="76x76" href={appleIcon76} />
            <link rel="apple-touch-icon" sizes="114x114" href={appleIcon114} />
            <link rel="apple-touch-icon" sizes="120x120" href={appleIcon120} />
            <link rel="apple-touch-icon" sizes="144x144" href={appleIcon144} />
            <link rel="apple-touch-icon" sizes="152x152" href={appleIcon152} />
            <link rel="apple-touch-icon" sizes="180x180" href={appleIcon180} />
            <link rel="icon" type="image/png" sizes="36x36"  href={androidIcon36} />
            <link rel="icon" type="image/png" sizes="48x48"  href={androidIcon48} />
            <link rel="icon" type="image/png" sizes="72x72"  href={androidIcon72} />
            <link rel="icon" type="image/png" sizes="192x192"  href={androidIcon192} />
            <link rel="icon" type="image/png" sizes="32x32" href={Favicon32} />
            <link rel="icon" type="image/png" sizes="96x96" href={Favicon96} />
            <link rel="icon" type="image/png" sizes="16x16" href={Favicon16} />
            {/* <link rel="manifest" href="/manifest.json"> */}
            <meta name="msapplication-TileColor" content="#ffffff"/>
            <meta name="msapplication-TileImage" content={msIcon144}/>
            <meta name="theme-color" content="#ffffff"/>
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
