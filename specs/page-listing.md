--
title: Pages listing
date: 2018-12-07
---
Description de chaque page listing

# Actualités
Présente l'ensemble des actualités (liste exhaustive).

## tri
Affichage par ordre antéchronologique (de la plus récente à la plus ancienne) sur le chamsp **startDate**.
La liste est indexée avec des ancres par année (de startDate) pour se repérer dans la temporalité.
Pas d'autre tri possible.

## Colonnes/champs à afficher
- **startDate-endDate?**, (moyen)
- **title**, (gros)
- **label**, (petit)
- **description** (au survol?)

## Filtres
- sur **type**: event/rendez-vous, post/chronique, notice/annonce

Filtrage est précompilé par le build et propose donc une page spécifique pour chaque modalité.
Aucun filtre actif par défaut.

# Productions
Présente l'ensemble des productions.

## tri
Affichage par défaut par ordre antéchronologique (de la plus récente à la plus ancienne) sur le champs **date**.
La liste est indexée avec des ancres par année (champs **date**) pour se repérer dans la temporalité.
Pas d'autre tri possible.

_Remarque_ : On imagine aussi un autre usage plus documentaire genre la biblio du labo, auquel cas on pourrait vouloir prévoir une autre page listing des productions qui présente l'ensemble de la liste indexée par type de publication, non filtrable. Mais on est pas encore callé sur ce point et ça recoupe peut être l'usage archive. Donc juste pour info pour le moment.

## Colonnes/champs à afficher
- **date**, (moyen)
- **type**, (petit)
- **title**, (gros)
- **authors**, (moyen)
- **description** (au survol)

## Filtres
- A deux niveaux : d'abord sur une Metarubrique sur les types : "publications", "médias", "web editions", "tools" et "situations", puis sur le type de la production (sauf pour "médias" qui n'a pas qu'une seule modalités donc pas de sous-filtres"). Les groupements sont décrits dans [enums.json](./enums.json).

Le filtrage du premier niveau est précompilé par le build et propose donc une page spécifique pour chaque modalité. Le filtrage de deuxième niveau est effectué à la volée par le client par CSS.

Aucun filtre actif par défaut.

# Equipe
Présente l'ensemble des people 

## Colonnes/champs à afficher
- **firstName** (gros)
- **lastName** (gros)
- **role** (champs suggéré ;  valeurs possibles : Directeur scientifique - Chercheur.e, Directeur technique - Ingénieur.e de recherche, Directeur de FORCCAST, Designer.e de recherche, Ingénieur.e de recherche, Ingénieur.e pédagogique, Chercheur.e, Chargé.e de communication, Secrétaire général.e, Assistant.e de recherche) (moyen)
- **picture**
- **status** _précise les activités actuelles_ (au survol)

## Filtres
- **domaine** : Académique, technique, design, pédagogie, administratif
- **active** : boolean (labels seront présent.e.s, parti.e.s)
- **membership** : member/associate

Par défaut le filtre domaine n'est pas actif, le filtre active est sur true (présent.e.s), le filtre membership inactif.

Le filtrage est précompilé par le build et propose donc une page spécifique pour chaque combinaison de modalité.

## Tri
Par défaut l'ordre est aléatoire, généré au build.
L'utilisateur doit pouvoir trier Alphabétiquement sur **name**
_Remarque_ : faut-il prévoir une indexation alphabetique de la liste?






# Activités
Présente l'ensemble des activités

## Colonnes/champs à afficher
- **name**, (moyen)
- **type**, (petit)
- **baseline**, (gros)
- **description** (au survol)

## Filtres
- **active** : boolean (active/passée)
- **type** : recherche/enseignement/méthodes

Par défaut, le filtre **active** est sélectionnée sur true (les activités passées ne sont pas affichées).
Le filtrage est précompilé par le build et propose donc une page spécifique pour chaque combinaison de modalité.

## Tri
une selection est épinglée en haut de liste en fonction du booléen "important", le reste de la liste est ordonnée et indexée alphabétiquement sur **name**.
