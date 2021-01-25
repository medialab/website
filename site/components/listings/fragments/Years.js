import React from 'react';
import {Icons} from '../../helpers/Icons.js';

const MAX_YEARS_TO_DISPLAY = 12;

const i18n = {
  fr: {
    label: "Aller à l'année…",
    before: 'Aller aux années précédentes'
  },
  en: {
    label: 'Go to year…',
    before: 'Go to earlier years'
  }
};

export default function Years({lang, years}) {
  years = years.slice().sort().reverse();

  let suppYears = false;

  if (years.length > MAX_YEARS_TO_DISPLAY) {
    suppYears = years[MAX_YEARS_TO_DISPLAY - 1];
    years = years.slice(0, MAX_YEARS_TO_DISPLAY - 1);
  }

  return (
    <div className="go-to-year" aria-label={i18n[lang].label + '…'}>
      <input
        type="checkbox"
        id="checkbox_filtre_year"
        name="radio_filtre-actu"
        value="year"
        hidden
      />
      <label htmlFor="checkbox_filtre_year">
        <span>
          <Icons icon="arrow" />
        </span>
      </label>
      <p aria-hidden="true">
        {i18n[lang].label} <span className="current-year" />
      </p>
      <ul id="list-years">
        {years.map(y => (
          <li key={`year-${y}`}>
            <a href={`#year-${y}`} aria-label={i18n[lang].label + ' ' + y}>
              {y}
            </a>
          </li>
        ))}
        {suppYears && (
          <li key={`filter-years-before-${suppYears}`}>
            <a href={`#year-${suppYears}`} aria-label={i18n[lang].before}>
              &le; {suppYears}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
