# Site web du médialab

Ce dépôt de code contient tout le code source lié au [site web](https://medialab.sciencespo.fr) du laboratoire et à son CMS custom utilisé pour en administrer les données.

## Installation

Pour installer les dépendances du projet:

```
npm install
```

Pour ré-installer toutes les dépendances de zéro:

```
npm run reinstall
```

## Archictecture des dossiers

*Dossiers du repo*

* `admin`: dossier contenant les sources du client statique du CMS.
* `api`: dossier contenant les sources du serveur d'API du CMS.
* `config`: dossier contenant les fichiers de configuration du serveur.
* `docs`: divers fichiers de documentation liés au projet.
* `prototyping`: dossier contenant le prototype de design du site et gardé pour raisons historiques.
* `scripts`: scripts divers de gestion de données et/ou de maintenance du serveur.
* `site`: dossier contenant les sources du site statique en [GatsbyJS](https://www.gatsbyjs.org/).
* `specs`: dossier contenant de nombreux fichiers de configuration et schémas utilisés par toutes les composantes du site (statique et CMS).

*Dossiers techniques*

* `.cache`: dossier créé automatiquement et contenant des caches de requêtes HTTP pour l'API Github pour éviter de saturer leur API lorsque l'on développe.
* `build`: le serveur créé ce dossier automatiquement pour builder le site statique à interval régulier et pour être capable de versionner les données convenablement.
* `data`: dossier contenant, par défaut, les données JSON du site, ainsi que les différents assets (images, pdfs etc.).

## Comment développer?

## TL;DR

```bash
npm install
npm run load -- /path/to/dump
npm run dev
```

### Récapitulatif des ports utilisés en développement

* [`localhost:3000`](http://localhost:3000): Serveur d'API du CMS.
* [`localhost:7000`](http://localhost:7000): Client du CMS (admin).
* [`localhost:8000`](http://localhost:8000): Site statique.

### Commandes

```bash
# Lancer l'intégralité de la stack (serveur + admin + site statique):
npm run dev

# Lancer uniquement le serveur d'api avec des options utiles au dev:
  # 1. En désactivant le spawn de gatsby pour aller plus vite:
  node api/server.js --no-gatsby
  # 2. En désactivant l'authentification pour prototyper rapidement:
  node api/server.js --bypass-auth

# Dumper la base de données:
npm run dump

# Charger une base de données dumpée:
npm run load -- /path/to/dump

# Rafraîchir les données de flux (github/twitter):
npm run flux

# Linter l'intégralité du code:
npm run lint

# Synchroniser les branches de préprod et de prod:
npm run upgrade:prod
```

### Configuration de développement

Les fichiers de configuration se trouvent dans `config` et dans `admin/config` respectivement.

Il est possible d'overrider des variables de configuration localement en créant un fichier `config/local.json` qui ne sera pas commité.

### Serveur d'API du CMS

Le serveur d'API maintient une base de données très simple, représentée par des fichiers JSON existant dans le dossier `data`.

Les données sont ensuite servies via un serveur [express](https://expressjs.com/fr/) se basant sur [json-server](https://github.com/typicode/json-server).

### Client du CMS

[Documentation dédiée](admin/README.md)

### Site statique

[Documentation dédiée](site/README.md)

### Troubleshooting

**Le site statique ne se lance pas à cause d'erreurs de cache.**

> Ceci est dû à une invalidation du cache de gatsby. Lancer `npm run clean` à la racine du projet ou dans `site` devrait corriger le problème.
