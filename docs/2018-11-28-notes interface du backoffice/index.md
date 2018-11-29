20181128 - recommandations interface du backoffice
===

Quelques notes en prévision du RDV du 6 Décembre sur l'interface du backoffice.

# Remarque sur tous les formulaires

Créer des groupes d'inputs en enveloppant les .columns dans des éléments conteneurs avec une importante marge en bas pour définir des grappes visuels moins hétérogènes. Éventuellement rajouter un titre à certains groupes d'inputs (e.g. "Linked elements" pour les inputs de "related people" & co.)

Partout, mettre "published" en fin de formulaire, seul, peut-être avec un arrière-plan différent (gris léger), pour insister sur la dimension critique de ce point.

related publications, related people et "related" en général ==> mettre sur deux colonnes (select sur la colonne de gauche, valeurs sur la colonne de droite)

tags --> prevoir les cas de valeurs longues (un algo de shortening + title/tooltip avec la valeur complète)

faire du "smart default" : "published" doit être à false par défaut, 

## Wording

"Edit" button en haut des formulaire ==> spécifier pour améliorer le repérage (e.g. "edit news", "edit person", ...) / idem pour "save" (=> "save news", ...)

"Published" ? ==> "This people is published on the website" et valeurs=["public", "private"] au lieu de ["yes", "no"]

# Formulaire people

Proposition d'ordre et de groupes d'inputs (chaque point est un groupe d'inputs) :

1. first name / last name (en 2 colonnes)
2. photo (en deux colonnes -> input / preview)
3. titre et biographie (2 x 2 colonnes)
4. active / membership (en 2 colonnes)
5. published


## Wording

"active?" ==> "The person works presently with médialab" / ["yes", "no"] => ["presently working", "worked in the past"]

# Formulaire news

Proposition d'ordre et de groupes d'inputs (chaque point est un groupe d'inputs) : 

1. titres (2 colonnes)
2. dates (sur deux colonnes : début / fin)
3. excerpts et contenus (2 x 2 colonnes)
4. éléments liés (2 rangées)
5. published

Champ "label" des news => afin de limiter l'extension de la taxonomie, un auto-complete avec les valeurs existantes, ou encore un select permettant de rajouter une nouvelle valeur possible ?

# Formulaire publication

... pas encore de recommandations, à voir après avoir clarifié le protocole de gestion de ces objets (relation site-spire)

# Première réflexion sur les vues listes

Principes de base / points qui me semblent importants :

* dans notre cas il sera utile de se concentrer sur les possibilités de sorting et de recherche, inutile de se concentrer sur les opérations batch, et probablement inutile de faire du filtrage
* il sera nécessaire de wrapper l'opération de suppression d'un item dans un protocole de confirmation très dramatique (probablement avec un modal)
* il sera peut-être utile d'implémenter dans les critères de sorting et dans les éléments visuels de la liste une aide à la cohérence éditoriale -> être capable de voir les éléments sous-documentés (exemples : cette news n'est liée à aucune activité, cette publication n'est liée à aucun people, ce people n'a pas de bio dans une des deux langues, ...)
* * il faudra probablement un système de pagination pour les listes, afin d'éviter des listes trop longues à parcourir
* il sera peut-être utile d'implémenter plusieurs niveaux de preview (ne pas avoir systématiquement à ouvrir un élément pour se rappeler son contenu)

