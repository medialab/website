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

              <p>Ces approches sont développées conjointement au sein de quatre axes thématiques&thinsp;: <br />
              <br />
              <ul>
                  <li><b>l’espace public numérique</b> où sont cartographiées les transformations des espaces journalistiques et politiques sous l’effet du numérique. Les recherches qui s’y rapportent s’intéressent au nouveaux circuits de l’information, à la construction de l’agenda public et aux activités parlementaires.</li>
                  <li><b>la transition écologique</b> dont les enjeux émergents au carrefour de la science, de la politique et des attentes de nos sociétés sont explorés à l’aide de méthodes numériques.</li>
                  <li><b>les futurs technologiques</b> explorés dans l’esprit des Science & technology studies (STS), étudient comment les nouvelles technologies de calcul de l’Intelligence artificiel pénètrent nos sociétés, en enquêtant à la fois sur la conception de ces technologies et sur les effets de leur pénétration croissante dans les mondes sociaux.</li>
                  <li><b>les études culturelles quantitatives</b> (Quantitatives Cultural studies) qui, à travers les données des musées et des institutions culturelles, s’attachent à explorer, du côté des oeuvres et de leurs circulations, les nouveaux agencements culturels de nos sociétés. Ce champs d’études porte aussi son attention sur les festivals culturels et la production des connaissances scientifiques sur la Russie.</li>
               </ul>
              </p>

              <p>Chacun des projets de recherche menés au médialab se développe dans une approche pluridisciplinaire mobilisant des compétences variées. Irrigués par les sciences sociales et les STS, ces projets se nourrissent de l'ingénierie informatique, pour affiner les enquêtes en utilisant le web comme terrain d’enquête ou la science des données comme méthode d’analyse. Ils se saisissent également de nouvelles formes de mises en situation et d’exploration des questions de recherche proposées par le design.
              Historiquement attaché à la question de la production et de la transmission des connaissances, le médialab expérimente depuis ses débuts de nouvelles formes d’interventions avec les étudiants. Tangible dans les cours dispensés par les membres de son équipe, ce lien se manifeste également par l’accueil d’un programme de recherche en pédagogies innovante qui s’ancre pleinement dans les pratiques de recherche du laboratoire.</p>

              <h3 id="team">Equipe</h3>
              <p>Composée d’hommes et de femmes aux compétences complémentaires, l’équipe du médialab est plurielle. Membres ou associés au laboratoire, ces profils académiques, techniques, en design, ou encore en pédagogie se combinent et travaillent ensemble pour développer une recherche se nourrissant de cette diversité.</p>

              <p><Link to="/people" className="GoTo">Découvrir les membres de l'équipe</Link></p>

              <h3 id="activities">Activités</h3>
              <p>Les activités du médialab s’articulent entre recherche et enseignement. Elles approfondissent notamment l’usage des méthodes numériques pour répondre aux enjeux contemporains en sociologie et STS. Également mobilisées au coeur d’activités pédagogiques, par exemple en mettant les étudiants en situation d’enquête, elles bénéficient d’une réflexivité très enrichissante sur nos processus de recherche. </p>

              <p><Link to="/activities" className="GoTo">Voir la liste des activités</Link></p>

              <h3 id="productions">Productions</h3>
              <p>Aux traditionnelles publications académiques s’ajoutent les “éditions web” qui projettent les activités du laboratoire dans un média interactif et ouvrent de nouveaux moyens de représentation et d’exploration visuelle des résultats. Les mises en situation -expositions, workshops, simulations, etc.- permettent d’engager des publics dans le processus de recherche et de confronter les hypothèses à la réalité du terrain.</p>

              <p><Link to="/productions" className="GoTo">Voir la liste des productions</Link></p>

            </div>
            </article>
        </main>
      </>
    );
  else
    // ***************************    ENGLISH VERSION
    return (
      <>        <main id="main" aria-labelledby="page-title" role="main">
        <nav className="main-nav" id="nav-inside-article" role="navigation">
          <ul>
            <li className="nav-inside-item" data-type="main"><a href="#main" title="Aller à la section" > Go to the Top</a></li>
            <li className="nav-inside-item"><a href="#research" title="Aller à la section" >Research at the médialab</a></li>
            <li className="nav-inside-item"><a href="#team" title="Aller à la section" >Team</a></li>
            <li className="nav-inside-item"><a href="#activities" title="Aller à la section" >Activities</a></li>
            <li className="nav-inside-item"><a href="#productions" title="Aller à la section" >Productions</a></li>
          </ul>
        </nav>
          <article id="about-contenu" className="main-container">
            <hgroup>
              <h1 id="page-title">The médialab</h1>
              <h2>The Médialab, an interdisciplinary research laboratory comprised of sociologists, engineers and designers, conducts thematic and methodological research to investigate the role of digital technology in our societies.</h2>            </hgroup>
            <div className="about-contenu">

              <h3 id="research">Research at the médialab</h3>

              <p>Digital technology is transforming our societies on the whole and the production of scientific knowledge in particular. The digital turn, central to the approach developed at the Médialab, calls for the articulation of three research approaches, drawn from the social sciences, engineering, and design. Through the multitude of data that it generates, the digital turn contributes to deepening our understanding of different social worlds. At the same time, it offers investigative tools that spawn new forms of knowledge production through the modelling, visualization and interactive exploration of data. Finally, it fosters experimentation with the public and students by encouraging new forms of reflexivity and new ways of sharing research results.</p>

              <p>These research approaches are developed jointly around four main themes:  <br />
              <br />
              <ul>
                  <li><b>the digital public space</b>, mapping the transformations of journalistic and political spaces under the impact of digital technology. Research in this field focuses on new information channels, the shaping of the public agenda, and parliamentary activities;</li>
                  <li><b>the environmental turn</b>, using digital methods to explore emerging issues at the crossroads between science, politics and societal expectations;</li>
                  <li><b>technological futures</b>, adopting a Science & Technology Studies (STS) perspective to study how new artificial intelligence computation technology is penetrating our societies, investigating both the design of this technology and the effects of its increasing penetration into social realms;</li>
                  <li><b>Quantitative Cultural studies</b> which, drawing on data from museums and cultural institutions, endeavour to explore our societies’ new forms of organization of culture with respect to works and their circulation. This field of study is also concerned with cultural festivals and the production of scientific knowledge about Russia.</li>
              </ul>
              </p>

              <p>Every research project carried out at the Médialab follows a multidisciplinary approach mobilizing a variety of competences. These projects, informed by social science and STS, apply computer engineering to refine investigation by using the Web as a field of inquiry and data science as an analytical method. They also employ new forms of situated testing and exploration of the research questions raised by design.
                The Médialab is historically committed to studying the production and transmission of knowledge, and has experimented with new forms of teaching since its inception. This connection with students is evident in the courses taught by the members of the Medialab team, and is also reflected by the research programme it hosts on innovative teaching, fully informed by the laboratory's research practices.</p>

              <h3 id="team">Team</h3>

              <p>The Médialab is a diverse research team, comprised of men and women with complementary skills. As members or partners of the laboratory, these academic, technical, design and teaching experts join forces and work together to develop research that draws on this diversity.</p>
              <p><Link to="/people" className="GoTo">Découvrir les membres de l'équipe</Link></p>

              <h3 id="research">Activities</h3>

              <p>The Médialab’s activities articulate both research and teaching. In particular, they explore the use of digital methods to address contemporary issues in sociology and STS. These methods are also central to the laboratory’s teaching, for example by putting students in research situations. This fosters highly enriching reflection on our research processes. </p>

              <p><Link to="/activities" className="GoTo">Voir la liste des activités</Link></p>

              <h3 id="production">Productions</h3>

              <p>In addition to traditional academic publications, "Web publications" also disseminate the laboratory's activities through an interactive medium that opens up new ways of representing and visually exploring findings. Situations – exhibitions, workshops, simulations, etc. – allow for the public’s involvement in the research process and the testing of hypotheses against the reality on the ground</p>

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

