# Formalisme HTML

L'éditeur formalise les champs de contenu riche de la manière suivante:

## Assets

Les assets doivent avoir un nom de fichier obéissant à ce format:

```
name_uuidv4.ext
```

Le nom est avant l'uuid pour garder l'avantage de l'ordre des fichiers.

## 1. Wrapper tous les paragraphes

```
Je suis un premier paragraphe.

Je suis un second paragraphe.
```

*Résultat*

```html
<p>Je suis un premier paragraphe.</p>
<p>Je suis un second paragraphe.</p>
```

## 2. Balises courantes

Les balises inline acceptées sont l'italique et le gras. Donc en `em` et `strong` respectivement (pas de `i` ou `b`).

## 3. Les titres

Les titres sont autorisés `h1` jusque `h6` (ou `h3`, à déterminer).

## 4. Les listes

Les listes sont autorisées (mais pas nestées, pour le moment). `ul` et `ol` avec leurs `li` correspondants.

## 5. Les liens

Les liens sont à rendre de la manière suivante:

*Externe*

```html
<a href="https://medialab.sciencespo.fr">Title</a>
```

*Interne*

```html
<a href="document.pdf" data-internal="true"></a>
```

## 6. Les images

Les images sont à rendre de la manière suivante:

QUESTIONS: toujours internes? Quid des références, le alt suffit?

```html
<figure>
  <img src="image.png" data-width="400" data-height="600" data-credits="Crédits de l'image..." data-format="figure-logo">
</figure>
```

## 7. Les iframes

Les iframes sont à rendre de la manière suivante:

*Externe*

```html
<figure>
  <iframe src="https://medialab.sciencespo.fr">&nbsp;</iframe>
</figure>
```

*Interne*

```html
<figure>
  <iframe data-internal="true" src="document.pdf">&nbsp;</iframe>
</figure>
```

## 8. HTML arbitraire

```html
<p>
  Ceci est du HTML
</p>
```

Est à rendre de la manière suivante:

```html
<pre>
  <code>&lt;p&gt;</code>
</pre>
<pre>
  <code>&nbsp;&nbsp;Ceci est du HTML</code>
</pre>
<pre>
  <code>&lt;/p&gt;</code>
</pre>
```

## Example de HTML généré

```html
<h2>This is some level 2 title</h2>
<p>This is some <strong>bold</strong> text.</p>
<p>This is some <em>italic</em> text.</p>
<ul>
  <li>Very interesting list</li>
  <li>with only two items</li>
</ul>
<pre>
  <code>&lt;p&gt;</code>
</pre>
<pre>
  <code>&nbsp;&nbsp;Custom HTML</code>
</pre>
<pre>
  <code>&lt;/p&gt;</code>
</pre>
<p>This is some <a href=\"https://www.google.fr/maps\">link</a>.</p>
<p>An image:</p>
<figure>
  <img src=\"Yomguithereal2_a5bd2915-9702-4ac2-81b1-72a46cbf1c63.jpeg\"/>
</figure>
<p>An iframe:</p>
<figure>
  <iframe src=\"test\">&nbsp;</iframe>
</figure>
```
