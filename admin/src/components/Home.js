/* global STATIC_URL */
import React from 'react';
import Deployment from './Deployment';

export default function Home() {
  return (
    <div>
      <p>
        <a href={STATIC_URL} target="_blank" rel="noopener noreferrer">
          Link towards the static site's preview.
        </a>
      </p>
      <hr />
      <div>
        <Deployment />
      </div>
    </div>
  );
}
