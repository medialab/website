---
title: Pages listing
date: 2018-12-07
---
Description de chaque page listing

# Actualités
Présente l'ensemble des actualités (liste exhaustive) avec un affichage par ordre antéchronologique (de la plus récente à la plus ancienne).
Pas de tri possible.
La liste est indexée avec des ancres par années pour se repérer dans la temporalité.

## Colonnes/champs à afficher
- Date, (moyen)
- Titre, (gros)
- Label, (petit)
- description (au survol?)

## Filtres
- Types (à savoir RV, Chronique, et Annonce)


# Productions
Présente l'ensemble des productions avec un affichage par défaut par ordre antéchronologique (de la plus récente à la plus ancienne).
Pas de tri possible.
La liste est indexée avec des ancres par années pour se repérer dans la temporalité.
_Remarque_ : il faudrait prévoir un affichage de l'ensemble de la liste triée par type de publication.

## Colonnes/champs à afficher
- Date, (moyen)
- type, (petit)
- Titre, (gros)
- Auteurs, (moyen)
- description (au survol)

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


# Equipe
Présente l'ensemble des people avec un affichage aléatoire
Par défaut, seuls les membres actifs sont visibles.

## Colonnes/champs à afficher
- FirstName (gros)
- LastName (gros)
- Fonction (champs suggéré ;  valeurs possibles : Directeur scientifique - Chercheur.e, Directeur technique - Ingénieur.e de recherche, Directeur de FORCCAST, Designer.e de recherche, Ingénieur.e de recherche, Ingénieur.e pédagogique, Chercheur.e, Chargé.e de communication, Secrétaire général.e, Assistant.e de recherche) (moyen)
- Picture
- Current Status _précise les activités actuelles_ (au survol)

## Filtres
- Domaines (Académique, technique, design, pédagogie, administratif)
- Actif / passé
- membership : member/associate

## Tri
- Alphabétique (sur les Name)
_Remarque_ : faut-il prévoir une indexation alphabetique de la liste?

# Activités
Présente l'ensemble des activités ; une selection est épinglée en haut de liste en fonction du booléen "important", le reste de la liste est ordonné alphabétiquement.
Par défaut, les activités passées ne sont pas affichées, un filtre permet de les faire apparaitre.

## Colonnes/champs à afficher
- Name, (moyen)
- type, (petit)
- baseline, (gros)
- illustration (?)
- description (au survol?)

## Filtres
- active
- type (à savoir recherche/enseignement/méthodes)

## Tri
- Name : Ordre alphabétique
