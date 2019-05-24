import React from 'react';
import {Link} from 'gatsby';

export default function git(lang) {
	return (
		<>
	    <section id="git"> 

				<h1>Le médialab sur <span data-icon="git"><a href="https://github.com/medialab" target="_blank" rel="noopener"  title={ lang === 'fr' ? "Lien vers le répertoire Git du Médialab" : "Link to Medialab's Git repository" }>Github</a></span></h1>

					<article className="git" data-type="git">
							<aside className="divers">
	                    		<p className="label" data-icon="git">Git</p>
								{/* PLACEHOLDER DATENEWS */}<p className="date-news">mercredi 6 mars 2019</p>					

							</aside>

							<h1 data-level-1="title">
								<a href="" target="_blank" rel="noopener" title={ lang === 'fr' ? "Lien vers le répertoire du projet" : "Link to project repository" }>			
 									Projet
								</a>
							</h1>

							<p data-level-2="description" className="description"> 
								Outils composé de 0 ou de 1, de $ ou de , enfin plein de machin pas si complexe.
								{/*lang === 'fr' ? git.description.fr : git.description.en */}
							</p>

							<aside className="details">
								<p className="language">Python</p>
								<p className="contributors">3 contributeurs</p>
							</aside>
					</article>



		</section>
		
		</>
  	);
}
 
