---
title: Peuplement de la Home
date: 2018-12-07
---

# Phrase de présentation courte du laboratoire
priorité très important

# Agenda / Rendez-vous
priorité moyenne

## quoi ?
Faire connaître les rendez-vous où l'on peut rencontrer les membres du médialab ; on affiche tous les événements à venir par ordre chronologique (du plus proche au plus lointain) tant qu'ils ne sont pas finis (Ex.: un RV sur plusieurs jours) ; si rien à venir, afficher une phrase « pas d’événement à venir»

## Objets et champs à afficher

**Actualités** de type **'rendez-vous'**:
- *startDate* et *endDate* (si il y a) (**gros**)
- *title* (avec lien vers la page objet) (**gros**)
- *label* (moyen)
- *place* (petit)
- *internal* (petit) : différencier graphiquement les événements organisés par le médialab des autres (majoritairement participation dans des conf)

# Carrousel Hero
priorité importante
_Rermarque_ : pas certaine qu'il faille mettre un titre à cette zone, il est communément admis que ces zones de hero servent à mettre des choses en avant. En plus, on a une zone actualité plus bas: ca risque d'être compliqué de trouver 2 titres...; voir ces exemples (j'ai volontairement choisi des structures très différentes ):
- https://www.gobelins.fr/
- https://www.theatremarigny.fr/
- https://www.polytechnique.edu/
(Paul: je suis d'accord)

## quoi ?
Mettre en avant l'actualité chaude du laboratoire avec un contenu *en hero* et jusqu’à maximum 4 *contenus liés*.
_Rermarque_ : pas certaine que les contenus additionnels sont finalement nécessaire, ça complexifie le propos et on va se retrouver avec les mêmes contenus que DANS la page de l'objet.
Je suggère de les supprimer.

## Objets et champs à afficher

On peut afficher des objets de type : actualité, activité, production

Si **actualité** :
- *title* (gros)
- *label* (moyen)
- *startDate - endDate* si type = rendez-vous (petit)
- *description* (petit)
- *illustration*

Si **activité** :
- *name* (moyen)
- *baseline* (gros)
- *type* (petit)
- *description* (petit)
- *illustration*

si **production** :
- *title* (gros)
- *authors* (moyen)
- *type* (petit)
- *description* (petit)
- *illustration*

### contenus liés [A supprimer?]

Dans la zone hero, jusque 4 contenus liés peuvent être ajouté sous forme de liens :

*Si objet de type actualité :*
- title (gros)
- label (moyen)
- startDate - endDate si type = rendez-vous (petit)

*Si activité :*
- baseline (gros)
- name (moyen)
- type (petit)

*Si membre :*
- firstName lastName (gros)
- title (moyen)
- « membre de l’équipe » si membership = membre, « associé.e au médialab » sinon (petit)

*si publication :*
- title (gros)
- authors (moyen)
- type (petit)

# En ce moment, grille à 4 colonnes

## quoi ?
Mettre en avant l'actualité *tiède* du laboratoire en sélectionnant des objets qui ont eu, ont ou vont avoir une actualité.

## Objets et champs à afficher
Si **actualité** :
- *title* (gros)
- *label* (moyen)
- *startDate - endDate* si type = rendez-vous (petit)
- *illustration*

Si **activité** :
- *baseline* (gros)
- *name* (moyen)
- *type* (petit)
- *illustration*

Si **people** :
- *firstName LastName* (gros)
- *role* (moyen)
- « associé.e au médialab » si *membership* = associate (petit)
- illustration

si **publication** :
- *title* (gros)
- *authors* (moyen)
- *type* (petit)
- *illustration*

# Flux / Et aussi

