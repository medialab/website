/* global STATIC_URL */
import React from 'react';
import {Link} from 'react-router-dom';
import Deployment from './Deployment';
import Aspire from './Aspire';

export default function Home() {
  return (
    <div>
      <p>
        <a href={STATIC_URL} target="_blank" rel="noopener noreferrer">
          Link towards the static site's preview.
        </a>
      </p>
      <hr />
      <p>
        <Link to="/playground">Image processing playground</Link>
      </p>
      <hr />
      <div>
        <Deployment />
      </div>
      <br />
      <div>
        <Aspire />
      </div>
    </div>
  );
}
