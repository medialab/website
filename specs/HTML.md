# Formalisme HTML

L'éditeur formalise les champs de contenu riche de la manière suivante:

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
  <img src="image.png">
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
