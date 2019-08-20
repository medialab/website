import React from 'react';

import Agenda from './flux/Agenda.js';
import Git from './flux/Git.js';
import Tweet from './flux/Tweet.js';

const i18n = {
  fr: {
    status: 'Le médialab heure par heure',
    agenda: 'Atteindre l\'agenda',
    rdv: 'Rendez-vous',
    git: 'Atteindre les derniers projets Git',
    gitProject: 'Projets Git',
    tweets: 'Atteindre les derniers tweets'
  },
  en: {
    status: 'médialab\'s hourly status',
    agenda: 'Reach the agenda',
    rdv: 'Meeting',
    git: 'Reach lastest git projects',
    gitProject: 'Git projects',
    tweets: 'Reach lastest tweet'
  }
};

export default function flux({rdv, lang, tweets, github}) {
	return (
    <section id="flux" aria-label={i18n[lang].status}>
      <div className="container">

        <ul className="flux_selection_container" role="navigation">
          <li><a href="#agenda" aria-label={i18n[lang].agenda}>{i18n[lang].rdv}</a></li>
          <li><a href="#tweet" aria-label={i18n[lang].tweets}>Tweets</a></li>
          <li><a href="#git" aria-label={i18n[lang].git}>{i18n[lang].gitProject}</a></li>
        </ul>

        <Agenda rdv={rdv} lang={lang} />
        <Tweet lang={lang} tweets={tweets} />
        <Git lang={lang} github={github} />
      </div>
    </section>
  );
}
