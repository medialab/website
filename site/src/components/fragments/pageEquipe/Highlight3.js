import React from 'react';
import {Link} from 'gatsby';

import DateNews from '../DateNews.js';
import TimeNews from '../TimeNews.js';
import ProcessedImage from '../../ProcessedImage.js';
import {IsModel} from '../../helpers.js';


export default function Highlight2({highlight, lang}) {


    return (
      <>
        <section id="highlight3">
          <div className="contenu">

            {/* {highlight.map((item, index) =>

                        <>
                        <ul className="Hprod" data-type="productions">

                            <li className="title"><h1 className="type">{lang === "fr" ? "Productions majeures" : "Main productions" } </h1></li>

                            {item.model === "productions" &&

                                (item.data.title &&
                                    <>
                                        <li data-item="1"> // Data item a besoin d'un numero unique par liste
                                            {lang === "fr" ?
                                                <h2 data-level-1="title">{item.data.title && item.data.title.fr}</h2> :
                                                <h2 data-level-1="title">{item.data.title && item.data.title.en}</h2>
                                            }
                                            <h3 data-type="author">
                                                {(item.data.author || []).map(person => <span>{person.firstName} {person.lastName}</span>)}
                                            </h3>
                                        </li>
                                        <li className="accroche" data-item-accroche="1">
                                            {lang === "fr" ?
                                                <p data-type="description">{item.data.description && item.data.description.fr}</p> :
                                                <p data-type="description">{item.data.description && item.data.description.en}</p>
                                            }                                             <div class="image-pre">
                                                <ProcessedImage size="large" image=""  />
                                            </div>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                        <ul className="Hactivites" data-type="activities">

                            <li className="title"><h1 className="type">{lang === "fr" ? "Activités majeures" : "Main activities" } </h1></li>

                            {item.model === "activities" &&

                                (item.data.title &&
                                    <>
                                        <li data-item="1">  //
                                            {lang === "fr" ?
                                                <h2 data-level-1="baseline">{item.data.baseline && item.data.baseline.fr}</h2> :
                                                <h2 data-level-1="baseline">{item.data.baseline && item.data.baseline.en}</h2>
                                            }
                                            <h3 data-type="name"">{item.data.name}</h3>
                                        </li>
                                        <li className="accroche" data-item-accroche="1">
                                            {lang === "fr" ?
                                                <p data-type="description">{item.data.description && item.data.description.fr}</p> :
                                                <p data-type="description">{item.data.description && item.data.description.en}</p>
                                            }
                                            <div class="image-pre">
                                                <ProcessedImage size="large" image=""  />
                                            </div>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                        </>

                    )} */}

                    {/* TEST */}

                    <h1 className="type">Productions majeures</h1>
                    <ul className="Hprod" data-type="productions">
                        <li data-item="1">
                            <div className="texte">
                                <p data-item="1" className="numero">1</p>
                                <div class="type"> </div>
                                <Link to="/"><h2>Gaia 2.0 - Could humans add some level of self-awareness to Earth’s self-regulation?</h2></Link>
                                <h3>Authors</h3>
                            </div>
                            <div className="image-pre">
                                <ProcessedImage size="large" image="" />
                            </div>
                            <div className="complement">
                                <p data-type="description">Ces sujets de recherche sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                                <p data-type="time"> 2008 - 2018</p>
                            </div>
                        </li>
                        <li data-item="2">
                            <div className="texte">
                                <p data-item="2" className="numero">2</p>
                                <div class="type"> </div>
                                <Link to="/"><h2>Gaia 2.0 - Could humans add some level of self-awareness to Earth’s self-regulation?</h2></Link>
                                <h3>Authors</h3> 
                            </div>
                            <div className="image-pre">
                                <ProcessedImage size="large" image="" />
                            </div>
                            <div className="complement">
                                <p data-type="description">Ces sujets de recherche sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                                <p data-type="time"> 2008 - 2018</p>
                            </div>                           
                        </li>
                        <li data-item="3">
                            <div className="texte">
                                <p data-item="3" className="numero">3</p>
                                <div class="type"> </div>
                                <Link to="/"><h2>Gaia 2.0 - Could humans add some level of self-awareness to Earth’s self-regulation?</h2></Link>
                                <h3>Authors</h3>
                            </div>
                            <div className="image-pre">
                                <ProcessedImage size="large" image="" />
                            </div>
                            <div className="complement">
                                <p data-type="description">Ces sujets de recherche sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                                <p data-type="time"> 2008 - 2018</p>
                            </div>
                        </li>
                    </ul>
                    {/* END TEST */}
        

          </div>
        </section>
      </>
    );
}
