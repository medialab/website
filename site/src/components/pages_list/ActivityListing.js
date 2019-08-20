import React from 'react';
import {Link} from 'gatsby';

import FilterActivity from './fragments/FilterActivity.js';
import ProcessedImage from '../helpers/ProcessedImage.js';
import LanguageFallback from '../helpers/LanguageFallback.js';
import PageMeta from '../helpers/PageMeta.js';

const messagesMeta = {
  title: {
    fr: 'Activités | médialab Sciences Po',
    en: 'Activities | médialab Sciences Po',
  },
  description: {
    fr: 'Les activités du médialab s’articulent entre recherche et enseignement. Elles approfondissent notamment l’usage des méthodes numériques pour répondre aux enjeux contemporains en sociologie et STS. Également mobilisées au coeur d’activités pédagogiques, par exemple en mettant les étudiants en situation d’enquête, elles bénéficient d’une réflexivité très enrichissante sur nos processus de recherche.',
    en: 'The médialab’s activities articulate both research and teaching. In particular, they explore the use of digital methods to address contemporary issues in sociology and STS. These methods are also central to the laboratory’s teaching, for example by putting students in research situations. This fosters highly enriching reflection on our research processes.'
  }
};

export default function ActivityListing({lang, list, status, statuses, topActivities, ...other}) {
  const activities = topActivities.map(ta => list.find(a => a.id === ta)).concat(list.filter(a => topActivities.indexOf(a.id) === -1));

  return (
    <>
      <PageMeta
        title={messagesMeta.title[lang]}
        description={messagesMeta.description[lang]}
        lang={lang} />
      <main role="main" aria-describedby="aria-accroche">
        <FilterActivity lang={lang} status={status} statuses={statuses} />
        <section className="main-filters" />

        <section id="liste" className="main-container">
          <ul className="liste_objet" id="liste-activity">

            {activities.map((a, index) => (
              <React.Fragment key={index}>
                <li
                  itemScope itemProp="member" itemType={a.type === 'research' ? 'https://schema.org/ResearchProject' : 'https://schema.org/Project'}
                  data-type={a.type} className={`list-item ${a.type}-${a.active ? 'active' : 'past'}`}>
                  <Link to={a.permalink[lang]}>
                    <div className="image-pre" aria-hidden="true">
                      <ProcessedImage size="medium" image={a.coverImage && a.coverImage.processed && a.coverImage.processed.medium} data={a} />
                    </div>
                    <div className="bandeau">
                      <p data-icon="activite" className="type-activity">{a.typeLabel[lang]}</p>
                      <p className="title" itemProp="name" data-level-2="title">{a.name}</p>
                    </div>
                    <hgroup>
                      <h1 data-level-1="baseline" >
                          <LanguageFallback lang={lang} translatedAttribute={a.baseline} />
                        </h1>
                    </hgroup>
                    <div className="accroche">
                      <p className="accroche-paragraphe">
                          <LanguageFallback lang={lang} translatedAttribute={a.description} />
                        </p>
                    </div>
                  </Link>
                </li>
              </React.Fragment>

              ))}

          </ul>
        </section>
      </main>
    </>
   );
}

