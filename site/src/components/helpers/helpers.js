export function join(children, string) {
  const result = new Array(children.length * 2 - 1);

  for (let i = 0; i < children.length; i++) {
    result[i * 2] = children[i];

    if (i < children.length - 1)
      result[i * 2 + 1] = string;
  }

  return result;
}

export function templateMembership(person) {
  const isMember = person.membership === 'member';
  // active = boolean

  if (isMember) {
    if (!person.active)
      return 'Ancien membre';
  }
  else {
    if (person.active)
      return 'Membre associé';
    else
      return 'Ancien membre associé';
  }

  return ''; // membre actif
}

export function PlaceHolder(data) {

  //if(typeof data.attachments != null){ data.attachments.push(attchmts); console.log(data.attachments); };
  //if(typeof data && data !== "undefined"){ return (data.label = "Faux_files.pdf", data.value = "Faux_file",  data.type = "fake") };

}


export function IsModel (item, lang) {
  let type;

  if (item === 'activities') {
    if (lang === 'fr') {
      type = 'Activités';
    } else {
      type = 'Activities';
    }
  }
  if (item === 'productions') {
    type = 'Productions';
  }
  if (item === 'news') {
    if (lang === 'fr') {
      type = 'Actualités';
    } else {
      type = 'News';
    }
  }
  if (item === 'people') {
    if (lang === 'fr') {
      type = "L'equipe";
    } else {
      type = "Medialab's Team";
    }
  }
  // Activity
  if (item === 'research' ) {
    if (lang === 'fr') {
      type = 'Recherche';
    } else {
      type = 'Research';
    }
  }
  if (item === 'teaching' ) {
    if (lang === 'fr') {
      type = 'Enseignement';
    } else {
      type = 'Teaching';
    }
  }
  if (item === 'method' ) {
    if (lang === 'fr') {
      type = 'Méthode';
    } else {
      type = 'Method';
    }
  }
  // News
  if (item === 'event' ) {
    if (lang === 'fr') {
      type = 'Rendez-vous';
    } else {
      type = 'Event';
    }
  }
  if (item === 'post' ) {
    if (lang === 'fr') {
      type = 'Chronique';
    } else {
      type = 'Post';
    }
  }
  if (item === 'notice' ) {
    if (lang === 'fr') {
      type = 'Annonce';
    } else {
      type = 'Notice';
    }
  }

  // Production group
  if (item === 'publications' ) {
    type = 'Publication';
  }
  if (item === 'tools' ) {
    if (lang === 'fr') {
      type = 'Outil';
    } else {
      type = 'Tool';
    }
  }
  if (item === 'webEditions' ) {
    if (lang === 'fr') {
      type = 'Édition web';
    } else {
      type = 'Web Edition';
    }
  }
  if (item === 'media' ) {
    if (lang === 'fr') {
      type = 'Média';
    } else {
      type = 'Media';
    }
  }
  if (item === 'situations' ) {
    type = 'Situations';
  }
  // Production
  if (item === 'article' ) {
      type = 'Article';
  }
  if (item === 'book' ) {
    if (lang === 'fr') {
      type = 'Livre';
    } else {
      type = 'Book';
    }
  }
  if (item === 'communication' ) {
      type = 'Communication';
  }  
  if (item === 'thesis' ) {
    if (lang === 'fr') {
      type = 'Thèse';
    } else {
      type = 'thesis';
    }
  }
  if (item === 'grey' ) {
    if (lang === 'fr') {
      type = 'Littérature grise';
    } else {
      type = 'Grey literature';
    }
  }
  if (item === 'datascape' ) {
    if (lang === 'fr') {
      type = 'Datascape';
    } else {
      type = 'Datascape';
    }
  }  if (item === 'website' ) {
    if (lang === 'fr') {
      type = 'Site Web';
    } else {
      type = 'Website';
    }
  }
  if (item === 'software' ) {
    if (lang === 'fr') {
      type = 'Logiciel';
    } else {
      type = 'Software';
    }
  }
  if (item === 'Code' ) {
    if (lang === 'fr') {
      type = 'Code';
    } else {
      type = 'Code';
    }
  }  

  if (item === 'exhibition' ) {
    if (lang === 'fr') {
      type = 'Exposition';
    } else {
      type = 'Exhibition';
    }
  }
  if (item === 'simulation' ) {
    if (lang === 'fr') {
      type = 'Simuation';
    } else {
      type = 'Simulation';
    }
  }  

  if (item === 'workshop' ) {
    if (lang === 'fr') {
      type = 'Atelier';
    } else {
      type = 'Workshop';
    }
  }
  if (item === 'conference' ) {
    if (lang === 'fr') {
      type = 'Conférence';
    } else {
      type = 'Conference';
    }
  }    
  if (item === 'media' ) {
    if (lang === 'fr') {
      type = 'Media';
    } else {
      type = 'Media';
    }
  }    
   return type;
}
