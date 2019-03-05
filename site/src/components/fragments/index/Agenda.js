import React from 'react';
import {Link} from 'gatsby';
import format from 'date-fns/format';
import {getDay} from 'date-fns';
import {getDate} from 'date-fns';
import {getMonth} from 'date-fns';
import {getYear} from 'date-fns';
import {getHours} from 'date-fns';
import {en, fr} from 'date-fns/locale'


export default function Agenda(rdv, lang){
	
	//// Input Button 
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
	
	function OneDay(rdv, lang){
		
		function whichTimeCase(rdv){
		  if (getMonth(rdv.startDate) === getMonth(rdv.endDate) ){
		  	return "time-case3"; // Si plusieurs jours sur des mois différents (cas rare) case3
		  } else{
		    if(getDate(rdv.startDate) - getDate(rdv.endDate) === 0 )
		      return "time-case1"; // si une seule journée case 1;
		    else
		      return "time-case2"; // sinon indique plusieurs jours sur le même mois
		  }
		}
		
		function WhichTimeLang(lang){
	       	if(lang === "fr"){ 
	    		return "fr" ;
			} else {
	    		return "en" ;
	    	};
		} 

		rdv.map((rdv, i) => {

			const timeCase = whichTimeCase(rdv);
			const TimeLang = WhichTimeLang(lang);	

			return (
			<article key={i}>
		        <p className="year-main">{getYear(rdv.endDate)} </p>
				
				{ rdv.external && (rdv.external === true) ? 
					<p className="external" data-external="yes">
						<span className="out">↑</span>
						<span className="tip">{ lang === "fr" ? "Cet evenement est externe au Médialab" : "This event is external to Medialab" }</span>
					</p> : ""
				}

		        <time className={`time ${timeCase}`} data-time="">
		            <Link to={rdv.slugs && rdv.slugs }> 

		            	{timeCase === "time-case1" && <span className="week">{format(getDay(rdv.startDate), 'dddd', {locale: TimeLang} )}</span> }
		            	{timeCase === "time-case1" && <span className="day">{getDay(rdv.startDate)}</span>}

		            	{timeCase !== "time-case1" && // if note case 1
		                    <>
		                    <span className="start">
		                    <span className="day">{getDay(rdv.startDate)}</span>
		                     {timeCase === "time-case3" && <span className="month">{getMonth(rdv.startDate)} </span> }
		                    </span>
		                    <span className="between">⇥ </span>
		                    </>
		            	}
		            	{timeCase === "time-case1" && <span className="month">{format(getMonth(rdv.endDate), 'MMMM', {locale: TimeLang} )}</span> }
		            	{timeCase !== "time-case1" &&  // if note case 1
		                    <span className="end">
		                    	<span className="day">{getDay(rdv.endDate)}</span> 
		                        <span className="month">{getMonth(rdv.endDate)}</span>
		                    </span>
		            	}
		                <span className="year">{getYear(rdv.endDate)} </span>
		            </Link>
		        </time>

		        {/*  Title & sub */}
		        <h1 data-level-1="title">
		        	<Link to={rdv.url}>
		        		{lang === "fr" ? rdv.title.fr : rdv.title.en }
		        	</Link>
		        </h1>
		        <h2 data-level-1="label">
		        	<Link to={rdv.url}>
		        		{ rdv.label && (lang === "fr" ? rdv.label.fr : rdv.label.en ) }
		        	</Link>
		        </h2>
		        
		        { timeCase === "time-case1" ? <p className="hours">{"◷ " + getHours(rdv.startDate) + " ⇥ " + getHours(rdv.startDate)}</p> : "" }
		        <p className="place">{"✻ " + rdv.place}</p>
					
			</article>
			)}
		)
	}

	return (
		<>
		<section id="agenda">

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
					{/*<OneDay />*/}
					</>
				</div>
			</div>
		</section>
		</>
  	);
}