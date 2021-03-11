import React from 'react';

export default function Legal({lang}) {
  // console.log(lang);
  if (lang === 'fr')
    // ***************************    french VERSION
    return (
      <main id="main" aria-labelledby="page-title" role="main">
        <nav className="main-nav" id="nav-inside-article" role="navigation">
          <ul>
            <li className="nav-inside-item" data-type="main">
              <a href="#main" title="Aller à la section">
                Aller en haut
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#directeur" title="Aller à la section">
                Directeur de la publication
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#host" title="Aller à la section">
                Hébergement
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#use" title="Aller à la section">
                Finalité, accès, utilisation et disponibilité du site web
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#PI" title="Aller à la section">
                Propriété Industrielle et Intellectuelle
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#hypertext" title="Aller à la section">
                Les liens hypertextes
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#images" title="Aller à la section">
                Images
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#IL" title="Aller à la section">
                Informatique et Libertés
              </a>
            </li>
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
              <nobr>
                Téléphone: <strong>(+33) 01 45 49 50 50</strong>
              </nobr>
              <br />
              <nobr>
                Fax: <strong>(+33) 01 42 22 31 26</strong>
              </nobr>
              <br />
              <nobr>
                Email: <strong>webmestre@sciencespo.fr</strong>
              </nobr>
            </p>

            <h3 id="directeur">Directeur de la publication</h3>
            <p>
              Bénédicte Durand, administratrice provisoire de l’Institut
              d’études politiques de Paris et de la Fondation nationale des
              sciences politiques.
            </p>

            <h3 id="host">Hébergement</h3>
            <p>
              Ce site internet est hébergé par la Fondation Nationale des
              Sciences Politiques (FNSP):
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
              Le laboratoire chargé de l’édition et du suivi et de l’hébergement
              du site web est le médialab. Sciences Po s’engage à faire ses
              meilleurs efforts pour fournir une continuité de disponibilité du
              site web aux utilisateurs. Toutefois, Sciences Po ne pourra en
              aucun cas être tenu responsable de toute interruption de services
              intervenant sur le site web.
            </p>

            <h3 id="use">
              Finalité, accès, utilisation et disponibilité du site web
            </h3>
            <p>
              Sciences Po met tout en œuvre pour offrir aux visiteurs du site
              web des informations et/ou outils disponibles et vérifiés. Malgré
              tous les soins apportés, les informations sont fournies sans
              garantie d'aucune sorte. Elles sont non contractuelles, peuvent
              contenir des inexactitudes techniques ou typographiques et sont
              sujettes à modification sans préavis. Sciences Po ne saurait être
              tenu pour responsable d’une absence de disponibilité ou
              mise-à-jour des informations, d’inexactitudes, d’incomplétudes,
              d’erreurs et/ou de la présence d’un virus sur le site web.
            </p>

            <p>
              Sciences Po invite les visiteurs du site web à lui faire part et à
              préciser la nature d’éventuelles omissions, erreurs ou
              corrections, en adressant un courrier électronique à l’adresse{' '}
              <a href="mailto:medialab@sciencespo.fr">medialab@sciencespo.fr</a>
              .
            </p>
            <p>
              De même, Sciences Po ne peut être tenu responsable en cas de
              mauvaise utilisation du site web par le visiteur ou en cas
              d’indisponibilité temporaire du service (cas de force majeure, de
              période de maintenance ou d’incident technique, quel qu’il soit).
            </p>
            <p>
              Il est expressément entendu par le visiteur du site web qu'en
              aucun cas Sciences Po ne peut être tenu responsable des dommages
              quelconques, directs ou indirects, matériels ou immatériels
              résultant notamment de la consultation et/ou de l'utilisation du
              site web (ou d'autres sites qui lui sont liés) et des éventuelles
              applications en téléchargement, comme de l'utilisation des
              informations textuelles ou visuelles, qui auraient pu être
              recueillies et notamment de tout préjudice financier ou
              commercial, de pertes de programmes ou de données dans son système
              d'information.
            </p>
            <p>
              En utilisant ce site web, le visiteur reconnaît avoir eu la
              possibilité de prendre connaissance de cet avertissement.
            </p>

            <h3 id="PI">Propriété Industrielle et Intellectuelle</h3>
            <p>
              Sauf mentions contraires, toutes les informations reproduites sur
              ce site web (textes, photos, logos...) sont protégées par des
              droits de propriété intellectuelle détenus par Sciences Po ou par
              ses partenaires. Par conséquent, aucune de ces informations ne
              peut être reproduite, modifiée, rediffusée, traduite, exploitée
              commercialement ou réutilisée de quelque manière que ce soit sans
              l'accord préalable et écrit de Sciences Po. Le titre, la
              conception, la forme du site Sciences Po mais aussi son contenu
              tels que les descriptions, illustrations et images originales et
              leur organisation sont la propriété de Sciences Po.
            </p>
            <p>
              Le code source de ce site web est libre sous licence{' '}
              <a href="https://www.gnu.org/licenses/agpl-3.0-standalone.html">
                GNU Affero General Public 3.0 (AGPL)
              </a>{' '}
              et disponible sur{' '}
              <a href="https://github.com/medialab/website/blob/master/LICENSE.txt">
                GitHub
              </a>
              .
            </p>

            <h3 id="hypertext">Les liens hypertextes</h3>
            <p>
              Nos pages web proposent également des liens vers d'autres sites
              pour lesquels nous ne sommes responsables ni de leur intégral
              respect aux normes d'ordre public et bonnes mœurs, d'une part, ni
              de leur politique de protection des données personnelles ou
              d'utilisation qui en seraient faites, d'autre part. En accédant à
              un autre site, par l'intermédiaire d'un lien hypertexte, vous
              acceptez que cet accès s'effectue à vos risques et périls. En
              conséquence, tout préjudice direct ou indirect résultant de votre
              accès à un autre site relié par un lien hypertexte ne peut engager
              la responsabilité de Sciences Po.
            </p>

            <h3 id="images">Images et iconographies</h3>
            <p>
              Les images du site sont libres de droit (sauf mentions contraires)
              ou sont la propriété de Sciences Po.
            </p>

            <h3 id="IL">Informatique et Libertés</h3>
            <p>
              En vertu du Règlement général européen sur la protection des
              données 2016/679 (dit “RGPD”), les données personnelles traitées
              sur le site web sont, selon les finalités de traitement,
              nécessaires à l’exécution de la mission de service public de
              Sciences Po (cf. en vertu de l’article 6.1.e) du Règlement général
              européen sur la protection des données 2016/679 (dit “RGPD”).
            </p>
            <p>
              Ce site ne collecte aucune information personnelle, à l'exception
              des formulaires d'inscription à différents évènements et notamment
              au séminaire du médialab.
            </p>
            <p>
              Sciences Po invite les visiteurs à informer ses services dans les
              plus brefs délais en cas de violation des données personnelles.
              Complétez alors le{' '}
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSd9pnlOZCeB_OW00BnhYJUfvWbQsn1CytLtmZXWTapfsGDKIg/viewform">
                formulaire
              </a>{' '}
              ou envoyez un mail à{' '}
              <a href="mailto:dataprotection@sciencespo.fr">
                dataprotection@sciencespo.fr
              </a>
              . Vous pouvez exercer vos droits d'accès, de modification, de
              rectification ou de suppression des données personnelles vous
              concernant en nous écrivant :
            </p>
            <ul>
              <li>
                par courrier :{' '}
                <strong>
                  médialab, 27 rue Saint Guillaume 75337 Paris Cedex 07
                </strong>
              </li>
              <li>
                par courrier électronique :{' '}
                <strong>medialab@sciencespo.fr</strong>
              </li>
            </ul>
            <p>
              Le visiteur peut également contacter le Délégué à la Protection
              des Données de Sciences Po à l’adresse{' '}
              <a href="mailto:cnil@sciencespo.fr">cnil@sciencespo.fr</a> en
              seconde intention, puis adresser{' '}
              <a href="https://www.cnil.fr/">une réclamation à la CNIL</a>, en
              cas de difficultés ou questions ultérieures concernant ses droits
              RGPD.
            </p>
          </div>
        </article>
      </main>
    );
  // ***************************    ENGLISH VERSION
  else
    return (
      <main id="main" aria-labelledby="page-title" role="main">
        <nav className="main-nav" id="nav-inside-article" role="navigation">
          <ul>
            <li className="nav-inside-item" data-type="main">
              <a href="#main" title="Aller à la section">
                Aller en haut
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#publisher" title="Aller à la section">
                Publications Director
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#host" title="Aller à la section">
                Web Hosting
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#purpose" title="Aller à la section">
                Purpose, access, use and availability of the website
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#PI" title="Aller à la section">
                Industrial and Intellectual Property
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#hypertext" title="Aller à la section">
                Hyperlinks
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#images" title="Aller à la section">
                Images
              </a>
            </li>
            <li className="nav-inside-item">
              <a href="#IL" title="Aller à la section">
                Information Technology and Liberties
              </a>
            </li>
          </ul>
        </nav>
        <article id="about-contenu" className="main-container">
          <hgroup>
            <h1 id="page-title">Legal Notice</h1>
          </hgroup>
          <div className="about-contenu">
            <h3>The contents of this website is provided by:</h3>
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
              <nobr>
                Phone: <strong>(+33) 01 45 49 50 50</strong>
              </nobr>
              <br />
              <nobr>
                Fax: <strong>(+33) 01 42 22 31 26</strong>
              </nobr>
              <br />
              <nobr>
                Email: <strong>webmestre@sciencespo.fr</strong>
              </nobr>
            </p>

            <h3 id="publisher">Publications Director</h3>
            <p>
              Bénédicte Durand, Interim Administrator of the Institut d’études
              politiques de Paris and the Fondation nationale des sciences
              politiques.
            </p>

            <h3 id="host">Web Hosting</h3>
            <p>
              This website is hosted by the Fondation Nationale des Sciences
              Politiques (FNSP):
              <br />
              <br />
              <em>
                Sciences Po - Information Systems Department
                <br />
                Code APE : 803Z
                <br />
                27, rue saint Guillaume
                <br />
                75337 Paris cedex 07
              </em>
            </p>

            <h3 id="purpose">
              Purpose, access, use and availability of the website
            </h3>

            <p>
              Sciences Po makes every effort to provide website visitors with
              available and verified information and/or tools. Despite all the
              care taken, the information is provided without any guarantee of
              any kind. It is non-contractual, may contain technical or
              typographical inaccuracies and is subject to change without prior
              notice. Sciences Po cannot be held liable for any lack in
              availability or updates of information, for inaccuracies,
              incompleteness and/or errors, or for the presence of a virus on
              the website.
            </p>

            <p>
              Website visitors are encouraged to inform Sciences Po of any
              specific omissions, errors or necessary corrections they may
              identify, by sending an email to the following address{' '}
              <a href="mailto:medialab@sciencespo.fr">medialab@sciencespo.fr</a>
              .
            </p>

            <p>
              Furthermore, Sciences Po cannot be held liable if visitors misuse
              the website or in the event of temporary unavailability of the
              service (force majeure, maintenance period or technical incident
              of any kind).
            </p>

            <p>
              It is expressly understood by visitors to the website that
              Sciences Po can under no circumstances be held liable for any
              direct or indirect, material or immaterial damage whatsoever
              resulting from visits to and/or use of the website (or other
              websites linked to it), or from downloading content from it or
              using textual or visual information that may have been collected
              on it or from it. In particular, Sciences Po cannot be held liable
              for any financial or commercial loss, and especially for the loss
              of programmes or data in its information system.
            </p>

            <p>
              By using this website, the visitor acknowledges having had the
              opportunity to read this notice.
            </p>

            <h3 id="PI">Industrial and Intellectual Property</h3>
            <p>
              Unless otherwise stated, all information reproduced on this
              website (texts, photos, logos, etc.) is protected by intellectual
              property rights held by Sciences Po or its partners. Consequently,
              none of this information may be reproduced, modified,
              redistributed, translated, commercially exploited or reused in any
              way whatsoever without prior written consent from Sciences Po. The
              title, design and form of the Sciences Po website as well as its
              content such as descriptions, illustrations and original images
              and their organization are the property of Sciences Po.
            </p>

            <p>
              The source code of this website is free under the{' '}
              <a href="https://www.gnu.org/licenses/agpl-3.0-standalone.html">
                GNU Affero General Public 3.0 (AGPL)
              </a>{' '}
              license and available on{' '}
              <a href="https://github.com/medialab/website/blob/master/LICENSE.txt">
                GitHub
              </a>
              .
            </p>

            <h3 id="hypertext">Hyperlinks</h3>
            <p>
              Our web pages also provide links to third-party websites. Sciences
              Po cannot be held responsible for those websites’ full compliance
              with government regulations and moral standards, nor for their
              personal data protection policy and use of personal data. When
              accessing another website via a hypertext link, visitors agree
              that such access is at their own risk. Consequently, Sciences Po
              cannot be held liable for any direct or indirect damages resulting
              from visitors to its website accessing another website hyperlinked
              there.
            </p>

            <h3 id="images">Images</h3>

            <p>
              Images on the website are under open licences (unless otherwise
              stated) or are the property of Sciences Po.
            </p>

            <h3 id="IL">Information Technology and Liberties</h3>

            <p>
              In accordance with the European General Data Protection Regulation
              2016/679 (GDPR), the legal basis for the processing of personal
              data on the website is its necessity for the execution of Sciences
              Po's public service mission (as per Article 6.1.e of the GDPR).
            </p>

            <p>
              This website does not collect any personal data, with the
              exception of registration forms for events and for the medialab
              seminar in particular.
            </p>

            <p>
              Sciences Po invites visitors to inform its services immediately in
              the event of a violation of personal data regulations. For this
              purpose, please complete this{' '}
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSd9pnlOZCeB_OW00BnhYJUfvWbQsn1CytLtmZXWTapfsGDKIg/viewform">
                form
              </a>{' '}
              or send an e-mail to{' '}
              <a href="mailto:dataprotection@sciencespo.fr">
                dataprotection@sciencespo.fr
              </a>
              .
            </p>

            <p>
              You may exercise your right to access, modify, rectify or delete
              your personal data by writing to us:
            </p>

            <ul>
              <li>
                by post:{' '}
                <strong>
                  médialab, 27 rue Saint Guillaume 75337 Paris Cedex 07
                </strong>
              </li>
              <li>
                by e-mail: <strong>medialab@sciencespo.fr</strong>
              </li>
            </ul>

            <p>
              Website visitors may also contact the Data Protection Officer at
              Sciences Po at{' '}
              <a href="mailto:cnil@sciencespo">cnil@sciencespo.fr</a> as further
              recourse, and then{' '}
              <a href="https://www.cnil.fr/">send a complaint to the CNIL</a> in
              the event of difficulties or subsequent questions concerning their
              GDPR rights.
            </p>
          </div>
        </article>
      </main>
    );
}
