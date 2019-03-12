import React from 'react';
import {Link} from 'gatsby';
import DateNews from '../DateNews.js';
import TimeNews from '../TimeNews.js';
import { format as formatDate, getYear, parseISO } from 'date-fns';
 
export default function Agenda({rdv, lang}){
	
	// Générer les bouttons de navigation Input 
	const InputButton = () => {
	    let buttons = []

	    for (let i = 1; i < 7; i++) {
	    	buttons.push(
	      		<>
	      		<input type="radio" name="move-agenda" value="agenda_moving_left" id={`input_agenda_moving_left_${i}`} hidden />
	            <label className="agenda_moving_left" id={`agenda_moving_left_${i}`} for={`input_agenda_moving_left_${i}`}>
	                <span>〉</span>
	            </label>
	            </>
	    	)
	    }

	    return buttons;
	};


	// Déterminer le nombre d'évenement totaux à afficher
	/*const lgthRdv = rdv.length;
	console.log(lgthRdv);
	const nbRdv = {
		'--nbr-rdv-affiche': lgthRdv
	}*/

 	console.log(rdv);

	return (
		<>
		<section id="agenda" /* style={nbRdv} */>
			<h1>{lang === "fr" ? "Les rendez-vous " : "The agenda"} </h1>

			<div id="agenda-container">

	            <InputButton />

	            <div className="agenda_moving_left" id="agenda_moving_left_cache"></div>

	            <input type="radio" name="move-agenda" value="agenda_moving_right" id="input_agenda_moving_right" hidden />
	            <label className="agenda_moving_right" id="agenda_moving_right" for="input_agenda_moving_right">
	                <span>〈〈</span>
	            </label>

	            <input type="radio" name="move-agenda" value="agenda_moving_right" id="input_agenda_moving_right_1" hidden />
	            <label className="agenda_moving_right" id="agenda_moving_right_1" for="input_agenda_moving_right_1">
	                <span>〈</span>
	            </label>

				<div id="agenda-contenu" data-attribute="agenda">
					<>
	                <article className="past" data-count="2">
						
						<p>{lang === "fr" ? 
							"Voir les rendez-vous déjà passés dans " + <Link to="/news">Actualités</Link> : 
							"Have a look to past appoitement in actuality " + <Link to="/en/news">Actuality</Link>
							}
						</p>

	                </article>
					{rdv.map((event, i) => 
						<>

						<article key={i}>
					        <p className="year-main">{getYear(parseISO(event.startDate))}</p>
							
							{ event.external && (event.external === true) ? 
								<p className="external" data-external="yes">
									<span className="out">↑</span>
									<span className="tip">{ lang === "fr" ? "Cet evenement est externe au Médialab" : "This event is external to Medialab" }</span>
								</p> : ""
							}

							<Link to={event.permalink[lang]}>
			                    <DateNews startDate={event.startDate} endDate={event.endDate} lang={lang} />
						        <h1 data-level-1="title">
						        	{lang === "fr" ? event.title.fr : event.title.en }
						        </h1>
						        <h2 data-level-1="label">
						        	{ event.label && (lang === "fr" ? event.label.fr : event.label.en ) }
						        </h2>						        
						        <TimeNews startDate={event.startDate} endDate={event.endDate} />
						        {/*<p className="hours">{"◷ " + getHours(event.startDate) + " ⇥ " + getHours(event.startDate)}</p> : "" } */}
						        <p className="place">{event.place}</p>
							</Link>
						</article>
						</>
						)} 
					</>
				</div>
			</div>
		</section> 
		</>
  	);
}