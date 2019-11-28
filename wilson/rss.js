const get = require('lodash/get');

const FEED_MAX_NUMBER_OF_ITEMS = 50;

function pubDate(date) {
  if (typeof date === 'undefined')
    date = new Date();

  const pieces = date.toString().split(' '),
      offsetTime = pieces[5].match(/[-+]\d{4}/),
      offset = (offsetTime) ? offsetTime : pieces[5],
      parts = [
        pieces[0] + ',',
        pieces[2],
        pieces[1],
        pieces[3],
        pieces[4],
        offset
      ];

  return parts.join(' ');
}

function languageFallback(lang, o) {
  if (!o)
    return '';

  if (o[lang])
    return o[lang];

  const otherLang = lang === 'fr' ? 'en' : 'fr';

  if (o[otherLang])
    return o[otherLang];

  return '';
}

const createComparator = prop => (a, b) => {
  a = get(prop, a);
  b = get(prop, b);

  if (typeof a === 'undefined')
    a = -Infinity;

  if (typeof b === 'undefined')
    b = -Infinity;

  if (a > b)
    return -1;

  else if (a < b)
    return 1;

  return 0;
};

function cdata(string) {
  return `<![CDATA[${string.trim()}]]>`
}

const AMP = /&/g;

function safeXmlText(string) {
  return string.replace(AMP, '&amp;').trim();
}

function createRssRecord(item) {
  const {
    title,
    description,
    date,
    url,
    content
  } = item;

  const record = [
    '    <item>',
    `      <title>${safeXmlText(title)}</title>`,
  ];

  if (description)
    record.push(`      <description>${safeXmlText(description)}</description>`);

  record.push(
    `      <link>${url}</link>`,
    `      <guid isPermalink="false">${url}</guid>`
  );

  if (date)
    record.push(`      <pubDate>${pubDate(date)}</pubDate>`);

  record.push(
    `      <content:encoded>${cdata(content)}</content:encoded>`,
    '    </item>'
  );

  return record;
}

const REDUCERS = {
  activities(resolve, lang, item) {
    return {
      title: item.name,
      description: languageFallback(lang, item.baseline),
      date: item.startDate ? new Date(item.startDate) : null,
      url: resolve(item.permalink[lang]),
      content: languageFallback(lang, item.content)
    };
  },

  news(resolve, lang, item) {
    return {
      title: languageFallback(lang, item.title),
      description: languageFallback(lang, item.description),
      date: new Date(item.startDate),
      url: resolve(item.permalink[lang]),
      content: languageFallback(lang, item.content)
    };
  },

  people(resolve, lang, item) {
    return {
      title: `${item.firstName} ${item.lastName}`,
      description: languageFallback(lang, item.status),
      url: resolve(item.permalink[lang]),
      content: languageFallback(lang, item.bio)
    };
  },

  productions(resolve, lang, item) {
    return {
      title: languageFallback(lang, item.title) + ' - ' + item.authors,
      description: languageFallback(lang, item.description),
      date: item.date ? new Date(item.date) : null,
      url: resolve(item.permalink[lang]),
      content: languageFallback(lang, item.content, lang)
    };
  }
}

const FEEDS = [

  // News feed
  {
    en: {
      path: '/news.feed.xml',
      title: 'News from médialab SciencesPo'
    },
    fr: {
      path: '/actualites.feed.xml',
      title: 'Actualités du médialab Sciences Po'
    },
    reduce(db, resolve, lang) {
      return db.getModel('news')
        .filter(item => !item.draft)
        .sort(createComparator('startDate'))
        .slice(0, FEED_MAX_NUMBER_OF_ITEMS)
        .map(item => REDUCERS.news(resolve, lang, item));
    }
  },

  // Seminar feed
  {
    en: {
      path: '/seminar.feed.xml',
      title: 'Program of the médialab SciencesPo\'s seminar'
    },
    fr: {
      path: '/seminaire.feed.xml',
      title: 'Programme du séminaire médialab Sciences Po'
    },
    reduce(db, resolve, lang) {
      return db.getModel('news')
        .filter(item => {
          return (
            !item.draft &&
            item.label &&
            item.label.fr === 'Séminaire de recherche'
          );
        })
        .sort(createComparator('startDate'))
        .slice(0, FEED_MAX_NUMBER_OF_ITEMS)
        .map(item => REDUCERS.news(resolve, lang, item));
    }
  },

  // Production feed
  {
    en: {
      path: '/productions-en.feed.xml',
      title: 'New productions from médialab Sciences Po'
    },
    fr: {
      path: '/productions-fr.feed.xml',
      title: 'Nouvelles productions du médialab Sciences Po'
    },
    reduce(db, resolve, lang) {
      return db.getModel('productions')
        .filter(item => !item.draft)
        .sort(createComparator('date'))
        .slice(0, FEED_MAX_NUMBER_OF_ITEMS)
        .map(item => REDUCERS.productions(resolve, lang, item));
    }
  },

  // Generic feed
  {
    en: {
      path: '/all-updates-en.feed.xml',
      title: 'All updates from médialab Sciences Po'
    },
    fr: {
      path: '/all-updates-fr.feed.xml',
      title: 'Toutes les mises à jour du médialab Sciences Po'
    },
    main: true,
    reduce(db, resolve, lang) {
      return db.getModel('activities')
        .concat(db.getModel('news'))
        .concat(db.getModel('people'))
        .concat(db.getModel('productions'))
        .filter(item => !item.draft)
        .sort(createComparator('lastUpdated'))
        .slice(0, FEED_MAX_NUMBER_OF_ITEMS)
        .map(item => {
          return REDUCERS[item.model](resolve, lang, item);
        });
    }
  }
];

function createRssFeed(db, resolve, lang, feed) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">',
    '  <channel>',
    `    <title>${safeXmlText(feed[lang].title)}</title>`,
    `    <description>${safeXmlText(feed[lang].title)}</description>`,
    `    <lastBuildDate>${pubDate()}</lastBuildDate>`
  ];

  feed.reduce(db, resolve, lang).forEach(item => {
    lines.push.apply(lines, createRssRecord(item));
  });

  lines.push('  </channel>');
  lines.push('</rss>');

  return lines.join('\n');
}

function createRssFeeds(siteUrl, pathPrefix, db) {
  const resolve = permalink => `${siteUrl}${pathPrefix}${permalink}`;

  const createFeed = (lang, feed) => createRssFeed(db, resolve, lang, feed);

  return FEEDS.map(feed => {
    return {
      main: feed.main || false,
      en: {
        ...feed.en,
        rss: createFeed('en', feed),
        resolvedPath: resolve(feed.en.path)
      },
      fr: {
        ...feed.fr,
        rss: createFeed('fr', feed),
        resolvedPath: resolve(feed.fr.path)
      }
    }
  });
};

module.exports = createRssFeeds;
