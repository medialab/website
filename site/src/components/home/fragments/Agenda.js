import React from 'react';
import {Link} from 'gatsby';
import DateNews from '../../helpers/DateNews.js';
import TimeNews from '../../helpers/TimeNews.js';
import {format as formatDate, getYear, parseISO} from 'date-fns';

export default function Agenda({rdv, lang}) {

	// Générer les bouttons de navigation Input
	// const InputButton = () => {
	//     const buttons = [];

	//     for (let i = 1; i < 7; i++) {
	//     	buttons.push(
  // <React.Fragment key={i}>
  //   <input
  //     type="radio" name="move-agenda" value="agenda_moving_left"
  //     id={`input_agenda_moving_left_${i}`} hidden />
  //   <label className="agenda_moving_left" id={`agenda_moving_left_${i}`} htmlFor={`input_agenda_moving_left_${i}`}>
  //     <span>〉</span>
  //   </label>
  // </React.Fragment>
	//     	);
	//     }

	//     return buttons;
	// };




	return (
  <>
    <section id="agenda" /* style={nbRdv} */>
      <h1>{lang === 'fr' ? 'Les rendez-vous ' : 'The agenda'} </h1>

      <div id="agenda-container">

        {/* <InputButton />

        <div className="agenda_moving_left" id="agenda_moving_left_cache" />

        <input
          type="radio" name="move-agenda" value="agenda_moving_right"
          id="input_agenda_moving_right" hidden />
        <label className="agenda_moving_right" id="agenda_moving_right" htmlFor="input_agenda_moving_right">
          <span>〈〈</span>
        </label>

        <input
          type="radio" name="move-agenda" value="agenda_moving_right"
          id="input_agenda_moving_right_1" hidden />
        <label className="agenda_moving_right" id="agenda_moving_right_1" htmlFor="input_agenda_moving_right_1">
          <span>〈</span>
        </label> */}

        <div id="agenda-contenu" data-attribute="agenda">
          <>
            {/* <article className="past" data-count="2">

              <p>{lang === 'fr' ?
							<Link to="/news">Voir les rendez-vous déjà passés dans <span>Actualités</span></Link> :
							<Link to="/news">'Have a look to past appoitement in <span>Actuality</span></Link>
							}
              </p>

            </article> */}
            {rdv.map((event, i) =>
              (<React.Fragment key={i}>

                <article>
                <Link to={event.permalink[lang]}>

                  <aside className="divers">
                    <p className="label"><span></span>{ event.label && (lang === 'fr' ? event.label.fr : event.label.en) }</p>
                    { event.external && (event.external === true) ? '' : <p className="internal" aria-label="evenement interne au medialab">⌂</p>}
                  </aside>

                  <DateNews startDate={event.startDate} endDate={event.endDate} lang={lang} />
                  <h1 data-level-1="title">{lang === 'fr' ? event.title.fr : event.title.en }</h1>
 
                  <aside className="details">
                    <TimeNews startDate={event.startDate} endDate={event.endDate} />
                    { event.place && <p className="place">{event.place}</p> }
                  </aside>

                </Link>
                </article>

              </React.Fragment>)
						)}
          </>
        </div>
      </div>
    </section>
  </>
  	);
}
