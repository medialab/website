export function join(children, string) {
  const result = new Array(children.length * 2 - 1);

  for (let i = 0; i < children.length; i++) {
    result[i * 2] = children[i];

    if (i < children.length - 1)
      result[i * 2 + 1] = string;
  }

  return result;
}

export function templateMembership(person){
  const isMember = person.membership === 'member';
  // active = boolean

  if (isMember){
    if (!person.active)
      return 'Ancien membre';
  }
  else{
    if(person.active)
      return 'Membre associé';
    else
      return 'Ancien membre associé';
  }

  return ''; // membre actif
}

export function PlaceHolder(data){

  if(typeof data.attachements && data.attachements !== "undefined"){ return data.attachements = "Faux_files.pdf" };
}

export function IsModel (item, lang){
  let type;

  if(item === "activities") {
    if(lang === "fr") {
      type = "Activités";
    } else {
      type = "Activities";
    }
  }
  if(item === "productions") {
    type = "Productions";
  }
  if(item === "news") {
    if(lang === "fr") {
      type = "Actualités";
    } else {
      type = "News";
    }
  }
  if(item === "people") {
    if(lang === "fr") {
      type = "L'equipe";
    } else {
      type = "Medialab's Team";
    }
  }
   return type;
}