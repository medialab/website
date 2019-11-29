import React from 'react';

export default function Legal({lang}) {
  // console.log(lang);
  if (lang === 'fr')
    // ***************************    french VERSION
    return (
      <main id="main" aria-labelledby="page-title" role="main">
        <nav className="main-nav" id="nav-inside-article" role="navigation">
          <ul>
            <li className="nav-inside-item" data-type="main"><a href="#main" title="Aller à la section">Aller en haut</a></li>
            <li className="nav-inside-item"><a href="#directeur" title="Aller à la section">Directeur de la publication</a></li>
            <li className="nav-inside-item"><a href="#host" title="Aller à la section">Hébergement</a></li>
            <li className="nav-inside-item"><a href="#PI" title="Aller à la section">Propriété Industrielle et Intellectuelle</a></li>
            <li className="nav-inside-item"><a href="#hypertext" title="Aller à la section">Les liens hypertextes</a></li>
            <li className="nav-inside-item"><a href="#images" title="Aller à la section">Images</a></li>
            <li className="nav-inside-item"><a href="#IL" title="Aller à la section">Informatique et liberté</a></li>
          </ul>
        </nav>
        <article id="about-contenu" className="main-container">
          <hgroup>
            <h1 id="page-title">Mentions légales</h1>
          </hgroup>
          <div className="about-contenu">
            <h3>Le contenu de ce site internet est fourni par :</h3>
            <p>
              <em>
                Sciences Po
                <br />
                27 rue Saint-Guillaume
                <br />
                75337 Paris Cedex 07
              </em>
            </p>
            <p>
              <nobr>Téléphone: <strong>(+33) 01 45 49 50 50</strong></nobr>
              <br />
              <nobr>Fax: <strong>(+33) 01 42 22 31 26</strong></nobr>
              <br />
              <nobr>Email: <strong>webmestre@sciencespo.fr</strong></nobr>
            </p>

            <h3 id="directeur">Directeur de la publication</h3>
            <p>Frédéric Mion, administrateur de la Fondation nationale des sciences politiques et directeur de l’Institut d’études politiques de Paris.</p>

            <h3 id="host">Hébergement</h3>
            <p>
              Ce site internet est hébergé par la Fondation Nationale des Sciences Politiques (FNSP):
              <br />
              <br />
              <em>
                Sciences Po - Direction des Systèmes d'Information
                <br />
                Code APE : 803Z
                <br />
                27, rue saint Guillaume
                <br />
                75337 Paris cedex 07
              </em>
            </p>

            <h3 id="PI">Propriété Industrielle et Intellectuelle</h3>
            <p>Toutes les informations reproduites dans ce site web (textes, photos, logos...) sont protégées par des droits de propriété intellectuelle détenus par Sciences Po ou par ses partenaires.
              Par conséquent, aucune de ces informations ne peut être reproduite, modifiée, rediffusée, traduite, exploitée commercialement ou réutilisée de quelque manière que ce soit sans l'accord préalable et écrit de Sciences Po.
              Le titre, la conception, la forme du site Sciences Po mais aussi son contenu tels que les actualités, descriptions, illustrations et images originales et leur organisation, ainsi que toute compilation de logiciels, code source fondamental et autres éléments contenus sur le site Sciences Po sont la propriété de Sciences Po.</p>

            <h3 id="hypertext">Les liens hypertextes</h3>
            <p>Nos pages web proposent également des liens vers d'autres sites pour lesquels nous ne sommes responsables ni de leur intégral respect aux normes d'ordre public et bonnes mœurs, d'une part, ni de leur politique de protection des données personnelles ou d'utilisation qui en seraient faites, d'autre part.
              En accédant à un autre site, par l'intermédiaire d'un lien hypertexte, vous acceptez que cet accès s'effectue à vos risques et périls. En conséquence, tout préjudice direct ou indirect résultant de votre accès à un autre site relié par un lien hypertexte ne peut engager la responsabilité de Sciences Po.</p>

            <h3 id="images">Images</h3>
            <p>Les images du site sont libres de droit, sauf mentions contraires.</p>

            <h3 id="IL">Informatique et Libertés</h3>
            <p>
              Droit d'accès, modification suppression des données personnelles vous concernant :
              <br />
              <br />
              par courrier : <strong>médialab, 27 rue Saint Guillaume 75337 Paris Cedex 07</strong>
              <br />
              par courrier électronique : <strong>medialab@sciencespo.fr</strong>
            </p>
          </div>
        </article>
      </main>
    );
  else
    // ***************************    ENGLISH VERSION
    return (
      <main id="main" aria-labelledby="page-title" role="main">
        <nav className="main-nav" id="nav-inside-article" role="navigation">
          <ul>
            <li className="nav-inside-item" data-type="main"><a href="#main" title="Aller à la section">Aller en haut</a></li>
            <li className="nav-inside-item"><a href="#publisher" title="Aller à la section">Publisher</a></li>
            <li className="nav-inside-item"><a href="#host" title="Aller à la section">Hosting</a></li>
            <li className="nav-inside-item"><a href="#PI" title="Aller à la section">Industrial and Intellectual Property</a></li>
            <li className="nav-inside-item"><a href="#hypertext" title="Aller à la section">Hypertext Links</a></li>
            <li className="nav-inside-item"><a href="#IL" title="Aller à la section">Personal information</a></li>
          </ul>
        </nav>
        <article id="about-contenu" className="main-container">
          <hgroup>
            <h1 id="page-title">Legal Notice</h1>
          </hgroup>
          <div className="about-contenu">
          <h3>The contents of this site are provided by:</h3>
            <p>
              <em>
                Sciences Po
                <br />
                27 rue Saint-Guillaume
                <br />
                75337 Paris Cedex 07
              </em>
            </p>
            <p>
              <nobr>Phone: <strong>(+33) 01 45 49 50 50</strong></nobr>
              <br />
              <nobr>Fax: <strong>(+33) 01 42 22 31 26</strong></nobr>
              <br />
              <nobr>Email: <strong>webmestre@sciencespo.fr</strong></nobr>
            </p>

            <h3 id="publisher">Publisher</h3>
            <p>Frédéric Mion, President of Sciences Po</p>

            <h3 id="host">Hosting</h3>
            <p>
              This website is hosted by the Fondation Nationale des Sciences Politiques (FNSP):
              <br />
              <br />
              <em>
                Sciences Po - Direction des Systèmes d'Information
                <br />
                Code APE : 803Z
                <br />
                27, rue saint Guillaume
                <br />
                75337 Paris cedex 07
              </em>
            </p>

            <h3 id="PI">Industrial and Intellectual Property</h3>
            <p>All information on this web site (text, photos, logos...) is protected by the copyrights held by Sciences Po or their partners.
              Therefore, the information may not be reproduced, modified, republished, re-aired, translated, distributed or reused in any manner, without the written consent of Sciences Po .
              The Sciences Po site’s title, concept and form, as well as its content, such as news, descriptions, illustrations and original images and their organisation, and any software compilation, source code and other elements contained on the Sciences Po site are the property of Sciences Po.</p>

            <h3 id="hypertext">Hypertext links</h3>
            <p>Our pages also contain links to other sites for which we are in no manner responsible, neither regarding their adhesion to public order or good conduct, on the one hand, nor regarding their personal data privacy policies and use, on the other.
              By accessing an outside site, through a hypertext link, you accept that this access is carried out at your own risk. Therefore, Sciences Po will in no way be held responsible for any direct or indirect damages resulting from your access to an outside site through a hypertext link.</p>

            <h3 id="IL">Personal information</h3>
            <p>
            To learn about, get access to or ask for deletion of personal information we might have collected please contact:
              <br />
              <br />
              par mail: <strong>médialab, 27 rue Saint Guillaume 75337 Paris Cedex 07</strong>
              <br />
              par email: <strong>medialab@sciencespo.fr</strong>
            </p>
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
    );
}
