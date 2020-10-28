import React, {useContext} from 'react';
import Helmet from 'react-helmet';
import SiteContext from '../context';
import TopBar from './common/TopBar';
import Footer from './common/Footer';

export default function Layout({children, lang, className, permalinks}) {
  const meta = useContext(SiteContext);

  const fbCover = meta.siteUrl + meta.pathPrefix + '/img/cover-fb.png';

  return (
    <>
      <Helmet title={meta.title}>
        <html lang={lang} />
      </Helmet>
      <div
        itemScope
        itemType="https://schema.org/Organization"
        className={className}>
        <link itemProp="url" href={meta.siteUrl} />
        {/** The following invisible div indicates to search engines which logo to use to display the website card **/}
        <div itemProp="logo" style={{display: 'none'}}>
          {fbCover}
        </div>
        <TopBar lang={lang} permalinks={permalinks} />
        {children}
        <Footer lang={lang} />
      </div>
    </>
  );
}
