# médialab Website

Ce dépôt de code contient tout le code source lié au [site web](https://medialab.sciencespo.fr) du laboratoire at à son CMS custom utilisé pour en administrer les données.

* **Production** : https://medialab-prod.medialab.sciencespo.fr/admin/
* **Pré-production** : https://medialab-pprd.medialab.sciencespo.fr/admin/

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

- [`localhost:7000`](http://localhost:7000): CMS
- [`localhost:8000`](http://localhost:8000): static website
- [`localhost:3000`](http://localhost:3000): server API

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

- [`/templates`](site/src/templates): web page composition
- [`/components`](site/src/components): web renderer subpage blocks. Components are function which transforms data as html.

The reference of this system is the [React components documentation](https://reactjs.org/docs/react-component.html).

## Maquette

La maquette HTML du site est consultable sur [medialab-website-design.netlify.com](https://medialab-website-design.netlify.com/)
