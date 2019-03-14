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
                                                        <h1 data-level-1="title">{item.data.title.fr}</h1> :
                                                        <h1 data-level-1="title">{item.data.title.en}</h1>
                                                    }
                                                    <h2 data-level-2="author" className="author">
                                                        {(item.data.author || []).map(person => <span>{person.firstName} {person.lastName}</span>)}
                                                    </h2>
                                                </>
                                            )
                                        }

yèu!                                        {item.model === "activities" &&
                                            <>
                                                {lang === "fr" ?
                                                    <h1 data-level-1="baseline">{item.data.baseline && item.data.baseline.fr}</h1> :
                                                    <h1 data-level-1="baseline">{item.data.baseline && item.data.baseline.en}</h1>
                                                }
                                                <h2 data-level-2="name">{item.data.name}</h2>
                                            </>
                                        }

                                        <p className="more"><Link to={item.model + "/" + item.data.slugs}>{lang === "fr" ? "En savoir plus" : "Get more about it"}</Link></p>
                                </hgroup>
                            </Link>
                            </article>
                        </>

                    )} */}

                    <ul className="Hprod" data-type="productions">
                        <li className="text" data-item="1">
                            <h1>Comment décider dans un contexte de controverse scientifique?</h1>
                            <h2>SHINRAI</h2>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="1">
                            <p data-type="description">Ces sujets de recherche actuels portent sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="medium" image=""  />
                            </div>
                        </li>
                        <li className="text" data-item="2">
                            <h1>Comment décider dans un contexte de controverse scientifique?</h1>
                            <h2>SHINRAI</h2>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="2">
                            <p data-type="description">Ces sujets de recherche actuels portent sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="small" image=""  />
                            </div>
                        </li>
                        <li className="text" data-item="3">
                            <h1>Comment décider dans un contexte de controverse scientifique?</h1>
                            <h2>SHINRAI</h2>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="3">
                            <p data-type="description">Ces sujets de recherche actuels portent sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="small" image=""  />
                            </div>
                        </li> 
                        <li className="text" data-item="4">
                            <h1>Comment décider dans un contexte de controverse scientifique?</h1>
                            <h2>SHINRAI</h2>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="4">
                            <p data-type="description">Ces sujets de recherche actuels portent sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="small" image=""  />
                            </div>
                        </li>                                                                
                    </ul>
                    <ul className="Hactivites" data-type="activities">
                        <li className="text" data-item="1">
                            <h1>Comment décider dans un contexte de controverse scientifique?</h1>
                            <h2>SHINRAI</h2>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="1">
                            <p data-type="description">Ces sujets de recherche actuels portent sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="medium" image=""  />
                            </div>
                        </li>
                        <li className="text" data-item="2">
                            <h1>Comment décider dans un contexte de controverse scientifique?</h1>
                            <h2>SHINRAI</h2>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="2">
                            <p data-type="description">Ces sujets de recherche actuels portent sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="small" image=""  />
                            </div>
                        </li>
                        <li className="text" data-item="3">
                            <h1>Comment décider dans un contexte de controverse scientifique?</h1>
                            <h2>SHINRAI</h2>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="3">
                            <p data-type="description">Ces sujets de recherche actuels portent sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="small" image=""  />
                            </div>
                        </li> 
                        <li className="text" data-item="4">
                            <h1>Comment décider dans un contexte de controverse scientifique?</h1>
                            <h2>SHINRAI</h2>
                            <p class="more"><a href="#">En savoir plus</a></p>
                        </li>
                        <li className="accroche" data-item-accroche="4">
                            <p data-type="description">Ces sujets de recherche actuels portent sur l’analyse exploratoire de données complexes, l’usage du web comme terrain d’enquête et l’hybridation de la narration et de la visualisation de données dans la publication académique.</p>
                            <div class="image-pre">
                                <ProcessedImage size="small" image=""  />
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

