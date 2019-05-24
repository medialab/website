import React from 'react';
import {Link} from 'gatsby';

export default function tweet(lang) {
	return (
		<>
	    <section id="tweet">

		<h1>Le médialab sur <span data-icon="tweet"><a target="_blank" rel="noopener" href="https://twitter.com/medialab_scpo" title={ lang === 'fr' ? "Lien vers le compte Twitter du Médialab" : "Link to Medialab's Twitter account" }>Twitter</a></span></h1>

					<article className="tweet" data-type="tweet">			
						<aside className="divers">
					    	<p className="label" data-icon="tweet">Tweet</p>
							{/* PLACEHOLDER DATENEWS */}<p className="date-news">mercredi 6 mars 2019</p>					
						</aside>
						<p className="tweet-content">
							Faire vivre la #démocratie exige que nous ayons <span className="hashtag">#confiance</span> envers les <span className="hashtag">#medias</span>. Comment y parvenir dans un univers où <span className="hashtag">#trolls</span>, 
							<span className="hashtag">#FakeNews</span> et concurrence au nb de clics polluent le paysage ? Réponses le 16 avril lors du 1er rdv de <span className="mention">@ScPoResearch</span> ✍ <a className="link-external-tweet" href="/" target="_blank" rel="noopener">https://bit.ly/2UQmrZI</a>
						</p>
						<aside className="details">
							<p className="account">
								<a href="link/to/tweet" target="_blank" rel="noopener" title={ lang === 'fr' ? "Lien vers le compte Twitter" : "Link to Twitter account" }>
									@medialab_ScPo
								</a>
							</p>
						</aside>
					</article>
					


		</section>
		
		</>
  	);
}
