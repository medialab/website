import React from 'react';
import {Link} from 'gatsby';

import Agenda from './flux/Agenda.js';
import Git from './flux/Git.js';
import Tweet from './flux/Tweet.js';

export default function flux({rdv, lang, tweets}) {
	return (
		<>
		
		<section id="flux">
			<div className="container">
		   

		      <ul className="flux_selection_container">
			        <li><a href="#agenda">Rendez-vous</a></li>
							<li><a href="#git">Projets Git</a></li>
							<li><a href="#tweet">Tweet</a></li>
			    </ul>

				<Agenda rdv={rdv} lang={lang} />
				<Git lang={lang} />
				<Tweet lang={lang} tweets={tweets} />
			</div>
		</section>
		
		</>
  	);
}


//export default Flux;

