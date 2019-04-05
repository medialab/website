import React from 'react';
import {Link} from 'gatsby';

import Nav from './fragments/Nav.js';

import RawHtml from './RawHtml';
//import './scss/apropos.scss';

export default function Archive({lang, activities, news, productions}) {
  console.log(lang);
  console.log('ACTIVITIES', activities);
  console.log('NEWS', news);
  console.log('PRODUCTIONS', productions);

  return (
    <>
      <p>archive</p>
    </>
  );
}

