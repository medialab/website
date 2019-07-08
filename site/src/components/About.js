import React from 'react';
import {Link} from 'gatsby';

import Nav from './common/Nav.js';

import RawHtml from './helpers/RawHtml';

export default function About({lang}) {
  // console.log(lang);
  if (lang === 'fr')
    // ***************************    french VERSION
    return (
      <>
        <main id="main" aria-labelledby="page-title" role="main">
        <nav className="main-nav" id="nav-inside-article" role="navigation">
          <ul>
            <li className="nav-inside-item" data-type="main"><a href="#main" title="Aller à la section" > Aller en haut</a></li>
            <li className="nav-inside-item"><a href="#research" title="Aller à la section" >La recherche au médialab</a></li>
            <li className="nav-inside-item"><a href="#team" title="Aller à la section" >Equipe</a></li>
            <li className="nav-inside-item"><a href="#activities" title="Aller à la section" >Activités</a></li>
            <li className="nav-inside-item"><a href="#productions" title="Aller à la section" >Productions</a></li>
          </ul>
        </nav>
          <article id="about-contenu" className="main-container">
            <hgroup>
              <h1 id="page-title">Le médialab</h1>
              <h2>Laboratoire de recherche interdisciplinaire réunissant sociologues, ingénieurs et designers, le médialab mène des recherches thématiques et méthodologiques exploitant et interrogeant la place prise par le numérique dans nos sociétés.</h2>
            </hgroup>
            <div className="about-contenu">

              <h3 id="research">La recherche au médialab</h3>
              
              <p>Le numérique transforme nos sociétés mais aussi la production de la connaissance scientifique. Centrale dans l’approche développée au Médialab, la transition numérique invite à articuler trois approches fondées sur les sciences sociales, l'ingénierie et le design. Par la multitude de données qu’elle génère, la transition numérique contribue à élargir les connaissances que nous avons des différents mondes sociaux. En parallèle, elle offre des instruments d’investigation favorisant de nouveaux modes de production des savoirs à travers la modélisation, la visualisation et l’exploration interactive des corpus. Enfin elle insiste à expérimenter avec les publics et les étudiants en encourageant de nouvelles formes de réflexivité et de partage des résultats de la recherche.</p> 
              
              <p>Ces approches sont développées conjointement au sein de quatre axes thématiques :
                  <li><b>l’espace public numérique</b> où sont cartographier les transformations des espaces journalistiques et politiques sous l’effet du numérique. Les recherches qui s’y rapportent s’intéressent au nouveaux circuits de l’information, à la construction de l’agenda public et aux activités parlementaires.</li> 
                  <li><b>la transition écologique</b> dont les enjeux émergents au carrefour de la science, de la politique et des attentes de nos sociétés sont explorés à l’aide de méthodes numériques.</li>
                  <li><b>les futurs technologiques</b> explorés dans l’esprit des Science & technology studies (STS), étudient comment les nouvelles technologies de calcul de l’Intelligence artificiel pénètrent nos sociétés, en enquêtant à la fois sur la conception de ces technologies et sur les effets de leur pénétration croissante dans les mondes sociaux.</li>
                  <li><b>les études culturelles quantitatives</b> (Quantitatives Cultural studies) qui, à travers les données des musées et des institutions culturelles, s’attachent à explorer, du côté des oeuvres et de leurs circulations, les nouveaux agencements culturels de nos sociétés. Ce champs d’études porte aussi son attention sur les festivals culturels et la production des connaissances scientifiques sur la Russie.</li>
               </p>
  
              <p>Chacun des projets de recherche menés au médialab se développe dans une approche pluridisciplinaire mobilisant des compétences variées. Irrigués par les sciences sociales et les STS, ces projets se nourrissent de l'ingénierie informatique, pour affiner les enquêtes en utilisant le web comme terrain d’enquête ou la science des données comme méthode d’analyse. Ils se saisissent également de nouvelles formes de mises en situation et d’exploration des questions de recherche proposées par le design.
              Historiquement attaché à la question de la production et de la transmission des connaissances, le médialab expérimente depuis ses débuts de nouvelles formes d’interventions avec les étudiants. Tangible dans les cours dispensés par les membres de son équipe, ce lien se manifeste également par l’accueil d’un programme de recherche en pédagogies innovante qui s’ancre pleinement dans les pratiques de recherche du laboratoire.</p>
      
              <h3 id="research">Equipe</h3>
              <p>Composée d’hommes et de femmes aux compétences complémentaires, l’équipe du médialab est plurielle. Membres ou associés au laboratoire, ces profils académiques, techniques, en design, ou encore en pédagogie se combinent et travaillent ensemble pour développer une recherche se nourrissant de cette diversité.</p>

              <h3 id="research">Activités</h3>
              <p>Les activités du médialab s’articulent entre recherche et enseignement. Elles approfondissent notamment l’usage des méthodes numériques pour répondre aux enjeux contemporains en sociologie et STS. Également mobilisées au coeur d’activités pédagogiques, par exemple en mettant les étudiants en situation d’enquête, elles bénéficient d’une réflexivité très enrichissante sur nos processus de recherche. </p>

              <h3 id="research">Productions</h3>
              <p>Aux traditionnelles publications académiques s’ajoutent les “éditions web” qui projettent les activités du laboratoire dans un média interactif et ouvrent de nouveaux moyens de représentation et d’exploration visuelle des résultats. Les mises en situation -expositions, workshops, simulations, etc.- permettent d’engager des publics dans le processus de recherche et de confronter les hypothèses à la réalité du terrain.</p>

      
      
      ---
              <p>Central dans les réflexions du médialab depuis sa <span className="totip">création<span className="tip">BlaBla</span></span>, le numérique y est envisagé tant comme un objet d’étude que comme un moyen de recherche en sciences sociales. Les transformations engendrées par les technologies numériques sont sources de rapports complexes que les travaux du médialab visent à analyser et à représenter.
              Le changement de paradigme dans notre rapport au monde induit par ces nouvelles articulations  centrent les recherches autour de grands défis contemporains qui se répartissent en quatre thèmes : “espace public numérique”, “transition énergétique”, “futurs technologiques”, et “Quantitatives Cultural studies”.</p>

              <p>Chaque projet de recherche développe une approche pluridisciplinaire qui mobilise des compétences variées. Irrigués par les sciences sociales et les STS, ces projets se nourrissent au besoin de l'ingénierie informatique, ancrée dans l’ADN du médialab, pour affiner les enquêtes utilisant le web, mais aussi des nouvelles formes de mises en situation explorées par le design. </p>
              <p>--
              Faire le lien avec pédagogie:
              Un lien fort avec les activités de pédagogie
              Les nouvelles formes de pédagogie entrent pleinement
              --</p>

              <h3 id="team">Equipe</h3>
              <p>Composée d’hommes et de femmes aux compétences complémentaires, l’équipe du médialab est plurielle. Membres ou associés au laboratoire, ces profils académiques, techniques, en design, ou encore en pédagogie se combinent et travaillent ensemble pour aviver la force des activités du laboratoire.</p>
              <p><Link to="/people" className="GoTo">Découvrir les membres de l'équipe</Link></p>

              <h3 id="activities">Activités</h3>
              <p>A la fois objet de recherche et outils au service des projets, les méthodes numériques sont au coeur des activités du médialab et contribuent à nourrir la réflexion sur les enjeux contemporains tant en sociologie qu’en STS. </p>
              <p>Organisées entre recherche, enseignement et méthodes, ces activités étudient notamment la
              montée des populismes, les futurs écologiques ou encore de l’histoire de l’art numérique.</p>
              <p><Link to="/activities" className="GoTo">Voir la liste des activités</Link></p>

              <h3 id="productions">Productions</h3>
              <p>Issues des dynamiques de recherche du laboratoire combinant méthode, analyse et théorie, les productions du médialab constituent un panorama hétéroclite. Aux traditionnelles publications académiques s’ajoute un ensemble de réalisations techniques qui répondent à des problèmes de recherche récurrents. Récemment, les sites web et réalisations en situation se sont développés comme de nouvelles formes pour rendre compte des activités du laboratoire.</p>
              <p><Link to="/productions" className="GoTo">Voir la liste des productions</Link></p>

            </div>
            {/*  <aside id="inshort">
              <h3>Side chose</h3>
              <p>L’autre originalité du médialab en terme d’organisation est de s’appuyer à parts égales sur trois métiers</p>
              <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
              </ul>
            </aside>*/}
            </article>
        </main>
      </>
    );
  else 
    // ***************************    ENGLISH VERSION
    return (
      <>
        <main id="main" aria-labelledby="page-title" role="main">
        <nav className="main-nav" id="nav-inside-article" role="navigation">
          <ul>
            <li className="nav-inside-item" data-type="main"><a href="#main" title="Aller à la section" > Aller en haut</a></li>
            <li className="nav-inside-item"><a href="#research" title="Aller à la section" >La recherche au médialab</a></li>
            <li className="nav-inside-item"><a href="#team" title="Aller à la section" >Equipe</a></li>
            <li className="nav-inside-item"><a href="#activities" title="Aller à la section" >Activités</a></li>
            <li className="nav-inside-item"><a href="#productions" title="Aller à la section" >Productions</a></li>
          </ul>
        </nav>
          <article id="about-contenu" className="main-container">
            <hgroup>
              <h1 id="page-title">Le médialab</h1>
              <h2>ANGLAIS PLEASE</h2>
            </hgroup>
            <div className="about-contenu">

              <h3 id="research">La recherche au médialab</h3>

              <p>Central dans les réflexions du médialab depuis sa <span className="totip">création<span className="tip">BlaBla</span></span>, le numérique y est envisagé tant comme un objet d’étude que comme un moyen de recherche en sciences sociales. Les transformations engendrées par les technologies numériques sont sources de rapports complexes que les travaux du médialab visent à analyser et à représenter.
              Le changement de paradigme dans notre rapport au monde induit par ces nouvelles articulations  centrent les recherches autour de grands défis contemporains qui se répartissent en quatre thèmes : “espace public numérique”, “transition énergétique”, “futurs technologiques”, et “Quantitatives Cultural studies”.</p>

              <p>Chaque projet de recherche développe une approche pluridisciplinaire qui mobilise des compétences variées. Irrigués par les sciences sociales et les STS, ces projets se nourrissent au besoin de l'ingénierie informatique, ancrée dans l’ADN du médialab, pour affiner les enquêtes utilisant le web, mais aussi des nouvelles formes de mises en situation explorées par le design. </p>
              <p>--
              Faire le lien avec pédagogie:
              Un lien fort avec les activités de pédagogie
              Les nouvelles formes de pédagogie entrent pleinement
              --</p>

              <h3 id="team">Equipe</h3>
              <p>Composée d’hommes et de femmes aux compétences complémentaires, l’équipe du médialab est plurielle. Membres ou associés au laboratoire, ces profils académiques, techniques, en design, ou encore en pédagogie se combinent et travaillent ensemble pour aviver la force des activités du laboratoire.</p>
              <p><Link to="/people" className="GoTo">Découvrir les membres de l'équipe</Link></p>

              <h3 id="activities">Activités</h3>
              <p>A la fois objet de recherche et outils au service des projets, les méthodes numériques sont au coeur des activités du médialab et contribuent à nourrir la réflexion sur les enjeux contemporains tant en sociologie qu’en STS. </p>
              <p>Organisées entre recherche, enseignement et méthodes, ces activités étudient notamment la
              montée des populismes, les futurs écologiques ou encore de l’histoire de l’art numérique.</p>
              <p><Link to="/activities" className="GoTo">Voir la liste des activités</Link></p>

              <h3 id="productions">Productions</h3>
              <p>Issues des dynamiques de recherche du laboratoire combinant méthode, analyse et théorie, les productions du médialab constituent un panorama hétéroclite. Aux traditionnelles publications académiques s’ajoute un ensemble de réalisations techniques qui répondent à des problèmes de recherche récurrents. Récemment, les sites web et réalisations en situation se sont développés comme de nouvelles formes pour rendre compte des activités du laboratoire.</p>
              <p><Link to="/productions" className="GoTo">Voir la liste des productions</Link></p>

            </div>
            {/*  <aside id="inshort">
              <h3>Side chose</h3>
              <p>L’autre originalité du médialab en terme d’organisation est de s’appuyer à parts égales sur trois métiers</p>
              <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
              </ul>
            </aside>*/}
            </article>
        </main>
      </>
    );
}

