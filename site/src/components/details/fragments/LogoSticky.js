import React from 'react';
import {Link} from 'gatsby';
// import Logo from '../../../assets/svg/logo_medialab.svg';

const mainPermalink = {
  fr: '/',
  en: '/en'
};

export default function LogoSticky({lang}) {
  return (
    <div id="logo-sticky">
      <Link to={mainPermalink[lang]}>
        {/* <Logo /> */}
      </Link>
    </div>
  );
}
