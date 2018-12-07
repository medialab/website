---
title: Peuplement de la Home
date: 2018-12-07
---

# Phrase de présentation courte du laboratoire
Bloc 1 - priorité très important

# Agenda
Bloc 2 - priorité moyenne

## quoi ?
Faire connaître les rendez-vous où l'on peut rencontrer les membres du médialab ; on affiche tous les événements à venir par ordre chronologique (du plus proche au plus lointain) ; si rien à venir, afficher une phrase « pas d’événement à venir»

## Objets et champs à afficher

Actualités de type 'rendez-vous'
- startDate (et endDate si il y a ?)
- title (avec lien vers la fiche de l'actualité/RV)
- label
- place

_Question_ : faut-il différencier graphiquement les événements organisés par le médialab des autres (majoritairement participation dans des conf)? Il existe la mention du type d'événement mais faut il le marquer plus fortement?
-> Prévoir une proposition avec cette distinction.


# Focus
Bloc 3 - priorité importante

## quoi ?
Mettre en avant l'actualité chaude (hors agenda) du laboratoire avec un contenu (actualité) *en hero* et jusqu’à 4 contenus additionnels (tout type) - idéalement pour contextualiser-.
Il s'agit donc d'un bloc à deux lignes : une ligne HERO (une seule colonne pleine largeur) et une ligne autre (4 colonnes).

## Objets et champs à afficher

### ligne hero
Objet Actualité (tout type) :
- title
- description
- label
- date (?) - date si type = rendez-vous ?

### ligne 4 colonnes

*Si objet de type actualité :*
- title
- label
- (date ?) - date si type = rendez-vous ?

*Si activité :*
- name
- baseline
- type

*Si membre :*
- firstName lastName
- title
- « membre de l’équipe » si membership = membre « associé.e au médialab » sinon

ps Paul: j'ai du mal à imaginer qu'on mette qqun sur la home sans passer par une actualité ?

*si publication :*

- title
- type
- date ?
- authors ?

_Remarque_ : il manque un 3ème champs pour les productions, est-ce gênant ou peut on envisager ce déséquilibre?

# liste des derniers posts
Bloc 4 - priorité moindre

## quoi ?
Donner un aperçu de l'activité générale du médialab avec les 10 dernières actualités passées qui ne sont pas mentionnées dans la partie Focus.

## champs à afficher
Actualités
- date
- type
- title (à couper en fonction du nombre de caractères)


# Flux
amovible
