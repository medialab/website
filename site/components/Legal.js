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
            <li className="nav-inside-item"><a href="#use" title="Aller à la section">Finalité, accès, utilisation et disponibilité du site web</a></li>
            <li className="nav-inside-item"><a href="#PI" title="Aller à la section">Propriété Industrielle et Intellectuelle</a></li>
            <li className="nav-inside-item"><a href="#hypertext" title="Aller à la section">Les liens hypertextes</a></li>
            <li className="nav-inside-item"><a href="#images" title="Aller à la section">Images</a></li>
            <li className="nav-inside-item"><a href="#IL" title="Aller à la section">Informatique et Libertés</a></li>
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
            <p>Frédéric Mion, administrateur de la Fondation Nationale des Sciences Politiques et directeur de l’Institut d’Études Politiques de Paris.</p>

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
            <p>
            Le laboratoire chargé de l’édition et du suivi et de l’hébergement du site web est le médialab. Sciences Po s’engage à faire ses meilleurs efforts pour fournir une continuité de disponibilité du site web aux utilisateurs. Toutefois, Sciences Po ne pourra en aucun cas être tenu responsable de toute interruption de services intervenant sur le site web.
            </p>

            <h3 id="use">Finalité, accès, utilisation et disponibilité du site web</h3>
            <p>Sciences Po met tout en œuvre pour offrir aux visiteurs du site web des informations et/ou outils disponibles et vérifiés. Malgré tous les soins apportés, les informations sont fournies sans garantie d'aucune sorte. Elles sont non contractuelles, peuvent contenir des inexactitudes techniques ou typographiques et sont sujettes à modification sans préavis. Sciences Po ne saurait être tenu pour responsable d’une absence de disponibilité ou mise-à-jour des informations, d’inexactitudes, d’incomplétudes, d’erreurs et/ou de la présence d’un virus sur le site web.<br />
            Sciences Po invite les visiteurs du site web à lui faire part et à préciser la nature d’éventuelles omissions, erreurs ou corrections, en adressant un courrier électronique à l’adresse <a href="mailto:medialab@sciencespo.fr">medialab@sciencespo.fr</a>.<br />
            De même, Sciences Po ne peut être tenu responsable en cas de mauvaise utilisation du site web par le visiteur ou en cas d’indisponibilité temporaire du service (cas de force majeure, de période de maintenance ou d’incident technique, quel qu’il soit).<br />
            Il est expressément entendu par le visiteur du site web qu'en aucun cas Sciences Po ne peut être tenu responsable des dommages quelconques, directs ou indirects, matériels ou immatériels résultant notamment de la consultation et/ou de l'utilisation du site web (ou d'autres sites qui lui sont liés) et des éventuelles applications en téléchargement, comme de l'utilisation des informations textuelles ou visuelles, qui auraient pu être recueillies et notamment de tout préjudice financier ou commercial, de pertes de programmes ou de données dans son système d'information.<br />
            En utilisant ce site web, le visiteur reconnaît avoir eu la possibilité de prendre connaissance de cet avertissement.
            </p>


            <h3 id="PI">Propriété Industrielle et Intellectuelle</h3>
            <p>Sauf mentions contraires, toutes les informations reproduites sur ce site web (textes, photos, logos...) sont protégées par des droits de propriété intellectuelle détenus par Sciences Po ou par ses partenaires. Par conséquent, aucune de ces informations ne peut être reproduite, modifiée, rediffusée, traduite, exploitée commercialement ou réutilisée de quelque manière que ce soit sans l'accord préalable et écrit de Sciences Po. Le titre, la conception, la forme du site Sciences Po mais aussi son contenu tels que les descriptions, illustrations et images originales et leur organisation sont la propriété de Sciences Po.<br />
            Le code source de ce site web est libre sous licence <a href="https://www.gnu.org/licenses/agpl-3.0-standalone.html">GNU Affero General Public 3.0 (AGPL)</a> et disponible sur <a href="https://github.com/medialab/website/blob/master/LICENSE.txt">GitHub</a>.
            </p>

            <h3 id="hypertext">Les liens hypertextes</h3>
            <p>Nos pages web proposent également des liens vers d'autres sites pour lesquels nous ne sommes responsables ni de leur intégral respect aux normes d'ordre public et bonnes mœurs, d'une part, ni de leur politique de protection des données personnelles ou d'utilisation qui en seraient faites, d'autre part. En accédant à un autre site, par l'intermédiaire d'un lien hypertexte, vous acceptez que cet accès s'effectue à vos risques et périls. En conséquence, tout préjudice direct ou indirect résultant de votre accès à un autre site relié par un lien hypertexte ne peut engager la responsabilité de Sciences Po.
            </p>

            <h3 id="images">Images et iconographies</h3>
            <p>Les images du site sont libres de droit (sauf mentions contraires) ou sont la propriété de Sciences Po.</p>

            <h3 id="IL">Informatique et Libertés</h3>
            <p>En vertu du Règlement général européen sur la protection des données 2016/679 (dit “RGPD”), les données personnelles traitées sur le site web sont, selon les finalités de traitement, nécessaires à l’exécution de la mission de service public de Sciences Po (cf. en vertu de l’article 6.1.e) du Règlement général européen sur la protection des données 2016/679 (dit “RGPD”).<br />
              Ce site ne collecte aucune information personnelle, à l'exception des formulaires d'inscription à différents évènements et notamment au séminaire du médialab.<br />
              Sciences Po invite les visiteurs à informer ses services dans les plus brefs délais en cas de violation des données personnelles. Compléter alors le <a href="https://docs.google.com/forms/d/e/1FAIpQLSd9pnlOZCeB_OW00BnhYJUfvWbQsn1CytLtmZXWTapfsGDKIg/viewform">formulaire</a> ou envoyer un mail à <a href="mailto:dataprotection@sciencespo.fr">dataprotection@sciencespo.fr</a>.
              Vous pouvez exercer vos droits d'accès, de modification, de rectification ou de suppression des données personnelles vous concernant en nous écrivant :<br />
              <ul>
                  <li>par courrier : <strong>médialab, 27 rue Saint Guillaume 75337 Paris Cedex 07</strong></li>
                  <li>par courrier électronique : <strong>medialab@sciencespo.fr</strong></li>
              </ul>
              Le visiteur peut également contacter le Délégué à la Protection des Données de Sciences Po à l’adresse <a href="mailto:cnil@sciencespo.fr">cnil@sciencespo.fr</a> en seconde intention, puis adresser <a href="https://www.cnil.fr/">une réclamation à la CNIL</a>, en cas de difficultés ou questions ultérieures concernant ses droits RGPD.
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
            <p>This website does not collect any personal information, except the registration forms for different events including the médialab's seminar. To learn about, get access to or ask for access, modification, rectification or deletion of personal information we might have collected please contact:
              <br />
              <br />
              by mail: <strong>médialab, 27 rue Saint Guillaume 75337 Paris Cedex 07, France</strong>
              <br />
              by e-mail: <strong>medialab@sciencespo.fr</strong>
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
