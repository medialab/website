
# Point design (3-11-2018)

## Demande
* améliorer la visiblité et la lisibilité des activités du médialab (axe de recherche = analyse exploratoire des données)
* conception et intégration (sous forme de pages HTML statiques) du site du medialab
* pages statiques ensuite reversées dans un CMS développé en interne par le Médialab
* bonne compatibilité inter-navigateurs et inter-supports
* structuration des contenus et des pages, parcours utilisateurs
* archive en cours de la construction des activités

## Problématiques

### Hétéroclite 
Le site est composé de beaucoup d'objets différents. Repérer facilement le type d'objet.   
Comment ? Couleur, picto, nomination claire...   
Objets: publications, évènements internes (séminaire, conférence..), évènements externes, membres, projets, outils, datascapes, datasprints // note: certains objets s'incluent dans d'autres, il faudrait faire un organigramme précis

### Navigation
Naviguer facilement d'un objet à un autre, pouvoir faire des liens.   
**Toutes les pages doivent être des points d'entrée.**  
Exemple: beaucoup de personne attérissent sur le site via la bio de l'un des chercheurs, comment les amener à aller voir ailleurs sur le site ? 

### International
Il faut facilement passer d'une lagnue à l'autre sachant que les contenus sont souvent partiellement traduit dans les deux langues. Comprendre rapidement et facilement dans quelle langue on est. Laisser les contenus non traduit dans l'autre langue, comment faire voir qu'ils sont non traduits ?  
Comment ? Parallèle, quiconce, transparence, couleur...

### Place de l'image
Les images sont pour le moment essentiellement cherchées dans des bases de données (hormis pour les outils). Cela prend trop de temps et n'est pas toujours pertinent.  
Quelle place pour l'image ?     
Les images sont surtout nécessaires pour la com' extérieure au site: twitter, site de sciences po... (C'est en relation avec cette idée que nous devons donc penser l'image)  
Comment ? Absence d'image, images textuelle, images génératives ? Enjeux purement esthétique ?


## Le site

Différentes facettes du sites, différents points de vues

### Structuration des contenus
* par objets: Personne, Activité, Publication, Actualité
* par pages: description du labo, politique scientifique, contact, crédits/mentions légales


### Structuration du site proposé par le médialab 
Peut-être légèrement revu

**Page d'accueil (4 parties)**
- bandeau logo + menu principal (actualités, équipe, activités, publications)
- "vie du labo" = une sélection manuelle et ordonnnée d'objets à mettre en avant
- actualités = objets actualités ordonnés par proximité temporelle et qui ne sont pas
déjà mis en avant
- 2 flux = twitter, github

**Pied de page**
- contacts/adresse 
- menu à propos

**À Propos**  
4-5 pages de présentation générale, pages statiques spécifiques
- description du labo
- politique scientifique
- revue de presse
- contact

**Pages listings objets**  
- équipes, activités, publications
- interconnectées et filtrables (ex: trier les activités selons les personnes qui y participent)

**Page détails objets**  
interconnectées (ex: pour une activité, on peut voir les personnes concernées)

### Modèle métadonnées 
- directement disponible sur le repo git


**personne**
- nom
- titre
- biographie (markdown)
- statut : membre, associé, directeur scientifique, directeur technique, secrétaire général
- date de sortie (optionnelle)
- photo (média)

**activité**
- type : recherche, enseignement, méthode
- titre
- description (markdown)
- dates début
- date fin (optionnelle)
- visuel (média)
- liens des personnes concernées

**publication**
- type : article, livre, logiciel, conférence, publication web...
- titre
- référence (texte plein ou en objet)
- date
- abstract (markdown)
- visuel (média)
- liens des personnes concernées
- liens des activités concernées

**actualité**
- titre
- type : séminaire, annonce...
- lieu (optionnel)
- date début
- date fin (optionnelle)
- description (markdown)
- visuel (média)
- liens des personnes concernées
- liens des publications concernées
- liens des activités concernées

