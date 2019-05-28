import React from 'react';
import {Link} from 'gatsby';

import ProcessedImage from '../../helpers/ProcessedImage.js';
import {IsModel} from '../../helpers/helpers.js';
import DateNews from '../../helpers/DateNews.js';
import TimeNews from '../../helpers/TimeNews.js';
import {format as formatDate, getYear, parseISO} from 'date-fns';

// Ici nous composons l'ensemble du caroussel
const Slideshow = ({slider, lang}) => {

  const otherLang = lang === 'fr' ? 'en' : 'fr';

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
                <div className="contenu-slide">
                  <Link to={slide.data.permalink[lang]}>

                    {/* if Activité */}
                    {slide.model === 'activities' && (
                      <>
                        <aside className="bandeau">
                          <p data-icon="activities" className="type">{IsModel(slide.model, lang)}</p>
                          <p className="title">{slide.data.name}</p>
                        </aside>
                        <h1 data-level-1="baseline" >{slide.data.baseline[lang] || slide.data.baseline[otherLang]}</h1>
                        <p className="accroche">
                          {slide.data.description && (slide.data.description[lang] || slide.data.description[otherLang])}
                        </p>
                      </>
                    )}

                    {/* if Productions */}
                    {slide.model === 'productions' && (
                      <>
                        <aside className="bandeau">
                          <p data-icon="productions" className="type">{IsModel(slide.model, lang)}</p>
                          <p className="subtype-production"><span>{slide.data.typeLabel[lang]}</span></p>
                          <p className="date-production">{slide.data.date}</p>
                        </aside>
                        <h1 data-level-1="title">{slide.data.title[lang] || slide.data.title[otherLang]}</h1>
                        <h2 data-level-1="authors" className="authors">{slide.data.authors}</h2>
                      </>
                    )}

                    {/* if News */}
                    {slide.model === 'news' && (
                      <>
                        <div className="bandeau">
                          <p data-icon="news" className="type">{IsModel(slide.model, lang)}</p>
                          <p className="label-news"><span>{slide.data.label[lang] || slide.data.label[otherLang]}</span></p>
                        </div>
                        <div className="date">
                          <DateNews startDate={slide.data.startDate} endDate={slide.data.endDate} lang={lang} />
                          <TimeNews startDate={slide.data.startDate} endDate={slide.data.endDate} />
                        </div>
                        <h1 data-level-1="baseline" >{slide.data.title[lang] || slide.data.title[otherLang]}</h1>

                        <p className="accroche">
                          {slide.data.description[lang] || slide.data.description[otherLang]}
                        </p>
                      </>
                    )}

                    {/* Default */}
                    <p className="more">En savoir plus</p>
                  </Link>
                </div>
              </article>
            </div>
          </React.Fragment>)
    			)}
        </div>

        {/* bullet pour controler le caroussel*/}
        <nav className="bullets-slide">
          <label className="slideshow-bullet-label" data-slide="1" htmlFor="slide-bullet-1"></label>
          <label className="slideshow-bullet-label" data-slide="2" htmlFor="slide-bullet-2"></label>
          <label className="slideshow-bullet-label" data-slide="3" htmlFor="slide-bullet-3"></label>
        </nav>

        {/* label pour controler le caroussel*/}
        <nav className="slideshow-controls">
          {slider.map((slide, index) =>
            (<React.Fragment key={index}>
                {IsIndex(index)}
                <label htmlFor={`slide-bullet-${a}`} className="slide_controls slide_controls-previous" alt={lang === 'fr' ? 'Aller à la slide ' + a : 'Go to slide ' + a }></label>
                <label htmlFor={`slide-bullet-${z}`} className="slide_controls slide_controls-next" alt={lang === 'fr' ? 'Aller à la slide ' + z : 'Go to slide ' + z }></label>
            </React.Fragment>)
          )}
          <span className="controls"></span>
        </nav>
    </div>
    <hr />
  </section>
  	);
};

export default Slideshow;

