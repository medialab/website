import React from 'react';
import {Link} from 'gatsby';
import DateNews from '../../../helpers/DateNews.js';
import TimeNews from '../../../helpers/TimeNews.js';
import {format as formatDate, getYear, parseISO} from 'date-fns';

export default function Agenda({rdv, lang}) {




	return (
  <>
    <section id="agenda" /* style={nbRdv} */>

      <div id="agenda-container">

        <div id="agenda-contenu" data-attribute="agenda">
          <>

            {rdv.map((event, i) =>
              (<React.Fragment key={i}>

                <article>
                <Link to={event.permalink[lang]}>

                  <aside className="divers">
                    <p className="label" data-icon="news">{ event.label && (lang === 'fr' ? event.label.fr : event.label.en) }</p>
                    <DateNews startDate={event.startDate} endDate={event.endDate} lang={lang} />
                    { event.external && (event.external === true) ? '' : <p className="internal" aria-label="evenement interne au medialab">⌂</p>}
                  </aside>

                  
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
