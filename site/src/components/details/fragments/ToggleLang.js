import React from 'react';
import {Link} from 'gatsby';

export default function ToggleLang({lang, content, to}) {
  const otherLang = lang === 'fr' ? 'en' : 'fr';

  if (!content[otherLang] || !content[otherLang].length || !content[lang] || !content[lang].length) {
    return null;
  }

  // const enoughContentLength = 1500;

  // const isEnEnough = content.en && content.en.length >= enoughContentLength;
  // const isFrEnough = content.fr && content.fr.length >= enoughContentLength;
  // const showSwitchToEn = (isEnEnough && !isFrEnough) || (!isEnEnough && !isFrEnough && content.en.length > content.fr.length);
  // const showSwitchToFr = (isFrEnough && !isEnEnough) || (!isEnEnough && !isFrEnough && content.fr.length > content.en.length);
  // const message = (!isEnEnough && !isFrEnough) ?
  // {
  //   fr: '⚐ Cet article pourrait être plus complet en anglais. ',
  //   en: '⚐ This article could be more substantial in french. '
  // }
  // :
  // {
  //   fr: '⚐ Cet article est plus complet en anglais. ',
  //   en: '⚐ This article is more substantial in french. '
  // };
  let fr, en;

  fr = '⚐ Cette page existe aussi en anglais. ';
  en = '⚐ This page exists also in french. ';
  
  return (
    <label
      className="toggle-lang"
      aria-label={lang === 'fr' ? fr : en}>
        <Link to={to[otherLang]}>{lang === 'fr' ? fr : en}</Link>
    </label>);

  // old version when we tried to be clever...
  // broken by a regression and bad heuristics which didn't work in all cases...

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



  // return (
  //   <>
  //     <input
  //       type="radio" id="fr-to-en" name="toggle-lang"
  //       value="fr-to-en" className="fr" defaultChecked={lang === 'en'}
  //       hidden />
  //     { showSwitchToEn &&
  //       <label
  //         htmlFor="fr-to-en" className="fr toggle-lang" href="#main-objet"
  //         aria-label={message.fr}>
  //         {message.fr}
  //         <span aria-hidden="true">Cliquer ici pour le voir.</span>
  //       </label>
  //     }

  //     <input
  //       type="radio" id="en-to-fr" name="toggle-lang"
  //       value="en-to-fr" className="en" defaultChecked={lang === 'fr'}
  //       hidden />
  //     {showSwitchToFr &&
  //     <label htmlFor="en-to-fr" className="en toggle-lang" aria-label={message.en}>
  //       {message.en}
  //       <span aria-hidden="true">Click here to see it.</span>
  //     </label>
  //     }
  //   </>
  // );
}
