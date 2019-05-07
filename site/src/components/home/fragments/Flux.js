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
		        <label className="flux_selection-label" htmlFor="flux_selection-agenda">
		        	{lang === 'fr' ? 'Les rendez-vous ' : 'The agenda'}
		        </label>

		        <input
		          type="radio" name="flux_selection" id="flux_selection-git"
		          className="flux_selection" hidden />
		        <label className="flux_selection-label" htmlFor="flux_selection-git">
		        	{lang === 'fr' ? 'Projets Git ' : 'Git project'}
		        </label>

		        <input
		          type="radio" name="flux_selection" id="flux_selection-tweet"
		          className="flux_selection" hidden />
		        <label className="flux_selection-label" htmlFor="flux_selection-tweet">
		        	{lang === 'fr' ? 'Dernier tweets ' : 'Last tweets'}
		        </label>

				<Agenda rdv={rdv} lang={lang} />
				<Git lang={lang} />
				<Tweet lang={lang} />
			</div>
		</section>
		
		</>
  	);
}

//export default Flux;

