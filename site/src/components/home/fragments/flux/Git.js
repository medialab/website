import React from 'react';
import {Link} from 'gatsby';

export default function git() {
	return (
		<>
	    <section id="git"> 

	      <div id="git-container">

	        <div id="git-contenu">

					<article className="git" data-type="git">			
						<aside className="divers">
                    		<p className="label" data-icon="git"> </p>

						</aside>

						<h1 data-level-1="title"> 
							Projet
							{/*lang === 'fr' ? event.title.fr : event.title.en */}
						</h1>

						<aside className="details">
							<p className="description">Outils composé de 0 ou de 1, de $ ou de , enfin plein de machin pas si complexe.</p>
							<p className="date last-update"><span>Last update: </span>23/10/2018</p>

							<p className="language">Python</p>
							<p className="contrib">3 contributeurs</p>
						</aside>
					</article>

				</div>

			</div>

		</section>
		
		</>
  	);
}
 
