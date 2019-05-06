import React from 'react';
import {Link} from 'gatsby';
import ProcessedImage from '../../helpers/ProcessedImage.js';

export default function flux() {
	return (
		<>
		
		<section id="flux">

			<h1>À chaud</h1>

			<div id="flux-container">

				<article className="git" data-type="git">			
					<p className="type">Git</p>
					<p className="date last-update"><span>Last update: </span>23/10/2018</p>
					<div class="content content-git">
						<h1 data-level-1="title">Tic et Toc</h1>
						<p className="description">Outils composé de 0 ou de 1, de $ ou de , enfin plein de machin pas si complexe.</p>
						<ul className="details">
							<li className="language">Python</li>
							<li className="contrib">3 contributeurs</li>
							<li className="licence">LGPL-3.0</li>
						</ul>
					</div>
				</article>

				<article className="item-tweet" data-type="tweet">			
					<p className="type">Tweet</p>
					<p className="date"><span>Publié le </span>23/10/2018</p>					
					<div class="content content-tweet">
						<div className="tweet-inside">
						<p>
							Faire vivre la #démocratie exige que nous ayons <span className="hashtag">#confiance</span> envers les <span className="hashtag">#medias</span>. Comment y parvenir dans un univers où <span className="hashtag">#trolls</span>, <span className="hashtag">#FakeNews</span> et concurrence au nb de <span className="hashtag">clics</span> polluent le paysage ? Réponses le 16 avril lors du 1er rdv de <span className="mention">@ScPoResearch</span> ✍ <Link to="/">https://bit.ly/2UQmrZI</Link>
						</p>
						</div>
						<ul className="details">
							<li className="language">@medialab_ScPo</li>
						</ul>
					</div>				
				</article>


				<article className="git" data-type="git">			
					<p className="type">Git</p>
					<p className="date last-update"><span>Last update: </span>23/10/2018</p>
					<div class="content content-git">
						<h1 data-level-1="title">Bröder &amp; Walter</h1>
						<p className="description">Never gonna give you up</p>
						<ul className="details">
							<li className="language">TypeScript</li>
							<li className="contrib">10 contributeurs</li>
							<li className="licence">MIT licence</li>
						</ul>
					</div>
				</article>

				<article className="git" data-type="git">			
					<p className="type">Git</p>
					<p className="date last-update"><span>Last update: </span>23/10/2018</p>
					<div class="content content-git">
						<h1 data-level-1="title">Website</h1>
						<p className="description">The lab's static website and its admin.</p>
						<ul className="details">
							<li className="language">Javascript</li>
							<li className="contrib">10 contributeurs</li>
							<li className="licence">MIT licence</li>
						</ul>
					</div>
				</article>


				<article className="item-tweet" data-type="tweet">			
					<p className="type">Tweet</p>
					<p className="date"><span>Publié le </span>23/10/2018</p>					
					<div class="content content-tweet">
						<div className="tweet-inside">
							<p>Le médialab accueille <span className="mention">@VBeaudouin</span> pour parler de son travail de #cartographie du web de la grande guerre.</p>
							<img src="/" />
						</div>
						<ul className="details">
							<li className="language">@medialab_ScPo</li>
						</ul>
					</div>				
				</article>

						

			</div>

			</section>
		
		</>
  	);
}

//export default Flux;

