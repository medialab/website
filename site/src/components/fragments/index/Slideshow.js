import React from 'react';
import {Link} from 'gatsby';


const article  = (slide) => { // ici construction de l'article 
	
		<article className="transition" data-type="production">
		<div className="image-pre">
			{slide.coverImage.processed}  
		</div>
		<div className="image-pre-phone">
			{slide.coverImage.processed}
		</div>
		<div className="contenu-slide">
			<a href="#">
				<div className="nomenclature">
					<p className="type"><a href="#">{slide.type && (lang === "fr" ? slide.type.fr : slide.type.en)}</a></p>
					{/* Sur cette derniere ligne ? Comment trouver le sous-type ?*/} 
					{/* <p className="sous-type"><a href="#">Communication</a></p> */} 
 				</div>

				{/* Default */}
				<h1 data-level-1="title">{slide.title && (lang === "fr" ? slide.title.fr : slide.title.en)}</h1>

				{/* If Activité */}
				{slide.model === "activity" ? 
					<h2 data-level-2="name">{slide.name}</h2>
				}
				

				{/* If Production */}
				{slide.model === "production" ? 
				<h2 data-level-2="author" className="author">
					<ul>
					{(slide.people || []).map(p => <li key={p.id}>{p.firstName} {p.lastName}</li>)}
					</ul>
				</h2>
				}

				{/* if News */}
				{slide.model === "activity" ? 
					<time className="time">{slide.time}</time>
					<h2 data-level-2="label">{slide.label && (lang === "fr" ? slide.label.fr : slide.label.en)}</h2>
				}	
				
				{/* Default */}
				<p className="description">{slide.description && (lang === "fr" ? slide.description.fr : slide.description.en)}</p>					
				<p className="more"><a href="#">En savoir plus</a></p>
			</a>
		</div>
	</article>

    return article
}


const Slideshow = () => {

	return (
		<>
		<section className="slideshow" id="slideshow">

			<input type="radio" name="ss1" id="ss1-item-1" className="slideshow--bullet" checked="checked" />
			<label className="slideshow--bullet-label" for="ss1-item-1">Article 1</label>

			<div className="slideshow--item">
				<Article slide={slider[0]} />
				<label for="ss1-item-3" className="slideshow--nav slideshow--nav-previous">Go to slide 3</label>
				<label for="ss1-item-2" className="slideshow--nav slideshow--nav-next">Go to slide 2</label>
			</div>
			{/*  Fin Item */}
			{/*  Item */}

			<input type="radio" name="ss1" id="ss1-item-2" className="slideshow--bullet" />
			<label className="slideshow--bullet-label" for="ss1-item-2">Article 2</label>
			<div className="slideshow--item">
				<Article slide={slider[1]} />
				<label for="ss1-item-1" className="slideshow--nav slideshow--nav-previous">Go to slide 1</label>
				<label for="ss1-item-3" className="slideshow--nav slideshow--nav-next">Go to slide 3</label>
			</div>
			{/*  Fin Item */}
			{/*   Item */}
			<input type="radio" name="ss1" id="ss1-item-3" className="slideshow--bullet" />
			<label className="slideshow--bullet-label" for="ss1-item-3">Article 3</label>
			<div className="slideshow--item">
				<Article slide={slider[2]} />
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