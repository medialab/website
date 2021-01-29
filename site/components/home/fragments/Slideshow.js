import React from 'react';
import Link from '../../helpers/Link';

import {I18N_MODEL, I18N_TYPE_LABELS} from '../../../i18n.js';

import ProcessedImage from '../../helpers/ProcessedImage.js';
import {ellipse} from '../../helpers/helpers.js';
import DateNews from '../../helpers/DateNews.js';
import TimeNews from '../../helpers/TimeNews.js';

const i18n = {
  fr: {
    label: 'Pages misent en avant',
    content: 'Contenu',
    lore: 'Ouvrir ce lien',
    goto: 'Aller à la slide'
  },
  en: {
    label: 'Spotlighted pages',
    content: 'Contenu',
    more: 'Open this link',
    goto: 'Go to slide'
  }
};

// Ici nous composons l'ensemble du caroussel
const Slideshow = ({slider, lang}) => {
  const otherLang = lang === 'fr' ? 'en' : 'fr';

  let slides = slider;

  // limiting number of slide to 5 maximum
  if (slider.length > 5) slides = slider.slice(0, 5);

  return (
    <section className="slideshow" id="slideshow" data-nbr-item={slides.length}>
      <div className="slideshow-container">
        {/* Bullet by default*/}
        <input
          type="radio"
          name="slide-bullet"
          id="slide-bullet-0"
          className="slideshow-bullet"
          hidden
          defaultChecked={slider.length > 1}
        />
        <label className="" htmlFor="slide-bullet-0" aria-hidden="true" />
        {slides.length > 1 &&
          slides.map((slide, index) => (
            <React.Fragment key={index}>
              <input
                type="radio"
                name="slide-bullet"
                id={`slide-bullet-${index + 1}`}
                className="slideshow-bullet"
                hidden
              />
            </React.Fragment>
          ))}

        <div className="slideshow-inner">
          {slides.map((slide, index) => (
            <React.Fragment key={index}>
              {/* Content */}
              <div
                itemScope
                itemType="https://schema.org/Thing"
                className="slideshow-item"
                data-item={index + 1}
                aria-label={i18n[lang].label}>
                <article data-type={slide.model}>
                  <Link to={slide.permalink[lang]}>
                    <div className="image-pre" aria-hidden="true">
                      <ProcessedImage
                        size="large"
                        image={
                          slide.coverImage && slide.coverImage.processed.large
                        }
                        data={slide}
                      />
                    </div>
                    <div className="image-pre-phone" aria-hidden="true">
                      <ProcessedImage
                        size="medium"
                        image={
                          slide.coverImage && slide.coverImage.processed.medium
                        }
                        data={slide}
                      />
                    </div>
                  </Link>
                  <div
                    className="contenu-slide"
                    aria-label={i18n[lang].content}>
                    <Link to={slide.permalink[lang]}>
                      {/* if Activité */}
                      {slide.model === 'activities' && (
                        <>
                          <aside className="bandeau">
                            <p data-icon="activities" className="type">
                              {I18N_MODEL[lang][slide.model]}
                            </p>
                            <p className="title">
                              {slide.name.fr || slide.name.en}
                            </p>
                          </aside>
                          <h1 data-level-1="baseline">
                            {ellipse(
                              slide.baseline[lang] || slide.baseline[otherLang],
                              65
                            )}
                          </h1>
                          <p className="accroche">
                            {slide.description &&
                              ellipse(
                                slide.description[lang] ||
                                  slide.description[otherLang],
                                160
                              )}
                          </p>
                        </>
                      )}

                      {/* if Productions */}
                      {slide.model === 'productions' && (
                        <>
                          <aside className="bandeau">
                            <p data-icon="productions" className="type">
                              {I18N_MODEL[lang][slide.model]}
                            </p>
                            <p className="subtype-production">
                              <span>
                                {I18N_TYPE_LABELS.productions[lang][slide.type]}
                              </span>
                            </p>
                            <p className="date-production">{slide.date}</p>
                          </aside>
                          <h1 data-level-1="title">
                            {ellipse(
                              slide.title[lang] || slide.title[otherLang],
                              90
                            )}
                          </h1>
                          <h2 data-level-1="authors" className="authors">
                            {ellipse(slide.authors, 110)}
                          </h2>
                        </>
                      )}

                      {/* if News */}
                      {slide.model === 'news' && (
                        <>
                          <div className="bandeau">
                            <p data-icon="news" className="type">
                              {I18N_MODEL[lang][slide.model]}
                            </p>
                            <p className="label-news">
                              <span>
                                {slide.label
                                  ? slide.label[lang] || slide.label[otherLang]
                                  : I18N_TYPE_LABELS.news[lang][slide.type]}
                              </span>
                            </p>
                          </div>
                          <div className="date">
                            <DateNews
                              startDate={slide.startDate}
                              endDate={slide.endDate}
                              lang={lang}
                            />
                            <TimeNews
                              startDate={slide.startDate}
                              endDate={slide.endDate}
                            />
                          </div>
                          <h1 data-level-1="baseline">
                            {ellipse(
                              slide.title[lang] || slide.title[otherLang],
                              49
                            )}
                          </h1>

                          {slide.description && (
                            <p className="accroche">
                              {ellipse(
                                slide.description[lang] ||
                                  slide.description[otherLang],
                                170
                              )}
                            </p>
                          )}
                        </>
                      )}

                      {/* Default */}
                      <p className="more" aria-label={i18n[lang].more}>
                        En savoir plus
                      </p>
                    </Link>
                  </div>
                </article>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* bullet pour controler le caroussel*/}
        <nav className="bullets-slide">
          {slides.length > 1 &&
            slides.map((slide, index) => {
              return (
                <label
                  key={index + 1}
                  className="slideshow-bullet-label"
                  data-slide={index + 1}
                  htmlFor={`slide-bullet-${index + 1}`}
                  aria-label={`slide ${index + 1}`}
                />
              );
            })}
        </nav>

        {/* label pour controler le caroussel*/}
        {slides.length > 1 && (
          <nav className="slideshow-controls" aria-hidden="true">
            {slides.map((slide, index) => (
              <React.Fragment key={index}>
                <label
                  htmlFor={`slide-bullet-${
                    index === 0 ? slides.length : index
                  }`}
                  className="slide_controls slide_controls-previous"
                  alt={`${i18n[lang].goto} ${
                    index === 0 ? slides.length : index
                  }`}
                />
                <label
                  htmlFor={`slide-bullet-${
                    index === slides.length - 1 ? 1 : index + 2
                  }`}
                  className="slide_controls slide_controls-next"
                  alt={`${i18n[lang].goto} ${
                    index === slides.length - 1 ? 1 : index + 2
                  }`}
                />
              </React.Fragment>
            ))}
            <span className="controls" aria-hidden="true" />
          </nav>
        )}
      </div>
      <hr />
    </section>
  );
};

export default Slideshow;
