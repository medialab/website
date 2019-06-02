import React from 'react';
import {Link} from 'gatsby';

import Agenda from './flux/Agenda.js';
import Git from './flux/Git.js';
import Tweet from './flux/Tweet.js';

export default function flux({rdv, lang, tweets, github}) {
	return (
		<>
		
		<section id="flux">
			<div className="container">
		   

		      <ul className="flux_selection_container">
			        <li><a href="#agenda">{ lang === "fr" ? "Rendez-vous" : "Meeting"}</a></li>
					<li><a href="#git">{ lang === "fr" ? "Projets Git" : "Git projects"}</a></li>
					<li><a href="#tweet">Tweets</a></li>
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

