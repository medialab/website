import React from 'react';
import {Link} from 'gatsby';

const Slideshow = () => {
	return (
		<>
		<section className="slideshow" id="slideshow">

			<input type="radio" name="ss1" id="ss1-item-1" className="slideshow--bullet" checked="checked" />
			<label className="slideshow--bullet-label" for="ss1-item-1">Article 1</label>

			<div className="slideshow--item">
					{article}
				<label for="ss1-item-3" className="slideshow--nav slideshow--nav-previous">Go to slide 3</label>
				<label for="ss1-item-2" className="slideshow--nav slideshow--nav-next">Go to slide 2</label>
			</div>
			{/*  Fin Item */}
			{/*  Item */}

			<input type="radio" name="ss1" id="ss1-item-2" className="slideshow--bullet" />
			<label className="slideshow--bullet-label" for="ss1-item-2">Article 2</label>
			<div className="slideshow--item">
				{article}
				<label for="ss1-item-1" className="slideshow--nav slideshow--nav-previous">Go to slide 1</label>
				<label for="ss1-item-3" className="slideshow--nav slideshow--nav-next">Go to slide 3</label>
			</div>
			{/*  Fin Item */}
			{/*   Item */}
			<input type="radio" name="ss1" id="ss1-item-3" className="slideshow--bullet" />
			<label className="slideshow--bullet-label" for="ss1-item-3">Article 3</label>
			<div className="slideshow--item">
				{article}
				<label for="ss1-item-2" className="slideshow--nav slideshow--nav-previous">Go to slide 2</label>
				<label for="ss1-item-4" className="slideshow--nav slideshow--nav-next">Go to slide 4</label>
			</div>
			{/*  Fin Item */}
			<hr/>

		</section>
		</>
  	);
}

export default Slideshow;


/*
<article className="transition" data-type="actualite">
						<div className="image-pre">
							{img}
						</div>
						<div className="image-pre-phone">
							{img}
						</div>
						<div className="contenu-slide">
							<a href="#">
								<div className="nomenclature">
									<p className="type"><a href="#">Actualité</a></p>
									<p className="sous-type"><a href="#">Rendez-vous</a></p>
								</div>
								
								<h1 data-level-1="title">Rencontre avec George Micheal</h1>
								{/* Si RDV */}
								<time className="time">25 décembre / 18h-20h</time>
								<h2 data-level-2="label">Dans le cadre du séminaire "Merry Christmas"</h2>
								<p className="description">Georgios Kyriacos Panayiotou, connu sous le nom de scène de George Michael, est un auteur-compositeur-interprète et producteur britannique, né le 25 juin 1963 à Londres et mort le 25 décembre 2016 à Goring-on-Thames.</p>					
								<p className="more"><a href="#">En savoir plus</a></p>
							</a>
						</div>
					</article>



//

<article className="transition" data-type="activite">
					<div className="image-pre">
						<?php include('assets/images/image_block/naturpradi_150.html'); ?>
					</div>
					<div className="image-pre-phone">
						<?php include('assets/images/image_block/naturpradi_75.html'); ?>
					</div>
					<div className="contenu-slide">
						<a href="#">
							<div className="nomenclature">
								<p className="type"><a href="#">Activité</a></p>
								<p className="sous-type"><a href="#">Pédagogie</a></p>
							</div>
							<h1 data-level-1="baseline">Marchés financiers : que sont les “bonnes” relations sociales d’échange?</h1>
							<h2 data-level-2="name">How not to be a bad trader.</h2>
							<p className="description">Le cas de la Rules 10b-5 de la Securities and Exchange Commission : une exploration de l’histoire tumultueuse des interprétations de ce texte de régulation boursière par juristes et économistes, et du débat sur le “bon” comportement sur les marché financiers.</p>					
							<p className="more"><a href="#">En savoir plus</a></p>
						</a>
					</div>
				</article>



//

<article className="transition" data-type="production">
					<div className="image-pre">
						<?php include('assets/images/image_block/ricardo_150.html'); ?>
					</div>
					<div className="image-pre-phone">
						<?php include('assets/images/image_block/ricardo_75.html'); ?>
					</div>
					<div className="contenu-slide">
						<a href="#">
							<div className="nomenclature">
								<p className="type"><a href="#">Production</a></p>
								<p className="sous-type"><a href="#">Communication</a></p>
							</div>
							<h1 data-level-1="title">Hyperlink is not dead!</h1>
							<h2 data-level-2="author" className="author">
								<span>Benjamin Ooghe-Tabanou</span>
								<span>Guillaume Plique</span>
								<span>Mathieu Jacomy</span>
								<span>Paul Girard</span>
							</h2>
							<p className="description">Le 4 octobre, le premier Digital Tools & Uses Congress s’est tenu à la MSH Paris Nord autour des usages et développements des outils numériques. Invité pour une Keynote intitulée Hyperlink is not dead!, Benjamin Ooghe a présenté le rôle central et structural de l’hyperlien dans l’étude du web en SHS, notamment à travers l’exemple de l’outil Hyphe développé au médialab.</p>					
							<p className="more"><a href="#">En savoir plus</a></p>
						</a>
					</div>
				</article>				