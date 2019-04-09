import React from 'react';
import {Link} from 'gatsby';

import ProcessedImage from '../../ProcessedImage.js';
import {IsModel} from '../../helpers.js';
import DateNews from '../DateNews.js';
import TimeNews from '../TimeNews.js';
import {format as formatDate, getYear, parseISO} from 'date-fns';

// Ici nous composons l'ensemble du caroussel
const Slideshow = ({slider, lang}) => {

	let a, z;
	a = 3;
	z = 1;

 	function IsIndex (index) {
 		if (index === 0) {
 			a = '3';
 			z = '2';
 		}
 		if (index === 1) {
 			a = '1';
 			z = '3';
 		}
  		if (index === 2) {
 			a = '2';
 			z = '1';
 		}
 	}

	return (
  <section className="slideshow" id="slideshow">
    {slider.map((slide, index) =>
      (<React.Fragment key={index}>

        {IsIndex(index)}

        <input
          type="radio" name="ss1" id={`ss1-item-${index + 1}`}
          className="slideshow--bullet" defaultChecked={index === 0 } />
        <label className="slideshow--bullet-label" htmlFor={`ss1-item-${index + 1}`}>
          {slide.model === 'activities' ?
						slide.data.baseline && (lang === 'fr' ? slide.data.baseline.fr : slide.data.baseline.en)
						:
						slide.data.title && (lang === 'fr' ? slide.data.title.fr : slide.data.title.en)
					}
        </label>
        {/* Content Below */}
        <div className="slideshow--item">
          <article className="transition" data-type={slide.model}>
            <Link to={slide.data.permalink[lang]}>
              <div className="image-pre">
                <ProcessedImage size="large" image={slide.data.coverImage && slide.data.coverImage.processed.large} />
              </div>
              <div className="image-pre-phone">
                <ProcessedImage size="medium" image={slide.data.coverImage && slide.data.coverImage.processed.medium} />
              </div>
            </Link>
            <div className="contenu-slide">
              <Link to={slide.data.permalink[lang]}>

                <div className="nomenclature">
                  <p className="type">{slide.model && <span> {IsModel(slide.model, lang)} </span>}</p>
                  {/* Sur cette derniere ligne ? Comment trouver le sous-type ?*/}
                  {/* <p className="sous-type"><a href="#">Communication</a></p> */}
                </div>

                {/* If Activité */}
                {slide.model === 'activities' &&
                <>
                { lang === 'fr' ?
                <h1 data-level-1="baseline">{slide.data.baseline && <span> {slide.data.baseline.fr} </span>}</h1> :
										console.log(lang)
									}
                <h2 data-level-2="name">{slide.data.name && <span> {slide.data.name} </span> }</h2>
              </>
								}

                {/* If Production */}
                {slide.model === 'productions' &&
                <>
                { lang === 'fr' ?
                <h1 data-level-1="title">{slide.data.title && <span> {slide.data.title.fr} </span> }</h1>
											:
              <h1 data-level-1="title">{slide.data.title && <span> {slide.data.title.en} </span> }</h1>
										}
                <h2 data-level-2="author" className="author">
                <ul>
                {(slide.people || []).map(p => <li key={p.id}>{p.firstName} {p.lastName}</li>)}
              </ul>
              </h2>
              </>
								}

                {/* if News */}
                {slide.model === 'news' &&
									(lang === 'fr' ?
  <>
    <h1 data-level-1="title">{slide.data.title && <span> {slide.data.title.fr} </span>}</h1>
    <DateNews startDate={slide.data.startDate} endDate={slide.data.endDate} lang="fr" />
    <TimeNews startDate={slide.data.startDate} endDate={slide.data.endDate} />

    <h2 data-level-2="label">{slide.data.label && <span> {slide.data.label.fr} </span>}</h2>
  </>
										:
  <>
    <h1 data-level-1="title">{slide.data.title && <span> {slide.data.title.en} </span>}</h1>
    <DateNews startDate={slide.data.startDate} endDate={slide.data.endDate} lang="fr" />
    <TimeNews startDate={slide.data.startDate} endDate={slide.data.endDate} />
    <h2 data-level-2="label">{slide.data.label && slide.data.label.en}</h2>
  </>
									)
								}

                {/* Default */}
                <p className="description">{slide.data.description && (lang === 'fr' ? <span> {slide.data.description.fr} </span> : <span> {slide.data.description.en} </span>)}</p>
                <p className="more"><span>En savoir plus</span></p>
              </Link>
            </div>
          </article>
          <label htmlFor={`ss1-item-${a}`} className="slideshow--nav slideshow--nav-previous">{lang === 'fr' ? 'Aller à la slide ' + {a} : 'Go to slide ' + {a} }</label>
          <label htmlFor={`ss1-item-${z}`} className="slideshow--nav slideshow--nav-next">{lang === 'fr' ? 'Aller à la slide ' + {z} : 'Go to slide ' + {z} }</label>
        </div>
      </React.Fragment>)
			)}
    <hr />
  </section>
  	);
};

export default Slideshow;
