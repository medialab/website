# modèle de données

## Activities

label :
- fr: Activités
- en: Activities 

Les activités décrivent les projets menés au médialab qui implémentent notre politique scientifique.
Ces activités sont structurantes, collectives et durent un minimum dans le temps.
Il y a trois types d'activités : recherche, méthode et pédagogique.

Champs : 

- **type** *mandatory* : trois valeurs possibles : recherche, méthode, pédagogie
- **name** *fr/en*, *mandatory* : nom au sens de acronyme, nom officiel...
- **baseline** *fr/en*, *mandatory* : phrase courte ou question posant le but de l'activité
- **description** *fr/en*, *mandatory*: court paragraphe présentant l'activité 
- **illustration** : image d'illustration + sa version traité par le filtre graphique
- **content** *fr/en*: le contenu riche (markdown) décrivant l'activité
- **documentation** : annexes, liste de média associés (document PDF, site web annexe, )
- **important** : boolean qui indique si l'activité est structurante. Ces activités sont par défaut mises en haut de liste. 
- **active** : boolean qui indique si l'activité est active ou passée
---
## /!\ A discuter

- **documents** : documents associés ?
- dates ?
---
Liens :

- **Activités -> People** : membres de l'équipe fortement impliquée dans l'activité. on ne liste pas toutes les personnes participants ponctuellement.  
*En moyenne 2-3, minimum 1, max 10 personnes*
- **Activités -> Activités** : activités qui sont proches, prolongation d'un projet par un autre, proximité thématique ou méthodo forte...  
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
- **gender** : male, female.  
Pour faire des générations de nom prenant en compte l'info notamment pour associé.e
- **membership** : associate, member
Distinction entre membre et associé.
- **title** *fr/en*: titre académique/poste occupé
- **contact** : information de contact, site perso, email... (on détecte les liens dans le template ?)
- **bio** *fr/en*: contenu markdown
- **active** : boolean indiquant si la personne est présentemment dans l'équipe
- **picture** : photo (non traitée graphiquement ? en N&B)

---
## /!\ A discuter

- **documentation** : documents associés genre pour un CV perso, site perso... ?
---

Liens :

- **Activités -> People** : Activités de la personne.  
*En moyenne 3-4, minimum 1, max 10 activités*
- **Publications -> People** : publications de la personne.  
*En moyenne 8, max 30, minimum 0 possible*
- **Actualités -> People** : actualités à propos de cette personne.  
*en moyenne 3-4, max 20, régulièrement 0*

Liens sélectionnés :

On aimerait pouvoir mette en avant certains objets liés dans les activités et les publications. Sélectionner des 5 (?) plus importants par l'utilisateur pour les cas où il y a une longue liste.

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

- **Actualités -> Activités** : Activités en lien avec l'actualité  
*En moyenne 1, max 2-3, très souvent 0*
- **Actualités -> Publications** : publications en lien   
*En moyenne 1, max 2-3, très souvent 0*
- **Actualités -> People** : actualités à propos de cette personne.  
*en moyenne 2-3, max 5, régulièrement 0*


## Publication

papers and tools 
publis et outils
