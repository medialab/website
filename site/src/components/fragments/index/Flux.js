import React from 'react';
import {Link} from 'gatsby';
import ProcessedImage from '../../ProcessedImage.js';

export default function flux() {

	// Générer les bouttons de navigation Input
	/*const input_hoverline = () => {
	    const hoverline = [];
		var block = Array('░','▒', '▓');

	    for (let i = 1; i < 20; i++) {
			var block = block[Math.floor(Math.random()*block.length)];
	    	hoverline.push(
		<React.Fragment key={i}>
		<input 
		type="radio" name="hoverline" value={`hoverline_${i}`} 
		id={`hoverline_${i}`} className="hoverline" hidden />
		<label className="hoverline" for={`hoverline_${i}`}>
			<span>{block}</span>
		</label>

		</React.Fragment>
	    	);
	    }
	    return hoverline;
	};*/

	// Générer les bouttons de navigation Input
	const InputButtonL = () => {
	    const buttonsL = [];

	    for (let i = 1; i < 20; i++) {
	    	buttonsL.push(
	<React.Fragment key={i}>
	<input
	  type="radio" name="move-timeline" value="timeline_moving_left"
	  id={`input_timeline_moving_left_${i}`} className="timeline_moving_left" hidden />
	<label className="timeline_moving_left" id={`agenda_moving_left_${i}`} htmlFor={`input_agenda_moving_left_${i}`}>
	  <span>〉</span>
	</label>
	</React.Fragment>
	    	);
	    }

	    return buttonsL;
	};	

	return (
		<>
		
		<section id="flux">

			<h1>À chaud</h1>

	        <input
	          type="radio" name="flux_layout" value="grid"
	          id="flux_layout-grid"  hidden />
	        <label className="flux_layout-button" for="flux_layout-grid"><span>⊞</span></label>

	        <input
	          type="radio" name="flux_layout" value="linear"
	          id="flux_layout-linear" hidden />
	        <label className="flux_layout-button" for="flux_layout-linear"><span>⊟</span></label>

	        <input
	          type="radio" name="flux_layout" value="timeline"
	          id="flux_layout-timeline" defaultChecked hidden />
	        <label className="flux_layout-button" for="flux_layout-timeline"><span>⧈</span></label>
			
			{/* Hoverline */}
			<input type="radio" name="hoverline" value="hoverline-0" id="hoverline-0" hidden />
			<label className="hoverline" for="hoverline-0"><span>▒</span></label>
			<input type="radio" name="hoverline" value="hoverline-1" id="hoverline-1" hidden />
			<label className="hoverline" for="hoverline-1"><span>▒</span></label>	
			<input type="radio" name="hoverline" value="hoverline-2" id="hoverline-2" hidden />
			<label className="hoverline" for="hoverline-2"><span>░</span></label>
			<input type="radio" name="hoverline" value="hoverline-3" id="hoverline-3" hidden />
			<label className="hoverline" for="hoverline-3"><span>▓</span></label>
			<input type="radio" name="hoverline" value="hoverline-4" id="hoverline-4" hidden />
			<label className="hoverline" for="hoverline-4"><span>░</span></label>	
			<input type="radio" name="hoverline" value="hoverline-5" id="hoverline-5" hidden />
			<label className="hoverline" for="hoverline-5"><span>▓</span></label>
			<input type="radio" name="hoverline" value="hoverline-6" id="hoverline-6" hidden />
			<label className="hoverline" for="hoverline-6"><span>▓</span></label>	
			<input type="radio" name="hoverline" value="hoverline-7" id="hoverline-7" hidden />
			<label className="hoverline" for="hoverline-7"><span>▒</span></label>
			<input type="radio" name="hoverline" value="hoverline-8" id="hoverline-8" hidden />
			<label className="hoverline" for="hoverline-8"><span>░</span></label>
			<input type="radio" name="hoverline" value="hoverline-9" id="hoverline-9" hidden />
			<label className="hoverline" for="hoverline-9"><span>░</span></label>
			<input type="radio" name="hoverline" value="hoverline-10" id="hoverline-10" hidden />
			<label className="hoverline" for="hoverline-10"><span>▒</span></label>
			<input type="radio" name="hoverline" value="hoverline-11" id="hoverline-11" hidden />
			<label className="hoverline" for="hoverline-11"><span>░</span></label>	
			<input type="radio" name="hoverline" value="hoverline-12" id="hoverline-12" hidden />
			<label className="hoverline" for="hoverline-12"><span>░</span></label>
			<input type="radio" name="hoverline" value="hoverline-13" id="hoverline-13" hidden />
			<label className="hoverline" for="hoverline-13"><span>▓</span></label>	
			<input type="radio" name="hoverline" value="hoverline-14" id="hoverline-14" hidden />
			<label className="hoverline" for="hoverline-14"><span>░</span></label>
			<input type="radio" name="hoverline" value="hoverline-15" id="hoverline-15" hidden />
			<label className="hoverline" for="hoverline-15"><span>▓</span></label>
			<input type="radio" name="hoverline" value="hoverline-16" id="hoverline-16" hidden />
			<label className="hoverline" for="hoverline-16"><span>▒</span></label>
			<input type="radio" name="hoverline" value="hoverline-17" id="hoverline-17" hidden />
			<label className="hoverline" for="hoverline-17"><span>▒</span></label>
			<input type="radio" name="hoverline" value="hoverline-18" id="hoverline-18" hidden />
			<label className="hoverline" for="hoverline-18"><span>▓</span></label>
			<input type="radio" name="hoverline" value="hoverline-19" id="hoverline-19" hidden />
			<label className="hoverline" for="hoverline-19"><span>░</span></label>
			<input type="radio" name="hoverline" value="hoverline-20" id="hoverline-20" hidden />

			{/* Timeline Buttons */}
			<buttonsL />

			<div id="flux-container" style={{ '--h-0': 2, '--h-1': 2, '--h-2': 1, '--h-3': 1}}>
				{/*if type=git (bon modèle pour les liens) */}
				<article data-type="git" data-day="0">
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
				<article data-type="tweet" className="major" data-day="0">
					<p className="type">Tweet</p>
					<p className="update">Today</p>
					{/*<h2 data-level-1="title">Tic et Toc</h2>*/}
					<h2 data-level-2="description">
						Faire vivre la #démocratie exige que nous ayons #confiance envers les #medias. Comment y parvenir dans un univers où <span className="hashtag">#trolls</span>, <span className="hashtag">#FakeNews</span> et concurrence au nb de <span className="hashtag">clics</span> polluent le paysage ? Réponses le 16 avril lors du 1er rdv de <span className="mention">@ScPoResearch</span> ✍ <Link to="/">https://bit.ly/2UQmrZI</Link>
					</h2>			
					<ul className="details">
						<li className="account">@medialab_ScPo</li>
					</ul>
				</article>

				<article data-type="git" data-day="1">
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

				<article data-type="git" data-day="1">
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
				{/*if type=tweet (bon modèle pour les liens) */}
				<article data-type="tweet" className="major" data-day="3">
					<p className="type">Tweet</p>
					<p className="update">4 days ago</p>
					{/*<h2 data-level-1="title">Tic et Toc</h2>*/}
					<h2 data-level-2="description">
						Faire vivre la #démocratie exige que nous ayons #confiance envers les #medias. Comment y parvenir dans un univers où <span className="hashtag">#trolls</span>, <span className="hashtag">#FakeNews</span> et concurrence au nb de <span className="hashtag">clics</span> polluent le paysage ? Réponses le 16 avril lors du 1er rdv de <span className="mention">@ScPoResearch</span> ✍ <Link to="/">https://bit.ly/2UQmrZI</Link>
					</h2>			
					<ul className="details">
						<li className="account">@medialab_ScPo</li>
					</ul>
				</article>

				<article data-type="post" data-day="4">
					<div>
						<h2 data-level-1="title"><span>+ 3</span>posts</h2>					
						<p className="since">Since a week</p>
					</div>
                	{/*<div className="image-background"><ProcessedImage size="small" image="" /></div>*/}

				</article>
				
				<article></article>							
				<article></article>							
				<article></article>							
				<article></article>							
				<article></article>							
				<article></article>				
				<article></article>							
				<article></article>							
				<article></article>							

			</div>

			{/* buoy Buttons */}
			<div id="timeline-buoy">
				<span></span>
			</div>

			</section>
		
		</>
  	);
}

//export default Flux;

