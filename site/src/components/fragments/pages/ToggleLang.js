import React from 'react';

const Footer = (lang) => {
let tglFR = null;
let tglEN = null;

if (lang === 'fr') {
    tglFR = (<input type="radio" id="fr-to-en" name="toggle-lang" value="fr-to-en" className="fr" defaultChecked hidden />);
    tglEN = (<input type="radio" id="en-to-fr" name="toggle-lang" value="en-to-fr" className="en" hidden />);
}
else {
    tglFR = (<input type="radio" id="fr-to-en" name="toggle-lang" value="fr-to-en" className="fr" hidden />);
    tglEN = (<input type="radio" id="en-to-fr" name="toggle-lang" value="en-to-fr" className="en" defaultChecked hidden />);
}
    return (
            <>
            { tglFR }
            <label for="fr-to-en" className="fr toggle-lang" href="#main-objet">
            Cette article est plus complet en anglais.
            <span>Cliquer ici pour le voir.</span>
            </label>

            { tglEN }
            <label for="en-to-fr" className="en toggle-lang">
            This article is also in french.
            <span>Click here to see it.</span>
            </label>
            </>
    );
}

export default Footer;
