import React from 'react';

export function compare(a, b) {
  if (a === b) return 0;
  else return a < b ? -1 : 1;
}

// ellipse function
export function ellipse(text, maxSize = 175) {
  if (text.length > maxSize) {
    let cutIndex = text.slice(0, maxSize).lastIndexOf(' ');
    cutIndex = cutIndex === -1 ? maxSize : cutIndex;
    return text.slice(0, cutIndex) + '…';
  }
  return text;
}

export function composeText(list, joinText, langMap) {
  if (list.length === 1) return langMap[list[0]];
  else {
    const newList = list.slice();
    const last = newList.pop();
    return (
      newList.map(usage => langMap[usage]).join(', ') + joinText + langMap[last]
    );
  }
}

export function join(children, string) {
  const result = new Array(children.length * 2 - 1);

  for (let i = 0; i < children.length; i++) {
    result[i * 2] = children[i];

    if (i < children.length - 1) result[i * 2 + 1] = string;
  }

  return result;
}

export function templateMembership(lang, person) {
  if (lang === 'fr') {
    if (person.membership === 'member') {
      if (!person.active) return <span>Ancien membre</span>;
    } else if (person.membership === 'associate') {
      if (person.active) return <span>Membre associé</span>;
      else return <span>Ancien membre associé</span>;
    } else {
      if (person.active) return <span>Membre invité</span>;
      else return <span>Ancien membre invité</span>;
    }
  } else {
    if (person.membership === 'member') {
      if (!person.active) return <span>Former member</span>;
    } else if (person.membership === 'associate') {
      if (person.active) return <span>Associate member</span>;
      else return <span>Former associate member</span>;
    } else {
      if (person.active) return <span>Invited member</span>;
      else return <span>Former invited member</span>;
    }
  }

  return ''; // membre actif
}

const PRODUCTION_TYPE_TO_SCHEMA_URL = {
  article: 'https://schema.org/Article',
  book: 'https://schema.org/Book',
  communication: 'https://schema.org/CreativeWork',
  thesis: 'https://schema.org/Thesis',
  grey: 'https://schema.org/CreativeWork',
  datascape: 'https://schema.org/WebSite',
  website: 'https://schema.org/WebSite',
  software: 'https://schema.org/SoftwareApplication',
  code: 'https://schema.org/SoftwareSourceCode',
  exhibition: 'https://schema.org/ExhibitionEvent',
  simulation: 'https://schema.org/TheaterEvent',
  workshop: 'https://schema.org/Event',
  conference: 'https://schema.org/Event',
  media: 'https://schema.org/CreativeWork'
};

export const productionTypeToSchemaURL = type => {
  return (
    PRODUCTION_TYPE_TO_SCHEMA_URL[type] || 'https://schema.org/CreativeWork'
  );
};

const PRODUCTION_TYPE_TO_ZOTERO_TYPE = {
  article: 'journalArticle',
  book: 'book',
  communication: 'presentation',
  thesis: 'thesis',
  grey: 'report',
  datascape: 'webpage',
  website: 'webpage',
  software: 'computerProgram',
  code: 'computerProgram',
  exhibition: 'document',
  simulation: 'document',
  workshop: 'document',
  conference: 'document',
  media: 'newspaperArticle'
};

export const productionTypeToZoteroType = type => {
  return PRODUCTION_TYPE_TO_ZOTERO_TYPE[type] || 'document';
};
