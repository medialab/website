/* global STATIC_URL */
import React from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

import Banner from './Banner';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>médialab CMS</title>
      </Helmet>
      <div className="content">
        <h2 className="title is-4">Bienvenu·e sur le CMS du site du médialab!</h2>
        <p>
          <a href={STATIC_URL + '/'} target="_blank" rel="noopener noreferrer">
            Lien vers la preview du site (avec les changements du CMS en live)
          </a>
        </p>
        <p>
          <a href="https://medialab.sciencespo.fr" target="_blank" rel="noopener noreferrer">
            Lien vers le site web en production
          </a>
        </p>
        <p>
          <Link to="/playground">
            Liens vers le testeur de génération d'image
          </Link>
        </p>
      </div>
      <Banner />
    </div>
  );
}
