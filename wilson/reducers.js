const last = require('lodash/last');
const {template, resolveAttachments} = require('./templating.js');

exports.people = function reducePeople(pathPrefix, person) {

  // Processing HTML
  const content = template(pathPrefix, person.bio);
  const slug = last(person.slugs);

  return {
    ...person,
    bio: content,
    contacts: resolveAttachments(pathPrefix, person.contacts || []),
    permalink: {
      fr: `/equipe/${slug}`,
      en: `/en/people/${slug}`
    }
  };
};
