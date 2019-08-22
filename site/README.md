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

* [Composants purs](#composants-purs)
* [Conditions](#conditions)
* [Les boucles](#les-boucles)
* [Style](#style)
* [Concernant les classes](#concernant-les-classes)
* [Enfants](#enfants)
* [Composants jumeaux sans div parente](#composants-jumeaux-sans-div-parent)
* [Import/Export de fonctions](#import-export-de-fonctions)

#### Composants purs

Sachant que le site n'a pas besoin d'interactivité JS, l'intégration n'a besoin que de composants react "purs" et n'a pas besoin de toutes les fioritures des classes de composant etc. Cela est bien plus simple.

Un composant pur, pour react, n'est ni plus ni moins qu'une fonction prenant des props (les données au format du modèle) comme arguments et renvoyant du html (via la syntaxe JSX).

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

#### Conditions

Les conditions se font en JavaScript. Plusieurs solutions existent pour intégrer des conditions dans le JSX comme utiliser les opérateurs booléens et les ternaires.

```jsx
// Si l'on veut afficher quelque chose que si une condition est remplie
<div>
  {condition && <h1>Titre</h1>}
</div>

// Si l'on veut afficher soit quelque chose soit autre chose en fonction
// d'une condition
<div>
  {condition ?
    (<h1>Titre Un</h1>) :
    (<h2>Titre Deux</h2>)}
</div>

// Si jamais on veut faire des choses plus complexes et utiliser de vraies conditions
let body = null;

if (lang === 'en') {
  body = <span>Hello</span>
}
else {
  body = <span>Bonjour</span>
}

<div>{body}</div>
```

Exemple de rendu conditionnel ou l'on affiche ou pas une image dans une nav en fonction des props.

```jsx
function Nav(props) {

  let img = null;

  if (props.image) {
    img = (
      <div>
        <img src={props.image} />
      </div>
    );
  }

  return (
    <nav>
      <h1>{props.title}</h1>
      {img}
    </nav>
  );
}

// On l'appelera comme ceci, sans image
<Nav title="Super title" />

// Et comme ceci avec une image
<Nav image="project.png" title="Super title" />
```

#### Les boucles

Le JSX est du JavaScript "augmenté". Pour faire des boucles il suffit donc d'utiliser les outils du JavaScript. Le plus utile est en général d'utiliser la méthode `map` des arrays.

```jsx
function MonComposant(props) {

  // People est ici une liste de {firstName, lastName}
  const people = props.people;

  // Utilisons .map pour rendre une <ul>
  return (
    <ul>
      {people.map((person, i) => {

        return (
          <li key={i}>
            {person.firstName} {person.lastName}
          </li>
        );
        // L'attribut key est utilisé par React pour optimiser les mises à jour des composants
        // Dans notre cas ce n'est pas indispensable mais React génère des warnings si il manque des key
        // Donc mieux de les ajouter mais pas grave si c'est oublié
      })}
    </ul>
  );
}
```

#### Style

Pour ajouter du style directement aux éléments, react accepte des objets de style plutôt qu'une chaîne de caractère.

```jsx
// Par exemple ce style:
'text-decoration: underline; color: blue;'

// Deviens cet objet:
const style = {
  textDecoration: 'underline',
  color: 'blue'
}

// Bien noter que le kebab-case du CSS se transforme en camelCase en JSX.

// Ensuite pour utiliser cet objet de style, faire soit:
<div style={style} />
// ou directement inline (notez les doubles accolades)
<div style={{color: 'blue'}} />
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

#### Enfants

Il peut être utile de faire des composants ayant pour objectif de rendre des enfants. Par exemple, le composant `Layout` représente le header, le footer et tout ce qui est présent sur toutes les pages et ce composant se charge ensuite de rendre ses enfants, le composant affichant ce qui est spécifique à la page people, par exemple.

```js
// Si l'on passe des enfants à un composant, alors il aura une prop "children"
function Layout(props) {

  // Ici on rends "props.children" à l'intérieur d'une div
  return (
    <div className="container">
      <div className="column">
        {props.children}
      </div>
    </div>
  );
}

// Dès lors, si l'on écrit ceci:
<Layout>
  <h1>Titre</h1>
</Layout>

// On va rendre au final:
<div class="container">
  <div class="column">
    <h1>Titre</h1>
  </div>
</div>
```

#### Composants jumeaux sans div parente

Pour créer un composant qui rends deux blocs qui sont jumeaux sans avoir un conteneur div créé automatiquement pour les nester, il faut utiliser une syntaxe particulière:

```html
<>
  <nav/>
  <main>content</main>
</>
```

#### Import/Export de fonctions

La syntaxe ES6 a un système d'import export des fonctions entre module.
Voici [la documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).
