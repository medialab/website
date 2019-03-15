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
 			z = '4';
 		}
 	}

	return (
  <section className="slideshow" id="slideshow">
    {slider.map((slide, index) =>
      (<React.Fragment key={index}>
        {/* index === 0 ? ( a = "3",  z = "2" ) :
					index === 1 ? ( a = "1",  z = "3" ) :
						index === 3 ? ( a = "2",  z = "4" ) : "" */}

        {IsIndex(index)}

        <input
          type="radio" name="ss1" id={`ss1-item-${index + 1}`}
          className="slideshow--bullet" defaultChecked />
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
                  <p className="type">{IsModel(slide.model, lang)}</p>
                  {/* Sur cette derniere ligne ? Comment trouver le sous-type ?*/}
                  {/* <p className="sous-type"><a href="#">Communication</a></p> */}
                </div>

                {/* If Activité */}
                {slide.model === 'activities' &&
                <>
                { lang === 'fr' ?
                <h1 data-level-1="baseline">{slide.data.baseline && slide.data.baseline.fr}</h1> :
										console.log(lang)
									}
                <h2 data-level-2="name">{slide.data.name}</h2>
              </>
								}

                {/* If Production */}
                {slide.model === 'productions' &&
                <>
                { lang === 'fr' ?
                <h1 data-level-1="title">{slide.data.title && slide.data.title.fr }</h1>
											:
              <h1 data-level-1="title">{slide.data.title && slide.data.title.en }</h1>
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
    <h1 data-level-1="title">{slide.data.title && slide.data.title.fr}</h1>
    <DateNews startDate={slide.data.startDate} endDate={slide.data.endDate} lang="fr" />
    <TimeNews startDate={slide.data.startDate} endDate={slide.data.endDate} />

    <h2 data-level-2="label">{slide.data.label && slide.data.label.fr}</h2>
  </>
										:
  <>
    <h1 data-level-1="title">{slide.data.title && slide.data.title.en}</h1>
    <DateNews startDate={slide.data.startDate} endDate={slide.data.endDate} lang="fr" />
    <TimeNews startDate={slide.data.startDate} endDate={slide.data.endDate} />
    <h2 data-level-2="label">{slide.data.label && slide.data.label.en}</h2>
  </>
									)
								}

                {/* Default */}
                <p className="description">{slide.data.description && (lang === 'fr' ? slide.data.description.fr : slide.data.description.en)}</p>
                <p className="more">En savoir plus</p>
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
