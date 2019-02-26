import React from 'react';
import {Link} from 'gatsby';
import {format} from 'date-fns';
import {getDate} from 'date-fns';
import {getMonth} from 'date-fns';
import {getYear} from 'date-fns';
import {getHours} from 'date-fns';

const Now = () => {

	return (
		
		<section id="now">
			<h1>À la une</h1>
			<div className="contenu">

			{(grid || []).map(item => (

				let type = null;

				{ item.model === "activities" ? ( lang === fr ? type = "Activités" : type "Activities") } 
				{ item.model === "productions" && type = "Productions" } 
				{ item.model === "news" ? ( lang === fr ? type = "Actualités" : type "News") } 
				{ item.model === "people" ? ( lang === fr ? type = "L'equipe" : type "Medialab's Team") } 
				
				{/* if type=actualite (bon modèle pour les liens) */}
				<article data-type={item.model}>
					<div className="nomenclature">
						<p className="type"><Link to{item.url}>{type}</Link></p>
						{/*<p className="sous-type"><Link to{item.url}>{type}</Link></p> */}
					</div>
					<div className="image-pre">
						<a href="#linkObjet">
						{img}
						</a>
					</div>
						<hgroup>
						<Link to{item.url}>

							{item.model === "productions" ? 
								(lang === "fr" ? 
									<h1 data-level-1="title">item.title.fr</h1> :
									<h1 data-level-1="title">item.title.en</h1> 
								)
								<h2 data-level-2="author" className="author">
									{(item.author || []).map(person => <span>{person.firstName} {person.lastName}</span>)}
								</h2> :
							}

							{item.model === "people" ? (lang === "fr" ? 
									<h1 data-level-1="name">item.name.fr</h1>
									<h2 data-level-2="role">item.title.en</h2>

								: 	<h1 data-level-1="name">item.name.en</h1>
									<h2 data-level-2="role">item.title.en</h2>
							)}

							{item.model === "news" ? (lang === "fr" ? 
									<h1 data-level-1="title">item.title.fr</h1>
									{ item.date ? <time className="time">{format(getdate(item.date), ) D MMMM) + " / " + getHours(item.date) + "H" + getMinutes(item.date) + " - " + getHours(item.date) + "H" + getMinutes(item.date)}</time> : }
									<h2 data-level-2="label">item.label.fr</h2>

								: 	<h1 data-level-1="title">item.title.en</h1>
									{ item.date ? <time className="time">{format(getdate(item.date), ) D MMMM) + " / " + getHours(item.date) + "H" + getMinutes(item.date) + " - " + getHours(item.date) + "H" + getMinutes(item.date)}</time> : }
									<h2 data-level-2="label">item.label.en</h2>
							)}

							{item.model === "activities" ? 
								<h1 data-level-1="baseline">item.name</h1>
								(lang === "fr" ? <h2 data-level-2="name">item.title.en</h2> : <h2 data-level-2="name">item.title.en</h2> )
							}
					
							<p className="more"><Link to{item.url}>{lang === "fr" ? "En savoir plus" : "Get more about it" }</Link></p>
						</Link>
						</hgroup>
				</article>
				)
	        )}

			</div>
		</section>
		
  	);
}

export default Now;
