import React from 'react';
import { Link } from 'gatsby';

const PublicationsAssociees = ({ lang, person, context, productions }) => {

	 // Si aucune production liée, retourne null
	// if (!productions || productions.length === 0)
	//   return null;

	// definissons une accroche
	let accroche;
	if (lang === "fr") {
		if (context && context === "people") {
		accroche = "Productions auxquelles " + person.firstName + " " + person.lastName + " a participé";
		}else{
			accroche =  "Productions liées à ce sujet"+ String.fromCharCode(8239) +":";
		}
	} else {
		if (context && context === "people") {
			accroche = "Productions in which " + person.firstName + " " + person.lastName + " participated";
		} else {
			accroche = "Productions linked to this subject:";
		}

	}



	console.log(productions);
	return (
		<aside className="container elements-associes-block" id="productions-associes">
			<h1><span data-icon="production"></span> {accroche}</h1>

			<div className="contenu">
				<ul className="liste_objet">
					{/* {(productions || []).map(p => (
						<li data-type="production" className="item">
							<Link to={`/productions/${p.slugs[p.slugs.length - 1]}`}>
								<h1 data-level-="title">{lang === "fr" ? p.description.fr : p.description.en}</h1>
								<h2 data-level-="authors">{lang === "fr" ? p.title.fr : p.title.en}</h2>
								<p className="type">{lang === 'fr' ? p.groupLabel.fr : p.groupLabel.en} - {lang === 'fr' ? p.typeLabel.fr : p.typeLabel.en}</p>
							</Link>
						</li>
					))} */}

						{/* // POUR LES TESTS */}
						
						<li data-type="production" className="item">
							<a href="#">
								<h1 data-level-="title">Gaia 2.0 - Could humans add some level of self-awareness to Earth’s self-regulation?</h1>
								<h2 data-level-="authors">Bruno Latour</h2>
								<p className="type">Publication - Article</p>
							</a>
						</li>

						<li data-type="production" className="item">
							<a href="#">
								<h1 data-level-="title">Hyperlink is not dead!</h1>
								<h2 data-level-="authors">Benjamin Ooghe, Mathieu Jacomy, Paul Girard, Guillaume Plique</h2>
								<p className="type">Publication — Communication</p>
							</a>
						</li>

						<li data-type="production" className="item">
							<a href="#">
								<h1 data-level-="title">(Protestant) Bible, the (printed) sermon, and the word(s): The semantic structure of the Conformist and Dissenting Bible, 1660–1780</h1>
								<h2 data-level-="authors">Peter Bearman, Jean-Philippe Cointet, Philipp Brandt, Mark Anthony Hoffman, Key, Department Of History Newton</h2>
								<p className="type">Publication — Communication</p>
							</a>
						</li>

						<li data-type="production" className="item">
							<a href="#">
								<h1 data-level-="title">Denier-in-Chief: Climate Change, Science and the Election of Donald J. Trump</h1>
								<h2 data-level-="authors">Kari De Pryck, François Gemenne</h2>
								<p className="type">Publication — Article</p>
							</a>
						</li>

						<li data-type="production" className="item">
							<a href="#">
								<h1 data-level-="title">Denier-in-Chief: Climate Change, Science and the Election of Donald J. Trump</h1>
								<h2 data-level-="authors">Kari De Pryck, François Gemenne</h2>
								<p className="type">Publication — Article</p>
							</a>
						</li>
									

				</ul>
			</div>
		</aside>
	)
}

export default PublicationsAssociees;
