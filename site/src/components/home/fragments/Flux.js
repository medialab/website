import React from 'react';
import {Link} from 'gatsby';

import Agenda from './flux/Agenda.js';
import Git from './flux/Git.js';
import Tweet from './flux/Tweet.js';

export default function flux({rdv, lang, tweets, github}) {
	return (
  <>

    <section id="flux" aria-label={lang === 'fr' ? 'Le médialab heure par heure' : 'médialab : hourly status'}>
      <div className="container">

        <ul className="flux_selection_container" role="navigation">
          <li><a href="#agenda" aria-label={lang === 'fr' ? "Atteindre l'agenda" : 'Reach the diary'}>{ lang === 'fr' ? 'Rendez-vous' : 'Meeting'}</a></li>
          <li><a href="#git" aria-label={lang === 'fr' ? 'Atteindre les dernier projet Git' : 'Reach lastest git project'}>{ lang === 'fr' ? 'Projets Git' : 'Git projects'}</a></li>
          <li><a href="#tweet" aria-label={lang === 'fr' ? 'Atteindre les derniers tweets' : 'Reach lastest tweet'}>Tweets</a></li>
        </ul>

        <Agenda rdv={rdv} lang={lang} />
        <Git lang={lang} github={github} />
        <Tweet lang={lang} tweets={tweets} />
      </div>
    </section>

  </>
  	);
}


//export default Flux;

