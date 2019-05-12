import React from 'react';
import {Link} from 'gatsby';

import Agenda from './flux/Agenda.js';
import Git from './flux/Git.js';
import Tweet from './flux/Tweet.js';

export default function flux({rdv, lang}) {
	return (
		<>
		
		<section id="flux">
			<div className="container">
		        <input
		          type="radio" name="flux_selection" id="flux_selection-agenda"
		          className="flux_selection" hidden defaultChecked />
		        <input
		          type="radio" name="flux_selection" id="flux_selection-git"
		          className="flux_selection" hidden />
		        <input
		          type="radio" name="flux_selection" id="flux_selection-tweet"
		          className="flux_selection" hidden />

		        <div className="flux_selection_container">
			        <label className="flux_selection-label for_agenda" htmlFor="flux_selection-agenda">
			        	{lang === 'fr' ? 'Les rendez-vous ' : 'The agenda'}
			        </label>
			        <label className="flux_selection-label for_git" htmlFor="flux_selection-git">
			        	{lang === 'fr' ? 'Projets Git ' : 'Git project'}
			        </label>		          
			        <label className="flux_selection-label for_tweet" htmlFor="flux_selection-tweet">
			        	{lang === 'fr' ? 'Dernier tweets ' : 'Last tweets'}
			        </label>
			    </div>

				<Agenda rdv={rdv} lang={lang} />
				<Git lang={lang} />
				<Tweet lang={lang} />
			</div>
		</section>
		
		</>
  	);
}

//export default Flux;

