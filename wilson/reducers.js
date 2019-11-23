const ENUMS = require('../specs/enums.json');
const last = require('lodash/last');
const forEach = require('lodash/forEach');
const {template, resolveAttachments} = require('./templating.js');
const {frenchTypographyReplace} = require('./utils.js');

exports.activities = function reduceActivity(pathPrefix, activity) {

  // Processing HTML
  const content = template(pathPrefix, activity.content);
  const slug = last(activity.slugs);

  return {
    ...activity,
    content,
    attachments: resolveAttachments(pathPrefix, activity.attachments || []),
    permalink: {
      fr: `/activites/${slug}`,
      en: `/en/activities/${slug}`
    }
  };
};

exports.news = function reduceNews(pathPrefix, news) {

  // Typography
  if (news.title && news.title.fr)
    news.title.fr = frenchTypographyReplace(news.title.fr);

  // Processing HTML
  const content = template(pathPrefix, news.content);
  const slug = last(news.slugs);

  // Computing expiry
  let expiry = news.startDate;

  if (news.endDate)
    expiry = news.endDate;

  if (expiry)
    news.expiry = +(new Date(expiry)) / 1000;

  return {
    ...news,
    content,
    permalink: {
      fr: `/actu/${slug}`,
      en: `/en/news/${slug}`
    }
  };
};

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

function solveEnum(e, target, o) {
  const k = target + 'Label';

  o[k] = {};

  if (o[target]) {
    o[k].fr = e.fr[o[target]];
    o[k].en = e.en[o[target]];
  }
}

const PRODUCTION_TYPE_TO_GROUP = {};

forEach(ENUMS.productionTypes.groups, (group, key) => {
  group.values.forEach(type => (PRODUCTION_TYPE_TO_GROUP[type] = key));
});

exports.productions = function reduceProductions(pathPrefix, production) {

  // Spire fields
  if (production.spire) {
    // use spire.generatedFields for empty object fields
    production = {...production.spire.generatedFields, ...production};
  }

  // Typography
  if (production.title && production.title.fr)
    production.title.fr = frenchTypographyReplace(production.title.fr);

  // Solving enums
  solveEnum(ENUMS.productionTypes, 'type', production);

  production.group = PRODUCTION_TYPE_TO_GROUP[production.type || ENUMS.productionTypes.default];

  // If authors field is empty but we have people, let's fill the field.
  // if (
  //   (!production.authors || production.authors === '') &&
  //   production.people &&
  //   production.people.length > 0
  // ) {
  //   production.authors = production.people.map(pId => (peopleIndex[pId] ? `${peopleIndex[pId].firstName} ${peopleIndex[pId].lastName}` : `${pId} missing`)).join(', ');
  // }

  // Processing HTML
  const content = template(pathPrefix, production.content);
  const slug = last(production.slugs);

  return {
    ...production,
    content,
    attachments: resolveAttachments(pathPrefix, production.attachments || []),
    permalink: {
      fr: `/productions/${slug}`,
      en: `/en/productions/${slug}`
    }
  };
};
