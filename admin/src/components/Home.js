import React from 'react';

export default function Home() {
  return (
    <div>
      CMS Admin
      <p>
        <a href={STATIC_URL} target="_blank">
          Link towards the static site's preview.
        </a>
      </p>
    </div>
  );
}
