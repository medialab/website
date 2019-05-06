import React from 'react';
import {Link} from 'gatsby';

import ProcessedImage from '../../helpers/ProcessedImage.js';
import {IsModel} from '../../helpers/helpers.js';
import DateNews from '../../helpers/DateNews.js';
import TimeNews from '../../helpers/TimeNews.js';
import {format as formatDate, getYear, parseISO} from 'date-fns';
import RawHTML from '../../helpers/RawHtml.js';

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
        {/* index === 0 ? ( a = "3",  z = "2" ) :
					index === 1 ? ( a = "1",  z = "3" ) :
						index === 3 ? ( a = "2",  z = "4" ) : "" */}

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


        
                {/* if Activité */}
                {slide.model === 'activities' &&
									(lang === 'fr' ?
                    <>
                      <aside className="bandeau">
                        <p data-icon="activities" className="type">{IsModel(slide.model, "fr")}</p>
                        <p className="title">{slide.data.name}</p>
                      </aside>
                      <h1 data-level-1="baseline" >{slide.data.baseline.fr}</h1>
                      <p className="accroche">
                        {slide.data.description && <RawHTML html={slide.data.description.fr} />}
                      </p>  
                    </>
                  										:
                    <>
                    { /* les acitivités ne s'affichent pas en anglais, je n'ai pas trouvé pourquoi (les données ne sont pas remplies ?) */}
                    <aside className="bandeau">
                      <p data-icon="activities" className="type">{IsModel(slide.model, "en")}</p>
                      <p className="title" >{slide.data.name}</p>
                    </aside>
                    <h1 data-level-1="baseline" >{slide.data.baseline.en}</h1>
                    <p className="accroche">
                      {slide.data.description && <RawHTML html={slide.data.description.en} />}
                    </p>  
                  </>
                  )
								}
                

                



                {/* if Productions */}
                {slide.model === 'productions' &&
                (lang === 'fr' ?
                  <>
                    <aside className="bandeau">
                      <p data-icon="productions" className="type">{IsModel(slide.model, "fr")}</p>
                      {/* Don't work : */}{/* {slide.data.typeLabel !== 'media' ? <p className="subtype-production"><span>{slide.data.typeLabel.fr}</span></p> : '' } */}
                      {/* To delete when is work : */}<p className="subtype-production"><span>Article</span></p>
                      <p className="date-production">{slide.data.date}</p>
                    </aside>
                      <h1 data-level-1="title">{slide.data.title.fr}</h1>
                      <h2 data-level-1="authors" className="authors">{slide.data.authors}</h2>
                  </>
                                    :
                  <>
                  <aside className="bandeau">
                    <p data-icon="productinos" className="type">{IsModel(slide.model, "en")}</p>
                    {/* Don't work : */}{/* {slide.data.typeLabel !== 'media' ? <p className="subtype-production"><span>{slide.data.typeLabel.en}</span></p> : '' } */}
                    {/* To delete when is work : */}<p className="subtype-production"><span>Article</span></p>
                    <p className="date-production">{slide.data.date}</p>
                  </aside>
                    <h1 data-level-1="title">{slide.data.title.en}</h1>
                    <h2 data-level-1="authors" className="authors">{slide.data.authors}</h2>
                  </>
                )
                }





                {/* if News */}
                {slide.model === 'news' &&
									(lang === 'fr' ?
                    <>
                       <div className="bandeau">
                        <p data-icon="news" className="type">{IsModel(slide.model, "fr")}</p>
                        <p className="label-news"><span>{slide.data.label.fr}</span></p>
                      </div>
                      <div className="date">
                        <DateNews startDate={slide.data.startDate} endDate={slide.data.endDate} lang="fr" />
                        <TimeNews startDate={slide.data.startDate} endDate={slide.data.endDate} />
                      </div>
                      <h1 data-level-1="baseline" >{slide.data.title.fr}</h1>

                      <p className="accroche">
                        {/* don't work : */}{/* {slide.data.description && <RawHTML html={slide.data.description.fr} />} */}
                        {/* To delete when is work : */}Axel Meunier présentera une première version de la contribution d'Algoglitch au numéro 72 de Techniques&amp;Culture intitulé "En cas de panne".                        
                      </p>  

                    </>
                  										:
                    <>
                       <div className="bandeau">
                        <p data-icon="news" className="type">{IsModel(slide.model, "en")}</p>
                          <p className="label-news"><span>{slide.data.label.en}</span></p>
                      </div>
                      <div className="date">
                        <DateNews startDate={slide.data.startDate} endDate={slide.data.endDate} lang="en" />
                        <TimeNews startDate={slide.data.startDate} endDate={slide.data.endDate} />
                      </div>
                      <h1 data-level-1="baseline" >{slide.data.title.en}</h1>
                      <p className="accroche">
                        {/* don't work : */}{/* {slide.data.description && <RawHTML html={slide.data.description.en} />} */}
                        {/* To delete when is work : */}Axel Meunier présentera une première version de la contribution d'Algoglitch au numéro 72 de Techniques&amp;Culture intitulé "En cas de panne".
                      </p>  
                    </>
									)
								}

                {/* Default */}
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

