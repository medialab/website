import React from 'react';
import Link from './helpers/Link';

import PageMeta from './helpers/PageMeta.js';

export default function About({lang}) {

  if (lang === 'fr')
    // ***************************    french VERSION
    return (
      <>
        <PageMeta
          lang={lang}
          title={'À propos | médialab Sciences Po'}
          description={'Laboratoire de recherche interdisciplinaire, le médialab est un lieu de conception, de développement et d\'expérimentation de méthodes numériques hybrides pour nourrir des questions scientifiques ancrées dans le périmètre des Sciences humaines et sociales.'} />
        <main id="main" aria-labelledby="page-title" role="main">
          <nav className="main-nav" id="nav-inside-article" role="navigation">
            <ul>
              <li className="nav-inside-item" data-type="main"><a href="#main" title="Aller à la section" > Aller en haut</a></li>
              <li className="nav-inside-item"><a href="#research" title="Aller à la section" >La recherche au médialab</a></li>
              <li className="nav-inside-item"><a href="#team" title="Aller à la section" >Équipe</a></li>
              <li className="nav-inside-item"><a href="#activities" title="Aller à la section" >Activités</a></li>
              <li className="nav-inside-item"><a href="#productions" title="Aller à la section" >Productions</a></li>
              <li className="nav-inside-item"><a href="#deontology" title="Aller à la section" >Éthique et déontologie</a></li>
              <li className="nav-inside-item"><a href="#contact" title="Aller à la section" >Contact</a></li>
            </ul>
          </nav>
          <article id="about-contenu" className="main-container">
            <hgroup>
              <h1 id="page-title">Le médialab</h1>
              <h2>Laboratoire de recherche interdisciplinaire réunissant sociologues, ingénieurs et designers, le médialab mène des recherches thématiques et méthodologiques exploitant et interrogeant la place prise par le numérique dans nos sociétés.</h2>
            </hgroup>
            <div className="about-contenu">

              <h3 id="research">La recherche au médialab</h3>

              <p>Le numérique transforme nos sociétés mais aussi la production de la connaissance scientifique. Centrale dans l’approche développée au médialab, la transition numérique invite à articuler trois approches fondées sur les sciences sociales, l'ingénierie et le design. Par la multitude de données qu’elle génère, la transition numérique contribue à élargir les connaissances que nous avons des différents mondes sociaux. En parallèle, elle offre des instruments d’investigation favorisant de nouveaux modes de production des savoirs à travers la modélisation, la visualisation et l’exploration interactive des corpus. Enfin elle insiste à expérimenter avec les publics et les étudiants en encourageant de nouvelles formes de réflexivité et de partage des résultats de la recherche.</p>

              <p>Ces approches sont développées conjointement au sein de quatre axes thématiques&thinsp;: <br />
                <br />
                <ul>
                  <li><b>l’espace public numérique</b> où sont cartographiées les transformations des espaces journalistiques et politiques sous l’effet du numérique. Les recherches qui s’y rapportent s’intéressent au nouveaux circuits de l’information, à la construction de l’agenda public et aux activités parlementaires.</li>
                  <li><b>la transition écologique</b> dont les enjeux émergents au carrefour de la science, de la politique et des attentes de nos sociétés sont explorés à l’aide de méthodes numériques.</li>
                  <li><b>les futurs technologiques</b> explorés dans l’esprit des Science &amp; technology studies (STS), étudient comment les nouvelles technologies de calcul de l’Intelligence artificiel pénètrent nos sociétés, en enquêtant à la fois sur la conception de ces technologies et sur les effets de leur pénétration croissante dans les mondes sociaux.</li>
                  <li><b>les études culturelles quantitatives</b> (Quantitatives Cultural studies) qui, à travers les données des musées et des institutions culturelles, s’attachent à explorer, du côté des oeuvres et de leurs circulations, les nouveaux agencements culturels de nos sociétés. Ce champs d’études porte aussi son attention sur les festivals culturels et la production des connaissances scientifiques sur la Russie.</li>
                </ul>
              </p>

              <p>Chacun des projets de recherche menés au médialab se développe dans une approche pluridisciplinaire mobilisant des compétences variées. Irrigués par les sciences sociales et les STS, ces projets se nourrissent de l'ingénierie informatique, pour affiner les enquêtes en utilisant le web comme terrain d’enquête ou la science des données comme méthode d’analyse. Ils se saisissent également de nouvelles formes de mises en situation et d’exploration des questions de recherche proposées par le design.
              Historiquement attaché à la question de la production et de la transmission des connaissances, le médialab expérimente depuis ses débuts de nouvelles formes d’interventions avec les étudiants. Tangible dans les cours dispensés par les membres de son équipe, ce lien se manifeste également par l’accueil d’un programme de recherche en pédagogies innovante qui s’ancre pleinement dans les pratiques de recherche du laboratoire.</p>

              <h3 id="team">Équipe</h3>
              <p>Composée d’hommes et de femmes aux compétences complémentaires, l’équipe du médialab est plurielle. Membres ou associés au laboratoire, ces profils spécialisés en sciences sociales, en méthodes numériques ou encore en design se combinent et travaillent ensemble pour développer une recherche se nourrissant de cette diversité.</p>

              <p><Link to="/equipe" className="GoTo">Découvrir les membres de l'équipe</Link></p>

              <h3 id="activities">Activités</h3>
              <p>Les activités du médialab s’articulent entre recherche et enseignement. Elles approfondissent notamment l’usage des méthodes numériques pour répondre aux enjeux contemporains en sociologie et STS. Également mobilisées au coeur d’activités pédagogiques, par exemple en mettant les étudiants en situation d’enquête, elles bénéficient d’une réflexivité très enrichissante sur nos processus de recherche. </p>

              <p><Link to="/activites" className="GoTo">Consulter la liste des activités</Link></p>

              <h3 id="productions">Productions</h3>
              <p>Aux traditionnelles publications académiques s’ajoutent les “éditions web” qui projettent les activités du laboratoire dans un média interactif et ouvrent de nouveaux moyens de représentation et d’exploration visuelle des résultats. Les mises en situation -expositions, workshops, simulations, etc.- permettent d’engager des publics dans le processus de recherche et de confronter les hypothèses à la réalité du terrain.</p>

              <p><Link to="/productions" className="GoTo">Consulter la liste des productions</Link></p>


              <h3 id="deontology">Éthique et déontologie</h3>
              <p>Les travaux de recherche développés au médialab s'inscrivent dans le respect de la <a href="https://www.sciencespo.fr/recherche/sites/sciencespo.fr.recherche/files/DS_DEONTO_Reglement-interieur-comite_2018-05-04.pdf">politique de déontologie de la recherche de Sciences Po</a>.</p>
              <p>Nous attachons notamment une importance particulière au respect de la vie privée. Le médialab est engagé dans une démarche de protection des données personnelles qu’il traite pour ses besoins d’activité. À ce titre, le laboratoire s’engage à respecter le Règlement général sur la protection des données 2016/679 du 27 avril 2016 (« RGPD ») et la loi Informatique et Libertés modifiée. Nos projets peuvent nous amener à collecter des données sur les réseaux sociaux mais aucune information n'est republiée autrement qu'anonymisée ou agrégée. Chacun·e peut exercer son droit d'accès, de modification, de rectification ou de suppression des données personnelles le·a concernant en nous écrivant à l'adresse suivante : medialab [at] sciencespo.fr.</p>
              <p>En accord avec notre volonté d'ouverture et de transparence, les productions du laboratoire sont par ailleurs dans leur grande majorité diffusées librement, c'est-à-dire sous conditions d'Open Access pour les publications scientifiques (voir le médialab <a href="https://hal.archives-ouvertes.fr/search/index/?q=médialab&labStructName_t=Médialab+%28Sciences+Po%29">sur HAL</a> et <a href="https://spire.sciencespo.fr/centreDetail/publications/2441/53r60a8s3kup1vc9kf4j86q90">sur SPIRE</a>) et en logiciels libres Open Source pour les développements informatiques (voir le <a href="https://github.com/medialab">compte GitHub du laboratoire</a>). Dans cette dynamique, le médialab soutient également le développement de logiciels créés par la communauté Open Source.</p>

              <h3 id="contact">Contact</h3>
              <p>
                Pour toute question, vous pouvez joindre l'équipe du médialab à l'adresse suivante:
                <br />
                <strong>medialab [at] sciencespo.fr</strong>
              </p>
              <p>
                Vous pouvez également nous joindre par téléphone au:
                <br />
                <strong>(+33) 01 45 49 53 54</strong>
              </p>
              <p>
                Enfin, vous pouvez nous écrire à l'adresse suivante :
              </p>
              <p>
                <em>
                  Sciences Po - médialab
                  <br />
                  27, rue Saint Guillaume
                  <br />
                  75337 Paris Cedex 07
                </em>
              </p>
            </div>
          </article>
        </main>
      </>
    );
  else
    // ***************************    ENGLISH VERSION
    return (
      <>
        <main id="main" aria-labelledby="page-title" role="main">
          <PageMeta
            lang={lang}
            title={'About | médialab Sciences Po'}
            description={'The médialab, an interdisciplinary research laboratory comprised of sociologists, engineers and designers, conducts thematic and methodological research to investigate the role of digital technology in our societies'} />
          <nav className="main-nav" id="nav-inside-article" role="navigation">
            <ul>
              <li className="nav-inside-item" data-type="main"><a href="#main" title="Go to section" > Go to the Top</a></li>
              <li className="nav-inside-item"><a href="#research" title="Go to section" >Research at the médialab</a></li>
              <li className="nav-inside-item"><a href="#team" title="Go to section" >Team</a></li>
              <li className="nav-inside-item"><a href="#activities" title="Go to section" >Activities</a></li>
              <li className="nav-inside-item"><a href="#productions" title="Go to section" >Productions</a></li>
              <li className="nav-inside-item"><a href="#deontology" title="Go to section" >Ethics and deontology</a></li>
              <li className="nav-inside-item"><a href="#contact" title="Go to section" >Contact</a></li>
            </ul>
          </nav>
          <article id="about-contenu" className="main-container">
            <hgroup>
              <h1 id="page-title">The médialab</h1>
              <h2>The médialab, an interdisciplinary research laboratory comprised of sociologists, engineers and designers, conducts thematic and methodological research to investigate the role of digital technology in our societies.</h2>            </hgroup>
            <div className="about-contenu">

              <h3 id="research">Research at the médialab</h3>

              <p>Digital technology is transforming our societies on the whole and the production of scientific knowledge in particular. The digital turn, central to the approach developed at the médialab, calls for the articulation of three research approaches, drawn from the social sciences, engineering, and design. Through the multitude of data that it generates, the digital turn contributes to deepening our understanding of different social worlds. At the same time, it offers investigative tools that spawn new forms of knowledge production through the modelling, visualization and interactive exploration of data. Finally, it fosters experimentation with the public and students by encouraging new forms of reflexivity and new ways of sharing research results.</p>

              <p>These research approaches are developed jointly around four main themes:  <br />
                <br />
                <ul>
                  <li><b>the digital public space</b>, mapping the transformations of journalistic and political spaces under the impact of digital technology. Research in this field focuses on new information channels, the shaping of the public agenda, and parliamentary activities;</li>
                  <li><b>the environmental turn</b>, using digital methods to explore emerging issues at the crossroads between science, politics and societal expectations;</li>
                  <li><b>technological futures</b>, adopting a Science &amp; Technology Studies (STS) perspective to study how new artificial intelligence computation technology is penetrating our societies, investigating both the design of this technology and the effects of its increasing penetration into social realms;</li>
                  <li><b>Quantitative Cultural studies</b> which, drawing on data from museums and cultural institutions, endeavour to explore our societies’ new forms of organization of culture with respect to works and their circulation. This field of study is also concerned with cultural festivals and the production of scientific knowledge about Russia.</li>
                </ul>
              </p>

              <p>Every research project carried out at the médialab follows a multidisciplinary approach mobilizing a variety of competences. These projects, informed by social science and STS, apply computer engineering to refine investigation by using the Web as a field of inquiry and data science as an analytical method. They also employ new forms of situated testing and exploration of the research questions raised by design.
                The médialab is historically committed to studying the production and transmission of knowledge, and has experimented with new forms of teaching since its inception. This connection with students is evident in the courses taught by the members of the médialab team, and is also reflected by the research programme it hosts on innovative teaching, fully informed by the laboratory's research practices.</p>

              <h3 id="team">Team</h3>

              <p>The médialab is a diverse research team, comprised of men and women with complementary skills. As members or partners of the laboratory, these social sciences, digital methods and design experts join forces and work together to develop research that draws on this diversity.</p>
              <p><Link to="/en/people" className="GoTo">Discover the médialab's team</Link></p>

              <h3 id="activities">Activities</h3>

              <p>The médialab’s activities articulate both research and teaching. In particular, they explore the use of digital methods to address contemporary issues in sociology and STS. These methods are also central to the laboratory’s teaching, for example by putting students in research situations. This fosters highly enriching reflection on our research processes. </p>

              <p><Link to="/en/activities" className="GoTo">Learn more about the médialab's activities</Link></p>

              <h3 id="productions">Productions</h3>

              <p>In addition to traditional academic publications, "Web publications" also disseminate the laboratory's activities through an interactive medium that opens up new ways of representing and visually exploring findings. Situations – exhibitions, workshops, simulations, etc. – allow for the public’s involvement in the research process and the testing of hypotheses against the reality on the ground.</p>

              <p><Link to="/en/productions" className="GoTo">Learn more about the médialab's productions</Link></p>

              <h3 id="deontology">Ethics and deontology</h3>
              <p>The research activities developed at médialab are in line with <a href="https://www.sciencespo.fr/recherche/sites/sciencespo.fr.recherche/files/DS_DEONTO_Reglement-interieur-comite_2018-05-04.pdf">Sciences Po's research ethics rules and policy</a>.</p>
              <p>In particular, we take a strong stand to respect privacy issues. Médialab is committed to the protection of personal data which it processes for its research needs. As such, the laboratory undertakes to comply with the General Data Protection Regulation 2016/679 of April 27, 2016 ("GDPR") and the amended Data Protection Act (Loi Informatique et Libertés). Our projects can lead us to collect data on social networks but no information is republished other than anonymized or aggregated. Everyone can exercise their rights to access, modify, rectify or delete personal data concerning them by writing to us at the following address: medialab [at] sciencespo.fr.</p>
              <p>In accordance with our desire for openness and transparency, the laboratory's productions are also largely distributed freely and openly, that is to say under Open Access conditions for scientific publications (see médialab <a href="https://hal.archives-ouvertes.fr/search/index/?q=médialab&labStructName_t=Médialab+%28Sciences+Po%29">on HAL</a> and <a href="https://spire.sciencespo.fr/centreDetail/publications/2441/53r60a8s3kup1vc9kf4j86q90">on SPIRE</a>) and as Free Libre Open Source Software for IT developments (see <a href="https://github.com/medialab">the laboratory's GitHub account</a>). In this dynamic, médialab also supports the development of software created by the Open Source community.</p>

              <h3 id="contact">Contact</h3>
              <p>
                For any inquiries, please send an email to:
                <br />
                <strong>medialab [at] sciencespo.fr</strong>
              </p>
              <p>
              You can also call us:
                <br />
                <strong>(+33) 01 45 49 53 54</strong>
              </p>
              <p>
                Finally, you can also write us to the following address:
              </p>
              <p>
                <em>
                  Sciences Po - médialab
                  <br />
                  27, rue Saint Guillaume
                  <br />
                  75337 Paris Cedex 07
                </em>
              </p>
            </div>
          </article>
        </main>
      </>
    );
}
