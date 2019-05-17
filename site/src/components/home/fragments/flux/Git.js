import React from 'react';
import {Link} from 'gatsby';

export default function git() {
	return (
		<>
	    <section id="git"> 

				<h1>Le médialab sur <span data-icon="git"><a href="https://github.com/medialab">Github</a></span></h1>

					<article className="git" data-type="git">			
						<aside className="divers">
                    		<p className="label" data-icon="git">Git</p>
							{/* PLACEHOLDER DATENEWS */}<p className="date-news">mercredi 6 mars 2019</p>					

						</aside>

						<h1 data-level-1="title"> 
							Projet
							{/*lang === 'fr' ? git.title.fr : git.title.en */}
						</h1>

						<h2 data-level-2="description"> 
							Outils composé de 0 ou de 1, de $ ou de , enfin plein de machin pas si complexe.
							{/*lang === 'fr' ? git.description.fr : git.description.en */}
						</h2>

						<aside className="details">
							<p className="language">Python</p>
							<p className="contributors">3 contributeurs</p>
						</aside>
					</article>



		</section>
		
		</>
  	);
}
 
