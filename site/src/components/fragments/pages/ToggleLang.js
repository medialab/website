import React from 'react';

const Footer = () => {
    return (
            <>
            <input type="radio" id="en-to-fr" name="toggle-lang" value="en-to-fr" className="en" hidden />
            <label for="en-to-fr" className="en toggle-lang">
            This article is also in french.
            <span>Click here to see it.</span>
            </label>

            <input type="radio" id="fr-to-en" name="toggle-lang" value="fr-to-en" className="fr" checked hidden />
            <label for="fr-to-en" className="fr toggle-lang" href="#main-objet">
            Cette est plus complet en anglais.
            <span>Cliquer ici pour le voir.</span>
            </label>
            </>
    );
}

export default Footer;
