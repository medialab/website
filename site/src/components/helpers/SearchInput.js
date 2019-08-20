import React from 'react';
import {Icons} from '../helpers/Icons.js';

// function SearchInput(lang) {

//     let placeholder, arial;

//     if (lang === 'fr') {
//         placeholder = "Rechercher",
//         arial = "Rechercher dans la page";
//     }else{
//         placeholder = "Search",
//         arial = "Search through page content";
//     }


//     return (
//         <div id="search">
//              <input type="search" name="q" arial-label={arial} placeholder={placeholder} />
//          </div>
//     );

// }

// export default SearchInput;


export function SearchInput(value) {

    let placeholder, arial;

    if (value.lang === 'fr') {
        placeholder = 'Rechercher',
        arial = 'Rechercher dans la page';
    }
else {
        placeholder = 'Search',
        arial = 'Search through page content';
    }


    return (
      <div id="search">
        <input
          type="search" id="search-input" name="q"
          arial-label={arial} placeholder={placeholder} />
        <label htmlFor="search-input"><Icons icon="search" /></label>

      </div>
    );
}

