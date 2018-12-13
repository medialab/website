---
title: Pages listing
date: 2018-12-07
---
Description de chaque page listing

# Actualités
Présente l'ensemble des actualités avec un affichage par ordre antéchronologique (de la plus récente à la plus ancienne).

## Colonnes/champs à afficher
- Date,
- Titre,
- Label,
- description (au survol?)

## Filtres
- Type

## Tri
- Date


# Productions
Présente l'ensemble des productions avec un affichage par défaut par ordre antéchronologique (de la plus récente à la plus ancienne).

## Colonnes/champs à afficher
- Date,
- type,
- Titre,
- Auteurs,
- description (au survol)
- image (au survol)

## Filtres
- A deux niveaux : d'abord sur une Metarubrique sur les types : "publications", "corpus", "tools" et "situations", puis sur le type de la production.

Structure du filtrage :

- publication:
	- article
	- livre
	- communication
	- working paper
- web
    - datascape
	- site web
- outils	
    - logiciel
	- code
- situation
    - atelier
	- exposition
	- simulation
	- conférence

## Tri
- Date

# Equipe
Présente l'ensemble des people avec un affichage aléatoire, il existe une délimitation entre les actifs et inactifs.

## Colonnes/champs à afficher
- FirstName
- LastName
- Fonction (champs suggéré ;  valeurs possibles : Directeur scientifique - Chercheur.e, Directeur technique - Ingénieur.e de recherche, Directeur de FORCCAST, Designer.e de recherche, Ingénieur.e de recherche, Ingénieur.e pédagogique, Chercheur.e, Chargé.e de communication, Secrétaire général.e, Assistant.e de recherche)
- Picture
- Current Status _précise les activités actuelles_ (au survol)

## Filtres
- Domaines (Académique, technique, design, pédagogie, administratif)
- Actif / passé
- membership : member/associate

## Tri
- Name : Ordre alphabétique

# Activités
Présente l'ensemble des activités ; l'affichage se fait en fonction du type (recherche/enseignement/méthodes) et l'ordonnancement se fait en fonction du booléen "important".
Par défaut, les activités passées ne sont pas affichées, un filtre permet de les faire apparaitre.

## Colonnes/champs à afficher
- Name
- type,
- baseline
- illustration (?)
- description (au survol?)

## Filtres
- active
- type

## Tri
- Name : Ordre alphabétique
