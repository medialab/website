import React from 'react';
import { Link } from 'gatsby';
 
import DateNews from '../DateNews.js';
import TimeNews from '../TimeNews.js';
import ProcessedImage from '../../ProcessedImage.js';
import { IsModel } from '../../helpers.js';


export default function Highlight2({ highlight, lang }) {


    return (
        <>
            <section id="highlight2">
                <div className="contenu">

                    {/* {highlight.map((item, index) =>

                        <>
                            <article data-type={item.model}>
                            <Link to={item.model + "/" + item.data.slugs}>
                                <p className="type" data-type={item.model}>{IsModel(item.model, lang)}</p>
                                <div className="image-pre">
                                    <ProcessedImage size="medium" image="" />
                                </div>
                                <hgroup>

                                        {item.model === "productions" &&

                                            (item.data.title &&
                                                <>
                                                    {lang === "fr" ?
                                                        <h2 data-level-1="title">{item.data.title.fr}</h2> :
                                                        <h2 data-level-1="title">{item.data.title.en}</h2>
                                                    }
                                                    <h3 data-level-2="author" className="author">
                                                        {(item.data.author || []).map(person => <span>{person.firstName} {person.lastName}</span>)}
                                                    </h3>
                                                </>
                                            )
                                        }

yèu!                                        {item.model === "activities" &&
                                            <>
                                                {lang === "fr" ?
                                                    <h2 data-level-1="baseline">{item.data.baseline && item.data.baseline.fr}</h2> :
                                                    <h2 data-level-1="baseline">{item.data.baseline && item.data.baseline.en}</h2>
                                                }
                                                <h3 data-level-2="name">{item.data.name}</h3>
                                            </>
                                        }

                                        <p className="more"><Link to={item.model + "/" + item.data.slugs}>{lang === "fr" ? "En savoir plus" : "Get more about it"}</Link></p>
                                </hgroup>
                            </Link>
                            </article>
                        </>

                    )} */}

                    <ul className="Hprod" data-type="productions">
                        <li className="title"><h1 className="type">Productions majeurs</h1></li>
                        <li className="text" data-item="1">
                            <h2>Gaia 2.0 - Could humans add some level of self-awareness to Earth’s self-regulation?</h2>
                            <h3>Gaia</h3>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="1">
                            <p data-type="description">Ces sujets de recherche actuels portent sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="medium" image=""  />
                            </div>
                        </li>
                        <li className="text" data-item="2">
                            <h2>Une description un peu plus longue</h2>
                            <h3>Machines à prédire</h3>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="2">
                            <p data-type="description">Exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="medium" image=""  />
                            </div>
                        </li>
                        <li className="text" data-item="1">
                            <h2>Gaia 2.0 - Could humans add some level of self-awareness to Earth’s self-regulation?</h2>
                            <h3>Gaia</h3>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="1">
                            <p data-type="description">Ces sujets de recherche sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="medium" image=""  />
                            </div>
                        </li>
                        <li className="text" data-item="2">
                            <h2>Une description un peu plus longue</h2>
                            <h3>Machines à prédire</h3>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="2">
                            <p data-type="description">L’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="medium" image=""  />
                            </div>
                        </li>                                                                
                    </ul>
                    <ul className="Hactivites" data-type="activities">
                        <li className="title"><h1 className="type">Activités majeures</h1></li>
                        <li className="text" data-item="1">
                            <h2>Comment décider dans un contexte de controverse scientifique?</h2>
                            <h3>SHINRAI</h3>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="1">
                            <p data-type="description">Poisson données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="medium" image=""  />
                            </div>
                        </li>
                        <li className="text" data-item="2">
                            <h2>Comment décider dans un contexte de controverse scientifique?</h2>
                            <h3>SHINRAI</h3>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="2">
                            <p data-type="description">Ces sujets de recherche actuels portent sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="medium" image=""  />
                            </div>
                        </li>
                        <li className="text" data-item="3">
                            <h2>Comment décider dans un contexte de controverse scientifique?</h2>
                            <h3>SHINRAI</h3>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="3">
                            <p data-type="description">Ces sujets de recherche actuels portent sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="medium" image=""  />
                            </div>
                        </li> 
                        <li className="text" data-item="4">
                            <h2>Comment décider dans un contexte de controverse scientifique?</h2>
                            <h3>SHINRAI</h3>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="4">
                            <p data-type="description">Ces sujets de recherche actuels portent sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="medium" image=""  />
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

