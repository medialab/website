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
