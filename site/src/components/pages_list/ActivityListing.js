import React from 'react';
import {Link} from 'gatsby';


import FilterActivity from './fragments/FilterActivity.js';
import RawHTML from '../helpers/RawHtml.js';
import {IsModel} from '../helpers/helpers.js';
import ProcessedImage from '../helpers/ProcessedImage.js';
import {templateMembership} from '../helpers/helpers.js';

export default function ActivityListing({lang, list, status, statuses}) {
  console.log(lang, list);

 
    return (
      <>
        <FilterActivity lang={lang} status={status} statuses={statuses} />
       
        <section id="liste">
          <ul className="liste_objet" id="liste-activity">
           
            {list.map((a, index) => (
              <React.Fragment key={index}>
                <li data-type={a.type} className={`list-item ${a.type}-${a.active ? 'active' : 'past'}`}>
                  <Link to={a.permalink[lang]}>
                    <div className="image-pre">
                        <ProcessedImage size="medium" image={a.coverImage && a.coverImage.processed.medium} />
                      </div>
                    <div className="bandeau">
                      <p data-icon="activite" className="type-activity">{IsModel(a.type, lang)}</p>
                      <p className="title" data-level-2="title">{a.name}</p>
                    </div>
                    <hgroup>
                      <h1 data-level-1="baseline" >{a.baseline && (lang === 'fr' ? a.baseline.fr : a.baseline.en)}</h1>
                    </hgroup>                   
                    <div className="accroche">
                      <p className="accroche-paragraphe">
                        {a.description && <RawHTML html={lang === 'fr' ? a.description.fr : a.description.en} />}
                      </p>                     
                    </div> 
                  </Link>
                </li>
              </React.Fragment>
              
            ))}   
              
          </ul>
        </section>
      </>
   );
}




