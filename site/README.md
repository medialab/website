# Intégration statique du site web

Le site web statique est généré par [gatsbyjs](https://www.gatsbyjs.org/).

Les pages sont donc rendues par [reactjs](https://reactjs.org/).

## Aide pour l'intégration

* [Architecture des fichiers](#architecture-des-fichiers)
* [Liens utiles](#liens-utiles)
* [Exemples](#exemples)

### Architecture des fichiers

Tous les fichiers concernant l'intégration du site web se trouvent dans le dossier `src`.

Voici comment s'organisent les sous-dossiers de `src`:

* `components`: contient tous les composants générique comme le composant responsable de rendre la vue pour les détails d'une page people (`PeopleDetail`), ou bien celui responsable de l'affichage du contenu riche renseigné dans le CMS (`RawHtml`).
* `templates`: contient tous les composants racines responsables du rendu d'une page spécifique. `index.js`, par exemple, est responsable du rendu de la home.

### Liens utiles

Les deux choses utiles à comprendre pour l'intégration sont:

1. La syntaxe JSX
2. Le fonctionnement de React

Voici quelques liens utiles:

* La home de [React](https://reactjs.org/).
* La documentation des [composants](https://reactjs.org/docs/components-and-props.html)
* Le site [reactfordesigners.com](https://reactfordesigners.com/)

### Exemples

Voici quelques exemples et recommandation utiles

#### Composants pures

Sachant que le site n'a pas besoin d'interactivité JS, l'intégration n'a besoin que de composants react "purs" et n'a pas besoin de toutes les fioritures des classes de composant etc. Cela est bien plus simple.

Un composant pur, pour react, n'est ni plus ni moins qu'une fonction prenant des props comme arguments et renvoyant du html (via la syntaxe JSX).

Les composants, par convention, ont un nom écrit en TitleCase (majuscule sur tous les mots, y compris le premier).

```jsx
// Ceci est un composant pur renvoyant simplement une div wrappant un titre
// dont le texte est donné en props du composant
function MonComposantPur(props) {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
}

// Ce composant s'utilise alors de la manière suivante:
<MonComposantPur title="Super Titre" />
// Cela rendra:
<div>
  <h1>Super Titre</h1>
</div>
```

#### Concernant les classes

Dans le HTML, l'attribut de classe s'appelle `class`. Cependant, en JSX, afin de mimer le comportement du JavaScript, l'attribut s'appelle `className`.

```jsx
// Wrong
<div class="column" />

// Right
<div className="column" />
```

**Astuce**: utiliser la librairie `classnames`.

Il n'est pas rare de vouloir composer des classes de manière conditionnelle. Comme il peut vite être fastidieux de faire cela à la main en concaténant des chaînes de caractère, il existe la lib [classnames](https://www.npmjs.com/package/classnames) qui simplifie ce travail.

```jsx
import cls from 'classnames';
// Exemple: la div a la classe column et la classe hidden si une condition est
// fausse

const className = cls('column', isHidden && 'hidden');
<div className={className} />
```
