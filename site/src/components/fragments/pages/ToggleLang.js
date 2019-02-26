import React from 'react';

export default function Footer ({lang}) {
  return (
    <>
    <input type="radio" id="fr-to-en" name="toggle-lang" value="fr-to-en" className="fr" defaultChecked={lang === 'fr'} hidden />
    <label for="fr-to-en" className="fr toggle-lang" href="#main-objet">
      Cette article est plus complet en français.
      <span>Cliquer ici pour le voir.</span>
    </label>

    <input type="radio" id="en-to-fr" name="toggle-lang" value="en-to-fr" className="en" defaultChecked={lang === 'en'} hidden />
    <label for="en-to-fr" className="en toggle-lang">
      This article is also in english.
      <span>Click here to see it.</span>
    </label>
    </>
  );
}
