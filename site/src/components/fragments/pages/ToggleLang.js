import React from 'react';

export default function Footer ({lang, content}) {

  let fr, en;

  fr = "Cette article existe aussi en anglais. ";
  en = "This article is also in english. ";

  if (content.fr.length < content.en.length){
    fr = "Cette article pourrait être plus complet en anglais. ";
      if (content.fr.length < 50){
        fr = "Cette article est plus complet en anglais. ";
      }
  }

  if (content.en.length < content.fr.length){
    en = "This article could be more substantial in french. ";
      if (content.en.length < 50){
        en = "This article is more substantial in english. ";
      }
  }

  return (
    <>
    <input type="radio" id="fr-to-en" name="toggle-lang" value="fr-to-en" className="fr" defaultChecked={lang === 'fr'} hidden />
    <label htmlFor="fr-to-en" className="fr toggle-lang" href="#main-objet">
      {fr}
      <span>Cliquer ici pour le voir.</span>
    </label>

    <input type="radio" id="en-to-fr" name="toggle-lang" value="en-to-fr" className="en" defaultChecked={lang === 'en'} hidden />
    <label htmlFor="en-to-fr" className="en toggle-lang">
      {en}
      <span>Click here to see it.</span>
    </label>
    </>
  );
}
