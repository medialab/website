# modèle de données

## Activities

label :
- fr: Activités
- en: Activities 

Les activités décrivent les projets menés au médialab qui implémentent notre politique scientifique.
Ces activités sont structurantes, collectives et durent un minimum dans le temps.
Il y a trois types d'activités : recherche, méthode et pédagogique.

Champs : 

- **type** *mandatory* : trois valeurs possibles : recherche, pédagogie, méthode
- **name** *fr/en*, *mandatory* : nom au sens de acronyme, nom officiel...
- **baseline** *fr/en*, *mandatory* : phrase courte ou question posant le but de l'activité
- **description** *fr/en*, *mandatory*: court paragraphe présentant l'activité 
- **illustration** : image d'illustration + sa version traité par le filtre graphique
- **content** *fr/en*: le contenu riche (markdown) décrivant l'activité
- **documentation** : annexes, liste de média associés (document PDF, site web annexe, )
- **important** : boolean qui indique si l'activité est structurante. Ces activités sont par défaut mises en haut de liste. 
- **active** : boolean qui indique si l'activité est active ou passée
- **startDate** : date précise au mois uniquement indiquée dans la page activité
- **endDate** : date précise au mois indiquée dans la page activité 

Liens :

- **Activités -> People** : membres de l'équipe fortement impliquée dans l'activité. On ne liste pas toutes les personnes participant ponctuellement. Distinguer les liens vers des personnes actives des personnes parties. 
*En moyenne 2-3, minimum 1, max 10 personnes actives (le double en comptant les personnes parties)*
- **Activités -> Activités** : activités qui sont proches, prolongation d'un projet par un autre, proximité thématique ou méthodo forte... Distinguer les activités actives et passives (ne change pas la cardinalité)  
*En moyenne 2, max 4, souvent 0*
- **Publication -> Activités** : activités qui ont suscité cette publication.  
*En moyenne 1 ou 2, max 10, souvent 0*
- **Actualités -> Activités** : actualités à propos de cette activité.  
*en moyenne 3, max 10, souvent 0*


## People

label :

- fr: Équipe
- en: Team

Les membres du médialab présents et passés. Toutes les personnes travaillant au médialab ou étant associé.
25 personnes environ présentes mais l'effectifs devraient monter les prochaines années vers 35. L'historique représentent environ le double. 


Champs :
- **FirstName** *mandatory*
- **LastName** *mandatory*
- **membership** : associate, member
Distinction entre membre et associé.
- **role** *fr/en*: fonction occupée au format libre mais fortement suggéré, convergents vers des appelations communes : Directeur scientifique - Chercheur.e, Directeur technique - Ingénieur.e de recherche, Directeur de FORCCAST, Designer.e de recherche,     Ingénieur.e de recherche, Ingénieur.e pédagogique, Chercheur.e, Chargé.e de communication, Secrétaire général.e,     Assistant.e de recherche
- **currentStatus** : champs ouvert une ou deux phrases décrivant les sujets de travail actuel
- **domain** : academic, technic, design, pedagogy, administrative. Utilisé uniquemnt pour du filtrage.
- **contact** : information de contact, site perso, email... sous la forme de clef/valeur librement défini et pouvant contenir des liens ou emails (dans valeur)
- **bio** *fr/en*: contenu markdown
- **active** : boolean indiquant si la personne est présentemment dans l'équipe
- **picture** : photo (non traitée graphiquement ? en N&B)


Liens :

- **Activités -> People** : Activités de la personne. Attention les activités pouvant être non-active, il faudrait les distinguer dans les liens. 
*En moyenne 3-4, minimum 1, max 10 activités actives*
- **Productions -> People** : publications de la personne.  
*En moyenne 8, max 30, minimum 0 possible*
- **Actualités -> People** : actualités à propos de cette personne.  
*en moyenne 3-4, max 12, régulièrement 0*

Liens sélectionnés :

On aimerait pouvoir mette en avant certains objets liés dans les activités et les publications. Sélectionner des 5 (?) plus importants par l'utilisateur pour les cas où il y a une longue liste.

- **People -> Activités principales** : Sélection des max 5 principales activités de la personne. Pas de disticntion actif/passé car sélectionné par l'utilisateur.  
*En moyenne 2, minimum 1, max 5 activités*
- **People -> Productions principales** : Sélectiondes max 5 principales publications de la personne.  
*En moyenne 2, max 5, minimum 0 possible*

## News

Label : 
- fr : Actualités
- en : News

Les actualités sont des contenus relatant la vie du labo. Ils indiquent les événements publics organisés par le labo ou où auxquels participent des membres du labo (rendez-vous); des recrutements, prix, nouveaux projets (annonces); des textes plus longs qui relatent un événement, une éxpérimentation menées au labo (chronique-billet-article).

champs :

- **type** : rendez-vous (event), chronique (post), annonce (notice)
- **title** *fr/en* : titre en une courte phrase
- **label** *fr/en* : qqs mots pour qualifier l'actualité, vocabulaire non contrôlé mais réutilisation fréquente des mêmes labels (auto-complétion dans le CMS).
- **place** : lieux en qqs mots
- **startDate** : date de début
- **endDate** : date de fin
- **description** *fr:en* : court paragraphe présentant l'actualité
- **content** *fr/en*: contenu markdown
- **internal** : boolean qui définit si le rendez-vous est organisé par nous ou pas
- **illustration** : image d'illustration + sa version traité par le filtre graphique
- **documentation** : annexes, liste de média associés (document PDF, site web annexe, )


Liens :

- **Actualités -> Activités** : Activités en lien avec l'actualité. Ne pas distinguer actif/passé.  
*En moyenne 1, max 2-3, très souvent 0*
- **Actualités -> Productions** : publications en lien   
*En moyenne 1, max 2-3, très souvent 0*
- **Actualités -> People** : actualités à propos de cette personne. Ne pas distinguer actif/passé. 
*en moyenne 2-3, max 5, régulièrement 0*


## Production

Label :

- en : Productions 
- fr : Productions

Champs : 

- **type** *enum* : article/article, communication/communication, livre/book, working paper/working paper, datascape/datascape, site web/website, logiciel/software, code/code, exposition/exhibition, atelier/workshop, simulation/simulation, conférence/conference
- **title** *fr/en*, *mandatory* : titre de la production
- **description** *fr/en* : présentation courte en une phrase ou deux rédigée par l'équipe éditoriale
- **content** *fr/en* : contenu en markdown qui ne contient en général pas le contenu de la publication en entier mais son abstract
- **date** : date de publication
- **URL** : URL vers le plein texte, le site, l'outil, github, site de l'éditeur ou SPIRE... (rempli automatiquement si publi récupérée dans Spire)
- **spireJson** : métadonnées complètes de la publication provenant de la plateforme biblio de Science Po
- **authors** : liste des auteurs au format texte (rempli automatiquement si publi récupérée dans Spire)
- **biblioRef** : référence biblio pour citer cette publication (rempli automatiquement si publi récupérée dans Spire, sera régulièrement vide pour les productions hors publi)
- **illustration** : assurée pour les cas datascape, siteweb, logiciel, exposition, atelier, simulation mais plutôt pas pour les autres.
- **active** : certains outils sont dépréciés ce serait important d'indiquer cela.

Liens : 

- **Productions -> people** : les membres du médialab auteurs de la publi. ne pas distinguer actif/passé.  
*minimum 1, max 6, moyenne 1.5*
- **Productions -> activities** : les activités du médialab qui sont liées à cette publi. Ne pas distinguer actif/passé.
*en moyenne 1.5, max 4,  peut être 0 mais très rare*
- **Productions -> publications** : liens vers d'autres publications liées. 
*en général 0, max 5*
- **News -> publication** : les actualités qui ont mentionnées cette publi
*en général 0, max 2* 
