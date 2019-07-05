import React from 'react';

export default function Footer ({lang, content}) {

  const enoughContentLength = 1500;

  const isEnEnough = content.en && content.en.length >= enoughContentLength;
  const isFrEnough = content.fr && content.fr.length >= enoughContentLength;
  const showSwitchToEn = isEnEnough && !isFrEnough;
  const showSwitchToFr = isFrEnough && !isEnEnough;
  const message = {
    fr: '⚐ Cet article est plus complet en anglais. ',
    en: '⚐ This article could be more substantial in french. '
  };
  // let fr, en;

  // fr = '⚐ Cette article existe aussi en anglais. ';
  // en = '⚐ This article is also in french. ';

  // if (content.fr.length < content.en.length) {
  //   fr = '⚐ Cet article pourrait être plus complet en anglais. ';
  //     if (content.fr.length < 50) {
  //       fr = '⚐ Cet article est plus complet en anglais. ';
  //     }
  // }

  // if (content.en.length < content.fr.length) {
  //   en = '⚐ This article could be more substantial in french. ';
  //     if (content.en.length < 50) {
  //       en = '⚐ This article could be more substantial in french. ';
  //     }
  // }

  return (
    <>
      <input
        type="radio" id="fr-to-en" name="toggle-lang"
        value="fr-to-en" className="fr" defaultChecked={lang === 'en'}
        hidden />
      { showSwitchToEn && 
        <label htmlFor="fr-to-en" className="fr toggle-lang" href="#main-objet" aria-label={message.fr}>
          {message.fr}
          <span aria-hidden="true">Cliquer ici pour le voir.</span>
        </label>
      }

      <input
        type="radio" id="en-to-fr" name="toggle-lang"
        value="en-to-fr" className="en" defaultChecked={lang === 'fr'}
        hidden />
      {showSwitchToFr &&
      <label htmlFor="en-to-fr" className="en toggle-lang" aria-label={message.en}>
        {message.en}
        <span aria-hidden="true">Click here to see it.</span>
      </label>
      }
      
    </>
  );
}
