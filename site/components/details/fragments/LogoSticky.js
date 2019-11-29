import React from 'react';
import Link from '../../helpers/Link';
import Logo from '../../svg/Logo';

const mainPermalink = {
  fr: '/',
  en: '/en'
};

export default function LogoSticky({lang}) {
  return (
    <div id="logo-sticky">
      <Link to={mainPermalink[lang]}>
        <Logo />
      </Link>
    </div>
  );
}
