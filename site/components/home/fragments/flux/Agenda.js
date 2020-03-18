import React from 'react';
import Link from '../../../helpers/Link';

import DateNews from '../../../helpers/DateNews';
import TimeNews from '../../../helpers/TimeNews';
import {Icons} from '../../../helpers/Icons';
import LanguageFallback from '../../../helpers/LanguageFallback';

const i18n = {
  fr: {
    rdv: 'Rendez-vous',
    more: 'En savoir plus sur ce Rendez-vous',
    internal: 'Cet évenement est organisé par le médialab',
    place: 'Lieu'
  },
  en: {
    rdv: 'Meetings',
    more: 'Get more information on this meeting',
    internal: 'The event is hosted by médialab',
    place: 'Place'
  }
};

export default function Agenda({rdv, lang}) {
	return (
    <section id="agenda">
      <h1>{i18n[lang].rdv}</h1>
      <input
        id="checkbox_agenda"
        type="checkbox"
        name="checkbox_flux"
        hidden />
      <label className="responsive-flux" htmlFor="checkbox_agenda">
        <span><Icons icon="arrow" /></span>
      </label>
      <div id="agenda-content">

        {rdv.map((event, i) => (
          <article
            key={i}
            itemScope
            itemProp="event"
            itemType="https://schema.org/Event">
            <Link to={event.permalink[lang]} aria-label={i18n[lang].more}>

              <aside className="divers">
                <p className="label" data-icon="news" itemProp="name">{event.label && event.label[lang]}</p>
                <DateNews startDate={event.startDate} endDate={event.endDate} lang={lang} />
                {event.internal && <p className="internal" aria-label={i18n[lang].internal} title={i18n[lang].internal} >⌂</p>}
              </aside>

              <h1 data-level-1="title">
                <LanguageFallback translatedAttribute={event.title} lang={lang} />
              </h1>

              <aside className="details">
                <TimeNews startDate={event.startDate} endDate={event.endDate} />
                { event.place && <p
                  className="place" itemProp="location" itemScope
                  itemType="https://schema.org/Place" aria-label={i18n[lang].place}><span itemProp="address">{event.place}</span></p> }
              </aside>

            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
