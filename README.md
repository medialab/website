# médialab Website

Ce dépôt de code contient tout le code source lié au [site web](https://medialab.sciencespo.fr) du laboratoire at à son CMS custom utilisé pour en administrer les données.

## Installation

Pour installer les dépendances du projet:

```
npm install
```

Pour ré-installer toutes les dépendances de zéro:

```
npm run reinstall
```

Pour réinitialiser la base de données avec des données de test:

```
npm run hydrate
```

Pour dumper les données de la base afin de les versionner:

```
npm run dump
```

## development instructions

### ports used

- `7000`: CMS
- `8000`: static website
- `3000`: server API

### to bootstrap a dev instance to work on integration

```bash
$ npm install
$ npm run hydrate (ou run load)
$ npm run dev
```

To modify templates, one should focus on site/src directory.

```bash
cd site/src/
```

Here are the source codes of the templating system.

- /templates: web page composition
- /components: web renderer subpage blocks. Components are function which transforms data as html.

The reference of this system is the [React components documentation](https://reactjs.org/docs/react-component.html).

