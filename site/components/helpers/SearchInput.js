import React from 'react';
import {Icons} from '../helpers/Icons.js';

const i18n = {
  fr: {
    placeholder: 'Rechercher',
    ariaLabel: 'Rechercher dans la page'
  },
  en: {
    placeholder: 'Search',
    ariaLabel: 'Search through page content'
  }
};

export function SearchInput({lang}) {
  return (
    <div id="search">
      <input
        type="search"
        id="search-input"
        name="q"
        arial-label={i18n[lang].ariaLabel}
        placeholder={i18n[lang].placeholder}
      />
      <label htmlFor="search-input">
        <Icons icon="search" />
      </label>
    </div>
  );
}
