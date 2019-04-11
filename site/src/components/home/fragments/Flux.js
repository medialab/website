import React from 'react';
import {Link} from 'gatsby';
import ProcessedImage from '../../helpers/ProcessedImage.js';

export default function flux() {
	return (
		<>
		
		<section id="flux">

			<h1>À chaud</h1>

			<div id="flux-container" style={{ '--h-0': 2, '--h-1': 2, '--h-2': 1, '--h-3': 1}}>
				{/*if type=git (bon modèle pour les liens) */}
				<article data-type="git" >
					<p className="type">Git</p>
					<p className="update">Today</p>

					<h2 data-level-1="title">Tic et Toc</h2>
					<h3 data-level-2="description">Outils composé de 0 ou de 1, de $ ou de , enfin plein de machin pas si complexe...</h3>
					
					<ul className="details">
						<li className="language">JS / HTML / CSS </li>
						<li className="contrib">3 contributeurs</li>
						<li className="licence">LGPL-3.0</li>
					</ul>
				</article>

				{/*if type=tweet (bon modèle pour les liens) */}
				<article data-type="tweet" className="major" data-lenght="280">
					<p className="type">Tweet</p>
					<p className="update">Today</p>
					{/*<h2 data-level-1="title">Tic et Toc</h2>*/}
					<h2 data-level-2="description">
						Faire vivre la #démocratie exige que nous ayons <span className="hashtag">#confiance</span> envers les <span className="hashtag">#medias</span>. Comment y parvenir dans un univers où <span className="hashtag">#trolls</span>, <span className="hashtag">#FakeNews</span> et concurrence au nb de <span className="hashtag">clics</span> polluent le paysage ? Réponses le 16 avril lors du 1er rdv de <span className="mention">@ScPoResearch</span> ✍ <Link to="/">https://bit.ly/2UQmrZI</Link>
					</h2>			
					<ul className="details">
						<li className="account">@medialab_ScPo</li>
					</ul>
				</article>

				<article data-type="git" >
					<p className="type">Git</p>
					<p className="update">1 days ago</p>

					<h2 data-level-1="title">Bröder & Walter</h2>
					<h3 data-level-2="description">Never gonna give you up.</h3>
					
					<ul className="details">
						<li className="language">JS / HTML / CSS </li>
						<li className="contrib">10 contributeurs</li>
						<li className="licence">MIT licence</li>
					</ul>
				</article>

				<article data-type="git" >
					<p className="type">Git</p>
					<p className="update">1 days ago</p>

					<h2 data-level-1="title">Tugh & Marie</h2>
					<h3 data-level-2="description">Bim bam bom</h3>
					
					<ul className="details">
						<li className="language">JS / HTML / CSS </li>
						<li className="contrib">6 contributeurs</li>
						<li className="licence">MIT licence</li>
					</ul>
				</article>
				<article data-type="tweet" className="major" data-lenght="140">
					<p className="type">Tweet</p>
					<p className="update">4 days ago</p>
					{/*<h2 data-level-1="title">Tic et Toc</h2>*/}
					<h2 data-level-2="description">
						Le médialab accueille <span className="mention">@VBeaudouin</span> pour parler de son travail de #cartographie du web de la grande guerre.
					</h2>			
					<ul className="details">
						<li className="account">@medialab_ScPo</li>
					</ul>
				</article>

				
				<article></article>							
						

			</div>

			</section>
		
		</>
  	);
}

//export default Flux;

