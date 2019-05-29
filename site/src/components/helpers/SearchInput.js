import React from 'react';
import {format as formatDate} from 'date-fns';

function SearchInput(lang) {

    let placeholder, arial; 

    if (lang === 'fr') {
        placeholder = "Rechercher",
        arial = "Rechercher dans la page";
    }else{
        placeholder = "Search",
        arial = "Search through page content";
    }


    return ( 
        <div id="search">
             <input type="search" name="q" arial-label={arial} placeholder={placeholder} />
         </div>
    );

}

export default SearchInput;





