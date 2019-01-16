

## Adaptation cross-browser

### Si calc() est utilisé il faut utiliser des préfixes

attention, il n'est pas possible de faire un @mixin car sass ne comprend pas les additions en valeur

```
height: 85%;
height: -webkit-calc(100% - 1.7vw*4);
height: -moz-calc(100% - 1.7vw*4);
height: calc(100% - 1.7vw*4);
```

### Créer des mixins de prefixes pour l'adaptation à tous les navigateurs

Les mixins se trouvent dans le dossier `sass/vars/_cross-browser.scss`

Exemple:
```
@mixin flex() {
    display: -webkit-box; 
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex; 
    display: flex;
}
```


## Sass

Utiliser une variable SASS dans un calcul `calc()`:

```
height: calc(100vh - #{$height-top-bar} - 2rem);
```



## Divers

### Enlever l'apparence par défaut d'un bouton, d'un input...

```
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
```