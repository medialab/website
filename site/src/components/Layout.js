import React, {useContext} from 'react';
import SiteContext from '../context';
import TopBar from './common/TopBar';
import Footer from './common/Footer';

// import coverFb from '../assets/images/cover-fb.png';

// import '../assets/font/Bel2/stylesheet.css';
// import '../assets/font/Symbol/stylesheet.css';
// import '../assets/scss/global.scss';

/* <Helmet
title={data.site.siteMetadata.title}>
<html lang={lang} />
</Helmet> */

export default function Layout({children, lang, className, permalinks}) {
  const meta = useContext(SiteContext);

  return (
    <div itemScope itemType="https://schema.org/Organization" className={className}>
      <link itemProp="url" href={meta.siteUrl} />
      {/** The following invisible div indicates to search engines which logo to use to display the website card **/}
      {/* <div itemProp="logo" style={{display: 'none'}}>{meta.siteUrl + coverFb}</div> */}
      <TopBar lang={lang} permalinks={permalinks} />
      {children}
      <Footer lang={lang} />
    </div>
  );
}
