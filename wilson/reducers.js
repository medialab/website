const ENUMS = require('../specs/enums.json');
const last = require('lodash/last');
const forEach = require('lodash/forEach');
const permalinks = require('./permalinks.js');
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
      fr: `${permalinks.activities.fr}/${slug}`,
      en: `${permalinks.activities.en}/${slug}`
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
    attachments: resolveAttachments(pathPrefix, news.attachments || []),
    permalink: {
      fr: `${permalinks.news.fr}/${slug}`,
      en: `${permalinks.news.en}/${slug}`
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
      fr: `${permalinks.people.fr}/${slug}`,
      en: `${permalinks.people.en}/${slug}`
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

  if (!production.authors)
    production.authors = '';

  // Processing HTML
  const content = template(pathPrefix, production.content);
  const slug = last(production.slugs);

  let permalinkBase = permalinks.productions;
  if (['code', 'software'].includes(production.type)) {
    permalinkBase = permalinks.tools;
  }

  return {
    ...production,
    content,
    attachments: resolveAttachments(pathPrefix, production.attachments || []),
    permalink: {
      fr: `${permalinkBase.fr}/${slug}`,
      en: `${permalinkBase.en}/${slug}`
    }
  };
};

exports.github = function reduceGithub(record) {
  return {
    ...record,
    authors: record.authors.map(author => {
      if (!author.slug)
        return author;

      return {
        ...author,
        permalink: {
          fr: `${permalinks.people.fr}/${author.slug}`,
          en: `${permalinks.people.en}/${author.slug}`
        }
      };
    })
  };
};
