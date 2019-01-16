export function templateMembership(person){
    const isMember = person.membership === "member";
    // active = boolean

    if (isMember){
        if (!person.active)
            return "Ancien membre"
    }
    else{
        if(person.active)
            return "Membre associé"
        else
            return "Ancien membre associé"
    }

    return ''; // membre actif
}