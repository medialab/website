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
    <div className="slideshow-container">



        {/* Bullet by default*/}
        <input
          type="radio" name="slide-bullet" id="slide-bullet-0"
          className="slideshow-bullet" hidden defaultChecked />
        <label className="" htmlFor="slide-bullet-0">
        </label>
        {slider.map((slide, index) =>
          (<React.Fragment key={index}>
            {IsIndex(index)}
            <input
              type="radio" name="slide-bullet" id={`slide-bullet-${index + 1}`}
              className="slideshow-bullet" hidden />
          </React.Fragment>)
          )}



        <div className="slideshow-inner">
        {slider.map((slide, index) =>
          (<React.Fragment key={index}>
            {/* Content */}
            <div className="slideshow-item" data-item={ index + 1 }>
              <article data-type={slide.model}>
                <Link to={slide.data.permalink[lang]}>
                  <div className="image-pre">
                    <ProcessedImage size="large" image={slide.data.coverImage && slide.data.coverImage.processed.large} />
                  </div>
                  <div className="image-pre-phone">
                    <ProcessedImage size="medium" image={slide.data.coverImage && slide.data.coverImage.processed.medium} />
                  </div>
                </Link>
                <div className="bullets-slide">
                  <label className="slideshow-bullet-label" data-type={ (index + 1) === 1 ? "active" : "passive" } htmlFor="slide-bullet-1"></label>
                  <label className="slideshow-bullet-label" data-type={ (index + 1) === 2 ? "active" : "passive" } htmlFor="slide-bullet-2"></label>
                  <label className="slideshow-bullet-label" data-type={ (index + 1) === 3 ? "active" : "passive" } htmlFor="slide-bullet-3"></label>

                </div>
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
                        <p data-icon="productions" className="type">{IsModel(slide.model, "en")}</p>
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
            </div>
          </React.Fragment>)
    			)}
        </div>



        <div className="nav">
          {slider.map((slide, index) =>
            (<React.Fragment key={index}>
              {/* label */}
                <label htmlFor={`slide-${a}`} className="slideshow--nav slideshow--nav-previous">{lang === 'fr' ? 'Aller à la slide ' + {a} : 'Go to slide ' + {a} }</label>
                <label htmlFor={`slide-${z}`} className="slideshow--nav slideshow--nav-next">{lang === 'fr' ? 'Aller à la slide ' + {z} : 'Go to slide ' + {z} }</label>
            }
            </React.Fragment>)
          )}
        </div>





    </div>
    <hr />
  </section>
  	);
};

export default Slideshow;

